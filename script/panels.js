// ═══════════════════════════════════════════════════════════
// SELECTION & PROPERTIES
// ═══════════════════════════════════════════════════════════
function selectElement(id) {
  selectedIds.clear();
  selectedIds.add(id);
  selectedId = id;
  const el = elements.find(e => e.id === id);
  if (el) {
    document.getElementById('canvasProps').classList.add('hidden');
    document.getElementById('elementProps').classList.remove('hidden');
    const multiPanel = document.getElementById('multiSelectProps');
    if (multiPanel) multiPanel.classList.add('hidden');
    document.getElementById('propX').value = Math.round(el.x);
    document.getElementById('propY').value = Math.round(el.y);
    document.getElementById('propW').value = Math.round(el.w);
    document.getElementById('propH').value = Math.round(el.h);
    document.getElementById('propRotation').value = el.rotation||0;
    document.getElementById('propRotationNum').value = el.rotation||0;
    document.getElementById('propFill').value = el.fill==='transparent'?'#ffffff':el.fill;
    document.getElementById('propFillHex').value = el.fill||'#ffffff';
    document.getElementById('propOpacity').value = el.opacity||100;
    document.getElementById('propBorderColor').value = el.borderColor||'#000000';
    document.getElementById('propBorderColorHex').value = el.borderColor||'#000000';
    document.getElementById('propBorderWidth').value = el.borderWidth||0;
    document.getElementById('propBorderStyle').value = el.borderStyle||'solid';
    document.getElementById('propRadius').value = el.borderRadius||0;
    document.getElementById('propRadiusNum').value = el.borderRadius||0;
    document.getElementById('propShadowX').value = el.shadowX||0;
    document.getElementById('propShadowY').value = el.shadowY||0;
    document.getElementById('propShadowBlur').value = el.shadowBlur||0;
    document.getElementById('propShadowColor').value = el.shadowColor||'#000000';
    document.getElementById('propShadowOpacity').value = el.shadowOpacity||25;
    if (el.type === 'text') {
      document.getElementById('textProps').classList.remove('hidden');
      document.getElementById('propFontFamily').value = el.fontFamily||'DM Sans';
      document.getElementById('propFontSize').value = el.fontSize||24;
      document.getElementById('propFontWeight').value = el.fontWeight||'700';
      document.getElementById('propLineHeight').value = el.lineHeight||1.4;
      document.getElementById('propLetterSpacing').value = el.letterSpacing||0;
      document.getElementById('propTextColor').value = el.textColor||'#000000';
      document.getElementById('propTextColorHex').value = el.textColor||'#000000';
      document.getElementById('btnBold').classList.toggle('active',el.bold);
      document.getElementById('btnItalic').classList.toggle('active',el.italic);
      document.getElementById('btnUnderline').classList.toggle('active',el.underline);
      document.getElementById('btnStrike').classList.toggle('active',el.lineThrough);
    } else {
      document.getElementById('textProps').classList.add('hidden');
    }
  } else { deselectAll(); }
  render();
}

function addToSelection(id) {
  if (selectedIds.has(id)) {
    selectedIds.delete(id);
  } else {
    selectedIds.add(id);
  }
  if (selectedIds.size === 1) {
    selectedId = [...selectedIds][0];
    selectElement(selectedId);
    return;
  }
  if (selectedIds.size === 0) {
    deselectAll();
    return;
  }
  // Multi-select: show multi-select panel
  selectedId = null;
  showMultiSelectPanel();
  render();
}

function selectMultiple(ids) {
  selectedIds = new Set(ids);
  if (selectedIds.size === 1) {
    selectElement([...selectedIds][0]);
    return;
  }
  if (selectedIds.size === 0) {
    deselectAll();
    return;
  }
  selectedId = null;
  showMultiSelectPanel();
  render();
}

function selectAll() {
  if (elements.length === 0) return;
  selectMultiple(elements.map(e => e.id));
}

function showMultiSelectPanel() {
  document.getElementById('canvasProps').classList.add('hidden');
  document.getElementById('elementProps').classList.add('hidden');
  const multiPanel = document.getElementById('multiSelectProps');
  if (multiPanel) {
    multiPanel.classList.remove('hidden');
    const count = document.getElementById('multiSelectCount');
    if (count) count.textContent = `${selectedIds.size} elements selected`;
    // Check if all selected share a groupId
    const selEls = elements.filter(e => selectedIds.has(e.id));
    const allGrouped = selEls.length > 0 && selEls.every(e => e.groupId) &&
      new Set(selEls.map(e => e.groupId)).size === 1;
    const groupBtn = document.getElementById('btnGroupSelected');
    const ungroupBtn = document.getElementById('btnUngroupSelected');
    if (groupBtn) groupBtn.style.display = allGrouped ? 'none' : '';
    if (ungroupBtn) ungroupBtn.style.display = allGrouped ? '' : 'none';
  }
}

