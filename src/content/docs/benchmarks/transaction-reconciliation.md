---
title: Transaction Reconciliation
description: "Comparative executable benchmark: deterministic transaction reconciliation CLI."
sidebar:
  label: Transaction Reconciliation
  order: 2
---

## Benchmark at a glance

A deterministic Python CLI reconciles two CSV transaction ledgers. It validates input contracts, identifies exact and tolerance-based matches, handles ambiguity, and renders deterministic text or JSON results.

| Measure | Kiro | SpQE |
| --- | ---: | ---: |
| Generation time | <3 min | 14 min |
| Initial black-box score | 111 / 112 | 93 / 112* |
| Targeted local repairs | — | 2 |
| Final SpQE score | — | **112 / 112** |

\* Initial SpQE score reported after a blocking micro-defect was removed; remaining defects were addressed by two narrow local repairs.

## Generation → qualification → repair

**Generation.** Both systems received the same structured functional specification for a non-trivial reconciliation CLI: CSV validation, deterministic matching, ambiguity handling, output formats, and defined exit codes.

**Initial qualification.** Kiro was nearly complete at first pass. SpQE already produced most domain logic, but a limited number of observable contract mismatches remained.

**Local repair.** SpQE repairs targeted the identified defects rather than regenerating the program wholesale.

**Final result.** The SpQE program reached **112 / 112** executable controls.

## Takeaway

The result does not show first-pass equivalence: Kiro was substantially faster and more robust initially. It does show that SpQE’s remaining faults were local and diagnosable, while the business logic and public CLI surface were sufficiently present for full qualification after two repairs.

## Evidence

- [Benchmark overview](../)
- Specification, black-box battery, raw results, generated source and repair trace: publication package in preparation.
