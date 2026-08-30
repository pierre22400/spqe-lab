---
title: Why this showcase exists
description: Public evidence for controlled AI software generation.
---

SpQE Lab is an independent applied-research project on controlled AI software generation.

SpQE stands for **Specification-to-Prototype Qualification Engine** and is pronounced **Speky**.

This showcase is a public evidence surface. It documents what generated programs actually do, where they fail, how those failures are diagnosed and what happens when a localized repair is applied.

## What is being demonstrated

SpQE studies a complete engineering trajectory:

1. express an explicit software intent;
2. generate a modular executable program;
3. exercise it through black-box controls;
4. preserve failures and outputs as evidence;
5. localize contract or integration defects;
6. repair narrowly where appropriate;
7. rerun qualification.

The project does not claim first-shot perfection. Its purpose is to make generation quality, failure modes and repair effort observable.

## Why publish the failures

A coding system is not meaningfully evaluated by screenshots or source-code impressions alone.

The comparative benchmarks therefore report executable behaviour, including failed controls, blocked downstream checks, different qualification denominators and incomplete repair cycles. These limitations are part of the result.

This makes the remaining problem concrete enough for model and infrastructure teams to investigate: first-shot semantic consistency across generated modules.

## Who this may be relevant to

The work may be relevant to:

- coding-model and LLM infrastructure teams;
- researchers studying agentic software construction;
- engineering teams working on executable evaluation and repair;
- organizations interested in controlled, inspectable software generation;
- potential technical or strategic partners.

For a model provider such as Mistral, SpQE offers an experimental framework for measuring how a model changes modular generation, inter-file consistency, inference cost and repair trajectories.

## Current focus

SpQE Lab is currently focused on:

- publishing the comparative Kiro benchmark series;
- improving first-shot contract closure;
- separating root defects from cascaded failed controls;
- strengthening reproducible evidence packages;
- evaluating additional coding-model backends.

SpQE Lab is **not currently seeking external prototype specifications**. The earlier Request Kit is retained only as historical documentation.

## Proposed next experiment

Connect a Mistral coding model to the same SpQE pipeline, rerun the executable benchmarks and compare the complete generation–qualification–repair trajectory.

That experiment would test the model inside a controlled engineering loop rather than evaluate isolated code completions.
