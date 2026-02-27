// ═══════════════════════════════════════════════════════════
// CANVAS TRANSFORM & ZOOM
// ═══════════════════════════════════════════════════════════
function centerCanvas() {
  const area = canvasArea.getBoundingClientRect();
  const cw = parseInt(document.getElementById('canvasW').value);
  const ch = parseInt(document.getElementById('canvasH').value);
  const padX = 60, padY = 60;
  const fitZoom = Math.min((area.width - padX) / cw, (area.height - padY) / ch, 1);
  zoom = Math.max(0.05, fitZoom);
  panX = (area.width - cw * zoom) / 2;
  panY = (area.height - ch * zoom) / 2;
  updateCanvasTransform();
}

function updateCanvasTransform() {
  canvasWrapper.style.transform = `translate(${panX}px, ${panY}px) scale(${zoom})`;
  document.getElementById('zoomLevel').textContent = Math.round(zoom * 100) + '%';
}

function zoomIn() {
  const area = canvasArea.getBoundingClientRect();
  const oldZoom = zoom;
  zoom = Math.min(5, zoom * 1.2);
  const cx = area.width / 2, cy = area.height / 2;
  panX = cx - (cx - panX) * (zoom / oldZoom);
  panY = cy - (cy - panY) * (zoom / oldZoom);
  updateCanvasTransform();
}
function zoomOut() {
  const area = canvasArea.getBoundingClientRect();
  const oldZoom = zoom;
  zoom = Math.max(0.05, zoom / 1.2);
  const cx = area.width / 2, cy = area.height / 2;
  panX = cx - (cx - panX) * (zoom / oldZoom);
  panY = cy - (cy - panY) * (zoom / oldZoom);
  updateCanvasTransform();
}
function resetZoom() { zoom = 1; centerCanvas(); }

// ═══════════════════════════════════════════════════════════
// CANVAS RESIZE & BACKGROUND
// ═══════════════════════════════════════════════════════════
function resizeCanvas() {
  const w = document.getElementById('canvasW').value;
  const h = document.getElementById('canvasH').value;
  canvas.style.width = w+'px';
  canvas.style.height = h+'px';
  document.getElementById('currentPresetLabel').textContent = w+' × '+h;
  const label2 = document.getElementById('currentPresetLabel2');
  if (label2) label2.textContent = w+' × '+h;
  centerCanvas();
}
function setCanvasBg() { const c=document.getElementById('canvasBg').value; canvas.style.backgroundColor=c; document.getElementById('canvasBgHex').value=c; }
function setCanvasBgHex() { const c=document.getElementById('canvasBgHex').value; canvas.style.backgroundColor=c; document.getElementById('canvasBg').value=c; }

// ═══════════════════════════════════════════════════════════
// TOOLS
// ═══════════════════════════════════════════════════════════
function setTool(tool) {
  currentTool = tool;
  document.querySelectorAll('[data-tool]').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`[data-tool="${tool}"]`);
  if (btn) btn.classList.add('active');
  canvasArea.style.cursor = tool === 'hand' ? 'grab' : 'default';
}

// ═══════════════════════════════════════════════════════════
// MOUSE EVENTS
// ═══════════════════════════════════════════════════════════
canvasArea.addEventListener('mousedown', (e) => {
  if (isMobile()) return;
  hideContextMenu();
  if (currentTool === 'hand' || e.button === 1) {
    isPanning = true; panStartX = e.clientX; panStartY = e.clientY; panStartPX = panX; panStartPY = panY;
    canvasArea.style.cursor = 'grabbing'; e.preventDefault(); return;
  }
  if (currentTool !== 'select') return;
  const target = e.target;

  // Rotate handle (single select only)
  if (target.dataset.rotate) {
    const el = elements.find(e => e.id === selectedId); if (!el) return;
    isRotating = true;
    const rect = target.closest('.canvas-element').getBoundingClientRect();
    rotateStartAngle = Math.atan2(e.clientY - (rect.top+rect.height/2), e.clientX - (rect.left+rect.width/2)) * 180/Math.PI - (el.rotation||0);
    return;
  }

  // Bbox resize handle (multi-select)
  if (target.dataset.bboxHandle) {
    isBboxResizing = true;
    bboxResizeHandle = target.dataset.bboxHandle;
    resizeStartX = e.clientX;
    resizeStartY = e.clientY;
    bboxOrigRect = getSelectionBBox();
    bboxOriginals = elements.filter(el => selectedIds.has(el.id)).map(el => ({
      id: el.id, x: el.x, y: el.y, w: el.w, h: el.h, fontSize: el.fontSize || 0, type: el.type
    }));
    saveState();
    return;
  }

  // Single element resize handle
  if (target.dataset.handle) {
    const el = elements.find(e => e.id === selectedId); if (!el || el.locked) return;
    isResizing = true; resizeHandle = target.dataset.handle;
    resizeStartX = e.clientX; resizeStartY = e.clientY;
    resizeStartW = el.w; resizeStartH = el.h; resizeStartEX = el.x; resizeStartEY = el.y;
    resizeStartRot = (el.rotation || 0) * Math.PI / 180;
    resizeStartFontSize = el.fontSize || 0;
    return;
  }

  const elDiv = target.closest('.canvas-element');
  if (elDiv) {
    const id = elDiv.dataset.id;
    const el = elements.find(e => e.id === id);
    if (el && el.locked) { selectElement(id); return; }

    // Shift+Click: toggle in selection
    if (e.shiftKey) {
      addToSelection(id);
      return;
    }

    // Click on grouped element: select all in group
    if (el && el.groupId && !selectedIds.has(id)) {
      const groupEls = elements.filter(e => e.groupId === el.groupId);
      selectMultiple(groupEls.map(e => e.id));
      // Start multi-drag
      isDragging = true;
      const canvasRect = canvas.getBoundingClientRect();
      const mx = (e.clientX - canvasRect.left) / zoom;
      const my = (e.clientY - canvasRect.top) / zoom;
      multiDragOffsets = elements.filter(el => selectedIds.has(el.id)).map(el => ({
        id: el.id, offX: mx - el.x, offY: my - el.y
      }));
      saveState();
      return;
    }

    // Click on element already in multi-selection: start multi-drag
    if (selectedIds.has(id) && selectedIds.size > 1) {
      isDragging = true;
      const canvasRect = canvas.getBoundingClientRect();
      const mx = (e.clientX - canvasRect.left) / zoom;
      const my = (e.clientY - canvasRect.top) / zoom;
      multiDragOffsets = elements.filter(el => selectedIds.has(el.id)).map(el => ({
        id: el.id, offX: mx - el.x, offY: my - el.y
      }));
      saveState();
      return;
    }

    // Regular click: single select
    if (!selectedIds.has(id)) selectElement(id);
    isDragging = true;
    multiDragOffsets = [];
    const canvasRect = canvas.getBoundingClientRect();
    dragOffsetX = (e.clientX - canvasRect.left)/zoom - el.x;
    dragOffsetY = (e.clientY - canvasRect.top)/zoom - el.y;
    saveState();
    return;
  }

  // Click on empty canvas: start marquee or deselect
  if (e.shiftKey) {
    // Start marquee selection
    const canvasRect = canvas.getBoundingClientRect();
    const mx = (e.clientX - canvasRect.left) / zoom;
    const my = (e.clientY - canvasRect.top) / zoom;
    isMarquee = true;
    marqueeStart = { x: mx, y: my };
    marqueeEnd = { x: mx, y: my };
    return;
  }
  // Start marquee from empty space
  const canvasRect = canvas.getBoundingClientRect();
  const mx = (e.clientX - canvasRect.left) / zoom;
  const my = (e.clientY - canvasRect.top) / zoom;
  // Check if click is inside the canvas bounds
  const cw = parseInt(document.getElementById('canvasW').value) || 800;
  const ch = parseInt(document.getElementById('canvasH').value) || 600;
  if (mx >= 0 && my >= 0 && mx <= cw && my <= ch) {
    isMarquee = true;
    marqueeStart = { x: mx, y: my };
    marqueeEnd = { x: mx, y: my };
    deselectAll();
  } else {
    deselectAll();
  }
});