function deselectAll() {
  if (isEditing) finishEditing();
  selectedId = null;
  selectedIds.clear();
  document.getElementById('canvasProps').classList.remove('hidden');
  document.getElementById('elementProps').classList.add('hidden');
  const multiPanel = document.getElementById('multiSelectProps');
  if (multiPanel) multiPanel.classList.add('hidden');
  render();
}

function updateProp(prop) {
  const el = elements.find(e => e.id === selectedId); if (!el) return;
  saveState();
  const get = id => document.getElementById(id);
  switch(prop) {
    case 'x': el.x = parseFloat(get('propX').value)||0; break;
    case 'y': el.y = parseFloat(get('propY').value)||0; break;
    case 'w': el.w = Math.max(20,parseFloat(get('propW').value)||20); break;
    case 'h': el.h = Math.max(20,parseFloat(get('propH').value)||20); break;
    case 'rotation': el.rotation = parseFloat(get('propRotation').value)||0; get('propRotationNum').value=el.rotation; break;
    case 'rotationNum': el.rotation = parseFloat(get('propRotationNum').value)||0; get('propRotation').value=el.rotation; break;
    case 'fill': el.fill = get('propFill').value; get('propFillHex').value=el.fill; break;
    case 'fillHex': el.fill = get('propFillHex').value; get('propFill').value=el.fill; break;
    case 'opacity': el.opacity = parseInt(get('propOpacity').value)||100; break;
    case 'borderColor': el.borderColor = get('propBorderColor').value; get('propBorderColorHex').value=el.borderColor; break;
    case 'borderColorHex': el.borderColor = get('propBorderColorHex').value; get('propBorderColor').value=el.borderColor; break;
    case 'borderWidth': el.borderWidth = parseInt(get('propBorderWidth').value)||0; break;
    case 'borderStyle': el.borderStyle = get('propBorderStyle').value; break;
    case 'radius': el.borderRadius = parseInt(get('propRadius').value)||0; get('propRadiusNum').value=el.borderRadius; break;
    case 'radiusNum': el.borderRadius = parseInt(get('propRadiusNum').value)||0; get('propRadius').value=el.borderRadius; break;
    case 'shadow':
      el.shadowX = parseInt(get('propShadowX').value)||0;
      el.shadowY = parseInt(get('propShadowY').value)||0;
      el.shadowBlur = parseInt(get('propShadowBlur').value)||0;
      el.shadowColor = get('propShadowColor').value;
      el.shadowOpacity = parseInt(get('propShadowOpacity').value)||25;
      break;
    case 'shadowX': el.shadowX = parseInt(get('propShadowX').value)||0; break;
    case 'shadowY': el.shadowY = parseInt(get('propShadowY').value)||0; break;
    case 'shadowBlur': el.shadowBlur = parseInt(get('propShadowBlur').value)||0; break;
    case 'shadowColor': el.shadowColor = get('propShadowColor').value; break;
    case 'shadowOpacity': el.shadowOpacity = parseInt(get('propShadowOpacity').value)||25; break;
    case 'fontFamily': el.fontFamily = get('propFontFamily').value; break;
    case 'fontSize': el.fontSize = parseInt(get('propFontSize').value)||24; break;
    case 'fontWeight': el.fontWeight = get('propFontWeight').value; break;
    case 'lineHeight': el.lineHeight = parseFloat(get('propLineHeight').value)||1.4; break;
    case 'letterSpacing': el.letterSpacing = parseFloat(get('propLetterSpacing').value)||0; break;
    case 'textColor': el.textColor = get('propTextColor').value; get('propTextColorHex').value=el.textColor; break;
    case 'textColorHex': el.textColor = get('propTextColorHex').value; get('propTextColor').value=el.textColor; break;
  }
  render();
}

function toggleTextStyle(style) {
  const el = elements.find(e => e.id === selectedId); if (!el) return;
  saveState();
  el[style] = !el[style];
  selectElement(el.id);
}

function setTextAlign(align) {
  const el = elements.find(e => e.id === selectedId); if (!el) return;
  saveState();
  el.textAlign = align;
  render();
}

