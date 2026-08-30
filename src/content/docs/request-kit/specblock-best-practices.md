---
title: "Best Practices for Building a SpecBlock"
description: "Guidance for writing concrete, testable and non-ambiguous SpecBlocks."
---



How to write a SpecBlock that gives SpQE Lab clear product obligations without turning the prototype into a brittle implementation script.

## Purpose

A SpecBlock is the source contract given to the SpQE Lab generation pipeline. It should describe the prototype as an observable product: what it accepts, what it produces, how it behaves in normal and error cases, and which invariants must remain true across generation, rendering, file output, and readback.

The main failure mode is not lack of detail. It is misplaced detail: fragile help prose, invented schema fields, exact headings, overly strict JSON shapes, private helper names, or implementation layouts that do not belong in a product contract.

The guiding principle is: specify stable observable invariants through canonical SpecBlock fields. Do not encode private implementation plans unless the architecture itself is part of the experiment.

## How to Use This Page

This page is not a form to complete.

For a first prototype request, start with the **SpQE Prototype Request Form** and its LLM-aided completion prompt.

This page is a doctrine and review guide for advanced users, reviewers, or teams building their own SpecBlock assistant, custom GPT, RAG workflow, or internal intake process.

It can be used to:

* review whether a SpecBlock is concrete, testable, and non-ambiguous;
* guide a specialized assistant that helps draft or refine SpecBlocks;
* provide retrieval context for a RAG workflow;
* train internal reviewers on what belongs in canonical SpecBlock fields;
* avoid common failure modes such as brittle help prose, invented schema fields, private implementation plans, or over-constrained JSON shapes.

Do not copy this entire page into every prototype request unless you are intentionally building an advanced prompt or a specialized assistant.

For most users, the practical workflow is:

1. Use the Prototype Request Form to generate a first SpecBlock.
2. Review the result with the checklist and principles on this page.
3. Refine only the parts that affect observable product behavior, qualification, or reproducibility.

## No weak modal wording in binding requirements

Binding SpecBlock fields must not use weak modal wording such as “optional,” “possible,” “if possible,” “when feasible,” “try to,” “preferably,” or “may” when describing behavior that will be generated, tested, repaired, or validated later.

In an agentic generation-and-validation pipeline, a later agent or validator may reinterpret a weak suggestion as a binding requirement, or ignore it as non-binding context. This creates unstable contracts.

If a behavior is required, state it as an observable requirement. If it is not required, leave it out of the binding fields or mark it explicitly as non-binding context. A SpecBlock must distinguish clearly between what the prototype must do, what it may support later, and what is only background information.


## Canonical first, flexible inside

A strong SpecBlock is binding, but not brittle. It should make the public behavior hard to misunderstand while leaving the generated code enough freedom to converge.

- Binding constraints are observable requirements: inputs, outputs, CLI behavior, help behavior, error categories, deterministic rendering, file-output policy, workspace-root semantics, and domain identifiers that must survive across modules.
- Non-binding details are cosmetic or private details: exact wording, section titles, paragraph order, helper names, internal filenames, and module layouts that are not essential to the public product.
- Canonical fields should carry the contract:`functional_objectives`,`non_functional_constraints`,`behavior_contract`,`help_contract`,`input_sources`,`output_targets`, and`architectural_objectives`when a real architectural intention is required.
- Determinism should be defined as stable observable content: no timestamps, no random ordering, no raw OS exception strings, no accidental absolute paths, and no platform-dependent help assumptions.
- Scope should stay small at first: fewer flags, fewer modes, fewer output dialects, and fewer micro-cases reduce avoidable mismatch and improve convergence.

## Semantic closure: use canonical top-level fields, not ad hoc schema

A SpecBlock should close semantic seams without inventing non-canonical fields. The goal is not to freeze every implementation detail, but to define the smallest shared public dialect that generated modules must preserve.

A frequent failure mode is a prototype that runs successfully but loses meaning across module boundaries. One module emits a record with one set of field names, another module reads different aliases, a renderer replaces the explicit payload with a stale internal copy, or a report preserves numbers while dropping entity names. These are contract-closure failures, not syntax failures.

Do not introduce fields such as`semantic_contract`for this purpose. Put semantic closure into the existing machine-facing top-level fields.

### Where semantic closure belongs

