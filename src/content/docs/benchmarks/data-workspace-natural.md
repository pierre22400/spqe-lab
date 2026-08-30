---
title: Data Workspace natural
description: "Comparative executable benchmark: local data workspace management CLI."
sidebar:
  label: Data Workspace natural
  order: 3
---

## Benchmark at a glance

A local data-workspace CLI manages workspaces, sources, transforms, runs, reports, configuration profiles, JSON output, and deterministic local state. This comparative benchmark uses the natural-language specification rather than the earlier public vitrine experiment documented elsewhere on this site.

| Measure | Kiro | SpQE |
| --- | ---: | ---: |
| Generation time | 8m12 | 9m40 |
| Shared black-box battery | 179 controls | 179 controls |
| Recorded result | 158 / 179 | **179 / 179** |
| Failed controls | 21 | 0 |
| Scenarios in failure | 11 | 0 |
| Targeted local repairs before recorded result | 0 | 2 |

## Generation → qualification → repair

**Generation.** Both systems received the same natural-language specification for a multi-command data-workspace CLI.

**Shared qualification.** The Kiro CLI was exercised through the same 53-command, 179-control black-box battery used for the SpQE comparison. The captured Kiro run passed **158 / 179** controls and reported **21 failed controls across 11 scenarios**. The failures included parser-diagnostic contract mismatches and a report-export defect involving the missing `output_format` argument.

**Local repair.** Two targeted repairs were applied to the SpQE prototype from black-box failure evidence rather than performing a full regeneration. This public summary does not characterize the repair step as fully autonomous. No equivalent Kiro repair cycle is included in the captured run.

**Recorded result.** SpQE reached **179 / 179 after two targeted repairs**. Kiro reached **158 / 179 without a repair cycle** on the same battery.

## Takeaway

This is now a direct same-battery comparison, but not a first-shot-versus-first-shot comparison: the published SpQE result follows two targeted repairs, whereas the captured Kiro result is uncorrected. The result demonstrates that the repaired SpQE prototype closes the shared executable contract completely. It does not establish that SpQE is more robust at first generation.

An earlier Kiro campaign recorded **223 / 235** under a different qualification battery. That historical score is not used as the comparative result on this page.

## Related historical experiment

The existing [Data Workspace CLI experiment](../../experiments/data-workspace/) remains available as an earlier SpQE public-vitrine report. It is not the same run and must not be used as the comparative benchmark result.

## Evidence

- [Benchmark overview](../)
- Shared 179-control battery, raw machine-readable results, generated sources and repair trace: publication package in preparation.
