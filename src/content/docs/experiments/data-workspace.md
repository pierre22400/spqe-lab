---
title: Data Workspace CLI
description: Family-driven generation of a local data workspace CLI.
sidebar:
  label: Data Workspace
  order: 3
  badge:
    text: Family
    variant: caution
---





## Abstract

This report evaluates **Data Workspace CLI (CLI) - natural spec v5**, an automatically generated SpQE Lab prototype for deterministic local data-workspace management.

Starting from a structured SpecBlock, SpQE Lab generated a multi-command Python CLI exposing workspace, source, dataset, transform, run, report, and configuration operations. The generated prototype was then subjected to an executable black-box vitrine test battery designed to verify CLI discovery, help behavior, user-error discipline, workspace-root isolation, JSON rendering, local state persistence, dry-run behavior, and representative lifecycle workflows.

The final vitrine run executed **50 black-box tests**. It produced **45 passing cases**, **5 documented prototype gaps**, and **0 hard failures**. The test run completed successfully under pytest because every remaining failure was classified as an explicit, reproducible, documented gap rather than an undocumented regression.

This experiment demonstrates an important SpQE Lab capability: the system does not merely generate code. It also enables a public qualification narrative where strengths, runtime behavior, and prototype limitations are all captured as executable evidence.

## Data Workspace CLI — Executable qualification note

Data Workspace CLI is a deterministic local command-line prototype for managing data workspaces, sources, datasets, transforms, runs, reports, and configuration profiles.

The prototype is designed around local filesystem state. It exposes a subcommand-based CLI, persists JSON-backed metadata, supports deterministic text and JSON outputs, and separates read-only commands from mutating operations. It is intended to behave like a credible operational CLI at prototype scale, rather than as a simple generated command shell.

This page documents an SpQE Lab experiment. SpQE Lab is an automatic prototype-generation software system: it starts from a structured specification, generates a working software prototype, produces associated user documentation, and then subjects the result to executable qualification tests.

Here, the Data Workspace CLI is used as a concrete case study for a broader local-state lifecycle prototype. The page follows the observed runtime behavior: generated CLI, generated user manual, black-box tests, successful workflows, defect detection, documented gaps, and final vitrine verdict.

The complete specification used to frame this prototype is available here:

[Open the complete DataWorkspace SpecBlock example](/spqe-lab/request-kit/dataworkspace-complete-specblock-example/)

## User manual

A user manual was generated for the Data Workspace CLI prototype.

The manual describes a local deterministic CLI with the following command groups:

```text
workspace
source
dataset
transform
run
report
config
```

It also documents shared global options:

```text
--help
--format
--profile
--workspace-root
--root
--dry-run
--strict
```

During vitrine qualification, the manual was not treated as decorative documentation only. Its executable claims were converted into black-box tests and checked against the actual runtime behavior of the generated prototype.

* Document: Data Workspace CLI User Manual
* Schema version: 2.0
* Generated: 2026-06-28 (UTC)

[Download the Data Workspace CLI user manual as PDF](/spqe-lab/experiments/data-workspace/user_manual.pdf)

## 1. Identification

Prototype evaluated:

```text
Data Workspace CLI (CLI) - natural spec v5
```

Local qualification context:

```text
C:\Users\Utilisateur\Documents\mSpQE\pytest-5942\test_phase2_preflight_acw_chec0\repo\.SpQE
```

CLI entry point:

```text
C:\Users\Utilisateur\Documents\mSpQE\pytest-5942\test_phase2_preflight_acw_chec0\repo\.SpQE\app\cli.py
```

Black-box test battery:

```text
C:\Users\Utilisateur\Documents\mSpQE\tests\test_dataworkspace_cli_vitrine.py
```

Execution command:

```text
pytest -s tests/test_dataworkspace_cli_vitrine.py -vv -o log_cli=true --log-cli-level=INFO
```

Evidence directory:

```text
C:\Users\Utilisateur\Documents\mSpQE\pytest-5942\test_phase2_preflight_acw_chec0\repo\.SpQE\.SpQE\vitrine_tests\dataworkspace_cli_20260628_085900
```

Generated evidence report:

```text
C:\Users\Utilisateur\Documents\mSpQE\pytest-5942\test_phase2_preflight_acw_chec0\repo\.SpQE\.SpQE\vitrine_tests\dataworkspace_cli_20260628_085900\dataworkspace_vitrine_test_report.md
```

