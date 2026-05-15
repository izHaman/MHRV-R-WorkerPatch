# MasterHttpRelayVPN-Rust Cloudflare Worker Patch

[English](README.md) | [فارسی](README_FA.md)

Customized and hardened relay-side scripts for the MasterHttpRelayVPN ecosystem.

---

## About

This repository does **not** contain the full original project.

It contains modified versions of:

- `worker.js`
- `Code.gs`

These files are intended for personal/public use, experimentation, compatibility improvements, and relay-side stability enhancements.

This repository should be considered a small derived customization layer rather than an official fork or replacement for the upstream projects.

---

## Credits

Original project and core idea:

- [MasterHttpRelayVPN by Masterking32](https://github.com/Masterking32/MasterHttpRelayVPN?utm_source=chatgpt.com)

Related implementation/reference project:

- [MasterHttpRelayVPN-Rust by therealaleph](https://github.com/therealaleph/MasterHttpRelayVPN-Rust?utm_source=chatgpt.com)


---

## Changes

Changes made to the relay-side scripts include:

- Improved request validation
- Safer JSON parsing and error handling
- Better handling of malformed or empty request bodies
- Reduced chances of runtime crashes caused by invalid requests
- Cleaner self-fetch protection logic
- More predictable HTTP method handling
- Minor structural cleanup and readability improvements
- Safer request normalization inside Google Apps Script
- Better relay-side stability and maintainability

---

## Usage

These modified files are designed to replace the original relay-side scripts used in:

- [MasterHttpRelayVPN-Rust](https://github.com/therealaleph/MasterHttpRelayVPN-Rust?utm_source=chatgpt.com)

This repository alone is not intended to function as a standalone implementation of the upstream ecosystem.

---

## Notes

The exact upstream source/version these files originally came from is unknown because they were initially shared privately and later modified.

This repository aims to preserve compatibility with the existing ecosystem while improving safety, stability, and maintainability.

---

## License

This repository is released under the MIT License.

Credits and attribution belong to:

- Masterking32
- therealaleph
- izHaman

Please preserve attribution and respect upstream license requirements where applicable.