canvasArea.addEventListener('mousemove', (e) => {
  if (isMobile()) return;
  if (isPanning) { panX = panStartPX + (e.clientX - panStartX); panY = panStartPY + (e.clientY - panStartY); updateCanvasTransform(); return; }
  if (isRotating && selectedId) {
    const el = elements.find(e => e.id === selectedId); if (!el) return;
    const elDiv = canvas.querySelector(`[data-id="${selectedId}"]`); const rect = elDiv.getBoundingClientRect();
    let angle = Math.atan2(e.clientY-(rect.top+rect.height/2), e.clientX-(rect.left+rect.width/2))*180/Math.PI - rotateStartAngle;
    if (e.shiftKey) angle = Math.round(angle/15)*15;
    el.rotation = ((angle%360)+360)%360;
    document.getElementById('propRotation').value = Math.round(el.rotation);
    document.getElementById('propRotationNum').value = Math.round(el.rotation);
    render(); return;
  }
  // Bounding box resize (multi-select)
  if (isBboxResizing && bboxOrigRect) {
    const dx = (e.clientX - resizeStartX) / zoom;
    const dy = (e.clientY - resizeStartY) / zoom;
    const h = bboxResizeHandle;
    let newX = bboxOrigRect.x, newY = bboxOrigRect.y;
    let newW = bboxOrigRect.w, newH = bboxOrigRect.h;
    if (h.includes('r')) newW = Math.max(20, bboxOrigRect.w + dx);
    if (h.includes('l')) { newW = Math.max(20, bboxOrigRect.w - dx); newX = bboxOrigRect.x + (bboxOrigRect.w - newW); }
    if (h.includes('b')) newH = Math.max(20, bboxOrigRect.h + dy);
    if (h.includes('t')) { newH = Math.max(20, bboxOrigRect.h - dy); newY = bboxOrigRect.y + (bboxOrigRect.h - newH); }
    const sx = newW / bboxOrigRect.w;
    const sy = newH / bboxOrigRect.h;
    bboxOriginals.forEach(orig => {
      const el = elements.find(e => e.id === orig.id);
      if (!el) return;
      el.x = Math.round(newX + (orig.x - bboxOrigRect.x) * sx);
      el.y = Math.round(newY + (orig.y - bboxOrigRect.y) * sy);
      el.w = Math.max(5, Math.round(orig.w * sx));
      el.h = Math.max(5, Math.round(orig.h * sy));
      if (orig.type === 'text' && orig.fontSize) {
        el.fontSize = Math.max(8, Math.round(orig.fontSize * sy));
      }
    });
    render(); return;
  }
  if (isResizing && selectedId) {
    const el = elements.find(e => e.id === selectedId); if (!el) return;
    const rawDx = (e.clientX - resizeStartX)/zoom; const rawDy = (e.clientY - resizeStartY)/zoom;
    // Rotate mouse delta into element's local coordinate space
    const cos = Math.cos(-resizeStartRot), sin = Math.sin(-resizeStartRot);
    const dx = rawDx * cos - rawDy * sin;
    const dy = rawDx * sin + rawDy * cos;
    const h = resizeHandle;
    let nW = resizeStartW, nH = resizeStartH, nX = resizeStartEX, nY = resizeStartEY;
    if(h.includes('r')) nW = Math.max(20, resizeStartW+dx);
    if(h.includes('l')) { nW = Math.max(20, resizeStartW-dx); nX = resizeStartEX+(resizeStartW-nW); }
    if(h.includes('b')) nH = Math.max(20, resizeStartH+dy);
    if(h.includes('t')) { nH = Math.max(20, resizeStartH-dy); nY = resizeStartEY+(resizeStartH-nH); }
    // Text corner handles: always lock aspect ratio for clean font scaling
    if (el.type === 'text' && 'tl tr bl br'.includes(h)) {
      const ratio = resizeStartW/resizeStartH;
      if(Math.abs(dx)>Math.abs(dy)) { nH=nW/ratio; if(h.includes('t'))nY=resizeStartEY+resizeStartH-nH; }
      else { nW=nH*ratio; if(h.includes('l'))nX=resizeStartEX+resizeStartW-nW; }
    } else if(e.shiftKey && 'tl tr bl br'.includes(h)) {
      const ratio = resizeStartW/resizeStartH;
      if(Math.abs(dx)>Math.abs(dy)) { nH=nW/ratio; if(h.includes('t'))nY=resizeStartEY+resizeStartH-nH; }
      else { nW=nH*ratio; if(h.includes('l'))nX=resizeStartEX+resizeStartW-nW; }
    }
    el.w=Math.round(nW); el.h=Math.round(nH); el.x=Math.round(nX); el.y=Math.round(nY);
    // Corner handles on text: scale font proportionally
    if (el.type === 'text' && resizeStartFontSize && 'tl tr bl br'.includes(h)) {
      el.fontSize = Math.max(8, Math.round(resizeStartFontSize * (nH / resizeStartH)));
      document.getElementById('propFontSize').value = el.fontSize;
    }
    document.getElementById('propX').value=el.x; document.getElementById('propY').value=el.y;
    document.getElementById('propW').value=el.w; document.getElementById('propH').value=el.h;
    render(); return;
  }
  // Marquee selection
  if (isMarquee) {
    const canvasRect = canvas.getBoundingClientRect();
    marqueeEnd = {
      x: (e.clientX - canvasRect.left) / zoom,
      y: (e.clientY - canvasRect.top) / zoom
    };
    render(); return;
  }
  // Multi-drag
  if (isDragging && multiDragOffsets.length > 0) {
    const canvasRect = canvas.getBoundingClientRect();
    const mx = (e.clientX - canvasRect.left) / zoom;
    const my = (e.clientY - canvasRect.top) / zoom;
    multiDragOffsets.forEach(off => {
      const el = elements.find(e => e.id === off.id);
      if (!el || el.locked) return;
      el.x = Math.round(mx - off.offX);
      el.y = Math.round(my - off.offY);
    });
    render(); return;
  }
  // Single drag
  if (isDragging && selectedId) {
    const el = elements.find(e => e.id === selectedId); if (!el) return;
    const canvasRect = canvas.getBoundingClientRect();
    let nX = (e.clientX-canvasRect.left)/zoom - dragOffsetX;
    let nY = (e.clientY-canvasRect.top)/zoom - dragOffsetY;
    const cw = parseInt(document.getElementById('canvasW').value);
    const ch = parseInt(document.getElementById('canvasH').value);
    if (!e.altKey) {
      const snap = 12 / zoom; // consistent feel at any zoom
      let snappedX = false, snappedY = false;
      const elCx = nX + el.w/2, elCy = nY + el.h/2;
      const elR = nX + el.w, elB = nY + el.h;
      // Guide snapping: element center, left edge, and right edge to 25%/50%/75%
      [0.25, 0.5, 0.75].forEach(pct => {
        const gx = cw * pct, gy = ch * pct;
        if (!snappedX) {
          if (Math.abs(elCx - gx) < snap)    { nX = gx - el.w/2; snappedX = true; }
          else if (Math.abs(nX - gx) < snap)  { nX = gx; snappedX = true; }
          else if (Math.abs(elR - gx) < snap)  { nX = gx - el.w; snappedX = true; }
        }
        if (!snappedY) {
          if (Math.abs(elCy - gy) < snap)    { nY = gy - el.h/2; snappedY = true; }
          else if (Math.abs(nY - gy) < snap)  { nY = gy; snappedY = true; }
          else if (Math.abs(elB - gy) < snap)  { nY = gy - el.h; snappedY = true; }
        }
      });
      // Edge snapping: element edges to canvas edges
      if (!snappedX && Math.abs(nX) < snap)       { nX = 0; snappedX = true; }
      if (!snappedY && Math.abs(nY) < snap)       { nY = 0; snappedY = true; }
      if (!snappedX && Math.abs(elR - cw) < snap) { nX = cw - el.w; snappedX = true; }
      if (!snappedY && Math.abs(elB - ch) < snap) { nY = ch - el.h; snappedY = true; }
    }
    el.x = Math.round(nX); el.y = Math.round(nY);
    document.getElementById('propX').value=el.x; document.getElementById('propY').value=el.y;
    // Snap highlight on guide lines
    const ex = el.x, ey = el.y, ecx = el.x + el.w/2, ecy = el.y + el.h/2, erx = el.x + el.w, eby = el.y + el.h;
    ['v25','v','v75'].forEach((s, i) => {
      const gx = Math.round(cw * [0.25, 0.5, 0.75][i]);
      const g = canvas.querySelector('.center-guide-' + s);
      if (g) g.classList.toggle('snapped', Math.round(ecx)===gx || Math.round(ex)===gx || Math.round(erx)===gx);
    });
    ['h25','h','h75'].forEach((s, i) => {
      const gy = Math.round(ch * [0.25, 0.5, 0.75][i]);
      const g = canvas.querySelector('.center-guide-' + s);
      if (g) g.classList.toggle('snapped', Math.round(ecy)===gy || Math.round(ey)===gy || Math.round(eby)===gy);
    });
    render();
  }
});

