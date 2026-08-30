---
title: Blender API Capsule Extractor
description: Qualification of a Blender backend documentation capsule extractor for editable 3D scene generation.
slug: experiments/blender-spatial-relationships
sidebar:
  label: Blender API Capsule
  order: 6
  badge:
    text: Qualified
    variant: tip
---
## Abstract

This report evaluates **Blender API Capsule Extractor**, a locally generated CLI prototype that extracts backend documentation capsules from the official Blender Python API HTML documentation. Starting from a structured SpecBlock and a successful document preflight, the pipeline generated a command-line extractor, produced a user manual, and subjected the result to executable black-box qualification.
A complete SpecBlock example for this prototype is available here:

[Complete Blender API Capsule Extractor SpecBlock Example](../complete-blender-api-capsule-extractor-specblock-example/)


The prototype reads an already-unpacked Blender Python API HTML tree, inspects selected official symbols, and builds two explicit artifacts: a canonical JSON capsule and an ACW-readable text capsule for the Blender `relationships.py` backend. The target corpus was substantial: 4,220 files, including 2,105 HTML files, for a total corpus size of 839.10 MiB. The goal was not to run Blender, render a scene, or generate assets. The goal was to recover a compact backend documentation payload that helps ACW project spatial-relationship abstractions into Blender Python code.

Qualification covered CLI discovery, help behavior, strict inspection of required Blender API symbols, optional-page diagnostics, strict capsule generation, dry-run behavior, expected user errors, JSON structure, text readability, required capsule sections, and critical API member extraction. The process identified a small set of product-boundary defects: strict inspection initially failed with `unreadable html`, the first generated capsule used a `name/content` section shape instead of the expected `id/entries` contract, and the text rendering was not yet fully ACW-readable. Each defect was localized, patched without changing the public CLI surface, and revalidated.

The final black-box run passed all 12 tests. The validated capsule contains the expected canonical schema, seven documentation sections, three official API symbols, 31 extracted official API members, and a readable text artifact of 14,546 characters. The final run completed in 32 minutes and 36 seconds, using 24 LLM calls across 6 agents, for an estimated total cost of 1.6925 USD. The experiment demonstrates that SPQE Lab can generate not only a functional backend documentation extractor, but also an auditable qualification trajectory including preflight, user documentation, black-box tests, defect detection, targeted correction, cost tracking, capsule recovery, and final validation.


## Executive summary: vitrine and capsule recovery

This experiment had two practical objectives.

The first objective was the SPQE Lab vitrine. The goal was to document a complete qualification trajectory: structured specification, generated prototype, generated user manual, black-box tests, observed defects, manual rescue patch, and final revalidation. This trajectory is now available as a reproducible qualification story for the showcase.

The second objective was to recover a usable backend documentation capsule for ACW. This objective was also achieved. The final build produced both expected artifacts:

```text
relationships.acw_capsule.json
relationships.acw_capsule.txt
````

The recovered capsule is not a placeholder. It contains a canonical JSON structure, an ACW-readable text rendering, seven documentation sections, three validated Blender official API symbols, 31 extracted official API members, and complete backend doctrine sections for the `relationships.py` target.

The preflight had a major practical value. It proved before generation that the Blender documentation target was healthy: the required HTML pages existed, were readable, and contained the expected critical members. As a result, when `inspect --strict` later failed with `unreadable html`, the failure could be attributed to the generated prototype rather than to the documentation corpus.

This reduced ambiguity and accelerated debugging. The generated extractor was already close to correct on the first pass. The remaining defects were product-boundary micro-bugs: strict inspect hydration, capsule section shape, and text rendering format. They were not architecture failures and did not affect the CLI surface.


## Blender API Capsule Extractor — backend qualification note

Blender API Capsule Extractor is a deterministic local command-line prototype for building documentation capsules used by a backend-aware 3D scene-generation pipeline.

It is intentionally narrow. It does not execute Blender, does not require the Blender runtime, does not access the network, and does not attempt to become a general-purpose Blender documentation crawler. Its first target is the Blender backend implementation of `relationships.py`.

This page documents a SpQE Lab experiment. The Lab pipeline generated the prototype, produced a user manual, and then subjected the result to executable black-box qualification.

> **Public redaction note.** Historical internal identifiers and local absolute paths are redacted in this public copy. Functional values, results and counts are unchanged.

The experiment is relevant to the broader **SPQE 3D** roadmap, but the qualified artifact is more specific: it is a Blender backend documentation extractor. SPQE 3D is the scene-generation layer; Blender is only the first backend target.

## User manual

A generated user manual is available for the prototype.
A PDF version of the generated user manual is available here:

[Download the Blender API Capsule Extractor User Manual](/spqe-lab/downloads/blender-api-capsule-extractor-user-manual.pdf)


The manual describes the CLI as a local, deterministic, stdlib-only tool for building backend documentation capsules from an already-unpacked official Blender Python API HTML tree.

Documented workflows:

```text
python -m app.cli
python -m app.cli --help
python -m app.cli build --help
python -m app.cli inspect --help
```

Build workflow:

```text
python -m app.cli build \
  --api-html-root API_HTML_ROOT \
  --out-json OUT_JSON \
  --out-text OUT_TEXT \
  --strict