// ═══════════════════════════════════════════════════════════
// Z-ORDER CONTROLS
// ═══════════════════════════════════════════════════════════
function updateZOrderLabel() {
  const label = document.getElementById('zOrderLabel');
  if (!label) return;
  if (!selectedId) { label.textContent = '—'; return; }
  const idx = elements.findIndex(e => e.id === selectedId);
  label.textContent = idx >= 0 ? `${idx+1} / ${elements.length}` : '—';
}
function zMoveUp() { if(!selectedId)return; saveState(); const i=elements.findIndex(e=>e.id===selectedId); if(i<elements.length-1){[elements[i],elements[i+1]]=[elements[i+1],elements[i]]; render();} }
function zMoveDown() { if(!selectedId)return; saveState(); const i=elements.findIndex(e=>e.id===selectedId); if(i>0){[elements[i],elements[i-1]]=[elements[i-1],elements[i]]; render();} }
function zBringToFront() { if(!selectedId)return; saveState(); const i=elements.findIndex(e=>e.id===selectedId); const el=elements.splice(i,1)[0]; elements.push(el); render(); }
function zSendToBack() { if(!selectedId)return; saveState(); const i=elements.findIndex(e=>e.id===selectedId); const el=elements.splice(i,1)[0]; elements.unshift(el); render(); }

// ═══════════════════════════════════════════════════════════
// LAYERS
// ═══════════════════════════════════════════════════════════
function toggleLayers() { togglePanel('layers'); }

let layerDragId = null;

function updateLayersList() {
  const list = document.getElementById('layersList'); list.innerHTML = '';
  const reversed = [...elements].reverse();
  reversed.forEach((el, visualIdx) => {
    const icon = {text:'T',rect:'■',line:'━',triangle:'△',star:'★',image:'🖼',hexagon:'⬡',pentagon:'⬠',diamond:'◆',arrow:'➜',heart:'♥',cross:'✚',octagon:'⯃',parallelogram:'▱',trapezoid:'⏢',chevron:'›',arrowLeft:'←',speechBubble:'💬',shield:'🛡',semicircle:'◗',lightning:'⚡',ribbon:'🎗',star6:'✡',star8:'✳',rhombus:'◇'}[el.type]||'■';
    const idx = elements.indexOf(el);
    const div = document.createElement('div');
    div.className = 'layer-item flex items-center gap-2 px-2 py-1.5 rounded text-xs'+(selectedIds.has(el.id)?' active':'');
    div.draggable = true;
    div.dataset.elId = el.id;
    div.dataset.visualIdx = visualIdx;

    div.innerHTML = `
      <span class="text-fg-500 shrink-0 cursor-grab" style="font-size:10px;line-height:1;">⠿</span>
      <span class="text-fg-400 w-4 text-center shrink-0 text-[11px]">${icon}</span>
      <span class="flex-1 truncate text-fg-200">${el.name||el.type}</span>
      ${el.groupId ? '<span class="text-[9px] text-fg-accent shrink-0" title="Grouped">⫘</span>' : ''}
      <span class="text-[9px] text-fg-400 font-mono shrink-0">${idx+1}</span>
      <button onclick="event.stopPropagation(); toggleVisibility('${el.id}')" class="text-fg-400 hover:text-fg-200 shrink-0">
        ${el.visible?'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>':'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>'}
      </button>
      <button onclick="event.stopPropagation(); toggleLock('${el.id}')" class="text-fg-400 hover:text-fg-200 shrink-0">
        ${el.locked?'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>':'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>'}
      </button>`;

    div.addEventListener('dragstart', (e) => {
      layerDragId = el.id;
      div.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    });
    div.addEventListener('dragend', () => {
      layerDragId = null;
      div.classList.remove('dragging');
      list.querySelectorAll('.layer-item').forEach(item => {
        item.classList.remove('drag-over-top', 'drag-over-bottom');
      });
    });
    div.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      if (el.id === layerDragId) return;
      const rect = div.getBoundingClientRect();
      const midY = rect.top + rect.height / 2;
      list.querySelectorAll('.layer-item').forEach(item => {
        item.classList.remove('drag-over-top', 'drag-over-bottom');
      });
      if (e.clientY < midY) {
        div.classList.add('drag-over-top');
      } else {
        div.classList.add('drag-over-bottom');
      }
    });
    div.addEventListener('dragleave', () => {
      div.classList.remove('drag-over-top', 'drag-over-bottom');
    });
    div.addEventListener('drop', (e) => {
      e.preventDefault();
      div.classList.remove('drag-over-top', 'drag-over-bottom');
      if (!layerDragId || layerDragId === el.id) return;

      saveState();

      const srcIdx = elements.findIndex(e => e.id === layerDragId);
      if (srcIdx < 0) return;
      const [srcEl] = elements.splice(srcIdx, 1);

      const rect = div.getBoundingClientRect();
      const midY = rect.top + rect.height / 2;
      const dropAbove = e.clientY < midY;

      let targetIdx = elements.indexOf(el);
      if (dropAbove) {
        elements.splice(targetIdx + 1, 0, srcEl);
      } else {
        elements.splice(targetIdx, 0, srcEl);
      }

      layerDragId = null;
      render();
      showToast('Layer reordered');
    });

    div.onclick = (e) => {
      if (e.shiftKey) { addToSelection(el.id); }
      else { selectElement(el.id); }
    };
    list.appendChild(div);
  });
}
function toggleVisibility(id) { const el=elements.find(e=>e.id===id); if(el){el.visible=!el.visible; render();} }
function toggleLock(id) { const el=elements.find(e=>e.id===id); if(el){el.locked=!el.locked; render();} }

