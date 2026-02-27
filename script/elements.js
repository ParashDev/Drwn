// ═══════════════════════════════════════════════════════════
// ELEMENT CREATION & RENDERING
// ═══════════════════════════════════════════════════════════

function createId() { return 'el_' + (++idCounter); }

function baseProps(overrides = {}) {
  return {
    rotation: 0, opacity: 100,
    borderWidth: 0, borderColor: '#000000', borderStyle: 'solid', borderRadius: 0,
    shadowX: 0, shadowY: 0, shadowBlur: 0, shadowColor: '#000000', shadowOpacity: 25,
    locked: false, visible: true,
    flipH: false, flipV: false,
    groupId: null,
    filterBrightness: 100, filterContrast: 100, filterSaturation: 100,
    filterBlur: 0, filterHueRotate: 0, filterGrayscale: 0, filterSepia: 0,
    filterWarmth: 0, filterVignette: 0,
    clipImage: null,
    ...overrides
  };
}

function getFilterCSS(el) {
  let f = '';
  if (el.filterBrightness !== undefined && el.filterBrightness !== 100) f += `brightness(${el.filterBrightness}%) `;
  if (el.filterContrast !== undefined && el.filterContrast !== 100) f += `contrast(${el.filterContrast}%) `;
  if (el.filterSaturation !== undefined && el.filterSaturation !== 100) f += `saturate(${el.filterSaturation}%) `;
  if (el.filterBlur !== undefined && el.filterBlur > 0) f += `blur(${el.filterBlur}px) `;
  if (el.filterHueRotate !== undefined && el.filterHueRotate > 0) f += `hue-rotate(${el.filterHueRotate}deg) `;
  if (el.filterGrayscale !== undefined && el.filterGrayscale > 0) f += `grayscale(${el.filterGrayscale}%) `;
  if (el.filterSepia !== undefined && el.filterSepia > 0) f += `sepia(${el.filterSepia}%) `;
  if (el.filterWarmth !== undefined && el.filterWarmth > 0) {
    f += `sepia(${el.filterWarmth * 0.3}%) saturate(${100 + el.filterWarmth}%) `;
  }
  return f.trim();
}

function getClipPath(el) {
  const shapeType = el.shapeType || el.type;
  if (shapeType === 'circle' || (el.type === 'rect' && el.name === 'Circle')) return CLIP_PATHS.circle;
  if (CLIP_PATHS[shapeType]) return CLIP_PATHS[shapeType];
  return null;
}

function getCanvasScale() {
  const cw = parseInt(document.getElementById('canvasW').value) || 800;
  const ch = parseInt(document.getElementById('canvasH').value) || 600;
  return Math.min(cw, ch) / 600;
}

function centeredPos(w, h) {
  const cw = parseInt(document.getElementById('canvasW').value) || 800;
  const ch = parseInt(document.getElementById('canvasH').value) || 600;
  return { x: Math.round((cw - w) / 2), y: Math.round((ch - h) / 2) };
}

