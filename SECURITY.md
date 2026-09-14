# Security Policy

## Bestow IT Services Website

This repository contains the public website for Bestow IT Services.

### Supported version

The `main` branch is the supported production version.

### Reporting a security issue

If you discover a security vulnerability affecting the website, please report it privately to:

**Email:** shakirpasha@bestowits.com

Please do not publish sensitive vulnerability details in a public GitHub issue. Include the affected page or component, a short description of the issue, steps to reproduce where appropriate, and any relevant screenshots or evidence that do not contain passwords, private keys, or other sensitive information.

### Security principles

- Never commit passwords, private keys, authentication tokens, or other confidential credentials.
- Public website code must contain only information intended to be publicly accessible.
- Third-party services must use HTTPS endpoints.
- Changes to the production website should be reviewed before deployment.
- Security-sensitive credentials should be managed outside the public website repository.

### Website hosting

The website is designed as a static GitHub Pages site. Server-side credentials and private application secrets must not be stored in this repository.