canvasArea.addEventListener('mouseup', () => {
  if (isMobile()) return;
  // End marquee: select intersecting elements
  if (isMarquee) {
    const mx = Math.min(marqueeStart.x, marqueeEnd.x);
    const my = Math.min(marqueeStart.y, marqueeEnd.y);
    const mw = Math.abs(marqueeEnd.x - marqueeStart.x);
    const mh = Math.abs(marqueeEnd.y - marqueeStart.y);
    if (mw > 3 || mh > 3) {
      const hitIds = elements.filter(el => el.visible &&
        el.x + el.w > mx && el.x < mx + mw &&
        el.y + el.h > my && el.y < my + mh
      ).map(el => el.id);
      if (hitIds.length > 0) selectMultiple(hitIds);
    }
    isMarquee = false;
    render();
  }
  if (isBboxResizing) {
    isBboxResizing = false;
    bboxOriginals = [];
    bboxOrigRect = null;
  }
  isDragging=false; isResizing=false; isRotating=false;
  multiDragOffsets = [];
  // Clear snap highlights
  canvas.querySelectorAll('.center-guide.snapped').forEach(g => g.classList.remove('snapped'));
  if(isPanning) { isPanning=false; canvasArea.style.cursor=currentTool==='hand'?'grab':'default'; }
});

// Double-click: edit text, add clip image, or center canvas
canvasArea.addEventListener('dblclick', (e) => {
  const elDiv = e.target.closest('.canvas-element');
  if (elDiv) {
    const el = elements.find(e => e.id === elDiv.dataset.id);
    if (!el) return;
    if (el.type === 'text') { startEditing(elDiv, el); return; }
    if (el.type !== 'image' && el.type !== 'line') { addClipImage(el.id); }
    return;
  }
  // Double-click outside canvas → center & fit
  if (!e.target.closest('#canvas')) {
    centerCanvas();
  }
});

function startEditing(div, el) {
  isEditing=true; isDragging=false;
  // Target the inner text wrapper if it exists (text elements use a child div to avoid clipping handles)
  const editTarget = div.querySelector('div') || div;
  editTarget.style.pointerEvents = 'auto';
  editTarget.contentEditable=true; editTarget.style.cursor='text'; editTarget.focus();
  const range = document.createRange(); range.selectNodeContents(editTarget);
  const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
  editTarget.addEventListener('blur', () => { isEditing=false; el.text=editTarget.innerText; editTarget.contentEditable=false; render(); }, {once:true});
  editTarget.addEventListener('input', () => { el.text = editTarget.innerText; });
}
function finishEditing() {
  isEditing=false;
  const editable = canvas.querySelector('[contenteditable="true"]');
  if(editable) {
    editable.contentEditable=false;
    // The editable might be the inner div; find the parent .canvas-element for the data-id
    const elDiv = editable.closest('.canvas-element') || editable;
    const el=elements.find(e=>e.id===elDiv.dataset.id);
    if(el) el.text=editable.innerText;
  }
}

// ═══════════════════════════════════════════════════════════
// ZOOM (wheel)
// ═══════════════════════════════════════════════════════════
canvasArea.addEventListener('wheel', (e) => {
  e.preventDefault();
  const delta = e.deltaY > 0 ? 0.92 : 1.08;
  const newZoom = Math.max(0.1, Math.min(5, zoom * delta));
  const rect = canvasArea.getBoundingClientRect();
  const mx = e.clientX-rect.left, my = e.clientY-rect.top;
  panX = mx-(mx-panX)*(newZoom/zoom); panY = my-(my-panY)*(newZoom/zoom);
  zoom = newZoom; updateCanvasTransform();
}, {passive:false});

// ═══════════════════════════════════════════════════════════
// CONTEXT MENU
// ═══════════════════════════════════════════════════════════
canvasArea.addEventListener('contextmenu', (e) => { e.preventDefault(); });
function hideContextMenu() { document.getElementById('contextMenu').classList.add('hidden'); }

