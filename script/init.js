// ═══════════════════════════════════════════════════════════
// INIT — loaded last after all modules
// ═══════════════════════════════════════════════════════════
function init() {
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
