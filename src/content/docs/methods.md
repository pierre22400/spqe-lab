---
title: Methods overview
description: How SpQE Lab documents controlled software generation experiments.
---

SpQE Lab explores how AI systems can generate, audit, repair and document software prototypes.

<!-- SpQE-METHODS-PIPELINE-DIAGRAM:START -->

<figure class="SpQE-diagram-figure">
  <img
    src="/spqe-lab/images/methods/SpQE-generation-loop.svg"
    alt="SpQE prototype generation loop from SpecBlock to qualification"
  >
  <figcaption>
    SpQE generation loop: from structured prototype request to tested, documented and qualified prototype.
  </figcaption>
</figure>

<!-- SpQE-METHODS-PIPELINE-DIAGRAM:END -->
## SpQE Lab — From Specification to Tested Prototype

SpQE Lab is an experimental software system for turning a structured prototype request into a working, testable software prototype.

It does not simply ask an LLM to “write code”. It builds a controlled generation environment around the model: the initial request is transformed into a technical contract, decomposed into coherent software units, implemented as source files, checked, repaired when needed, and validated against observable user-facing behavior.

The goal is not to produce a persuasive demo. The goal is to produce a prototype that can be executed, inspected, tested, packaged, and discussed.

## A contract-first generation system

SpQE Lab starts from a structured specification, called a SpecBlock. This specification describes what the prototype must do, what inputs it accepts, what outputs it must produce, how errors should behave, and which user-visible contracts must remain stable.

From that point, SpQE Lab builds an internal software plan. The system identifies the main responsibilities of the future program, separates domain logic from interfaces, validates the consistency of the intended architecture, and prepares code generation under explicit constraints.

The resulting prototype is not treated as a single block of generated text. It is treated as a small software project.

## Multi-file prototype generation

SpQE Lab generates application modules with assigned responsibilities: command-line interface, validation, parsing, domain calculation, orchestration, rendering, reporting, scenario handling, verdict logic, or other domain-specific components depending on the prototype.

Each generated file is expected to respect its role, expose the required functions, remain import-safe, and preserve deterministic behavior. SpQE Lab also records generation artifacts so that the prototype can be audited after the run.

This makes the system closer to a software factory than to a prompt template.

## Built-in quality gates

SpQE Lab integrates several layers of quality control.

The prototype is checked structurally, functionally, and technically. Static checkers inspect the generated project, verify that the expected files and contracts exist, and detect inconsistencies before they become runtime failures.

Linting is part of the process, but it is deliberately calibrated. Ruff is used as a quality signal, with a distinction between blocking and non-blocking findings. Non-critical Ruff warnings can be reported without automatically invalidating the prototype. Only Ruff findings classified as blocking are allowed to stop or redirect the pipeline.

Type checking follows the same principle. Mypy is used to detect type-level defects, but SpQE Lab does not treat every type warning as equally severe. Autofix logic is reserved for mypy errors considered blocking for the generated prototype. Non-blocking typing observations can be kept as warnings instead of triggering unnecessary and expensive regeneration.

This distinction is important: SpQE Lab is designed to converge toward a usable prototype, not to endlessly rewrite code for cosmetic reasons. The required level of strictness could nevertheless be adjusted depending on the experiment: a fast exploratory prototype may stop once the core contract is satisfied, while a scientific, regulatory or investor-facing prototype can raise the bar with stricter tests, stronger documentation checks, and deeper validation gates.


## Runtime-oriented validation

SpQE Lab does not stop at static analysis.

Generated prototypes are executed in controlled test environments. The system checks observable behavior: command discovery, help output, exit codes, stderr messages, required arguments, valid inputs, invalid inputs, structured JSON output, text output, file handling, and domain-specific workflows.

This runtime layer is essential because many generated programs look correct at the source-code level but fail when used like real tools.

SpQE Lab therefore validates the prototype from the user’s point of view: what command is run, what the program prints, which files are produced, what return code is emitted, and whether the result matches the contract.

## Repair guided by evidence

When a defect is detected, SpQE Lab does not blindly regenerate the entire project.

It collects evidence from checkers, lint, mypy, runtime traces, functional probes, user-manual conformance tests, and packaging results. It then narrows the repair target to the relevant part of the codebase whenever possible.

The repair loop is evidence-driven and cybernetic: the generated prototype is observed, its failures are measured, the system receives those signals as feedback, and the next correction is constrained by that feedback. Failures are translated into actionable constraints, and the generated code is revised against those constraints. The objective is to correct the defect while preserving the parts of the prototype that already work.

SpQE Lab deliberately avoids pruning as its main candidate-selection strategy. It does not treat generation as a lottery where many candidates are produced and most are discarded. Its preferred mode is repair: keep the best available prototype alive, identify what is wrong, patch the defect, and revalidate the whole system.

This distinction matters. Pruning can select a superficially better candidate, but repair builds continuity, traceability and engineering memory. SpQE’s goal is not just to find code that happens to pass once; it is to converge toward a usable, auditable prototype through successive feedback-controlled corrections.

This is one of SpQE’s core ideas: generation and validation are not separate demonstrations. They form a closed cybernetic engineering loop.


## Packaging and usability checks

SpQE Lab also performs packaging-oriented checks to make sure the generated prototype can be launched in a realistic way.

The system verifies that the public entry point exists, that the expected command can be run, that the project remains importable, and that basic execution instructions can be derived. Packaging checks are combined with static and runtime evidence to decide whether the prototype is ready enough to be considered stable.

A successful run is therefore not just “code was written”. It means the generated project has passed a set of technical and user-facing gates.

## Automatic user manual generation

SpQE Lab also generates a practical user manual for the prototype.