// ═══════════════════════════════════════════════════════════
// ELEMENT OPERATIONS
// ═══════════════════════════════════════════════════════════
function duplicateElement(id) {
  hideContextMenu(); const el=elements.find(e=>e.id===id); if(!el)return;
  saveState();
  const clone={...el, id:createId(), x:el.x+20, y:el.y+20, name:el.name+' copy'};
  elements.push(clone); selectElement(clone.id);
}
function deleteElement(id) { hideContextMenu(); saveState(); elements=elements.filter(e=>e.id!==id); if(selectedId===id)deselectAll(); else { selectedIds.delete(id); } render(); }

// ═══════════════════════════════════════════════════════════
// MULTI-SELECT OPERATIONS
// ═══════════════════════════════════════════════════════════
function deleteSelected() {
  if (selectedIds.size === 0) return;
  saveState();
  elements = elements.filter(e => !selectedIds.has(e.id));
  deselectAll();
}

function duplicateSelected() {
  if (selectedIds.size === 0) return;
  saveState();
  const newIds = [];
  const selEls = elements.filter(e => selectedIds.has(e.id));
  selEls.forEach(el => {
    const clone = { ...el, id: createId(), x: el.x + 20, y: el.y + 20, name: el.name + ' copy' };
    elements.push(clone);
    newIds.push(clone.id);
  });
  selectMultiple(newIds);
  showToast(`Duplicated ${newIds.length} elements`);
}

function groupSelected() {
  if (selectedIds.size < 2) return;
  saveState();
  groupCounter++;
  const gid = 'grp_' + groupCounter;
  elements.forEach(el => {
    if (selectedIds.has(el.id)) el.groupId = gid;
  });
  showMultiSelectPanel();
  render();
  showToast('Grouped');
}

function ungroupSelected() {
  if (selectedIds.size < 2) return;
  saveState();
  elements.forEach(el => {
    if (selectedIds.has(el.id)) el.groupId = null;
  });
  showMultiSelectPanel();
  render();
  showToast('Ungrouped');
}

function copySelected() {
  if (selectedIds.size === 0) return;
  if (selectedIds.size === 1) {
    const el = elements.find(e => e.id === selectedId);
    if (el) { clipboard = JSON.stringify([el]); showToast('Copied'); }
    return;
  }
  const selEls = elements.filter(e => selectedIds.has(e.id));
  clipboard = JSON.stringify(selEls);
  showToast(`Copied ${selEls.length} elements`);
}

function pasteSelected() {
  if (!clipboard) return;
  saveState();
  const parsed = JSON.parse(clipboard);
  const arr = Array.isArray(parsed) ? parsed : [parsed];
  const newIds = [];
  arr.forEach(el => {
    el.id = createId();
    el.x += 20; el.y += 20;
    el.name = (el.name || el.type) + ' copy';
    elements.push(el);
    newIds.push(el.id);
  });
  selectMultiple(newIds);
  showToast('Pasted');
}

// ═══════════════════════════════════════════════════════════
// UNDO / REDO
// ═══════════════════════════════════════════════════════════
function saveState() {
  undoStack.push(JSON.stringify(elements));
  if (undoStack.length > 50) undoStack.shift();
  redoStack = [];
  if (typeof autoSave === 'function') autoSave();
}
function undo() {
  if(!undoStack.length) return;
  redoStack.push(JSON.stringify(elements)); elements=JSON.parse(undoStack.pop());
  idCounter=Math.max(idCounter, ...elements.map(e=>parseInt(e.id.split('_')[1])||0));
  // Clean up selectedIds — remove any that no longer exist
  const existingIds = new Set(elements.map(e => e.id));
  selectedIds.forEach(id => { if (!existingIds.has(id)) selectedIds.delete(id); });
  if (selectedIds.size === 0) deselectAll();
  else if (selectedIds.size === 1) selectElement([...selectedIds][0]);
  else { selectedId = null; showMultiSelectPanel(); render(); }
  showToast('Undo');
}
function redo() {
  if(!redoStack.length) return;
  undoStack.push(JSON.stringify(elements)); elements=JSON.parse(redoStack.pop());
  idCounter=Math.max(idCounter, ...elements.map(e=>parseInt(e.id.split('_')[1])||0));
  const existingIds = new Set(elements.map(e => e.id));
  selectedIds.forEach(id => { if (!existingIds.has(id)) selectedIds.delete(id); });
  if (selectedIds.size === 0) deselectAll();
  else if (selectedIds.size === 1) selectElement([...selectedIds][0]);
  else { selectedId = null; showMultiSelectPanel(); render(); }
  showToast('Redo');
}

// ═══════════════════════════════════════════════════════════
// KEYBOARD SHORTCUTS
// ═══════════════════════════════════════════════════════════
document.addEventListener('keydown', (e) => {
  if(isEditing || ['INPUT','SELECT','TEXTAREA'].includes(e.target.tagName)) return;

  if(e.key==='Delete'||e.key==='Backspace') {
    if (selectedIds.size > 1) { deleteSelected(); e.preventDefault(); }
    else if(selectedId) { deleteElement(selectedId); e.preventDefault(); }
  }
  if(e.key==='Escape') { deselectAll(); closePresetModal(); closeSaveModal(); closeLoadModal(); }
  if((e.ctrlKey||e.metaKey)&&e.key==='s') { e.preventDefault(); openSaveModal(); }
  if((e.ctrlKey||e.metaKey)&&e.key==='z') { e.preventDefault(); undo(); }
  if((e.ctrlKey||e.metaKey)&&(e.key==='y'||(e.shiftKey&&e.key==='Z'))) { e.preventDefault(); redo(); }
  if((e.ctrlKey||e.metaKey)&&e.key==='d') {
    e.preventDefault();
    if (selectedIds.size > 1) duplicateSelected();
    else if(selectedId) duplicateElement(selectedId);
  }
  if((e.ctrlKey||e.metaKey)&&e.key==='c') { e.preventDefault(); copySelected(); }
  if((e.ctrlKey||e.metaKey)&&e.key==='v') { e.preventDefault(); pasteSelected(); }
  if((e.ctrlKey||e.metaKey)&&e.key==='a') { e.preventDefault(); selectAll(); }
  if((e.ctrlKey||e.metaKey)&&e.key==='g' && !e.shiftKey) { e.preventDefault(); groupSelected(); }
  if((e.ctrlKey||e.metaKey)&&e.key==='g' && e.shiftKey) { e.preventDefault(); ungroupSelected(); }
  // Also handle uppercase G for Ctrl+Shift+G
  if((e.ctrlKey||e.metaKey)&&e.key==='G') { e.preventDefault(); ungroupSelected(); }

  if((e.ctrlKey||e.metaKey)&&e.shiftKey&&e.key===']') { e.preventDefault(); zBringToFront(); }
  if((e.ctrlKey||e.metaKey)&&!e.shiftKey&&e.key===']') { e.preventDefault(); zMoveUp(); }
  if((e.ctrlKey||e.metaKey)&&e.shiftKey&&e.key==='[') { e.preventDefault(); zSendToBack(); }
  if((e.ctrlKey||e.metaKey)&&!e.shiftKey&&e.key==='[') { e.preventDefault(); zMoveDown(); }

  if(!e.ctrlKey && !e.metaKey) {
    if(e.key==='v'||e.key==='V') setTool('select');
    if(e.key==='h'||e.key==='H') setTool('hand');
    if(e.key==='t'||e.key==='T') { addText(); setTool('select'); }
    if(e.key==='r'||e.key==='R') { addRect(); setTool('select'); }
    if(e.key==='o'||e.key==='O') { addCircle(); setTool('select'); }
    if(e.key==='l'||e.key==='L') { addLine(); setTool('select'); }
  }

  // Arrow keys: move selected elements
  if(selectedIds.size > 0 && ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) {
    e.preventDefault();
    const step=e.shiftKey?10:1; saveState();
    elements.filter(el => selectedIds.has(el.id) && !el.locked).forEach(el => {
      if(e.key==='ArrowUp') el.y -= step;
      if(e.key==='ArrowDown') el.y += step;
      if(e.key==='ArrowLeft') el.x -= step;
      if(e.key==='ArrowRight') el.x += step;
    });
    if (selectedId) selectElement(selectedId);
    else render();
  }
  if(e.key==='='||e.key==='+') zoomIn();
  if(e.key==='-') zoomOut();
  if(e.key==='0'&&(e.ctrlKey||e.metaKey)) { e.preventDefault(); resetZoom(); }
});

