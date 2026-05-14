# MasterHttpRelayVPN-Rust cloudflare worker patch

[English](README.md) | [Farsi](README_FA.md)

Customized Cloudflare Worker script for use with the MasterHttpRelayVPN ecosystem.

---

## About

This repository does **"not"** contain the full original project.

It only contains a modified/customized version of `worker.js`, intended for personal/public use, experimentation, and compatibility improvements.

This repository should be considered a small derived customization layer rather than an official fork or replacement for the original projects.

---

## Credits

Original project and core idea:

- [MasterHttpRelayVPN by Masterking32](https://github.com/Masterking32/MasterHttpRelayVPN?utm_source=chatgpt.com)

Related implementation/reference project:

- [MasterHttpRelayVPN-Rust by therealaleph](https://github.com/therealaleph/MasterHttpRelayVPN-Rust?utm_source=chatgpt.com)

---

## Changes

Changes made to `worker.js` include:

- Improved request validation
- Safer JSON parsing and error handling
- Better handling of invalid or empty request bodies
- Reduced chances of runtime crashes caused by malformed requests
- Cleaner self-fetch protection logic
- More predictable HTTP method handling
- Minor structural cleanup and readability improvements

---

## Usage

This worker is intended to be used in:

- [MasterHttpRelayVPN-Rust](https://github.com/therealaleph/MasterHttpRelayVPN-Rust?utm_source=chatgpt.com)

This repository alone is not a standalone replacement for the upstream ecosystem.

---

## Notes

The exact upstream source/version this file originally came from is unknown because it was initially shared privately and later modified.

---

## License

This repository is released under the MIT License.


Credits and attribution belong to:

- Masterking32
- therealaleph
- izHaman
