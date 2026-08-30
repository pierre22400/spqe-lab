---
title: Family-driven Generation
description: SpQE Lab method for generating reproducible functional prototype families.
sidebar:
  label: Family-driven Generation
  order: 10
---

Family-driven generation is an SpQE Lab method for moving from isolated prototype generation to reproducible functional cloning.

A `family` is a controlled class of prototypes associated with stable public behavior. It is not just a label and not just a broad category. In SpQE, a family can carry invariants, a reproducible public contract, a deterministic S0-91 probe, a PROD Contract, and, when available, a `technical_structure` describing the expected architectural ownership behind that public behavior.

This page describes the general doctrine. It is a method page, not a single experiment report.

<!-- SpQE-FAMILY-DIAGRAM:START -->

<figure class="SpQE-diagram-figure">
  <img
    src="/spqe-lab/images/methods/diagram_family01.svg"
    alt="Family-driven generation flow from SpecBlock to deterministic S0-91 validation"
  >
  <figcaption>
    Family-driven generation: from SpecBlock classification to reproducible public validation.
  </figcaption>
</figure>

<!-- SpQE-FAMILY-DIAGRAM:END -->

## Why families matter

A prototype can converge technically while still losing an essential part of its intended behavior. For SpQE, that is not enough.

Family-driven generation raises the requirement. The question becomes:

```text
Can two generated prototypes belonging to the same family preserve the same public lifecycle invariant?
```

This matters because SpQE Lab is not only trying to generate code that runs once. It aims to generate prototypes whose observable behavior can be reproduced, tested, compared, and eventually composed.

A family therefore acts as an upstream stabilizer. It gives the pipeline a known behavioral shape before code generation begins.

## Core definition

The working model is:

```text
family
=
a class of prototypes
+
PASS1bis normalization invariants
+
a reproducible public contract
+
optionally a deterministic S0-91 probe
+
optionally a technical_structure contract
```

A family aligns several layers of the SpQE Lab pipeline:

```text
PASS1 classification
→ PASS1bis normalization
→ PROD Contract construction
→ deterministic S0-91 validation
→ HARNESS execution
→ targeted repair if needed
```

The goal is to prevent each downstream stage from rediscovering, reinventing, or approximating the intended lifecycle.

## From convergence to functional cloning

Earlier prototype generation focused on convergence: produce a complete project, keep it structurally coherent, pass global checks, and make the public command surface usable.

Family-driven generation introduces a stricter goal:

```text
generate functional clones belonging to guaranteed families
```

A family-driven prototype should not merely look plausible. It should preserve a public lifecycle that can be executed and verified.

For example, a workspace/dataset family can require the following public workflow:

```text
workspace init
→ dataset add
→ dataset list
```

The invariant is simple but decisive:

```text
a dataset registered in a workspace must be retrievable through a public read command in the same operational context
```

This turns an abstract generation task into a reproducible behavioral contract.

## Current family lexicon

Family-driven generation relies on a controlled family lexicon.

A family name is not invented freely during a run. PASS1 must either select a known family when the SpecBlock clearly matches one, or leave the prototype off-family when no known family applies.

The currently covered families include:

* `workspace_entity_lifecycle`
  A local workspace entity lifecycle. Typical public invariant: initialize a workspace, create an entity, then read or list it back through the public CLI.

* `workspace_dataset_lifecycle`
  A local workspace dataset lifecycle. Typical public invariant: initialize a workspace, register a dataset, then list or read it back in the same workspace context.

* `workspace_task_lifecycle`
  A local task lifecycle. Typical public invariant: create or use a workspace, add a task, then list or read the created task through the public CLI.

* `local_forge_issue_lifecycle`
  A local forge or issue-tracking lifecycle. Typical public invariant: create an issue-like record, preserve its public identifiers and fields, then retrieve it through a public read or list command.

* `local_document_extractor_lifecycle`
  A local document extraction lifecycle. Typical public invariant: run an extractor against a local documentation tree or local source material, produce an expected extraction artifact, then verify that the artifact is present and readable.

These families were introduced progressively through repeated prototype experiments. Earlier runs focused on producing convergent prototypes. Later runs exposed recurring public lifecycle shapes, which were then promoted into explicit family contracts and deterministic validation probes.

```text
repeated prototype pattern
→ recognized lifecycle family
→ explicit family invariant
→ deterministic S0-91 probe
→ more reproducible functional cloning
```

A prototype that does not match one of these families remains off-family. That is intentional. Family-driven generation should stabilize known reusable shapes, not force every prototype into a predefined lifecycle.

## Known family, unknown probe

A family can exist in the lexicon before every possible validation probe is available.

This distinction matters.

```text
known family
≠
always executable family probe
```

A known family can guide classification and normalization, while a deterministic S0-91 probe may be added later when the public workflow is stable enough to be encoded as a reproducible validation contract.

When no executable S0-91 contract is available for a selected family, the pipeline should skip that specific probe cleanly rather than falling back to an unrelated heuristic workflow.