// ═══════════════════════════════════════════════════════════
// COPY / PASTE
// ═══════════════════════════════════════════════════════════
function copyElement() { copySelected(); }
function pasteElement() { pasteSelected(); }

// ═══════════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════════
function toggleExportDropdown(e) {
  e && e.stopPropagation();
  const dd = document.getElementById('exportDropdown');
  dd.classList.toggle('show');
  const close = (ev) => { if (!dd.contains(ev.target) && !ev.target.closest('#exportBtn')) { dd.classList.remove('show'); document.removeEventListener('click', close); } };
  if (dd.classList.contains('show')) setTimeout(() => document.addEventListener('click', close), 0);
}

function exportCanvas(format) {
  document.getElementById('exportDropdown').classList.remove('show');
  const prevSelectedIds = new Set(selectedIds); deselectAll();
  const cw = parseInt(document.getElementById('canvasW').value);
  const ch = parseInt(document.getElementById('canvasH').value);
  const scale = format === 'png2x' ? 2 : 1;
  const offscreen = document.createElement('canvas');
  offscreen.width = cw * scale; offscreen.height = ch * scale;
  const ctx = offscreen.getContext('2d');
  ctx.scale(scale, scale);

  // Background
  ctx.fillStyle = canvas.style.backgroundColor || '#ffffff';
  ctx.fillRect(0, 0, cw, ch);

  // Collect image loading promises
  const imgPromises = [];
  elements.forEach(el => {
    if (!el.visible) return;
    if (el.type === 'image' && el.src) {
      const p = new Promise(resolve => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve({ el, img });
        img.onerror = () => resolve({ el, img: null });
        img.src = el.src;
      });
      imgPromises.push(p);
    }
    if (el.clipImage) {
      const p = new Promise(resolve => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve({ clipFor: el.id, img });
        img.onerror = () => resolve({ clipFor: el.id, img: null });
        img.src = el.clipImage;
      });
      imgPromises.push(p);
    }
  });

  Promise.all(imgPromises).then(loaded => {
    const imgMap = {}; const clipMap = {};
    loaded.forEach(r => {
      if (r.clipFor) clipMap[r.clipFor] = r.img;
      else if (r.el) imgMap[r.el.id] = r.img;
    });

    elements.forEach(el => {
      if (!el.visible) return;
      ctx.save();
      // Transform
      ctx.translate(el.x + el.w / 2, el.y + el.h / 2);
      if (el.rotation) ctx.rotate(el.rotation * Math.PI / 180);
      if (el.flipH) ctx.scale(-1, 1);
      if (el.flipV) ctx.scale(1, -1);
      ctx.translate(-el.w / 2, -el.h / 2);
      ctx.globalAlpha = (el.opacity || 100) / 100;

      // Shadow
      if (el.shadowBlur > 0 || el.shadowX || el.shadowY) {
        const sc = el.shadowColor || '#000000'; const so = (el.shadowOpacity || 25) / 100;
        const r = parseInt(sc.slice(1, 3), 16), g = parseInt(sc.slice(3, 5), 16), b = parseInt(sc.slice(5, 7), 16);
        ctx.shadowOffsetX = el.shadowX || 0; ctx.shadowOffsetY = el.shadowY || 0;
        ctx.shadowBlur = el.shadowBlur || 0; ctx.shadowColor = `rgba(${r},${g},${b},${so})`;
      }

      if (el.clipImage && clipMap[el.id]) {
        drawClippedImage(ctx, el, clipMap[el.id]);
      } else if (el.type === 'text') {
        drawText(ctx, el);
      } else if (el.type === 'rect') {
        drawRect(ctx, el);
      } else if (el.type === 'line') {
        ctx.fillStyle = el.fill || '#6c5ce7';
        ctx.fillRect(0, 0, el.w, el.h);
      } else if (SVG_SHAPE_TYPES.includes(el.type)) {
        drawShape(ctx, el);
      } else if (EXTRA_SHAPES[el.type]) {
        drawExtraShape(ctx, el);
      } else if (el.type === 'image') {
        drawImage(ctx, el, imgMap[el.id]);
      }
      ctx.restore();
    });

    // Download
    const name = document.getElementById('docTitle').value || 'design';
    let mime, ext, quality;
    if (format === 'png' || format === 'png2x') { mime = 'image/png'; ext = 'png'; }
    else { mime = 'image/jpeg'; ext = 'jpg'; quality = 0.85; }

    offscreen.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url;
      a.download = `${name}.${ext}`; a.click();
      URL.revokeObjectURL(url);
      if (prevSelectedIds.size === 1) selectElement([...prevSelectedIds][0]);
      else if (prevSelectedIds.size > 1) selectMultiple([...prevSelectedIds]);
      showToast(`Exported as ${ext.toUpperCase()}${format === 'png2x' ? ' @2x' : ''}`);
    }, mime, quality);
  });
}

// — Drawing helpers for export —

function drawRect(ctx, el) {
  const r = Math.min(el.borderRadius || 0, el.w / 2, el.h / 2);
  ctx.beginPath();
  if (r > 0) {
    ctx.moveTo(r, 0); ctx.arcTo(el.w, 0, el.w, el.h, r); ctx.arcTo(el.w, el.h, 0, el.h, r);
    ctx.arcTo(0, el.h, 0, 0, r); ctx.arcTo(0, 0, el.w, 0, r);
  } else { ctx.rect(0, 0, el.w, el.h); }
  ctx.closePath();
  ctx.fillStyle = el.fill || '#6c5ce7'; ctx.fill();
  if (el.borderWidth > 0) { ctx.strokeStyle = el.borderColor || '#000'; ctx.lineWidth = el.borderWidth; ctx.stroke(); }
}

