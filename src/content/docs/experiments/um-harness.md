---
title: UM_HARNESS
description: Testing workflows described in generated user manuals.
sidebar:
  label: UM_HARNESS
  order: 5
  badge: "Validation"
---

# UM_HARNESS

UM_HARNESS is an SpQE Lab validation mechanism that turns a generated user manual into an executable post-generation test surface.

A user manual is usually treated as a final document. In SpQE, it can also become a contract. If the manual describes commands, inputs, files, outputs, reports or workflows, UM_HARNESS can derive sandbox checks from those documented behaviors and run them against the generated prototype.

The goal is simple: a generated prototype should not only pass technical probes. It should also behave as its own user manual says it behaves.

## Status

Active validation mechanism.

UM_HARNESS is currently used as a post-user-manual quality gate. It runs after the prototype, packaging and generated user manual are available, and it checks whether documented user-facing workflows are executable in a real sandbox.

## Research question

Can a generated user manual become a testable contract rather than a passive document?

This question matters because documentation can easily drift away from software behavior, especially in generated systems. A manual may describe a workflow that looks plausible but fails in practice, or a command may expose the right help text while returning the wrong runtime output.

UM_HARNESS explores whether generated documentation can be used as an additional source of behavioral validation.

## Generated system

UM_HARNESS reads the generated user manual representation and derives black-box validation probes from documented user behavior.

It focuses on user-facing contracts such as:

- documented commands;
- required inputs;
- local files and datasets;
- command options;
- text and JSON outputs;
- generated reports;
- persisted artifacts;
- documented multi-command workflows;
- expected user errors.

The mechanism does not inspect implementation internals. It treats the prototype as a user would: by preparing inputs, running commands, reading outputs, and checking documented behavior.

## Validation model

UM_HARNESS is intentionally different from help-surface validation.

Help validation checks whether the command-line interface exposes the expected commands and options. UM_HARNESS checks whether documented workflows actually work.

For example, if a manual says that a command reads a CSV file and returns the inferred dataset schema, UM_HARNESS should not accept a generic command list or CLI metadata as a valid result. The command must read the fixture and expose facts derived from that fixture.

A typical UM_HARNESS probe may:

1. create deterministic sandbox fixtures;
2. run the documented commands;
3. parse stdout, stderr, JSON outputs or generated files;
4. verify that outputs contain fixture-derived facts;
5. check documented error behavior;
6. emit a structured validation signal.

## CausalLab validation case

CausalLab is a generated CLI prototype for exploratory causal-style analysis on CSV data.

[Complete CausalLab SpecBlock Example](../complete-causallab-specblock-example/)

The generated user manual documented a workflow around the following commands:

- `schema`;
- `variables`;
- `correlate`;
- `explain`;
- `simulate`;
- `report`.

[Download the CausalLab User Manual](../UM_HARNESS/CausalLab-user-manual.pdf)

The manual described `schema` as a command that inspects a CSV input and returns information about the dataset. A manual-derived validation battery therefore expected `schema input.csv` to expose dataset columns, and expected `schema missing.csv` to fail as a user input error.

The initial prototype passed the basic command-surface checks, but it did not satisfy the documented workflow contract. The `schema` command returned command metadata instead of the schema of the provided CSV file. It also succeeded on a missing CSV path.