This avoids false failures.

The method is deliberately conservative: a missing deterministic family probe should not cause HARNESS to invent one from loose text.

## PASS1 and PASS1bis responsibilities

Family-driven generation separates two decisions that should not be confused.

PASS1 is the classifier.

It reads the SpecBlock, produces the initial design units, and selects a family from the controlled lexicon when a clear match exists.

PASS1bis is the aligner.

It receives the family selected by PASS1 and performs targeted normalization when the initial design units are incompatible with known family invariants, validation expectations, or available architecture ownership hints.

The public doctrine is:

```text
PASS1
→ classify and draft the architecture

PASS1bis
→ align the draft with the selected family

HARNESS
→ validate the public invariant when a deterministic probe exists
```

PASS1bis should not behave as a second full architect. Its role is to preserve a compatible architecture and repair concrete incompatibilities, not to redesign the whole prototype.

## PROD Contract and S0-91 validation

The PROD Contract transports the selected family contract through the execution plan.

Its purpose is to make the family decision operational. Instead of leaving HARNESS or later stages to infer behavior from the SpecBlock again, SpQE Lab carries a structured contract downstream.

The doctrine is:

```text
family
→ deterministic S0-91 contract
→ PROD Contract
→ execution_plan metadata
→ HARNESS validation
```

S0-91 is the family-driven workflow probe.

When a family has an executable S0-91 contract, HARNESS runs the corresponding deterministic public workflow. It does not invent a new probe from the text of the SpecBlock. It selects the known contract associated with the family.

For a dataset workspace family, S0-91 may validate that a dataset can be created and read back through the public CLI. For an entity workspace family, it may validate that an entity can be created and listed. For a local document extractor family, it may validate that an expected extraction artifact is produced and readable.

The important point is reproducibility:

```text
same family
→ same public invariant
→ same deterministic validation logic
```

This makes the public lifecycle explicit and testable.

## Family technical structure

Some families require more than a public workflow.

A S0-91 probe can say what must be observable from the outside, but it does not always explain which modules should naturally own the responsibilities required to pass that workflow.

This is the role of family technical structure.

It is an architectural ownership contract. It can describe expected modules, responsibilities, public APIs, artifact obligations, and boundaries. It helps PASS1bis align the generated design units before code generation, so that the family workflow is easier to generate correctly and less likely to require late unstable repair.

The distinction is important:

```text
S0-91 validation contract
  public behavior to validate

family technical structure
  architecture expected to support that behavior
```

This is useful when a public lifecycle repeatedly fails because the generated modules disagree about ownership: one module creates a record, another reads a different representation, or a renderer drops a required public identifier.

Family technical structure should remain an alignment aid. It is not a full implementation plan.

## What family-driven generation is not

Family-driven generation is not a rigid template system.

A family does not dictate every file, every function, or every implementation detail. It defines the public lifecycle and the architectural constraints needed to preserve that lifecycle.

It is also not a pruning strategy. SpQE Lab does not primarily generate many candidates and discard most of them. Its preferred mode is repair: keep the best available prototype alive, identify what fails, patch the relevant defect, and revalidate the system.

## Off-family prototypes remain important

Not every successful prototype should become a family.

SpQE Lab also generates off-family prototypes: scientific CLIs, data processors, extraction tools, report generators, validation utilities, and experimental one-shot tools.

These prototypes are useful because they reveal new patterns, new failure modes, and possible future families. A prototype may first converge off-family, then later suggest a reusable lifecycle that deserves a deterministic probe.

```text
off-family prototype
→ repeated pattern discovered
→ candidate family
→ family contract
→ deterministic public validation
```

Off-family generation is therefore not a fallback failure mode. It is part of the research process.

Family-driven generation should grow from evidence, not from premature taxonomy.

## Why this is a method, not an experiment

A single experiment demonstrates one result. A family defines a reusable way to generate and validate a class of prototypes.

That is why family-driven generation belongs in Methods. Data Workspace CLI is one concrete experiment. The family doctrine is the method that explains why this experiment matters.

The broader SpQE Lab trajectory is:

```text
generate convergent prototypes
→ identify repeated lifecycle shapes
→ model them as families
→ attach deterministic public probes
→ normalize architecture upstream
→ validate public invariants downstream
→ repair with evidence when needed
```

This is the step that moves SpQE Lab closer to functional cloning: not merely producing software that runs, but producing software whose public behavior belongs to a known, reproducible class.

## What this page does not disclose

This page describes the public doctrine of family-driven generation.

It intentionally does not disclose the internal implementation recipe: exact prompts, internal routing logic, private repair heuristics, detailed payload shapes, or the full contents of the deterministic probe library.

The important public idea is not the internal wiring. The important public idea is the method:

```text
controlled family selection
→ upstream normalization
→ reproducible public invariant
→ deterministic validation
→ evidence-guided repair when needed
```

This is enough to understand why family-driven generation matters without turning the method page into an implementation manual.