function drawShape(ctx, el) {
  const w = el.w, h = el.h;
  const shapes = {
    triangle: () => [[w/2,0],[w,h],[0,h]],
    hexagon: () => [[w*.25,0],[w*.75,0],[w,h*.5],[w*.75,h],[w*.25,h],[0,h*.5]],
    pentagon: () => [[w*.5,0],[w,h*.38],[w*.82,h],[w*.18,h],[0,h*.38]],
    diamond: () => [[w/2,0],[w,h/2],[w/2,h],[0,h/2]],
    arrow: () => [[0,h*.2],[w*.6,h*.2],[w*.6,0],[w,h*.5],[w*.6,h],[w*.6,h*.8],[0,h*.8]],
    cross: () => [[w*.35,0],[w*.65,0],[w*.65,h*.35],[w,h*.35],[w,h*.65],[w*.65,h*.65],[w*.65,h],[w*.35,h],[w*.35,h*.65],[0,h*.65],[0,h*.35],[w*.35,h*.35]],
    octagon: () => [[w*.3,0],[w*.7,0],[w,h*.3],[w,h*.7],[w*.7,h],[w*.3,h],[0,h*.7],[0,h*.3]],
    parallelogram: () => [[w*.2,0],[w,0],[w*.8,h],[0,h]],
    trapezoid: () => [[w*.2,0],[w*.8,0],[w,h],[0,h]],
    chevron: () => [[0,0],[w*.75,0],[w,h*.5],[w*.75,h],[0,h],[w*.25,h*.5]],
    arrowLeft: () => [[w*.4,0],[w*.4,h*.2],[w,h*.2],[w,h*.8],[w*.4,h*.8],[w*.4,h],[0,h*.5]],
    speechBubble: () => [[0,0],[w,0],[w,h*.7],[w*.6,h*.7],[w*.4,h],[w*.4,h*.7],[0,h*.7]],
    shield: () => [[w*.5,0],[w,h*.15],[w,h*.55],[w*.75,h*.85],[w*.5,h],[w*.25,h*.85],[0,h*.55],[0,h*.15]],
    semicircle: () => [[0,h],[0,h*.5],[w*.02,h*.38],[w*.07,h*.26],[w*.15,h*.15],[w*.26,h*.07],[w*.38,h*.02],[w*.5,0],[w*.62,h*.02],[w*.74,h*.07],[w*.85,h*.15],[w*.93,h*.26],[w*.98,h*.38],[w,h*.5],[w,h]],
    lightning: () => [[w*.4,0],[w*.65,0],[w*.5,h*.4],[w*.75,h*.4],[w*.35,h],[w*.45,h*.55],[w*.25,h*.55]],
    ribbon: () => [[0,0],[w,0],[w,h*.8],[w*.5,h],[0,h*.8]],
    star6: () => [[w*.5,0],[w*.63,h*.25],[w*.93,h*.25],[w*.75,h*.5],[w*.93,h*.75],[w*.63,h*.75],[w*.5,h],[w*.37,h*.75],[w*.07,h*.75],[w*.25,h*.5],[w*.07,h*.25],[w*.37,h*.25]],
    star8: () => [[w*.5,0],[w*.62,h*.19],[w*.85,h*.15],[w*.81,h*.38],[w,h*.5],[w*.81,h*.62],[w*.85,h*.85],[w*.62,h*.81],[w*.5,h],[w*.38,h*.81],[w*.15,h*.85],[w*.19,h*.62],[0,h*.5],[w*.19,h*.38],[w*.15,h*.15],[w*.38,h*.19]],
    rhombus: () => [[w*.5,0],[w*.85,h*.5],[w*.5,h],[w*.15,h*.5]],
  };

  if (el.type === 'star') {
    const starPts = [[50,5],[61,35],[95,35],[68,57],[79,90],[50,70],[21,90],[32,57],[5,35],[39,35]];
    ctx.beginPath();
    starPts.forEach(([px, py], i) => {
      const sx = px / 100 * w, sy = py / 100 * h;
      i === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
    });
    ctx.closePath();
    ctx.fillStyle = el.fill || '#fdcb6e'; ctx.fill();
    if (el.borderWidth > 0) { ctx.strokeStyle = el.borderColor || '#000'; ctx.lineWidth = el.borderWidth; ctx.stroke(); }
  } else if (el.type === 'heart') {
    // Draw heart using bezier curves scaled to el.w x el.h
    ctx.beginPath();
    ctx.moveTo(w * 0.5, h * 0.9);
    ctx.bezierCurveTo(w * 0.15, h * 0.65, -w * 0.05, h * 0.3, w * 0.5, h * 0.15);
    ctx.bezierCurveTo(w * 1.05, h * 0.3, w * 0.85, h * 0.65, w * 0.5, h * 0.9);
    ctx.closePath();
    ctx.fillStyle = el.fill || '#e84393'; ctx.fill();
    if (el.borderWidth > 0) { ctx.strokeStyle = el.borderColor || '#000'; ctx.lineWidth = el.borderWidth; ctx.stroke(); }
  } else if (shapes[el.type]) {
    const pts = shapes[el.type]();
    ctx.beginPath();
    pts.forEach(([px, py], i) => i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py));
    ctx.closePath();
    ctx.fillStyle = el.fill || '#6c5ce7'; ctx.fill();
    if (el.borderWidth > 0) { ctx.strokeStyle = el.borderColor || '#000'; ctx.lineWidth = el.borderWidth; ctx.stroke(); }
  }
}

