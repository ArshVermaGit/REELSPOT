# ⚙️ Perfect Repository Settings Guide

To make this repository truly "world-class" and contribution-friendly, apply the following settings in your GitHub repository dashboard.

## 1. General Settings

- **Features**:
  - [x] Wikis (Enable for documentation)
  - [x] Issues (Enable)
  - [x] Discussions (Enable for community chat)
  - [x] Projects (Optional)
- **Pull Requests**:
  - [x] Allow squash merging (Recommended for clean history)
  - [x] Automatically delete head branches

## 2. Access & Security

- **Dependabot**: Enable security updates to keep dependencies safe.
- **Code Scanning**: Enable if available (GitHub Advanced Security).

## 3. Branches (Protection Rules)

Go to **Settings > Branches** and add a fallback rule for `main`:

1.  **Require a pull request before merging**
    - [x] Require approvals (1 is standard)
2.  **Require status checks to pass before merging**
    - [x] Search and select `build (18.x)` or `Linting Check` (from our CI workflow)
3.  **Require conversation resolution before merging**
4.  **Do not allow bypassing the above settings**

## 4. Labels (Standardize)

Create these labels for clear categorization:

- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Improvements or additions to documentation
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention is needed
- `platform: new`: Request for a new social platform

## 5. Actions (CI/CD)

Ensure **Read and write permissions** are set if you plan to auto-deploy.

- Generally, "Read repository contents and package permissions" is safe for CI.

## 6. Environments (Optional)

Create environments for `production` and `preview` if deploying to Vercel/Netlify for better tracking.

---

_This guide is internal documentation for the repository owner._
