#!/usr/bin/env python3
"""
Check the current state of vault.json in the cssbesthub-vault repo.
If it contains plaintext message data (legacy format), encrypt it using
the owner password (slowdumbo) via AES-GCM (matching the JS implementation)
and rewrite it as the new encrypted format.
"""
import base64
import json
import os
import sys
import urllib.request
import urllib.error

# --- Config ---
OWNER_PASSWORD = "slowdumbo"
VAULT_REPO = "htc85235-jpg/cssbesthub-vault"
VAULT_FILE = "vault.json"
VAULT_BRANCH = "main"

# Reassemble the obfuscated GitHub token (same logic as owner-panel.tsx)
_T_PARTS = ["29qlr0ULgl", "0fjkA5r8OK", "yrxsffycRz", "o78xmE_phg"]
def _t():
    # reverse each part, then concat in reverse order
    return "".join(p[::-1] for p in _T_PARTS[::-1])

TOKEN = _t()
API_BASE = f"https://api.github.com/repos/{VAULT_REPO}/contents/{VAULT_FILE}"

# --- AES-GCM via Python's cryptography library ---
# Match the JS Web Crypto API parameters:
#   - PBKDF2 with SHA-256, 150000 iterations, 16-byte salt
#   - AES-GCM with 256-bit key, 12-byte IV

def derive_key(password: str, salt: bytes) -> bytes:
    """PBKDF2-HMAC-SHA256, 150000 iterations, 32-byte (256-bit) output."""
    import hashlib
    return hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, 150000, dklen=32)

def aes_gcm_encrypt(key: bytes, iv: bytes, plaintext: bytes) -> bytes:
    """AES-GCM encrypt. Returns ciphertext + 16-byte GCM tag appended (NIST standard)."""
    try:
        from cryptography.hazmat.primitives.ciphers.aead import AESGCM
    except ImportError:
        print("ERROR: 'cryptography' library not installed. Run: pip install cryptography", file=sys.stderr)
        sys.exit(1)
    aesgcm = AESGCM(key)
    return aesgcm.encrypt(iv, plaintext, associated_data=None)

def aes_gcm_decrypt(key: bytes, iv: bytes, ciphertext: bytes) -> bytes:
    from cryptography.hazmat.primitives.ciphers.aead import AESGCM
    aesgcm = AESGCM(key)
    return aesgcm.decrypt(iv, ciphertext, associated_data=None)

def fetch_vault():
    """GET the vault.json file from GitHub. Returns (sha, parsed_json_or_None)."""
    url = f"{API_BASE}?ref={VAULT_BRANCH}"
    req = urllib.request.Request(url, headers={
        "Authorization": f"Bearer {TOKEN}",
        "Accept": "application/vnd.github+json",
    })
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            sha = data.get("sha")
            content_b64 = (data.get("content") or "").replace("\n", "")
            if not content_b64:
                return sha, None
            decoded = base64.b64decode(content_b64).decode("utf-8")
            return sha, json.loads(decoded)
    except urllib.error.HTTPError as e:
        if e.code == 404:
            return None, None
        print(f"HTTP error fetching vault: {e.code} {e.reason}", file=sys.stderr)
        sys.exit(1)

def put_vault(sha, content_json_str):
    """PUT the encrypted vault.json back to GitHub."""
    content_b64 = base64.b64encode(content_json_str.encode("utf-8")).decode("utf-8")
    body = json.dumps({
        "message": "Migrate vault to encrypted format (AES-GCM + PBKDF2)",
        "content": content_b64,
        "sha": sha,
        "branch": VAULT_BRANCH,
    }).encode("utf-8")
    req = urllib.request.Request(API_BASE, data=body, method="PUT", headers={
        "Authorization": f"Bearer {TOKEN}",
        "Accept": "application/vnd.github+json",
        "Content-Type": "application/json",
    })
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        print(f"HTTP error putting vault: {e.code} {e.reason}", file=sys.stderr)
        print(e.read().decode("utf-8"), file=sys.stderr)
        sys.exit(1)

def main():
    print(f"Checking vault at {API_BASE}...")
    sha, parsed = fetch_vault()

    if parsed is None:
        print("Vault is empty or doesn't exist yet. Nothing to migrate.")
        print("The next time the owner saves a message via the website, it will be encrypted.")
        return

    print(f"Current vault content (sha: {sha}):")
    print(json.dumps(parsed, indent=2))

    # Detect format
    is_encrypted = (
        isinstance(parsed, dict)
        and "ciphertext" in parsed
        and "salt" in parsed
        and "iv" in parsed
    )
    is_legacy = (
        isinstance(parsed, dict)
        and "message" in parsed
        and "ciphertext" not in parsed
    )

    if is_encrypted:
        print("\nVault is ALREADY in encrypted format. Verifying decryption with owner password...")
        salt = base64.b64decode(parsed["salt"])
        iv = base64.b64decode(parsed["iv"])
        ct = base64.b64decode(parsed["ciphertext"])
        key = derive_key(OWNER_PASSWORD, salt)
        try:
            pt = aes_gcm_decrypt(key, iv, ct)
            print(f"  Decryption OK. Plaintext length: {len(pt)} bytes")
            print(f"  Plaintext (first 80 chars): {pt.decode('utf-8')[:80]!r}")
            print("\nNo migration needed.")
        except Exception as e:
            print(f"  Decryption FAILED: {e}")
            print("  The vault was encrypted with a different password.")
            sys.exit(1)
        return

    if not is_legacy:
        print("\nVault doesn't match either known format. Manual inspection required.")
        sys.exit(1)

    # Legacy plaintext format — migrate
    print("\nLegacy plaintext format detected. Migrating to encrypted format...")
    message = parsed.get("message", "")
    read = bool(parsed.get("read", False))
    updated_at = parsed.get("updatedAt", "")

    print(f"  Plaintext message length: {len(message)} chars")
    print(f"  Plaintext message (first 80 chars): {message[:80]!r}")

    # Encrypt
    import os
    salt = os.urandom(16)
    iv = os.urandom(12)
    key = derive_key(OWNER_PASSWORD, salt)
    ciphertext = aes_gcm_encrypt(key, iv, message.encode("utf-8"))

    new_payload = {
        "v": 1,
        "salt": base64.b64encode(salt).decode("utf-8"),
        "iv": base64.b64encode(iv).decode("utf-8"),
        "ciphertext": base64.b64encode(ciphertext).decode("utf-8"),
        "read": read,
        "updatedAt": updated_at,
    }
    print("\nNew encrypted payload:")
    print(json.dumps({**new_payload, "ciphertext": new_payload["ciphertext"][:60] + "..."}, indent=2))

    # Verify decryption round-trips
    pt = aes_gcm_decrypt(key, iv, ciphertext)
    assert pt.decode("utf-8") == message, "Round-trip verification failed!"
    print("  Round-trip verification: OK")

    # Push to GitHub
    print(f"\nPushing encrypted vault to GitHub (sha: {sha})...")
    result = put_vault(sha, json.dumps(new_payload))
    new_sha = result.get("content", {}).get("sha")
    print(f"  Done. New sha: {new_sha}")
    print("\nMigration complete. The vault.json file in GitHub now contains only")
    print("base64-encoded AES-GCM ciphertext — plaintext is no longer visible.")

if __name__ == "__main__":
    main()
