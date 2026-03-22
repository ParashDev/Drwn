// ═══════════════════════════════════════════════════════════
// INIT — loaded last after all modules
// ═══════════════════════════════════════════════════════════
function createExtraShapeClipDefs() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '0');
  svg.setAttribute('height', '0');
  svg.style.position = 'absolute';
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  for (const [name, shape] of Object.entries(EXTRA_SHAPES)) {
    if (!shape.path) continue;
    const cp = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
    cp.id = `clip-${name}`;
    cp.setAttribute('clipPathUnits', 'objectBoundingBox');
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('d', shape.path);
    p.setAttribute('transform', 'scale(0.01)');
    if (shape.fillRule) p.setAttribute('clip-rule', shape.fillRule);
    cp.appendChild(p);
    defs.appendChild(cp);
  }
  svg.appendChild(defs);
  document.body.appendChild(svg);
}

function init() {
  createExtraShapeClipDefs();
  buildPresetModal();
  buildTemplateGrid();
  buildQuickPresets();
  buildFontDropdown('propFontFamily');
  buildFontDropdown('ctxFontFamily');
  buildFontPreviewList();
  centerCanvas();
  updateLayersList();
  render();
  initMobile();
}
init();
