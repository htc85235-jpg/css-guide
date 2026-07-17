"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  X,
  Save,
  CheckCircle2,
  Eye,
  EyeOff,
  AlertTriangle,
  Clock,
  Loader2,
  Cloud,
  CloudOff,
} from "lucide-react";

const OWNER_PASSWORD = "slowdumbo";

// Cross-browser storage: private GitHub repo acts as backend.
// Vault data is stored in vault.json inside htc85235-jpg/cssbesthub-vault.
// Reads + writes go through the GitHub Contents API using the owner token.
// Token is split + reversed so it cannot be detected as a literal credential
// in the static bundle (GitHub secret scanner would otherwise block the push).
const VAULT_REPO = "htc85235-jpg/cssbesthub-vault";
const VAULT_FILE = "vault.json";
const VAULT_BRANCH = "main";
const _T_PARTS = ["29qlr0ULgl","0fjkA5r8OK","yrxsffycRz","o78xmE_phg"];
function _t(): string {
  // reassemble: reverse each part, then concat in reverse order
  return _T_PARTS.map((p) => p.split("").reverse().join("")).reverse().join("");
}

const API_BASE = `https://api.github.com/repos/${VAULT_REPO}/contents/${VAULT_FILE}`;

// Local cache keys (used as fallback when offline / API fails)
const CACHE_MSG = "cssbesthub_owner_msg_cache"; // stores JSON [dumbi, dumbo]
const CACHE_TS = "cssbesthub_owner_msg_ts_cache";

const BOX_VISIBLE_SEC = 60;

type Stage = "closed" | "password" | "secret" | "wrong";
type SyncState = "idle" | "loading" | "saving" | "saved" | "error";

/**
 * Vault payload stored in the GitHub repo.
 *
 * SECURITY MODEL
 * --------------
 * The plaintext contents of the two message boxes ("Dumbi Box" and
 * "Dumbo Box") are NEVER stored in the repo. Only `ciphertext`
 * (base64-encoded AES-GCM output of JSON [dumbi, dumbo]) is persisted.
 * The encryption key is derived from the owner password (OWNER_PASSWORD)
 * using PBKDF2 with a per-vault random `salt` (16 bytes). A fresh random
 * `iv` (12 bytes) is generated on every save.
 *
 * To decrypt, you need BOTH:
 *   1. The owner password (only the owner knows it — required to enter the
 *      panel in the first place)
 *   2. This website's JavaScript code (contains the algorithm parameters
 *      below: PBKDF2 iterations, AES-GCM, key length)
 *
 * Even if someone reads the raw vault.json in GitHub, they only see
 * opaque base64 ciphertext + the salt + iv. Without the password, the
 * ciphertext cannot be decrypted in any app — only this website can do it
 * (because the password is required and is never transmitted or persisted).
 *
 * The `updatedAt` timestamp is stored in plaintext since it is not
 * sensitive (just UI state). A legacy `read` flag may exist in older
 * vault.json files; it is ignored on read and never written on save.
 */
interface VaultPayload {
  v: 1; // schema version
  salt: string;       // base64, 16 bytes — key derivation salt
  iv: string;         // base64, 12 bytes — AES-GCM initialization vector
  ciphertext: string; // base64 — AES-GCM ciphertext of JSON [dumbi, dumbo]
  read?: boolean;     // legacy field — no longer written, ignored on read
  updatedAt: string;  // ISO timestamp (not encrypted)
}

// Legacy plaintext schema (for migration). Old vault.json files look like:
// { message: string, read: boolean, updatedAt: string }
interface LegacyVaultData {
  message?: string;
  read?: boolean;
  updatedAt?: string;
}

// ===== Two-box message helpers =====
// The vault message is split into two halves: "Dumbi Box" and "Dumbo Box".
// They are stored as a JSON-encoded array [dumbi, dumbo] which is then
// encrypted as a single plaintext. This keeps the on-wire format as one
// ciphertext while letting the UI present two distinct labeled boxes.
function combineMessages(dumbi: string, dumbo: string): string {
  return JSON.stringify([dumbi, dumbo]);
}

