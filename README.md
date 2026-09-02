# SpQE Lab

SpQE Lab is an independent applied-research project studying controlled AI software generation through an explicit, specification-driven pipeline:

**structured SpecBlock → architectural decomposition → module-level tasks → specialized generation agents → qualification harness → failure diagnosis → targeted repair**

The project investigates whether a structured software specification can remain the reference artefact throughout modular construction, qualification and localized repair, rather than serving only as an initial prompt.

Independent black-box tests are used in the published comparative experiments to evaluate the resulting prototypes from outside the generation pipeline.

The public showcase is available at [pierre22400.github.io/spqe-lab](https://pierre22400.github.io/spqe-lab/).

## What this repository contains

* comparative executable benchmarks between SpQE and Kiro;
* method notes on specification-driven and family-driven generation;
* historical qualification experiments;
* complete SpecBlock examples and a lightweight technical Request Kit;
* the Astro/Starlight source used to publish the showcase on GitHub Pages.

## Current benchmark position

The published evidence does not claim that SpQE is more robust than Kiro at first generation. Kiro currently produces the stronger initial result across the comparative series. SpQE nevertheless generates substantial executable domain behaviour, exposes failures through its qualification process and has demonstrated that localized defects can be closed without regenerating an entire program.

The dominant observed SpQE weakness is first-shot contract consistency between generated modules. The benchmark pages distinguish untouched first-shot results, earliest recorded results obtained after an enabling fix, later targeted repairs, controls not reached and scores produced by different qualification batteries.

See the [comparative benchmark overview](https://pierre22400.github.io/spqe-lab/benchmarks/) for the current figures and methodological boundaries.

## Technical contact

SpQE Lab is not operating an open prototype service. A technical reviewer may nevertheless submit a bounded SpecBlock through the [Request Kit](https://pierre22400.github.io/spqe-lab/request-kit/) to make an evaluation concrete. Submission creates no service, delivery or response commitment.

## Local development

Requirements: Node.js and npm.

```bash
npm ci
npm run dev
```

Build the static site with:

```bash
npm run build
```

The GitHub Actions workflow publishes the generated static site to GitHub Pages from the `main` branch.