Generated machine-readable results:

```text
C:\Users\Utilisateur\Documents\mSpQE\pytest-5942\test_phase2_preflight_acw_chec0\repo\.SpQE\.SpQE\vitrine_tests\dataworkspace_cli_20260628_085900\dataworkspace_vitrine_test_results.json
```

## 2. Purpose of the qualification

The goal was to evaluate whether the generated prototype satisfied its public CLI contract and whether it behaved like a coherent local-state application.

The qualification focused on:

* CLI discovery and top-level help behavior;
* command-group and action-level help behavior;
* user-error handling;
* compact stderr discipline;
* deterministic JSON output;
* local workspace initialization and readback;
* workspace-root isolation;
* dry-run behavior;
* source lifecycle;
* dataset lifecycle;
* configuration profile behavior;
* run tracking;
* report generation and export;
* transform command behavior;
* destructive operations and post-delete readback.

The purpose of this page is not to hide defects. The purpose is to document them precisely, because SpQE’s value lies in making prototype behavior observable, reproducible, and auditable.

## 3. User-facing contract

The user-facing CLI is invoked as:

```text
python -m app.cli
```

The generated CLI exposes the following command groups:

```text
workspace
source
dataset
transform
run
report
config
```

Expected help behavior:

```text
No arguments:
  rc=0
  stdout non-empty
  stderr empty

--help:
  rc=0
  stdout non-empty
  stderr empty

group --help:
  rc=0
  stdout non-empty
  stderr empty

action --help:
  rc=0
  stdout non-empty
  stderr empty
```

Expected user-error behavior:

```text
unknown command:
  rc=2
  stdout empty
  stderr one deterministic line

bad format:
  rc=2
  stdout empty
  stderr one deterministic line

missing required argument:
  rc=2
  stdout empty
  stderr one deterministic line
```

Expected successful read or write behavior:

```text
successful command:
  rc=0
  stdout non-empty
  stderr empty

successful JSON command:
  rc=0
  stdout valid JSON
  stderr empty
```

For domain-level expected failures, the prototype may return a non-zero domain error code. In the observed run, missing domain entities returned `rc=3` with compact stderr output. This behavior was accepted by the vitrine test battery as a documented domain expected-failure code.

## 4. Qualification method

The test method is intentionally black-box.

The test battery invokes the CLI through subprocess:

```text
python -m app.cli
```

The tests do not import application internals for the primary verdict. They create temporary fixtures, run the public CLI, capture return code, stdout and stderr, then evaluate the observed behavior.

Each test case writes evidence files:

```text
command.txt
stdout.txt
stderr.txt
```

The runner also writes:

```text
dataworkspace_vitrine_test_results.json
dataworkspace_vitrine_test_report.md
```

The qualification strategy distinguishes three outcomes:

```text
PASS
  The observed behavior matches the expected public contract.

DOC-GAP
  The observed behavior fails the intended contract, but the failure is known,
  reproducible, documented, and useful for the vitrine narrative.

HARD FAIL
  The observed behavior is an undocumented regression or unexpected failure.
```

The final pytest verdict fails only if at least one hard failure remains.

## 5. Final vitrine test result

Final run:

```text
Total           : 50
Passed          : 45
Documented gaps : 5
Hard failed     : 0
```

Pytest result:

```text
1 passed in 3.22s
```

Final vitrine verdict:

```text
VERDICT: PASS WITH DOCUMENTED GAPS
```

This means the prototype is suitable for public demonstration as a documented SpQE-generated prototype, but it should not be presented as fully qualified in the same sense as a zero-gap scientific prototype.

## 6. Passing surface: CLI discovery and help behavior

The first layer validates that the generated CLI exposes a coherent public surface.

Passing cases:

```text
[PASS] 001 top_level_no_args_prints_help rc=0
[PASS] 002 top_level_help rc=0
[PASS] 003 group_help_workspace rc=0
[PASS] 004 group_help_source rc=0
[PASS] 005 group_help_dataset rc=0
[PASS] 006 group_help_transform rc=0
[PASS] 007 group_help_run rc=0
[PASS] 008 group_help_report rc=0
[PASS] 009 group_help_config rc=0
```

Action-level help also passed:

```text
[PASS] 010 workspace_init_help rc=0
[PASS] 011 source_add_help rc=0
[PASS] 012 dataset_add_help rc=0
[PASS] 013 transform_apply_help rc=0
[PASS] 014 run_status_help rc=0
[PASS] 015 report_export_help rc=0
[PASS] 016 config_set_help rc=0
```