// ═══════════════════════════════════════════════════════════
// SHAPE SVG RENDERER
// ═══════════════════════════════════════════════════════════
function renderSVGShape(el) {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns,'svg'); svg.setAttribute('width','100%'); svg.setAttribute('height','100%');
  svg.style.cssText = 'position:absolute;top:0;left:0';
  const points = {
    triangle: (w,h) => `${w/2},0 ${w},${h} 0,${h}`,
    hexagon: (w,h) => `${w*0.25},0 ${w*0.75},0 ${w},${h*0.5} ${w*0.75},${h} ${w*0.25},${h} 0,${h*0.5}`,
    pentagon: (w,h) => `${w*0.5},0 ${w},${h*0.38} ${w*0.82},${h} ${w*0.18},${h} 0,${h*0.38}`,
    diamond: (w,h) => `${w/2},0 ${w},${h/2} ${w/2},${h} 0,${h/2}`,
    arrow: (w,h) => `0,${h*0.2} ${w*0.6},${h*0.2} ${w*0.6},0 ${w},${h*0.5} ${w*0.6},${h} ${w*0.6},${h*0.8} 0,${h*0.8}`,
    cross: (w,h) => `${w*0.35},0 ${w*0.65},0 ${w*0.65},${h*0.35} ${w},${h*0.35} ${w},${h*0.65} ${w*0.65},${h*0.65} ${w*0.65},${h} ${w*0.35},${h} ${w*0.35},${h*0.65} 0,${h*0.65} 0,${h*0.35} ${w*0.35},${h*0.35}`,
    octagon: (w,h) => `${w*0.3},0 ${w*0.7},0 ${w},${h*0.3} ${w},${h*0.7} ${w*0.7},${h} ${w*0.3},${h} 0,${h*0.7} 0,${h*0.3}`,
    parallelogram: (w,h) => `${w*0.2},0 ${w},0 ${w*0.8},${h} 0,${h}`,
    trapezoid: (w,h) => `${w*0.2},0 ${w*0.8},0 ${w},${h} 0,${h}`,
    chevron: (w,h) => `0,0 ${w*0.75},0 ${w},${h*0.5} ${w*0.75},${h} 0,${h} ${w*0.25},${h*0.5}`,
    arrowLeft: (w,h) => `${w*0.4},0 ${w*0.4},${h*0.2} ${w},${h*0.2} ${w},${h*0.8} ${w*0.4},${h*0.8} ${w*0.4},${h} 0,${h*0.5}`,
    speechBubble: (w,h) => `0,0 ${w},0 ${w},${h*0.7} ${w*0.6},${h*0.7} ${w*0.4},${h} ${w*0.4},${h*0.7} 0,${h*0.7}`,
    shield: (w,h) => `${w*0.5},0 ${w},${h*0.15} ${w},${h*0.55} ${w*0.75},${h*0.85} ${w*0.5},${h} ${w*0.25},${h*0.85} 0,${h*0.55} 0,${h*0.15}`,
    semicircle: (w,h) => `0,${h} 0,${h*0.5} ${w*0.02},${h*0.38} ${w*0.07},${h*0.26} ${w*0.15},${h*0.15} ${w*0.26},${h*0.07} ${w*0.38},${h*0.02} ${w*0.5},0 ${w*0.62},${h*0.02} ${w*0.74},${h*0.07} ${w*0.85},${h*0.15} ${w*0.93},${h*0.26} ${w*0.98},${h*0.38} ${w},${h*0.5} ${w},${h}`,
    lightning: (w,h) => `${w*0.4},0 ${w*0.65},0 ${w*0.5},${h*0.4} ${w*0.75},${h*0.4} ${w*0.35},${h} ${w*0.45},${h*0.55} ${w*0.25},${h*0.55}`,
    ribbon: (w,h) => `0,0 ${w},0 ${w},${h*0.8} ${w*0.5},${h} 0,${h*0.8}`,
    star6: (w,h) => `${w*0.5},0 ${w*0.63},${h*0.25} ${w*0.93},${h*0.25} ${w*0.75},${h*0.5} ${w*0.93},${h*0.75} ${w*0.63},${h*0.75} ${w*0.5},${h} ${w*0.37},${h*0.75} ${w*0.07},${h*0.75} ${w*0.25},${h*0.5} ${w*0.07},${h*0.25} ${w*0.37},${h*0.25}`,
    star8: (w,h) => `${w*0.5},0 ${w*0.62},${h*0.19} ${w*0.85},${h*0.15} ${w*0.81},${h*0.38} ${w},${h*0.5} ${w*0.81},${h*0.62} ${w*0.85},${h*0.85} ${w*0.62},${h*0.81} ${w*0.5},${h} ${w*0.38},${h*0.81} ${w*0.15},${h*0.85} ${w*0.19},${h*0.62} 0,${h*0.5} ${w*0.19},${h*0.38} ${w*0.15},${h*0.15} ${w*0.38},${h*0.19}`,
    rhombus: (w,h) => `${w*0.5},0 ${w*0.85},${h*0.5} ${w*0.5},${h} ${w*0.15},${h*0.5}`,
  };
  const starPoints = '50,5 61,35 95,35 68,57 79,90 50,70 21,90 32,57 5,35 39,35';

  if (el.type === 'star') {
    svg.setAttribute('viewBox','0 0 100 100');
    const poly = document.createElementNS(ns,'polygon');
    poly.setAttribute('points', starPoints); poly.setAttribute('fill', el.fill||'#fdcb6e');
    if(el.borderWidth>0){poly.setAttribute('stroke',el.borderColor||'#000');poly.setAttribute('stroke-width',el.borderWidth*(100/el.w));}
    svg.appendChild(poly);
  } else if (el.type === 'heart') {
    svg.setAttribute('viewBox','0 0 24 24');
    const path = document.createElementNS(ns,'path');
    path.setAttribute('d','M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z');
    path.setAttribute('fill', el.fill||'#e84393');
    if(el.borderWidth>0){path.setAttribute('stroke',el.borderColor||'#000');path.setAttribute('stroke-width',el.borderWidth*(24/el.w));}
    svg.appendChild(path);
  } else if (points[el.type]) {
    svg.setAttribute('viewBox',`0 0 ${el.w} ${el.h}`);
    const poly = document.createElementNS(ns,'polygon');
    poly.setAttribute('points', points[el.type](el.w, el.h)); poly.setAttribute('fill', el.fill||'#6c5ce7');
    if(el.borderWidth>0){poly.setAttribute('stroke',el.borderColor||'#000');poly.setAttribute('stroke-width',el.borderWidth);}
    svg.appendChild(poly);
  } else if (EXTRA_SHAPES[el.type]) {
    const def = EXTRA_SHAPES[el.type];
    svg.setAttribute('viewBox','0 0 100 100');
    if (def.path) {
      const p = document.createElementNS(ns,'path');
      p.setAttribute('d', def.path);
      p.setAttribute('fill', el.fill || def.fill);
      if (def.fillRule) p.setAttribute('fill-rule', def.fillRule);
      if(el.borderWidth>0){p.setAttribute('stroke',el.borderColor||'#000');p.setAttribute('stroke-width',el.borderWidth*(100/el.w));}
      svg.appendChild(p);
    } else if (def.poly) {
      const poly = document.createElementNS(ns,'polygon');
      poly.setAttribute('points', def.poly.map(pt => pt.join(',')).join(' '));
      poly.setAttribute('fill', el.fill || def.fill);
      if(el.borderWidth>0){poly.setAttribute('stroke',el.borderColor||'#000');poly.setAttribute('stroke-width',el.borderWidth*(100/el.w));}
      svg.appendChild(poly);
    }
  }
  return svg;
}