- Use`functional_objectives`for observable product obligations, lifecycle guarantees, and public workflows.
- Use`non_functional_constraints`for determinism, import safety, no-network rules, stable error behavior, and cross-platform constraints.
- Use`behavior_contract`for default behavior, stdout and stderr rules, readback expectations, and public result categories.
- Use`help_contract`for CLI help, no-args behavior, bad-args behavior, and subcommand help fragments.
- Use`input_sources`and`output_targets`to declare the visible inputs and outputs that must remain coherent.
- Use`architectural_objectives`only for architecture-level intentions that should genuinely guide PASS1.

### Practical semantic closure rules

- Define the canonical public identifiers that must survive across parsing, calculation, rendering, export, and readback.
- Require structured outputs to preserve non-empty domain identifiers when the product describes real entities.
- Require renderers to render the explicit payload they receive, not a stale internal copy of an older contract.
- Require reports and exports to remain internally consistent with the direct command outputs used to build them.
- Define whether important public sections are lists or mappings when that affects observable behavior.
- For numeric outputs, define public rounding and null semantics without requiring fragile exact prose.
- For edge cases, define the public result category rather than every internal branch.

The right balance is binding on public payload meaning and flexible on internal implementation. Do not prescribe private helper names, internal filenames, or a full module design unless the architecture itself is the tested product.

## Generated-module directory: always`app/`, never top-level`core/`

For generated prototypes, enforce a simple non-negotiable rule: all application modules must live under the`app/`package. Subpackages are allowed, for example`app/core/`or`app/parsers/`, but there must never be a top-level`core/`package in the generated program repository.

This matters because SpQE’s own orchestration code also imports an internal package named`core`. If a generated project creates a root-level`core/`package, Python may resolve imports to the generated project instead of SpQE’s internal package. That shadowing causes inconsistent behavior, missing symbols, false diagnostics, and repair loops that target the wrong module.

Express this constraint through modern SpecBlock fields. Put the architecture intention in`architectural_objectives`and the import-safety rule in`non_functional_constraints`.

```
architectural_objectives:
- Generate the prototype as an import-safe Python package under app/.

non_functional_constraints:

* Do not create a top-level core package.
* Application modules may use app/core/ as a subpackage, but root-level core/ is forbidden.
* Imports must not shadow SpQE Lab internal packages. 
```

## Advanced module layout with `technical_structure`

`technical_structure` is a legacy field that is still supported.

Use it only when the module layout itself is part of the intended experiment, or when an advanced user needs to impose an explicit multi-module decomposition instead of letting the LLM freely invent the prototype tree.

In the current pipeline, `technical_structure.modules` is extracted and transmitted to PASS1 through the internal `modules` payload. This means it can directly influence the generated architectural tree. Even though it remains a legacy surface, it can be particularly useful when a SpecBlock must define precise module ownership, CLI layering, parser boundaries, normalization policy, service responsibilities, rendering boundaries, or error-mapping responsibilities.

This field should not be used for ordinary prototypes. A modern SpecBlock should first describe observable product behavior through `functional_objectives`, `input_sources`, `output_targets`, `behavior_contract`, `help_contract`, `domain_contracts`, `non_functional_constraints`, and `architectural_objectives`.

However, SpQE multi-module stress-test experiments showed that explicit module structure can be useful when the experiment itself is about generating, repairing, and validating a dense modular architecture. In one JSON-to-CSV CLI stress-test, the source SpecBlock announced a 40-module tree layout, while the generated prototype reached 45 observed modules and still converged to a stable passing result after iterative check-points. This kind of run shows that `technical_structure` can be used as an advanced architectural control surface, not merely as documentation.

`technical_structure` can conflict with an architecture automatically selected through a recognized prototype family. If a SpecBlock must remain outside a family-driven architecture, lock that intent explicitly in `architectural_objectives`.

Example:

```json
{
  "architectural_objectives": [
    "Do not generate a family-driven prototype architecture for this request.",
    "Use the explicit module decomposition declared in technical_structure.modules as the primary architectural guide.",
    "Interpret technical_structure.modules names as repository-relative file paths.",
    "Do not prepend an additional app/ prefix to module names that already start with app/.",
    "Keep the prototype under the app package and do not create a top-level core package."
  ]
}
```

Module names inside `technical_structure.modules` must be interpreted as repository-relative file paths, not as fragments to be prefixed by another package path. For example, `app/cli/entrypoint.py` means `repo_root/app/cli/entrypoint.py`, not `repo_root/app/app/cli/entrypoint.py`.

A compact `technical_structure` example can look like this:

```json
{
  "technical_structure": {
    "modules": [
      {
        "name": "app/cli/__main__.py",
        "context_scope": {
          "inputs": [
            {
              "name": "argv",
              "type": "list[str] | None"
            }
          ],
          "outputs": [
            {
              "name": "exit_code",
              "type": "int"
            },
            {
              "name": "stdout",
              "type": "str"
            },
            {
              "name": "stderr",
              "type": "str"
            }
          ],
          "constraints": [
            "Public CLI module entrypoint.",
            "Import-safe: MUST NOT parse argv or call sys.exit at import time.",
            "Delegates execution to app.cli.entrypoint.run_cli."
          ]
        },
        "cli_args": [
          {
            "name": "--input",
            "type": "str",
            "required": true,
            "help": "Path to input JSON file.",
            "default": null
          },
          {
            "name": "--output",
            "type": "str",
            "required": true,
            "help": "Path to output CSV file.",
            "default": null
          },
          {
            "name": "--report-format",
            "type": "str",
            "required": false,
            "help": "Report format: text or json.",
            "default": "text"
          }
        ],
        "signature_hint": "def main(argv: list[str] | None = None) -> int:"
      },
      {
        "name": "app/cli/entrypoint.py",
        "context_scope": {
          "inputs": [
            {
              "name": "argv",
              "type": "list[str] | None"
            }
          ],
          "outputs": [
            {
              "name": "exit_code",
              "type": "int"
            }
          ],
          "constraints": [
            "Owns top-level CLI flow, stdout/stderr emission policy, and exception mapping.",
            "MUST NOT implement business conversion logic directly.",
            "Uses app.services.convert_service for conversion/report payload assembly.",
            "MUST NOT import argparse, instantiate ArgumentParser, or parse argv directly.",
            "MUST call app.cli.parser.parse_args(...) exactly once per invocation, except explicit no-args/help short-circuit if implemented.",
            "MUST obtain runtime options through app.cli.normalize.normalize_cli_options(...).",
            "MUST NOT duplicate parser option definitions, parser validation rules, or help text fragments owned by parser modules."
          ]
        },
        "cli_args": [],
        "signature_hint": "def run_cli(argv: list[str] | None = None) -> int:"
      },
      {
        "name": "app/cli/parser.py",
        "context_scope": {
          "inputs": [
            {
              "name": "argv",
              "type": "list[str] | None"
            }
          ],
          "outputs": [
            {
              "name": "namespace",
              "type": "object"
            }
          ],
          "constraints": [
            "Parses CLI args using argparse.",
            "Converts argparse usage failures to deterministic user-error behavior.",
            "No business validation beyond CLI parsing concerns.",
            "Single owner of argv parsing together with app/cli/parser_factory.py."
          ]
        },
        "cli_args": [],
        "signature_hint": "def parse_args(argv: list[str] | None) -> object:"
      },
      {
        "name": "app/cli/parser_factory.py",
        "context_scope": {
          "inputs": [],
          "outputs": [
            {
              "name": "parser",
              "type": "object"
            }
          ],
          "constraints": [
            "Builds and configures the argparse parser only.",
            "No parsing execution.",
            "No sys.exit."
          ]
        },
        "cli_args": [],
        "signature_hint": "def build_parser() -> object:"
      },
      {
        "name": "app/cli/normalize.py",
        "context_scope": {
          "inputs": [
            {
              "name": "namespace",
              "type": "object"
            }
          ],
          "outputs": [
            {
              "name": "options",
              "type": "dict[str, str | None]"
            }
          ],
          "constraints": [
            "Normalizes parser namespace to a fixed-shape options dict.",
            "Normalizes report_format deterministically.",
            "No filesystem access."
          ]
        },
        "cli_args": [],
        "signature_hint": "def normalize_cli_options(namespace: object) -> dict[str, str | None]:"
      }
    ]
  }
}
```

Use `technical_structure` only when explicit module ownership is necessary for the generation experiment. Otherwise, let the generator derive the architecture from the product contract.



## Help contract and CLI determinism: small, explicit, conventional

The help contract is one of the most important convergence levers for CLI prototypes. It must be explicit enough to prevent contradictory behavior, but small enough to avoid brittle checks against argparse wording, operating-system differences, or cosmetic formatting.

The key distinction is simple: voluntary help paths return`0`and user argument errors return`2`. A no-args invocation may be a product behavior or a help behavior, but the SpecBlock must say which one. For most generated CLIs, the safest default is no-args help with exit`0`.

