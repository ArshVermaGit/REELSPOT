# Contributing to Reelspot

First off, thank you for considering contributing to Reelspot! It's people like you that make Reelspot such a great tool.

## Code of Conduct

By participating in this project, you agree to abide by our [**Code of Conduct**](./CODE_OF_CONDUCT.md). Please read it to understand the expectations for behavior in our community.

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report for Reelspot. Following these guidelines helps maintainers and the community understand your report, reproduce the behavior, and find related reports.

- **Check Documentation**: Ensure the behavior isn't already documented.
- **Search Issues**: See if the bug has already been reported.
- **Open an Issue**: Use the [**Bug Report Template**](https://github.com/arshverma/REELSPOT/issues/new?assignees=&labels=bug&template=bug_report.md) (if available) and provide as much detail as possible.

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for Reelspot, including completely new features and minor improvements to existing functionality.

- **Search Issues**: See if the enhancement has already been suggested.
- **Open an Issue**: Use the [**Feature Request Template**](https://github.com/arshverma/REELSPOT/issues/new?assignees=&labels=enhancement&template=feature_request.md) (if available).

### Your First Code Contribution

Unsure where to begin contributing to Reelspot? You can start by looking through these `good-first-issue` and `help-wanted` issues:

- **Good First Issues**: [Issues which should only require a few lines of code.](https://github.com/arshverma/REELSPOT/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22)
- **Help Wanted Issues**: [Issues which should be a bit more involved.](https://github.com/arshverma/REELSPOT/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)

## Pull Request Process

1.  **Fork the repo** and create your branch from `main`.
2.  **Branch Naming**: Use descriptive names like `feat/feature-name`, `fix/bug-name`, `docs/doc-improvement`.
3.  **Code Style**:
    - Follow the existing code structure (React components in `src/components`, hooks in `src/hooks`).
    - Use Tailwind CSS for styling.
    - Ensure your code is lint-free (`npm run lint` if available).
4.  **Commits**: Use [**Conventional Commits**](https://www.conventionalcommits.org/) (e.g., `feat: add instagram downloader`, `fix: header responsiveness`).
5.  **Documentation**: Update the README or `/docs` if your change affects how the project is used.
6.  **Pull Request**:
    - Fill out the PR template clearly.
    - Reference any related issues (e.g., `Closes #123`).
    - Include screenshots or videos for UI changes.
7.  **Review**: Wait for feedback from the maintainers. Be prepared to make changes if requested.

## 🛠️ Adding a New Platform

Reelspot uses a **Strategy Pattern** for handling different platforms. To add a new platform (e.g., Pinterest):

1.  **Detection**: Add a new regex pattern and update `detectPlatform` in [platformDetector.js](file:///Users/arshverma/GitHub/REELSPOT/src/services/platformDetector.js).
2.  **Service**: Create `src/services/platforms/pinterest.service.js`. It should export a function `fetchPinterestData(url, apiKey)`.
3.  **Registry**: Register your new service in [download.service.js](file:///Users/arshverma/GitHub/REELSPOT/src/services/download.service.js):
    ```javascript
    import { fetchPinterestData } from "./platforms/pinterest.service.js";
    registerPlatform(PLATFORMS.PINTEREST, fetchPinterestData);
    ```
4.  **UI**: Add the platform icon and color to the `Hero`, `DownloadForm`, and `SupportedPlatforms` components.

## Style Guide

- **JavaScript**: Use ES6+ syntax.
- **React**: Preferred functional components and hooks.
- **CSS**: Use Tailwind utility classes. Avoid custom CSS unless absolutely necessary (add to `src/index.css`).

Thank you for your contributions!