// ═══════════════════════════════════════════════════════════
// RENDER
// ═══════════════════════════════════════════════════════════
function render() {
  canvas.querySelectorAll('.canvas-element').forEach(e => e.remove());
  canvas.querySelectorAll('.multi-select-bbox').forEach(e => e.remove());
  canvas.querySelectorAll('.bbox-handle').forEach(e => e.remove());
  canvas.querySelectorAll('.marquee-rect').forEach(e => e.remove());
  renderCenterGuides();
  const isSingle = selectedIds.size === 1;
  const isMulti = selectedIds.size > 1;
  elements.forEach(el => {
    if (!el.visible) return;
    const div = document.createElement('div');
    const isSelected = selectedIds.has(el.id);
    div.className = 'canvas-element' + (isSingle && isSelected ? ' selected' : '') + (isMulti && isSelected ? ' multi-selected' : '');
    div.dataset.id = el.id;
    let transformStr = `rotate(${el.rotation||0}deg)`;
    if (el.flipH) transformStr += ' scaleX(-1)';
    if (el.flipV) transformStr += ' scaleY(-1)';
    Object.assign(div.style, {
      left: el.x+'px', top: el.y+'px', width: el.w+'px', height: el.h+'px',
      opacity: (el.opacity||100)/100, transform: transformStr
    });
    const isSvgShape = SVG_SHAPE_TYPES.includes(el.type) || !!EXTRA_SHAPES[el.type];
    if (el.borderWidth > 0 && !isSvgShape) div.style.border = `${el.borderWidth}px ${el.borderStyle||'solid'} ${el.borderColor||'#000'}`;
    if (!isSvgShape) div.style.borderRadius = (el.borderRadius||0)+'px';
    if (el.shadowBlur > 0 || el.shadowX || el.shadowY) {
      const sc = el.shadowColor||'#000000'; const so = (el.shadowOpacity||25)/100;
      const r=parseInt(sc.slice(1,3),16),g=parseInt(sc.slice(3,5),16),b=parseInt(sc.slice(5,7),16);
      div.style.boxShadow = `${el.shadowX||0}px ${el.shadowY||0}px ${el.shadowBlur||0}px rgba(${r},${g},${b},${so})`;
    }

    if (el.clipImage && el.type !== 'text' && el.type !== 'image' && el.type !== 'line') {
      const clipDiv = document.createElement('div');
      Object.assign(clipDiv.style, {
        width: '100%', height: '100%', position: 'absolute', top: '0', left: '0',
        overflow: 'hidden',
      });
      const img = document.createElement('img');
      img.src = el.clipImage;
      img.draggable = false;
      Object.assign(img.style, {
        width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none',
      });
      clipDiv.appendChild(img);
      const cp = getClipPath(el);
      if (cp) clipDiv.style.clipPath = cp;
      else if (el.borderRadius) clipDiv.style.borderRadius = (el.borderRadius||0)+'px';
      div.style.backgroundColor = 'transparent';
      div.style.border = 'none';
      div.appendChild(clipDiv);
    } else if (el.type === 'text') {
      // Wrap text in inner div so overflow:hidden clips text but not the resize handles
      const textInner = document.createElement('div');
      Object.assign(textInner.style, {
        width: '100%', height: '100%', overflow: 'hidden', wordWrap: 'break-word',
        padding: '4px 8px', pointerEvents: 'none'
      });
      Object.assign(div.style, { backgroundColor: el.fill==='transparent'?'transparent':el.fill, color: el.textColor||'#000',
        fontFamily: `'${el.fontFamily||'DM Sans'}', sans-serif`, fontSize: (el.fontSize||24)+'px', fontWeight: el.fontWeight||'700',
        lineHeight: el.lineHeight||1.4, letterSpacing: (el.letterSpacing||0)+'px', textAlign: el.textAlign||'left' });
      if (el.bold) div.style.fontWeight = '700';
      if (el.italic) div.style.fontStyle = 'italic';
      if (el.underline) textInner.style.textDecoration = 'underline';
      if (el.lineThrough) textInner.style.textDecoration = 'line-through';
      textInner.innerText = el.text || '';
      div.appendChild(textInner);
    } else if (el.type === 'rect' || el.type === 'line') {
      div.style.backgroundColor = el.fill || '#6c5ce7';
    } else if (SVG_SHAPE_TYPES.includes(el.type) || EXTRA_SHAPES[el.type]) {
      div.style.backgroundColor = 'transparent'; div.style.border = 'none'; div.style.borderRadius = '0';
      // Use drop-shadow filter for SVG shapes (follows shape outline, not bounding box)
      if (el.shadowBlur > 0 || el.shadowX || el.shadowY) {
        const sc = el.shadowColor||'#000000'; const so = (el.shadowOpacity||25)/100;
        const r=parseInt(sc.slice(1,3),16),g=parseInt(sc.slice(3,5),16),b=parseInt(sc.slice(5,7),16);
        div.style.filter = `drop-shadow(${el.shadowX||0}px ${el.shadowY||0}px ${el.shadowBlur||0}px rgba(${r},${g},${b},${so}))`;
        div.style.boxShadow = 'none';
      }
      div.appendChild(renderSVGShape(el));
    } else if (el.type === 'image') {
      const img = document.createElement('img'); img.src = el.src;
      const filterStr = getFilterCSS(el);
      Object.assign(img.style, { width:'100%', height:'100%', objectFit:'cover', borderRadius:(el.borderRadius||0)+'px' });
      if (filterStr) img.style.filter = filterStr;
      img.draggable = false; div.style.overflow = 'hidden'; div.appendChild(img);
      if (el.filterVignette > 0) {
        const vig = document.createElement('div');
        Object.assign(vig.style, { position:'absolute', inset:'0', borderRadius:(el.borderRadius||0)+'px',
          boxShadow: `inset 0 0 ${el.filterVignette * 0.8}px ${el.filterVignette * 0.4}px rgba(0,0,0,${el.filterVignette/100})`,
          pointerEvents: 'none' });
        div.appendChild(vig);
      }
    }
    if (isSingle && isSelected) {
      // Cursor angles for each handle at 0° rotation (degrees from east, going clockwise)
      const handleAngles = { tm: 0, tr: 45, mr: 90, br: 135, bm: 180, bl: 225, ml: 270, tl: 315 };
      const cursorNames = ['n-resize','ne-resize','e-resize','se-resize','s-resize','sw-resize','w-resize','nw-resize'];
      const rot = el.rotation || 0;
      ['tl','tr','bl','br','tm','bm','ml','mr'].forEach(pos => {
        const h = document.createElement('div'); h.className = 'resize-handle '+pos; h.dataset.handle = pos;
        // Pick cursor based on handle angle + element rotation
        const angle = ((handleAngles[pos] + rot) % 360 + 360) % 360;
        const idx = Math.round(angle / 45) % 8;
        h.style.cursor = cursorNames[idx];
        div.appendChild(h);
      });
      const rl = document.createElement('div'); rl.className = 'rotate-line'; div.appendChild(rl);
      const rh = document.createElement('div'); rh.className = 'rotate-handle'; rh.dataset.rotate = 'true'; div.appendChild(rh);
    }
    canvas.appendChild(div);
  });

  // Draw bounding box for multi-select
  if (isMulti) {
    const bbox = getSelectionBBox();
    const bboxDiv = document.createElement('div');
    bboxDiv.className = 'multi-select-bbox';
    Object.assign(bboxDiv.style, {
      left: bbox.x + 'px', top: bbox.y + 'px',
      width: bbox.w + 'px', height: bbox.h + 'px',
    });
    canvas.appendChild(bboxDiv);
    // Render handles as direct canvas children so they sit above all elements
    const mob = isMobile();
    const hSize = mob ? 36 : 14;
    const hOff = hSize / 2;
    const handlePositions = {
      tl: { left: bbox.x - hOff, top: bbox.y - hOff },
      tr: { left: bbox.x + bbox.w - hOff, top: bbox.y - hOff },
      bl: { left: bbox.x - hOff, top: bbox.y + bbox.h - hOff },
      br: { left: bbox.x + bbox.w - hOff, top: bbox.y + bbox.h - hOff },
      tm: { left: bbox.x + bbox.w/2 - hOff, top: bbox.y - hOff },
      bm: { left: bbox.x + bbox.w/2 - hOff, top: bbox.y + bbox.h - hOff },
      ml: { left: bbox.x - hOff, top: bbox.y + bbox.h/2 - hOff },
      mr: { left: bbox.x + bbox.w - hOff, top: bbox.y + bbox.h/2 - hOff },
    };
    const cursors = { tl:'nw-resize',tr:'ne-resize',bl:'sw-resize',br:'se-resize',tm:'n-resize',bm:'s-resize',ml:'w-resize',mr:'e-resize' };
    Object.entries(handlePositions).forEach(([pos, coords]) => {
      const h = document.createElement('div');
      h.className = 'bbox-handle';
      h.dataset.bboxHandle = pos;
      Object.assign(h.style, {
        position: 'absolute',
        left: coords.left + 'px', top: coords.top + 'px',
        width: hSize + 'px', height: hSize + 'px',
        background: '#6c5ce7', border: '2px solid #fff', borderRadius: '3px',
        cursor: cursors[pos], zIndex: '9999', pointerEvents: 'all',
      });
      canvas.appendChild(h);
    });
  }

  // Draw marquee if active
  if (isMarquee) {
    const mx = Math.min(marqueeStart.x, marqueeEnd.x);
    const my = Math.min(marqueeStart.y, marqueeEnd.y);
    const mw = Math.abs(marqueeEnd.x - marqueeStart.x);
    const mh = Math.abs(marqueeEnd.y - marqueeStart.y);
    const mDiv = document.createElement('div');
    mDiv.className = 'marquee-rect';
    Object.assign(mDiv.style, { left: mx+'px', top: my+'px', width: mw+'px', height: mh+'px' });
    canvas.appendChild(mDiv);
  }

  updateLayersList();
  updateZOrderLabel();
  updateContextToolbar();
}