```

Inspect workflow:

```text
python -m app.cli inspect \
  --api-html-root API_HTML_ROOT \
  --symbol bpy.types.Object \
  --strict
```

The manual also documents the prototype’s limitations: local files only, no network access, no running Blender instance, explicit output paths only, and a fixed MVP set of official API symbols.

## 1. Identification

Prototype evaluated:

```text
Blender API Capsule Extractor — First Backend for SpQE 3D
```

Local qualification context:

```text
<GENERATED_PACKAGE_DIR>
```

CLI entry point:

```text
<GENERATED_PACKAGE_DIR>/app/cli.py
```

Blender API HTML root:

```text
<BLENDER_API_HTML_ROOT>
```
## Target documentation corpus

The extractor was qualified against the following local Blender Python API HTML documentation tree:

```text
<BLENDER_API_HTML_ROOT>
```

This target corpus was not an abstract or hidden source. It was a concrete local documentation tree with measurable size and structure.

```text
Total files             : 4220
HTML files              : 2105
Total corpus size       : 839.10 MiB (879855689 bytes)
HTML corpus size        : 687.12 MiB (720501322 bytes)
MVP required pages      : 3
MVP pages present       : true
MVP required pages size : 1.24 MiB (1297786 bytes)
```

The MVP extraction contract focused on three official Blender API pages:

```text
bpy.types.Object.html     : present, 534.87 KiB (547711 bytes)
bpy.types.Collection.html : present, 353.86 KiB (362357 bytes)
bpy.types.ID.html         : present, 378.63 KiB (387718 bytes)
```

This inventory matters for qualification. The preflight established that the documentation target was present, readable, and sufficiently complete before prototype execution. Therefore, later defects such as strict-inspect hydration or capsule-shape mismatch could be attributed to the generated prototype rather than to a missing or corrupt documentation corpus.

Black-box report:

```text
<GENERATED_PACKAGE_DIR>/blackbox_vitrine_tests/blender_api_extractor_blackbox_report.json
```

Generated capsule artifacts:

```text
<GENERATED_PACKAGE_DIR>/blackbox_vitrine_tests/artifacts/relationships.acw_capsule.json
<GENERATED_PACKAGE_DIR>/blackbox_vitrine_tests/artifacts/relationships.acw_capsule.txt
```

## 2. Purpose of the qualification

The goal was to verify that the regenerated prototype satisfied both its user-facing CLI contract and its capsule-quality contract.

The qualification focused on:

* CLI discovery and help behavior;
* strict symbol inspection;
* optional-page inspection diagnostics;
* strict build workflow;
* dry-run behavior;
* expected user-error behavior;
* JSON capsule structure;
* ACW-readable text capsule rendering;
* presence of required documentation sections;
* extraction of critical Blender API members for `relationships.py`.

## 3. User-facing contract

The CLI exposes two documented subcommands:

```text
build
inspect
```

Expected help behavior:

```text
python -m app.cli
python -m app.cli --help
python -m app.cli build --help
python -m app.cli inspect --help
```

Expected result:

```text
rc=0
stdout contains usage information
stderr empty
```

Expected build behavior:

```text
python -m app.cli build \
  --api-html-root API_HTML_ROOT \
  --out-json OUT_JSON \
  --out-text OUT_TEXT \
  --strict
```

Expected result:

```text
rc=0
JSON artifact exists
text artifact exists
stdout contains explicit artifact paths
stderr empty
```

Expected inspect behavior:

```text
python -m app.cli inspect \
  --api-html-root API_HTML_ROOT \
  --symbol bpy.types.Object \
  --strict
