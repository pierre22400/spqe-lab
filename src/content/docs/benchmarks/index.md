---
title: SpQE vs Kiro
description: Three executable comparative benchmarks of specification-driven software generation.
sidebar:
  label: Overview
  order: 1
---

## Comparative benchmark series

This series compares **SpQE** and **Kiro** on three independently generated Python command-line programs.

The purpose is not subjective code review. For each benchmark, both systems received the same functional target and were assessed through executable black-box qualification against observable behaviour. The recorded batteries were not always identical between systems, so scores with different denominators must not be read as a shared-test leaderboard. Results distinguish:

- first-generation behaviour;
- targeted local repair work performed after qualification;
- final executable result where a repair cycle was completed.

The pages below publish the recorded result summaries. The underlying specifications, batteries, raw results, generated sources and repair traces are still being prepared for publication.

## Overall result

Kiro is currently the more robust system at first generation. SpQE nevertheless repeatedly generates the underlying business logic and, after a small number of local repairs, can reach complete executable qualification.

Across the three experiments, the dominant SpQE failure mode is **cross-module contract closure**: local modules and business rules are present, but their command-line, data, or integration contracts do not fully converge on the first generation.

| Benchmark | Generation time | Recorded executable result | SpQE repair status |
| --- | --- | --- | --- |
| [Transaction Reconciliation](./transaction-reconciliation/) | Kiro <3 min · SpQE 14 min | Kiro 111/112 · SpQE 93/112* | **112/112** after 2 targeted repairs |
| [Data Workspace natural](./data-workspace-natural/) | Kiro 8m12 · SpQE 9m40 | Kiro 223/235 · SpQE **179/179** | Full pass on the SpQE battery after 2 targeted repairs; denominators differ |
| [NoiseDoseLab](./noisedoselab/) | Kiro 8 min · SpQE **6 min** | Kiro **251/254** · SpQE 215/250 | No comparative repair cycle recorded |

\* Score recorded after removal of one blocking micro-defect, before the two targeted local corrections that completed qualification.

## Methodological note

The benchmark is deliberately limited to executable controls. It does not claim that either system is universally superior. Within each benchmark, the functional target is shared; where qualification batteries or denominators differ, the scores document separate run trajectories rather than a direct common-test comparison.

SpQE remains an experimental and minimally optimized pipeline. The current evidence supports a concrete engineering hypothesis: improve first-shot semantic consistency between modules while preserving the demonstrated generation, black-box qualification, and local-repair loop.
