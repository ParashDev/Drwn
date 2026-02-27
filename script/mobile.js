// ═══════════════════════════════════════════════════════════
// MOBILE SUPPORT
// ═══════════════════════════════════════════════════════════

// These state variables are defined in main.js:
// _isMobile, mobileSheetOpen, pinchStartDist, pinchStartZoom,
// mobileZoomTimeout, touchStartTime, longPressTimer, touchStartPos,
// mobileDragStarted, mobileTouchOnElement, mobileTextFontCategory, lastTapTime

function mobileSetFontCategory(cat) {
  mobileTextFontCategory = cat;
  // Re-render just the sheet content
  const content = document.getElementById('mobileSheetContent');
  if (content && mobileSheetOpen === 'text') {
    content.innerHTML = getMobileTextContent();
  }
}

function isMobile() {
  if (_isMobile === null) _isMobile = window.innerWidth <= 768;
  return _isMobile;
}

function initMobile() {
  // Re-detect on resize/orientation change
  window.addEventListener('resize', () => {
    const was = _isMobile;
    _isMobile = window.innerWidth <= 768;
    if (was !== _isMobile) {
      if (_isMobile) {
        mobileCloseSheet();
        closePanel();
      }
      centerCanvas();
      render();
    }
  });

  // Use pointer events for single-finger interactions (drag, tap, resize, rotate)
  // Pointer events work reliably across all mobile browsers and support setPointerCapture
  canvasArea.addEventListener('pointerdown', handlePointerDown);
  canvasArea.addEventListener('pointermove', handlePointerMove);
  canvasArea.addEventListener('pointerup', handlePointerUp);
  canvasArea.addEventListener('pointercancel', handlePointerUp);

  // Keep touch events ONLY for pinch-to-zoom (requires 2 fingers)
  canvasArea.addEventListener('touchstart', handlePinchStart, { passive: false });
  canvasArea.addEventListener('touchmove', handlePinchMove, { passive: false });
  canvasArea.addEventListener('touchend', handlePinchEnd, { passive: false });

  if (!isMobile()) return;

  // Sheet drag-to-dismiss
  const sheetHandle = document.getElementById('mobileSheetHandle');
  if (sheetHandle) {
    let sheetDragStartY = 0;
    let sheetStartTranslate = 0;
    let sheetDragging = false;
    const sheet = document.getElementById('mobileSheet');

    sheetHandle.addEventListener('touchstart', (e) => {
      sheetDragging = true;
      sheetDragStartY = e.touches[0].clientY;
      sheetStartTranslate = 0;
      sheet.style.transition = 'none';
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
      if (!sheetDragging) return;
      const dy = e.touches[0].clientY - sheetDragStartY;
      if (dy > 0) {
        sheetStartTranslate = dy;
        sheet.style.transform = `translateY(${dy}px)`;
      }
    }, { passive: true });

    document.addEventListener('touchend', () => {
      if (!sheetDragging) return;
      sheetDragging = false;
      sheet.style.transition = 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)';
      if (sheetStartTranslate > 80) {
        mobileCloseSheet();
      } else {
        sheet.style.transform = 'translateY(0)';
      }
    }, { passive: true });
  }
}

// ═══ PINCH ZOOM (touch events only — needs multi-touch) ═══
let _pinchActive = false;

function handlePinchStart(e) {
  if (!isMobile()) return;
  if (e.touches.length === 2) {
    e.preventDefault();
    _pinchActive = true;
    isDragging = false;
    isPanning = false;
    mobileTouchOnElement = false;
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    pinchStartDist = Math.sqrt(dx * dx + dy * dy);
    pinchStartZoom = zoom;
  }
}

function handlePinchMove(e) {
  if (!isMobile() || !_pinchActive) return;
  if (e.touches.length !== 2) return;
  e.preventDefault();
  const dx = e.touches[0].clientX - e.touches[1].clientX;
  const dy = e.touches[0].clientY - e.touches[1].clientY;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const scale = dist / pinchStartDist;
  const newZoom = Math.max(0.1, Math.min(5, pinchStartZoom * scale));
  const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
  const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
  const rect = canvasArea.getBoundingClientRect();
  const mx = midX - rect.left, my = midY - rect.top;
  panX = mx - (mx - panX) * (newZoom / zoom);
  panY = my - (my - panY) * (newZoom / zoom);
  zoom = newZoom;
  updateCanvasTransform();
  showMobileZoom();
}

function handlePinchEnd(e) {
  if (!isMobile()) return;
  if (e.touches.length < 2) _pinchActive = false;
}

// ═══ PROXIMITY HIT-TEST FOR HANDLES (reliable on touch) ═══
function findNearbyHandle(clientX, clientY, threshold) {
  threshold = threshold || 30;
  // Check single-select resize/rotate handles
  if (selectedId && selectedIds.size <= 1) {
    const elDiv = canvas.querySelector(`[data-id="${selectedId}"]`);
    if (elDiv) {
      // Check rotate handle
      const rotHandle = elDiv.querySelector('.rotate-handle');
      if (rotHandle) {
        const r = rotHandle.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        if (Math.abs(clientX - cx) < threshold && Math.abs(clientY - cy) < threshold) {
          return { type: 'rotate', element: rotHandle };
        }
      }
      // Check resize handles
      const handles = elDiv.querySelectorAll('.resize-handle');
      for (const h of handles) {
        const r = h.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        if (Math.abs(clientX - cx) < threshold && Math.abs(clientY - cy) < threshold) {
          return { type: 'resize', handle: h.dataset.handle, element: h };
        }
      }
    }
  }
  // Check multi-select bbox handles
  if (selectedIds.size > 1) {
    const bboxHandles = canvas.querySelectorAll('.bbox-handle');
    for (const h of bboxHandles) {
      const r = h.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      if (Math.abs(clientX - cx) < threshold && Math.abs(clientY - cy) < threshold) {
        return { type: 'bbox', handle: h.dataset.bboxHandle, element: h };
      }
    }
  }
  return null;
}