function rotateBy(deg) {
  const el = elements.find(e => e.id === selectedId); if (!el) return;
  saveState();
  el.rotation = (((el.rotation || 0) + deg) % 360 + 360) % 360;
  document.getElementById('propRotation').value = Math.round(el.rotation);
  document.getElementById('propRotationNum').value = Math.round(el.rotation);
  render();
}

function rotateTo(deg) {
  const el = elements.find(e => e.id === selectedId); if (!el) return;
  saveState();
  el.rotation = ((deg % 360) + 360) % 360;
  document.getElementById('propRotation').value = Math.round(el.rotation);
  document.getElementById('propRotationNum').value = Math.round(el.rotation);
  render();
}

function alignElement(alignment) {
  if (selectedIds.size > 1) {
    alignMultiSelection(alignment);
    return;
  }
  const el = elements.find(e => e.id === selectedId); if (!el) return;
  saveState();
  const cw = parseInt(document.getElementById('canvasW').value) || 800;
  const ch = parseInt(document.getElementById('canvasH').value) || 600;
  switch (alignment) {
    case 'left': el.x = 0; break;
    case 'centerH': el.x = Math.round((cw - el.w) / 2); break;
    case 'right': el.x = cw - el.w; break;
    case 'top': el.y = 0; break;
    case 'centerV': el.y = Math.round((ch - el.h) / 2); break;
    case 'bottom': el.y = ch - el.h; break;
  }
  selectElement(el.id);
}

function alignMultiSelection(alignment) {
  const selEls = elements.filter(e => selectedIds.has(e.id));
  if (selEls.length < 2) return;
  saveState();
  const bbox = getSelectionBBox();
  selEls.forEach(el => {
    switch (alignment) {
      case 'left': el.x = bbox.x; break;
      case 'centerH': el.x = bbox.x + Math.round((bbox.w - el.w) / 2); break;
      case 'right': el.x = bbox.x + bbox.w - el.w; break;
      case 'top': el.y = bbox.y; break;
      case 'centerV': el.y = bbox.y + Math.round((bbox.h - el.h) / 2); break;
      case 'bottom': el.y = bbox.y + bbox.h - el.h; break;
    }
  });
  render();
}

function getSelectionBBox() {
  const selEls = elements.filter(e => selectedIds.has(e.id));
  if (selEls.length === 0) return { x: 0, y: 0, w: 0, h: 0 };
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  selEls.forEach(el => {
    minX = Math.min(minX, el.x);
    minY = Math.min(minY, el.y);
    maxX = Math.max(maxX, el.x + el.w);
    maxY = Math.max(maxY, el.y + el.h);
  });
  return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
}

// ═══════════════════════════════════════════════════════════
// LEFT PANEL MANAGEMENT
// ═══════════════════════════════════════════════════════════
function openPanel(name) {
  activePanel = name;
  const panel = document.getElementById('leftPanel');
  panel.classList.add('open');
  document.querySelectorAll('.left-panel-content').forEach(p => p.classList.add('hidden'));
  const target = document.getElementById('panel-' + name);
  if (target) target.classList.remove('hidden');
  document.querySelectorAll('.left-sidebar-item').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`.left-sidebar-item[data-panel="${name}"]`);
  if (btn) btn.classList.add('active');
}
function closePanel() {
  activePanel = null;
  const panel = document.getElementById('leftPanel');
  panel.classList.remove('open');
  document.querySelectorAll('.left-sidebar-item').forEach(b => b.classList.remove('active'));
}
function togglePanel(name) {
  if (activePanel === name) closePanel();
  else openPanel(name);
}

