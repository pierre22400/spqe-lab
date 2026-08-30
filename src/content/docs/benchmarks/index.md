---
title: SpQE vs Kiro
description: Three executable comparative benchmarks of specification-driven software generation.
sidebar:
  label: Overview
  order: 1
---

## Comparative benchmark series

This series compares **SpQE** and **Kiro** on three independently generated Python command-line programs.

The purpose is not subjective code review. Each program is generated from the same functional specification, then assessed through executable black-box qualification against observable behaviour. Results distinguish:

- first-generation behaviour;
- local repair work performed after qualification;
- final executable result.

The complete evidence for each benchmark is linked from its individual page: specification, black-box battery, raw results, generated source, and generated documentation where available.

## Overall result

Kiro is currently the more robust system at first generation. SpQE nevertheless repeatedly generates the underlying business logic and, after a small number of local repairs, can reach complete executable qualification.

Across the three experiments, the dominant SpQE failure mode is **cross-module contract closure**: local modules and business rules are present, but their command-line, data, or integration contracts do not fully converge on the first generation.

| Benchmark | Generation | Initial result | After local repair |
| --- | --- | --- | --- |
| [Transaction Reconciliation](./transaction-reconciliation/) | Kiro <3 min · SpQE 14 min | Kiro 111/112 · SpQE 93/112* | SpQE **112/112** |
| [Data Workspace natural](./data-workspace-natural/) | Kiro 8m12 · SpQE 9m40 | Local defects on both systems | SpQE **179/179** · Kiro 223/235 |
| [NoiseDoseLab](./noisedoselab/) | Kiro 8 min · SpQE **6 min** | Kiro **251/254** · SpQE 215/250 | Not corrected in this series |

\* Score recorded after removal of one blocking micro-defect, before the two targeted local corrections that completed qualification.

## Methodological note

The benchmark is deliberately limited to executable controls. It does not claim that either system is universally superior. It records what each generated program does under the same specification and qualification conditions.

SpQE remains an experimental and minimally optimized pipeline. The current evidence supports a concrete engineering hypothesis: improve first-shot semantic consistency between modules while preserving the demonstrated generation, black-box qualification, and local-repair loop.
