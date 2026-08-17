# Incidents and Avoidance

Last updated: 2026-08-17

This file records problems Barry must avoid repeating.

## Problem: Working Outside Elementor

Risk: the page becomes hard for a human Elementor designer to edit.

Avoidance rule: visible page design must be made through Elementor controls unless the user approves a separate technical fix.

## Problem: Rebuilding Instead of Adapting

Risk: Barry drifts away from the provided template and creates a different website style.

Avoidance rule: duplicate, adapt, and extend the imported template. Do not redesign the site from scratch.

## Problem: Huge Payload Updates

Risk: site updates fail, hang, or cause loops.

Avoidance rule: work in small batches and verify after each batch.

## Problem: Workaround Loops

Risk: a failed batch leads to increasingly messy fixes.

Avoidance rule: when a method fails, reduce scope and return to Elementor-native editing.

## Problem: Secret Leakage

Risk: WordPress application passwords or API keys could be exposed in GitHub or memory files.

Avoidance rule: never store actual secrets in repo files. Store only safe labels that point to an approved secret store.

## Problem: Raw Conversation Memory

Risk: old chats may contain outdated instructions, mistakes, credentials, or half-finished ideas.

Avoidance rule: only selected, sanitized, user-approved lessons become memory.

## Problem: Landscape Assets In Square Paired-Content Sections

Risk: a 1920x1080 hero asset placed in a two-column inline image widget can look acceptable in some cropped states but appears visibly landscape, unbalanced and poor on desktop. A square Elementor frame is not proof that the source file is square.

Avoidance rule: audit the actual media dimensions across all repeated paired text/image sections on Home, Services, Service Areas, About and individual service pages. Inline paired-content sources must be genuine 1000x1000 WebP files. Hero and background assets remain separate 1920x1080 files and must never be reused in these widgets.