```text
=== UM_HARNESS manual battery :: CausalLab CLI ===
ArchRoot : C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE
Data     : C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv


=== Résumé UM_HARNESS manual battery ===

Name                                     Rc Args
----                                     -- ----
top_level_help                            0 --help
no_args_behaves_like_help                 0
schema_help                               0 schema --help
variables_help                            0 variables --help
correlate_help                            0 correlate --help
explain_help                              0 explain --help
simulate_help                             0 simulate --help
report_help                               0 report --help
schema_text                               0 schema C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv
schema_json_suffix_format                 0 schema C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --for…
schema_json_prefix_format                 0 --format json schema C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sa…
schema_json_equals_format                 0 --format=json schema C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sa…
variables_text                            0 variables C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv
variables_json                            0 variables C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --…
correlate_text                            0 correlate C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --…
correlate_json                            0 correlate C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --…
explain_text                              0 explain C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --ta…
explain_json                              0 explain C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --ta…
simulate_text                             0 simulate C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --t…
simulate_json                             0 simulate C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --t…
report_text                               0 report C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --tar…
report_json                               0 report C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --tar…
report_deterministic_first                0 report C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --tar…
report_deterministic_second_same_command  0 report C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --tar…
schema_missing_input                      2 schema
variables_missing_input                   2 variables
correlate_missing_input                   2 correlate
explain_missing_input                     2 explain
simulate_missing_input                    2 simulate
report_missing_input                      2 report
unknown_subcommand                        2 unknown
unknown_global_argument                   2 --unknown
unknown_option                            2 schema C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --bog…
invalid_format                            2 schema C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --for…
duplicate_format                          2 schema C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --for…
correlate_missing_target                  2 correlate C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv
simulate_missing_var                      2 simulate C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --t…
simulate_missing_delta                    2 simulate C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --t…
simulate_invalid_delta                    2 simulate C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --t…
report_missing_output                     2 report C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --tar…
schema_missing_csv                        0 schema C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\missing.csv
correlate_unknown_target                  2 correlate C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --…
correlate_non_numeric_target              2 correlate C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --…
simulate_unknown_driver                   2 simulate C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --t…


Logs : C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\logs

=== ÉCHECS DÉTECTÉS ===
[schema_text] STDOUT ne contient pas le jeton attendu : score
  Args   : python -m app.cli schema C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv
  RC     : 0
  STDOUT : C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\logs\009_schema_text.stdout.txt
  STDERR : C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\logs\009_schema_text.stderr.txt

  STDOUT preview:
schema commands: correlate, explain, report, schema, simulate, variables

  STDERR preview:
<empty>
[schema_text] STDOUT ne contient pas le jeton attendu : exposure
  Args   : python -m app.cli schema C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv
  RC     : 0
  STDOUT : C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\logs\009_schema_text.stdout.txt
  STDERR : C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\logs\009_schema_text.stderr.txt

  STDOUT preview:
schema commands: correlate, explain, report, schema, simulate, variables

  STDERR preview:
<empty>
[schema_json_suffix_format] Le JSON ne contient pas le jeton attendu : exposure
  Args   : python -m app.cli schema C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --format json
  RC     : 0
  STDOUT : C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\logs\010_schema_json_suffix_format.stdout.txt
  STDERR : C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\logs\010_schema_json_suffix_format.stderr.txt

  STDOUT preview:
{"command":"schema","payload":{"commands":{"correlate":{"options":[{"name":"input","position":"positional","required":true,"type":"path"},{"name":"--target","required":true,"type":"string"}],"output_formats":["json","text"],"summary":"Compute deterministic variable associations against a target variable."},"explain":{"options":[{"name":"input","position":"positional","required":true,"type":"path"},{"name":"--target","required":true,"type":"string"}],"output_formats":["json","text"],"summary":"Produce an interpretation payload from computed associations."},"report":{"options":[{"name":"input","position":"positional","required":true,"type":"path"},{"name":"--target","required":true,"type":"string"},{"name":"--var","required":true,"type":"string"},{"name":"--delta","required":true,"type":"number"},{"name":"--output","required":true,"type":"path"}],"output_formats":["json","text"],"summary":
... <truncated>

  STDERR preview:
<empty>
[schema_missing_csv] Code retour attendu 2, obtenu 0.
  Args   : python -m app.cli schema C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\missing.csv
  RC     : 0
  STDOUT : C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\logs\041_schema_missing_csv.stdout.txt
  STDERR : C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\logs\041_schema_missing_csv.stderr.txt

  STDOUT preview:
schema commands: correlate, explain, report, schema, simulate, variables

  STDERR preview:
<empty>
[schema_missing_csv] STDOUT devrait être vide.
  Args   : python -m app.cli schema C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\missing.csv
  RC     : 0
  STDOUT : C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\logs\041_schema_missing_csv.stdout.txt
  STDERR : C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\logs\041_schema_missing_csv.stderr.txt

  STDOUT preview:
schema commands: correlate, explain, report, schema, simulate, variables

  STDERR preview:
<empty>
[schema_missing_csv] STDERR ne contient pas le jeton attendu : error:
  Args   : python -m app.cli schema C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\missing.csv
  RC     : 0
  STDOUT : C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\logs\041_schema_missing_csv.stdout.txt
  STDERR : C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\logs\041_schema_missing_csv.stderr.txt

  STDOUT preview:
schema commands: correlate, explain, report, schema, simulate, variables

  STDERR preview:
<empty>
Exception: C:\Users\Utilisateur\Documents\mSpQE\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\test_um_harness_manual_causalab.ps1:751
Line |
 751 |    throw "$($script:Failures.Count) échec(s) détecté(s) dans la batter …
     |    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     | 6 échec(s) détecté(s) dans la batterie UM_HARNESS manual.
```


UM_HARNESS identified the mismatch as a user-manual workflow failure and targeted the relevant runtime dispatch behavior for correction.