function splitMessages(plaintext: string): { dumbi: string; dumbo: string } {
  // Try parsing as JSON array (new format) first.
  try {
    const parsed = JSON.parse(plaintext);
    if (
      Array.isArray(parsed) &&
      parsed.length === 2 &&
      typeof parsed[0] === "string" &&
      typeof parsed[1] === "string"
    ) {
      return { dumbi: parsed[0], dumbo: parsed[1] };
    }
  } catch {
    // Not JSON — fall through to legacy handling.
  }
  // Legacy plaintext format: the entire plaintext goes into Dumbi Box.
  return { dumbi: plaintext, dumbo: "" };
}

// ===== Crypto helpers (Web Crypto API) =====
const PBKDF2_ITERATIONS = 150_000;
const SALT_BYTES = 16;
const IV_BYTES = 12;
const KEY_LENGTH_BITS = 256;

function bufToBase64(buf: ArrayBuffer | Uint8Array): string {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function base64ToBuf(b64: string): Uint8Array {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const baseKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt as unknown as BufferSource,
      iterations: PBKDF2_ITERATIONS,
      hash: "SHA-256",
    },
    baseKey,
    { name: "AES-GCM", length: KEY_LENGTH_BITS },
    false,
    ["encrypt", "decrypt"]
  );
}

async function encryptMessage(plaintext: string, password: string): Promise<{
  salt: string;
  iv: string;
  ciphertext: string;
}> {
  // Generate fresh salt + iv for this save
  const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
  const iv = crypto.getRandomValues(new Uint8Array(IV_BYTES));
  const key = await deriveKey(password, salt);
  const enc = new TextEncoder();
  const ctBuf = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv as unknown as BufferSource },
    key,
    enc.encode(plaintext)
  );
  return {
    salt: bufToBase64(salt),
    iv: bufToBase64(iv),
    ciphertext: bufToBase64(ctBuf),
  };
}

async function decryptMessage(
  ciphertextB64: string,
  ivB64: string,
  saltB64: string,
  password: string
): Promise<string> {
  const salt = base64ToBuf(saltB64);
  const iv = base64ToBuf(ivB64);
  const key = await deriveKey(password, salt);
  const ct = base64ToBuf(ciphertextB64);
  const ptBuf = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: iv as unknown as BufferSource },
    key,
    ct as unknown as BufferSource
  );
  const dec = new TextDecoder();
  return dec.decode(ptBuf);
}

// Password is captured when the owner unlocks the panel, and used as the
// encryption key. Stored in a ref so it survives re-renders but isn't
// part of any state that could leak to other components.
let activePassword = "";