function drawExtraShape(ctx, el) {
  const def = EXTRA_SHAPES[el.type]; if (!def) return;
  const sx = el.w / 100, sy = el.h / 100;
  if (def.path) {
    ctx.save();
    ctx.scale(sx, sy);
    const p = new Path2D(def.path);
    ctx.fillStyle = el.fill || def.fill;
    ctx.fill(p, def.fillRule || 'nonzero');
    if (el.borderWidth > 0) { ctx.strokeStyle = el.borderColor || '#000'; ctx.lineWidth = el.borderWidth / sx; ctx.stroke(p); }
    ctx.restore();
  } else if (def.poly) {
    ctx.beginPath();
    def.poly.forEach(([px, py], i) => {
      const x = px / 100 * el.w, y = py / 100 * el.h;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = el.fill || def.fill; ctx.fill();
    if (el.borderWidth > 0) { ctx.strokeStyle = el.borderColor || '#000'; ctx.lineWidth = el.borderWidth; ctx.stroke(); }
  }
}

function drawText(ctx, el) {
  // Background
  if (el.fill && el.fill !== 'transparent') {
    const r = Math.min(el.borderRadius || 0, el.w / 2, el.h / 2);
    ctx.beginPath();
    if (r > 0) { ctx.moveTo(r, 0); ctx.arcTo(el.w, 0, el.w, el.h, r); ctx.arcTo(el.w, el.h, 0, el.h, r); ctx.arcTo(0, el.h, 0, 0, r); ctx.arcTo(0, 0, el.w, 0, r); }
    else ctx.rect(0, 0, el.w, el.h);
    ctx.closePath(); ctx.fillStyle = el.fill; ctx.fill();
  }
  if (el.borderWidth > 0) {
    ctx.strokeStyle = el.borderColor || '#000'; ctx.lineWidth = el.borderWidth;
    ctx.strokeRect(0, 0, el.w, el.h);
  }

  // Text rendering
  const fontSize = el.fontSize || 24;
  const fontWeight = el.bold ? '700' : (el.fontWeight || '700');
  const fontStyle = el.italic ? 'italic' : 'normal';
  const fontFamily = el.fontFamily || 'DM Sans';
  ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px '${fontFamily}', sans-serif`;
  ctx.fillStyle = el.textColor || '#000000';
  ctx.textBaseline = 'top';

  const lineHeight = (el.lineHeight || 1.4) * fontSize;
  const letterSpacing = el.letterSpacing || 0;
  const padX = 8, padY = 4;
  const maxW = el.w - padX * 2;
  const text = el.text || '';
  const words = text.split(' ');
  const lines = [];
  let line = '';

  words.forEach(word => {
    const test = line ? line + ' ' + word : word;
    if (ctx.measureText(test).width + letterSpacing * test.length > maxW && line) {
      lines.push(line); line = word;
    } else { line = test; }
  });
  if (line) lines.push(line);

  const align = el.textAlign || 'left';
  lines.forEach((ln, i) => {
    const y = padY + i * lineHeight;
    if (y + fontSize > el.h) return;
    let x = padX;
    if (align === 'center') x = padX + (maxW - ctx.measureText(ln).width) / 2;
    else if (align === 'right') x = padX + maxW - ctx.measureText(ln).width;

    if (letterSpacing > 0) {
      [...ln].forEach(ch => { ctx.fillText(ch, x, y); x += ctx.measureText(ch).width + letterSpacing; });
    } else { ctx.fillText(ln, x, y); }

    if (el.underline) {
      const tw = ctx.measureText(ln).width;
      let ux = padX;
      if (align === 'center') ux = padX + (maxW - tw) / 2;
      else if (align === 'right') ux = padX + maxW - tw;
      ctx.fillRect(ux, y + fontSize + 1, tw, 1);
    }
    if (el.lineThrough) {
      const tw = ctx.measureText(ln).width;
      let ux = padX;
      if (align === 'center') ux = padX + (maxW - tw) / 2;
      else if (align === 'right') ux = padX + maxW - tw;
      ctx.fillRect(ux, y + fontSize * 0.5, tw, 1);
    }
  });
}

function drawImage(ctx, el, img) {
  if (!img) return;
  const r = Math.min(el.borderRadius || 0, el.w / 2, el.h / 2);
  if (r > 0) {
    ctx.beginPath();
    ctx.moveTo(r, 0); ctx.arcTo(el.w, 0, el.w, el.h, r); ctx.arcTo(el.w, el.h, 0, el.h, r);
    ctx.arcTo(0, el.h, 0, 0, r); ctx.arcTo(0, 0, el.w, 0, r); ctx.closePath(); ctx.clip();
  }
  // Object-fit: cover
  const iw = img.naturalWidth, ih = img.naturalHeight;
  const scale = Math.max(el.w / iw, el.h / ih);
  const sw = iw * scale, sh = ih * scale;
  const ox = (el.w - sw) / 2, oy = (el.h - sh) / 2;
  // Filters
  const filters = getFilterCSS(el);
  if (filters) ctx.filter = filters;
  ctx.drawImage(img, ox, oy, sw, sh);
  if (filters) ctx.filter = 'none';

  // Vignette
  if (el.filterVignette > 0) {
    const grad = ctx.createRadialGradient(el.w/2, el.h/2, el.w * 0.3, el.w/2, el.h/2, el.w * 0.7);
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(1, `rgba(0,0,0,${el.filterVignette / 100})`);
    ctx.fillStyle = grad; ctx.fillRect(0, 0, el.w, el.h);
  }
  if (el.borderWidth > 0) {
    ctx.strokeStyle = el.borderColor || '#000'; ctx.lineWidth = el.borderWidth;
    ctx.strokeRect(0, 0, el.w, el.h);
  }
}

function drawClippedImage(ctx, el, img) {
  if (!img) return;
  // Build clip path for shape
  const cp = getClipPath(el);
  if (cp) {
    const polyMatch = cp.match(/polygon\(([^)]+)\)/);
    const circleMatch = cp.match(/circle\(([^)]+)\)/);
    const ellipseMatch = cp.match(/ellipse\(([^)]+)\)/);
    if (polyMatch) {
      const pts = polyMatch[1].split(',').map(p => {
        const [x, y] = p.trim().split(/\s+/).map(v => parseFloat(v) / 100);
        return [x * el.w, y * el.h];
      });
      ctx.beginPath();
      pts.forEach(([px, py], i) => i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py));
      ctx.closePath(); ctx.clip();
    } else if (circleMatch || ellipseMatch) {
      ctx.beginPath(); ctx.ellipse(el.w/2, el.h/2, el.w/2, el.h/2, 0, 0, Math.PI*2); ctx.closePath(); ctx.clip();
    }
  } else if (el.borderRadius) {
    const r = Math.min(el.borderRadius, el.w/2, el.h/2);
    ctx.beginPath(); ctx.moveTo(r,0); ctx.arcTo(el.w,0,el.w,el.h,r); ctx.arcTo(el.w,el.h,0,el.h,r);
    ctx.arcTo(0,el.h,0,0,r); ctx.arcTo(0,0,el.w,0,r); ctx.closePath(); ctx.clip();
  }
  // Draw image cover
  const iw = img.naturalWidth, ih = img.naturalHeight;
  const s = Math.max(el.w / iw, el.h / ih);
  const sw = iw * s, sh = ih * s;
  ctx.drawImage(img, (el.w - sw) / 2, (el.h - sh) / 2, sw, sh);
}

function showToast(msg) {
  const t=document.getElementById('toast'); t.textContent=msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),1500);
}

// ═══════════════════════════════════════════════════════════
// SAVE / LOAD DESIGNS (localStorage)
// ═══════════════════════════════════════════════════════════
const DESIGN_PREFIX = 'drwn_design_';
const AUTOSAVE_KEY = 'drwn_autosave';

function serializeDesign() {
  return {
    title: document.getElementById('docTitle').value || 'Untitled Design',
    canvasW: parseInt(document.getElementById('canvasW').value),
    canvasH: parseInt(document.getElementById('canvasH').value),
    bgColor: canvas.style.backgroundColor || '#ffffff',
    elements: JSON.parse(JSON.stringify(elements)),
    savedAt: Date.now()
  };
}

function getSavedDesigns() {
  const designs = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.startsWith(DESIGN_PREFIX)) continue;
    try {
      const data = JSON.parse(localStorage.getItem(key));
      designs.push({
        name: key.slice(DESIGN_PREFIX.length),
        title: data.title,
        savedAt: data.savedAt,
        canvasW: data.canvasW,
        canvasH: data.canvasH
      });
    } catch(e) { /* skip corrupt entries */ }
  }
  return designs.sort((a, b) => (b.savedAt || 0) - (a.savedAt || 0));
}

function saveDesign(name) {
  if (!name || !name.trim()) return;
  name = name.trim();
  const data = serializeDesign();
  localStorage.setItem(DESIGN_PREFIX + name, JSON.stringify(data));
  showToast(`Saved "${name}"`);
  closeSaveModal();
}

function loadDesign(name) {
  const raw = localStorage.getItem(DESIGN_PREFIX + name);
  if (!raw) { showToast('Design not found'); return; }
  const data = JSON.parse(raw);

  saveState();
  elements = [];
  selectedId = null;
  selectedIds.clear();
  idCounter = 0;

  document.getElementById('canvasW').value = data.canvasW;
  document.getElementById('canvasH').value = data.canvasH;
  canvas.style.width = data.canvasW + 'px';
  canvas.style.height = data.canvasH + 'px';
  canvas.style.backgroundColor = data.bgColor || '#ffffff';
  document.getElementById('canvasBg').value = data.bgColor || '#ffffff';
  document.getElementById('canvasBgHex').value = data.bgColor || '#ffffff';

  data.elements.forEach(elDef => {
    const el = { ...elDef, id: createId() };
    elements.push(el);
  });

  document.getElementById('currentPresetLabel').textContent = data.canvasW + ' × ' + data.canvasH;
  const label2 = document.getElementById('currentPresetLabel2');
  if (label2) label2.textContent = data.canvasW + ' × ' + data.canvasH;
  document.getElementById('docTitle').value = data.title || 'Untitled Design';

  closeLoadModal();
  deselectAll();
  centerCanvas();
  render();
  showToast(`Loaded "${name}"`);
}

function deleteSavedDesign(name) {
  localStorage.removeItem(DESIGN_PREFIX + name);
  showToast(`Deleted "${name}"`);
  renderLoadModalList();
}

function autoSave() {
  try {
    const data = serializeDesign();
    localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(data));
  } catch(e) { /* quota exceeded, ignore */ }
}

// — Save Modal —
function openSaveModal() {
  const modal = document.getElementById('saveModal');
  const input = document.getElementById('saveDesignName');
  input.value = document.getElementById('docTitle').value || 'Untitled Design';
  renderSaveModalList();
  modal.classList.remove('hidden');
}
function closeSaveModal() {
  document.getElementById('saveModal').classList.add('hidden');
}
function renderSaveModalList() {
  const list = document.getElementById('saveExistingList');
  const designs = getSavedDesigns();
  if (designs.length === 0) {
    list.innerHTML = '<p class="text-xs text-fg-400 italic">No saved designs yet</p>';
    return;
  }
  list.innerHTML = designs.map(d => `
    <button onclick="document.getElementById('saveDesignName').value='${d.name.replace(/'/g, "\\'")}';"
      class="w-full text-left px-3 py-2 rounded-lg bg-fg-750 hover:bg-fg-700 border border-fg-600 hover:border-fg-accent transition-colors flex items-center justify-between gap-2">
      <div class="truncate">
        <div class="text-xs text-fg-200 font-medium truncate">${d.name}</div>
        <div class="text-[10px] text-fg-400 font-mono">${d.canvasW}×${d.canvasH} · ${new Date(d.savedAt).toLocaleDateString()}</div>
      </div>
      <span class="text-[10px] text-fg-400 shrink-0">overwrite</span>
    </button>
  `).join('');
}
function handleSaveSubmit() {
  const name = document.getElementById('saveDesignName').value;
  saveDesign(name);
}

// — Load Modal —
function openLoadModal() {
  renderLoadModalList();
  document.getElementById('loadModal').classList.remove('hidden');
}
function closeLoadModal() {
  document.getElementById('loadModal').classList.add('hidden');
}
function renderLoadModalList() {
  const grid = document.getElementById('loadDesignGrid');
  const designs = getSavedDesigns();
  if (designs.length === 0) {
    grid.innerHTML = '<div class="col-span-2 text-center py-10"><p class="text-sm text-fg-400">No saved designs</p><p class="text-xs text-fg-400 mt-1">Save a design first to see it here</p></div>';
    return;
  }
  grid.innerHTML = designs.map(d => `
    <div class="save-card group relative cursor-pointer" onclick="loadDesign('${d.name.replace(/'/g, "\\'")}')">
      <button onclick="event.stopPropagation(); deleteSavedDesign('${d.name.replace(/'/g, "\\'")}')"
        class="absolute top-2 right-2 p-1 rounded-md bg-fg-700/80 text-fg-400 hover:text-fg-danger hover:bg-fg-700 opacity-0 group-hover:opacity-100 transition-opacity z-10"
        title="Delete">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <div class="save-card-preview">
        <div class="text-[10px] text-fg-400 font-mono">${d.canvasW}×${d.canvasH}</div>
      </div>
      <div class="px-1 mt-2">
        <div class="text-xs text-fg-200 font-medium truncate">${d.title || d.name}</div>
        <div class="text-[10px] text-fg-400">${new Date(d.savedAt).toLocaleDateString()} · ${new Date(d.savedAt).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</div>
      </div>
    </div>
  `).join('');
}

// ═══════════════════════════════════════════════════════════
// GRID CONTROLS
// ═══════════════════════════════════════════════════════════
function toggleGuides() {
  guidesVisible = !guidesVisible;
  document.getElementById('guidesToggleBtn')?.classList.toggle('active', guidesVisible);
  render();
}

function renderCenterGuides() {
  canvas.querySelectorAll('.center-guide').forEach(e => e.remove());
  if (!guidesVisible) return;
  const guides = [
    { cls: 'center-guide-v25', css: 'left:25%;top:0;width:0;height:100%;border-left:1px dashed rgba(108,92,231,0.35)' },
    { cls: 'center-guide-v',   css: 'left:50%;top:0;width:0;height:100%;border-left:1px dashed rgba(108,92,231,0.5)' },
    { cls: 'center-guide-v75', css: 'left:75%;top:0;width:0;height:100%;border-left:1px dashed rgba(108,92,231,0.35)' },
    { cls: 'center-guide-h25', css: 'top:25%;left:0;height:0;width:100%;border-top:1px dashed rgba(108,92,231,0.35)' },
    { cls: 'center-guide-h',   css: 'top:50%;left:0;height:0;width:100%;border-top:1px dashed rgba(108,92,231,0.5)' },
    { cls: 'center-guide-h75', css: 'top:75%;left:0;height:0;width:100%;border-top:1px dashed rgba(108,92,231,0.35)' },
  ];
  guides.forEach(g => {
    const d = document.createElement('div');
    d.className = 'center-guide ' + g.cls;
    d.style.cssText = 'position:absolute;pointer-events:none;z-index:1;' + g.css;
    canvas.prepend(d);
  });
}