// ═══ POINTER EVENT HANDLERS (single-finger: drag, tap, resize, rotate, pan) ═══
function handlePointerDown(e) {
  if (!isMobile()) return;
  // Ignore right-click and multi-touch (handled by pinch)
  if (e.button !== 0 || _pinchActive) return;

  // Capture pointer so we keep getting events even if finger moves off element
  canvasArea.setPointerCapture(e.pointerId);

  touchStartTime = Date.now();
  touchStartPos = { x: e.clientX, y: e.clientY };
  mobileDragStarted = false;

  hideContextMenu();

  // Proximity-based handle detection (more reliable than elementFromPoint for small targets)
  const nearHandle = findNearbyHandle(e.clientX, e.clientY, 30);
  if (nearHandle) {
    if (nearHandle.type === 'rotate') {
      const el = elements.find(el => el.id === selectedId);
      if (!el) return;
      isRotating = true;
      mobileTouchOnElement = false;
      isPanning = false;
      const elDiv = canvas.querySelector(`[data-id="${selectedId}"]`);
      const rect = elDiv.getBoundingClientRect();
      rotateStartAngle = Math.atan2(e.clientY - (rect.top + rect.height / 2), e.clientX - (rect.left + rect.width / 2)) * 180 / Math.PI - (el.rotation || 0);
      return;
    }
    if (nearHandle.type === 'resize') {
      const el = elements.find(el => el.id === selectedId);
      if (!el || el.locked) return;
      isResizing = true;
      mobileTouchOnElement = false;
      isPanning = false;
      resizeHandle = nearHandle.handle;
      resizeStartX = e.clientX;
      resizeStartY = e.clientY;
      resizeStartW = el.w;
      resizeStartH = el.h;
      resizeStartEX = el.x;
      resizeStartEY = el.y;
      resizeStartRot = (el.rotation || 0) * Math.PI / 180;
      resizeStartFontSize = el.fontSize || 0;
      return;
    }
    if (nearHandle.type === 'bbox') {
      isBboxResizing = true;
      mobileTouchOnElement = false;
      isPanning = false;
      bboxResizeHandle = nearHandle.handle;
      resizeStartX = e.clientX;
      resizeStartY = e.clientY;
      bboxOrigRect = getSelectionBBox();
      bboxOriginals = elements.filter(el => selectedIds.has(el.id)).map(el => ({
        id: el.id, x: el.x, y: el.y, w: el.w, h: el.h, fontSize: el.fontSize || 0, type: el.type
      }));
      saveState();
      return;
    }
  }

  const target = document.elementFromPoint(e.clientX, e.clientY);
  if (!target) return;

  // Handle rotate (fallback for elementFromPoint)
  if (target.dataset && target.dataset.rotate) {
    const el = elements.find(el => el.id === selectedId);
    if (!el) return;
    isRotating = true;
    const rect = target.closest('.canvas-element').getBoundingClientRect();
    rotateStartAngle = Math.atan2(e.clientY - (rect.top + rect.height / 2), e.clientX - (rect.left + rect.width / 2)) * 180 / Math.PI - (el.rotation || 0);
    return;
  }

  // Handle resize (fallback for elementFromPoint)
  if (target.dataset && target.dataset.handle) {
    const el = elements.find(el => el.id === selectedId);
    if (!el || el.locked) return;
    isResizing = true;
    resizeHandle = target.dataset.handle;
    resizeStartX = e.clientX;
    resizeStartY = e.clientY;
    resizeStartW = el.w;
    resizeStartH = el.h;
    resizeStartEX = el.x;
    resizeStartEY = el.y;
    resizeStartRot = (el.rotation || 0) * Math.PI / 180;
    resizeStartFontSize = el.fontSize || 0;
    return;
  }

  // Handle bbox resize on mobile (fallback for elementFromPoint)
  if (target.dataset && target.dataset.bboxHandle) {
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

  // Handle element tap/drag
  const elDiv = target.closest('.canvas-element');
  if (elDiv) {
    const id = elDiv.dataset.id;
    const el = elements.find(el => el.id === id);
    if (el && el.locked) { selectElement(id); return; }

    // Multi-select mode: toggle
    if (mobileMultiSelect) {
      addToSelection(id);
      mobileTouchOnElement = false;
      return;
    }

    // Grouped element: select all in group
    if (el && el.groupId && !selectedIds.has(id)) {
      const groupEls = elements.filter(e => e.groupId === el.groupId);
      selectMultiple(groupEls.map(e => e.id));
      mobileTouchOnElement = true;
      isPanning = false;
      const canvasRect = canvas.getBoundingClientRect();
      const mx = (e.clientX - canvasRect.left) / zoom;
      const my = (e.clientY - canvasRect.top) / zoom;
      multiDragOffsets = elements.filter(el => selectedIds.has(el.id)).map(el => ({
        id: el.id, offX: mx - el.x, offY: my - el.y
      }));
      saveState();
      return;
    }

    // Multi-drag: tap on element already in multi-selection
    if (selectedIds.has(id) && selectedIds.size > 1) {
      mobileTouchOnElement = true;
      isPanning = false;
      const canvasRect = canvas.getBoundingClientRect();
      const mx = (e.clientX - canvasRect.left) / zoom;
      const my = (e.clientY - canvasRect.top) / zoom;
      multiDragOffsets = elements.filter(el => selectedIds.has(el.id)).map(el => ({
        id: el.id, offX: mx - el.x, offY: my - el.y
      }));
      saveState();
      return;
    }

    if (!selectedIds.has(id)) selectElement(id);
    mobileTouchOnElement = true;
    isPanning = false;
    multiDragOffsets = [];
    // Prepare for drag
    const canvasRect = canvas.getBoundingClientRect();
    dragOffsetX = (e.clientX - canvasRect.left) / zoom - el.x;
    dragOffsetY = (e.clientY - canvasRect.top) / zoom - el.y;
    saveState();
    return;
  }

  // Tap on empty canvas area → pan
  mobileTouchOnElement = false;
  isPanning = true;
  panStartX = e.clientX;
  panStartY = e.clientY;
  panStartPX = panX;
  panStartPY = panY;
}

function handlePointerMove(e) {
  if (!isMobile() || _pinchActive) return;

  // Check if moved enough to count as drag
  const moveDist = Math.sqrt(
    Math.pow(e.clientX - touchStartPos.x, 2) +
    Math.pow(e.clientY - touchStartPos.y, 2)
  );
  if (moveDist > 8) {
    mobileDragStarted = true;
  }

  // Rotation
  if (isRotating && selectedId) {
    const el = elements.find(el => el.id === selectedId);
    if (!el) return;
    const elDiv = canvas.querySelector(`[data-id="${selectedId}"]`);
    const rect = elDiv.getBoundingClientRect();
    let angle = Math.atan2(e.clientY - (rect.top + rect.height / 2), e.clientX - (rect.left + rect.width / 2)) * 180 / Math.PI - rotateStartAngle;
    el.rotation = ((angle % 360) + 360) % 360;
    document.getElementById('propRotation').value = Math.round(el.rotation);
    document.getElementById('propRotationNum').value = Math.round(el.rotation);
    render();
    return;
  }

  // Resize
  if (isResizing && selectedId) {
    const el = elements.find(el => el.id === selectedId);
    if (!el) return;
    const rawDx = (e.clientX - resizeStartX) / zoom;
    const rawDy = (e.clientY - resizeStartY) / zoom;
    // Rotate mouse delta into element's local coordinate space
    const cos = Math.cos(-resizeStartRot), sin = Math.sin(-resizeStartRot);
    const dx = rawDx * cos - rawDy * sin;
    const dy = rawDx * sin + rawDy * cos;
    const h = resizeHandle;
    let nW = resizeStartW, nH = resizeStartH, nX = resizeStartEX, nY = resizeStartEY;
    if (h.includes('r')) nW = Math.max(20, resizeStartW + dx);
    if (h.includes('l')) { nW = Math.max(20, resizeStartW - dx); nX = resizeStartEX + (resizeStartW - nW); }
    if (h.includes('b')) nH = Math.max(20, resizeStartH + dy);
    if (h.includes('t')) { nH = Math.max(20, resizeStartH - dy); nY = resizeStartEY + (resizeStartH - nH); }
    // Text corner handles: lock aspect ratio
    if (el.type === 'text' && 'tl tr bl br'.includes(h)) {
      const ratio = resizeStartW/resizeStartH;
      if(Math.abs(dx)>Math.abs(dy)) { nH=nW/ratio; if(h.includes('t'))nY=resizeStartEY+resizeStartH-nH; }
      else { nW=nH*ratio; if(h.includes('l'))nX=resizeStartEX+resizeStartW-nW; }
    }
    el.w = Math.round(nW); el.h = Math.round(nH); el.x = Math.round(nX); el.y = Math.round(nY);
    if (el.type === 'text' && resizeStartFontSize && 'tl tr bl br'.includes(resizeHandle)) {
      el.fontSize = Math.max(8, Math.round(resizeStartFontSize * (nH / resizeStartH)));
    }
    render();
    return;
  }

  // Bbox resize on mobile
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

  // Multi-drag on mobile
  if (mobileTouchOnElement && multiDragOffsets.length > 0 && mobileDragStarted) {
    isDragging = true;
    const canvasRect = canvas.getBoundingClientRect();
    const mx = (e.clientX - canvasRect.left) / zoom;
    const my = (e.clientY - canvasRect.top) / zoom;
    // Compute tentative positions
    const tentative = multiDragOffsets.map(off => ({ id: off.id, x: mx - off.offX, y: my - off.offY }));
    // Snap using bounding box of selection
    const cw = parseInt(document.getElementById('canvasW').value);
    const ch = parseInt(document.getElementById('canvasH').value);
    let bx1 = Infinity, by1 = Infinity, bx2 = -Infinity, by2 = -Infinity;
    tentative.forEach(t => {
      const el = elements.find(e => e.id === t.id);
      if (!el) return;
      bx1 = Math.min(bx1, t.x); by1 = Math.min(by1, t.y);
      bx2 = Math.max(bx2, t.x + el.w); by2 = Math.max(by2, t.y + el.h);
    });
    const bw = bx2 - bx1, bh = by2 - by1;
    const bcx = bx1 + bw/2, bcy = by1 + bh/2;
    let dx = 0, dy = 0;
    const snap = 16 / zoom;
    let snappedX = false, snappedY = false;
    [0.25, 0.5, 0.75].forEach(pct => {
      const gx = cw * pct, gy = ch * pct;
      if (!snappedX) {
        if (Math.abs(bcx - gx) < snap)     { dx = gx - bcx; snappedX = true; }
        else if (Math.abs(bx1 - gx) < snap) { dx = gx - bx1; snappedX = true; }
        else if (Math.abs(bx2 - gx) < snap) { dx = gx - bx2; snappedX = true; }
      }
      if (!snappedY) {
        if (Math.abs(bcy - gy) < snap)     { dy = gy - bcy; snappedY = true; }
        else if (Math.abs(by1 - gy) < snap) { dy = gy - by1; snappedY = true; }
        else if (Math.abs(by2 - gy) < snap) { dy = gy - by2; snappedY = true; }
      }
    });
    if (!snappedX && Math.abs(bx1) < snap)       { dx = -bx1; }
    if (!snappedY && Math.abs(by1) < snap)       { dy = -by1; }
    if (!snappedX && Math.abs(bx2 - cw) < snap) { dx = cw - bx2; }
    if (!snappedY && Math.abs(by2 - ch) < snap) { dy = ch - by2; }
    tentative.forEach(t => {
      const el = elements.find(e => e.id === t.id);
      if (!el || el.locked) return;
      el.x = Math.round(t.x + dx);
      el.y = Math.round(t.y + dy);
    });
    render(); return;
  }

  // Dragging single element
  if (mobileTouchOnElement && selectedId && mobileDragStarted) {
    isDragging = true;
    const el = elements.find(el => el.id === selectedId);
    if (!el) return;
    const canvasRect = canvas.getBoundingClientRect();
    let nX = (e.clientX - canvasRect.left) / zoom - dragOffsetX;
    let nY = (e.clientY - canvasRect.top) / zoom - dragOffsetY;
    const cw = parseInt(document.getElementById('canvasW').value);
    const ch = parseInt(document.getElementById('canvasH').value);
    // Snap — same logic as desktop with larger threshold for touch
    const snap = 16 / zoom;
    let snappedX = false, snappedY = false;
    const elCx = nX + el.w/2, elCy = nY + el.h/2;
    const elR = nX + el.w, elB = nY + el.h;
    // Guide snapping: element center, left edge, right edge to 25%/50%/75%
    [0.25, 0.5, 0.75].forEach(pct => {
      const gx = cw * pct, gy = ch * pct;
      if (!snappedX) {
        if (Math.abs(elCx - gx) < snap)    { nX = gx - el.w/2; snappedX = true; }
        else if (Math.abs(nX - gx) < snap)  { nX = gx; snappedX = true; }
        else if (Math.abs(elR - gx) < snap) { nX = gx - el.w; snappedX = true; }
      }
      if (!snappedY) {
        if (Math.abs(elCy - gy) < snap)    { nY = gy - el.h/2; snappedY = true; }
        else if (Math.abs(nY - gy) < snap)  { nY = gy; snappedY = true; }
        else if (Math.abs(elB - gy) < snap) { nY = gy - el.h; snappedY = true; }
      }
    });
    // Edge snapping: element edges to canvas edges
    if (!snappedX && Math.abs(nX) < snap)       { nX = 0; snappedX = true; }
    if (!snappedY && Math.abs(nY) < snap)       { nY = 0; snappedY = true; }
    if (!snappedX && Math.abs(elR - cw) < snap) { nX = cw - el.w; }
    if (!snappedY && Math.abs(elB - ch) < snap) { nY = ch - el.h; }
    el.x = Math.round(nX);
    el.y = Math.round(nY);
    render();
    return;
  }

  // Panning
  if (isPanning) {
    panX = panStartPX + (e.clientX - panStartX);
    panY = panStartPY + (e.clientY - panStartY);
    updateCanvasTransform();
    return;
  }
}

function handlePointerUp(e) {
  if (!isMobile()) return;

  canvasArea.releasePointerCapture(e.pointerId);
  const elapsed = Date.now() - touchStartTime;

  // If it was a quick tap (not drag, not long press)
  if (!mobileDragStarted && elapsed < 300 && !isRotating && !isResizing) {
    if (!mobileTouchOnElement) {
      deselectAll();
      updateMobileContextBar();
    }
  }

  if (isBboxResizing) {
    isBboxResizing = false;
    bboxOriginals = [];
    bboxOrigRect = null;
  }
  isDragging = false;
  isResizing = false;
  isRotating = false;
  isPanning = false;
  mobileDragStarted = false;
  multiDragOffsets = [];
  mobileTouchOnElement = false;
}

// ═══ DOUBLE TAP DETECTION ═══
canvasArea.addEventListener('pointerup', (e) => {
  if (!isMobile()) return;
  const now = Date.now();
  if (now - lastTapTime < 300 && !mobileDragStarted) {
    // Double tap
    const target = document.elementFromPoint(e.clientX, e.clientY);
    const elDiv = target?.closest('.canvas-element');
    if (elDiv) {
      const el = elements.find(el => el.id === elDiv.dataset.id);
      if (el) {
        if (el.type === 'text') {
          startEditing(elDiv, el);
        } else if (el.type !== 'image' && el.type !== 'line') {
          addClipImage(el.id);
        }
      }
    } else if (!target?.closest('#canvas')) {
      centerCanvas();
    }
  }
  lastTapTime = now;
});

// ═══ MOBILE ZOOM INDICATOR ═══
function showMobileZoom() {
  const indicator = document.getElementById('mobileZoomIndicator');
  if (!indicator) return;
  indicator.textContent = Math.round(zoom * 100) + '%';
  indicator.classList.add('visible');
  indicator.classList.remove('fading');
  clearTimeout(mobileZoomTimeout);
  mobileZoomTimeout = setTimeout(() => {
    indicator.classList.add('fading');
    setTimeout(() => {
      indicator.classList.remove('visible', 'fading');
    }, 300);
  }, 800);
}

// ═══ MOBILE SHEET MANAGEMENT ═══
function mobileOpenSheet(name) {
  if (!isMobile()) return;

  // If same sheet, toggle close
  if (mobileSheetOpen === name) { mobileCloseSheet(); return; }

  mobileSheetOpen = name;

  // Update tab active state
  document.querySelectorAll('.mobile-nav-btn').forEach(b => b.classList.remove('active'));
  const tabBtn = document.querySelector(`[data-mobile-tab="${name}"]`);
  if (tabBtn) tabBtn.classList.add('active');

  // Show overlay + sheet
  const overlay = document.getElementById('mobileSheetOverlay');
  const sheet = document.getElementById('mobileSheet');
  const content = document.getElementById('mobileSheetContent');

  overlay.classList.add('visible');
  sheet.classList.add('visible');
  sheet.style.transform = 'translateY(100%)';
  // Force reflow then animate
  sheet.offsetHeight;
  sheet.style.transform = 'translateY(0)';

  // Populate content
  content.innerHTML = getMobileSheetContent(name);
}

function mobileCloseSheet() {
  mobileSheetOpen = null;
  document.querySelectorAll('.mobile-nav-btn').forEach(b => b.classList.remove('active'));

  const overlay = document.getElementById('mobileSheetOverlay');
  const sheet = document.getElementById('mobileSheet');
  if (overlay) overlay.classList.remove('visible');
  if (sheet) {
    sheet.style.transform = 'translateY(100%)';
    setTimeout(() => sheet.classList.remove('visible'), 300);
  }
}

function getMobileSheetContent(name) {
  switch (name) {
    case 'elements':
      return getMobileElementsContent();
    case 'text':
      return getMobileTextContent();
    case 'uploads':
      return getMobileUploadsContent();
    case 'layers':
      return getMobileLayersContent();
    case 'properties':
      return getMobilePropertiesContent();
    case 'templates':
      return getMobileTemplatesContent();
    default:
      return '';
  }
}

function getMobileElementsContent() {
  return `
    <h3 style="font-size:14px;font-weight:600;color:#e0e0f0;margin-bottom:12px;">Elements</h3>
    <p style="font-size:10px;color:#7a7a9a;text-transform:uppercase;letter-spacing:2px;margin-bottom:8px;">Basic</p>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:16px;">
      <button onclick="addRect(); mobileCloseSheet()" class="shape-btn" title="Rectangle"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/></svg></button>
      <button onclick="addCircle(); mobileCloseSheet()" class="shape-btn" title="Circle"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/></svg></button>
      <button onclick="addTriangle(); mobileCloseSheet()" class="shape-btn" title="Triangle"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 22h20L12 2z"/></svg></button>
      <button onclick="addLine(); mobileCloseSheet()" class="shape-btn" title="Line"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="5" y1="19" x2="19" y2="5"/></svg></button>
    </div>
    <p style="font-size:10px;color:#7a7a9a;text-transform:uppercase;letter-spacing:2px;margin-bottom:8px;">Shapes</p>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:16px;">
      <button onclick="addStar(); mobileCloseSheet()" class="shape-btn"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></button>
      <button onclick="addHexagon(); mobileCloseSheet()" class="shape-btn"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 21 7 21 17 12 22 3 17 3 7"/></svg></button>
      <button onclick="addPentagon(); mobileCloseSheet()" class="shape-btn"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 22 9 18 21 6 21 2 9"/></svg></button>
      <button onclick="addDiamond(); mobileCloseSheet()" class="shape-btn"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 22 12 12 22 2 12"/></svg></button>
      <button onclick="addArrow(); mobileCloseSheet()" class="shape-btn"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 8h10V4l6 8-6 8v-4H5V8z"/></svg></button>
      <button onclick="addHeart(); mobileCloseSheet()" class="shape-btn"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></button>
      <button onclick="addCross(); mobileCloseSheet()" class="shape-btn"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3z"/></svg></button>
      <button onclick="addRoundedRect(); mobileCloseSheet()" class="shape-btn"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="6"/></svg></button>
    </div>
    <p style="font-size:10px;color:#7a7a9a;text-transform:uppercase;letter-spacing:2px;margin-bottom:8px;">More</p>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;">
      <button onclick="addOval(); mobileCloseSheet()" class="shape-btn"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="12" cy="12" rx="10" ry="7"/></svg></button>
      <button onclick="addOctagon(); mobileCloseSheet()" class="shape-btn"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="7.2 2 16.8 2 22 7.2 22 16.8 16.8 22 7.2 22 2 16.8 2 7.2"/></svg></button>
      <button onclick="addShield(); mobileCloseSheet()" class="shape-btn"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2l9 3v7c0 5-4 9-9 11C6 21 2 17 2 12V5l10-3z"/></svg></button>
      <button onclick="addLightning(); mobileCloseSheet()" class="shape-btn"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></button>
      <button onclick="addSpeechBubble(); mobileCloseSheet()" class="shape-btn"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 2h20v14H14l-4 6v-6H2V2z"/></svg></button>
      <button onclick="addChevron(); mobileCloseSheet()" class="shape-btn"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="2 2 16 2 22 12 16 22 2 22 8 12"/></svg></button>
      <button onclick="addStar6(); mobileCloseSheet()" class="shape-btn"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15 7 21 7 18 12 21 17 15 17 12 22 9 17 3 17 6 12 3 7 9 7"/></svg></button>
      <button onclick="addRibbon(); mobileCloseSheet()" class="shape-btn"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="3 2 21 2 21 18 12 22 3 18"/></svg></button>
    </div>
    <p style="font-size:10px;color:#7a7a9a;text-transform:uppercase;letter-spacing:2px;margin:14px 0 8px;">Decorative</p>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:16px;">
      <button onclick="addExtra('crescent'); mobileCloseSheet()" class="shape-btn"><svg width="28" height="28" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3"><path d="M70 2A48 48 0 1 0 70 98A33 33 0 1 1 70 2Z"/></svg></button>
      <button onclick="addExtra('moon'); mobileCloseSheet()" class="shape-btn"><svg width="28" height="28" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3"><path d="M40 5A45 45 0 1 0 40 95A50 50 0 0 1 40 5Z"/></svg></button>
      <button onclick="addExtra('teardrop'); mobileCloseSheet()" class="shape-btn"><svg width="28" height="28" viewBox="0 0 100 120" fill="none" stroke="currentColor" stroke-width="3"><path d="M50 5C30 30 10 55 10 75A40 40 0 0 0 90 75C90 55 70 30 50 5Z"/></svg></button>
      <button onclick="addExtra('cloud'); mobileCloseSheet()" class="shape-btn"><svg width="28" height="28" viewBox="0 0 100 80" fill="none" stroke="currentColor" stroke-width="3"><path d="M25 68L20 68A17 17 0 0 1 18 35A22 22 0 0 1 48 15A22 22 0 0 1 78 18A17 17 0 0 1 82 35A17 17 0 0 1 80 68Z"/></svg></button>
      <button onclick="addExtra('ring'); mobileCloseSheet()" class="shape-btn"><svg width="28" height="28" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3"><circle cx="50" cy="50" r="46"/><circle cx="50" cy="50" r="26"/></svg></button>
      <button onclick="addExtra('leaf'); mobileCloseSheet()" class="shape-btn"><svg width="28" height="28" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3"><path d="M50 95C22 75 5 50 12 25C20 5 42 0 50 0C58 0 80 5 88 25C95 50 78 75 50 95Z"/></svg></button>
      <button onclick="addExtra('wave'); mobileCloseSheet()" class="shape-btn"><svg width="28" height="28" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3"><path d="M0 55C18 25 35 25 50 50C65 75 82 75 100 45L100 100L0 100Z"/></svg></button>
      <button onclick="addExtra('flower'); mobileCloseSheet()" class="shape-btn"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="5" r="3"/><circle cx="17.2" cy="8" r="3"/><circle cx="17.2" cy="16" r="3"/><circle cx="12" cy="19" r="3"/><circle cx="6.8" cy="16" r="3"/><circle cx="6.8" cy="8" r="3"/></svg></button>
    </div>
    <p style="font-size:10px;color:#7a7a9a;text-transform:uppercase;letter-spacing:2px;margin-bottom:8px;">Symbols & Badges</p>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:16px;">
      <button onclick="addExtra('pin'); mobileCloseSheet()" class="shape-btn"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></button>
      <button onclick="addExtra('eye'); mobileCloseSheet()" class="shape-btn"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
      <button onclick="addExtra('chatRound'); mobileCloseSheet()" class="shape-btn"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></button>
      <button onclick="addExtra('xMark'); mobileCloseSheet()" class="shape-btn"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg></button>
      <button onclick="addExtra('starburst'); mobileCloseSheet()" class="shape-btn"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12,1 14,7 18,3 16,9 22,8 17,12 22,16 16,15 18,21 14,17 12,23 10,17 6,21 8,15 2,16 7,12 2,8 8,9 6,3 10,7"/></svg></button>
      <button onclick="addExtra('explosion'); mobileCloseSheet()" class="shape-btn"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12,1 15,8 22,5 17,11 23,12 17,13 22,19 15,16 12,23 9,16 2,19 7,13 1,12 7,11 2,5 9,8"/></svg></button>
      <button onclick="addExtra('tag'); mobileCloseSheet()" class="shape-btn"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 3h15l5 9-5 9H2z"/><circle cx="7" cy="12" r="1.5"/></svg></button>
      <button onclick="addExtra('bannerH'); mobileCloseSheet()" class="shape-btn"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="2,3 22,3 24,12 22,21 2,21 0,12"/></svg></button>
    </div>
    <p style="font-size:10px;color:#7a7a9a;text-transform:uppercase;letter-spacing:2px;margin-bottom:8px;">Nature & Objects</p>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;">
      <button onclick="addExtra('arrowUp'); mobileCloseSheet()" class="shape-btn"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L3 11h5v11h8V11h5L12 2z"/></svg></button>
      <button onclick="addExtra('arrowDown'); mobileCloseSheet()" class="shape-btn"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22L3 13h5V2h8v11h5L12 22z"/></svg></button>
      <button onclick="addExtra('mountain'); mobileCloseSheet()" class="shape-btn"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="1,22 7,6 11,14 16,3 20,12 23,22"/></svg></button>
      <button onclick="addExtra('house'); mobileCloseSheet()" class="shape-btn"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 12l9-9 9 9"/><path d="M5 10v10h5v-6h4v6h5V10"/></svg></button>
      <button onclick="addExtra('tree'); mobileCloseSheet()" class="shape-btn"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12,2 20,10 16,10 22,17 8,17 14,10 8,10 12,2"/><rect x="10" y="17" width="4" height="5"/></svg></button>
      <button onclick="addExtra('sun'); mobileCloseSheet()" class="shape-btn"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg></button>
      <button onclick="addExtra('doubleArrow'); mobileCloseSheet()" class="shape-btn"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M0 12L5 5v4h14V5l5 7-5 7v-4H5v4L0 12z"/></svg></button>
    </div>`;
}

function getMobileTemplatesContent() {
  const groups = {};
  TEMPLATES.forEach(tpl => {
    if (!groups[tpl.category]) groups[tpl.category] = [];
    groups[tpl.category].push(tpl);
  });
  let html = '<h3 style="font-size:14px;font-weight:600;color:#e0e0f0;margin-bottom:12px;">Templates</h3>';
  const catColors = { 'Social Media':'#E1306C','Business':'#0A66C2','Marketing':'#00b894','Personal':'#6c5ce7','Presentation':'#fdcb6e','Print':'#e17055','Instagram Reels':'#E1306C' };
  for (const [category, templates] of Object.entries(groups)) {
    const cc = catColors[category] || '#6c5ce7';
    html += `<div style="display:flex;align-items:center;gap:6px;margin:14px 0 8px;">
      <div style="width:8px;height:8px;border-radius:50%;background:${cc}"></div>
      <span style="font-size:11px;font-weight:600;color:#b0b0cc;text-transform:uppercase;letter-spacing:1px;">${category}</span>
    </div>`;
    html += '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:6px;">';
    templates.forEach(tpl => {
      html += `<div onclick="applyTemplate('${tpl.id}')" style="background:#1c1c28;border:1px solid #252535;border-radius:10px;padding:12px;cursor:pointer;">
        <div style="font-size:12px;font-weight:600;color:#e0e0f0;margin-bottom:3px;">${tpl.name}</div>
        <div style="font-size:10px;color:#7a7a9a;font-family:monospace;margin-bottom:4px;">${tpl.canvasW}×${tpl.canvasH}</div>
        <div style="font-size:10px;color:#4a4a6a;">${tpl.description}</div>
      </div>`;
    });
    html += '</div>';
  }
  return html;
}

function getMobileTextContent() {
  // --- Text style presets as visual cards ---
  const presetCards = `
    <div style="display:flex;gap:10px;overflow-x:auto;padding-bottom:14px;-webkit-overflow-scrolling:touch;scroll-snap-type:x mandatory;">
      <!-- Heading card -->
      <div onclick="addHeading(); mobileCloseSheet()" style="scroll-snap-align:start;min-width:150px;flex-shrink:0;background:linear-gradient(135deg,#1c1c28 0%,#252535 100%);border:1px solid #252535;border-radius:14px;padding:20px 16px;cursor:pointer;display:flex;flex-direction:column;justify-content:space-between;height:120px;">
        <span style="font-size:24px;font-weight:700;color:#e0e0f0;line-height:1.1;font-family:'DM Sans',sans-serif;">Add a<br>heading</span>
        <span style="font-size:9px;color:#4a4a6a;text-transform:uppercase;letter-spacing:1.5px;">48px Bold</span>
      </div>
      <!-- Subheading card -->
      <div onclick="addSubheading(); mobileCloseSheet()" style="scroll-snap-align:start;min-width:150px;flex-shrink:0;background:linear-gradient(135deg,#161620 0%,#1c1c28 100%);border:1px solid #252535;border-radius:14px;padding:20px 16px;cursor:pointer;display:flex;flex-direction:column;justify-content:space-between;height:120px;">
        <span style="font-size:17px;font-weight:600;color:#b0b0cc;line-height:1.2;font-family:'DM Sans',sans-serif;">Add a<br>subheading</span>
        <span style="font-size:9px;color:#4a4a6a;text-transform:uppercase;letter-spacing:1.5px;">28px Semi</span>
      </div>
      <!-- Body card -->
      <div onclick="addBodyText(); mobileCloseSheet()" style="scroll-snap-align:start;min-width:150px;flex-shrink:0;background:linear-gradient(135deg,#111118 0%,#1c1c28 100%);border:1px solid #252535;border-radius:14px;padding:20px 16px;cursor:pointer;display:flex;flex-direction:column;justify-content:space-between;height:120px;">
        <span style="font-size:13px;font-weight:400;color:#7a7a9a;line-height:1.4;font-family:'DM Sans',sans-serif;">Add body text<br>for paragraphs</span>
        <span style="font-size:9px;color:#4a4a6a;text-transform:uppercase;letter-spacing:1.5px;">16px Regular</span>
      </div>
    </div>`;

  // --- CTA button ---
  const ctaBtn = `
    <button onclick="addText(); mobileCloseSheet()" style="width:100%;background:#6c5ce7;color:#fff;border:none;border-radius:12px;padding:14px;font-size:14px;font-weight:600;margin-bottom:20px;font-family:'DM Sans',sans-serif;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;-webkit-tap-highlight-color:transparent;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      Add text box
    </button>`;

  // --- Font combination suggestions ---
  const combos = [
    { heading: 'Playfair Display', body: 'DM Sans', label: 'Classic Elegant' },
    { heading: 'Bebas Neue', body: 'Open Sans', label: 'Bold Modern' },
    { heading: 'Poppins', body: 'Inter', label: 'Clean Minimal' },
    { heading: 'Lobster', body: 'Quicksand', label: 'Fun Playful' },
    { heading: 'Montserrat', body: 'Merriweather', label: 'Professional' },
  ];
  const comboCards = `
    <p style="font-size:10px;color:#7a7a9a;text-transform:uppercase;letter-spacing:2px;margin-bottom:10px;">Font Combinations</p>
    <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:14px;-webkit-overflow-scrolling:touch;scroll-snap-type:x mandatory;">
      ${combos.map(c => `
        <div onclick="addTextCombo('${c.heading}','${c.body}'); mobileCloseSheet()" style="scroll-snap-align:start;min-width:140px;flex-shrink:0;background:#1c1c28;border:1px solid #252535;border-radius:12px;padding:14px;cursor:pointer;-webkit-tap-highlight-color:transparent;">
          <div style="font-family:'${c.heading}',sans-serif;font-size:16px;font-weight:700;color:#e0e0f0;margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Heading</div>
          <div style="font-family:'${c.body}',sans-serif;font-size:11px;color:#7a7a9a;margin-bottom:10px;">Body text preview</div>
          <div style="font-size:9px;color:#6c5ce7;font-weight:500;">${c.label}</div>
        </div>
      `).join('')}
    </div>`;

  // --- Category tabs for fonts ---
  const categories = ['All', ...Object.keys(FONT_LIST)];
  const tabs = `
    <p style="font-size:10px;color:#7a7a9a;text-transform:uppercase;letter-spacing:2px;margin-bottom:10px;">Browse Fonts</p>
    <div style="display:flex;gap:6px;overflow-x:auto;margin-bottom:12px;-webkit-overflow-scrolling:touch;padding-bottom:4px;" id="mobileFontTabs">
      ${categories.map(cat => `
        <button onclick="mobileSetFontCategory('${cat}')" data-font-cat="${cat}" style="flex-shrink:0;padding:6px 14px;border-radius:20px;font-size:12px;font-family:'DM Sans',sans-serif;cursor:pointer;border:1px solid ${mobileTextFontCategory === cat ? '#6c5ce7' : '#252535'};background:${mobileTextFontCategory === cat ? 'rgba(108,92,231,0.15)' : '#1c1c28'};color:${mobileTextFontCategory === cat ? '#a29bfe' : '#7a7a9a'};-webkit-tap-highlight-color:transparent;">${cat}</button>
      `).join('')}
    </div>`;

  // --- Font list filtered by category ---
  const fontsToShow = mobileTextFontCategory === 'All' ? ALL_FONTS : (FONT_LIST[mobileTextFontCategory] || ALL_FONTS);
  const fontList = `
    <div style="max-height:220px;overflow-y:auto;-webkit-overflow-scrolling:touch;" id="mobileFontList">
      ${fontsToShow.map(f => `
        <div onclick="addTextWithFont('${f}'); mobileCloseSheet()" style="display:flex;align-items:center;justify-content:space-between;padding:12px;margin-bottom:4px;border-radius:10px;background:#1c1c28;border:1px solid #252535;cursor:pointer;min-height:48px;-webkit-tap-highlight-color:transparent;">
          <span style="font-family:'${f}',sans-serif;font-size:16px;color:#e0e0f0;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${f}</span>
          <span style="font-family:'${f}',sans-serif;font-size:13px;color:#4a4a6a;flex-shrink:0;margin-left:8px;">Aa</span>
        </div>
      `).join('')}
    </div>`;

  return `
    <h3 style="font-size:14px;font-weight:600;color:#e0e0f0;margin-bottom:14px;">Text</h3>
    ${ctaBtn}
    <p style="font-size:10px;color:#7a7a9a;text-transform:uppercase;letter-spacing:2px;margin-bottom:10px;">Text Styles</p>
    ${presetCards}
    ${comboCards}
    ${tabs}
    ${fontList}`;
}

function getMobileUploadsContent() {
  return `
    <h3 style="font-size:14px;font-weight:600;color:#e0e0f0;margin-bottom:12px;">Upload</h3>
    <button onclick="addImage(); mobileCloseSheet()" style="width:100%;background:#6c5ce7;color:#fff;border:none;border-radius:10px;padding:16px;font-size:14px;font-weight:600;margin-bottom:10px;font-family:'DM Sans',sans-serif;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
      Upload Image
    </button>
    <p style="font-size:12px;color:#7a7a9a;text-align:center;">Tap to upload an image from your device</p>`;
}

function getMobileLayersContent() {
  const reversed = [...elements].reverse();
  if (reversed.length === 0) {
    return `
      <h3 style="font-size:14px;font-weight:600;color:#e0e0f0;margin-bottom:12px;">Layers</h3>
      <p style="font-size:13px;color:#7a7a9a;text-align:center;padding:24px;">No elements yet. Add shapes or text to see layers here.</p>`;
  }
  const icons = { text: 'T', rect: '■', line: '━', triangle: '△', star: '★', image: '🖼', hexagon: '⬡', pentagon: '⬠', diamond: '◆', arrow: '➜', heart: '♥', cross: '✚', octagon: '⯃', parallelogram: '▱', trapezoid: '⏢', chevron: '›', arrowLeft: '←', speechBubble: '💬', shield: '🛡', semicircle: '◗', lightning: '⚡', ribbon: '🎗', star6: '✡', star8: '✳', rhombus: '◇' };
  let html = `<h3 style="font-size:14px;font-weight:600;color:#e0e0f0;margin-bottom:12px;">Layers</h3>`;
  reversed.forEach((el) => {
    const icon = icons[el.type] || '■';
    const isActive = el.id === selectedId;
    html += `<div onclick="selectElement('${el.id}'); mobileCloseSheet()" style="display:flex;align-items:center;gap:10px;padding:12px;border-radius:8px;margin-bottom:4px;cursor:pointer;min-height:44px;${isActive ? 'background:rgba(108,92,231,0.12);border-left:3px solid #6c5ce7;' : 'background:#1c1c28;border-left:3px solid transparent;'}">
      <span style="font-size:16px;width:24px;text-align:center;color:#7a7a9a;">${icon}</span>
      <span style="flex:1;font-size:13px;color:${isActive ? '#a29bfe' : '#b0b0cc'};overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${el.name || el.type}</span>
      <span style="font-size:10px;color:#4a4a6a;font-family:'JetBrains Mono',monospace;">${elements.indexOf(el) + 1}</span>
    </div>`;
  });
  return html;
}

function getMobilePropertiesContent() {
  const el = selectedId ? elements.find(e => e.id === selectedId) : null;
  const S = (lbl, content) => `<div style="border-bottom:1px solid #1c1c28;padding-bottom:14px;margin-bottom:14px;"><p style="font-size:10px;color:#7a7a9a;text-transform:uppercase;letter-spacing:2px;margin-bottom:10px;">${lbl}</p>${content}</div>`;
  const I = (lbl, type, val, prop, id, extra='') => `<div><label style="font-size:10px;color:#7a7a9a;display:block;margin-bottom:4px;">${lbl}</label><input type="${type}" value="${val}" ${extra} onchange="mobileUpdateProp('${id}','${prop}',this.value)" style="width:100%;background:#1c1c28;border:1px solid #252535;border-radius:8px;padding:10px;font-size:13px;color:#e0e0f0;outline:none;font-family:'DM Sans',sans-serif;" /></div>`;
  const activeBtn = (active) => active ? 'background:rgba(108,92,231,0.2);color:#6c5ce7;border-color:#6c5ce7;' : '';

  if (!el) {
    const cw = document.getElementById('canvasW').value;
    const ch = document.getElementById('canvasH').value;
    const bg = document.getElementById('canvasBgHex')?.value || '#ffffff';
    return `
      <h3 style="font-size:14px;font-weight:600;color:#e0e0f0;margin-bottom:14px;">Canvas Properties</h3>
      ${S('Dimensions', `
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          ${I('Width','number',cw,'canvasW','__canvas__')}
          ${I('Height','number',ch,'canvasH','__canvas__')}
        </div>
      `.replace(/mobileUpdateProp\('__canvas__','canvasW',this\.value\)/g, "document.getElementById('canvasW').value=this.value;resizeCanvas()")
        .replace(/mobileUpdateProp\('__canvas__','canvasH',this\.value\)/g, "document.getElementById('canvasH').value=this.value;resizeCanvas()"))}
      ${S('Background', `
        <div style="display:flex;gap:10px;align-items:center;">
          <input type="color" value="${bg}" oninput="document.getElementById('canvasBg').value=this.value;document.getElementById('canvasBgHex').value=this.value;setCanvasBg()" style="width:48px;height:48px;border-radius:10px;border:none;cursor:pointer;" />
          <span style="font-size:12px;color:#b0b0cc;font-family:'JetBrains Mono',monospace;">${bg}</span>
        </div>
      `)}
      <button onclick="showPresetModal(); mobileCloseSheet()" style="width:100%;background:#6c5ce7;color:#fff;border:none;border-radius:10px;padding:14px;font-size:13px;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;">Change Preset Size</button>`;
  }

  let html = `<h3 style="font-size:14px;font-weight:600;color:#e0e0f0;margin-bottom:14px;">${el.name || el.type}</h3>`;
  const eid = el.id;

  // Layer Order
  const idx = elements.findIndex(e => e.id === eid);
  html += S('Layer Order', `
    <div style="display:flex;gap:6px;align-items:center;">
      <button onclick="zBringToFront(); mobileRefreshProps()" class="mobile-ctx-btn" title="Front"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="17 11 12 6 7 11"/><polyline points="17 18 12 13 7 18"/></svg></button>
      <button onclick="zMoveUp(); mobileRefreshProps()" class="mobile-ctx-btn" title="Up"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg></button>
      <button onclick="zMoveDown(); mobileRefreshProps()" class="mobile-ctx-btn" title="Down"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></button>
      <button onclick="zSendToBack(); mobileRefreshProps()" class="mobile-ctx-btn" title="Back"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="7 13 12 18 17 13"/><polyline points="7 6 12 11 17 6"/></svg></button>
      <span style="margin-left:auto;font-size:11px;color:#4a4a6a;font-family:'JetBrains Mono',monospace;">${idx + 1} / ${elements.length}</span>
    </div>
  `);

  // Transform + Alignment
  html += S('Transform', `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px;">
      ${I('X','number',Math.round(el.x),'x',eid)}
      ${I('Y','number',Math.round(el.y),'y',eid)}
      ${I('W','number',Math.round(el.w),'w',eid)}
      ${I('H','number',Math.round(el.h),'h',eid)}
    </div>
    <div style="margin-bottom:10px;">
      <label style="font-size:10px;color:#7a7a9a;display:block;margin-bottom:4px;">Rotation: ${Math.round(el.rotation || 0)}°</label>
      <input type="range" min="0" max="360" value="${el.rotation || 0}" oninput="mobileUpdateProp('${eid}','rotation',this.value)" style="width:100%;" />
    </div>
    <label style="font-size:10px;color:#7a7a9a;display:block;margin-bottom:6px;">Align on Canvas</label>
    <div style="display:flex;gap:6px;flex-wrap:wrap;">
      <button onclick="alignElement('left'); mobileRefreshProps()" class="mobile-ctx-btn" style="padding:0 8px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="2" x2="4" y2="22"/><rect x="8" y="6" width="12" height="4"/><rect x="8" y="14" width="8" height="4"/></svg></button>
      <button onclick="alignElement('centerH'); mobileRefreshProps()" class="mobile-ctx-btn" style="padding:0 8px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="2" x2="12" y2="22"/><rect x="4" y="6" width="16" height="4"/><rect x="6" y="14" width="12" height="4"/></svg></button>
      <button onclick="alignElement('right'); mobileRefreshProps()" class="mobile-ctx-btn" style="padding:0 8px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="20" y1="2" x2="20" y2="22"/><rect x="4" y="6" width="12" height="4"/><rect x="8" y="14" width="8" height="4"/></svg></button>
      <button onclick="alignElement('top'); mobileRefreshProps()" class="mobile-ctx-btn" style="padding:0 8px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="2" y1="4" x2="22" y2="4"/><rect x="6" y="8" width="4" height="12"/><rect x="14" y="8" width="4" height="8"/></svg></button>
      <button onclick="alignElement('centerV'); mobileRefreshProps()" class="mobile-ctx-btn" style="padding:0 8px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="2" y1="12" x2="22" y2="12"/><rect x="6" y="4" width="4" height="16"/><rect x="14" y="6" width="4" height="12"/></svg></button>
      <button onclick="alignElement('bottom'); mobileRefreshProps()" class="mobile-ctx-btn" style="padding:0 8px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="2" y1="20" x2="22" y2="20"/><rect x="6" y="4" width="4" height="12"/><rect x="14" y="8" width="4" height="8"/></svg></button>
    </div>
  `);

  // Fill & Opacity
  html += S('Fill', `
    <div style="display:flex;gap:10px;align-items:center;margin-bottom:10px;">
      <input type="color" value="${el.fill === 'transparent' ? '#ffffff' : el.fill}" oninput="mobileUpdateProp('${eid}','fill',this.value)" style="width:48px;height:48px;border-radius:10px;border:none;cursor:pointer;" />
      <span style="font-size:12px;color:#b0b0cc;font-family:'JetBrains Mono',monospace;">${el.fill}</span>
    </div>
    <label style="font-size:10px;color:#7a7a9a;display:block;margin-bottom:4px;">Opacity: ${el.opacity || 100}%</label>
    <input type="range" min="0" max="100" value="${el.opacity || 100}" oninput="mobileUpdateProp('${eid}','opacity',this.value)" style="width:100%;" />
  `);

  // Border (full)
  html += S('Border', `
    <div style="display:flex;gap:10px;align-items:center;margin-bottom:10px;">
      <input type="color" value="${el.borderColor || '#000000'}" oninput="mobileUpdateProp('${eid}','borderColor',this.value)" style="width:48px;height:48px;border-radius:10px;border:none;cursor:pointer;" />
      <span style="font-size:12px;color:#b0b0cc;font-family:'JetBrains Mono',monospace;">${el.borderColor || '#000000'}</span>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px;">
      ${I('Width','number',el.borderWidth || 0,'borderWidth',eid,'min="0"')}
      <div>
        <label style="font-size:10px;color:#7a7a9a;display:block;margin-bottom:4px;">Style</label>
        <select onchange="mobileUpdateProp('${eid}','borderStyle',this.value)" style="width:100%;background:#1c1c28;border:1px solid #252535;border-radius:8px;padding:10px;font-size:13px;color:#e0e0f0;outline:none;font-family:'DM Sans',sans-serif;">
          <option value="solid" ${(el.borderStyle||'solid')==='solid'?'selected':''}>Solid</option>
          <option value="dashed" ${el.borderStyle==='dashed'?'selected':''}>Dashed</option>
          <option value="dotted" ${el.borderStyle==='dotted'?'selected':''}>Dotted</option>
          <option value="double" ${el.borderStyle==='double'?'selected':''}>Double</option>
        </select>
      </div>
    </div>
    <label style="font-size:10px;color:#7a7a9a;display:block;margin-bottom:4px;">Radius: ${el.borderRadius || 0}</label>
    <input type="range" min="0" max="200" value="${el.borderRadius || 0}" oninput="mobileUpdateProp('${eid}','borderRadius',this.value)" style="width:100%;" />
  `);

  // Shadow (full)
  html += S('Shadow', `
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:10px;">
      ${I('X','number',el.shadowX || 0,'shadowX',eid)}
      ${I('Y','number',el.shadowY || 0,'shadowY',eid)}
      ${I('Blur','number',el.shadowBlur || 0,'shadowBlur',eid,'min="0"')}
    </div>
    <div style="display:flex;gap:10px;align-items:center;margin-bottom:6px;">
      <input type="color" value="${el.shadowColor || '#000000'}" oninput="mobileUpdateProp('${eid}','shadowColor',this.value)" style="width:40px;height:40px;border-radius:8px;border:none;cursor:pointer;" />
      <span style="font-size:10px;color:#7a7a9a;">Color</span>
      <div style="flex:1;"></div>
      <span style="font-size:10px;color:#7a7a9a;">Opacity</span>
      <input type="number" value="${el.shadowOpacity || 25}" min="0" max="100" onchange="mobileUpdateProp('${eid}','shadowOpacity',this.value)" style="width:54px;background:#1c1c28;border:1px solid #252535;border-radius:8px;padding:8px;font-size:12px;color:#e0e0f0;outline:none;text-align:center;" />
      <span style="font-size:10px;color:#7a7a9a;">%</span>
    </div>
  `);

  // Text properties (full)
  if (el.type === 'text') {
    html += S('Typography', `
      <div style="margin-bottom:10px;">
        <label style="font-size:10px;color:#7a7a9a;display:block;margin-bottom:4px;">Font Family</label>
        <select onchange="mobileUpdateProp('${eid}','fontFamily',this.value)" style="width:100%;background:#1c1c28;border:1px solid #252535;border-radius:8px;padding:10px;font-size:13px;color:#e0e0f0;outline:none;">
          ${Object.entries(FONT_LIST).map(([cat, fonts]) => `<optgroup label="${cat}">${fonts.map(f => `<option value="${f}" ${el.fontFamily === f ? 'selected' : ''} style="font-family:'${f}',sans-serif">${f}</option>`).join('')}</optgroup>`).join('')}
        </select>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px;">
        ${I('Size','number',el.fontSize || 24,'fontSize',eid,'min="1"')}
        <div>
          <label style="font-size:10px;color:#7a7a9a;display:block;margin-bottom:4px;">Weight</label>
          <select onchange="mobileUpdateProp('${eid}','fontWeight',this.value)" style="width:100%;background:#1c1c28;border:1px solid #252535;border-radius:8px;padding:10px;font-size:13px;color:#e0e0f0;outline:none;">
            <option value="300" ${el.fontWeight==='300'?'selected':''}>Light</option>
            <option value="400" ${el.fontWeight==='400'?'selected':''}>Regular</option>
            <option value="500" ${el.fontWeight==='500'?'selected':''}>Medium</option>
            <option value="600" ${el.fontWeight==='600'?'selected':''}>SemiBold</option>
            <option value="700" ${el.fontWeight==='700'?'selected':''}>Bold</option>
          </select>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px;">
        ${I('Line Height','number',el.lineHeight || 1.4,'lineHeight',eid,'min="0.5" max="4" step="0.1"')}
        ${I('Letter Spacing','number',el.letterSpacing || 0,'letterSpacing',eid,'step="0.5"')}
      </div>
      <label style="font-size:10px;color:#7a7a9a;display:block;margin-bottom:6px;">Style</label>
      <div style="display:flex;gap:6px;margin-bottom:10px;">
        <button onclick="mobileToggleStyle('${eid}','bold')" class="mobile-ctx-btn" style="${activeBtn(el.bold)}font-weight:700;">B</button>
        <button onclick="mobileToggleStyle('${eid}','italic')" class="mobile-ctx-btn" style="${activeBtn(el.italic)}font-style:italic;">I</button>
        <button onclick="mobileToggleStyle('${eid}','underline')" class="mobile-ctx-btn" style="${activeBtn(el.underline)}text-decoration:underline;">U</button>
        <button onclick="mobileToggleStyle('${eid}','lineThrough')" class="mobile-ctx-btn" style="${activeBtn(el.lineThrough)}text-decoration:line-through;">S</button>
      </div>
      <label style="font-size:10px;color:#7a7a9a;display:block;margin-bottom:6px;">Alignment</label>
      <div style="display:flex;gap:6px;margin-bottom:10px;">
        <button onclick="mobileUpdateProp('${eid}','textAlign','left')" class="mobile-ctx-btn" style="${activeBtn(el.textAlign==='left')}padding:0 10px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="18" y2="18"/></svg></button>
        <button onclick="mobileUpdateProp('${eid}','textAlign','center')" class="mobile-ctx-btn" style="${activeBtn(el.textAlign==='center')}padding:0 10px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg></button>
        <button onclick="mobileUpdateProp('${eid}','textAlign','right')" class="mobile-ctx-btn" style="${activeBtn(el.textAlign==='right')}padding:0 10px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="9" y1="12" x2="21" y2="12"/><line x1="6" y1="18" x2="21" y2="18"/></svg></button>
      </div>
      <div style="margin-bottom:4px;">
        <label style="font-size:10px;color:#7a7a9a;display:block;margin-bottom:4px;">Text Color</label>
        <div style="display:flex;gap:10px;align-items:center;">
          <input type="color" value="${el.textColor || '#000000'}" oninput="mobileUpdateProp('${eid}','textColor',this.value)" style="width:48px;height:48px;border-radius:10px;border:none;cursor:pointer;" />
          <span style="font-size:12px;color:#b0b0cc;font-family:'JetBrains Mono',monospace;">${el.textColor || '#000000'}</span>
        </div>
      </div>
    `);
  }

  // Image controls
  if (el.type === 'image') {
    html += S('Image', `
      <div style="display:flex;gap:8px;margin-bottom:8px;">
        <button onclick="openImageEdit()" class="mobile-ctx-btn" style="flex:1;">Edit Filters</button>
        <button onclick="flipH(); mobileRefreshProps()" class="mobile-ctx-btn">Flip H</button>
        <button onclick="flipV(); mobileRefreshProps()" class="mobile-ctx-btn">Flip V</button>
      </div>
    `);
  }

  // Shape clip image
  if (el.type !== 'text' && el.type !== 'image' && el.type !== 'line') {
    html += S('Image Fill', el.clipImage
      ? `<button onclick="removeClipImage('${eid}'); mobileRefreshProps()" style="width:100%;background:rgba(225,112,85,0.1);color:#e17055;border:1px solid rgba(225,112,85,0.3);border-radius:10px;padding:12px;font-size:13px;font-family:'DM Sans',sans-serif;cursor:pointer;">Remove Image from Shape</button>`
      : `<button onclick="addClipImage('${eid}')" style="width:100%;background:#1c1c28;color:#b0b0cc;border:1px solid #252535;border-radius:10px;padding:12px;font-size:13px;font-family:'DM Sans',sans-serif;cursor:pointer;">Add Image Inside Shape</button>`
    );
  }

  // Actions row
  html += `
    <div style="display:flex;gap:8px;margin-top:4px;">
      <button onclick="duplicateElement('${eid}'); mobileCloseSheet()" style="flex:1;background:#1c1c28;color:#b0b0cc;border:1px solid #252535;border-radius:10px;padding:14px;font-size:13px;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;">Duplicate</button>
      <button onclick="deleteElement('${eid}'); mobileCloseSheet()" style="flex:1;background:rgba(225,112,85,0.1);color:#e17055;border:1px solid rgba(225,112,85,0.3);border-radius:10px;padding:14px;font-size:13px;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;">Delete</button>
    </div>`;

  return html;
}

function mobileRefreshProps() {
  const content = document.getElementById('mobileSheetContent');
  if (content && mobileSheetOpen === 'properties') {
    content.innerHTML = getMobilePropertiesContent();
  }
}

function mobileUpdateProp(id, prop, value) {
  const el = elements.find(e => e.id === id);
  if (!el) return;
  saveState();
  switch (prop) {
    case 'x': el.x = parseFloat(value) || 0; break;
    case 'y': el.y = parseFloat(value) || 0; break;
    case 'w': el.w = parseFloat(value) || 10; break;
    case 'h': el.h = parseFloat(value) || 10; break;
    case 'rotation': el.rotation = parseFloat(value) || 0; break;
    case 'fill': el.fill = value; break;
    case 'opacity': el.opacity = parseInt(value) || 100; break;
    case 'borderWidth': el.borderWidth = parseInt(value) || 0; break;
    case 'borderRadius': el.borderRadius = parseInt(value) || 0; break;
    case 'borderColor': el.borderColor = value; break;
    case 'borderStyle': el.borderStyle = value; break;
    case 'fontFamily': el.fontFamily = value; break;
    case 'fontSize': el.fontSize = parseInt(value) || 24; break;
    case 'fontWeight': el.fontWeight = value; break;
    case 'lineHeight': el.lineHeight = parseFloat(value) || 1.4; break;
    case 'letterSpacing': el.letterSpacing = parseFloat(value) || 0; break;
    case 'textColor': el.textColor = value; break;
    case 'textAlign': el.textAlign = value; break;
    case 'shadowX': el.shadowX = parseInt(value) || 0; break;
    case 'shadowY': el.shadowY = parseInt(value) || 0; break;
    case 'shadowBlur': el.shadowBlur = parseInt(value) || 0; break;
    case 'shadowColor': el.shadowColor = value; break;
    case 'shadowOpacity': el.shadowOpacity = parseInt(value) || 25; break;
  }
  // Sync right panel if visible
  if (selectedId === id) selectElement(id);
  else render();
}

function mobileToggleStyle(id, style) {
  const el = elements.find(e => e.id === id);
  if (!el || el.type !== 'text') return;
  saveState();
  el[style] = !el[style];
  render();
  // Re-populate sheet
  const content = document.getElementById('mobileSheetContent');
  if (content && mobileSheetOpen === 'properties') {
    content.innerHTML = getMobilePropertiesContent();
  }
}

// ═══ MOBILE CONTEXT BAR ═══
function updateMobileContextBar() {
  if (!isMobile()) return;

  const bar = document.getElementById('mobileContextBar');
  const content = document.getElementById('mobileCtxContent');
  const actions = document.getElementById('mobileCtxActions');
  const scrollHint = document.getElementById('mobileCtxScrollHint');
  if (!bar || !content || !actions) return;

  if (selectedIds.size === 0) {
    bar.classList.add('hidden');
    bar.classList.remove('visible');
    return;
  }

  const dupIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
  const delIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`;

  // Multi-select context bar
  if (selectedIds.size > 1) {
    bar.classList.remove('hidden');
    bar.classList.add('visible');
    const selEls = elements.filter(e => selectedIds.has(e.id));
    const allGrouped = selEls.every(e => e.groupId) && new Set(selEls.map(e => e.groupId)).size === 1;
    const msToggleStyle = mobileMultiSelect ? 'background:rgba(108,92,231,0.2);color:#6c5ce7;border-color:#6c5ce7;' : '';
    content.innerHTML = `
      <button class="mobile-ctx-btn" style="${msToggleStyle}" onclick="mobileMultiSelect=!mobileMultiSelect;updateMobileContextBar()">Multi</button>
      <div class="mobile-ctx-divider"></div>
      ${allGrouped
        ? '<button class="mobile-ctx-btn" onclick="ungroupSelected()">Ungroup</button>'
        : '<button class="mobile-ctx-btn" onclick="groupSelected()">Group</button>'}
      <span style="font-size:10px;color:#7a7a9a;padding:0 4px;flex-shrink:0;">${selectedIds.size} sel</span>`;
    actions.innerHTML = `
      <button class="mobile-ctx-btn" onclick="duplicateSelected()">${dupIcon}</button>
      <button class="mobile-ctx-btn danger" onclick="deleteSelected()">${delIcon}</button>`;
    return;
  }

  const el = elements.find(e => e.id === selectedId);
  if (!el) {
    bar.classList.add('hidden');
    bar.classList.remove('visible');
    return;
  }

  bar.classList.remove('hidden');
  bar.classList.add('visible');

  const ab = (active) => active ? 'background:rgba(108,92,231,0.2);color:#6c5ce7;border-color:#6c5ce7;' : '';
  const eid = el.id;

  // Pinned actions — always visible on the right
  actions.innerHTML = `
    <button class="mobile-ctx-btn" onclick="duplicateElement('${eid}')">${dupIcon}</button>
    <button class="mobile-ctx-btn danger" onclick="deleteElement('${eid}')">${delIcon}</button>`;

  // Scrollable tools on the left
  if (el.type === 'text') {
    content.innerHTML = `
      <input type="color" value="${el.textColor || '#000000'}" oninput="mobileCtxUpdate('textColor',this.value)" style="width:32px;height:32px;border-radius:6px;border:none;cursor:pointer;flex-shrink:0;" />
      <div class="mobile-ctx-divider"></div>
      <button class="mobile-ctx-btn" style="${ab(el.bold)}font-weight:700;" onclick="mobileCtxToggle('bold')">B</button>
      <button class="mobile-ctx-btn" style="${ab(el.italic)}font-style:italic;" onclick="mobileCtxToggle('italic')">I</button>
      <button class="mobile-ctx-btn" style="${ab(el.underline)}text-decoration:underline;" onclick="mobileCtxToggle('underline')">U</button>
      <button class="mobile-ctx-btn" style="${ab(el.lineThrough)}text-decoration:line-through;" onclick="mobileCtxToggle('lineThrough')">S</button>
      <div class="mobile-ctx-divider"></div>
      <button class="mobile-ctx-btn" style="${ab(el.textAlign==='left')}padding:0 8px;" onclick="mobileCtxUpdate('textAlign','left')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="18" y2="18"/></svg></button>
      <button class="mobile-ctx-btn" style="${ab(el.textAlign==='center')}padding:0 8px;" onclick="mobileCtxUpdate('textAlign','center')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg></button>
      <button class="mobile-ctx-btn" style="${ab(el.textAlign==='right')}padding:0 8px;" onclick="mobileCtxUpdate('textAlign','right')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="9" y1="12" x2="21" y2="12"/><line x1="6" y1="18" x2="21" y2="18"/></svg></button>`;
  } else if (el.type === 'image') {
    content.innerHTML = `
      <button class="mobile-ctx-btn" onclick="openImageEdit()">Edit</button>
      <div class="mobile-ctx-divider"></div>
      <button class="mobile-ctx-btn" onclick="flipH()">Flip H</button>
      <button class="mobile-ctx-btn" onclick="flipV()">Flip V</button>`;
  } else {
    content.innerHTML = `
      <input type="color" value="${el.fill === 'transparent' ? '#ffffff' : el.fill}" oninput="mobileCtxUpdate('fill',this.value)" style="width:32px;height:32px;border-radius:6px;border:none;cursor:pointer;flex-shrink:0;" />
      <div class="mobile-ctx-divider"></div>
      <button class="mobile-ctx-btn" onclick="zMoveUp()" title="Forward"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg></button>
      <button class="mobile-ctx-btn" onclick="zMoveDown()" title="Backward"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></button>`;
  }

  // Show/hide scroll arrow hint
  if (scrollHint) {
    requestAnimationFrame(() => {
      scrollHint.style.display = content.scrollWidth > content.clientWidth ? 'flex' : 'none';
    });
    content.onscroll = () => {
      if (!scrollHint) return;
      scrollHint.style.display = (content.scrollLeft + content.clientWidth >= content.scrollWidth - 5) ? 'none' : 'flex';
    };
  }
}