This is an important result. The generated prototype presents a stable command hierarchy and exposes discoverable help for the documented command groups.

## 7. Passing surface: user-error contract

The public error contract passed for parser-level user errors.

Passing cases:

```text
[PASS] 017 unknown_command_error_contract rc=2
[PASS] 018 bad_format_error_contract rc=2
[PASS] 019 missing_action_error_contract rc=2
[PASS] 020 missing_required_workspace_name_error_contract rc=2
```

These tests confirm that the CLI boundary correctly handles common user mistakes:

```text
unknown command
bad --format value
missing command action
missing required --name
```

Observed behavior:

```text
stdout empty
stderr one deterministic line
rc=2
no traceback
```

This is a strong point for the generated prototype. It behaves like a real CLI at the parsing boundary.

## 8. Passing workflow: workspace lifecycle

The workspace layer passed the main vitrine workflow.

Passing cases:

```text
[PASS] 021 workspace_init_demo_text rc=0
[PASS] 022 workspace_show_demo_json rc=0
[PASS] 023 workspace_list_root_a_json rc=0
[PASS] 024 workspace_root_b_isolation_json rc=0
[PASS] 025 workspace_init_dry_run_json rc=0
```

Validated behavior:

```text
workspace init succeeds
workspace show reads back the created workspace
workspace list returns valid JSON
a separate workspace root remains isolated
dry-run init returns a planned JSON payload
```

This layer demonstrates that the generated prototype is not just a static CLI shell. It creates and reads local state in a deterministic workspace root.

## 9. Passing workflow: source lifecycle

The source lifecycle passed.

Passing cases:

```text
[PASS] 026 source_add_raw_events_json rc=0
[PASS] 027 source_list_demo_json rc=0
[PASS] 028 source_show_raw_events_json rc=0
```

Validated behavior:

```text
source add succeeds
source list reads persisted state
source show retrieves the named source
JSON output is valid
stderr remains empty on success
```

This is a second strong point. The generated prototype demonstrates a coherent add/list/show readback cycle for sources.

## 10. Partial workflow: dataset lifecycle

The dataset lifecycle is partially functional.

Passing cases:

```text
[PASS] 029 dataset_add_customers_json rc=0
[PASS] 030 dataset_list_demo_json rc=0
```

Documented gaps:

```text
[DOC-GAP] 031 dataset_show_customers_json rc=2
[DOC-GAP] 046 dataset_remove_customers_json rc=2
```

Observed stderr for dataset show:

```text
Error: unsupported action for dataset: show
```

Observed stderr for dataset remove:

```text
Error: unsupported action for dataset: remove
```

Interpretation:

The prototype exposes dataset help and accepts dataset add/list workflows, but the dataset command group does not fully implement the advertised source-like lifecycle.

The gap is precise:

```text
dataset add succeeds
dataset list succeeds
dataset show is advertised but unsupported at runtime
dataset remove is advertised but unsupported at runtime
```

Severity assessment:

```text
Severity: Medium / lifecycle completeness defect
```

This is not a catastrophic failure. It is a boundary mismatch between the documented parser surface and the orchestrator’s supported dataset actions. The defect is useful for the SpQE Lab vitrine because it shows that the qualification battery can detect lifecycle incompleteness after initial successful operations.

## 11. Passing workflow: configuration

Configuration behavior passed in the final documented run.

Passing cases:

```text
[PASS] 032 config_show_default_json rc=0
[PASS] 033 config_set_mode_json rc=0
[PASS] 034 config_get_mode_json rc=0
```

Validated behavior:

```text
config show returns valid JSON
config set writes a profile-scoped value
config get reads the configured value back
stderr remains empty on success
```

This result is notable because an earlier run had exposed a `config show` instability. In the final evidence run, the behavior is clean and should be documented as passing.

## 12. Passing workflow: run tracking

Run tracking passed.

Passing cases:

```text
[PASS] 035 run_start_demo_json rc=0
[PASS] 036 run_status_demo_json rc=0
[PASS] 037 run_history_demo_json rc=0
```

Validated behavior:

```text
run start creates a run record
run status reads back the run
run history returns valid JSON
```

The test runner extracts the generated run identifier from the `run start` JSON payload and reuses it for `run status`, making this a true readback test rather than a static command check.

## 13. Passing workflow: reports