This is not treated as a decorative deliverable. The user manual is meant to help a real user discover the command surface, understand required inputs, run the main workflows, interpret text or JSON outputs, and identify current limitations. In CLI prototypes, this typically includes starter commands, command references, input and output expectations, configuration notes, and a compact project map.

The manual also becomes a quality object in its own right. Its executable claims can be converted into black-box tests: if the manual says that invalid rows are counted, that help exits with code 0, or that JSON output contains specific sections, SpQE Lab can check those claims against the actual runtime behavior of the generated prototype.

This makes documentation part of the engineering loop. SpQE Lab does not only generate code and then describe it afterward; it can generate user-facing documentation, test the software against that documentation, and use mismatches as evidence for repair.


## Designed for scientific and technical prototypes

SpQE Lab is particularly suited to prototypes where correctness matters more than visual polish: command-line tools, data processors, scientific calculators, extraction utilities, report generators, validation tools, and workflow-based applications.

For example, a prototype can be asked to read a CSV file, validate rows, compute domain metrics, compare them to a reference, emit deterministic text or JSON, and handle invalid user input with clean error messages.

SpQE’s pipeline is designed to preserve these observable commitments throughout generation, checking, repair, and final validation.


## Prototype engine, not perfection engine

SpQE Lab is a prototype-generation engine. It does not claim that generated prototypes are perfect on the first attempt.

That would be an unrealistic standard, and it would also misunderstand how software has been built for decades. Conventional programming is iterative: developers write code, run it, discover bugs, correct them, add tests, and continue refining the system. Even mature software can still contain defects. Bugs are not an exception to coding; they are part of the normal engineering reality that testing and maintenance are designed to handle.

SpQE Lab follows the same principle, but makes the loop more explicit and more observable. A generated prototype may contain defects. The important question is whether those defects can be detected, localized, repaired, and revalidated through evidence. This is why SpQE Lab emphasizes contracts, runtime probes, user-manual conformance, targeted repair, and regression checks.

The goal is therefore not magical first-shot perfection. The goal is controlled convergence toward a usable, auditable, and progressively stabilized prototype.


## A prototype of a new software-building method

SpQE Lab is itself still a prototype, but it demonstrates a powerful direction: LLM-assisted software generation can be made more reliable when it is surrounded by contracts, checkers, controlled execution, targeted repair, and evidence capture.

The ambition is not to replace software engineering with a single prompt.

The ambition is to build a disciplined system where an LLM becomes one component inside a larger architecture for producing auditable, testable, and progressively stabilizable software prototypes.


## Research focus

SpQE Lab studies controlled software generation through concrete experiments.

The goal is not to claim that AI software generation is solved. The goal is to document, experiment after experiment, the conditions that make it more reliable, more observable and more governable.

SpQE Lab has been tested on a growing corpus of generated prototypes:

* LogForge stress test — Stress-tests log processing and generation robustness.
* Batch Rename Planner CLI — Plans safe batch file renaming operations.
* JSON to CSV Converter CLI — Converts structured JSON data into CSV tables.
* Directory Manifest Builder CLI — Builds deterministic manifests from directory trees.
* Data Workspace CLI — Manages local data workspaces and datasets.
* RuleFlow CLI — Runs rule-based local workflow checks.
* ForgeFlow CLI — Tracks local forge issues and lifecycle events.
* Research Workspace CLI — Manages research workspace entities and datasets.
* Notes Workspace CLI — Organizes local note-oriented workspace content.
* Catalog Export CLI — Exports catalog records into structured outputs.
* Task Draft CLI — Creates and lists local task drafts.
* Lipid Droplet Counter CLI — Screens microscopy-like droplet count records.
* Greeter Workspace CLI Live — Exercises workspace entity lifecycle contracts.
* Blender Materials Capsule Extractor CLI — Extracts Blender material documentation capsules.
* Blender Interfaces Capsule Extractor CLI — Extracts Blender interface and anchor concepts.
* Blender Spatial Relationships Capsule Extractor CLI — Extracts Blender spatial relationship concepts.
* Blender Spatial Anchors and Occupancy Capsule Extractor CLI — Extracts anchor and occupancy modeling concepts.
* Data Workspace CLI — Builds chronological evidence timelines from local records.
* CausalLab CLI — Tests causal-analysis workflows and manual conformance.
* GrowthCurveLab CLI — Analyzes biological growth-curve CSV data.
* ExposureLab Level 1 CLI — Screens chemical exposure records from CSV files.
* NoiseDoseLab Level 1 CLI — Screens occupational noise exposure from CSV files.
* Prompt Consistency Lab CLI — Detects contradictory prompt and generation rules.

## Current experiments

The five highlighted experiments below were selected because they show different SpQE Lab dimensions: doctrine, scientific qualification, family-driven prototype generation, spatial reasoning, and validation infrastructure.

* NoiseDoseLab Level 1 CLI
* Data Workspace CLI
* Blender Spatial Relationships
* UM_HARNESS


## Core idea

SpQE Lab is an automatic prototype-generation software system. Its purpose is not only to generate source code from a specification, but to organize a complete engineering loop around the generated artifact: prototype generation, documentation generation, executable validation, evidence collection, targeted repair, and final qualification.

In that sense, SpQE Lab is better understood as a software forge than as a simple code generator. It can produce prototypes, auditing tools, validation harnesses, user manuals, repair loops, and eventually the public research showcase that documents its own experiments.

The central idea is cybernetic: the generated prototype is observed, tested, corrected, and revalidated through feedback. SpQE Lab does not rely primarily on pruning large numbers of generated candidates. It favors repair, continuity, and traceability: keep the best available prototype alive, identify what fails, patch the relevant defect, and preserve what already works.

This is the research direction of SpQE Lab Lab: making automated software generation more observable, more testable, and more governable, one concrete prototype at a time.