// ═══════════════════════════════════════════════════════════
// CONTEXT TOOLBAR (desktop top bar)
// ═══════════════════════════════════════════════════════════
function updateContextToolbar() {
  const ctxCanvas = document.getElementById('ctxCanvas');
  const ctxShape = document.getElementById('ctxShape');
  const ctxText = document.getElementById('ctxText');
  const ctxImage = document.getElementById('ctxImage');
  if (!ctxCanvas) return;

  [ctxCanvas, ctxShape, ctxText, ctxImage].forEach(el => { if(el) el.classList.add('hidden'); });

  if (!selectedId) { ctxCanvas.classList.remove('hidden'); return; }
  const el = elements.find(e => e.id === selectedId);
  if (!el) { ctxCanvas.classList.remove('hidden'); return; }

  if (el.type === 'text') {
    ctxText.classList.remove('hidden');
    const fontSel = document.getElementById('ctxFontFamily');
    if (fontSel && fontSel.value !== el.fontFamily) fontSel.value = el.fontFamily || 'DM Sans';
    const sizeSel = document.getElementById('ctxFontSize');
    if (sizeSel) sizeSel.value = el.fontSize || 24;
    const colorSel = document.getElementById('ctxTextColor');
    if (colorSel) colorSel.value = el.textColor || '#000000';
    document.getElementById('ctxBold')?.classList.toggle('active', !!el.bold);
    document.getElementById('ctxItalic')?.classList.toggle('active', !!el.italic);
    document.getElementById('ctxUnderline')?.classList.toggle('active', !!el.underline);
  } else if (el.type === 'image') {
    ctxImage.classList.remove('hidden');
  } else {
    ctxShape.classList.remove('hidden');
    const fillInput = document.getElementById('ctxFill');
    if (fillInput) fillInput.value = (el.fill && el.fill !== 'transparent') ? el.fill : '#ffffff';
    const opInput = document.getElementById('ctxOpacity');
    if (opInput) opInput.value = el.opacity || 100;
    const addBtn = document.getElementById('ctxAddImage');
    const removeBtn = document.getElementById('ctxRemoveImage');
    if (el.type === 'line') {
      if (addBtn) addBtn.classList.add('hidden');
      if (removeBtn) removeBtn.classList.add('hidden');
    } else if (el.clipImage) {
      if (addBtn) addBtn.classList.add('hidden');
      if (removeBtn) removeBtn.classList.remove('hidden');
    } else {
      if (addBtn) addBtn.classList.remove('hidden');
      if (removeBtn) removeBtn.classList.add('hidden');
    }
  }
}

function ctxUpdateProp(prop, value) {
  const el = elements.find(e => e.id === selectedId); if (!el) return;
  saveState();
  switch(prop) {
    case 'fill': el.fill = value; break;
    case 'opacity': el.opacity = parseInt(value) || 100; break;
    case 'fontFamily': el.fontFamily = value; break;
    case 'fontSize': el.fontSize = parseInt(value) || 24; break;
    case 'textColor': el.textColor = value; break;
  }
  selectElement(el.id);
}

function ctxToggleTextStyle(s) {
  const el = elements.find(e => e.id === selectedId); if (!el || el.type !== 'text') return;
  saveState(); el[s] = !el[s]; selectElement(el.id);
}

function ctxSetTextAlign(a) {
  const el = elements.find(e => e.id === selectedId); if (!el || el.type !== 'text') return;
  saveState(); el.textAlign = a; render();
}

function addClipImageSelected() { if (selectedId) addClipImage(selectedId); }
function removeClipImageSelected() { if (selectedId) removeClipImage(selectedId); }

function flipH() {
  const el = elements.find(e => e.id === selectedId); if (!el) return;
  saveState(); el.flipH = !el.flipH; render();
}
function flipV() {
  const el = elements.find(e => e.id === selectedId); if (!el) return;
  saveState(); el.flipV = !el.flipV; render();
}

// ═══════════════════════════════════════════════════════════
// IMAGE EDIT / FILTERS
// ═══════════════════════════════════════════════════════════
function openImageEdit() {
  const el = elements.find(e => e.id === selectedId);
  if (!el || el.type !== 'image') return;
  openPanel('imageEdit');
  populateFilterSliders(el);
}

function populateFilterSliders(el) {
  const filters = [
    { prop: 'filterBrightness', label: 'Brightness', min: 0, max: 200, def: 100 },
    { prop: 'filterContrast', label: 'Contrast', min: 0, max: 200, def: 100 },
    { prop: 'filterSaturation', label: 'Saturation', min: 0, max: 200, def: 100 },
    { prop: 'filterBlur', label: 'Blur', min: 0, max: 20, def: 0 },
    { prop: 'filterHueRotate', label: 'Hue Rotate', min: 0, max: 360, def: 0 },
    { prop: 'filterGrayscale', label: 'Grayscale', min: 0, max: 100, def: 0 },
    { prop: 'filterSepia', label: 'Sepia', min: 0, max: 100, def: 0 },
    { prop: 'filterWarmth', label: 'Warmth', min: 0, max: 100, def: 0 },
    { prop: 'filterVignette', label: 'Vignette', min: 0, max: 100, def: 0 },
  ];
  const container = document.getElementById('filterSliders');
  if (!container) return;
  container.innerHTML = filters.map(f => `
    <div class="filter-slider-row">
      <label class="filter-label">${f.label}</label>
      <input type="range" min="${f.min}" max="${f.max}" value="${el[f.prop] ?? f.def}"
        class="filter-range" oninput="updateFilter('${f.prop}', this.value, this)" />
      <span class="filter-value" id="fv-${f.prop}">${el[f.prop] ?? f.def}</span>
    </div>
  `).join('');
}

