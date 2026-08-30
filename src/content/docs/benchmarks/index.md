---
title: SpQE vs Kiro
description: Three executable comparative benchmarks of specification-driven software generation.
sidebar:
  label: Overview
  order: 1
---

## Comparative benchmark series

This series compares **SpQE** and **Kiro** on three independently generated Python command-line programs.

The purpose is not subjective code review. Each result comes from executable black-box controls over observable behaviour. The table distinguishes first-generation evidence from any later repair result; scores with different denominators are not aggregated.

## Overall result

Across the three first-generation observations, **Kiro is currently the more robust system**.

SpQE still generates substantial domain logic and public behaviour, but its first-shot failures are more often caused by cross-module contract mismatches. An early mismatch can also prevent downstream controls from being reached, as shown by Data Workspace.

The remaining SpQE engineering problem is therefore identifiable and measurable: improve first-shot semantic consistency between generated modules while preserving executable qualification and targeted repair.

| Benchmark | Generation time | First-generation evidence | Repair outcome in this series |
| --- | --- | --- | --- |
| [Transaction Reconciliation](./transaction-reconciliation/) | Kiro <3 min · SpQE 14 min | Kiro 111/112 · SpQE 93/112* | SpQE **112/112** after 2 targeted repairs |
| [Data Workspace natural](./data-workspace-natural/) | Kiro 8m12 · SpQE 9m40 | Kiro 158/179 · SpQE 120 passes among 152 evaluated; 27 not reached | None; both prototypes remain first-shot |
| [NoiseDoseLab](./noisedoselab/) | Kiro 8 min · SpQE **6 min** | Kiro 251/254 · SpQE 215/250 | None |

\* SpQE score recorded after removal of one blocking micro-defect and before the two targeted repairs reported in the final column.

## How to read the numbers

- A failed control is an observation, not necessarily an independent root defect.
- A control not reached is neither a pass nor a failure.
- Data Workspace uses the same 179-control design, but the SpQE run reached only 152 controls because an early workspace integration defect blocked downstream scenarios.
- NoiseDoseLab uses different recorded denominators, so its scores describe separate executable trajectories rather than a common-test ranking.
- Only Transaction Reconciliation includes a completed repair cycle in this comparative series.

## Current research direction

The evidence does not support a claim that SpQE beats Kiro at first generation. It supports a more useful engineering conclusion: SpQE already exposes a measurable generation–qualification–repair trajectory, and its dominant first-shot weakness is contract closure rather than an absence of underlying domain logic.

The next relevant experiment is to run the same pipeline with another coding-model backend, including a Mistral model, and measure the effect on consistency, cost and repair effort.

The underlying specifications, test batteries, raw results, generated sources and repair traces are being prepared for publication.