### Recommended behavior

- `--help`returns`0`and writes help to stdout.
- No arguments return`0`and write help to stdout when`no_args_behavior`is`print_help_and_exit_0`.
- Bad arguments return`2`and write at least one short corrective line to stderr.
- Unknown subcommands return`2`and write at least one short corrective line to stderr.
- Help paths must be evaluated before required-argument validation.
- Help checks should be fragment-based and case-insensitive, not full-text comparisons.
- The parser program name should be stable enough that the`usage:`line does not depend on platform-specific invocation details.

### Recommended fragment strategy

- Keep`stable_fragments_all`short: usually`usage:`,`--help`, the main subcommand, and one core flag.
- Use`stable_fragments_any`for argparse wording variants such as`options:`,`optional arguments:`, or`positional arguments:`.
- Use`subcommand_fragments`for required flags that must appear in subcommand help.
- Avoid mandatory headings such as`examples:`,`exit codes:`, or long prose fragments.
- Avoid truncation markers such as`...`or`…`in required fragments.

```
{
  "help_contract": {
    "rc_semantics": {
      "help": 0,
      "no_args": 0,
      "bad_args": 2,
      "unknown_subcommand": 2
    },
    "no_args_behavior": "print_help_and_exit_0",
    "stable_fragments_all": [
      "usage:",
      "--help",
      "analyze",
      "--csv"
    ],
    "stable_fragments_any": [
      "NoiseDoseLab",
      "noise",
      "8h",
      "options:",
      "optional arguments:",
      "positional arguments:"
    ],
    "subcommand_fragments": {
      "analyze": [
        "--csv",
        "--reference-db",
        "--format"
      ]
    },
    "notes": "Help fragments are minimal, robust, and case-insensitive. Help and no-args help write to stdout with rc=0. User argument errors write a short corrective stderr line with rc=2."
  }
}
  
```

This contract prevents the common contradiction where no-args is expected to show help but required arguments are validated first. It also prevents the opposite failure where genuine bad arguments are silently treated like help.

## Keep CLI surface small

Every CLI flag adds parsing paths, help surface, tests, and failure modes. The best practice remains to start with a small public CLI and expand later. However, this should be expressed as product scope and observable behavior, not as a mandatory`technical_structure`template.

Use`functional_objectives`to state the few workflows that must exist. Use`input_sources`and`output_targets`to state the visible data flow. Use`help_contract`to bind only the core commands and flags that users must discover.

- Start with the smallest CLI that covers the scientific or business objective.
- Avoid cosmetic flags during first-generation prototypes.
- Do not require multiple output dialects unless they are central to the prototype.
- When a flag is core, include it in the help contract.
- When a flag is optional or exploratory, do not make it a hard help fragment.

## Pre-freeze checklist

- The SpecBlock uses canonical top-level fields for binding behavior.
- Help behavior and bad-argument behavior are not contradictory.
- No-args behavior is explicitly defined.
- Required help fragments are few, stable, and cross-platform.
- Structured outputs preserve domain identifiers across modules and renderers.
- Determinism rules forbid timestamps, random ordering, raw OS exception strings, and absolute paths in user-facing messages unless explicitly required.
- Generated modules live under`app/`and never under a root-level`core/`package.

## Implementation stability: specify observable constraints, not private helpers

Some convergence failures come from implementation patterns that confuse static checkers or repair routing. For example, deeply nested helper functions may be harder to inspect than small top-level private helpers. This can matter when a generated prototype is repaired automatically.

However, a SpecBlock should not normally prescribe private helper names, local function placement, or internal implementation tricks. Those details belong to generation and repair, not to the public product contract.

Use this rule only when implementation stability is genuinely part of the experiment. In that case, express it as a general import-safety or maintainability constraint in`non_functional_constraints`.

```
non_functional_constraints:
- Keep modules import-safe.
- Prefer simple, inspectable module-level private helpers when this improves repairability.
- Do not rely on runtime side effects during import.
  
```

## File outputs: parent directories must have an explicit policy

CLI file outputs are a frequent source of false failures. A command may compute the right result but fail only because the parent directory of an output path does not exist. If the SpecBlock does not define this policy, tests become ambiguous: the failure can be read either as a program bug or as an undeclared test precondition.

The best default for generated CLI prototypes is simple: when a command writes to a user-supplied output path, it should create missing parent directories automatically. If a prototype should not do that, the SpecBlock must say so explicitly.

### Recommended placement in canonical fields

