# Team-Neura - Land Distribution System (Blockchain Land Registry Prototype)

## TL;DR

This repository contains the Team-Neura Land Distribution System  a prototype and documentation for a blockchain-backed land registry focused on addressing India's land record inefficiencies, disputes, and lack of clear title ownership. The project outlines architecture, smart-contract concepts, and a developer-friendly guide to run and extend the prototype locally.

## Why this matters

India's land registry system suffers from outdated paper records, fragmented data silos, unclear or presumptive land titles, and high volumes of property disputes. These problems impose real economic costs: reduced access to credit, long litigation timelines, and fraud. A secure, auditable, and tamper-evident blockchain registry combined with smart contracts can:

- Make property history auditable and tamper-resistant.
- Reduce fraud and double-selling of the same asset.
- Automate parts of transactions (transfers, escrow, payments) with smart contracts.
- Create a single canonical source of truth across stakeholders.

## Project scope and goal

This repository provides a clear blueprint and initial prototype for a blockchain-backed land registry system tailored to the Indian context. It is intended as:

- A technical reference for public-sector pilots and researchers.
- A developer sandbox for implementing and testing smart-contract primitives for land title registration, transfer, and dispute metadata.
- A living document describing the problem, the proposed solution, data model, security considerations, and next steps.

## Problem summary

The existing system is often paper-first, inconsistent across jurisdictions, and legally presumptive (titles can be challenged). Property disputes make up a large share of civil litigation. Digitization efforts are incomplete and fragmented. The upshot: property is hard to verify, transact, and use as collateral.

## How blockchain helps (short)

Blockchain provides an append-only, verifiable ledger where property records and ownership transfers can be recorded. Smart contracts can codify transfer rules and automate escrow or validation steps. Together, these reduce tampering, simplify audits, and can lower dispute frequency and transaction time.

## Key features (what a pilot/implementation should provide)

- Immutable property record storage (on-chain hashes / metadata on-chain with detailed off-chain documents)
- Ownership registry with provenance history (who owned the land, when, and how it changed)
- Transfer workflows executed by smart contracts (with roles for registrars, buyers, sellers, and courts)
- Role-based access control and permissioning for sensitive data
- Dispute metadata (link records to ongoing cases rather than deleting/modifying records)
- Pluggable off-chain storage for large documents (IPFS/secure cloud) with on-chain anchors

## Contract: design contract (inputs/outputs, success criteria)

- Inputs: property metadata (unique parcel id), ownership proof documents (hashes), registrar signatures, transfer requests, timestamps.
- Outputs: on-chain record id, ownership history entries, transfer receipts, event logs for off-chain listeners.
- Success criteria: recorded transactions are discoverable, provenance is complete, hashes match off-chain documents, and a legal stakeholder can validate the chain-of-title.
- Error modes: invalid signatures, duplicate asset registration attempts, conflicting transfers (handled by lock or sequence rules), and off-chain document mismatch.

## Simple data model (example)

- Parcel { parcelId, geoBoundaryHash, surveyNumber, district, state }
- TitleRecord { recordId, parcelId, ownerAddress, timestamp, documentHash, registrarSignature }
- Transfer { transferId, fromAddress, toAddress, parcelId, timestamp, escrowContractAddress?, status }

## Architecture overview

- Frontend (optional): UI for registrars, buyers, and public viewers.
- Smart contracts: ownership registry, transfer contract, dispute contract, role management.
- Off-chain storage: IPFS or secure cloud for large deeds/scans; store only cryptographic hashes on-chain.
- Indexer/API: a backend service that listens to contract events and offers rich queries for search and display.

## Security and legal considerations

- On-chain immutability means mistakes are hard to revert — provide reversal/dispute mechanisms that append corrective records rather than delete history.
- Sensitive personal details should not be stored on-chain — store hashes and keep PII off-chain with controlled access.
- Any real deployment must be coordinated with legal authorities; blockchain does not magically change statutory land law.

## Try it locally (quick)

This repository contains an Aptos Move package at `land_registry_system` (see `land_registry_system/Move.toml`). The package name is `LandSystem` and the main module is `registry_addr::landregistry` (found under `land_registry_system/sources/landregistry.move`).

Prerequisites: git and an Aptos Move toolchain (the `aptos` CLI). On Windows there are two safe ways to install the `aptos` CLI:

1) Download a prebuilt binary (recommended for non-Rust users)

- Visit the Aptos GitHub releases page (https://github.com/aptos-labs/aptos-core/releases), download the latest Windows `aptos-cli` archive, extract it, and add the folder containing `aptos.exe` to your PATH. This approach avoids installing Rust and Cargo.

2) Install via Rust/Cargo (if you already use Rust)

- Install Rust (https://rustup.rs) so `cargo` is available. Then run:

```bat
:: Run in PowerShell or cmd (requires cargo in PATH)
cargo install --git https://github.com/aptos-labs/aptos-core.git aptos-cli --locked
```

Clone and pull the repo (Windows cmd.exe):

```bat
git clone https://github.com/I-lost-everytime/Team-Neura.git
cd Team-Neura
git pull origin main
```

Compile the Move package and run tests (from the package root `land_registry_system`):

```bat
cd land_registry_system
aptos move compile
aptos move test
```

Notes:
- `aptos move compile` reads the `Move.toml` in the package directory and compiles the Move sources.
- `aptos move test` runs Move unit tests defined in the modules (requires the Aptos toolchain).
- To publish or interact with a node, configure the Aptos CLI (see Aptos docs) and use `aptos move publish` or the appropriate RPC/network settings.

Protect local WIP changes before pulling updates:

```bat
git stash push -m "wip before pull"
git pull --rebase origin main
git stash pop
```

## Edge cases and considerations

- Missing or conflicting off-chain documents: store dispute metadata and a chain of corrective actions.
- Partial / interrupted transactions: design transfer state machine (initiated -> locked/escrow -> completed/failed).
- Large-scale migration: anchor historic legacy records as hashes and provide reconciliation tooling.

## Roadmap / recommended next steps

1. Add a simple smart-contract prototype (OwnershipRegistry) and unit tests.
2. Build a small indexer service that exposes parcel search and history.
3. Create a minimal UI for registrar workflows and public queries.
4. Integrate off-chain storage (IPFS) and anchor logic.
5. Run a pilot with anonymized historic records and a registrar partner.

## Contributing

Contributions are welcome. Please open issues for feature requests and bugs. For code contributions, follow these steps:

1. Fork the repository.
2. Create a feature branch (git checkout -b feature/your-feature).
3. Add tests and documentation for new behavior.
4. Open a pull request describing the change.

## License

This repository does not include a license file yet. For open collaboration, consider using an OSI-approved license such as Apache-2.0 or MIT. Add a `LICENSE` file in the repo root.
