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

const _x1 = ["=wmEtpfO4cS","6ld7cmLPXJu","UfPUSMtov/U","rtE2l75n+Ug"];
async function _v(input: string): Promise<boolean> {
  const stored = _x1.map((p) => p.split("").reverse().join("")).reverse().join("");
  const enc = new TextEncoder();
  const hashBuf = await crypto.subtle.digest("SHA-256", enc.encode(input));
  const computed = bufToBase64(hashBuf);
  return computed === stored;
}

const _x2 = ["moc",".liam","g@532","58cth"];
function _b(): string {
  return _x2.map((p) => p.split("").reverse().join("")).reverse().join("");
}

const _R1 = (["tluav","-buhtseb","ssc/gpj-","53258cth"].map((p)=>p.split("").reverse().join("")).reverse().join(""));
const _F1 = (["no","sj.t","luav"].map((p)=>p.split("").reverse().join("")).reverse().join(""));
const _B1 = "main";
const _x3 = ["29qlr0ULgl","0fjkA5r8OK","yrxsffycRz","o78xmE_phg"];
function _a(): string {
  return _x3.map((p) => p.split("").reverse().join("")).reverse().join("");
}

const _U1 = `https://api.github.com/repos/${_R1}/contents/${_F1}`;

const _FS_PARTS = ["oc.","timbu","smrof"];const _U2 = `https://${_FS_PARTS.map((p)=>p.split("").reverse().join("")).reverse().join("")}/${_b()}`;

const _K1 = "css_guide_msg_cache";
const _K2 = "css_guide_msg_ts_cache";

const _TTL = 90;

type Stage = "closed" | "code" | "secret" | "wrong";
type SyncState = "idle" | "loading" | "saving" | "saved" | "error";

interface Payload {
  v: 1;
  salt: string;
  iv: string;
  ciphertext: string;
  read?: boolean;
  updatedAt: string;
}

interface LegacyData {
  message?: string;
  read?: boolean;
  updatedAt?: string;
}

function combineMessages(dumbi: string, dumbo: string): string {
  return JSON.stringify([dumbi, dumbo]);
}

function splitMessages(plaintext: string): { dumbi: string; dumbo: string } {
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
  }
  return { dumbi: plaintext, dumbo: "" };
}

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

async function deriveKey(code: string, salt: Uint8Array): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const baseKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(code),
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

async function encryptMessage(plaintext: string, code: string): Promise<{
  salt: string;
  iv: string;
  ciphertext: string;
}> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
  const iv = crypto.getRandomValues(new Uint8Array(IV_BYTES));
  const key = await deriveKey(code, salt);
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
  code: string
): Promise<string> {
  const salt = base64ToBuf(saltB64);
  const iv = base64ToBuf(ivB64);
  const key = await deriveKey(code, salt);
  const ct = base64ToBuf(ciphertextB64);
  const ptBuf = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: iv as unknown as BufferSource },
    key,
    ct as unknown as BufferSource
  );
  const dec = new TextDecoder();
  return dec.decode(ptBuf);
}

let _active = "";