function mobileCtxUpdate(prop, value) {
  const el = elements.find(e => e.id === selectedId);
  if (!el) return;
  saveState();
  switch (prop) {
    case 'fill': el.fill = value; break;
    case 'textColor': el.textColor = value; break;
    case 'textAlign': el.textAlign = value; break;
    case 'opacity': el.opacity = parseInt(value) || 100; break;
  }
  selectElement(el.id);
}

function mobileCtxToggle(style) {
  const el = elements.find(e => e.id === selectedId);
  if (!el || el.type !== 'text') return;
  saveState();
  el[style] = !el[style];
  selectElement(el.id);
}

// ═══ HOOK INTO EXISTING FUNCTIONS ═══
// Override render to also update mobile context bar
const _originalRender = render;
render = function() {
  _originalRender();
  if (isMobile()) updateMobileContextBar();
};

// Override centerCanvas to account for bottom nav on mobile
const _originalCenterCanvas = centerCanvas;
centerCanvas = function() {
  if (isMobile()) {
    const area = canvasArea.getBoundingClientRect();
    const cw = parseInt(document.getElementById('canvasW').value);
    const ch = parseInt(document.getElementById('canvasH').value);
    const padX = 20, padY = 20;
    const navHeight = 56; // mobile bottom nav
    const availHeight = area.height - navHeight;
    const fitZoom = Math.min((area.width - padX) / cw, (availHeight - padY) / ch, 1);
    zoom = Math.max(0.05, fitZoom);
    panX = (area.width - cw * zoom) / 2;
    panY = (availHeight - ch * zoom) / 2;
    updateCanvasTransform();
  } else {
    _originalCenterCanvas();
  }
};

// Override selectElement to also update mobile context bar
const _originalSelectElement = selectElement;
selectElement = function(id) {
  _originalSelectElement(id);
  if (isMobile()) {
    updateMobileContextBar();
    // Highlight properties tab if element selected
    document.querySelectorAll('.mobile-nav-btn').forEach(b => b.classList.remove('active'));
  }
};

// Override deselectAll to also update mobile context bar
const _originalDeselectAll = deselectAll;
deselectAll = function() {
  _originalDeselectAll();
  if (isMobile()) updateMobileContextBar();
};

// Override selectMultiple to also update mobile context bar
const _originalSelectMultiple = selectMultiple;
selectMultiple = function(ids) {
  _originalSelectMultiple(ids);
  if (isMobile()) updateMobileContextBar();
};

// Override addToSelection to also update mobile context bar
const _originalAddToSelection = addToSelection;
addToSelection = function(id) {
  _originalAddToSelection(id);
  if (isMobile()) updateMobileContextBar();
};