```

Expected result:

```text
rc=0
stdout contains symbol diagnostics
stderr empty
```

Expected user-error behavior:

```text
missing API root => rc=2
stderr non-empty
stdout empty or non-business output
```

## 4. Qualification method

The test method is black-box.

The test battery invokes the prototype only through the public CLI:

```text
python -m app.cli
```

It does not rely on internal imports for the primary verdict. It captures return code, stdout and stderr, then validates the observed behavior.

The artifact validation layer then reads the generated JSON and text capsule outputs and checks their public structure.

The correction strategy was minimal:

```text
Observe failure
→ identify contract breach
→ patch the smallest responsible boundary
→ re-run black-box tests
→ preserve the generated CLI surface
```

## 5. Initial result before rescue patch

The first black-box run showed that the visible CLI surface was healthy.

The following tests passed:

```text
no_args
top_help
build_help
inspect_help
build_dry_run_no_artifacts
inspect_missing_api_root_expected_failure
build_missing_api_root_expected_failure
```

However, five tests failed.

The first failure group concerned `inspect --strict`.

Observed behavior before correction:

```text
python -m app.cli inspect \
  --api-html-root API_HTML_ROOT \
  --symbol bpy.types.Object \
  --strict

rc=2
stderr=error: bpy.types.Object: unreadable html
```

The same failure appeared for:

```text
bpy.types.Object
bpy.types.Collection
bpy.types.ID
```

The second failure concerned the capsule structure. The build command returned `rc=0` and wrote artifacts, but the JSON capsule did not expose the expected `id/entries` section structure. The generated sections used a `name/content` shape, which was not suitable for the vitrine quality contract.

The issue was not the Blender documentation itself: the required HTML files existed and were readable. The defect was in the generated prototype’s extraction and capsule-construction boundary.

## 6. Rescue correction

A manual rescue patch was applied without changing the CLI entry point.

The correction targeted the backend modules responsible for:

```text
profile declaration
path resolution
HTML extraction
capsule construction
text rendering
filesystem output
orchestration
```

The patch preserved the public CLI surface and corrected the internal contract.

Corrected behavior:

```text
inspect --strict succeeds for Object, Collection and ID
build --strict produces canonical JSON and readable text artifacts
sections use id/entries
schema_version is <HISTORICAL_CAPSULE_SCHEMA_V1>
critical Blender API members are present
text output uses readable BEGIN_SECTION blocks
```

## 7. Validated official API symbols

The strict inspect workflow validated the three MVP official Blender API symbols.

### Object

```text
symbol: bpy.types.Object
source_path: bpy.types.Object.html
title: Object(ID)
member_count: 20
tokens_used: 448
```

### Collection

```text
symbol: bpy.types.Collection
source_path: bpy.types.Collection.html
title: Collection(ID)
member_count: 4
tokens_used: 78
```

### ID

```text
symbol: bpy.types.ID
source_path: bpy.types.ID.html
title: ID(bpy_struct)
member_count: 7
tokens_used: 125
```

The optional inspect workflow also validated optional page discovery in dry-run mode. It reported six documents when optional pages were included:

```text
bpy.types.Object
bpy.types.ObjectConstraints
bpy.types.Constraint
bpy.types.Scene
bpy.types.ViewLayer
bpy.types.LayerCollection
```

## 8. Final black-box validation

Final result:

```text
total: 12
passed: 12
failed: 0
verdict: pass
```

Complete validated test groups:

```text
[OK] no_args
[OK] top_help
[OK] build_help
[OK] inspect_help
[OK] inspect_strict_bpy.types.Object
[OK] inspect_strict_bpy.types.Collection
[OK] inspect_strict_bpy.types.ID
[OK] inspect_object_optional_strict_dry_run
[OK] build_strict_capsule_artifacts
[OK] build_dry_run_no_artifacts
[OK] inspect_missing_api_root_expected_failure
[OK] build_missing_api_root_expected_failure
```

Final verdict:

```text
VERDICT: PASS
```

## 9. Capsule artifact validation

The strict build workflow produced both expected artifacts.

JSON capsule:

```text
<GENERATED_PACKAGE_DIR>/blackbox_vitrine_tests/artifacts/relationships.acw_capsule.json
```

Text capsule:

```text
<GENERATED_PACKAGE_DIR>/blackbox_vitrine_tests/artifacts/relationships.acw_capsule.txt
```

Validated JSON properties:

```text
schema_version = <HISTORICAL_CAPSULE_SCHEMA_V1>
official_api_symbols_count = 3
official_member_count = 31
```

Validated capsule sections:

```text
<HISTORICAL_OWNERSHIP_KEY>
assignment_patterns
creation_patterns
forbidden_elements
official_api_symbols
optional_symbol_pages
safety_rules
```

Validated text properties:

```text
text_size_chars = 14546
readable_section_blocks = true
no_single_line_json_section_blobs = true
```

## 10. Validated test coverage

The final battery validates the following layers.

### CLI discovery layer

```text
no args
--help
build --help
inspect --help
```

### Inspect workflow

```text
inspect strict Object
inspect strict Collection
inspect strict ID
inspect Object with optional pages, strict mode and dry-run
```

### Build workflow

```text
build strict
build dry-run
explicit JSON output
explicit text output
no artifact creation in dry-run mode
```

### Capsule quality layer

```text
canonical schema_version
top-level sections
required sections present
official API symbol entries present
critical member extraction
ACW-readable text rendering
no section-level single-line JSON blobs
```

### Expected user-error layer

```text
missing API root in inspect
missing API root in build
rc=2
stderr non-empty
no traceback
```

## 11. SPQE 3D interpretation

This experiment is not only a Blender documentation extraction task.

It demonstrates a broader design principle for SPQE 3D: backend-specific knowledge can be packaged as a compact documentation capsule and injected into ACW late in the pipeline.

The distinction is important:

```text
SPQE 3D = the scene-generation layer
Blender = the first backend target
Blender API Capsule Extractor = the qualified prototype on this page
````