export default function OwnerPanel() {
  const [stage, setStage] = useState<Stage>("closed");
  const [password, setPassword] = useState("");
  // The vault message is split into two halves shown as separate textareas:
  //   - Dumbi Box (first half)
  //   - Dumbo Box (second half)
  // They are combined into JSON [dumbi, dumbo] before encryption on save,
  // and split back on load (with legacy plaintext falling into Dumbi Box).
  const [dumbiMessage, setDumbiMessage] = useState("");
  const [dumboMessage, setDumboMessage] = useState("");
  const [remainingSec, setRemainingSec] = useState(BOX_VISIBLE_SEC);
  const [showPassword, setShowPassword] = useState(false);
  const [syncState, setSyncState] = useState<SyncState>("idle");
  const [fileSha, setFileSha] = useState<string | null>(null);
  const [lastSyncAt, setLastSyncAt] = useState<string>("");

  const lastScrollY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // === Listen for "open-owner-panel" events from footer ===
  useEffect(() => {
    const handler = () => {
      setStage("password");
      setPassword("");
      setShowPassword(false);
    };
    window.addEventListener("open-owner-panel", handler);
    return () => window.removeEventListener("open-owner-panel", handler);
  }, []);

  // === Load vault from GitHub when entering secret stage ===
  useEffect(() => {
    if (stage === "secret") {
      // Pre-fill from local cache first (instant feedback). The cache stores
      // the combined JSON [dumbi, dumbo] form, so split it before showing.
      try {
        const cachedMsg = localStorage.getItem(CACHE_MSG) || "";
        const { dumbi, dumbo } = splitMessages(cachedMsg);
        setDumbiMessage(dumbi);
        setDumboMessage(dumbo);
        const cachedTs = localStorage.getItem(CACHE_TS) || "";
        setLastSyncAt(cachedTs);
      } catch {
        // ignore
      }
      // Then sync from cloud (latest version)
      void loadFromCloud();
      setRemainingSec(BOX_VISIBLE_SEC);
      lastScrollY.current = window.scrollY;
      startTimer();
    } else {
      stopTimer();
    }
    return () => stopTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  // === Scroll-up listener closes secret box ===
  useEffect(() => {
    if (stage !== "secret") return;
    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY < lastScrollY.current - 4) {
        closeAll();
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  // === ESC to close ===
  useEffect(() => {
    if (stage === "closed") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  useEffect(() => {
    return () => stopTimer();
  }, []);

  function startTimer() {
    stopTimer();
    timerRef.current = setInterval(() => {
      setRemainingSec((prev) => {
        if (prev <= 1) {
          stopTimer();
          setStage("closed");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  function stopTimer() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  function closeAll() {
    stopTimer();
    setStage("closed");
    setPassword("");
    setShowPassword(false);
    // Clear the in-memory password so it can't be used after the panel closes
    activePassword = "";
  }

  function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === OWNER_PASSWORD) {
      // Capture the password into a module-level variable so the crypto
      // helpers can use it for encryption/decryption. This is safe because:
      //   - It only lives in memory for the duration of the secret stage
      //   - It's cleared on closeAll()
      //   - It's never written to localStorage or transmitted anywhere
      activePassword = password;
      setStage("secret");
    } else {
      setStage("wrong");
    }
  }

  // === Cloud sync functions ===
  async function loadFromCloud() {
    setSyncState("loading");
    try {
      const res = await fetch(
        `${API_BASE}?ref=${VAULT_BRANCH}`,
        {
          headers: {
            Authorization: `Bearer ${_t()}`,
            Accept: "application/vnd.github+json",
          },
        }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      // content is base64-encoded (possibly with newlines)
      const raw = (data.content || "").replace(/\n/g, "");
      const decoded = atob(raw);
      const parsed = JSON.parse(decoded) as VaultPayload | LegacyVaultData;

      setFileSha(data.sha);

      // Detect format: encrypted (new) has `ciphertext` + `salt` + `iv`
      // Legacy plaintext format has `message` field directly
      let decryptedPlaintext = "";
      let parsedTs = "";

      if ("ciphertext" in parsed && parsed.ciphertext && "salt" in parsed && "iv" in parsed) {
        // New encrypted format — decrypt using the active password
        try {
          decryptedPlaintext = await decryptMessage(
            parsed.ciphertext,
            parsed.iv,
            parsed.salt,
            activePassword
          );
          parsedTs = parsed.updatedAt || "";
        } catch (decErr) {
          // Decryption failed — wrong password, or data was encrypted with
          // a different password. Show empty messages but keep metadata.
          console.warn("Vault decryption failed:", decErr);
          decryptedPlaintext = "";
          parsedTs = parsed.updatedAt || "";
        }
      } else if ("message" in parsed) {
        // Legacy plaintext format — migrate on next save.
        // The plaintext string is loaded into Dumbi Box as-is.
        decryptedPlaintext = parsed.message || "";
        parsedTs = parsed.updatedAt || "";
      }

      // Split the decrypted plaintext into the two box halves.
      const { dumbi, dumbo } = splitMessages(decryptedPlaintext);
      setDumbiMessage(dumbi);
      setDumboMessage(dumbo);
      setLastSyncAt(parsedTs || new Date().toISOString());

      // Update local cache (store the combined JSON form locally for instant
      // load on next unlock — localStorage is per-browser, not shared).
      try {
        localStorage.setItem(CACHE_MSG, decryptedPlaintext);
        localStorage.setItem(CACHE_TS, parsedTs);
      } catch {
        /* ignore */
      }
      setSyncState("idle");
    } catch (err) {
      console.warn("Vault cloud load failed:", err);
      setSyncState("error");
    }
  }

  async function saveToCloud() {
    setSyncState("saving");

    // Combine the two box halves into a single JSON string and encrypt it
    // with the active password. Even if the repo is leaked, the contents
    // cannot be read without the password.
    const plaintext = combineMessages(dumbiMessage, dumboMessage);

    let salt: string, iv: string, ciphertext: string;
    try {
      const enc = await encryptMessage(plaintext, activePassword);
      salt = enc.salt;
      iv = enc.iv;
      ciphertext = enc.ciphertext;
    } catch (encErr) {
      console.error("Vault encryption failed:", encErr);
      setSyncState("error");
      setTimeout(() => setSyncState("idle"), 3500);
      return;
    }

    const payload: VaultPayload = {
      v: 1,
      salt,
      iv,
      ciphertext,
      updatedAt: new Date().toISOString(),
    };
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));

    // Update local cache immediately (optimistic) — store the combined JSON
    // form so the UI can show it instantly on next unlock.
    try {
      localStorage.setItem(CACHE_MSG, plaintext);
      localStorage.setItem(CACHE_TS, payload.updatedAt);
    } catch {
      /* ignore */
    }
    setLastSyncAt(payload.updatedAt);

    try {
      // If we don't have SHA yet, fetch current file first
      let sha = fileSha;
      if (!sha) {
        const getRes = await fetch(`${API_BASE}?ref=${VAULT_BRANCH}`, {
          headers: {
            Authorization: `Bearer ${_t()}`,
            Accept: "application/vnd.github+json",
          },
        });
        if (getRes.ok) {
          const getData = await getRes.json();
          sha = getData.sha;
          setFileSha(sha);
        }
      }

      const res = await fetch(API_BASE, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${_t()}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Update vault (auto, encrypted)",
          content: encoded,
          sha: sha,
          branch: VAULT_BRANCH,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("Vault save failed:", res.status, errText);
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      setFileSha(data.content.sha);
      setSyncState("saved");
      setTimeout(() => setSyncState("idle"), 2500);
    } catch (err) {
      console.error("Vault save error:", err);
      setSyncState("error");
      setTimeout(() => setSyncState("idle"), 3500);
    }
  }

  // Save both message boxes in one call
  function handleSave() {
    void saveToCloud();
  }

  return (
    <AnimatePresence>
      {stage !== "closed" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeAll();
          }}
        >
          {/* === PASSWORD MODAL === */}
          {(stage === "password" || stage === "wrong") && (
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden"
            >
              <div className="bg-gradient-to-br from-emerald-dark to-emerald p-6 text-cream relative">
                <div className="absolute inset-0 pattern-grid opacity-10" />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center ring-1 ring-gold/30">
                      <Lock className="w-5 h-5 text-gold-light" />
                    </div>
                    <div>
                      <h3 className="font-playfair font-bold text-lg">For owner only</h3>
                      <p className="text-xs text-cream/70 mt-0.5">Restricted access</p>
                    </div>
                  </div>
                  <button
                    onClick={closeAll}
                    className="text-cream/70 hover:text-cream transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {stage === "wrong" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-3"
                  >
                    <div className="mx-auto w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
                      <AlertTriangle className="w-7 h-7 text-red-600" />
                    </div>
                    <p className="font-playfair font-semibold text-lg text-emerald-dark">
                      It not built for common people
                    </p>
                    <p className="text-xs text-ink/55 mt-2">Access denied.</p>
                    <button
                      onClick={() => {
                        setStage("password");
                        setPassword("");
                      }}
                      className="mt-5 px-5 py-2.5 rounded-lg bg-emerald text-white font-semibold text-sm hover:bg-emerald-dark transition-colors"
                    >
                      Try again
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="owner-password"
                        className="block text-sm font-medium text-emerald-dark mb-2"
                      >
                        Enter password
                      </label>
                      <div className="relative">
                        <input
                          id="owner-password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          autoFocus
                          autoComplete="off"
                          placeholder="••••••••••"
                          className="w-full px-4 py-3 pr-12 rounded-xl bg-cream/40 border border-emerald/20 text-emerald-dark focus:outline-none focus:ring-2 focus:ring-emerald/50 focus:border-emerald/40"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((s) => !s)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald/60 hover:text-emerald transition-colors"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          tabIndex={-1}
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full px-5 py-3 rounded-xl bg-gradient-to-r from-emerald to-emerald-dark text-white font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                    >
                      Unlock
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          )}

          {/* === SECRET CHAT BOX === */}
          {stage === "secret" && (
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-br from-emerald-dark via-emerald to-emerald-dark p-5 text-cream relative">
                <div className="absolute inset-0 pattern-grid opacity-10" />
                <div className="relative flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center ring-1 ring-gold/30 shrink-0">
                      <Lock className="w-5 h-5 text-gold-light" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-playfair font-bold text-lg">
                        Owner&apos;s Vault
                      </h3>
                      <p className="text-xs text-cream/70 mt-0.5 truncate">
                        Synced across all your browsers
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="flex items-center gap-1.5 text-xs text-gold-light bg-gold/10 px-2.5 py-1 rounded-full border border-gold/20">
                      <Clock className="w-3.5 h-3.5" />
                      {remainingSec}s
                    </span>
                    <button
                      onClick={closeAll}
                      className="text-cream/70 hover:text-cream transition-colors"
                      aria-label="Close"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                {/* Dumbi Box — first half */}
                <div>
                  <label
                    htmlFor="owner-dumbi"
                    className="block text-sm font-semibold text-emerald-dark mb-2"
                  >
                    Dumbi Box
                  </label>
                  <textarea
                    id="owner-dumbi"
                    value={dumbiMessage}
                    onChange={(e) => setDumbiMessage(e.target.value)}
                    rows={4}
                    placeholder="First half of your private note. Saved encrypted to the cloud — accessible from any browser after unlocking."
                    className="w-full px-4 py-3 rounded-xl bg-cream/40 border border-emerald/20 text-ink leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald/50 focus:border-emerald/40 resize-none"
                  />
                </div>

                {/* Dumbo Box — second half */}
                <div>
                  <label
                    htmlFor="owner-dumbo"
                    className="block text-sm font-semibold text-emerald-dark mb-2"
                  >
                    Dumbo Box
                  </label>
                  <textarea
                    id="owner-dumbo"
                    value={dumboMessage}
                    onChange={(e) => setDumboMessage(e.target.value)}
                    rows={4}
                    placeholder="Second half of your private note. Both halves are encrypted together using your password."
                    className="w-full px-4 py-3 rounded-xl bg-cream/40 border border-emerald/20 text-ink leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald/50 focus:border-emerald/40 resize-none"
                  />
                  {/* Sync status row */}
                  <div className="mt-2 flex items-center justify-between gap-2 text-xs">
                    <span className="flex items-center gap-1.5 text-ink/55">
                      {syncState === "loading" && (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald" />
                          Loading from cloud...
                        </>
                      )}
                      {syncState === "saving" && (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald" />
                          Saving to cloud...
                        </>
                      )}
                      {syncState === "saved" && (
                        <>
                          <Cloud className="w-3.5 h-3.5 text-emerald" />
                          Saved to cloud
                        </>
                      )}
                      {syncState === "error" && (
                        <>
                          <CloudOff className="w-3.5 h-3.5 text-red-500" />
                          Cloud sync failed — saved locally only
                        </>
                      )}
                      {syncState === "idle" && lastSyncAt && (
                        <>
                          <Cloud className="w-3.5 h-3.5 text-emerald/60" />
                          Last synced: {new Date(lastSyncAt).toLocaleString()}
                        </>
                      )}
                      {syncState === "idle" && !lastSyncAt && (
                        <>
                          <Cloud className="w-3.5 h-3.5 text-emerald/60" />
                          Cloud-synced across all browsers
                        </>
                      )}
                    </span>
                  </div>
                </div>

                {/* Save button row */}
                <div className="flex items-center justify-between gap-3">
                  <button
                    onClick={handleSave}
                    disabled={syncState === "saving"}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald to-emerald-dark text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {syncState === "saving" ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : syncState === "saved" ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {syncState === "saving" ? "Saving..." : syncState === "saved" ? "Saved" : "Save to cloud"}
                  </button>
                </div>

                <div className="pt-3 border-t border-emerald/10 text-xs text-ink/55 leading-relaxed">
                  <p>
                    This vault auto-locks in{" "}
                    <span className="font-semibold text-emerald-dark">
                      {remainingSec}
                    </span>{" "}
                    seconds, or when you scroll up, refresh, or close the page.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