Report generation and export passed.

Passing cases:

```text
[PASS] 038 report_summary_demo_json rc=0
[PASS] 039 report_export_demo_json rc=0
```

Validated behavior:

```text
report summary returns valid JSON
report export writes through the declared output path
stdout contains the action result rather than unrelated noise
stderr remains empty on success
```

This layer confirms that the generated prototype can aggregate persisted local state and expose report-oriented behavior.

## 14. Partial workflow: transform commands

The transform command group is exposed, but the tested transform workflow does not converge with the generated parser-level argument names.

Documented gaps:

```text
[DOC-GAP] 040 transform_validate_json rc=2
[DOC-GAP] 041 transform_preview_json rc=2
[DOC-GAP] 042 transform_apply_dry_run_json rc=2
```

Observed stderr for validate and preview:

```text
Error: missing required parameter(s): transform_spec
```

Observed stderr for apply dry-run:

```text
Error: missing required parameter(s): output_name, transform_spec
```

Interpretation:

The parser exposes:

```text
--path
--target-path
```

The downstream execution layer expects:

```text
transform_spec
output_name
```

This is a contract mismatch between the CLI parser envelope and the orchestrator/domain layer.

Severity assessment:

```text
Severity: Medium / parameter dialect mismatch
```

This is an important SpQE Lab demonstration point. The CLI help exists, the command group exists, and the error is cleanly reported, but the runtime parameter contract is internally inconsistent. The black-box test battery makes this mismatch explicit.

## 15. Passing expected-failure behavior

Domain-level expected failures passed after the test battery accepted the observed domain error code.

Passing cases:

```text
[PASS] 043 missing_run_expected_failure rc=3
[PASS] 044 missing_source_expected_failure rc=3
[PASS] 050 workspace_show_after_real_delete_expected_failure rc=3
```

Observed behavior:

```text
stdout empty
stderr one deterministic line
no traceback
non-zero domain error code
```

Interpretation:

The prototype distinguishes parser errors from domain expected failures. Parser-level user errors return `rc=2`, while missing domain entities return `rc=3`.

This is acceptable for the vitrine as long as it is documented clearly.

## 16. Passing destructive workflow

The destructive workspace workflow passed.

Passing cases:

```text
[PASS] 045 source_remove_raw_events_json rc=0
[PASS] 047 workspace_delete_demo_dry_run_json rc=0
[PASS] 048 workspace_show_after_dry_run_delete_json rc=0
[PASS] 049 workspace_delete_demo_json rc=0
[PASS] 050 workspace_show_after_real_delete_expected_failure rc=3
```

Validated behavior:

```text
source remove succeeds
workspace delete dry-run does not remove the workspace
workspace remains readable after dry-run delete
real workspace delete succeeds
workspace show after real delete fails as expected
```

This is a strong lifecycle result. It demonstrates that dry-run and destructive operations are distinguishable at runtime.

The only destructive gap belongs to the dataset lifecycle:

```text
[DOC-GAP] 046 dataset_remove_customers_json rc=2
```

## 17. Documented prototype gaps

The final run contains five documented gaps.

### Gap 1 — Dataset show unsupported

Case:

```text
031 dataset_show_customers_json
```

Observed:

```text
rc=2
stderr=Error: unsupported action for dataset: show
```

Expected:

```text
rc=0
stdout valid JSON
stderr empty
```

Interpretation:

The dataset command group behaves as partially source-like, but does not support individual dataset readback.

### Gap 2 — Transform validate parameter mismatch

Case:

```text
040 transform_validate_json
```

Observed:

```text
rc=2
stderr=Error: missing required parameter(s): transform_spec
```

Interpretation:

The parser passes a path-like argument, while the execution layer expects a parameter named `transform_spec`.

### Gap 3 — Transform preview parameter mismatch

Case:

```text
041 transform_preview_json
```

Observed:

```text
rc=2
stderr=Error: missing required parameter(s): transform_spec
```

Interpretation:

The same transform parameter dialect mismatch prevents preview execution.

### Gap 4 — Transform apply dry-run parameter mismatch

Case:

```text
042 transform_apply_dry_run_json
```

Observed:

```text
rc=2
stderr=Error: missing required parameter(s): output_name, transform_spec
```

Interpretation:

Dry-run behavior is exposed, but the runtime layer requires different parameter names than those produced by the CLI parser.

### Gap 5 — Dataset remove unsupported

Case:

```text
046 dataset_remove_customers_json
```

Observed:

```text
rc=2
stderr=Error: unsupported action for dataset: remove
```

Interpretation:

Dataset removal is advertised by the CLI parser but not supported by the execution layer.

## 18. Validated test coverage

The final battery validates the following layers.

### CLI discovery

```text
no args
--help
group --help
action --help
```

### Parser-level error handling

```text
unknown command
invalid --format
missing action
missing required argument
```

### Workspace lifecycle

```text
workspace init
workspace show
workspace list
workspace-root isolation
workspace init dry-run
workspace delete dry-run
workspace delete
post-delete expected failure
```

### Source lifecycle

```text
source add
source list
source show
source remove
```

### Dataset lifecycle

```text
dataset add
dataset list
dataset show documented gap
dataset remove documented gap
```

### Configuration

```text
config show
config set
config get
```

### Run tracking

```text
run start
run status
run history
missing run expected failure
```

### Reporting

```text
report summary
report export
```

### Transform layer

```text
transform validate documented gap
transform preview documented gap
transform apply dry-run documented gap
```

## 19. Interpretation for SpQE

Data Workspace demonstrates a different kind of SpQE Lab value than a fully qualified scientific prototype.

The generated prototype is not perfect, but its behavior is highly inspectable. The test battery shows exactly which layers are reliable and exactly where the remaining contract gaps are located.

### SpQE Lab produced a usable multi-command prototype

The CLI exposes a broad operational surface:

```text
workspace
source
dataset
transform
run
report
config
```

Most of the tested lifecycle is functional.

### The vitrine battery detected precise contract gaps

The remaining gaps are not vague failures. They are structured findings:

```text
dataset show/remove unsupported despite parser exposure
transform parser/execution parameter dialect mismatch
```

These are exactly the kinds of defects that black-box qualification is meant to reveal.

### The prototype remains demonstrable

The final pytest result is:

```text
1 passed
```

The vitrine-level result is:

```text
45 passing cases
5 documented gaps
0 hard failures
```

This makes the prototype suitable for inclusion as a documented SpQE Lab Lab experiment, provided the page presents it honestly as a prototype with known gaps rather than a fully qualified production-equivalent tool.

### The evidence is reusable

The test battery generated:

```text
per-case stdout evidence
per-case stderr evidence
per-case command evidence
machine-readable JSON results
Markdown qualification report
```

This creates a reusable audit trail for future repair and requalification.


## 20. Metrics

The qualification run completed successfully.

```text
Pytest result     : 1 passed
Duration          : 2485.13s (0:41:25)
LLM calls         : 52
Agents involved   : 6
Effort profile    : medium
Model stack       : gpt-5.1, gpt-5.3-codex, gpt-5.4-mini
```

Token usage summary:

```text
input_tokens        : 1279321
cached_input_tokens : 170752
output_tokens       : 336691
```

Estimated total cost:

```text
4.25125635 USD
```

High-level cost distribution:

```text
Planning and normalization : 0.6384 USD
Code generation            : 2.3674 USD
System checking and harness: 1.1160 USD
Packaging                  : 0.0545 USD
User manual                : 0.0749 USD
```

High-level token distribution:

```text
Planning and normalization : 129909 tokens
Code generation            : 613310 tokens
System checking and harness: 983690 tokens
Packaging and user manual  :  59855 tokens
```

For publication purposes, the detailed per-call execution trace is intentionally not exposed. The public metric layer reports only aggregated operational data sufficient to document reproducibility, cost envelope, qualification effort, executable test coverage, and documented prototype gaps without disclosing the internal execution choreography.



## 21. Final qualification statement

Data Workspace CLI is validated as a **documented SpQE-generated prototype** for deterministic local data-workspace management.

Final state:

```text
CLI discovery: OK
help behavior: OK
parser-level errors: OK
workspace lifecycle: OK
workspace-root isolation: OK
source lifecycle: OK
configuration workflow: OK
run tracking: OK
report workflow: OK
dataset lifecycle: PARTIAL
transform workflow: PARTIAL
hard failures: 0
```

Final verdict:

```text
VERDICT: PASS WITH DOCUMENTED GAPS
```

The prototype is suitable for inclusion in the SpQE Lab Lab showcase as a transparent demonstration of generated software, executable qualification, and documented defect discovery.

It should be presented as a strong prototype with known, reproducible limitations rather than as a fully qualified zero-gap prototype.