- Use`output_targets`to identify every file output path that the CLI may write.
- Use`behavior_contract`to define whether missing parent directories are auto-created or treated as a user error.
- Use`non_functional_constraints`to require deterministic filesystem errors and avoid raw OS exception strings in user-facing messages.

### Recommended default policy

- For every user-supplied output file path, create missing parent directories before writing.
- If the target file already exists, either overwrite deterministically or define a clear refusal policy.
- If writing fails, return a conventional user-error code and print a short corrective message to stderr.
- Do not expose raw Python tracebacks, absolute temporary paths, or OS-specific exception strings in normal user errors.

```
output_targets:
- JSON report file written when the user provides an output path.
- Text report written to stdout by default.

behavior_contract:
  file_output_policy:
    parent_directories: create_missing_parents
    existing_files: deterministic_overwrite_allowed
    write_failure: user_error_to_stderr

non_functional_constraints:
- File-output errors must be deterministic and user-readable.
- User-facing error messages must not expose raw tracebacks or raw OS exception strings.
  
```

This policy is intentionally behavioral. It does not require a specific writer module, helper name, or internal path layout. It only binds what the user and the validation harness can observe.

## Workspace root: make state authoritative, observable, and isolated

Stateful CLI prototypes often fail when`--workspace-root`is treated as a cosmetic option rather than as the authority for state. The flag appears in help, but commands may still read from the current working directory, write to another hidden location, or delete a record without making the deletion observable on later reads.

A good SpecBlock must make workspace behavior externally coherent. For the same explicit workspace root and the same entity identifiers, later read commands must observe the effects of earlier successful mutating commands. For a different workspace root, that state must not accidentally appear.

### Recommended placement in canonical fields

- Use`functional_objectives`to define the public lifecycle: create, read, update, delete, list, import, export, or any smaller lifecycle actually required.
- Use`input_sources`to declare`--workspace-root`as an explicit CLI input when the prototype is workspace-scoped.
- Use`output_targets`to describe the observable readback outputs and exported files.
- Use`behavior_contract`to bind read/write coherence, deletion semantics, and root isolation.
- Use`non_functional_constraints`to forbid silent fallback to the process working directory once a root is supplied.
- Use`help_contract`to ensure that the root flag is discoverable when it is part of the public CLI.

### Binding workspace invariants

- `--workspace-root`is authoritative for every workspace-scoped command.
- All reads and writes for a command must resolve against the same effective root.
- A successful mutation under root`R`must be observable through later reads under root`R`.
- State created under root`R1`must not appear under root`R2`unless explicitly recreated there.
- After a successful delete or remove, later reads under the same root must no longer resolve the deleted entity.
- Once a root is supplied, the implementation must not silently fall back to the current working directory or to a second hidden storage location.

```
input_sources:
- CLI option --workspace-root for workspace-scoped commands.

functional_objectives:
- Support a public lifecycle whose mutations are observable through later read commands under the same workspace root.

behavior_contract:
  workspace_root_policy:
    authority: explicit_workspace_root
    same_root_readback: required
    cross_root_isolation: required
    deletion_visibility: deleted_entities_absent_from_later_reads

non_functional_constraints:
- Do not silently fall back to the current working directory when --workspace-root is provided.
- Do not use a second hidden storage root for the same logical entity.
- Keep workspace behavior deterministic across platforms.

help_contract:
  stable_fragments_all:
  - usage:
  - --help
  - --workspace-root
  
```

Keep the wording at the level of externally visible behavior. Do not require a specific internal filename such as`workspace.json`. Do not force one persistence helper or one module name. What matters is that the same root, the same entity identifiers, and the same lifecycle produce consistent readback over time.

## Final SpecBlock sanity check

- Every binding requirement is carried by a canonical field.
- No non-canonical schema is invented for a rule that can fit in`functional_objectives`,`non_functional_constraints`,`behavior_contract`,`help_contract`,`input_sources`,`output_targets`, or`architectural_objectives`.
- CLI help behavior and user-error behavior are separated: voluntary help returns`0`on stdout, while bad arguments return`2`with a short stderr message.
- File-output parent-directory behavior is explicit.
- Workspace-root behavior is authoritative, observable, and isolated when the prototype is stateful.
- Structured outputs preserve domain identifiers across parsing, calculation, rendering, export, and readback.
- Architecture constraints are stated only when they are genuinely needed.
- The generated prototype remains import-safe and avoids root-level package names that can shadow SpQE Lab internals.