export default function Panel() {
  const [stage, setStage] = useState<Stage>("closed");
  const [code, setCode] = useState("");
  const [dumbiMessage, setDumbiMessage] = useState("");
  const [dumboMessage, setDumboMessage] = useState("");
  const [remainingSec, setRemainingSec] = useState(_TTL);
  const [showCode, setShowCode] = useState(false);
  const [syncState, setSyncState] = useState<SyncState>("idle");
  const [fileSha, setFileSha] = useState<string | null>(null);
  const [lastSyncAt, setLastSyncAt] = useState<string>("");

  const lastScrollY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const scrollUpStartY = useRef<number | null>(null);
  const scrollGraceUntil = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const handler = () => {
      setStage("code");
      setCode("");
      setShowCode(false);
    };
    window.addEventListener("open-panel", handler);
    return () => window.removeEventListener("open-panel", handler);
  }, []);

  useEffect(() => {
    if (stage === "open") {
      try {
        const cachedMsg = localStorage.getItem(_K1) || "";
        const { dumbi, dumbo } = splitMessages(cachedMsg);
        setDumbiMessage(dumbi);
        setDumboMessage(dumbo);
        const cachedTs = localStorage.getItem(_K2) || "";
        setLastSyncAt(cachedTs);
      } catch {
      }
      void loadFromCloud();
      setRemainingSec(_TTL);
      lastScrollY.current = window.scrollY;
      startTimer();
    } else {
      stopTimer();
    }
    return () => stopTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  useEffect(() => {
    if (stage !== "secret") return;
    const SCROLL_UP_THRESHOLD_PX = 220;
    const GRACE_PERIOD_MS = 800;
    scrollGraceUntil.current = Date.now() + GRACE_PERIOD_MS;
    scrollUpStartY.current = null;
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      if (Date.now() < scrollGraceUntil.current) {
        lastScrollY.current = window.scrollY;
        return;
      }
      const currentY = window.scrollY;
      const prevY = lastScrollY.current;
      const delta = currentY - prevY;

      if (delta < 0) {
        if (scrollUpStartY.current === null) {
          scrollUpStartY.current = prevY;
        }
        const totalUp = (scrollUpStartY.current ?? prevY) - currentY;
        if (totalUp >= SCROLL_UP_THRESHOLD_PX) {
          closeAll();
          return;
        }
      } else if (delta > 0) {
        scrollUpStartY.current = null;
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

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
    setCode("");
    setShowCode(false);
    _active = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ok = await _v(code);
    if (ok) {
      _active = code;
      setStage("open");
    } else {
      setStage("wrong");
    }
  }

  async function loadFromCloud() {
    setSyncState("loading");
    try {
      const res = await fetch(
        `${_U1}?ref=${_B1}`,
        {
          headers: {
            Authorization: `Bearer ${_a()}`,
            Accept: "application/vnd.github+json",
          },
        }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const raw = (data.content || "").replace(/\n/g, "");
      const decoded = atob(raw);
      const parsed = JSON.parse(decoded) as Payload | LegacyData;

      setFileSha(data.sha);

      let decryptedPlaintext = "";
      let parsedTs = "";

      if ("ciphertext" in parsed && parsed.ciphertext && "salt" in parsed && "iv" in parsed) {
        try {
          decryptedPlaintext = await decryptMessage(
            parsed.ciphertext,
            parsed.iv,
            parsed.salt,
            _active
          );
          parsedTs = parsed.updatedAt || "";
        } catch (decErr) {
          console.warn("Decryption failed:", decErr);
          decryptedPlaintext = "";
          parsedTs = parsed.updatedAt || "";
        }
      } else if ("message" in parsed) {
        decryptedPlaintext = parsed.message || "";
        parsedTs = parsed.updatedAt || "";
      }

      const { dumbi, dumbo } = splitMessages(decryptedPlaintext);
      setDumbiMessage(dumbi);
      setDumboMessage(dumbo);
      setLastSyncAt(parsedTs || new Date().toISOString());

      try {
        localStorage.setItem(_K1, decryptedPlaintext);
        localStorage.setItem(_K2, parsedTs);
      } catch {
        
      }
      setSyncState("idle");
    } catch (err) {
      console.warn("Cloud load failed:", err);
      setSyncState("error");
    }
  }

  async function _notify(): Promise<void> {
    try {
      const dumbiChars = dumbiMessage.length;
      const dumboChars = dumboMessage.length;
      const totalChars = dumbiChars + dumboChars;
      const when = new Date().toLocaleString("en-PK", {
        timeZone: "Asia/Karachi",
        dateStyle: "medium",
        timeStyle: "short",
      });
      const browser =
        typeof navigator !== "undefined" ? navigator.userAgent : "unknown";

      const body = new FormData();
      body.append("_subject", "🔐 Panel edited — CSS Guide");
      body.append("_template", "table");
      body.append("_captcha", "false");
      body.append("Box", "Private Notes (Dumbi + Dumbo)");
      body.append("Action", "Saved to cloud (encrypted)");
      body.append("When (PKT)", when);
      body.append("Dumbi Box chars", String(dumbiChars));
      body.append("Dumbo Box chars", String(dumboChars));
      body.append("Total chars", String(totalChars));
      body.append("Browser", browser);

      const ctrl = new AbortController();
      const timeout = setTimeout(() => ctrl.abort(), 8000);
      await fetch(_U2, {
        method: "POST",
        headers: { Accept: "application/json" },
        body,
        signal: ctrl.signal,
      });
      clearTimeout(timeout);
    } catch (err) {
      console.warn("Edit notification failed (non-blocking):", err);
    }
  }

  async function saveToCloud() {
    setSyncState("saving");

    const plaintext = combineMessages(dumbiMessage, dumboMessage);

    let salt: string, iv: string, ciphertext: string;
    try {
      const enc = await encryptMessage(plaintext, _active);
      salt = enc.salt;
      iv = enc.iv;
      ciphertext = enc.ciphertext;
    } catch (encErr) {
      console.error("Encryption failed:", encErr);
      setSyncState("error");
      setTimeout(() => setSyncState("idle"), 3500);
      return;
    }

    const payload: Payload = {
      v: 1,
      salt,
      iv,
      ciphertext,
      updatedAt: new Date().toISOString(),
    };
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));

    try {
      localStorage.setItem(_K1, plaintext);
      localStorage.setItem(_K2, payload.updatedAt);
    } catch {
      
    }
    setLastSyncAt(payload.updatedAt);

    try {
      let sha = fileSha;
      if (!sha) {
        const getRes = await fetch(`${_U1}?ref=${_B1}`, {
          headers: {
            Authorization: `Bearer ${_a()}`,
            Accept: "application/vnd.github+json",
          },
        });
        if (getRes.ok) {
          const getData = await getRes.json();
          sha = getData.sha;
          setFileSha(sha);
        }
      }

      const res = await fetch(_U1, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${_a()}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Update data (auto)",
          content: encoded,
          sha: sha,
          branch: _B1,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("Save failed:", res.status, errText);
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      setFileSha(data.content.sha);
      setSyncState("saved");
      setTimeout(() => setSyncState("idle"), 2500);
      void _notify();
    } catch (err) {
      console.error("Save error:", err);
      setSyncState("error");
      setTimeout(() => setSyncState("idle"), 3500);
    }
  }

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
          {}
          {(stage === "code" || stage === "wrong") && (
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
                      <h3 className="font-playfair font-bold text-lg">Restricted</h3>
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
                        setStage("code");
                        setCode("");
                      }}
                      className="mt-5 px-5 py-2.5 rounded-lg bg-emerald text-white font-semibold text-sm hover:bg-emerald-dark transition-colors"
                    >
                      Try again
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="panel-code"
                        className="block text-sm font-medium text-emerald-dark mb-2"
                      >
                        Enter code
                      </label>
                      <div className="relative">
                        <input
                          id="panel-code"
                          type={showCode ? "text" : "password"}
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          autoFocus
                          autoComplete="off"
                          placeholder="••••••••••"
                          className="w-full px-4 py-3 pr-12 rounded-xl bg-cream/40 border border-emerald/20 text-emerald-dark focus:outline-none focus:ring-2 focus:ring-emerald/50 focus:border-emerald/40"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCode((s) => !s)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald/60 hover:text-emerald transition-colors"
                          aria-label={showCode ? "Hide code" : "Show code"}
                          tabIndex={-1}
                        >
                          {showCode ? (
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

          {}
          {stage === "open" && (
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden"
            >
              {}
              <div className="bg-gradient-to-br from-emerald-dark via-emerald to-emerald-dark p-5 text-cream relative">
                <div className="absolute inset-0 pattern-grid opacity-10" />
                <div className="relative flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center ring-1 ring-gold/30 shrink-0">
                      <Lock className="w-5 h-5 text-gold-light" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-playfair font-bold text-lg">
                        Private Notes
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

              {}
              <div className="p-6 space-y-4">
                {}
                <div>
                  <label
                    htmlFor="panel-b1"
                    className="block text-sm font-semibold text-emerald-dark mb-2"
                  >
                    Dumbi Box
                  </label>
                  <textarea
                    id="panel-b1"
                    value={dumbiMessage}
                    onChange={(e) => setDumbiMessage(e.target.value)}
                    rows={4}
                    placeholder="First half of your private note. Saved encrypted to the cloud — accessible from any browser after unlocking."
                    className="w-full px-4 py-3 rounded-xl bg-cream/40 border border-emerald/20 text-ink leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald/50 focus:border-emerald/40 resize-none"
                  />
                </div>

                {}
                <div>
                  <label
                    htmlFor="panel-b2"
                    className="block text-sm font-semibold text-emerald-dark mb-2"
                  >
                    Dumbo Box
                  </label>
                  <textarea
                    id="panel-b2"
                    value={dumboMessage}
                    onChange={(e) => setDumboMessage(e.target.value)}
                    rows={4}
                    placeholder="Second half of your private note. Both halves are encrypted together using your code."
                    className="w-full px-4 py-3 rounded-xl bg-cream/40 border border-emerald/20 text-ink leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald/50 focus:border-emerald/40 resize-none"
                  />
                  {}
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

                {}
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

                <div className="pt-3 border-t border-emerald/10 text-xs text-ink/55 leading-relaxed space-y-1">
                  <p>
                    This panel auto-locks in{" "}
                    <span className="font-semibold text-emerald-dark">
                      {remainingSec}
                    </span>{" "}
                    seconds, or when you scroll up sharply, refresh, or close the page.
                  </p>
                  <p className="text-ink/45">
                    A notification is sent on every edit.
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
