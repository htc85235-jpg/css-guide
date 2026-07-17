# Security Policy

## Reporting a Vulnerability

This repository powers the public website at **https://htc85235-jpg.github.io/css-guide/**.

If you discover a security vulnerability — for example, a way to bypass the
owner-vault password check, read encrypted vault contents without
authorization, or extract the owner's Gmail address from the bundle — please
report it **privately** instead of opening a public issue.

- **Email:** (preferred) Send details to the owner through the "Ask a Question"
  form on the website. Mark your subject as `[SECURITY]`.
- **Do NOT open a public issue** disclosing the vulnerability until the owner
  has acknowledged and patched it.

## Scope

The following are considered in-scope for security reports:

- The owner-vault authentication flow (password verification, encryption,
  decryption, cloud sync).
- The Ask-Question form submission flow.
- Any path that could expose the owner's password or email address from the
  bundled JavaScript or rendered HTML.

The following are out of scope:

- The fact that the repository is public and can be forked/cloned — this is
  inherent to GitHub Free tier's public repos and is by design.
- The fact that the static HTML/JS bundle is publicly downloadable by anyone
  visiting the live site — this is how static hosting works.

## Security Model

### Owner Vault

- The vault password is **never** stored as plaintext in source, bundle, or
  rendered HTML. Only its SHA-256 hash is present, split into chunks and
  reversed for obfuscation.
- At runtime, the user's input is hashed via the Web Crypto API
  (`crypto.subtle.digest("SHA-256", ...)`) and compared to the reassembled hash.
- Vault contents (Dumbi + Dumbo boxes) are encrypted with **AES-GCM** using a
  256-bit key derived from the password via **PBKDF2** (150,000 iterations,
  SHA-256, 16-byte random salt). A fresh 12-byte IV is generated on every save.
- The encrypted vault is stored in a **separate private repository**
  (`htc85235-jpg/cssbesthub-vault`) — only the encrypted ciphertext is
  persisted there. Without the password, the ciphertext cannot be decrypted.

### Owner Email

- The owner's Gmail address is **never** stored as plaintext in source, bundle,
  or rendered HTML. It is split into chunks and reversed for obfuscation.
- The address is reassembled at runtime only when needed to build the
  FormSubmit.co endpoint URL.

### GitHub Token

- The deploy token used by `scripts/deploy-gh-pages.js` is **never** stored as
  plaintext. It is split into chunks and reversed for obfuscation.
- The token has **only** the `repo` scope — no `workflow`, `delete_repo`,
  `admin:org`, or other privileged scopes.
- The token is embedded in the deploy script, which lives only in the local
  workspace and is **not** pushed to the public repo.

## Hardening Applied to This Repository

- Issues, Projects, Wiki, Discussions, Downloads — all disabled.
- Only squash merges are allowed; merge commits and rebase merges are disabled.
- Branches deleted automatically after merge.
- Branch protection on `main`:
  - `enforce_admins` is on — even the owner cannot bypass protection.
  - `allow_force_pushes` is off — no history rewriting.
  - `allow_deletions` is off — branch cannot be deleted.
  - `required_linear_history` is on — no merge commits.
- Branch protection on `gh-pages`:
  - `enforce_admins` is on.
  - `allow_deletions` is off.
- Dependabot vulnerability alerts + automated security fixes are enabled.

## Acknowledgements

Reporters of legitimate security issues will be credited here (with their
permission) once the issue is patched.
