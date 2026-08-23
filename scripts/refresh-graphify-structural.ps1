param(
    [string]$ProjectRoot = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = 'Stop'
$runtime = & (Join-Path $PSScriptRoot 'ensure-graphify-runtime.ps1') -ProjectRoot $ProjectRoot
$env:BARRY_GRAPHIFY_ROOT = $runtime.ProjectRoot
$env:BARRY_GRAPHIFY_COMMIT = (& git -C $runtime.ProjectRoot rev-parse HEAD).Trim()

$pythonCode = @'
import json
import os
from pathlib import Path

from graphify.analyze import god_nodes, surprising_connections, suggest_questions
from graphify.build import build_from_json
from graphify.cluster import cluster, label_communities_by_hub, score_all
from graphify.detect import detect, save_manifest
from graphify.diagnostics import diagnose_extraction, format_diagnostic_report
from graphify.export import to_html, to_json
from graphify.extract import extract
from graphify.report import generate

root = Path(os.environ['BARRY_GRAPHIFY_ROOT']).resolve()
out = root / 'graphify-out'
out.mkdir(parents=True, exist_ok=True)

detection = detect(root)
files = []
for category in ('code', 'document', 'paper', 'image'):
    files.extend(Path(path) for path in detection.get('files', {}).get(category, []))

extraction = extract(files, cache_root=root)
(out / '.graphify_detect.json').write_text(
    json.dumps(detection, ensure_ascii=False), encoding='utf-8'
)
(out / '.graphify_extract.json').write_text(
    json.dumps(extraction, ensure_ascii=False, indent=2), encoding='utf-8'
)

graph = build_from_json(extraction, root=root, directed=False)
if graph.number_of_nodes() == 0:
    raise SystemExit('Graphify structural refresh produced an empty graph.')

communities = cluster(graph)
cohesion = score_all(graph, communities)
labels = label_communities_by_hub(graph, communities)
gods = god_nodes(graph)
surprises = surprising_connections(graph, communities)
questions = suggest_questions(graph, communities, labels)
commit = os.environ.get('BARRY_GRAPHIFY_COMMIT') or None

written = to_json(
    graph,
    communities,
    str(out / 'graph.json'),
    built_at_commit=commit,
    community_labels=labels,
)
if not written:
    raise SystemExit('Graphify refused to replace graph.json because the new graph was smaller.')

report = generate(
    graph,
    communities,
    cohesion,
    labels,
    gods,
    surprises,
    detection,
    {'input': 0, 'output': 0},
    str(root),
    suggested_questions=questions,
    built_at_commit=commit,
)
(out / 'GRAPH_REPORT.md').write_text(report, encoding='utf-8')
(out / '.graphify_labels.json').write_text(
    json.dumps({str(key): value for key, value in labels.items()}, ensure_ascii=False, indent=2),
    encoding='utf-8',
)
to_html(graph, communities, str(out / 'graph.html'), community_labels=labels)

all_files = {
    path for paths in detection.get('files', {}).values() for path in paths
}
save_manifest(
    detection.get('files', {}),
    manifest_path=str(out / 'manifest.json'),
    kind='ast',
    root=root,
    scan_corpus=all_files,
)

health = diagnose_extraction(extraction, directed=False, root=root)
print(format_diagnostic_report(health))
print('Graph health: OK' if not any(health.get(key, 0) for key in (
    'dangling_endpoint_edges',
    'missing_endpoint_edges',
    'self_loop_edges',
    'directed_same_endpoint_collapsed_edges',
    'undirected_same_endpoint_collapsed_edges',
)) else 'GRAPH HEALTH WARNING: review diagnostic counts above.')
print(json.dumps({
    'files': detection.get('total_files', len(files)),
    'words': detection.get('total_words', 0),
    'nodes': graph.number_of_nodes(),
    'edges': graph.number_of_edges(),
    'communities': len(communities),
    'input_tokens': 0,
    'output_tokens': 0,
    'built_at_commit': commit,
}, ensure_ascii=False))
'@

Push-Location $runtime.ProjectRoot
try {
    & $runtime.PythonPath -c $pythonCode
    if ($LASTEXITCODE -ne 0) {
        throw "Graphify structural refresh failed with exit code $LASTEXITCODE."
    }
}
finally {
    Pop-Location
}
