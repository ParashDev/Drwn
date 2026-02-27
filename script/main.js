// ═══════════════════════════════════════════════════════════
// SHARED STATE (used by all modules)
// ═══════════════════════════════════════════════════════════
let elements = [];
let selectedId = null;
let currentTool = 'select';
let zoom = 1;
let panX = 0, panY = 0;
let isDragging = false, isResizing = false, isRotating = false, isPanning = false, isEditing = false;
let dragOffsetX = 0, dragOffsetY = 0;
let resizeHandle = '', resizeStartX = 0, resizeStartY = 0, resizeStartW = 0, resizeStartH = 0, resizeStartEX = 0, resizeStartEY = 0, resizeStartRot = 0, resizeStartFontSize = 0;
let rotateStartAngle = 0;
let undoStack = [], redoStack = [];
let idCounter = 0;
let panStartX = 0, panStartY = 0, panStartPX = 0, panStartPY = 0;
let clipboard = null;
let activePanel = null;
let guidesVisible = true;

// Multi-select & group state
let selectedIds = new Set();
let groupCounter = 0;
let multiDragOffsets = [];
let isMarquee = false;
let marqueeStart = { x: 0, y: 0 };
let marqueeEnd = { x: 0, y: 0 };
let isBboxResizing = false;
let bboxResizeHandle = '';
let bboxOriginals = [];
let bboxOrigRect = null;
let mobileMultiSelect = false;

// Mobile state
let _isMobile = null;
let mobileSheetOpen = null;
let pinchStartDist = 0, pinchStartZoom = 1;
let mobileZoomTimeout = null;
let touchStartTime = 0, longPressTimer = null;
let touchStartPos = { x: 0, y: 0 };
let mobileDragStarted = false;
let mobileTouchOnElement = false;
let mobileTextFontCategory = 'All';
let lastTapTime = 0;

// ═══════════════════════════════════════════════════════════
// DOM REFERENCES
// ═══════════════════════════════════════════════════════════
const canvas = document.getElementById('canvas');
const canvasWrapper = document.getElementById('canvasWrapper');
const canvasArea = document.getElementById('canvasArea');

// init() is called from init.js (loaded last)