In this architecture:

```text
3D scene abstraction
→ backend documentation capsule
→ ACW code generation
→ target 3D engine
```

The generated capsule does not replace the scene-generation doctrine. It gives ACW the backend-specific facts needed to express that doctrine in Blender Python:

```text
objects
collections
IDs
transforms
parenting
visibility
collection membership
metadata carriers
```

This keeps the system aligned with the long-term goal: SPQE 3D should be able to target other professional 3D engines by changing backend documentation capsules rather than rewriting the conceptual pipeline.


## 12. Metrics

The qualification run completed successfully.

```text
Final test status       : PASS
Pytest result           : 1 passed
Black-box validation    : 12/12 passed
Duration                : 1956.73s (0:32:36)
LLM calls               : 24
Agents involved         : 6
Effort profile          : medium
Model stack             : gpt-5.1, gpt-5.2-codex, gpt-5.4-mini
```

Token usage summary:

```text
input_tokens        : 543636
cached_input_tokens : 35584
output_tokens       : 146731
```

Estimated total cost:

```text
1.69249030 USD
```

High-level cost distribution:

```text
Planning and normalization : 0.3007 USD
Code generation            : 0.8099 USD
System checking and harness: 0.5020 USD
Packaging                  : 0.0297 USD
User manual                : 0.0502 USD
```

High-level token distribution:

```text
Planning and normalization : 121629 tokens
Code generation            : 202621 tokens
System checking and harness: 359763 tokens
Packaging and user manual  :  41938 tokens
```

For publication purposes, the detailed per-call execution trace is intentionally not exposed. The public metric layer reports only aggregated operational data sufficient to document reproducibility, cost envelope, and qualification effort without disclosing the internal execution choreography.

## 13. Manual debugging timeline

The prototype was stabilized through a short manual rescue loop.

Sequence:

```text
1. Run black-box test battery.
2. Observe that CLI help and user-error behavior are already healthy.
3. Detect strict inspect failure on Object, Collection and ID.
4. Confirm that source HTML files are present and readable.
5. Diagnose extraction and capsule-shape defects.
6. Patch backend modules without modifying cli.py.
7. Re-run strict inspect commands.
8. Re-run strict build.
9. Validate JSON schema and sections.
10. Validate text rendering.
11. Re-run full black-box battery.
12. Obtain 12/12 PASS.
```

This is an important demonstration point for SpQE Lab.

The value is not that the first generated prototype is perfect. The value is that the defect surface becomes visible, reproducible, locally patchable, and fully revalidated.

## 14. Final qualification statement

Blender API Capsule Extractor is qualified as a local backend documentation capsule extractor for the Blender `relationships.py` target.

Final state:

```text
CLI contract: OK
inspect workflow: OK
build workflow: OK
dry-run workflow: OK
expected user errors: OK
JSON capsule structure: OK
ACW-readable text capsule: OK
critical Blender API members: OK
black-box verdict: OK
````

Final verdict:

```text
VERDICT: PASS
```

The prototype is therefore suitable for inclusion in the SPQE Lab showcase as a qualified Blender backend documentation extractor and as the first backend-capsule experiment supporting the broader SPQE 3D roadmap.