// ═══════════════════════════════════════════════════════════
// ADD ELEMENT FUNCTIONS
// ═══════════════════════════════════════════════════════════
function addText() {
  saveState();
  const s = getCanvasScale();
  const w = Math.round(250 * s), h = Math.round(60 * s);
  const pos = centeredPos(w, h);
  elements.push({ id: createId(), type: 'text', x: pos.x, y: pos.y, w, h,
    text: 'Type something', fill: 'transparent',
    fontFamily: 'DM Sans', fontSize: Math.round(24 * s), fontWeight: '700',
    textColor: '#000000', textAlign: 'left', lineHeight: 1.4, letterSpacing: 0,
    bold: false, italic: false, underline: false, lineThrough: false,
    name: 'Text', ...baseProps() });
  selectElement(elements[elements.length-1].id); render();
}
function addRect() {
  saveState(); const s = getCanvasScale();
  const w = Math.round(200 * s), h = Math.round(150 * s); const pos = centeredPos(w, h);
  elements.push({ id: createId(), type: 'rect', x: pos.x, y: pos.y, w, h,
    fill: '#6c5ce7', name: 'Rectangle', ...baseProps() });
  selectElement(elements[elements.length-1].id); render();
}
function addCircle() {
  saveState(); const s = getCanvasScale();
  const dim = Math.round(180 * s); const pos = centeredPos(dim, dim);
  elements.push({ id: createId(), type: 'rect', x: pos.x, y: pos.y, w: dim, h: dim,
    fill: '#00b894', name: 'Circle', ...baseProps({ borderRadius: Math.round(200 * s) }) });
  selectElement(elements[elements.length-1].id); render();
}
function addTriangle() {
  saveState(); const s = getCanvasScale();
  const w = Math.round(180 * s), h = Math.round(160 * s); const pos = centeredPos(w, h);
  elements.push({ id: createId(), type: 'triangle', x: pos.x, y: pos.y, w, h,
    fill: '#fd79a8', name: 'Triangle', ...baseProps() });
  selectElement(elements[elements.length-1].id); render();
}
function addLine() {
  saveState(); const s = getCanvasScale();
  const w = Math.round(250 * s), h = Math.round(4 * s); const pos = centeredPos(w, h);
  elements.push({ id: createId(), type: 'line', x: pos.x, y: pos.y, w, h,
    fill: '#2d3436', name: 'Line', ...baseProps() });
  selectElement(elements[elements.length-1].id); render();
}
function addStar() {
  saveState(); const s = getCanvasScale();
  const dim = Math.round(160 * s); const pos = centeredPos(dim, dim);
  elements.push({ id: createId(), type: 'star', x: pos.x, y: pos.y, w: dim, h: dim,
    fill: '#fdcb6e', name: 'Star', ...baseProps() });
  selectElement(elements[elements.length-1].id); render();
}
function addHexagon() {
  saveState(); const s = getCanvasScale(); const dim = Math.round(170 * s); const pos = centeredPos(dim, dim);
  elements.push({ id: createId(), type: 'hexagon', shapeType: 'hexagon', x: pos.x, y: pos.y, w: dim, h: dim,
    fill: '#00cec9', name: 'Hexagon', ...baseProps() });
  selectElement(elements[elements.length-1].id); render();
}
function addPentagon() {
  saveState(); const s = getCanvasScale(); const dim = Math.round(170 * s); const pos = centeredPos(dim, dim);
  elements.push({ id: createId(), type: 'pentagon', shapeType: 'pentagon', x: pos.x, y: pos.y, w: dim, h: dim,
    fill: '#e17055', name: 'Pentagon', ...baseProps() });
  selectElement(elements[elements.length-1].id); render();
}
function addDiamond() {
  saveState(); const s = getCanvasScale(); const dim = Math.round(160 * s); const pos = centeredPos(dim, dim);
  elements.push({ id: createId(), type: 'diamond', shapeType: 'diamond', x: pos.x, y: pos.y, w: dim, h: dim,
    fill: '#6c5ce7', name: 'Diamond', ...baseProps() });
  selectElement(elements[elements.length-1].id); render();
}
function addArrow() {
  saveState(); const s = getCanvasScale(); const w = Math.round(200 * s), h = Math.round(120 * s); const pos = centeredPos(w, h);
  elements.push({ id: createId(), type: 'arrow', shapeType: 'arrow', x: pos.x, y: pos.y, w, h,
    fill: '#636e72', name: 'Arrow', ...baseProps() });
  selectElement(elements[elements.length-1].id); render();
}
function addHeart() {
  saveState(); const s = getCanvasScale(); const dim = Math.round(160 * s); const pos = centeredPos(dim, dim);
  elements.push({ id: createId(), type: 'heart', shapeType: 'heart', x: pos.x, y: pos.y, w: dim, h: dim,
    fill: '#e84393', name: 'Heart', ...baseProps() });
  selectElement(elements[elements.length-1].id); render();
}
function addCross() {
  saveState(); const s = getCanvasScale(); const dim = Math.round(150 * s); const pos = centeredPos(dim, dim);
  elements.push({ id: createId(), type: 'cross', shapeType: 'cross', x: pos.x, y: pos.y, w: dim, h: dim,
    fill: '#d63031', name: 'Cross', ...baseProps() });
  selectElement(elements[elements.length-1].id); render();
}
function addRoundedRect() {
  saveState(); const s = getCanvasScale(); const w = Math.round(200 * s), h = Math.round(150 * s); const pos = centeredPos(w, h);
  elements.push({ id: createId(), type: 'rect', shapeType: 'roundedRect', x: pos.x, y: pos.y, w, h,
    fill: '#0984e3', name: 'Rounded Rect', ...baseProps({ borderRadius: Math.round(24 * s) }) });
  selectElement(elements[elements.length-1].id); render();
}
function addOval() {
  saveState(); const s = getCanvasScale(); const w = Math.round(220 * s), h = Math.round(150 * s); const pos = centeredPos(w, h);
  elements.push({ id: createId(), type: 'rect', shapeType: 'oval', x: pos.x, y: pos.y, w, h,
    fill: '#a29bfe', name: 'Oval', ...baseProps({ borderRadius: 9999 }) });
  selectElement(elements[elements.length-1].id); render();
}
function addOctagon() {
  saveState(); const s = getCanvasScale(); const dim = Math.round(170 * s); const pos = centeredPos(dim, dim);
  elements.push({ id: createId(), type: 'octagon', shapeType: 'octagon', x: pos.x, y: pos.y, w: dim, h: dim,
    fill: '#e84393', name: 'Octagon', ...baseProps() });
  selectElement(elements[elements.length-1].id); render();
}
function addParallelogram() {
  saveState(); const s = getCanvasScale(); const w = Math.round(200 * s), h = Math.round(140 * s); const pos = centeredPos(w, h);
  elements.push({ id: createId(), type: 'parallelogram', shapeType: 'parallelogram', x: pos.x, y: pos.y, w, h,
    fill: '#0984e3', name: 'Parallelogram', ...baseProps() });
  selectElement(elements[elements.length-1].id); render();
}
function addTrapezoid() {
  saveState(); const s = getCanvasScale(); const w = Math.round(200 * s), h = Math.round(140 * s); const pos = centeredPos(w, h);
  elements.push({ id: createId(), type: 'trapezoid', shapeType: 'trapezoid', x: pos.x, y: pos.y, w, h,
    fill: '#00b894', name: 'Trapezoid', ...baseProps() });
  selectElement(elements[elements.length-1].id); render();
}
function addChevron() {
  saveState(); const s = getCanvasScale(); const w = Math.round(200 * s), h = Math.round(120 * s); const pos = centeredPos(w, h);
  elements.push({ id: createId(), type: 'chevron', shapeType: 'chevron', x: pos.x, y: pos.y, w, h,
    fill: '#fdcb6e', name: 'Chevron', ...baseProps() });
  selectElement(elements[elements.length-1].id); render();
}
function addArrowLeft() {
  saveState(); const s = getCanvasScale(); const w = Math.round(200 * s), h = Math.round(120 * s); const pos = centeredPos(w, h);
  elements.push({ id: createId(), type: 'arrowLeft', shapeType: 'arrowLeft', x: pos.x, y: pos.y, w, h,
    fill: '#636e72', name: 'Arrow Left', ...baseProps() });
  selectElement(elements[elements.length-1].id); render();
}
function addSpeechBubble() {
  saveState(); const s = getCanvasScale(); const w = Math.round(200 * s), h = Math.round(160 * s); const pos = centeredPos(w, h);
  elements.push({ id: createId(), type: 'speechBubble', shapeType: 'speechBubble', x: pos.x, y: pos.y, w, h,
    fill: '#dfe6e9', name: 'Speech Bubble', ...baseProps() });
  selectElement(elements[elements.length-1].id); render();
}
function addShield() {
  saveState(); const s = getCanvasScale(); const w = Math.round(150 * s), h = Math.round(180 * s); const pos = centeredPos(w, h);
  elements.push({ id: createId(), type: 'shield', shapeType: 'shield', x: pos.x, y: pos.y, w, h,
    fill: '#6c5ce7', name: 'Shield', ...baseProps() });
  selectElement(elements[elements.length-1].id); render();
}
function addSemicircle() {
  saveState(); const s = getCanvasScale(); const w = Math.round(180 * s), h = Math.round(100 * s); const pos = centeredPos(w, h);
  elements.push({ id: createId(), type: 'semicircle', shapeType: 'semicircle', x: pos.x, y: pos.y, w, h,
    fill: '#fd79a8', name: 'Semicircle', ...baseProps() });
  selectElement(elements[elements.length-1].id); render();
}
function addLightning() {
  saveState(); const s = getCanvasScale(); const w = Math.round(130 * s), h = Math.round(200 * s); const pos = centeredPos(w, h);
  elements.push({ id: createId(), type: 'lightning', shapeType: 'lightning', x: pos.x, y: pos.y, w, h,
    fill: '#ffeaa7', name: 'Lightning', ...baseProps() });
  selectElement(elements[elements.length-1].id); render();
}
function addRibbon() {
  saveState(); const s = getCanvasScale(); const w = Math.round(160 * s), h = Math.round(180 * s); const pos = centeredPos(w, h);
  elements.push({ id: createId(), type: 'ribbon', shapeType: 'ribbon', x: pos.x, y: pos.y, w, h,
    fill: '#d63031', name: 'Ribbon', ...baseProps() });
  selectElement(elements[elements.length-1].id); render();
}
function addStar6() {
  saveState(); const s = getCanvasScale(); const dim = Math.round(170 * s); const pos = centeredPos(dim, dim);
  elements.push({ id: createId(), type: 'star6', shapeType: 'star6', x: pos.x, y: pos.y, w: dim, h: dim,
    fill: '#e17055', name: 'Star 6pt', ...baseProps() });
  selectElement(elements[elements.length-1].id); render();
}
function addStar8() {
  saveState(); const s = getCanvasScale(); const dim = Math.round(170 * s); const pos = centeredPos(dim, dim);
  elements.push({ id: createId(), type: 'star8', shapeType: 'star8', x: pos.x, y: pos.y, w: dim, h: dim,
    fill: '#00cec9', name: 'Star 8pt', ...baseProps() });
  selectElement(elements[elements.length-1].id); render();
}
function addRhombus() {
  saveState(); const s = getCanvasScale(); const w = Math.round(160 * s), h = Math.round(200 * s); const pos = centeredPos(w, h);
  elements.push({ id: createId(), type: 'rhombus', shapeType: 'rhombus', x: pos.x, y: pos.y, w, h,
    fill: '#a29bfe', name: 'Rhombus', ...baseProps() });
  selectElement(elements[elements.length-1].id); render();
}
function addExtra(type) {
  const def = EXTRA_SHAPES[type]; if (!def) return;
  saveState(); const s = getCanvasScale();
  const w = Math.round((def.w || 170) * s), h = Math.round((def.h || 170) * s);
  const pos = centeredPos(w, h);
  elements.push({ id: createId(), type, shapeType: type, x: pos.x, y: pos.y, w, h,
    fill: def.fill, name: def.name, ...baseProps() });
  selectElement(elements[elements.length-1].id); render();
}
function addHeading() {
  saveState(); const s = getCanvasScale();
  const w = Math.round(400 * s), h = Math.round(80 * s); const pos = centeredPos(w, h);
  elements.push({ id: createId(), type: 'text', x: pos.x, y: pos.y, w, h,
    text: 'Add a heading', fill: 'transparent', fontFamily: 'DM Sans', fontSize: Math.round(48 * s), fontWeight: '700',
    textColor: '#000000', textAlign: 'left', lineHeight: 1.2, letterSpacing: 0,
    bold: true, italic: false, underline: false, lineThrough: false, name: 'Heading', ...baseProps() });
  selectElement(elements[elements.length-1].id); render();
}
function addSubheading() {
  saveState(); const s = getCanvasScale();
  const w = Math.round(300 * s), h = Math.round(50 * s); const pos = centeredPos(w, h);
  elements.push({ id: createId(), type: 'text', x: pos.x, y: pos.y, w, h,
    text: 'Add a subheading', fill: 'transparent', fontFamily: 'DM Sans', fontSize: Math.round(28 * s), fontWeight: '600',
    textColor: '#333333', textAlign: 'left', lineHeight: 1.3, letterSpacing: 0,
    bold: false, italic: false, underline: false, lineThrough: false, name: 'Subheading', ...baseProps() });
  selectElement(elements[elements.length-1].id); render();
}
function addBodyText() {
  saveState(); const s = getCanvasScale();
  const w = Math.round(300 * s), h = Math.round(60 * s); const pos = centeredPos(w, h);
  elements.push({ id: createId(), type: 'text', x: pos.x, y: pos.y, w, h,
    text: 'Add body text here. This is a paragraph.', fill: 'transparent', fontFamily: 'DM Sans', fontSize: Math.round(16 * s), fontWeight: '400',
    textColor: '#555555', textAlign: 'left', lineHeight: 1.5, letterSpacing: 0,
    bold: false, italic: false, underline: false, lineThrough: false, name: 'Body', ...baseProps() });
  selectElement(elements[elements.length-1].id); render();
}
function addImage() { document.getElementById('imageInput').click(); }
function handleImageUpload(e) {
  const file = e.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = function(ev) {
    const img = new Image();
    img.onload = function() {
      saveState();
      const s = getCanvasScale();
      let w = img.width, h = img.height;
      const maxDim = Math.round(400 * s);
      if (w > maxDim || h > maxDim) { const r = Math.min(maxDim/w, maxDim/h); w *= r; h *= r; }
      w = Math.round(w); h = Math.round(h);
      const pos = centeredPos(w, h);
      elements.push({ id: createId(), type: 'image', x: pos.x, y: pos.y, w, h,
        src: ev.target.result, fill: 'transparent', name: 'Image', ...baseProps() });
      selectElement(elements[elements.length-1].id); render();
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
  e.target.value = '';
}
function addTextWithFont(fontName) {
  saveState(); const s = getCanvasScale();
  const w = Math.round(250 * s), h = Math.round(60 * s); const pos = centeredPos(w, h);
  elements.push({ id: createId(), type: 'text', x: pos.x, y: pos.y, w, h,
    text: 'Type something', fill: 'transparent',
    fontFamily: fontName, fontSize: Math.round(24 * s), fontWeight: '400',
    textColor: '#000000', textAlign: 'left', lineHeight: 1.4, letterSpacing: 0,
    bold: false, italic: false, underline: false, lineThrough: false,
    name: 'Text', ...baseProps() });
  selectElement(elements[elements.length-1].id); render(); closePanel();
}
function addTextCombo(headingFont, bodyFont) {
  saveState(); const s = getCanvasScale();
  const cw = parseInt(document.getElementById('canvasW').value) || 800;
  const ch = parseInt(document.getElementById('canvasH').value) || 600;
  const hw = Math.round(400 * s), hh = Math.round(70 * s);
  const hx = Math.round((cw - hw) / 2), hy = Math.round(ch * 0.3 - hh / 2);
  elements.push({ id: createId(), type: 'text', x: hx, y: hy, w: hw, h: hh,
    text: 'Your Heading', fill: 'transparent',
    fontFamily: headingFont, fontSize: Math.round(42 * s), fontWeight: '700',
    textColor: '#000000', textAlign: 'center', lineHeight: 1.2, letterSpacing: 0,
    bold: true, italic: false, underline: false, lineThrough: false,
    name: 'Heading', ...baseProps() });
  const bw = Math.round(350 * s), bh = Math.round(50 * s);
  const bx = Math.round((cw - bw) / 2), by = hy + hh + Math.round(16 * s);
  elements.push({ id: createId(), type: 'text', x: bx, y: by, w: bw, h: bh,
    text: 'Your body text goes here with details.', fill: 'transparent',
    fontFamily: bodyFont, fontSize: Math.round(16 * s), fontWeight: '400',
    textColor: '#555555', textAlign: 'center', lineHeight: 1.5, letterSpacing: 0,
    bold: false, italic: false, underline: false, lineThrough: false,
    name: 'Body', ...baseProps() });
  selectElement(elements[elements.length - 1].id); render();
}
