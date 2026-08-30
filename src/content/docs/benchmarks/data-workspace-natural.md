---
title: Data Workspace natural
description: "Comparative executable benchmark: local data workspace management CLI."
sidebar:
  label: Data Workspace natural
  order: 3
---

## Benchmark at a glance

A local data-workspace CLI manages workspaces, sources, transforms, runs, reports, configuration profiles, JSON output, and deterministic local state.

Both Kiro and SpQE were evaluated from their **first generated prototype, without any post-generation repair**. The purpose of this benchmark is to measure first-shot executable quality rather than the ability of either system to repair its own output.

| Measure | Kiro | SpQE |
| --- | ---: | ---: |
| Generation time | 8m12 | 9m40 |
| Black-box commands | 53 | 53 |
| Intended shared battery | 179 controls | 179 controls |
| Controls actually evaluated | 179 | 152 |
| Recorded passes | **158** | **120** |
| Recorded failed controls | 21 | 32 |
| Downstream controls not reached | 0 | 27 |
| Scenarios in failure | 11 | 9 |
| Post-generation repairs | **0** | **0** |

## Generation → qualification → interpretation

**Generation.** Both systems received the same natural-language specification for a multi-command local data-workspace CLI. The generated prototypes were tested as delivered, with no targeted repair and no regeneration before the recorded benchmark run.

**Shared qualification.** Both prototypes were exercised through the same 53-command black-box campaign covering command-line parsing, workspace lifecycle, read-only behavior, sources, transforms, runs, reports, configuration profiles, determinism, and cleanup.

The qualification design contains 179 controls. Kiro reached all 179 controls. The raw SpQE execution recorded only 152 because several detailed downstream checks are conditionally evaluated only after successful upstream operations. Once the initial workspace operation failed, 27 later controls were therefore not reached. These missing controls are not counted as passes.

## Kiro first-shot result

Kiro passed **158 / 179 controls**, with **21 failed controls across 11 scenarios**.

A large part of the Kiro failure count comes from command-line diagnostic formatting. Six invalid-command scenarios correctly returned exit code `2`, but standard `argparse` output included a usage block before the diagnostic, whereas the shared contract expects a single concise line beginning with `error:`. This accounts for 12 failed controls without representing six functional failures.

The clearest functional defect was `report export`. Both JSON and text export failed with:

`error: invalid command arguments: 'output_format'`

Because the export command itself failed, the expected output files were not created and their contents could not be validated. This single root defect therefore generated several failed controls.

The core execution chain nevertheless operated end to end: workspace creation, JSON and CSV sources, transform validation and application, run execution, run history, report summary, profile configuration, determinism, and cleanup were all exercised successfully.

## SpQE first-shot result

SpQE recorded **120 passed controls and 32 failed controls among 152 controls actually evaluated**. A further **27 downstream controls were not reached**.

Unlike Kiro, SpQE passed the complete parser phase, including the concise error-output contract.

The principal first-shot defect appeared immediately afterwards during workspace creation. The CLI accepted:

`workspace init --name ws-main`

but execution returned:

`error: missing required parameter: workspace_name`

The workspace was therefore never created.

This produced a substantial cascade. Source operations subsequently failed because the workspace root did not exist, run operations could not find the workspace, report operations could not access it, and cleanup could not operate on the expected state.

The raw failure count must therefore not be interpreted as 32 independent defects. A significant proportion originates from one early integration mismatch between the CLI argument exposed to the user and the parameter expected by the underlying execution layer.

Configuration handling remained functional, and SpQE also satisfied the complete parser contract.

## Takeaway

This benchmark is now a **first-shot-versus-first-shot comparison**.

Neither result includes a targeted repair cycle.

Kiro demonstrated the stronger end-to-end first-generation result in this experiment. Its principal functional path remained operational, despite parser-output differences and a localized report-export defect.

SpQE showed stronger compliance with the strict CLI diagnostic contract, but an early argument-integration defect prevented workspace creation and propagated through much of the executable workflow.

The current raw logs should not be reduced to a simple comparison of “21 Kiro bugs versus 32 SpQE bugs.” Failed controls are observations, not independent root causes. In both prototypes, several failed controls originate from a much smaller number of underlying defects.

There is also one remaining qualification asymmetry that must be stated explicitly: Kiro reached all **179 controls**, whereas the raw SpQE run reached **152 of 179** because 27 downstream checks were conditionally skipped after earlier failures. Those 27 checks are neither passed nor silently credited to SpQE.

Accordingly, the most defensible current conclusion is qualitative as well as quantitative:

**Kiro produced the more robust first-shot end-to-end prototype in this benchmark, while SpQE produced the cleaner command-line error contract but suffered from an early blocking integration defect.**

No post-generation correction is included in this comparison.


## Related historical experiment

The existing [Data Workspace CLI experiment](../../experiments/data-workspace/) remains available as an earlier SpQE public-vitrine report.

It documents a different development stage and must not be interpreted as the first-shot comparative benchmark reported here.

