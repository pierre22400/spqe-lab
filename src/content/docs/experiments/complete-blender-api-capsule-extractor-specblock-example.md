---
title: Complete Blender API Capsule Extractor SpecBlock Example
description: Complete SpecBlock example for the Blender API Capsule Extractor prototype.
sidebar:
  label: Complete Blender API Capsule Extractor SpecBlock Example
  order: 99
---



```json
{
"title": "Blender API Capsule Extractor — First Backend for SpQE 3D",
"summary": "Local deterministic stdlib-only CLI that extracts a compact ACW-ready backend documentation capsule for SpQE 3D relationships.py from an already-unpacked official Blender Python API HTML tree.",
"spec_version": "v1.2-compact 29/06/2026",
"source_mode": "manual_plus_preflight",
"comment_human": "Clean vitrine revision of the Blender Spatial Relationships Capsule Extractor CLI. This prototype is intentionally bounded: it is not a generic crawler, not a Blender runtime tool, not a scene renderer, and not a meta-extractor. It produces a compact Blender backend documentation capsule for ACW. Blender is the first backend of SpQE 3D, not the architectural limit of the system. The 29/06/2026 preflight passed on an already-unpacked Blender Python API HTML tree with 2105 HTML files, required pages present, and all critical members present for bpy.types.Object, bpy.types.Collection, and bpy.types.ID.",
"target_audience": "SpQE developer preparing backend documentation capsules for ACW in the SpQE 3D pipeline.",
"deployment_context": "Local CLI execution, without network and without Blender runtime, on an official Blender Python API HTML documentation tree already present on disk.",
"input_sources": [
"Local root of the official Blender Python API HTML documentation already unzipped.",
"Optional local Blender manual HTML root for inspect only.",
"Explicit CLI arguments: --api-html-root, --manual-html-root, --out-json, --out-text, --strict, --dry-run, --symbol, --include-optional."
],
"output_targets": [
"Canonical JSON capsule describing the Blender backend relationships.py documentation payload.",
"Bounded ACW-readable text capsule delimited by BEGIN_BLENDER_DOC_CAPSULE and END_BLENDER_DOC_CAPSULE.",
"Minimal stdout on success containing explicit artifact paths in stable order.",
"Deterministic stderr on expected user errors."
],
"functional_objectives": [
"Treat Blender as the first backend target for SpQE 3D, not as the universal architecture.",
"Build a backend documentation capsule that helps ACW project SpQE 3D spatial relationships into Blender Python code.",
"Respect TARGET_MODULE_ROLE_RELATIONSHIPS_PY: document relationships.py without implementing it.",
"Read only local files and never access the network.",
"Resolve logical symbols separately from physical HTML carrier pages.",
"Require exactly the MVP official API symbol pages: bpy.types.Object, bpy.types.Collection, and bpy.types.ID.",
"Exclude mathutils.Vector, mathutils.Matrix, mathutils.Euler, and mathutils.html pages from the MVP build contract.",
"Extract class title, class signature, direct class description, and relationship-relevant members from each required official API page.",
"Extract Object members relevant to transforms, parenting, visibility, bounding boxes, collection membership, and custom metadata.",
"Extract Collection members relevant to object grouping, nested collections, visibility, and scene organization.",
"Extract ID members relevant to naming, data-block metadata, library linkage, session identity, and reference tracking.",
"Prioritize the critical members proven present by the 29/06/2026 preflight.",
"Clean Sphinx, Furo, and Blender UI noise: navigation, sidebar, footer, headerlink, theme toggles, global indexes, bpy.ops.*, GeometryNode, and CompositorNode noise.",
"Inject SpQE relationships.py ownership doctrine as static profile content, not as inferred Blender documentation.",
"Build a compact capsule with non-empty doctrinal sections and non-empty official API symbols.",
"Render the text capsule as readable ACW-oriented blocks, not as single-line JSON section blobs.",
"Support inspect mode for symbol-level diagnostics without writing capsule artifacts.",
"Support build mode for JSON and text artifact generation.",
"Support strict mode that fails on missing required pages or missing critical relationship members.",
"Support dry-run mode that reports expected actions and paths without writing artifacts.",
"Produce a stable capsule suitable for SPQE Lab vitrine demonstration as the first backend capsule extractor for SpQE 3D."
],
"non_functional_constraints": [
"Python 3.11+.",
"stdlib-only.",
"No network access.",
"No Blender runtime dependency.",
"No fake-bpy-module dependency.",
"Modules import-safe: no read, write, print, or extraction at import time.",
"Deterministic behavior for the same inputs.",
"JSON UTF-8 canonical output with sorted keys, stable indentation, and exactly one final newline.",
"Text output UTF-8 with exactly one final newline.",
"Return codes: help=0, no_args=0, success=0, expected user error=2, unexpected internal error=1.",
"Never modify source documentation files.",
"Write only to explicit output paths supplied by the user.",
"Accept Windows and POSIX paths.",
"Avoid POSIX-only APIs.",
"Every generated function, including utilities, must have a docstring.",
"Every generated file must contain a pedagogical module docstring banner after imports."
],
"architectural_objectives": [
"Generate a one-shot tool dedicated to the Blender backend relationships.py documentation capsule.",
"Preserve separation between CLI, orchestration, contracts, profile, path resolution, HTML extraction, capsule construction, rendering, and filesystem IO.",
"Treat the official Blender Python API HTML tree as the primary source of official backend facts.",
"Treat the Blender manual HTML root as optional secondary context for inspect only.",
"Preserve the root/path/hydration contract: a resolved page may be path-only and hydrated later.",
"Preserve the symbol-aware contract for required MVP official pages: bpy.types.Object, bpy.types.Collection, and bpy.types.ID.",
"Keep Blender-specific knowledge late in the pipeline as backend capsule content, not as SpQE 3D universal doctrine.",
"Represent the backend capsule as declarative knowledge injected into ACW rather than as a coded adapter module.",
"Do not generate an adapter, renderer, Blender plugin, or scene authoring runtime.",
"Keep product-specific relationships.py capsule sections separate from generic S091 family obligations."
],
"behavior_contract": {
"default_behavior": {
"when_no_args": "Print top-level CLI help and return 0.",
"stdout_notes": "On success, stdout contains only the produced artifact paths in stable order, with exactly one final newline."
},
"expected_error_behavior": {
"missing_api_root": "Return 2 with one deterministic stderr line.",
"missing_required_symbol_page": "Return 2 with the exact missing required filename or carrier page.",
"missing_required_symbol_anchor": "Return 2 in strict mode with the exact missing logical symbol or critical member.",
"invalid_output_path": "Return 2 with the invalid output path.",
"unreadable_html": "Return 2 with the unreadable HTML file.",
"empty_extraction": "Return 2 if no useful documentary content is extracted from a required page.",
"unknown_subcommand": "Return 2 through argparse-compatible behavior.",
"bad_arguments": "Return 2 and write at least one short stderr line."
},
"success_behavior": {
"json_output": "Write a JSON capsule conforming to SpQE_blender_doc_capsule.v1.",
"text_output": "Write a bounded ACW-readable text capsule delimited by BEGIN_BLENDER_DOC_CAPSULE and END_BLENDER_DOC_CAPSULE.",
"source_docs": "Never modify source documentation files.",
"strict_build_quality": "In strict mode, required pages, required symbols, critical members, and non-empty required capsule sections must be validated."
}
},
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
"build",
"inspect",
"relationships.py"
],
"stable_fragments_any": [
"--api-html-root",
"--out-json",
"--out-text",
"--strict",
"--dry-run"
],
"subcommand_fragments": {
"build": [
"--api-html-root",
"--out-json",
"--out-text",
"--strict",
"--dry-run"
],
"inspect": [
"--api-html-root",
"--manual-html-root",
"--symbol",
"--include-optional",
"--strict",
"--dry-run"
]
},
"notes": "Flat CLI with direct subcommands. build is the main command; inspect is a local diagnostic tool. no-args and help must return 0."
},
"domain_contracts": {
"schema_version": "SpQE_3d_blender_backend_capsule_domain.v1",
"family_alignment": {
"expected_family": "local_document_extractor_lifecycle",
"family_role": "Local document extractor prototype: explicit HTML root, symbol page resolution, HTML hydration, documentary extraction, JSON/TXT artifacts.",
"prototype_must_not_implement_harness": true,
"notes": [
"The family is owned by SpQE and HARNESS, not by the generated prototype.",
"The prototype exposes a compatible CLI surface: build from --api-html-root to explicit artifacts.",
"S091 verifies the generic local document extractor lifecycle, not product-specific Blender relationships.py sections."
]
},
"SpQE_3d_positioning": {
"product_role": "First backend documentation capsule extractor for SpQE 3D.",
"backend": "Blender",
"backend_capsule_role": "Declarative backend knowledge injected into ACW.",
"not_an_adapter_module": true,
"not_a_scene_generator": true,
"not_a_blender_runtime_script": true,
"design_note": "ACW uses the backend capsule to project SpQE 3D scene abstractions into backend-specific Python code. Blender-specific knowledge must appear late and only in the backend capsule layer."
},
"target_document_preflight": {
"schema_version": "SpQE_3d_backend_doc_preflight.v1",
"generated_utc": "2026-06-29T07:31:49.775585+00:00",
"backend": "Blender",
"documentation_kind": "Blender Python API HTML",
"html_file_count": 2105,
"required_page_count": 3,
"required_pages_ok": true,
"critical_members_ok": true,
"preflight_verdict": "pass",
"out_of_mvp_pages": {
"mathutils.Vector.html": "not_required",
"mathutils.Matrix.html": "not_required",
"mathutils.Euler.html": "not_required"
},
"specblock_implications": [
"The prototype must accept --api-html-root pointing to a local official Blender Python API HTML root.",
"The MVP required symbols are bpy.types.Object, bpy.types.Collection, and bpy.types.ID.",
"The extractor must produce JSON and ACW-readable text capsule artifacts.",
"The text artifact must not render sections as single-line JSON blobs.",
"Strict mode must fail on missing required pages or missing critical relationship members.",
"mathutils pages are out of MVP scope and must not be required.",
"relationships.py ownership doctrine must be injected as static profile content, not inferred from Blender HTML pages."
]
},
"capsule_scope": {
"target_backend": "Blender",
"target_module": "relationships.py",
"target_module_role_ref": "TARGET_MODULE_ROLE_RELATIONSHIPS_PY",
"not_a_meta_extractor": true,
"not_batch": true,
"not_network_crawler": true,
"source_of_truth": "official_blender_python_api_html",
"capsule_level_1": "compact ACW backend contract"
},
"target_module_role": {
"block_id": "TARGET_MODULE_ROLE_RELATIONSHIPS_PY",
"target_module": "relationships.py",
"role": [
"relationships.py is the Blender backend runtime spatial-relationship module for SpQE 3D editable scenes.",
"It is not the documentation extractor.",
"It is not an asset generator.",
"It is not a material, lighting, camera, render, CLI, or packaging module.",
"It owns the semantic and geometric layer converting relative scene intent into deterministic spatial constraints."
],
"primary_responsibility": [
"Represent and resolve relationships between declared scene objects, collections, anchors, bounding boxes, hidden interface helpers, and spatial frames.",
"Translate human-like placement intent into normalized spatial constraints before final Blender transforms are committed."
],
"core_concepts_owned": {
"object_to_object_relationships": [
"on",
"under",
"inside",
"near",
"in_front_of",
"behind",
"left_of",
"right_of",
"aligned_with",
"centered_on",
"parallel_to",
"perpendicular_to",
"stacked_on",
"attached_to",
"grouped_with"
],
"spatial_anchors": [
"primary anchor object",
"parent collection anchor",
"hidden interface helper",
"world anchor"
],
"hidden_SpQE_helper_interfaces": [
".SpQE_interface_ground",
".SpQE_interface_tabletop",
".SpQE_interface_wall",
".SpQE_interface_sky",
".SpQE_anchor_*"
],
"frame_and_bbox_concepts": [
"object declaration frame",
"pre_frame",
"pre_bbox",
"runtime_bbox",
"solver_bbox",
"final transform"
],
"backend_geometry_concepts": [
"positions",
"offsets",
"directions",
"bbox corners",
"transform matrices",
"local frame conversions",
"Euler rotations",
"orientation constraints"
]
},
"boundaries": [
"relationships.py must not create final mesh assets.",
"relationships.py must not own material creation.",
"relationships.py must not own lighting setup.",
"relationships.py must not own camera setup.",
"relationships.py must not own render settings.",
"relationships.py must not perform final rendering.",
"relationships.py must not parse CLI arguments.",
"relationships.py may create or update invisible helper objects only when namespaced with .SpQE_*."
],
"human_construction_paradigm": [
"Start from anchors, planes, relative positions, support surfaces, alignments, containment, and local frames.",
"Avoid absolute XYZ as the primary authoring language.",
"Absolute transforms are the final consequence of the relationship graph."
]
},
"resolved_page_contract": {
"resolver_may_return_path_only_pages": true,
"path_like_attributes": [
"spec",
"path",
"absolute_path",
"source_path",
"file_path",
"html_path",
"resolved_path"
],
"html_content_attributes": [
"raw_html",
"html",
"html_text",
"html_content",
"content",
"text",
"source_html"
],
"required_behavior": [
"path_resolver owns exact physical carrier page resolution.",
"target symbol and physical HTML carrier page are distinct concepts.",
"For the MVP build contract, required logical symbols resolve to dedicated physical pages only: bpy.types.Object.html, bpy.types.Collection.html and bpy.types.ID.html.",
"html_extract hydrates path-only pages and extracts local sections around exact anchors for resolved official pages.",
"capsule_builder must build official_api_symbols only from resolved official MVP pages and must not add mathutils concepts in the MVP build contract."
]
},
"required_symbol_pages": [
{
"symbol": "bpy.types.Object",
"expected_filename": "bpy.types.Object.html",
"required": true,
"purpose": "Object data-blocks, transforms, matrices, parentage, bounding boxes, children, visibility, collection membership, and metadata surfaces useful to the spatial solver.",
"required_members": [
"bpy.types.Object.bound_box",
"bpy.types.Object.children",
"bpy.types.Object.data",
"bpy.types.Object.empty_display_size",
"bpy.types.Object.hide_get",
"bpy.types.Object.hide_render",
"bpy.types.Object.hide_select",
"bpy.types.Object.hide_set",
"bpy.types.Object.hide_viewport",
"bpy.types.Object.location",
"bpy.types.Object.matrix_basis",
"bpy.types.Object.matrix_local",
"bpy.types.Object.matrix_parent_inverse",
"bpy.types.Object.matrix_world",
"bpy.types.Object.parent",
"bpy.types.Object.parent_type",
"bpy.types.Object.rotation_euler",
"bpy.types.Object.scale",
"bpy.types.Object.users_collection",
"bpy.types.Object.visible_get"
]
},
{
"symbol": "bpy.types.Collection",
"expected_filename": "bpy.types.Collection.html",
"required": true,
"purpose": "Object grouping, nested collections, scene organization, hidden helper ownership, and relationship scaffold organization.",
"required_members": [
"bpy.types.Collection.children",
"bpy.types.Collection.hide_render",
"bpy.types.Collection.instance_offset",
"bpy.types.Collection.objects"
]
},
{
"symbol": "bpy.types.ID",
"expected_filename": "bpy.types.ID.html",
"required": true,
"purpose": "Data-block naming, library linkage, reference counts, persistent metadata, and custom-property carrier behavior.",
"required_members": [
"bpy.types.ID.is_library_indirect",
"bpy.types.ID.library",
"bpy.types.ID.name",
"bpy.types.ID.name_full",
"bpy.types.ID.override_library",
"bpy.types.ID.session_uid",
"bpy.types.ID.users"
]
}
],
"optional_symbol_pages": [
{
"symbol": "bpy.types.ObjectConstraints",
"expected_filename": "bpy.types.ObjectConstraints.html",
"required": false
},
{
"symbol": "bpy.types.Constraint",
"expected_filename": "bpy.types.Constraint.html",
"required": false
},
{
"symbol": "bpy.types.Scene",
"expected_filename": "bpy.types.Scene.html",
"required": false
},
{
"symbol": "bpy.types.ViewLayer",
"expected_filename": "bpy.types.ViewLayer.html",
"required": false
},
{
"symbol": "bpy.types.LayerCollection",
"expected_filename": "bpy.types.LayerCollection.html",
"required": false
}
],
"target_documentary_facts": {
"bpy.types.Object": [
"bound_box",
"children",
"data",
"empty_display_size",
"hide_get",
"hide_render",
"hide_select",
"hide_set",
"hide_viewport",
"location",
"matrix_basis",
"matrix_local",
"matrix_parent_inverse",
"matrix_world",
"parent",
"parent_type",
"rotation_euler",
"scale",
"users_collection",
"visible_get"
],
"bpy.types.Collection": [
"children",
"hide_render",
"instance_offset",
"objects"
],
"bpy.types.ID": [
"is_library_indirect",
"library",
"name",
"name_full",
"override_library",
"session_uid",
"users"
]
},
"spatial_relationship_capsule_must_include": {
"ownership": {
"owns": [
"semantic spatial relation normalization",
"hidden .SpQE_* interface helpers",
"object-to-object relationship constraints",
"local homogeneous spatial clusters",
"parenting, grouping, visibility, and custom-property metadata needed by the solver",
"conversion from normalized relations to deterministic solver-ready constraints"
],
"forbidden": [
"materials",
"lighting",
"cameras",
"render settings",
"asset mesh construction",
"remote documentation retrieval",
"global scene orchestration outside relationship constraints",
"blind absolute XYZ placement as primary architecture"
]
},
"creation_patterns": [
"Create solver helper empties or meshless anchors with bpy.data.objects.new(name, None).",
"Link helper objects explicitly into an SpQE-owned collection.",
"Create or reuse an SpQE collection before linking generated helper objects.",
"Assign a stable .SpQE_ prefix to internal helper data-blocks.",
"Attach custom properties such as relation kind, source object, target object, interface id, and solver stage to helper IDs."
],
"assignment_patterns": [
"Assign parent-child relationships only after both source and target objects have been resolved as concrete Blender data-blocks.",
"Write location, rotation_euler, and scale during solver finalization, not during early semantic interpretation.",
"Use hide_viewport, hide_render, hide_get, hide_set, and visible_get semantics for helper visibility.",
"Use object and collection names as readable handles, but use ID custom properties for machine-readable relationship metadata.",
"Bind on, inside, attached_to, or aligned_with relations to explicit interface records rather than unexplained absolute coordinates."
],
"forbidden_elements": [
"Do not create, edit, or infer materials inside relationships.py.",
"Do not create, edit, or infer cameras inside relationships.py.",
"Do not create, edit, or infer lights inside relationships.py.",
"Do not mutate render settings, output paths, frame ranges, or engine configuration from relationships.py.",
"Do not depend on remote documentation, network access, or non-local files during capsule extraction.",
"Do not require mathutils.Vector, mathutils.Matrix, mathutils.Euler, or mathutils.html pages in the MVP extraction profile.",
"Do not collapse all spatial reasoning into absolute XYZ coordinates before local interfaces and relation constraints are known.",
"Do not mutate unrelated user scene objects unless they are explicitly part of the SpQE relationship graph."
],
"safety_rules": [
"Represent spatial intent through deterministic relation records before applying final numeric transforms.",
"Create hidden helper objects or helper collections with a .SpQE_ prefix when solver interfaces, contact planes, rails, or local frames must exist in the Blender scene.",
"Keep helper data-blocks invisible to normal renders when they are implementation scaffolding rather than user assets.",
"Store relationship provenance and solver metadata in ID custom properties.",
"Use collections to group generated assets, relationship helpers, and local interface families without taking ownership of unrelated scene data.",
"Resolve semantic relations such as on, inside, near, aligned_with, centered_on, parallel_to, perpendicular_to, attached_to, and grouped_with into deterministic constraints.",
"Separate object intent from runtime Blender measurements: pre_frame, pre_bbox, runtime_bbox, and solver_bbox are distinct layers.",
"Prefer local homogeneous clusters over a single global coordinate frame when objects belong to different spatial or narrative regions."
]
},
"canonical_capsule_template": {
"schema_version": "SpQE_blender_doc_capsule.v1",
"target_backend": "Blender",
"target_module": "relationships.py",
"source_kind": "official_blender_python_api_html",
"capsule_scope": "MVP spatial relationships, hidden interface helpers, relative transforms, object membership, visibility, metadata, and solver-relevant Blender API members.",
"s091_family_scope_note": "Product contract for relationships.py only. Do not promote these product sections into generic S091 obligations.",
"sections": {
"SpQE_ownership": [],
"assignment_patterns": [],
"creation_patterns": [],
"forbidden_elements": [],
"official_api_symbols": [],
"optional_symbol_pages": [],
"safety_rules": []
}
},
"safe_patterns": {
"create_relationship_collection": [
"collection = bpy.data.collections.new(name)",
"scene.collection.children.link(collection)"
],
"create_anchor_helper": [
"anchor = bpy.data.objects.new(name, None)",
"collection.objects.link(anchor)"
],
"create_interface_helper": [
"helper = bpy.data.objects.new(name, None)",
"collection.objects.link(helper)"
],
"assign_relative_transform": [
"object.location = relative_location",
"object.rotation_euler = relative_rotation",
"object.scale = relative_scale"
],
"assign_parent_anchor": [
"child.parent = anchor",
"child.matrix_parent_inverse = anchor.matrix_world.inverted()"
],
"assign_relationship_metadata": [
  "helper[\"SpQE_kind\"] = \"relationship\"",
  "helper[\"SpQE_relationship_id\"] = relationship_id",
  "helper[\"SpQE_anchor_id\"] = anchor_id",
  "helper[\"SpQE_relation_type\"] = relation_type"
],
"minimal_acw_intent": [
"Create deterministic relationship helpers by name.",
"Represent relative placement with anchors, interface helpers, and explicit transforms.",
"Attach helpers to explicit Blender collections without active context.",
"Attach SpQE relationship metadata through custom properties.",
"Preserve editable scene structure while resolving spatial constraints deterministically."
],
"product_quality_contract": {
"required_capsule_sections": [
"SpQE_ownership",
"assignment_patterns",
"creation_patterns",
"forbidden_elements",
"official_api_symbols",
"optional_symbol_pages",
"safety_rules"
],
"non_empty_sections_in_strict_mode": [
"SpQE_ownership",
"assignment_patterns",
"creation_patterns",
"forbidden_elements",
"official_api_symbols",
"safety_rules"
],
"official_api_symbols_count": 3,
"object_member_min_count": 20,
"must_include_members": [
"bpy.types.Object.users_collection",
"bpy.types.Object.matrix_world",
"bpy.types.Object.parent",
"bpy.types.Object.bound_box",
"bpy.types.Collection.objects",
"bpy.types.ID.name"
],
"text_quality": [
"Text output starts with BEGIN_BLENDER_DOC_CAPSULE.",
"Text output ends with END_BLENDER_DOC_CAPSULE.",
"Text output contains readable BEGIN_SECTION blocks.",
"Text output must not render section-level single-line JSON blobs."
]
}
},
"family_lexicon": {
"selected_family": "local_document_extractor_lifecycle",
"intent": "Local document extractor producing JSON/TXT artifacts from an explicit HTML root.",
"required_surface": [
"CLI build command",
"CLI inspect command",
"explicit local input root",
"explicit output files",
"readback-friendly artifacts",
"deterministic schema_version top-level"
],
"must_not_do": [
"network crawling",
"batch multi-module extraction",
"runtime Blender execution",
"harness implementation",
"scene rendering",
"asset generation"
]
},
"constraints_by_scope": {
"cli": [
"No import-time side effects.",
"No extraction logic inside app/cli.py.",
"Help/no-args behavior must be deterministic.",
"No-args and help return 0.",
"Bad args return 2."
],
"path_resolution": [
"Resolve exact carrier filenames from declared symbol pages.",
"Do not require mathutils.html for Vector, Matrix, or Euler concepts in the MVP.",
"Do not deduplicate required official symbols only by physical path.",
"Return deterministic expected errors for missing required pages.",
"Resolve optional pages without blocking build when absent."
],
"html_extraction": [
"Hydrate path-only resolved pages.",
"Extract from dl.py and dt.sig regions.",
"Extract direct class descriptions without bleeding into arbitrary first attributes.",
"Extract selected relationship-relevant members before truncation.",
"Prioritize target members in the order defined by the profile or preflight contract.",
"Remove navigation and global index noise.",
"Preserve wildcards such as .SpQE_* and bpy.ops.* in textual patterns."
],
"capsule": [
"Top-level schema_version must be a string.",
"metadata and sections must be top-level.",
"official_api_symbols must contain exactly one entry per required logical symbol.",
"official_api_symbols entries should include compact members when extracted.",
"SpQE_ownership, assignment_patterns, creation_patterns, forbidden_elements, and safety_rules must not be empty in strict mode.",
"Product sections must not become generic S091 obligations."
],
"rendering": [
"JSON must be canonical and deterministic.",
"Text must be ACW-readable.",
"Text sections must be rendered as readable blocks.",
"Text sections must not be rendered as single-line JSON blobs."
],
"filesystem": [
"Read only declared source documentation files.",
"Write only explicit outputs.",
"Use UTF-8.",
"Use exactly one final newline."
]
},
"constraints_canonical": [
  "Do not regress existing code while implementing the requested functionality.",
  "Every generated file has a pedagogical module docstring banner after imports.",
  "Every generated function has a docstring.",
  "Keep Windows/POSIX path compatibility.",
  "Avoid POSIX-only APIs.",
  "Never use bpy.ops.* as the normal deterministic solve path.",
  "Never let markdown or wildcard cleaning strip '*' from .SpQE_anchor_* or bpy.ops.*.",
  "Do not introduce top-level specblock fields outside the established compact specblock structure."
]
}
}

````