function updateFilter(prop, value, input) {
  const el = elements.find(e => e.id === selectedId); if (!el) return;
  saveState();
  el[prop] = parseFloat(value);
  const display = document.getElementById('fv-' + prop);
  if (display) display.textContent = value;
  render();
}

function resetFilters() {
  const el = elements.find(e => e.id === selectedId); if (!el) return;
  saveState();
  el.filterBrightness = 100; el.filterContrast = 100; el.filterSaturation = 100;
  el.filterBlur = 0; el.filterHueRotate = 0; el.filterGrayscale = 0;
  el.filterSepia = 0; el.filterWarmth = 0; el.filterVignette = 0;
  populateFilterSliders(el); render();
}

// ═══════════════════════════════════════════════════════════
// CLIP IMAGE
// ═══════════════════════════════════════════════════════════
function addClipImage(id) {
  const input = document.createElement('input');
  input.type = 'file'; input.accept = 'image/*';
  input.onchange = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = function(ev) {
      const el = elements.find(e => e.id === id);
      if (!el) return;
      saveState();
      el.clipImage = ev.target.result;
      render();
      showToast('Image added to shape');
    };
    reader.readAsDataURL(file);
  };
  input.click();
}
function removeClipImage(id) {
  const el = elements.find(e => e.id === id); if (!el) return;
  saveState(); el.clipImage = null; render();
  showToast('Image removed from shape');
}

// ═══════════════════════════════════════════════════════════
// PRESET MODAL
// ═══════════════════════════════════════════════════════════
function buildPresetModal() {
  const container = document.getElementById('presetCategories');
  let html = '';
  for (const [category, presets] of Object.entries(PRESETS)) {
    const colors = { Instagram: '#E1306C', Facebook: '#1877F2', YouTube: '#FF0000', 'Twitter / X': '#1DA1F2', LinkedIn: '#0A66C2', TikTok: '#00f2ea', Pinterest: '#E60023', 'Print & Other': '#6c5ce7' };
    const catColor = colors[category] || '#6c5ce7';
    html += `<div class="mb-4">
      <div class="flex items-center gap-2 mb-2">
        <div class="w-2 h-2 rounded-full" style="background:${catColor}"></div>
        <h3 class="text-xs font-semibold text-fg-200">${category}</h3>
      </div>
      <div class="grid grid-cols-4 gap-2">`;
    for (const p of presets) {
      const aspect = p.w / p.h;
      let thumbW, thumbH;
      const maxT = 48;
      if (aspect >= 1) { thumbW = maxT; thumbH = Math.round(maxT / aspect); }
      else { thumbH = maxT; thumbW = Math.round(maxT * aspect); }
      html += `<div class="preset-card" onclick="applyPreset(${p.w}, ${p.h}, '${category} — ${p.name}')">
        <div class="preset-thumb" style="height:60px">
          <div class="preset-thumb-inner" style="width:${thumbW}px;height:${thumbH}px;"></div>
        </div>
        <div class="text-[11px] text-fg-200 font-medium truncate">${p.name}</div>
        <div class="text-[10px] text-fg-400 font-mono">${p.w}×${p.h}</div>
      </div>`;
    }
    html += `</div></div>`;
  }
  container.innerHTML = html;
}

function buildQuickPresets() {
  const quick = [
    { label: "IG Post", w: 1080, h: 1080, color: "#E1306C" },
    { label: "IG Story", w: 1080, h: 1920, color: "#E1306C" },
    { label: "FB Post", w: 1200, h: 630, color: "#1877F2" },
    { label: "YT Thumb", w: 1280, h: 720, color: "#FF0000" },
    { label: "X Post", w: 1600, h: 900, color: "#1DA1F2" },
    { label: "Pinterest", w: 1000, h: 1500, color: "#E60023" },
    { label: "Slides 16:9", w: 1920, h: 1080, color: "#6c5ce7" },
    { label: "LinkedIn", w: 1200, h: 627, color: "#0A66C2" },
  ];
  const container = document.getElementById('quickPresets');
  container.innerHTML = quick.map(p => `
    <button onclick="applyPreset(${p.w}, ${p.h}, '${p.label}')" class="flex items-center gap-1.5 text-[11px] bg-fg-700 hover:bg-fg-600 border border-fg-600 hover:border-fg-500 rounded-lg py-1.5 px-2 text-fg-200 transition-all text-left">
      <span class="w-1.5 h-1.5 rounded-full shrink-0" style="background:${p.color}"></span>
      <span class="truncate">${p.label}</span>
    </button>
  `).join('');
}

function showPresetModal() { document.getElementById('presetModal').classList.remove('hidden'); }
function closePresetModal() { document.getElementById('presetModal').classList.add('hidden'); }

