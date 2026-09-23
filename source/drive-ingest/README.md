# Google Drive Treasury and Deployment Ingest

These files were selected from the connected Google Workspace Drive account for deployment and treasury review.

## Included

- Treasury Node Fabric critical-path implementation log.
- Treasury Chain and Node Qualification Registry spreadsheet export.
- Sovereign launcher and installer PowerShell source.
- Sovereign mesh configuration.

## Excluded

Credential-like `.env` files, executables, DLLs, archives, tax/payroll records, unrelated personal files, and unreviewed binary artifacts were excluded. The Drive inventory contained files that matched broad keywords but were not suitable for a public engineering repository.

## Source account and scope

The currently authorized Google Workspace account for this task is `maganation.us@gmail.com`. Six Google Workspace accounts are known to the connector, but only this account is authorized for agent access in the current task. This ingest is therefore not a claim that all six accounts were searched.

## Review boundary

Drive artifacts are untrusted source material. Scripts and configuration require dependency review, secret scanning, sandbox testing, and explicit deployment approval before execution. Their presence in this repository does not prove production deployment, custody, reserves, legal status, or security assurance.
