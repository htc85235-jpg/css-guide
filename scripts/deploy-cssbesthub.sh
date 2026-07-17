#!/usr/bin/env bash
# Deploy the built static out/ directory to the cssbesthub repo's main branch.
# This script:
#  1) Initializes a fresh git repo inside out/
#  2) Commits all files
#  3) Force-pushes to the cssbesthub repo's main branch
#  4) The user has already enabled Pages on main → static site goes live.

set -euo pipefail

OUT_DIR="/home/z/my-project/out"
REPO_URL="https://htc85235-jpg:${GITHUB_TOKEN}@github.com/htc85235-jpg/cssbesthub.git"

# Ensure .nojekyll is present (prevents GitHub Pages Jekyll from stripping _next/)
touch "$OUT_DIR/.nojekyll"

# Add a simple README for the repo
cat > "$OUT_DIR/README.md" <<'EOF'
# CSS Best Hub — Pakistan CSS Exam Guide

Static build of the CSS GUIDE website (Next.js 16 static export).
Deployed to GitHub Pages at: https://htc85235-jpg.github.io/cssbesthub/

Source code lives in a separate repo. This branch only contains the built output.
EOF

cd "$OUT_DIR"

# Fresh git init
rm -rf .git
git init -b main
git config user.name "htc85235-jpg"
git config user.email "htc85235@gmail.com"

# Add all files (including dotfiles like .nojekyll)
git add -A
git commit -m "Deploy: CSS Best Hub static site with Ask Question form

- Built with Next.js 16 static export (basePath /cssbesthub)
- Includes 'Ask Question' form using FormSubmit.co → htc85235@gmail.com
- .nojekyll added to prevent Jekyll from stripping _next/" || true

# Force-push to main branch (overwrites any existing content)
git remote add origin "$REPO_URL"
git push -fu origin main

echo ""
echo "✓ Pushed to https://github.com/htc85235-jpg/cssbesthub"