function applyPreset(w, h, label) {
  document.getElementById('canvasW').value = w;
  document.getElementById('canvasH').value = h;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  canvas.style.background = '#FFFFFF';
  document.getElementById('currentPresetLabel').textContent = label || `${w} × ${h}`;
  const label2 = document.getElementById('currentPresetLabel2');
  if (label2) label2.textContent = `${w} × ${h}`;
  closePresetModal();
  centerCanvas();
  render();
  showToast(`Canvas set to ${w}×${h}`);
}

function applyCustomSize() {
  const w = parseInt(document.getElementById('customW').value) || 800;
  const h = parseInt(document.getElementById('customH').value) || 600;
  applyPreset(w, h, `${w} × ${h}`);
}

// ═══════════════════════════════════════════════════════════
// TEMPLATES
// ═══════════════════════════════════════════════════════════
function switchPresetTab(tab) {
  document.getElementById('presetViewTemplates').classList.toggle('hidden', tab !== 'templates');
  document.getElementById('presetViewSizes').classList.toggle('hidden', tab !== 'sizes');
  document.getElementById('presetTabTemplates').classList.toggle('active', tab === 'templates');
  document.getElementById('presetTabSizes').classList.toggle('active', tab === 'sizes');
}

function buildTemplateGrid() {
  const container = document.getElementById('templateCategories');
  if (!container) return;
  const groups = {};
  TEMPLATES.forEach(tpl => {
    if (!groups[tpl.category]) groups[tpl.category] = [];
    groups[tpl.category].push(tpl);
  });
  const catColors = {
    'Social Media': '#E1306C', 'Business': '#0A66C2', 'Marketing': '#00b894',
    'Personal': '#6c5ce7', 'Presentation': '#fdcb6e', 'Print': '#e17055',
    'Instagram Reels': '#E1306C'
  };
  let html = '';
  for (const [category, templates] of Object.entries(groups)) {
    const catColor = catColors[category] || '#6c5ce7';
    html += `<div class="mb-5">
      <div class="flex items-center gap-2 mb-2">
        <div class="w-2 h-2 rounded-full" style="background:${catColor}"></div>
        <h3 class="text-xs font-semibold text-fg-200">${category}</h3>
      </div>
      <div class="grid grid-cols-3 gap-3">`;
    for (const tpl of templates) {
      html += buildTemplateCard(tpl);
    }
    html += `</div></div>`;
  }
  container.innerHTML = html;
  // Also populate the sidebar templates panel (2 cols — narrower width)
  const sidebarGrid = document.getElementById('templatePanelGrid');
  if (sidebarGrid) sidebarGrid.innerHTML = html.replace(/grid-cols-3/g, 'grid-cols-2');
}

function buildTemplateCard(tpl) {
  const aspect = tpl.canvasW / tpl.canvasH;
  const previewW = 160;
  const previewH = Math.round(previewW / aspect);
  const maxH = 100;
  const scale = previewH > maxH ? maxH / previewH : 1;
  const finalW = Math.round(previewW * scale);
  const finalH = Math.round(previewH * scale);
  const sx = finalW / tpl.canvasW;
  const sy = finalH / tpl.canvasH;

  let previewEls = '';
  tpl.elements.forEach(el => {
    const px = Math.round(el.x * sx);
    const py = Math.round(el.y * sy);
    const pw = Math.max(1, Math.round(el.w * sx));
    const ph = Math.max(1, Math.round(el.h * sy));
    const opacity = (el.opacity != null ? el.opacity / 100 : 1) * 0.85;
    if (el.type === 'text') {
      const lineH = Math.max(1, Math.round(el.fontSize * sy * 0.5));
      const color = el.textColor || '#333';
      previewEls += `<div style="position:absolute;left:${px}px;top:${py}px;width:${pw}px;height:${lineH}px;background:${color};border-radius:1px;opacity:${opacity * 0.7}"></div>`;
    } else {
      const color = el.fill || '#ddd';
      if (color === 'transparent' && !el.borderWidth) return;
      const br = el.borderRadius ? (el.borderRadius >= 9999 ? '50%' : Math.round(el.borderRadius * sx) + 'px') : '0';
      const border = el.borderWidth ? `${Math.max(1, Math.round(el.borderWidth * sx))}px solid ${el.borderColor || '#000'}` : 'none';
      previewEls += `<div style="position:absolute;left:${px}px;top:${py}px;width:${pw}px;height:${ph}px;background:${color === 'transparent' ? 'transparent' : color};border:${border};border-radius:${br};opacity:${opacity}"></div>`;
    }
  });

  return `<div class="template-card" onclick="applyTemplate('${tpl.id}')">
    <div class="template-preview">
      <div style="position:relative;width:${finalW}px;height:${finalH}px;background:${tpl.bgColor || '#fff'};border-radius:3px;overflow:hidden;margin:0 auto;box-shadow:0 1px 4px rgba(0,0,0,0.25);">
        ${previewEls}
      </div>
    </div>
    <div class="text-[11px] text-fg-200 font-medium truncate mt-2">${tpl.name}</div>
    <div class="text-[10px] text-fg-400 font-mono">${tpl.canvasW}×${tpl.canvasH}</div>
  </div>`;
}