```text
=== UM_HARNESS manual battery :: CausalLab CLI ===
ArchRoot : C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE
Data     : C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv


=== Résumé UM_HARNESS manual battery ===

Name                                     Rc Args
----                                     -- ----
top_level_help                            0 --help
no_args_behaves_like_help                 0
schema_help                               0 schema --help
variables_help                            0 variables --help
correlate_help                            0 correlate --help
explain_help                              0 explain --help
simulate_help                             0 simulate --help
report_help                               0 report --help
schema_text                               0 schema C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv
schema_json_suffix_format                 0 schema C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --for…
schema_json_prefix_format                 0 --format json schema C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sa…
schema_json_equals_format                 0 --format=json schema C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sa…
variables_text                            0 variables C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv
variables_json                            0 variables C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --…
correlate_text                            0 correlate C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --…
correlate_json                            0 correlate C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --…
explain_text                              0 explain C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --ta…
explain_json                              0 explain C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --ta…
simulate_text                             0 simulate C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --t…
simulate_json                             0 simulate C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --t…
report_text                               0 report C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --tar…
report_json                               0 report C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --tar…
report_deterministic_first                0 report C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --tar…
report_deterministic_second_same_command  0 report C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --tar…
schema_missing_input                      2 schema
variables_missing_input                   2 variables
correlate_missing_input                   2 correlate
explain_missing_input                     2 explain
simulate_missing_input                    2 simulate
report_missing_input                      2 report
unknown_subcommand                        2 unknown
unknown_global_argument                   2 --unknown
unknown_option                            2 schema C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --bog…
invalid_format                            2 schema C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --for…
duplicate_format                          2 schema C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --for…
correlate_missing_target                  2 correlate C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv
simulate_missing_var                      2 simulate C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --t…
simulate_missing_delta                    2 simulate C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --t…
simulate_invalid_delta                    2 simulate C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --t…
report_missing_output                     2 report C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --tar…
schema_missing_csv                        2 schema C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\missing.csv
correlate_unknown_target                  2 correlate C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --…
correlate_non_numeric_target              2 correlate C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --…
simulate_unknown_driver                   2 simulate C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\input\causalab_sample.csv --t…


Logs : C:\Users\Utilisateur\AppData\Local\Temp\pytest-of-Utilisateur\pytest-5948\test_phase2_preflight_acw_chec0\repo\.SpQE\.tmp_um_harness_manual_causalab\logs

OK - Batterie UM_HARNESS manual verte.
```


After correction, the same independent manual-derived battery was run again. The documented workflow passed, including:

- top-level help;
- no-argument help behavior;
- subcommand help;
- schema text output;
- schema JSON output;
- variables output;
- correlation output;
- explanation output;
- simulation output;
- report generation;
- report determinism;
- expected user errors.

This produced a clean before/after case: the manual-derived workflow was initially red, then green after the correction.

## What UM_HARNESS adds

UM_HARNESS adds a validation layer that is closer to the user’s experience.

It can detect cases where:

- help text exists but runtime behavior is wrong;
- a command accepts the documented arguments but ignores the input file;
- JSON output is parseable but semantically incorrect;
- a report is created but lacks documented sections;
- a workflow loses important identifiers across commands;
- a documented error case incorrectly succeeds.

This is useful because generated software can appear superficially correct while still failing the workflow described to the user.

## Findings

Documentation becomes more valuable when it can be executed and checked against the generated software.

The CausalLab case showed that the generated user manual can expose a meaningful behavioral contract. The key failure was not the absence of a command, but the mismatch between the documented meaning of the command and the actual runtime output.

UM_HARNESS helped move validation from interface presence toward workflow semantics.

## Relationship with other probes

UM_HARNESS does not replace the other SpQE validation probes.

It complements them.

S-050 validates the public command surface, help behavior and basic invocation contract.

S-091 validates family-specific lifecycle behavior when a declared family contract exists.

UM_HARNESS validates workflows described in the generated user manual.

Together, these probes check different layers of the generated artifact.

## Metrics

- Artifact tested: generated user manual
- Validation mode: sandbox workflow
- Execution style: black-box CLI validation
- Role: post-generation quality gate
- Main signal: documented workflow pass/fail
- Example prototype: CausalLab CLI
- Example detected issue: command returned CLI metadata instead of dataset-derived output
- Example correction target: runtime command dispatch
- Retest result: independent manual-derived battery green after correction




## Current limitations

UM_HARNESS depends on the quality and precision of the generated user manual.

If the manual is vague, incomplete or ambiguous, the derived tests may be too weak or too broad. For this reason, UM_HARNESS works best when the manual contains concrete workflows, deterministic examples, explicit inputs, documented output formats and clear user error cases.

The mechanism is not intended to prove full program correctness. It validates selected documented behaviors and helps expose mismatches between documentation and implementation.

## Research direction

The next research direction is to improve how user manuals are transformed into executable contracts.

Important areas include:

- stronger extraction of workflow intent;
- better distinction between help text, runtime contracts and data products;
- more robust handling of JSON and file outputs;
- better failure signals for repair loops;
- compact but meaningful sandbox fixtures;
- improved retesting after generated repairs.

UM_HARNESS is part of a broader SpQE Lab objective: making generated software inspectable, testable and repairable through its own generated artifacts.