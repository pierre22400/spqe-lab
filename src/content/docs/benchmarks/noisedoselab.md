---
title: NoiseDoseLab
description: "Comparative executable benchmark: occupational noise exposure screening CLI."
sidebar:
  label: NoiseDoseLab
  order: 4
---

## Benchmark at a glance

NoiseDoseLab is a scientific Python CLI for deterministic occupational noise-exposure screening. It validates CSV input, calculates defined metrics, applies scenarios, renders deterministic text or JSON, and provides an associated user manual.

| Measure | Kiro | SpQE |
| --- | ---: | ---: |
| Generation time | 8 min | **6 min** |
| Initial black-box score | **251 / 254** | 215 / 250 |
| Repair cycle in this comparative series | Not applicable | Not completed |

## Generation → initial qualification

**Generation.** Both systems received the same functional target: a scientific, deterministic CLI with data validation, defined calculations, scenarios, reporting, and documentation.

**Initial qualification.** Kiro reached 251 of 254 executable controls. SpQE passed 215 of 250. The SpQE calculation logic was judged correct on the checked scientific behaviours, but cross-module contract closure and integration consistency required further work.

**Boundary of this result.** Unlike the first two benchmarks, no comparative local-repair cycle was completed for SpQE in this series. The score must therefore remain an initial-generation result.

## Takeaway

NoiseDoseLab is the most demanding benchmark in the series because it combines scientific calculation, CLI behaviour, validation, reporting and documentation. It reinforces the central finding: the remaining SpQE weakness is identifiable as first-shot integration consistency, not simply missing business logic.

## Related historical experiment

The existing [NoiseDoseLab experiment](../../experiments/noisedoselab/) documents a separate qualified SpQE run and remains available as historical evidence. It must not be conflated with this Kiro comparison.

## Evidence

- [Benchmark overview](../)
- Specification, black-box battery, raw results, generated source and repair trace: publication package in preparation.