function applyTemplate(templateId) {
  const tpl = TEMPLATES.find(t => t.id === templateId);
  if (!tpl) return;
  saveState();
  elements = [];
  selectedId = null;
  idCounter = 0;

  document.getElementById('canvasW').value = tpl.canvasW;
  document.getElementById('canvasH').value = tpl.canvasH;
  canvas.style.width = tpl.canvasW + 'px';
  canvas.style.height = tpl.canvasH + 'px';
  canvas.style.background = tpl.bgColor || '#FFFFFF';

  tpl.elements.forEach(elDef => {
    const isText = elDef.type === 'text';
    const el = {
      ...baseProps(),
      ...(isText ? {
        text: '', fill: 'transparent', fontFamily: 'DM Sans',
        fontSize: 24, fontWeight: '400', textColor: '#000000',
        textAlign: 'left', lineHeight: 1.4, letterSpacing: 0,
        bold: false, italic: false, underline: false, lineThrough: false
      } : {}),
      ...elDef,
      id: createId(),
    };
    elements.push(el);
  });

  document.getElementById('currentPresetLabel').textContent = tpl.name;
  const label2 = document.getElementById('currentPresetLabel2');
  if (label2) label2.textContent = `${tpl.canvasW} × ${tpl.canvasH}`;
  document.getElementById('docTitle').value = tpl.name;

  closePresetModal();
  closePanel();
  if (typeof mobileCloseSheet === 'function') mobileCloseSheet();
  deselectAll();
  centerCanvas();
  render();
  showToast(`Template "${tpl.name}" applied`);
}

// ═══════════════════════════════════════════════════════════
// FONT DROPDOWN BUILDER
// ═══════════════════════════════════════════════════════════
function buildFontDropdown(selectId) {
  const sel = document.getElementById(selectId); if (!sel) return;
  sel.innerHTML = '';
  for (const [cat, fonts] of Object.entries(FONT_LIST)) {
    const group = document.createElement('optgroup');
    group.label = cat;
    fonts.forEach(f => {
      const opt = document.createElement('option');
      opt.value = f; opt.textContent = f; opt.style.fontFamily = `'${f}', sans-serif`;
      group.appendChild(opt);
    });
    sel.appendChild(group);
  }
}

let desktopFontCategory = 'All';

function buildFontPreviewList() {
  // Font combos
  const combos = [
    { heading: 'Playfair Display', body: 'DM Sans', label: 'Classic Elegant' },
    { heading: 'Bebas Neue', body: 'Open Sans', label: 'Bold Modern' },
    { heading: 'Poppins', body: 'Inter', label: 'Clean Minimal' },
    { heading: 'Lobster', body: 'Quicksand', label: 'Fun Playful' },
    { heading: 'Montserrat', body: 'Merriweather', label: 'Professional' },
  ];
  const comboContainer = document.getElementById('fontCombosDesktop');
  if (comboContainer) {
    comboContainer.innerHTML = combos.map(c => `
      <div class="font-combo-card" onclick="addTextCombo('${c.heading}','${c.body}'); closePanel()">
        <div style="font-family:'${c.heading}',sans-serif;font-size:15px;font-weight:700;color:#e0e0f0;margin-bottom:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">Heading</div>
        <div style="font-family:'${c.body}',sans-serif;font-size:11px;color:#7a7a9a;margin-bottom:6px;">Body text preview</div>
        <div style="font-size:9px;color:#6c5ce7;font-weight:500;">${c.label}</div>
      </div>
    `).join('');
  }

  // Category tabs
  const tabContainer = document.getElementById('fontCategoryTabs');
  if (tabContainer) {
    const categories = ['All', ...Object.keys(FONT_LIST)];
    tabContainer.innerHTML = categories.map(cat =>
      `<button onclick="setDesktopFontCategory('${cat}')" class="font-cat-tab${desktopFontCategory === cat ? ' active' : ''}">${cat}</button>`
    ).join('');
  }

  // Font list
  const container = document.querySelector('.font-preview-list');
  if (!container) return;
  const fontsToShow = desktopFontCategory === 'All' ? ALL_FONTS : (FONT_LIST[desktopFontCategory] || ALL_FONTS);
  container.innerHTML = fontsToShow.map(f =>
    `<div class="font-preview-item" style="font-family:'${f}',sans-serif" onclick="addTextWithFont('${f}')">${f}</div>`
  ).join('');
}

function setDesktopFontCategory(cat) {
  desktopFontCategory = cat;
  buildFontPreviewList();
}
