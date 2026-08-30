---
title: Data Workspace natural
description: Comparative executable benchmark: local data workspace management CLI.
sidebar:
  label: Data Workspace natural
  order: 3
---

## Benchmark at a glance

A local data-workspace CLI manages workspaces, sources, transforms, runs, reports, configuration profiles, JSON output, and deterministic local state. This comparative benchmark uses the natural-language specification rather than the earlier public vitrine experiment documented elsewhere on this site.

| Measure | Kiro | ARCHCode |
| --- | ---: | ---: |
| Generation time | 8m12 | 9m40 |
| First result | Local defect identified | Local defect identified |
| Final black-box score | 223 / 235 | **179 / 179** |
| ARCHCode targeted local repairs | — | 2 |

## Generation → qualification → repair

**Generation.** Both systems received the same natural-language specification for a multi-command data-workspace CLI.

**Initial qualification.** Each generated program presented a local, observable defect. The benchmark therefore did not treat a first run as the final result.

**Local repair.** ARCHCode applied two targeted repairs guided by black-box failures rather than a full regeneration.

**Final result.** ARCHCode reached **179 / 179** executable controls. Kiro reached **223 / 235** controls in the recorded qualification battery.

## Takeaway

This benchmark matters because it stresses module interaction rather than an isolated calculation. ARCHCode could close its cross-module defects through a short repair loop and reach complete qualification on its test battery. It is not evidence of a general victory over Kiro: the test batteries and final totals differ, and the Kiro result retains the larger control surface.

## Related historical experiment

The existing [Data Workspace CLI experiment](../experiments/data-workspace/) remains available as an earlier ARCHCode public-vitrine report. It is not the same run and must not be used as the comparative benchmark result.

## Evidence

- [Benchmark overview](../)
- Specification, black-box battery, raw results, generated source and repair trace: publication package in preparation.
