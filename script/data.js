// ═══════════════════════════════════════════════════════════
// PRESETS DATA
// ═══════════════════════════════════════════════════════════
const PRESETS = {
  "Instagram": [
    { name: "Post (Square)", w: 1080, h: 1080, icon: "▣" },
    { name: "Story / Reel", w: 1080, h: 1920, icon: "▯" },
    { name: "Landscape", w: 1080, h: 566, icon: "▭" },
    { name: "Portrait (4:5)", w: 1080, h: 1350, icon: "▯" },
    { name: "Profile Picture", w: 320, h: 320, icon: "●" },
  ],
  "Facebook": [
    { name: "Post", w: 1200, h: 630, icon: "▭" },
    { name: "Cover Photo", w: 820, h: 312, icon: "▬" },
    { name: "Story", w: 1080, h: 1920, icon: "▯" },
    { name: "Event Cover", w: 1920, h: 1005, icon: "▭" },
    { name: "Profile Picture", w: 170, h: 170, icon: "●" },
    { name: "Ad (Square)", w: 1080, h: 1080, icon: "▣" },
  ],
  "YouTube": [
    { name: "Thumbnail", w: 1280, h: 720, icon: "▶" },
    { name: "Channel Banner", w: 2560, h: 1440, icon: "▬" },
    { name: "Shorts", w: 1080, h: 1920, icon: "▯" },
  ],
  "Twitter / X": [
    { name: "Post Image", w: 1600, h: 900, icon: "▭" },
    { name: "Header", w: 1500, h: 500, icon: "▬" },
    { name: "Profile Picture", w: 400, h: 400, icon: "●" },
  ],
  "LinkedIn": [
    { name: "Post", w: 1200, h: 627, icon: "▭" },
    { name: "Cover Photo", w: 1584, h: 396, icon: "▬" },
    { name: "Story", w: 1080, h: 1920, icon: "▯" },
  ],
  "TikTok": [
    { name: "Video Cover", w: 1080, h: 1920, icon: "▯" },
    { name: "Profile Picture", w: 200, h: 200, icon: "●" },
  ],
  "Pinterest": [
    { name: "Pin (Standard)", w: 1000, h: 1500, icon: "▯" },
    { name: "Pin (Long)", w: 1000, h: 2100, icon: "▯" },
    { name: "Pin (Square)", w: 1000, h: 1000, icon: "▣" },
  ],
  "Print & Other": [
    { name: "A4 (72dpi)", w: 595, h: 842, icon: "📄" },
    { name: "Letter (72dpi)", w: 612, h: 792, icon: "📄" },
    { name: "Business Card", w: 1050, h: 600, icon: "▭" },
    { name: "Presentation 16:9", w: 1920, h: 1080, icon: "🖥" },
    { name: "Presentation 4:3", w: 1024, h: 768, icon: "🖥" },
    { name: "Desktop Wallpaper", w: 2560, h: 1440, icon: "🖥" },
    { name: "Mobile Wallpaper", w: 1080, h: 2340, icon: "📱" },
    { name: "OG Image", w: 1200, h: 630, icon: "🌐" },
  ]
};

// ═══════════════════════════════════════════════════════════
// TEMPLATES DATA
// ═══════════════════════════════════════════════════════════
const TEMPLATES = [
  // ── 1. Minimal Brand Post ──
  {
    id: 'tpl_01', name: 'Minimal Brand Post', category: 'Social Media',
    description: 'Clean square post with geometric accents',
    canvasW: 1080, canvasH: 1080, bgColor: '#F5F5F0',
    previewColors: ['#1A1A2E','#C4A35A','#F5F5F0'],
    elements: [
      { type: 'line', x: 140, y: 520, w: 800, h: 2, fill: '#1A1A2E', name: 'Divider' },
      { type: 'text', x: 100, y: 400, w: 880, h: 100, text: 'YOUR BRAND', fill: 'transparent',
        fontFamily: 'Bebas Neue', fontSize: 80, fontWeight: '400', textColor: '#1A1A2E', textAlign: 'center', letterSpacing: 12, name: 'Heading' },
      { type: 'text', x: 200, y: 550, w: 680, h: 50, text: 'Tagline goes here', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 22, fontWeight: '400', textColor: '#7A7A7A', textAlign: 'center', name: 'Tagline' },
      { type: 'rect', x: 980, y: 40, w: 60, h: 60, fill: '#C4A35A', name: 'Accent Top' },
      { type: 'rect', x: 40, y: 980, w: 60, h: 60, fill: '#C4A35A', name: 'Accent Bottom' },
    ]
  },
  // ── 2. Quote Card Story ──
  {
    id: 'tpl_02', name: 'Quote Card Story', category: 'Social Media',
    description: 'Dark story with elegant quote layout',
    canvasW: 1080, canvasH: 1920, bgColor: '#1A1A2E',
    previewColors: ['#1A1A2E','#C4A35A','#F5F5F0'],
    elements: [
      { type: 'text', x: 80, y: 620, w: 200, h: 220, text: '\u201C', fill: 'transparent',
        fontFamily: 'Playfair Display', fontSize: 200, fontWeight: '700', textColor: '#C4A35A', name: 'Quote Mark' },
      { type: 'text', x: 100, y: 800, w: 880, h: 200, text: 'The best way to predict the future is to create it.', fill: 'transparent',
        fontFamily: 'Playfair Display', fontSize: 42, fontWeight: '400', textColor: '#F5F5F0', textAlign: 'center', lineHeight: 1.6, name: 'Quote' },
      { type: 'text', x: 200, y: 1050, w: 680, h: 40, text: '\u2014 Abraham Lincoln', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 18, fontWeight: '400', textColor: '#7A7A9A', textAlign: 'center', name: 'Attribution' },
      { type: 'line', x: 480, y: 1130, w: 120, h: 2, fill: '#C4A35A', name: 'Accent Line' },
    ]
  },
  // ── 3. Business Card ──
  {
    id: 'tpl_03', name: 'Business Card', category: 'Business',
    description: 'Clean professional business card',
    canvasW: 1050, canvasH: 600, bgColor: '#FFFFFF',
    previewColors: ['#111111','#E8E8E8','#FFFFFF'],
    elements: [
      { type: 'rect', x: 0, y: 0, w: 8, h: 600, fill: '#111111', name: 'Left Bar' },
      { type: 'text', x: 60, y: 180, w: 600, h: 50, text: 'JANE SMITH', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 36, fontWeight: '700', textColor: '#111111', letterSpacing: 4, name: 'Name' },
      { type: 'text', x: 60, y: 240, w: 400, h: 30, text: 'Creative Director', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 16, fontWeight: '400', textColor: '#888888', name: 'Title' },
      { type: 'line', x: 60, y: 290, w: 200, h: 1, fill: '#E8E8E8', name: 'Divider' },
      { type: 'text', x: 60, y: 320, w: 400, h: 24, text: 'hello@example.com', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 13, fontWeight: '400', textColor: '#666666', name: 'Email' },
      { type: 'text', x: 60, y: 355, w: 400, h: 24, text: '+1 (555) 123-4567', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 13, fontWeight: '400', textColor: '#666666', name: 'Phone' },
    ]
  },
  // ── 4. Presentation Title Slide ──
  {
    id: 'tpl_04', name: 'Presentation Title', category: 'Presentation',
    description: 'Dark presentation title slide with accent circle',
    canvasW: 1920, canvasH: 1080, bgColor: '#0F0F1A',
    previewColors: ['#0F0F1A','#6C5CE7','#FFFFFF'],
    elements: [
      { type: 'rect', x: 1350, y: 290, w: 500, h: 500, fill: '#6C5CE7', borderRadius: 9999, name: 'Accent Circle' },
      { type: 'text', x: 120, y: 360, w: 1000, h: 80, text: 'Presentation Title', fill: 'transparent',
        fontFamily: 'Poppins', fontSize: 64, fontWeight: '700', textColor: '#FFFFFF', name: 'Title' },
      { type: 'text', x: 120, y: 470, w: 800, h: 40, text: 'Subtitle or description goes here', fill: 'transparent',
        fontFamily: 'Inter', fontSize: 24, fontWeight: '400', textColor: '#8888AA', name: 'Subtitle' },
      { type: 'text', x: 120, y: 540, w: 600, h: 30, text: 'By Your Name  |  February 2026', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 16, fontWeight: '400', textColor: '#666688', name: 'Author' },
      { type: 'line', x: 120, y: 900, w: 80, h: 4, fill: '#6C5CE7', name: 'Bottom Accent' },
    ]
  },
  // ── 5. Event Poster ──
  {
    id: 'tpl_05', name: 'Event Poster', category: 'Marketing',
    description: 'Elegant event announcement with photo placeholder',
    canvasW: 1080, canvasH: 1350, bgColor: '#F0EDE6',
    previewColors: ['#F0EDE6','#2D2D2D','#D4594E'],
    elements: [
      { type: 'rect', x: 0, y: 0, w: 1080, h: 600, fill: '#D9D3C7', name: 'Photo Placeholder' },
      { type: 'text', x: 80, y: 650, w: 920, h: 80, text: 'ANNUAL DESIGN SUMMIT', fill: 'transparent',
        fontFamily: 'Bebas Neue', fontSize: 56, fontWeight: '400', textColor: '#2D2D2D', letterSpacing: 4, name: 'Event Title' },
      { type: 'text', x: 80, y: 740, w: 400, h: 30, text: 'MARCH 15 \u2014 17, 2026', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 18, fontWeight: '600', textColor: '#D4594E', name: 'Date' },
      { type: 'text', x: 80, y: 800, w: 920, h: 100, text: 'Join leading designers for three days of inspiration, workshops, and networking.', fill: 'transparent',
        fontFamily: 'Lora', fontSize: 16, fontWeight: '400', textColor: '#555555', lineHeight: 1.7, name: 'Description' },
      { type: 'line', x: 80, y: 940, w: 920, h: 1, fill: '#C0B8AD', name: 'Divider' },
      { type: 'text', x: 80, y: 970, w: 500, h: 24, text: 'Convention Center, Downtown', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 14, fontWeight: '400', textColor: '#888888', name: 'Venue' },
      { type: 'rect', x: 80, y: 1200, w: 20, h: 20, fill: '#D4594E', name: 'Accent Square' },
    ]
  },
  // ── 6. Sale Announcement ──
  {
    id: 'tpl_06', name: 'Sale Announcement', category: 'Social Media',
    description: 'Bold sale banner with clean borders',
    canvasW: 1200, canvasH: 630, bgColor: '#FFFFFF',
    previewColors: ['#FFFFFF','#111111','#E84393'],
    elements: [
      { type: 'rect', x: 20, y: 20, w: 1160, h: 590, fill: 'transparent', borderWidth: 1, borderColor: '#E8E8E8', name: 'Border' },
      { type: 'text', x: 100, y: 120, w: 1000, h: 180, text: 'SALE', fill: 'transparent',
        fontFamily: 'Bebas Neue', fontSize: 160, fontWeight: '400', textColor: '#111111', textAlign: 'center', letterSpacing: 20, name: 'Sale' },
      { type: 'line', x: 550, y: 330, w: 100, h: 4, fill: '#E84393', name: 'Accent Line' },
      { type: 'text', x: 200, y: 360, w: 800, h: 50, text: 'UP TO 50% OFF', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 32, fontWeight: '600', textColor: '#E84393', textAlign: 'center', name: 'Discount' },
      { type: 'text', x: 200, y: 430, w: 800, h: 30, text: 'This weekend only. Use code SAVE50.', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 18, fontWeight: '400', textColor: '#666666', textAlign: 'center', name: 'Details' },
    ]
  },
  // ── 7. Minimalist Resume ──
  {
    id: 'tpl_07', name: 'Minimalist Resume', category: 'Print',
    description: 'Clean A4 resume with blue accents',
    canvasW: 595, canvasH: 842, bgColor: '#FFFFFF',
    previewColors: ['#FFFFFF','#222222','#0984E3'],
    elements: [
      { type: 'text', x: 40, y: 40, w: 400, h: 40, text: 'JOHN DOE', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 28, fontWeight: '700', textColor: '#222222', letterSpacing: 3, name: 'Name' },
      { type: 'text', x: 40, y: 78, w: 300, h: 20, text: 'UX Designer', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 14, fontWeight: '400', textColor: '#0984E3', name: 'Title' },
      { type: 'line', x: 40, y: 110, w: 515, h: 1, fill: '#E0E0E0', name: 'Divider' },
      { type: 'text', x: 40, y: 135, w: 200, h: 18, text: 'EXPERIENCE', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 11, fontWeight: '600', textColor: '#0984E3', letterSpacing: 2, name: 'Section 1' },
      { type: 'text', x: 40, y: 165, w: 400, h: 18, text: 'Senior Designer, Studio Inc.', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 12, fontWeight: '600', textColor: '#222222', name: 'Job Title' },
      { type: 'text', x: 40, y: 188, w: 200, h: 16, text: '2022 \u2014 Present', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 10, fontWeight: '400', textColor: '#999999', name: 'Dates' },
      { type: 'text', x: 40, y: 215, w: 515, h: 80, text: 'Led product design for flagship SaaS platform. Conducted user research, created wireframes and prototypes, and collaborated with engineering teams.', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 10, fontWeight: '400', textColor: '#555555', lineHeight: 1.6, name: 'Description' },
      { type: 'text', x: 40, y: 330, w: 200, h: 18, text: 'SKILLS', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 11, fontWeight: '600', textColor: '#0984E3', letterSpacing: 2, name: 'Section 2' },
      { type: 'text', x: 40, y: 360, w: 515, h: 40, text: 'Figma  \u2022  Prototyping  \u2022  User Research  \u2022  Design Systems  \u2022  HTML/CSS', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 10, fontWeight: '400', textColor: '#555555', name: 'Skills List' },
    ]
  },
  // ── 8. YouTube Thumbnail ──
  {
    id: 'tpl_08', name: 'YouTube Thumbnail', category: 'Social Media',
    description: 'Bold dark thumbnail with yellow accent',
    canvasW: 1280, canvasH: 720, bgColor: '#0F0F1A',
    previewColors: ['#0F0F1A','#FDCB6E','#FFFFFF'],
    elements: [
      { type: 'rect', x: 640, y: 0, w: 640, h: 720, fill: '#2D2D3A', name: 'Image Placeholder' },
      { type: 'text', x: 50, y: 180, w: 560, h: 240, text: 'HOW TO MASTER DESIGN', fill: 'transparent',
        fontFamily: 'Bebas Neue', fontSize: 72, fontWeight: '400', textColor: '#FFFFFF', lineHeight: 1.0, name: 'Title' },
      { type: 'line', x: 50, y: 450, w: 200, h: 6, fill: '#FDCB6E', name: 'Accent Bar' },
      { type: 'text', x: 50, y: 480, w: 560, h: 36, text: '5 Tips That Changed Everything', fill: 'transparent',
        fontFamily: 'Poppins', fontSize: 22, fontWeight: '600', textColor: '#FDCB6E', name: 'Subtitle' },
      { type: 'rect', x: 50, y: 550, w: 16, h: 16, fill: '#FDCB6E', borderRadius: 9999, name: 'Dot Accent' },
    ]
  },
  // ── 9. Wedding Invitation ──
  {
    id: 'tpl_09', name: 'Wedding Invitation', category: 'Personal',
    description: 'Elegant invitation with gold border',
    canvasW: 1080, canvasH: 1350, bgColor: '#FAF8F5',
    previewColors: ['#FAF8F5','#2C2C2C','#C9A96E'],
    elements: [
      { type: 'rect', x: 50, y: 50, w: 980, h: 1250, fill: 'transparent', borderWidth: 1, borderColor: '#C9A96E', name: 'Gold Border' },
      { type: 'text', x: 140, y: 220, w: 800, h: 60, text: "You're Invited", fill: 'transparent',
        fontFamily: 'Dancing Script', fontSize: 48, fontWeight: '400', textColor: '#C9A96E', textAlign: 'center', name: 'Invite Text' },
      { type: 'text', x: 140, y: 360, w: 800, h: 80, text: 'Sarah & James', fill: 'transparent',
        fontFamily: 'Playfair Display', fontSize: 56, fontWeight: '700', textColor: '#2C2C2C', textAlign: 'center', name: 'Names' },
      { type: 'line', x: 460, y: 470, w: 160, h: 1, fill: '#C9A96E', name: 'Divider' },
      { type: 'text', x: 200, y: 510, w: 680, h: 30, text: 'Saturday, June 14th, 2026', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 18, fontWeight: '400', textColor: '#666666', textAlign: 'center', name: 'Date' },
      { type: 'text', x: 200, y: 560, w: 680, h: 30, text: 'The Grand Garden, 123 Rose Lane', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 15, fontWeight: '400', textColor: '#888888', textAlign: 'center', name: 'Venue' },
      { type: 'text', x: 200, y: 640, w: 680, h: 24, text: 'RSVP BY MAY 15TH', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 14, fontWeight: '500', textColor: '#C9A96E', textAlign: 'center', letterSpacing: 2, name: 'RSVP' },
    ]
  },
  // ── 10. Restaurant Menu ──
  {
    id: 'tpl_10', name: 'Restaurant Menu', category: 'Print',
    description: 'Dark elegant menu with gold typography',
    canvasW: 595, canvasH: 842, bgColor: '#1A1714',
    previewColors: ['#1A1714','#C9A96E','#F5F0E8'],
    elements: [
      { type: 'text', x: 100, y: 40, w: 395, h: 50, text: 'MAISON', fill: 'transparent',
        fontFamily: 'Playfair Display', fontSize: 42, fontWeight: '700', textColor: '#C9A96E', textAlign: 'center', letterSpacing: 8, name: 'Restaurant' },
      { type: 'line', x: 247, y: 105, w: 100, h: 1, fill: '#C9A96E', name: 'Top Divider' },
      { type: 'text', x: 60, y: 150, w: 200, h: 18, text: 'STARTERS', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 12, fontWeight: '600', textColor: '#C9A96E', letterSpacing: 3, name: 'Section 1' },
      { type: 'text', x: 60, y: 185, w: 475, h: 20, text: 'Garden Salad ........................ $12', fill: 'transparent',
        fontFamily: 'EB Garamond', fontSize: 14, fontWeight: '400', textColor: '#F5F0E8', name: 'Item 1' },
      { type: 'text', x: 60, y: 215, w: 475, h: 20, text: 'Soup of the Day .................... $10', fill: 'transparent',
        fontFamily: 'EB Garamond', fontSize: 14, fontWeight: '400', textColor: '#F5F0E8', name: 'Item 2' },
      { type: 'text', x: 60, y: 280, w: 200, h: 18, text: 'MAINS', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 12, fontWeight: '600', textColor: '#C9A96E', letterSpacing: 3, name: 'Section 2' },
      { type: 'text', x: 60, y: 315, w: 475, h: 20, text: 'Pan-Seared Salmon ................ $28', fill: 'transparent',
        fontFamily: 'EB Garamond', fontSize: 14, fontWeight: '400', textColor: '#F5F0E8', name: 'Item 3' },
      { type: 'text', x: 60, y: 345, w: 475, h: 20, text: 'Grilled Ribeye ........................ $34', fill: 'transparent',
        fontFamily: 'EB Garamond', fontSize: 14, fontWeight: '400', textColor: '#F5F0E8', name: 'Item 4' },
      { type: 'text', x: 100, y: 790, w: 395, h: 16, text: 'Please inform your server of any allergies', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 9, fontWeight: '400', textColor: '#666655', textAlign: 'center', name: 'Footer' },
    ]
  },
  // ── 11. LinkedIn Thought Post ──
  {
    id: 'tpl_11', name: 'LinkedIn Thought Post', category: 'Social Media',
    description: 'Professional quote card with blue accent',
    canvasW: 1200, canvasH: 627, bgColor: '#FFFFFF',
    previewColors: ['#FFFFFF','#0A66C2','#0A0A0A'],
    elements: [
      { type: 'rect', x: 0, y: 64, w: 6, h: 500, fill: '#0A66C2', name: 'Left Accent' },
      { type: 'text', x: 80, y: 100, w: 1040, h: 260, text: 'Great design is not just what it looks like. It\u2019s how it works.', fill: 'transparent',
        fontFamily: 'Merriweather', fontSize: 36, fontWeight: '400', textColor: '#0A0A0A', lineHeight: 1.6, name: 'Quote' },
      { type: 'line', x: 80, y: 420, w: 200, h: 1, fill: '#E0E0E0', name: 'Divider' },
      { type: 'text', x: 80, y: 450, w: 300, h: 28, text: 'Your Name', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 18, fontWeight: '600', textColor: '#0A0A0A', name: 'Author' },
      { type: 'text', x: 80, y: 485, w: 300, h: 22, text: 'CEO at Company', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 14, fontWeight: '400', textColor: '#888888', name: 'Title' },
    ]
  },
  // ── 12. Twitter/X Post Image ──
  {
    id: 'tpl_12', name: 'Twitter Post Image', category: 'Social Media',
    description: 'Clean centered insight card',
    canvasW: 1600, canvasH: 900, bgColor: '#F8F8F8',
    previewColors: ['#F8F8F8','#111111','#1DA1F2'],
    elements: [
      { type: 'text', x: 200, y: 260, w: 1200, h: 80, text: 'Key Insight', fill: 'transparent',
        fontFamily: 'Poppins', fontSize: 64, fontWeight: '700', textColor: '#111111', textAlign: 'center', name: 'Headline' },
      { type: 'text', x: 250, y: 380, w: 1100, h: 80, text: "Here's a thread-worthy take on design trends for 2026.", fill: 'transparent',
        fontFamily: 'Inter', fontSize: 28, fontWeight: '400', textColor: '#555555', textAlign: 'center', lineHeight: 1.5, name: 'Body' },
      { type: 'line', x: 760, y: 580, w: 80, h: 4, fill: '#1DA1F2', name: 'Accent Line' },
      { type: 'text', x: 500, y: 620, w: 600, h: 30, text: '@yourhandle', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 18, fontWeight: '500', textColor: '#1DA1F2', textAlign: 'center', name: 'Handle' },
    ]
  },
  // ── 13. Pinterest Recipe Pin ──
  {
    id: 'tpl_13', name: 'Pinterest Recipe Pin', category: 'Social Media',
    description: 'Tall recipe pin with photo placeholder',
    canvasW: 1000, canvasH: 1500, bgColor: '#FFFFFF',
    previewColors: ['#FFFFFF','#2D2D2D','#E17055'],
    elements: [
      { type: 'rect', x: 0, y: 0, w: 1000, h: 650, fill: '#F0E6DC', name: 'Photo Placeholder' },
      { type: 'text', x: 60, y: 695, w: 200, h: 20, text: 'RECIPE', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 12, fontWeight: '600', textColor: '#E17055', letterSpacing: 3, name: 'Label' },
      { type: 'text', x: 60, y: 730, w: 880, h: 100, text: 'Homemade Pasta From Scratch', fill: 'transparent',
        fontFamily: 'Playfair Display', fontSize: 38, fontWeight: '700', textColor: '#2D2D2D', lineHeight: 1.3, name: 'Title' },
      { type: 'text', x: 60, y: 870, w: 880, h: 100, text: 'A step-by-step guide to making fresh pasta at home with just three simple ingredients.', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 16, fontWeight: '400', textColor: '#666666', lineHeight: 1.6, name: 'Description' },
      { type: 'line', x: 60, y: 1020, w: 880, h: 1, fill: '#E8E0D8', name: 'Divider' },
      { type: 'text', x: 60, y: 1055, w: 880, h: 22, text: '30 MIN  |  SERVES 4  |  EASY', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 13, fontWeight: '500', textColor: '#999999', letterSpacing: 2, name: 'Meta' },
    ]
  },
  // ── 14. Section Divider Slide ──
  {
    id: 'tpl_14', name: 'Section Divider Slide', category: 'Presentation',
    description: 'Purple presentation section break',
    canvasW: 1920, canvasH: 1080, bgColor: '#6C5CE7',
    previewColors: ['#6C5CE7','#FFFFFF','#A29BFE'],
    elements: [
      { type: 'text', x: 100, y: 180, w: 600, h: 320, text: '02', fill: 'transparent',
        fontFamily: 'Bebas Neue', fontSize: 300, fontWeight: '400', textColor: '#A29BFE', opacity: 30, name: 'Number' },
      { type: 'text', x: 100, y: 480, w: 800, h: 70, text: 'Key Findings', fill: 'transparent',
        fontFamily: 'Poppins', fontSize: 56, fontWeight: '700', textColor: '#FFFFFF', name: 'Section Title' },
      { type: 'text', x: 100, y: 570, w: 700, h: 36, text: 'Overview of research results', fill: 'transparent',
        fontFamily: 'Inter', fontSize: 22, fontWeight: '400', textColor: '#FFFFFF', opacity: 70, name: 'Subtitle' },
      { type: 'line', x: 100, y: 980, w: 1720, h: 1, fill: '#FFFFFF', opacity: 30, name: 'Bottom Line' },
    ]
  },
  // ── 15. Fitness Flyer ──
  {
    id: 'tpl_15', name: 'Fitness Flyer', category: 'Marketing',
    description: 'Dark bold fitness promotion',
    canvasW: 1080, canvasH: 1350, bgColor: '#0A0A0A',
    previewColors: ['#0A0A0A','#00B894','#FFFFFF'],
    elements: [
      { type: 'rect', x: 0, y: 0, w: 1080, h: 500, fill: '#1A1A1A', name: 'Image Placeholder' },
      { type: 'text', x: 60, y: 550, w: 960, h: 80, text: 'TRANSFORM YOUR BODY', fill: 'transparent',
        fontFamily: 'Bebas Neue', fontSize: 64, fontWeight: '400', textColor: '#FFFFFF', letterSpacing: 4, name: 'Headline' },
      { type: 'text', x: 60, y: 660, w: 400, h: 40, text: 'JOIN NOW', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 28, fontWeight: '700', textColor: '#00B894', name: 'CTA' },
      { type: 'text', x: 60, y: 730, w: 960, h: 80, text: 'Expert trainers. Modern equipment. Results guaranteed.', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 16, fontWeight: '400', textColor: '#AAAAAA', lineHeight: 1.7, name: 'Body' },
      { type: 'line', x: 60, y: 860, w: 100, h: 4, fill: '#00B894', name: 'Accent Line' },
      { type: 'text', x: 60, y: 900, w: 400, h: 24, text: 'Visit fitgym.com', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 16, fontWeight: '500', textColor: '#00B894', name: 'URL' },
    ]
  },
  // ── 16. Podcast Cover Art ──
  {
    id: 'tpl_16', name: 'Podcast Cover Art', category: 'Social Media',
    description: 'Dark cover with amber accent circle',
    canvasW: 1080, canvasH: 1080, bgColor: '#18181B',
    previewColors: ['#18181B','#F59E0B','#FAFAFA'],
    elements: [
      { type: 'rect', x: 390, y: 200, w: 300, h: 300, fill: '#F59E0B', borderRadius: 9999, name: 'Accent Circle' },
      { type: 'text', x: 140, y: 580, w: 800, h: 60, text: 'THE CREATIVE HOUR', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 44, fontWeight: '700', textColor: '#FAFAFA', textAlign: 'center', letterSpacing: 3, name: 'Podcast Name' },
      { type: 'text', x: 200, y: 660, w: 680, h: 30, text: 'Stories from makers and thinkers', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 18, fontWeight: '400', textColor: '#888888', textAlign: 'center', name: 'Tagline' },
      { type: 'line', x: 440, y: 730, w: 200, h: 1, fill: '#333333', name: 'Divider' },
      { type: 'text', x: 200, y: 760, w: 680, h: 22, text: 'NEW EPISODES WEEKLY', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 13, fontWeight: '500', textColor: '#F59E0B', textAlign: 'center', letterSpacing: 3, name: 'Schedule' },
    ]
  },
  // ── 17. Thank You Card ──
  {
    id: 'tpl_17', name: 'Thank You Card', category: 'Personal',
    description: 'Warm card with script heading and rose accent',
    canvasW: 1080, canvasH: 1080, bgColor: '#FFF8F0',
    previewColors: ['#FFF8F0','#D4594E','#2C2C2C'],
    elements: [
      { type: 'rect', x: 60, y: 60, w: 960, h: 960, fill: 'transparent', borderWidth: 2, borderColor: '#E8DDD0', name: 'Border' },
      { type: 'text', x: 140, y: 370, w: 800, h: 90, text: 'Thank You', fill: 'transparent',
        fontFamily: 'Dancing Script', fontSize: 72, fontWeight: '400', textColor: '#D4594E', textAlign: 'center', name: 'Heading' },
      { type: 'text', x: 190, y: 490, w: 700, h: 80, text: 'Your kindness and generosity are truly appreciated.', fill: 'transparent',
        fontFamily: 'Lora', fontSize: 20, fontWeight: '400', textColor: '#555555', textAlign: 'center', lineHeight: 1.6, name: 'Message' },
      { type: 'heart', x: 520, y: 610, w: 40, h: 40, fill: '#D4594E', name: 'Heart' },
      { type: 'text', x: 290, y: 690, w: 500, h: 30, text: 'With love, The Family', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 16, fontWeight: '400', textColor: '#888888', textAlign: 'center', name: 'Sender' },
    ]
  },
  // ── 18. Product Launch ──
  {
    id: 'tpl_18', name: 'Product Launch', category: 'Marketing',
    description: 'Clean product announcement with minimal styling',
    canvasW: 1080, canvasH: 1080, bgColor: '#FFFFFF',
    previewColors: ['#FFFFFF','#0A0A0A','#F0F0F0'],
    elements: [
      { type: 'rect', x: 240, y: 80, w: 600, h: 600, fill: '#F0F0F0', borderRadius: 20, name: 'Product Area' },
      { type: 'rect', x: 460, y: 712, w: 160, h: 36, fill: '#0A0A0A', borderRadius: 18, name: 'Label Pill' },
      { type: 'text', x: 460, y: 716, w: 160, h: 28, text: 'NEW', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 13, fontWeight: '700', textColor: '#FFFFFF', textAlign: 'center', letterSpacing: 3, name: 'New Label' },
      { type: 'text', x: 140, y: 780, w: 800, h: 50, text: 'The Minimal Chair', fill: 'transparent',
        fontFamily: 'Poppins', fontSize: 36, fontWeight: '600', textColor: '#0A0A0A', textAlign: 'center', name: 'Product Name' },
      { type: 'text', x: 340, y: 845, w: 400, h: 30, text: '$299', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 22, fontWeight: '400', textColor: '#666666', textAlign: 'center', name: 'Price' },
      { type: 'text', x: 300, y: 905, w: 480, h: 24, text: 'Shop now at store.com', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 14, fontWeight: '500', textColor: '#0A0A0A', textAlign: 'center', letterSpacing: 1, name: 'CTA' },
    ]
  },
  // ── 19. Conference Badge ──
  {
    id: 'tpl_19', name: 'Conference Badge', category: 'Print',
    description: 'Clean name tag with purple accents',
    canvasW: 600, canvasH: 400, bgColor: '#FFFFFF',
    previewColors: ['#FFFFFF','#1A1A2E','#6C5CE7'],
    elements: [
      { type: 'rect', x: 0, y: 0, w: 600, h: 8, fill: '#6C5CE7', name: 'Top Bar' },
      { type: 'text', x: 100, y: 35, w: 400, h: 20, text: 'DESIGN CON 2026', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 13, fontWeight: '600', textColor: '#6C5CE7', textAlign: 'center', letterSpacing: 3, name: 'Conference' },
      { type: 'text', x: 50, y: 130, w: 500, h: 56, text: 'Alex Johnson', fill: 'transparent',
        fontFamily: 'Poppins', fontSize: 42, fontWeight: '700', textColor: '#1A1A2E', textAlign: 'center', name: 'Attendee Name' },
      { type: 'text', x: 100, y: 210, w: 400, h: 28, text: 'Senior Product Designer', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 18, fontWeight: '400', textColor: '#666666', textAlign: 'center', name: 'Title' },
      { type: 'text', x: 150, y: 252, w: 300, h: 24, text: 'Acme Corp', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 16, fontWeight: '500', textColor: '#999999', textAlign: 'center', name: 'Company' },
      { type: 'rect', x: 0, y: 396, w: 600, h: 4, fill: '#6C5CE7', name: 'Bottom Bar' },
    ]
  },
  // ── 20. Geometric Wallpaper ──
  {
    id: 'tpl_20', name: 'Geometric Wallpaper', category: 'Personal',
    description: 'Abstract dark wallpaper with floating shapes',
    canvasW: 1080, canvasH: 2340, bgColor: '#0F0A1A',
    previewColors: ['#0F0A1A','#6C5CE7','#FD79A8'],
    elements: [
      { type: 'rect', x: -100, y: 300, w: 400, h: 400, fill: '#6C5CE7', borderRadius: 9999, opacity: 40, name: 'Circle 1' },
      { type: 'rect', x: 700, y: 600, w: 300, h: 300, fill: '#A29BFE', borderRadius: 9999, opacity: 30, name: 'Circle 2' },
      { type: 'rect', x: 200, y: 900, w: 200, h: 200, fill: '#FD79A8', borderRadius: 9999, opacity: 25, name: 'Circle 3' },
      { type: 'rect', x: 600, y: 1400, w: 350, h: 350, fill: '#6C5CE7', borderRadius: 9999, opacity: 35, name: 'Circle 4' },
      { type: 'diamond', x: 480, y: 1100, w: 120, h: 120, fill: '#A29BFE', opacity: 20, name: 'Diamond' },
      { type: 'line', x: 340, y: 1170, w: 400, h: 1, fill: '#A29BFE', opacity: 15, name: 'Accent Line' },
      { type: 'triangle', x: 150, y: 1800, w: 80, h: 80, fill: '#FD79A8', opacity: 20, name: 'Triangle' },
    ]
  },
  // ── 21. Reels — Happy Birthday ──
  {
    id: 'tpl_21', name: 'Happy Birthday Reel', category: 'Instagram Reels',
    description: 'Fun birthday celebration with confetti accents',
    canvasW: 1080, canvasH: 1920, bgColor: '#FFF5E6',
    previewColors: ['#FFF5E6','#FF6B6B','#FFD93D'],
    elements: [
      { type: 'rect', x: 80, y: 200, w: 60, h: 60, fill: '#FF6B6B', rotation: 25, borderRadius: 8, name: 'Confetti 1' },
      { type: 'rect', x: 940, y: 300, w: 50, h: 50, fill: '#FFD93D', rotation: -15, borderRadius: 8, name: 'Confetti 2' },
      { type: 'rect', x: 200, y: 120, w: 40, h: 40, fill: '#6C5CE7', rotation: 45, borderRadius: 9999, name: 'Confetti 3' },
      { type: 'rect', x: 850, y: 150, w: 45, h: 45, fill: '#00B894', rotation: 30, borderRadius: 9999, name: 'Confetti 4' },
      { type: 'star', x: 490, y: 100, w: 100, h: 100, fill: '#FFD93D', name: 'Star' },
      { type: 'text', x: 90, y: 620, w: 900, h: 180, text: 'Happy\nBirthday!', fill: 'transparent',
        fontFamily: 'Dancing Script', fontSize: 86, fontWeight: '700', textColor: '#FF6B6B', textAlign: 'center', lineHeight: 1.2, name: 'Title' },
      { type: 'line', x: 340, y: 840, w: 400, h: 3, fill: '#FFD93D', name: 'Divider' },
      { type: 'text', x: 140, y: 880, w: 800, h: 60, text: 'Wishing you a day filled with love and joy', fill: 'transparent',
        fontFamily: 'Lora', fontSize: 24, fontWeight: '400', textColor: '#8B6914', textAlign: 'center', lineHeight: 1.5, name: 'Message' },
      { type: 'text', x: 200, y: 1000, w: 680, h: 40, text: 'YOUR NAME', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 20, fontWeight: '600', textColor: '#CC5555', textAlign: 'center', letterSpacing: 6, name: 'Name' },
      { type: 'heart', x: 520, y: 1080, w: 40, h: 40, fill: '#FF6B6B', name: 'Heart' },
      { type: 'rect', x: 150, y: 1600, w: 780, h: 180, fill: '#FF6B6B', borderRadius: 24, name: 'CTA Box' },
      { type: 'text', x: 200, y: 1650, w: 680, h: 80, text: 'Tap to celebrate! \u{1F389}', fill: 'transparent',
        fontFamily: 'Poppins', fontSize: 32, fontWeight: '600', textColor: '#FFFFFF', textAlign: 'center', name: 'CTA Text' },
    ]
  },
  // ── 22. Reels — Anniversary ──
  {
    id: 'tpl_22', name: 'Anniversary Reel', category: 'Instagram Reels',
    description: 'Elegant gold and dark anniversary story',
    canvasW: 1080, canvasH: 1920, bgColor: '#1A1520',
    previewColors: ['#1A1520','#C9A96E','#F5F0E8'],
    elements: [
      { type: 'rect', x: 60, y: 60, w: 960, h: 1800, fill: 'transparent', borderWidth: 1, borderColor: '#C9A96E', name: 'Gold Border' },
      { type: 'rect', x: 80, y: 80, w: 920, h: 1760, fill: 'transparent', borderWidth: 1, borderColor: '#C9A96E', opacity: 30, name: 'Inner Border' },
      { type: 'text', x: 140, y: 500, w: 800, h: 60, text: 'Celebrating', fill: 'transparent',
        fontFamily: 'Dancing Script', fontSize: 52, fontWeight: '400', textColor: '#C9A96E', textAlign: 'center', name: 'Top Text' },
      { type: 'text', x: 140, y: 600, w: 800, h: 200, text: '5 YEARS', fill: 'transparent',
        fontFamily: 'Playfair Display', fontSize: 120, fontWeight: '700', textColor: '#F5F0E8', textAlign: 'center', lineHeight: 1.0, name: 'Years' },
      { type: 'text', x: 200, y: 810, w: 680, h: 50, text: 'OF LOVE & TOGETHERNESS', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 18, fontWeight: '500', textColor: '#C9A96E', textAlign: 'center', letterSpacing: 8, name: 'Subtitle' },
      { type: 'line', x: 390, y: 900, w: 300, h: 1, fill: '#C9A96E', name: 'Divider' },
      { type: 'text', x: 140, y: 940, w: 800, h: 80, text: 'Sarah & James', fill: 'transparent',
        fontFamily: 'Playfair Display', fontSize: 42, fontWeight: '400', textColor: '#F5F0E8', textAlign: 'center', name: 'Names' },
      { type: 'text', x: 200, y: 1040, w: 680, h: 30, text: 'February 14, 2021 \u2014 Forever', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 16, fontWeight: '400', textColor: '#8A7A5A', textAlign: 'center', name: 'Date' },
      { type: 'heart', x: 505, y: 1120, w: 70, h: 70, fill: '#C9A96E', opacity: 60, name: 'Heart' },
    ]
  },
  // ── 23. Reels — Graduation ──
  {
    id: 'tpl_23', name: 'Graduation Reel', category: 'Instagram Reels',
    description: 'Bold congratulations for graduates',
    canvasW: 1080, canvasH: 1920, bgColor: '#0A1628',
    previewColors: ['#0A1628','#FFD700','#FFFFFF'],
    elements: [
      { type: 'rect', x: 0, y: 0, w: 1080, h: 400, fill: '#0D1F3C', name: 'Top Section' },
      { type: 'star', x: 490, y: 280, w: 100, h: 100, fill: '#FFD700', name: 'Star' },
      { type: 'text', x: 100, y: 500, w: 880, h: 60, text: 'CONGRATULATIONS', fill: 'transparent',
        fontFamily: 'Bebas Neue', fontSize: 54, fontWeight: '400', textColor: '#FFD700', textAlign: 'center', letterSpacing: 8, name: 'Congrats' },
      { type: 'text', x: 100, y: 590, w: 880, h: 200, text: 'CLASS OF\n2026', fill: 'transparent',
        fontFamily: 'Poppins', fontSize: 80, fontWeight: '700', textColor: '#FFFFFF', textAlign: 'center', lineHeight: 1.1, name: 'Year' },
      { type: 'line', x: 340, y: 830, w: 400, h: 3, fill: '#FFD700', name: 'Divider' },
      { type: 'text', x: 140, y: 870, w: 800, h: 50, text: 'Your Name', fill: 'transparent',
        fontFamily: 'Playfair Display', fontSize: 36, fontWeight: '700', textColor: '#FFFFFF', textAlign: 'center', name: 'Graduate Name' },
      { type: 'text', x: 200, y: 940, w: 680, h: 30, text: 'Bachelor of Science in Computer Engineering', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 16, fontWeight: '400', textColor: '#7A8BA8', textAlign: 'center', name: 'Degree' },
      { type: 'rect', x: 300, y: 1020, w: 480, h: 60, fill: '#FFD700', borderRadius: 30, name: 'Badge' },
      { type: 'text', x: 300, y: 1030, w: 480, h: 40, text: 'WE DID IT!', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 22, fontWeight: '700', textColor: '#0A1628', textAlign: 'center', letterSpacing: 4, name: 'Badge Text' },
    ]
  },
  // ── 24. Reels — Baby Shower ──
  {
    id: 'tpl_24', name: 'Baby Shower Reel', category: 'Instagram Reels',
    description: 'Soft pastel baby shower invitation',
    canvasW: 1080, canvasH: 1920, bgColor: '#FDF2F8',
    previewColors: ['#FDF2F8','#F9A8D4','#7C3AED'],
    elements: [
      { type: 'rect', x: 150, y: 250, w: 200, h: 200, fill: '#FBCFE8', borderRadius: 9999, opacity: 50, name: 'Bubble 1' },
      { type: 'rect', x: 750, y: 350, w: 150, h: 150, fill: '#DDD6FE', borderRadius: 9999, opacity: 50, name: 'Bubble 2' },
      { type: 'rect', x: 100, y: 500, w: 100, h: 100, fill: '#A5F3FC', borderRadius: 9999, opacity: 40, name: 'Bubble 3' },
      { type: 'text', x: 140, y: 580, w: 800, h: 60, text: "You're Invited to a", fill: 'transparent',
        fontFamily: 'Dancing Script', fontSize: 38, fontWeight: '400', textColor: '#9D5CB8', textAlign: 'center', name: 'Invite' },
      { type: 'text', x: 100, y: 660, w: 880, h: 140, text: 'Baby\nShower', fill: 'transparent',
        fontFamily: 'Playfair Display', fontSize: 72, fontWeight: '700', textColor: '#7C3AED', textAlign: 'center', lineHeight: 1.2, name: 'Title' },
      { type: 'line', x: 390, y: 840, w: 300, h: 2, fill: '#F9A8D4', name: 'Divider' },
      { type: 'text', x: 200, y: 880, w: 680, h: 40, text: 'For Sarah & Baby', fill: 'transparent',
        fontFamily: 'Poppins', fontSize: 24, fontWeight: '500', textColor: '#7C3AED', textAlign: 'center', name: 'For Who' },
      { type: 'text', x: 200, y: 960, w: 680, h: 30, text: 'Saturday, March 22 at 2:00 PM', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 18, fontWeight: '400', textColor: '#9D7AB8', textAlign: 'center', name: 'Date' },
      { type: 'text', x: 200, y: 1010, w: 680, h: 26, text: 'The Rosewood Cafe, Downtown', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 15, fontWeight: '400', textColor: '#B39AC8', textAlign: 'center', name: 'Venue' },
      { type: 'heart', x: 520, y: 1090, w: 40, h: 40, fill: '#F9A8D4', name: 'Heart' },
    ]
  },
  // ── 25. Reels — New Year ──
  {
    id: 'tpl_25', name: 'New Year Reel', category: 'Instagram Reels',
    description: 'Sparkly dark new year countdown vibe',
    canvasW: 1080, canvasH: 1920, bgColor: '#0A0A14',
    previewColors: ['#0A0A14','#FFD700','#FFFFFF'],
    elements: [
      { type: 'star', x: 140, y: 200, w: 50, h: 50, fill: '#FFD700', opacity: 60, name: 'Star 1' },
      { type: 'star', x: 880, y: 350, w: 40, h: 40, fill: '#FFD700', opacity: 40, name: 'Star 2' },
      { type: 'star', x: 300, y: 150, w: 30, h: 30, fill: '#FFFFFF', opacity: 30, name: 'Star 3' },
      { type: 'star', x: 750, y: 180, w: 35, h: 35, fill: '#FFFFFF', opacity: 25, name: 'Star 4' },
      { type: 'text', x: 100, y: 550, w: 880, h: 60, text: 'HAPPY NEW YEAR', fill: 'transparent',
        fontFamily: 'Bebas Neue', fontSize: 56, fontWeight: '400', textColor: '#FFD700', textAlign: 'center', letterSpacing: 10, name: 'Greeting' },
      { type: 'text', x: 100, y: 630, w: 880, h: 250, text: '2026', fill: 'transparent',
        fontFamily: 'Playfair Display', fontSize: 200, fontWeight: '700', textColor: '#FFFFFF', textAlign: 'center', lineHeight: 1.0, name: 'Year' },
      { type: 'line', x: 390, y: 920, w: 300, h: 2, fill: '#FFD700', name: 'Divider' },
      { type: 'text', x: 140, y: 960, w: 800, h: 80, text: 'Cheers to new beginnings\nand endless possibilities', fill: 'transparent',
        fontFamily: 'Lora', fontSize: 22, fontWeight: '400', textColor: '#B0A080', textAlign: 'center', lineHeight: 1.6, name: 'Message' },
      { type: 'rect', x: 390, y: 1100, w: 300, h: 50, fill: 'transparent', borderWidth: 1, borderColor: '#FFD700', borderRadius: 25, name: 'Tag Outline' },
      { type: 'text', x: 390, y: 1108, w: 300, h: 34, text: '#WELCOME2026', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 14, fontWeight: '600', textColor: '#FFD700', textAlign: 'center', letterSpacing: 2, name: 'Hashtag' },
    ]
  },
  // ── 26. Reels — Valentine's Day ──
  {
    id: 'tpl_26', name: "Valentine's Day Reel", category: 'Instagram Reels',
    description: 'Romantic red and pink love story',
    canvasW: 1080, canvasH: 1920, bgColor: '#2D0A1B',
    previewColors: ['#2D0A1B','#FF4D6D','#FFB3C1'],
    elements: [
      { type: 'heart', x: 200, y: 180, w: 80, h: 80, fill: '#FF4D6D', opacity: 25, name: 'Heart 1' },
      { type: 'heart', x: 800, y: 280, w: 60, h: 60, fill: '#FFB3C1', opacity: 20, name: 'Heart 2' },
      { type: 'heart', x: 100, y: 400, w: 45, h: 45, fill: '#FF758F', opacity: 15, name: 'Heart 3' },
      { type: 'heart', x: 440, y: 420, w: 200, h: 200, fill: '#FF4D6D', name: 'Main Heart' },
      { type: 'text', x: 100, y: 700, w: 880, h: 140, text: 'Happy\nValentine\u2019s Day', fill: 'transparent',
        fontFamily: 'Dancing Script', fontSize: 64, fontWeight: '700', textColor: '#FFB3C1', textAlign: 'center', lineHeight: 1.3, name: 'Title' },
      { type: 'line', x: 390, y: 880, w: 300, h: 2, fill: '#FF4D6D', name: 'Divider' },
      { type: 'text', x: 140, y: 920, w: 800, h: 80, text: 'To the one who makes my heart\nskip a beat, every single day', fill: 'transparent',
        fontFamily: 'Lora', fontSize: 20, fontWeight: '400', textColor: '#CC8090', textAlign: 'center', lineHeight: 1.6, name: 'Message' },
      { type: 'text', x: 200, y: 1050, w: 680, h: 30, text: 'With all my love \u2764', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 16, fontWeight: '500', textColor: '#FF4D6D', textAlign: 'center', name: 'Sign Off' },
    ]
  },
  // ── 27. Reels — Eid Mubarak ──
  {
    id: 'tpl_27', name: 'Eid Mubarak Reel', category: 'Instagram Reels',
    description: 'Elegant green and gold Eid greeting',
    canvasW: 1080, canvasH: 1920, bgColor: '#0A2818',
    previewColors: ['#0A2818','#C9A96E','#E8F5E9'],
    elements: [
      { type: 'rect', x: 100, y: 100, w: 880, h: 1720, fill: 'transparent', borderWidth: 1, borderColor: '#C9A96E', borderRadius: 24, name: 'Border' },
      { type: 'star', x: 490, y: 300, w: 100, h: 100, fill: '#C9A96E', name: 'Star' },
      { type: 'rect', x: 510, y: 410, w: 60, h: 60, fill: '#C9A96E', borderRadius: 9999, opacity: 30, name: 'Circle Accent' },
      { type: 'text', x: 140, y: 550, w: 800, h: 80, text: 'Eid Mubarak', fill: 'transparent',
        fontFamily: 'Playfair Display', fontSize: 68, fontWeight: '700', textColor: '#C9A96E', textAlign: 'center', name: 'Title' },
      { type: 'line', x: 390, y: 670, w: 300, h: 1, fill: '#C9A96E', opacity: 60, name: 'Divider' },
      { type: 'text', x: 140, y: 710, w: 800, h: 100, text: 'May this blessed occasion bring\npeace, happiness, and prosperity\nto you and your family', fill: 'transparent',
        fontFamily: 'Lora', fontSize: 20, fontWeight: '400', textColor: '#A8D5A0', textAlign: 'center', lineHeight: 1.7, name: 'Message' },
      { type: 'text', x: 200, y: 880, w: 680, h: 30, text: 'FROM OUR FAMILY TO YOURS', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 13, fontWeight: '600', textColor: '#C9A96E', textAlign: 'center', letterSpacing: 4, name: 'From' },
      { type: 'star8', x: 200, y: 1500, w: 50, h: 50, fill: '#C9A96E', opacity: 20, name: 'Decor 1' },
      { type: 'star8', x: 830, y: 1550, w: 40, h: 40, fill: '#C9A96E', opacity: 15, name: 'Decor 2' },
    ]
  },
  // ── 28. Reels — Christmas ──
  {
    id: 'tpl_28', name: 'Merry Christmas Reel', category: 'Instagram Reels',
    description: 'Festive red and green holiday greeting',
    canvasW: 1080, canvasH: 1920, bgColor: '#1A2210',
    previewColors: ['#1A2210','#C0392B','#27AE60'],
    elements: [
      { type: 'star', x: 490, y: 240, w: 100, h: 100, fill: '#FFD700', name: 'Star' },
      { type: 'triangle', x: 390, y: 340, w: 300, h: 350, fill: '#27AE60', name: 'Tree' },
      { type: 'rect', x: 510, y: 690, w: 60, h: 50, fill: '#8B4513', name: 'Trunk' },
      { type: 'rect', x: 490, y: 430, w: 20, h: 20, fill: '#C0392B', borderRadius: 9999, name: 'Ornament 1' },
      { type: 'rect', x: 550, y: 520, w: 16, h: 16, fill: '#FFD700', borderRadius: 9999, name: 'Ornament 2' },
      { type: 'rect', x: 470, y: 580, w: 18, h: 18, fill: '#C0392B', borderRadius: 9999, name: 'Ornament 3' },
      { type: 'text', x: 100, y: 800, w: 880, h: 140, text: 'Merry\nChristmas', fill: 'transparent',
        fontFamily: 'Playfair Display', fontSize: 72, fontWeight: '700', textColor: '#F5F0E8', textAlign: 'center', lineHeight: 1.2, name: 'Title' },
      { type: 'line', x: 390, y: 980, w: 300, h: 2, fill: '#C0392B', name: 'Divider' },
      { type: 'text', x: 140, y: 1020, w: 800, h: 80, text: 'Wishing you warmth, joy, and\nwonderful moments this season', fill: 'transparent',
        fontFamily: 'Lora', fontSize: 20, fontWeight: '400', textColor: '#A0B090', textAlign: 'center', lineHeight: 1.6, name: 'Message' },
      { type: 'text', x: 200, y: 1140, w: 680, h: 30, text: 'WITH LOVE FROM OUR FAMILY', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 13, fontWeight: '600', textColor: '#C0392B', textAlign: 'center', letterSpacing: 3, name: 'From' },
    ]
  },
  // ── 29. Reels — Housewarming ──
  {
    id: 'tpl_29', name: 'Housewarming Reel', category: 'Instagram Reels',
    description: 'Warm tones for a new home celebration',
    canvasW: 1080, canvasH: 1920, bgColor: '#FBF7F0',
    previewColors: ['#FBF7F0','#D4874E','#2C2C2C'],
    elements: [
      { type: 'rect', x: 140, y: 300, w: 800, h: 500, fill: '#F0E6D8', borderRadius: 16, name: 'Photo Placeholder' },
      { type: 'text', x: 100, y: 860, w: 880, h: 50, text: 'WELCOME TO OUR', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 16, fontWeight: '600', textColor: '#D4874E', textAlign: 'center', letterSpacing: 8, name: 'Top Label' },
      { type: 'text', x: 100, y: 910, w: 880, h: 120, text: 'New Home', fill: 'transparent',
        fontFamily: 'Playfair Display', fontSize: 72, fontWeight: '700', textColor: '#2C2C2C', textAlign: 'center', name: 'Title' },
      { type: 'line', x: 390, y: 1060, w: 300, h: 2, fill: '#D4874E', name: 'Divider' },
      { type: 'text', x: 140, y: 1100, w: 800, h: 80, text: "Join us for a housewarming party\nas we celebrate this new chapter", fill: 'transparent',
        fontFamily: 'Lora', fontSize: 20, fontWeight: '400', textColor: '#6B5B4A', textAlign: 'center', lineHeight: 1.6, name: 'Message' },
      { type: 'text', x: 200, y: 1230, w: 680, h: 30, text: 'Saturday, April 5 at 4:00 PM', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 18, fontWeight: '500', textColor: '#D4874E', textAlign: 'center', name: 'Date' },
      { type: 'text', x: 200, y: 1280, w: 680, h: 26, text: '42 Oak Street, Maplewood', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 15, fontWeight: '400', textColor: '#9A8A7A', textAlign: 'center', name: 'Address' },
      { type: 'rect', x: 340, y: 1370, w: 400, h: 56, fill: '#D4874E', borderRadius: 28, name: 'RSVP Button' },
      { type: 'text', x: 340, y: 1380, w: 400, h: 36, text: 'RSVP NOW', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 16, fontWeight: '700', textColor: '#FFFFFF', textAlign: 'center', letterSpacing: 3, name: 'RSVP Text' },
    ]
  },
  // ── 30. Reels — Engagement ──
  {
    id: 'tpl_30', name: 'Engagement Reel', category: 'Instagram Reels',
    description: 'Romantic blush engagement announcement',
    canvasW: 1080, canvasH: 1920, bgColor: '#FAF5F0',
    previewColors: ['#FAF5F0','#B76E79','#2C2C2C'],
    elements: [
      { type: 'rect', x: 80, y: 80, w: 920, h: 1760, fill: 'transparent', borderWidth: 1, borderColor: '#B76E79', opacity: 40, name: 'Border' },
      { type: 'text', x: 140, y: 480, w: 800, h: 50, text: 'We Said', fill: 'transparent',
        fontFamily: 'Dancing Script', fontSize: 42, fontWeight: '400', textColor: '#B76E79', textAlign: 'center', name: 'We Said' },
      { type: 'text', x: 100, y: 550, w: 880, h: 150, text: 'YES!', fill: 'transparent',
        fontFamily: 'Playfair Display', fontSize: 140, fontWeight: '700', textColor: '#2C2C2C', textAlign: 'center', lineHeight: 1.0, name: 'Yes' },
      { type: 'line', x: 390, y: 730, w: 300, h: 2, fill: '#B76E79', name: 'Divider' },
      { type: 'text', x: 140, y: 770, w: 800, h: 50, text: 'Emma & Michael', fill: 'transparent',
        fontFamily: 'Playfair Display', fontSize: 36, fontWeight: '400', textColor: '#2C2C2C', textAlign: 'center', name: 'Names' },
      { type: 'text', x: 200, y: 840, w: 680, h: 30, text: 'ARE GETTING MARRIED', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 14, fontWeight: '600', textColor: '#B76E79', textAlign: 'center', letterSpacing: 6, name: 'Married' },
      { type: 'diamond', x: 510, y: 920, w: 60, h: 60, fill: '#B76E79', opacity: 30, name: 'Diamond' },
      { type: 'rect', x: 190, y: 1200, w: 700, h: 400, fill: '#EDE4DA', borderRadius: 16, name: 'Photo Placeholder' },
      { type: 'text', x: 200, y: 1650, w: 680, h: 26, text: '#ENGAGED \u2022 SPRING 2026', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 13, fontWeight: '500', textColor: '#B76E79', textAlign: 'center', letterSpacing: 3, name: 'Hashtag' },
    ]
  },
  // ── 31. Reels — Motivational Quote ──
  {
    id: 'tpl_31', name: 'Motivational Quote Reel', category: 'Instagram Reels',
    description: 'Bold motivational quote with gradient-feel accents',
    canvasW: 1080, canvasH: 1920, bgColor: '#0D0D0D',
    previewColors: ['#0D0D0D','#FF6B35','#FFFFFF'],
    elements: [
      { type: 'rect', x: 0, y: 0, w: 1080, h: 8, fill: '#FF6B35', name: 'Top Bar' },
      { type: 'rect', x: 0, y: 1912, w: 1080, h: 8, fill: '#FF6B35', name: 'Bottom Bar' },
      { type: 'text', x: 100, y: 520, w: 880, h: 300, text: 'STOP\nWAITING.\nSTART\nCREATING.', fill: 'transparent',
        fontFamily: 'Bebas Neue', fontSize: 110, fontWeight: '400', textColor: '#FFFFFF', textAlign: 'left', lineHeight: 1.05, name: 'Quote' },
      { type: 'rect', x: 100, y: 880, w: 120, h: 6, fill: '#FF6B35', name: 'Accent Line' },
      { type: 'text', x: 100, y: 920, w: 880, h: 80, text: 'Your only limit is the one you set for yourself.', fill: 'transparent',
        fontFamily: 'Inter', fontSize: 28, fontWeight: '400', textColor: '#888888', lineHeight: 1.5, name: 'Subquote' },
      { type: 'text', x: 100, y: 1700, w: 880, h: 36, text: '@YOURHANDLE', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 18, fontWeight: '600', textColor: '#FF6B35', letterSpacing: 4, name: 'Handle' },
    ]
  },
  // ── 32. Reels — Product Showcase ──
  {
    id: 'tpl_32', name: 'Product Showcase Reel', category: 'Instagram Reels',
    description: 'Clean product feature with price tag',
    canvasW: 1080, canvasH: 1920, bgColor: '#F5F0EB',
    previewColors: ['#F5F0EB','#1A1A1A','#C4A35A'],
    elements: [
      { type: 'rect', x: 90, y: 200, w: 900, h: 700, fill: '#EAE2D6', borderRadius: 20, name: 'Product Area' },
      { type: 'text', x: 90, y: 960, w: 900, h: 50, text: 'INTRODUCING', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 18, fontWeight: '600', textColor: '#C4A35A', letterSpacing: 10, name: 'Label' },
      { type: 'text', x: 90, y: 1020, w: 900, h: 140, text: 'The Classic\nCollection', fill: 'transparent',
        fontFamily: 'Playfair Display', fontSize: 72, fontWeight: '700', textColor: '#1A1A1A', lineHeight: 1.15, name: 'Product Name' },
      { type: 'line', x: 90, y: 1200, w: 200, h: 3, fill: '#C4A35A', name: 'Divider' },
      { type: 'text', x: 90, y: 1240, w: 900, h: 80, text: 'Handcrafted with premium materials for those who appreciate timeless design.', fill: 'transparent',
        fontFamily: 'Lora', fontSize: 24, fontWeight: '400', textColor: '#6B6055', lineHeight: 1.6, name: 'Description' },
      { type: 'text', x: 90, y: 1380, w: 400, h: 60, text: '$199', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 48, fontWeight: '700', textColor: '#1A1A1A', name: 'Price' },
      { type: 'rect', x: 90, y: 1520, w: 420, h: 70, fill: '#1A1A1A', borderRadius: 35, name: 'CTA Button' },
      { type: 'text', x: 90, y: 1535, w: 420, h: 40, text: 'SHOP NOW', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 20, fontWeight: '700', textColor: '#FFFFFF', textAlign: 'center', letterSpacing: 4, name: 'CTA Text' },
    ]
  },
  // ── 33. Reels — Fitness Workout ──
  {
    id: 'tpl_33', name: 'Fitness Workout Reel', category: 'Instagram Reels',
    description: 'High energy workout reel with bold typography',
    canvasW: 1080, canvasH: 1920, bgColor: '#0A0A0A',
    previewColors: ['#0A0A0A','#00FF87','#FFFFFF'],
    elements: [
      { type: 'rect', x: 0, y: 0, w: 1080, h: 500, fill: '#111111', name: 'Top Section' },
      { type: 'text', x: 80, y: 180, w: 920, h: 50, text: 'DAY 01', fill: 'transparent',
        fontFamily: 'JetBrains Mono', fontSize: 24, fontWeight: '700', textColor: '#00FF87', letterSpacing: 6, name: 'Day' },
      { type: 'text', x: 80, y: 250, w: 920, h: 200, text: 'FULL BODY\nBURN', fill: 'transparent',
        fontFamily: 'Bebas Neue', fontSize: 120, fontWeight: '400', textColor: '#FFFFFF', lineHeight: 1.0, name: 'Workout Title' },
      { type: 'rect', x: 80, y: 520, w: 920, h: 2, fill: '#222222', name: 'Divider' },
      { type: 'text', x: 80, y: 560, w: 440, h: 100, text: '45\nMINUTES', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 42, fontWeight: '700', textColor: '#FFFFFF', lineHeight: 1.2, name: 'Duration' },
      { type: 'text', x: 560, y: 560, w: 440, h: 100, text: '600\nCALORIES', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 42, fontWeight: '700', textColor: '#00FF87', lineHeight: 1.2, name: 'Calories' },
      { type: 'rect', x: 80, y: 720, w: 920, h: 2, fill: '#222222', name: 'Divider 2' },
      { type: 'text', x: 80, y: 780, w: 920, h: 40, text: 'EXERCISES', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 16, fontWeight: '600', textColor: '#555555', letterSpacing: 6, name: 'Section Label' },
      { type: 'text', x: 80, y: 840, w: 920, h: 260, text: '01  Squats  3\u00D712\n02  Push-ups  3\u00D715\n03  Lunges  3\u00D710\n04  Plank  3\u00D760s\n05  Burpees  3\u00D710', fill: 'transparent',
        fontFamily: 'JetBrains Mono', fontSize: 26, fontWeight: '500', textColor: '#CCCCCC', lineHeight: 1.8, name: 'Exercise List' },
      { type: 'rect', x: 80, y: 1680, w: 920, h: 80, fill: '#00FF87', borderRadius: 12, name: 'CTA Button' },
      { type: 'text', x: 80, y: 1695, w: 920, h: 50, text: 'START WORKOUT', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 24, fontWeight: '700', textColor: '#0A0A0A', textAlign: 'center', letterSpacing: 4, name: 'CTA Text' },
    ]
  },
  // ── 34. Reels — Recipe ──
  {
    id: 'tpl_34', name: 'Recipe Reel', category: 'Instagram Reels',
    description: 'Warm food recipe card with steps',
    canvasW: 1080, canvasH: 1920, bgColor: '#FFF8F0',
    previewColors: ['#FFF8F0','#D4594E','#2D2D2D'],
    elements: [
      { type: 'rect', x: 0, y: 0, w: 1080, h: 600, fill: '#F0E0D0', borderRadius: 0, name: 'Photo Area' },
      { type: 'rect', x: 80, y: 520, w: 200, h: 50, fill: '#D4594E', borderRadius: 25, name: 'Time Badge' },
      { type: 'text', x: 80, y: 528, w: 200, h: 34, text: '30 MIN', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 16, fontWeight: '700', textColor: '#FFFFFF', textAlign: 'center', letterSpacing: 2, name: 'Time' },
      { type: 'text', x: 80, y: 650, w: 920, h: 120, text: 'Creamy Garlic Tuscan Pasta', fill: 'transparent',
        fontFamily: 'Playfair Display', fontSize: 56, fontWeight: '700', textColor: '#2D2D2D', lineHeight: 1.2, name: 'Recipe Title' },
      { type: 'text', x: 80, y: 800, w: 920, h: 60, text: 'A rich and creamy weeknight dinner everyone will love.', fill: 'transparent',
        fontFamily: 'Lora', fontSize: 22, fontWeight: '400', textColor: '#7A6A5A', lineHeight: 1.5, name: 'Subtitle' },
      { type: 'line', x: 80, y: 900, w: 920, h: 2, fill: '#E8D8C8', name: 'Divider' },
      { type: 'text', x: 80, y: 940, w: 920, h: 36, text: 'INGREDIENTS', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 16, fontWeight: '700', textColor: '#D4594E', letterSpacing: 6, name: 'Section' },
      { type: 'text', x: 80, y: 1000, w: 920, h: 280, text: '\u2022  400g penne pasta\n\u2022  2 cups heavy cream\n\u2022  4 cloves garlic, minced\n\u2022  2 cups spinach\n\u2022  1 cup sun-dried tomatoes\n\u2022  1 cup parmesan, grated', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 24, fontWeight: '400', textColor: '#4A3A2A', lineHeight: 1.8, name: 'Ingredients' },
      { type: 'text', x: 80, y: 1700, w: 920, h: 30, text: 'SAVE THIS RECIPE \u2764\uFE0F', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 18, fontWeight: '600', textColor: '#D4594E', textAlign: 'center', letterSpacing: 3, name: 'CTA' },
    ]
  },
  // ── 35. Reels — Travel Destination ──
  {
    id: 'tpl_35', name: 'Travel Destination Reel', category: 'Instagram Reels',
    description: 'Wanderlust travel reel with bold location',
    canvasW: 1080, canvasH: 1920, bgColor: '#0C1B2A',
    previewColors: ['#0C1B2A','#F4A261','#FFFFFF'],
    elements: [
      { type: 'rect', x: 0, y: 0, w: 1080, h: 800, fill: '#152840', name: 'Photo Area' },
      { type: 'text', x: 80, y: 860, w: 920, h: 40, text: 'NEXT DESTINATION', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 16, fontWeight: '600', textColor: '#F4A261', letterSpacing: 8, name: 'Label' },
      { type: 'text', x: 80, y: 920, w: 920, h: 200, text: 'SANTORINI', fill: 'transparent',
        fontFamily: 'Bebas Neue', fontSize: 130, fontWeight: '400', textColor: '#FFFFFF', lineHeight: 1.0, name: 'Location' },
      { type: 'text', x: 80, y: 1120, w: 920, h: 40, text: 'GREECE', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 28, fontWeight: '300', textColor: '#F4A261', letterSpacing: 16, name: 'Country' },
      { type: 'line', x: 80, y: 1210, w: 200, h: 3, fill: '#F4A261', name: 'Accent Line' },
      { type: 'text', x: 80, y: 1260, w: 920, h: 100, text: 'White-washed villages, crystal blue waters, and sunsets that take your breath away.', fill: 'transparent',
        fontFamily: 'Lora', fontSize: 24, fontWeight: '400', textColor: '#8899AA', lineHeight: 1.6, name: 'Description' },
      { type: 'rect', x: 80, y: 1440, w: 280, h: 90, fill: '#152840', borderWidth: 2, borderColor: '#F4A261', borderRadius: 12, name: 'Stat 1 Box' },
      { type: 'text', x: 80, y: 1455, w: 280, h: 60, text: '\u2708\uFE0F 4h 30m', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 22, fontWeight: '600', textColor: '#FFFFFF', textAlign: 'center', name: 'Flight' },
      { type: 'rect', x: 400, y: 1440, w: 280, h: 90, fill: '#152840', borderWidth: 2, borderColor: '#F4A261', borderRadius: 12, name: 'Stat 2 Box' },
      { type: 'text', x: 400, y: 1455, w: 280, h: 60, text: '\u2600\uFE0F 28\u00B0C', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 22, fontWeight: '600', textColor: '#FFFFFF', textAlign: 'center', name: 'Temp' },
      { type: 'text', x: 80, y: 1750, w: 920, h: 30, text: 'FOLLOW FOR MORE TRAVEL INSPO', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 14, fontWeight: '600', textColor: '#556677', textAlign: 'center', letterSpacing: 4, name: 'Footer' },
    ]
  },
  // ── 36. Reels — Playlist / Music ──
  {
    id: 'tpl_36', name: 'Music Playlist Reel', category: 'Instagram Reels',
    description: 'Dark aesthetic playlist cover',
    canvasW: 1080, canvasH: 1920, bgColor: '#0A0A12',
    previewColors: ['#0A0A12','#8B5CF6','#E0E0F0'],
    elements: [
      { type: 'rect', x: 190, y: 200, w: 700, h: 700, fill: '#1A1A2E', borderRadius: 24, name: 'Album Art Area' },
      { type: 'rect', x: 190, y: 200, w: 700, h: 700, fill: 'transparent', borderWidth: 2, borderColor: '#8B5CF6', borderRadius: 24, name: 'Album Border' },
      { type: 'text', x: 80, y: 980, w: 920, h: 50, text: 'NOW PLAYING', fill: 'transparent',
        fontFamily: 'JetBrains Mono', fontSize: 16, fontWeight: '500', textColor: '#8B5CF6', letterSpacing: 8, name: 'Label' },
      { type: 'text', x: 80, y: 1050, w: 920, h: 120, text: 'Midnight\nDrive', fill: 'transparent',
        fontFamily: 'Poppins', fontSize: 72, fontWeight: '700', textColor: '#E0E0F0', lineHeight: 1.1, name: 'Song Title' },
      { type: 'text', x: 80, y: 1200, w: 920, h: 40, text: 'Artist Name', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 28, fontWeight: '400', textColor: '#6B6B8A', name: 'Artist' },
      { type: 'rect', x: 80, y: 1310, w: 920, h: 6, fill: '#1A1A2E', borderRadius: 3, name: 'Progress BG' },
      { type: 'rect', x: 80, y: 1310, w: 600, h: 6, fill: '#8B5CF6', borderRadius: 3, name: 'Progress Fill' },
      { type: 'text', x: 80, y: 1330, w: 200, h: 24, text: '2:34', fill: 'transparent',
        fontFamily: 'JetBrains Mono', fontSize: 14, fontWeight: '400', textColor: '#555566', name: 'Time Current' },
      { type: 'text', x: 800, y: 1330, w: 200, h: 24, text: '3:45', fill: 'transparent',
        fontFamily: 'JetBrains Mono', fontSize: 14, fontWeight: '400', textColor: '#555566', textAlign: 'right', name: 'Time Total' },
      { type: 'text', x: 80, y: 1700, w: 920, h: 30, text: 'ADD TO YOUR PLAYLIST \u266A', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 16, fontWeight: '600', textColor: '#8B5CF6', textAlign: 'center', letterSpacing: 3, name: 'CTA' },
    ]
  },
  // ── 37. Reels — Flash Sale ──
  {
    id: 'tpl_37', name: 'Flash Sale Reel', category: 'Instagram Reels',
    description: 'Urgent flash sale with countdown feel',
    canvasW: 1080, canvasH: 1920, bgColor: '#FFFFFF',
    previewColors: ['#FFFFFF','#FF2D55','#111111'],
    elements: [
      { type: 'rect', x: 0, y: 0, w: 1080, h: 300, fill: '#FF2D55', name: 'Top Banner' },
      { type: 'text', x: 80, y: 80, w: 920, h: 140, text: 'FLASH\nSALE', fill: 'transparent',
        fontFamily: 'Bebas Neue', fontSize: 100, fontWeight: '400', textColor: '#FFFFFF', textAlign: 'center', lineHeight: 1.0, name: 'Flash Sale' },
      { type: 'text', x: 140, y: 380, w: 800, h: 200, text: '70%', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 180, fontWeight: '800', textColor: '#FF2D55', textAlign: 'center', lineHeight: 1.0, name: 'Percentage' },
      { type: 'text', x: 140, y: 580, w: 800, h: 50, text: 'OFF EVERYTHING', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 36, fontWeight: '700', textColor: '#111111', textAlign: 'center', letterSpacing: 6, name: 'Off Label' },
      { type: 'line', x: 340, y: 680, w: 400, h: 3, fill: '#FF2D55', name: 'Divider' },
      { type: 'text', x: 140, y: 730, w: 800, h: 36, text: 'ENDS IN', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 18, fontWeight: '600', textColor: '#999999', textAlign: 'center', letterSpacing: 6, name: 'Ends Label' },
      { type: 'rect', x: 180, y: 800, w: 200, h: 140, fill: '#111111', borderRadius: 16, name: 'Hour Box' },
      { type: 'text', x: 180, y: 810, w: 200, h: 90, text: '06', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 72, fontWeight: '700', textColor: '#FFFFFF', textAlign: 'center', name: 'Hours' },
      { type: 'text', x: 180, y: 900, w: 200, h: 26, text: 'HOURS', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 12, fontWeight: '600', textColor: '#888888', textAlign: 'center', letterSpacing: 3, name: 'H Label' },
      { type: 'rect', x: 440, y: 800, w: 200, h: 140, fill: '#111111', borderRadius: 16, name: 'Min Box' },
      { type: 'text', x: 440, y: 810, w: 200, h: 90, text: '24', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 72, fontWeight: '700', textColor: '#FFFFFF', textAlign: 'center', name: 'Minutes' },
      { type: 'text', x: 440, y: 900, w: 200, h: 26, text: 'MINUTES', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 12, fontWeight: '600', textColor: '#888888', textAlign: 'center', letterSpacing: 3, name: 'M Label' },
      { type: 'rect', x: 700, y: 800, w: 200, h: 140, fill: '#111111', borderRadius: 16, name: 'Sec Box' },
      { type: 'text', x: 700, y: 810, w: 200, h: 90, text: '59', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 72, fontWeight: '700', textColor: '#FF2D55', textAlign: 'center', name: 'Seconds' },
      { type: 'text', x: 700, y: 900, w: 200, h: 26, text: 'SECONDS', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 12, fontWeight: '600', textColor: '#888888', textAlign: 'center', letterSpacing: 3, name: 'S Label' },
      { type: 'text', x: 140, y: 1020, w: 800, h: 30, text: 'USE CODE: FLASH70', fill: 'transparent',
        fontFamily: 'JetBrains Mono', fontSize: 22, fontWeight: '700', textColor: '#FF2D55', textAlign: 'center', letterSpacing: 3, name: 'Code' },
    ]
  },
  // ── 38. Reels — Coming Soon ──
  {
    id: 'tpl_38', name: 'Coming Soon Reel', category: 'Instagram Reels',
    description: 'Mysterious dark teaser with launch date',
    canvasW: 1080, canvasH: 1920, bgColor: '#08080F',
    previewColors: ['#08080F','#6C5CE7','#FFFFFF'],
    elements: [
      { type: 'rect', x: 440, y: 350, w: 200, h: 200, fill: '#6C5CE7', borderRadius: 9999, opacity: 15, name: 'Glow 1' },
      { type: 'rect', x: 340, y: 250, w: 400, h: 400, fill: '#6C5CE7', borderRadius: 9999, opacity: 8, name: 'Glow 2' },
      { type: 'text', x: 100, y: 600, w: 880, h: 50, text: 'SOMETHING BIG IS', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 20, fontWeight: '600', textColor: '#6C5CE7', textAlign: 'center', letterSpacing: 10, name: 'Teaser' },
      { type: 'text', x: 80, y: 670, w: 920, h: 200, text: 'COMING\nSOON', fill: 'transparent',
        fontFamily: 'Poppins', fontSize: 110, fontWeight: '700', textColor: '#FFFFFF', textAlign: 'center', lineHeight: 1.05, name: 'Title' },
      { type: 'line', x: 440, y: 920, w: 200, h: 3, fill: '#6C5CE7', name: 'Divider' },
      { type: 'text', x: 140, y: 980, w: 800, h: 80, text: 'Get ready for something that will change everything.', fill: 'transparent',
        fontFamily: 'Inter', fontSize: 26, fontWeight: '400', textColor: '#555566', textAlign: 'center', lineHeight: 1.5, name: 'Subtitle' },
      { type: 'text', x: 200, y: 1140, w: 680, h: 60, text: 'MARCH 15, 2026', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 36, fontWeight: '700', textColor: '#6C5CE7', textAlign: 'center', letterSpacing: 6, name: 'Date' },
      { type: 'rect', x: 280, y: 1680, w: 520, h: 70, fill: '#6C5CE7', borderRadius: 35, name: 'CTA Button' },
      { type: 'text', x: 280, y: 1695, w: 520, h: 40, text: 'NOTIFY ME', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 20, fontWeight: '700', textColor: '#FFFFFF', textAlign: 'center', letterSpacing: 4, name: 'CTA' },
    ]
  },
  // ── 39. Reels — Tips & Tricks ──
  {
    id: 'tpl_39', name: 'Tips & Tricks Reel', category: 'Instagram Reels',
    description: 'Numbered tips list with clean layout',
    canvasW: 1080, canvasH: 1920, bgColor: '#FAFAFA',
    previewColors: ['#FAFAFA','#0984E3','#111111'],
    elements: [
      { type: 'rect', x: 80, y: 140, w: 120, h: 120, fill: '#0984E3', borderRadius: 20, name: 'Icon Box' },
      { type: 'text', x: 80, y: 155, w: 120, h: 90, text: '5', fill: 'transparent',
        fontFamily: 'Poppins', fontSize: 64, fontWeight: '700', textColor: '#FFFFFF', textAlign: 'center', name: 'Number' },
      { type: 'text', x: 230, y: 160, w: 770, h: 90, text: 'Design Tips\nYou Need', fill: 'transparent',
        fontFamily: 'Poppins', fontSize: 40, fontWeight: '700', textColor: '#111111', lineHeight: 1.2, name: 'Title' },
      { type: 'line', x: 80, y: 320, w: 920, h: 2, fill: '#E8E8E8', name: 'Divider' },
      { type: 'text', x: 80, y: 390, w: 80, h: 60, text: '01', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 42, fontWeight: '800', textColor: '#0984E3', name: 'N1' },
      { type: 'text', x: 180, y: 395, w: 820, h: 80, text: 'Use contrast to create\nvisual hierarchy', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 28, fontWeight: '500', textColor: '#333333', lineHeight: 1.4, name: 'Tip 1' },
      { type: 'text', x: 80, y: 540, w: 80, h: 60, text: '02', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 42, fontWeight: '800', textColor: '#0984E3', name: 'N2' },
      { type: 'text', x: 180, y: 545, w: 820, h: 80, text: 'Limit your color palette\nto 3 max', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 28, fontWeight: '500', textColor: '#333333', lineHeight: 1.4, name: 'Tip 2' },
      { type: 'text', x: 80, y: 690, w: 80, h: 60, text: '03', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 42, fontWeight: '800', textColor: '#0984E3', name: 'N3' },
      { type: 'text', x: 180, y: 695, w: 820, h: 80, text: 'White space is your\nbest friend', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 28, fontWeight: '500', textColor: '#333333', lineHeight: 1.4, name: 'Tip 3' },
      { type: 'text', x: 80, y: 840, w: 80, h: 60, text: '04', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 42, fontWeight: '800', textColor: '#0984E3', name: 'N4' },
      { type: 'text', x: 180, y: 845, w: 820, h: 80, text: 'Typography makes or\nbreaks your design', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 28, fontWeight: '500', textColor: '#333333', lineHeight: 1.4, name: 'Tip 4' },
      { type: 'text', x: 80, y: 990, w: 80, h: 60, text: '05', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 42, fontWeight: '800', textColor: '#0984E3', name: 'N5' },
      { type: 'text', x: 180, y: 995, w: 820, h: 80, text: 'Align everything to\na consistent grid', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 28, fontWeight: '500', textColor: '#333333', lineHeight: 1.4, name: 'Tip 5' },
      { type: 'text', x: 80, y: 1750, w: 920, h: 30, text: 'SAVE FOR LATER \u{1F4CC}', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 18, fontWeight: '600', textColor: '#0984E3', textAlign: 'center', letterSpacing: 3, name: 'CTA' },
    ]
  },
  // ── 40. Reels — Before & After ──
  {
    id: 'tpl_40', name: 'Before After Reel', category: 'Instagram Reels',
    description: 'Split comparison before and after',
    canvasW: 1080, canvasH: 1920, bgColor: '#111111',
    previewColors: ['#111111','#E84393','#FFFFFF'],
    elements: [
      { type: 'rect', x: 0, y: 200, w: 1080, h: 620, fill: '#1A1A1A', name: 'Before Area' },
      { type: 'text', x: 60, y: 220, w: 300, h: 40, text: 'BEFORE', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 18, fontWeight: '700', textColor: '#666666', letterSpacing: 6, name: 'Before Label' },
      { type: 'rect', x: 0, y: 900, w: 1080, h: 620, fill: '#1A1A1A', name: 'After Area' },
      { type: 'text', x: 60, y: 920, w: 300, h: 40, text: 'AFTER', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 18, fontWeight: '700', textColor: '#E84393', letterSpacing: 6, name: 'After Label' },
      { type: 'rect', x: 0, y: 840, w: 1080, h: 4, fill: '#E84393', name: 'Divider Line' },
      { type: 'rect', x: 480, y: 810, w: 120, h: 60, fill: '#E84393', borderRadius: 30, name: 'VS Badge' },
      { type: 'text', x: 480, y: 815, w: 120, h: 50, text: 'VS', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 28, fontWeight: '800', textColor: '#FFFFFF', textAlign: 'center', name: 'VS Text' },
      { type: 'text', x: 80, y: 50, w: 920, h: 100, text: 'THE\nTRANSFORMATION', fill: 'transparent',
        fontFamily: 'Bebas Neue', fontSize: 64, fontWeight: '400', textColor: '#FFFFFF', textAlign: 'center', lineHeight: 1.0, name: 'Title' },
      { type: 'text', x: 140, y: 1600, w: 800, h: 80, text: 'Swipe to see the full journey \u2192', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 26, fontWeight: '500', textColor: '#E84393', textAlign: 'center', name: 'CTA' },
    ]
  },
  // ── 41. Reels — Portfolio Showcase ──
  {
    id: 'tpl_41', name: 'Portfolio Showcase Reel', category: 'Instagram Reels',
    description: 'Minimal portfolio piece with project details',
    canvasW: 1080, canvasH: 1920, bgColor: '#F8F8F8',
    previewColors: ['#F8F8F8','#111111','#6C5CE7'],
    elements: [
      { type: 'rect', x: 80, y: 160, w: 920, h: 700, fill: '#ECECEC', borderRadius: 16, name: 'Project Preview' },
      { type: 'text', x: 80, y: 920, w: 920, h: 40, text: 'PROJECT 01 / 06', fill: 'transparent',
        fontFamily: 'JetBrains Mono', fontSize: 16, fontWeight: '500', textColor: '#6C5CE7', letterSpacing: 4, name: 'Project Number' },
      { type: 'text', x: 80, y: 980, w: 920, h: 120, text: 'Brand Identity\nRedesign', fill: 'transparent',
        fontFamily: 'Poppins', fontSize: 56, fontWeight: '700', textColor: '#111111', lineHeight: 1.15, name: 'Project Title' },
      { type: 'line', x: 80, y: 1140, w: 160, h: 4, fill: '#6C5CE7', name: 'Accent Line' },
      { type: 'text', x: 80, y: 1190, w: 920, h: 100, text: 'Complete visual identity system including logo, typography, color palette, and brand guidelines.', fill: 'transparent',
        fontFamily: 'Inter', fontSize: 22, fontWeight: '400', textColor: '#666666', lineHeight: 1.6, name: 'Description' },
      { type: 'text', x: 80, y: 1350, w: 300, h: 30, text: 'CLIENT', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 12, fontWeight: '600', textColor: '#999999', letterSpacing: 4, name: 'Client Label' },
      { type: 'text', x: 80, y: 1385, w: 300, h: 30, text: 'Studio Co.', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 22, fontWeight: '600', textColor: '#111111', name: 'Client Name' },
      { type: 'text', x: 500, y: 1350, w: 300, h: 30, text: 'YEAR', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 12, fontWeight: '600', textColor: '#999999', letterSpacing: 4, name: 'Year Label' },
      { type: 'text', x: 500, y: 1385, w: 300, h: 30, text: '2026', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 22, fontWeight: '600', textColor: '#111111', name: 'Year Value' },
      { type: 'text', x: 80, y: 1750, w: 920, h: 30, text: 'VIEW FULL CASE STUDY \u2192', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 16, fontWeight: '600', textColor: '#6C5CE7', textAlign: 'center', letterSpacing: 3, name: 'CTA' },
    ]
  },
  // ── 42. Reels — Book Recommendation ──
  {
    id: 'tpl_42', name: 'Book Recommendation Reel', category: 'Instagram Reels',
    description: 'Elegant book review with rating',
    canvasW: 1080, canvasH: 1920, bgColor: '#1A1714',
    previewColors: ['#1A1714','#C9A96E','#F5F0E8'],
    elements: [
      { type: 'rect', x: 340, y: 180, w: 400, h: 560, fill: '#2A2520', borderRadius: 8, name: 'Book Cover' },
      { type: 'rect', x: 340, y: 180, w: 400, h: 560, fill: 'transparent', borderWidth: 1, borderColor: '#C9A96E', borderRadius: 8, name: 'Book Border' },
      { type: 'text', x: 80, y: 820, w: 920, h: 40, text: 'BOOK OF THE MONTH', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 16, fontWeight: '600', textColor: '#C9A96E', textAlign: 'center', letterSpacing: 8, name: 'Label' },
      { type: 'text', x: 80, y: 890, w: 920, h: 120, text: 'Atomic\nHabits', fill: 'transparent',
        fontFamily: 'Playfair Display', fontSize: 68, fontWeight: '700', textColor: '#F5F0E8', textAlign: 'center', lineHeight: 1.15, name: 'Book Title' },
      { type: 'text', x: 200, y: 1030, w: 680, h: 36, text: 'by James Clear', fill: 'transparent',
        fontFamily: 'Lora', fontSize: 24, fontWeight: '400', textColor: '#8A7A5A', textAlign: 'center', name: 'Author' },
      { type: 'text', x: 200, y: 1100, w: 680, h: 40, text: '\u2605 \u2605 \u2605 \u2605 \u2605', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 28, fontWeight: '400', textColor: '#C9A96E', textAlign: 'center', letterSpacing: 8, name: 'Rating' },
      { type: 'line', x: 390, y: 1190, w: 300, h: 1, fill: '#C9A96E', name: 'Divider' },
      { type: 'text', x: 100, y: 1230, w: 880, h: 120, text: '\u201CTiny changes, remarkable results. This book rewired how I think about progress.\u201D', fill: 'transparent',
        fontFamily: 'Lora', fontSize: 24, fontWeight: '400', textColor: '#999080', textAlign: 'center', lineHeight: 1.6, name: 'Review' },
      { type: 'text', x: 80, y: 1700, w: 920, h: 30, text: 'SHARE YOUR FAVORITE BOOK BELOW \u{1F4DA}', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 14, fontWeight: '600', textColor: '#C9A96E', textAlign: 'center', letterSpacing: 2, name: 'CTA' },
    ]
  },
  // ── 43. Reels — Morning Routine ──
  {
    id: 'tpl_43', name: 'Morning Routine Reel', category: 'Instagram Reels',
    description: 'Soft warm morning routine steps',
    canvasW: 1080, canvasH: 1920, bgColor: '#FEF9F2',
    previewColors: ['#FEF9F2','#E8985E','#2D2D2D'],
    elements: [
      { type: 'text', x: 80, y: 160, w: 920, h: 50, text: 'MY 5AM', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 20, fontWeight: '600', textColor: '#E8985E', letterSpacing: 10, name: 'Label' },
      { type: 'text', x: 80, y: 220, w: 920, h: 100, text: 'Morning\nRoutine', fill: 'transparent',
        fontFamily: 'Playfair Display', fontSize: 72, fontWeight: '700', textColor: '#2D2D2D', lineHeight: 1.15, name: 'Title' },
      { type: 'line', x: 80, y: 380, w: 200, h: 3, fill: '#E8985E', name: 'Accent Line' },
      { type: 'rect', x: 80, y: 460, w: 920, h: 170, fill: '#FBF3E8', borderRadius: 16, name: 'Step 1 BG' },
      { type: 'text', x: 120, y: 490, w: 100, h: 44, text: '5:00', fill: 'transparent',
        fontFamily: 'JetBrains Mono', fontSize: 20, fontWeight: '600', textColor: '#E8985E', name: 'Time 1' },
      { type: 'text', x: 250, y: 480, w: 700, h: 80, text: 'Wake up & hydrate\nDrink a full glass of lemon water', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 24, fontWeight: '500', textColor: '#2D2D2D', lineHeight: 1.5, name: 'Step 1' },
      { type: 'rect', x: 80, y: 660, w: 920, h: 170, fill: '#FBF3E8', borderRadius: 16, name: 'Step 2 BG' },
      { type: 'text', x: 120, y: 690, w: 100, h: 44, text: '5:15', fill: 'transparent',
        fontFamily: 'JetBrains Mono', fontSize: 20, fontWeight: '600', textColor: '#E8985E', name: 'Time 2' },
      { type: 'text', x: 250, y: 680, w: 700, h: 80, text: 'Journal & gratitude\nWrite 3 things you\u2019re grateful for', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 24, fontWeight: '500', textColor: '#2D2D2D', lineHeight: 1.5, name: 'Step 2' },
      { type: 'rect', x: 80, y: 860, w: 920, h: 170, fill: '#FBF3E8', borderRadius: 16, name: 'Step 3 BG' },
      { type: 'text', x: 120, y: 890, w: 100, h: 44, text: '5:30', fill: 'transparent',
        fontFamily: 'JetBrains Mono', fontSize: 20, fontWeight: '600', textColor: '#E8985E', name: 'Time 3' },
      { type: 'text', x: 250, y: 880, w: 700, h: 80, text: 'Move your body\n20 min yoga or stretch', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 24, fontWeight: '500', textColor: '#2D2D2D', lineHeight: 1.5, name: 'Step 3' },
      { type: 'rect', x: 80, y: 1060, w: 920, h: 170, fill: '#FBF3E8', borderRadius: 16, name: 'Step 4 BG' },
      { type: 'text', x: 120, y: 1090, w: 100, h: 44, text: '6:00', fill: 'transparent',
        fontFamily: 'JetBrains Mono', fontSize: 20, fontWeight: '600', textColor: '#E8985E', name: 'Time 4' },
      { type: 'text', x: 250, y: 1080, w: 700, h: 80, text: 'Healthy breakfast\nSmoothie bowl with fresh fruits', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 24, fontWeight: '500', textColor: '#2D2D2D', lineHeight: 1.5, name: 'Step 4' },
      { type: 'text', x: 80, y: 1720, w: 920, h: 30, text: 'WHAT\u2019S YOUR ROUTINE? \u2615', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 18, fontWeight: '600', textColor: '#E8985E', textAlign: 'center', letterSpacing: 3, name: 'CTA' },
    ]
  },
  // ── 44. Reels — DIY Tutorial ──
  {
    id: 'tpl_44', name: 'DIY Tutorial Reel', category: 'Instagram Reels',
    description: 'Step-by-step craft tutorial',
    canvasW: 1080, canvasH: 1920, bgColor: '#F0F4F8',
    previewColors: ['#F0F4F8','#00B894','#2D3436'],
    elements: [
      { type: 'rect', x: 80, y: 100, w: 200, h: 60, fill: '#00B894', borderRadius: 30, name: 'DIY Badge' },
      { type: 'text', x: 80, y: 110, w: 200, h: 40, text: 'DIY', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 24, fontWeight: '800', textColor: '#FFFFFF', textAlign: 'center', name: 'Badge Text' },
      { type: 'text', x: 80, y: 200, w: 920, h: 120, text: 'Macram\u00E9\nWall Hanging', fill: 'transparent',
        fontFamily: 'Poppins', fontSize: 60, fontWeight: '700', textColor: '#2D3436', lineHeight: 1.15, name: 'Title' },
      { type: 'text', x: 80, y: 350, w: 600, h: 30, text: 'Easy beginner project \u2022 45 min', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 20, fontWeight: '400', textColor: '#636E72', name: 'Subtitle' },
      { type: 'line', x: 80, y: 420, w: 920, h: 2, fill: '#DFE6E9', name: 'Divider' },
      { type: 'rect', x: 80, y: 470, w: 920, h: 280, fill: '#FFFFFF', borderRadius: 16, name: 'Step 1 Card' },
      { type: 'rect', x: 110, y: 500, w: 60, h: 60, fill: '#00B894', borderRadius: 30, name: 'S1 Circle' },
      { type: 'text', x: 110, y: 510, w: 60, h: 40, text: '1', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 28, fontWeight: '700', textColor: '#FFFFFF', textAlign: 'center', name: 'S1 Num' },
      { type: 'text', x: 200, y: 500, w: 760, h: 80, text: 'Gather materials\nCotton rope, wooden dowel, scissors', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 24, fontWeight: '500', textColor: '#2D3436', lineHeight: 1.5, name: 'Step 1 Text' },
      { type: 'rect', x: 80, y: 780, w: 920, h: 280, fill: '#FFFFFF', borderRadius: 16, name: 'Step 2 Card' },
      { type: 'rect', x: 110, y: 810, w: 60, h: 60, fill: '#00B894', borderRadius: 30, name: 'S2 Circle' },
      { type: 'text', x: 110, y: 820, w: 60, h: 40, text: '2', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 28, fontWeight: '700', textColor: '#FFFFFF', textAlign: 'center', name: 'S2 Num' },
      { type: 'text', x: 200, y: 810, w: 760, h: 80, text: 'Cut & attach rope\n12 strands, each 4x the desired length', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 24, fontWeight: '500', textColor: '#2D3436', lineHeight: 1.5, name: 'Step 2 Text' },
      { type: 'rect', x: 80, y: 1090, w: 920, h: 280, fill: '#FFFFFF', borderRadius: 16, name: 'Step 3 Card' },
      { type: 'rect', x: 110, y: 1120, w: 60, h: 60, fill: '#00B894', borderRadius: 30, name: 'S3 Circle' },
      { type: 'text', x: 110, y: 1130, w: 60, h: 40, text: '3', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 28, fontWeight: '700', textColor: '#FFFFFF', textAlign: 'center', name: 'S3 Num' },
      { type: 'text', x: 200, y: 1120, w: 760, h: 80, text: 'Start knotting!\nAlternating square knots pattern', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 24, fontWeight: '500', textColor: '#2D3436', lineHeight: 1.5, name: 'Step 3 Text' },
      { type: 'text', x: 80, y: 1720, w: 920, h: 30, text: 'FULL TUTORIAL ON MY PROFILE \u{1F449}', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 16, fontWeight: '600', textColor: '#00B894', textAlign: 'center', letterSpacing: 3, name: 'CTA' },
    ]
  },
  // ── 45. Reels — Coffee / Caf\u00E9 ──
  {
    id: 'tpl_45', name: 'Coffee Caf\u00E9 Reel', category: 'Instagram Reels',
    description: 'Warm cozy coffee shop aesthetic',
    canvasW: 1080, canvasH: 1920, bgColor: '#2C1810',
    previewColors: ['#2C1810','#D4874E','#F5E6D3'],
    elements: [
      { type: 'rect', x: 290, y: 200, w: 500, h: 500, fill: '#3A2218', borderRadius: 9999, name: 'Circle BG' },
      { type: 'text', x: 80, y: 800, w: 920, h: 50, text: 'FRESHLY BREWED', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 18, fontWeight: '600', textColor: '#D4874E', textAlign: 'center', letterSpacing: 10, name: 'Label' },
      { type: 'text', x: 80, y: 870, w: 920, h: 150, text: 'Morning\nEspresso', fill: 'transparent',
        fontFamily: 'Playfair Display', fontSize: 80, fontWeight: '700', textColor: '#F5E6D3', textAlign: 'center', lineHeight: 1.1, name: 'Title' },
      { type: 'line', x: 390, y: 1070, w: 300, h: 2, fill: '#D4874E', name: 'Divider' },
      { type: 'text', x: 140, y: 1120, w: 800, h: 80, text: 'Single origin beans, roasted to perfection for a smooth, rich flavor.', fill: 'transparent',
        fontFamily: 'Lora', fontSize: 24, fontWeight: '400', textColor: '#A08060', textAlign: 'center', lineHeight: 1.6, name: 'Description' },
      { type: 'rect', x: 250, y: 1280, w: 260, h: 100, fill: '#3A2218', borderRadius: 12, name: 'Price Box 1' },
      { type: 'text', x: 250, y: 1290, w: 260, h: 40, text: 'SMALL', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 12, fontWeight: '600', textColor: '#D4874E', textAlign: 'center', letterSpacing: 3, name: 'Size 1' },
      { type: 'text', x: 250, y: 1330, w: 260, h: 40, text: '$4.50', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 28, fontWeight: '700', textColor: '#F5E6D3', textAlign: 'center', name: 'Price 1' },
      { type: 'rect', x: 570, y: 1280, w: 260, h: 100, fill: '#D4874E', borderRadius: 12, name: 'Price Box 2' },
      { type: 'text', x: 570, y: 1290, w: 260, h: 40, text: 'LARGE', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 12, fontWeight: '600', textColor: '#2C1810', textAlign: 'center', letterSpacing: 3, name: 'Size 2' },
      { type: 'text', x: 570, y: 1330, w: 260, h: 40, text: '$6.00', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 28, fontWeight: '700', textColor: '#FFFFFF', textAlign: 'center', name: 'Price 2' },
      { type: 'text', x: 80, y: 1720, w: 920, h: 30, text: 'ORDER NOW \u2615', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 18, fontWeight: '600', textColor: '#D4874E', textAlign: 'center', letterSpacing: 4, name: 'CTA' },
    ]
  },
  // ── 46. Reels — Fashion Outfit ──
  {
    id: 'tpl_46', name: 'Fashion Outfit Reel', category: 'Instagram Reels',
    description: 'Chic fashion outfit of the day',
    canvasW: 1080, canvasH: 1920, bgColor: '#F5F0EB',
    previewColors: ['#F5F0EB','#1A1A1A','#B76E79'],
    elements: [
      { type: 'rect', x: 140, y: 140, w: 800, h: 900, fill: '#E8E0D6', borderRadius: 20, name: 'Outfit Photo' },
      { type: 'text', x: 80, y: 1100, w: 920, h: 40, text: 'OUTFIT OF THE DAY', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 16, fontWeight: '600', textColor: '#B76E79', letterSpacing: 8, name: 'Label' },
      { type: 'text', x: 80, y: 1160, w: 920, h: 100, text: 'Effortless\nElegance', fill: 'transparent',
        fontFamily: 'Playfair Display', fontSize: 64, fontWeight: '700', textColor: '#1A1A1A', textAlign: 'left', lineHeight: 1.15, name: 'Title' },
      { type: 'line', x: 80, y: 1300, w: 160, h: 3, fill: '#B76E79', name: 'Accent Line' },
      { type: 'text', x: 80, y: 1350, w: 460, h: 30, text: 'TOP', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 13, fontWeight: '600', textColor: '#999999', letterSpacing: 3, name: 'Item 1 Label' },
      { type: 'text', x: 80, y: 1380, w: 460, h: 28, text: 'Silk blouse — Zara', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 20, fontWeight: '500', textColor: '#333333', name: 'Item 1' },
      { type: 'text', x: 560, y: 1350, w: 440, h: 30, text: 'BOTTOM', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 13, fontWeight: '600', textColor: '#999999', letterSpacing: 3, name: 'Item 2 Label' },
      { type: 'text', x: 560, y: 1380, w: 440, h: 28, text: 'Tailored trousers — H&M', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 20, fontWeight: '500', textColor: '#333333', name: 'Item 2' },
      { type: 'text', x: 80, y: 1450, w: 460, h: 30, text: 'SHOES', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 13, fontWeight: '600', textColor: '#999999', letterSpacing: 3, name: 'Item 3 Label' },
      { type: 'text', x: 80, y: 1480, w: 460, h: 28, text: 'Leather loafers — Mango', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 20, fontWeight: '500', textColor: '#333333', name: 'Item 3' },
      { type: 'text', x: 560, y: 1450, w: 440, h: 30, text: 'BAG', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 13, fontWeight: '600', textColor: '#999999', letterSpacing: 3, name: 'Item 4 Label' },
      { type: 'text', x: 560, y: 1480, w: 440, h: 28, text: 'Mini crossbody — COS', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 20, fontWeight: '500', textColor: '#333333', name: 'Item 4' },
      { type: 'text', x: 80, y: 1720, w: 920, h: 30, text: 'SHOP THE LOOK \u{1F6CD}\uFE0F', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 16, fontWeight: '600', textColor: '#B76E79', textAlign: 'center', letterSpacing: 3, name: 'CTA' },
    ]
  },
  // ── 47. Reels — Tech Review ──
  {
    id: 'tpl_47', name: 'Tech Review Reel', category: 'Instagram Reels',
    description: 'Dark tech product review with specs',
    canvasW: 1080, canvasH: 1920, bgColor: '#0A0A0F',
    previewColors: ['#0A0A0F','#00D2FF','#FFFFFF'],
    elements: [
      { type: 'rect', x: 140, y: 180, w: 800, h: 600, fill: '#111118', borderRadius: 20, name: 'Product Area' },
      { type: 'rect', x: 80, y: 840, w: 200, h: 50, fill: '#00D2FF', borderRadius: 25, name: 'Rating Badge' },
      { type: 'text', x: 80, y: 848, w: 200, h: 34, text: '9.2 / 10', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 18, fontWeight: '700', textColor: '#0A0A0F', textAlign: 'center', name: 'Score' },
      { type: 'text', x: 80, y: 930, w: 920, h: 120, text: 'iPhone 17\nPro Max', fill: 'transparent',
        fontFamily: 'Poppins', fontSize: 64, fontWeight: '700', textColor: '#FFFFFF', lineHeight: 1.1, name: 'Product Name' },
      { type: 'text', x: 80, y: 1080, w: 920, h: 30, text: 'HONEST REVIEW AFTER 30 DAYS', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 16, fontWeight: '600', textColor: '#00D2FF', letterSpacing: 4, name: 'Subtitle' },
      { type: 'line', x: 80, y: 1150, w: 920, h: 2, fill: '#1A1A2E', name: 'Divider' },
      { type: 'text', x: 80, y: 1200, w: 440, h: 80, text: 'PROS', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 14, fontWeight: '700', textColor: '#00FF87', letterSpacing: 4, name: 'Pros Label' },
      { type: 'text', x: 80, y: 1240, w: 440, h: 160, text: '\u2713 Incredible camera\n\u2713 Battery lasts all day\n\u2713 Buttery smooth display', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 22, fontWeight: '400', textColor: '#AAAACC', lineHeight: 1.8, name: 'Pros List' },
      { type: 'text', x: 560, y: 1200, w: 440, h: 80, text: 'CONS', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 14, fontWeight: '700', textColor: '#FF6B6B', letterSpacing: 4, name: 'Cons Label' },
      { type: 'text', x: 560, y: 1240, w: 440, h: 160, text: '\u2717 Heavy and bulky\n\u2717 Expensive\n\u2717 Same design again', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 22, fontWeight: '400', textColor: '#AAAACC', lineHeight: 1.8, name: 'Cons List' },
      { type: 'text', x: 80, y: 1720, w: 920, h: 30, text: 'FULL REVIEW IN BIO \u{1F517}', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 16, fontWeight: '600', textColor: '#00D2FF', textAlign: 'center', letterSpacing: 3, name: 'CTA' },
    ]
  },
  // ── 48. Reels — Meditation / Wellness ──
  {
    id: 'tpl_48', name: 'Meditation Wellness Reel', category: 'Instagram Reels',
    description: 'Calm serene wellness and self-care',
    canvasW: 1080, canvasH: 1920, bgColor: '#F0F5F0',
    previewColors: ['#F0F5F0','#4A8C6F','#2D2D2D'],
    elements: [
      { type: 'rect', x: 340, y: 250, w: 400, h: 400, fill: '#D8E8D8', borderRadius: 9999, name: 'Circle' },
      { type: 'rect', x: 290, y: 200, w: 500, h: 500, fill: '#E0EEE0', borderRadius: 9999, opacity: 40, name: 'Outer Circle' },
      { type: 'text', x: 80, y: 780, w: 920, h: 40, text: 'TAKE A BREATH', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 16, fontWeight: '600', textColor: '#4A8C6F', textAlign: 'center', letterSpacing: 10, name: 'Label' },
      { type: 'text', x: 80, y: 840, w: 920, h: 150, text: 'Find Your\nInner Peace', fill: 'transparent',
        fontFamily: 'Playfair Display', fontSize: 72, fontWeight: '700', textColor: '#2D2D2D', textAlign: 'center', lineHeight: 1.15, name: 'Title' },
      { type: 'line', x: 440, y: 1040, w: 200, h: 2, fill: '#4A8C6F', name: 'Divider' },
      { type: 'text', x: 140, y: 1090, w: 800, h: 100, text: '5 minutes of mindfulness can transform your entire day.', fill: 'transparent',
        fontFamily: 'Lora', fontSize: 26, fontWeight: '400', textColor: '#6B7B6B', textAlign: 'center', lineHeight: 1.6, name: 'Message' },
      { type: 'rect', x: 200, y: 1280, w: 280, h: 120, fill: '#FFFFFF', borderRadius: 16, borderWidth: 1, borderColor: '#D0E0D0', name: 'Stat 1' },
      { type: 'text', x: 200, y: 1295, w: 280, h: 50, text: '5 min', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 32, fontWeight: '700', textColor: '#4A8C6F', textAlign: 'center', name: 'Stat 1 Val' },
      { type: 'text', x: 200, y: 1355, w: 280, h: 24, text: 'Daily practice', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 14, fontWeight: '400', textColor: '#999999', textAlign: 'center', name: 'Stat 1 Label' },
      { type: 'rect', x: 600, y: 1280, w: 280, h: 120, fill: '#FFFFFF', borderRadius: 16, borderWidth: 1, borderColor: '#D0E0D0', name: 'Stat 2' },
      { type: 'text', x: 600, y: 1295, w: 280, h: 50, text: '30 days', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 32, fontWeight: '700', textColor: '#4A8C6F', textAlign: 'center', name: 'Stat 2 Val' },
      { type: 'text', x: 600, y: 1355, w: 280, h: 24, text: 'Challenge', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 14, fontWeight: '400', textColor: '#999999', textAlign: 'center', name: 'Stat 2 Label' },
      { type: 'rect', x: 280, y: 1680, w: 520, h: 70, fill: '#4A8C6F', borderRadius: 35, name: 'CTA Button' },
      { type: 'text', x: 280, y: 1695, w: 520, h: 40, text: 'START MEDITATING', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 18, fontWeight: '700', textColor: '#FFFFFF', textAlign: 'center', letterSpacing: 3, name: 'CTA' },
    ]
  },
  // ── 49. Reels — Pet Feature ──
  {
    id: 'tpl_49', name: 'Pet Feature Reel', category: 'Instagram Reels',
    description: 'Adorable pet profile card',
    canvasW: 1080, canvasH: 1920, bgColor: '#FFF8E7',
    previewColors: ['#FFF8E7','#FF8C42','#2D2D2D'],
    elements: [
      { type: 'rect', x: 290, y: 180, w: 500, h: 500, fill: '#FFE8CC', borderRadius: 9999, name: 'Photo Circle' },
      { type: 'text', x: 80, y: 760, w: 920, h: 40, text: 'MEET', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 20, fontWeight: '600', textColor: '#FF8C42', textAlign: 'center', letterSpacing: 12, name: 'Label' },
      { type: 'text', x: 80, y: 810, w: 920, h: 100, text: 'BUDDY', fill: 'transparent',
        fontFamily: 'Poppins', fontSize: 90, fontWeight: '700', textColor: '#2D2D2D', textAlign: 'center', name: 'Pet Name' },
      { type: 'text', x: 200, y: 930, w: 680, h: 36, text: 'Golden Retriever \u2022 3 years old', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 24, fontWeight: '400', textColor: '#8A7A5A', textAlign: 'center', name: 'Breed' },
      { type: 'line', x: 390, y: 1010, w: 300, h: 2, fill: '#FF8C42', name: 'Divider' },
      { type: 'rect', x: 120, y: 1070, w: 260, h: 140, fill: '#FFFFFF', borderRadius: 16, name: 'Trait 1 Card' },
      { type: 'text', x: 120, y: 1090, w: 260, h: 50, text: '\u{1F3BE}', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 36, textAlign: 'center', name: 'Trait 1 Icon' },
      { type: 'text', x: 120, y: 1150, w: 260, h: 30, text: 'Playful', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 18, fontWeight: '600', textColor: '#2D2D2D', textAlign: 'center', name: 'Trait 1' },
      { type: 'rect', x: 410, y: 1070, w: 260, h: 140, fill: '#FFFFFF', borderRadius: 16, name: 'Trait 2 Card' },
      { type: 'text', x: 410, y: 1090, w: 260, h: 50, text: '\u2764\uFE0F', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 36, textAlign: 'center', name: 'Trait 2 Icon' },
      { type: 'text', x: 410, y: 1150, w: 260, h: 30, text: 'Loving', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 18, fontWeight: '600', textColor: '#2D2D2D', textAlign: 'center', name: 'Trait 2' },
      { type: 'rect', x: 700, y: 1070, w: 260, h: 140, fill: '#FFFFFF', borderRadius: 16, name: 'Trait 3 Card' },
      { type: 'text', x: 700, y: 1090, w: 260, h: 50, text: '\u{1F31F}', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 36, textAlign: 'center', name: 'Trait 3 Icon' },
      { type: 'text', x: 700, y: 1150, w: 260, h: 30, text: 'Smart', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 18, fontWeight: '600', textColor: '#2D2D2D', textAlign: 'center', name: 'Trait 3' },
      { type: 'text', x: 100, y: 1300, w: 880, h: 80, text: 'Loves belly rubs, long walks, and stealing socks from the laundry basket.', fill: 'transparent',
        fontFamily: 'Lora', fontSize: 22, fontWeight: '400', textColor: '#6B5B4A', textAlign: 'center', lineHeight: 1.6, name: 'Bio' },
      { type: 'text', x: 80, y: 1720, w: 920, h: 30, text: 'DOUBLE TAP IF YOU LOVE PETS \u{1F43E}', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 16, fontWeight: '600', textColor: '#FF8C42', textAlign: 'center', letterSpacing: 2, name: 'CTA' },
    ]
  },
  // ── 50. Reels — Event Countdown ──
  {
    id: 'tpl_50', name: 'Event Countdown Reel', category: 'Instagram Reels',
    description: 'Bold event countdown with details',
    canvasW: 1080, canvasH: 1920, bgColor: '#0F0A1A',
    previewColors: ['#0F0A1A','#E84393','#FFFFFF'],
    elements: [
      { type: 'text', x: 80, y: 250, w: 920, h: 50, text: 'MARK YOUR CALENDARS', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 16, fontWeight: '600', textColor: '#E84393', textAlign: 'center', letterSpacing: 10, name: 'Label' },
      { type: 'text', x: 80, y: 330, w: 920, h: 200, text: 'DESIGN\nCONF\n2026', fill: 'transparent',
        fontFamily: 'Bebas Neue', fontSize: 120, fontWeight: '400', textColor: '#FFFFFF', textAlign: 'center', lineHeight: 1.0, name: 'Event Title' },
      { type: 'line', x: 340, y: 580, w: 400, h: 4, fill: '#E84393', name: 'Divider' },
      { type: 'rect', x: 130, y: 660, w: 240, h: 200, fill: '#1A1228', borderRadius: 20, name: 'Day Box' },
      { type: 'text', x: 130, y: 680, w: 240, h: 100, text: '15', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 80, fontWeight: '700', textColor: '#E84393', textAlign: 'center', name: 'Days Num' },
      { type: 'text', x: 130, y: 800, w: 240, h: 30, text: 'DAYS', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 16, fontWeight: '600', textColor: '#666688', textAlign: 'center', letterSpacing: 4, name: 'Days Label' },
      { type: 'rect', x: 420, y: 660, w: 240, h: 200, fill: '#1A1228', borderRadius: 20, name: 'Hour Box' },
      { type: 'text', x: 420, y: 680, w: 240, h: 100, text: '08', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 80, fontWeight: '700', textColor: '#FFFFFF', textAlign: 'center', name: 'Hours Num' },
      { type: 'text', x: 420, y: 800, w: 240, h: 30, text: 'HOURS', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 16, fontWeight: '600', textColor: '#666688', textAlign: 'center', letterSpacing: 4, name: 'Hours Label' },
      { type: 'rect', x: 710, y: 660, w: 240, h: 200, fill: '#1A1228', borderRadius: 20, name: 'Min Box' },
      { type: 'text', x: 710, y: 680, w: 240, h: 100, text: '42', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 80, fontWeight: '700', textColor: '#FFFFFF', textAlign: 'center', name: 'Min Num' },
      { type: 'text', x: 710, y: 800, w: 240, h: 30, text: 'MINUTES', fill: 'transparent',
        fontFamily: 'DM Sans', fontSize: 16, fontWeight: '600', textColor: '#666688', textAlign: 'center', letterSpacing: 4, name: 'Min Label' },
      { type: 'text', x: 140, y: 950, w: 800, h: 100, text: 'The biggest design event of the year is almost here. 50+ speakers, workshops, and more.', fill: 'transparent',
        fontFamily: 'Inter', fontSize: 24, fontWeight: '400', textColor: '#8888AA', textAlign: 'center', lineHeight: 1.6, name: 'Description' },
      { type: 'text', x: 200, y: 1100, w: 680, h: 30, text: 'APRIL 15\u201317  \u2022  SAN FRANCISCO', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 18, fontWeight: '600', textColor: '#E84393', textAlign: 'center', letterSpacing: 3, name: 'Location' },
      { type: 'rect', x: 280, y: 1680, w: 520, h: 70, fill: '#E84393', borderRadius: 35, name: 'CTA Button' },
      { type: 'text', x: 280, y: 1695, w: 520, h: 40, text: 'GET YOUR TICKET', fill: 'transparent',
        fontFamily: 'Montserrat', fontSize: 20, fontWeight: '700', textColor: '#FFFFFF', textAlign: 'center', letterSpacing: 3, name: 'CTA' },
    ]
  },
];

// ═══════════════════════════════════════════════════════════
// FONT LIBRARY
// ═══════════════════════════════════════════════════════════
const FONT_LIST = {
  'Sans-Serif': ['DM Sans','Inter','Poppins','Montserrat','Raleway','Open Sans','Nunito','Quicksand'],
  'Serif': ['Playfair Display','Merriweather','Lora','Crimson Text','EB Garamond','Libre Baskerville'],
  'Script': ['Dancing Script','Pacifico','Great Vibes','Satisfy','Sacramento','Cookie','Lobster','Caveat','Kalam'],
  'Display': ['Bebas Neue','Righteous','Fredoka One','Permanent Marker','Bangers','Bungee','Rubik Bubbles'],
  'Mono': ['JetBrains Mono','Fira Code','Source Code Pro']
};
const ALL_FONTS = Object.values(FONT_LIST).flat();

// ═══════════════════════════════════════════════════════════
// SHAPE CLIP-PATH DEFINITIONS
// ═══════════════════════════════════════════════════════════
const CLIP_PATHS = {
  rect: null,
  circle: 'circle(50% at 50% 50%)',
  triangle: 'polygon(50% 0%, 0% 100%, 100% 100%)',
  star: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
  hexagon: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
  pentagon: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
  diamond: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
  arrow: 'polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)',
  heart: 'polygon(50% 15%, 60% 2%, 72% 0%, 85% 2%, 95% 12%, 100% 25%, 98% 40%, 90% 55%, 78% 68%, 65% 80%, 50% 95%, 35% 80%, 22% 68%, 10% 55%, 2% 40%, 0% 25%, 5% 12%, 15% 2%, 28% 0%, 40% 2%)',
  cross: 'polygon(35% 0%, 65% 0%, 65% 35%, 100% 35%, 100% 65%, 65% 65%, 65% 100%, 35% 100%, 35% 65%, 0% 65%, 0% 35%, 35% 35%)',
  roundedRect: null,
  oval: 'ellipse(50% 50% at 50% 50%)',
  octagon: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
  parallelogram: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)',
  trapezoid: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
  chevron: 'polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%)',
  arrowLeft: 'polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%)',
  speechBubble: 'polygon(0% 0%, 100% 0%, 100% 70%, 60% 70%, 40% 100%, 40% 70%, 0% 70%)',
  shield: 'polygon(50% 0%, 100% 15%, 100% 55%, 75% 85%, 50% 100%, 25% 85%, 0% 55%, 0% 15%)',
  semicircle: 'polygon(0% 100%, 0% 50%, 2% 38%, 7% 26%, 15% 15%, 26% 7%, 38% 2%, 50% 0%, 62% 2%, 74% 7%, 85% 15%, 93% 26%, 98% 38%, 100% 50%, 100% 100%)',
  lightning: 'polygon(40% 0%, 65% 0%, 50% 40%, 75% 40%, 35% 100%, 45% 55%, 25% 55%)',
  ribbon: 'polygon(0% 0%, 100% 0%, 100% 80%, 50% 100%, 0% 80%)',
  star6: 'polygon(50% 0%, 63% 25%, 93% 25%, 75% 50%, 93% 75%, 63% 75%, 50% 100%, 37% 75%, 7% 75%, 25% 50%, 7% 25%, 37% 25%)',
  star8: 'polygon(50% 0%, 62% 19%, 85% 15%, 81% 38%, 100% 50%, 81% 62%, 85% 85%, 62% 81%, 50% 100%, 38% 81%, 15% 85%, 19% 62%, 0% 50%, 19% 38%, 15% 15%, 38% 19%)',
  rhombus: 'polygon(50% 0%, 85% 50%, 50% 100%, 15% 50%)',
};

const SVG_SHAPE_TYPES = ['triangle','star','hexagon','pentagon','diamond','arrow','heart','cross','octagon','parallelogram','trapezoid','chevron','arrowLeft','speechBubble','shield','semicircle','lightning','ribbon','star6','star8','rhombus'];

// ═══════════════════════════════════════════════════════════
// EXTRA SHAPES (data-driven registry)
// ═══════════════════════════════════════════════════════════
const EXTRA_SHAPES = {
  // --- Decorative ---
  crescent: {
    path: 'M70 2A48 48 0 1 0 70 98A33 33 0 1 1 70 2Z',
    fillRule: 'evenodd', fill: '#f1c40f', name: 'Crescent', w: 150, h: 150
  },
  teardrop: {
    path: 'M50 2C30 28 8 52 8 72A42 42 0 0 0 92 72C92 52 70 28 50 2Z',
    fill: '#3498db', name: 'Teardrop', w: 120, h: 180
  },
  cloud: {
    path: 'M25 68L20 68A17 17 0 0 1 18 35A22 22 0 0 1 48 15A22 22 0 0 1 78 18A17 17 0 0 1 82 35A17 17 0 0 1 80 68Z',
    fill: '#b2bec3', name: 'Cloud', w: 200, h: 130
  },
  ring: {
    path: 'M50 2A48 48 0 1 1 49.99 2ZM50 22A28 28 0 1 0 50.01 22Z',
    fillRule: 'evenodd', fill: '#e17055', name: 'Ring', w: 170, h: 170
  },
  leaf: {
    path: 'M50 95C22 75 5 50 12 25C20 5 42 0 50 0C58 0 80 5 88 25C95 50 78 75 50 95Z',
    fill: '#00b894', name: 'Leaf', w: 140, h: 180
  },
  wave: {
    path: 'M0 55C18 25 35 25 50 50C65 75 82 75 100 45L100 100L0 100Z',
    fill: '#74b9ff', name: 'Wave', w: 220, h: 140
  },
  pin: {
    path: 'M50 97C50 97 12 58 12 35A38 38 0 1 1 88 35C88 58 50 97 50 97ZM50 22A14 14 0 1 0 50.01 48A14 14 0 1 0 50 22Z',
    fillRule: 'evenodd', fill: '#d63031', name: 'Location Pin', w: 130, h: 190
  },
  chatRound: {
    path: 'M15 8Q5 8 5 18L5 55Q5 65 15 65L22 65L18 85L42 65L85 65Q95 65 95 55L95 18Q95 8 85 8Z',
    fill: '#dfe6e9', name: 'Chat Bubble', w: 200, h: 160
  },
  eye: {
    path: 'M2 50C2 50 22 15 50 15C78 15 98 50 98 50C98 50 78 85 50 85C22 85 2 50 2 50ZM50 30A20 20 0 1 0 50.01 70A20 20 0 1 0 50 30Z',
    fillRule: 'evenodd', fill: '#6c5ce7', name: 'Eye', w: 200, h: 130
  },
  moon: {
    path: 'M40 5A45 45 0 1 0 40 95A50 50 0 0 1 40 5Z',
    fill: '#2d3436', name: 'Moon', w: 150, h: 150
  },
  // --- Arrows & Symbols ---
  arrowUp: {
    poly: [[50,0],[100,45],[70,45],[70,100],[30,100],[30,45],[0,45]],
    fill: '#636e72', name: 'Arrow Up', w: 130, h: 180
  },
  arrowDown: {
    poly: [[30,0],[70,0],[70,55],[100,55],[50,100],[0,55],[30,55]],
    fill: '#636e72', name: 'Arrow Down', w: 130, h: 180
  },
  xMark: {
    poly: [[28,0],[50,22],[72,0],[100,28],[78,50],[100,72],[72,100],[50,78],[28,100],[0,72],[22,50],[0,28]],
    fill: '#d63031', name: 'X Mark', w: 150, h: 150
  },
  doubleArrow: {
    poly: [[0,50],[25,15],[25,35],[75,35],[75,15],[100,50],[75,85],[75,65],[25,65],[25,85]],
    fill: '#0984e3', name: 'Double Arrow', w: 200, h: 120
  },
  // --- Badges ---
  starburst: {
    poly: (function() {
      var pts = [], n = 16;
      for (var i = 0; i < n; i++) {
        var a = (i / n) * Math.PI * 2 - Math.PI / 2;
        var r = i % 2 === 0 ? 50 : 28;
        pts.push([Math.round((50 + r * Math.cos(a)) * 10) / 10, Math.round((50 + r * Math.sin(a)) * 10) / 10]);
      }
      return pts;
    })(), fill: '#fdcb6e', name: 'Starburst', w: 170, h: 170
  },
  explosion: {
    poly: (function() {
      var pts = [], n = 12;
      for (var i = 0; i < n; i++) {
        var a = (i / n) * Math.PI * 2 - Math.PI / 2;
        var r = i % 2 === 0 ? 50 : 20;
        pts.push([Math.round((50 + r * Math.cos(a)) * 10) / 10, Math.round((50 + r * Math.sin(a)) * 10) / 10]);
      }
      return pts;
    })(), fill: '#e74c3c', name: 'Explosion', w: 170, h: 170
  },
  badge: {
    poly: (function() {
      var pts = [], n = 24;
      for (var i = 0; i < n; i++) {
        var a = (i / n) * Math.PI * 2 - Math.PI / 2;
        var r = i % 2 === 0 ? 50 : 42;
        pts.push([Math.round((50 + r * Math.cos(a)) * 10) / 10, Math.round((50 + r * Math.sin(a)) * 10) / 10]);
      }
      return pts;
    })(), fill: '#6c5ce7', name: 'Badge', w: 170, h: 170
  },
  tag: {
    poly: [[5,0],[70,0],[100,50],[70,100],[5,100]],
    fill: '#e17055', name: 'Tag', w: 180, h: 120
  },
  bannerH: {
    poly: [[8,10],[92,10],[100,50],[92,90],[8,90],[0,50]],
    fill: '#d63031', name: 'Banner', w: 200, h: 120
  },
  // --- Nature & Objects ---
  mountain: {
    poly: [[0,100],[28,25],[42,55],[62,12],[78,48],[100,100]],
    fill: '#2d3436', name: 'Mountain', w: 220, h: 160
  },
  house: {
    poly: [[50,0],[100,40],[82,40],[82,100],[62,100],[62,60],[38,60],[38,100],[18,100],[18,40],[0,40]],
    fill: '#636e72', name: 'House', w: 170, h: 170
  },
  tree: {
    poly: [[50,0],[80,35],[65,35],[85,60],[62,60],[62,100],[38,100],[38,60],[15,60],[35,35],[20,35]],
    fill: '#27ae60', name: 'Tree', w: 140, h: 190
  },
  sun: {
    poly: (function() {
      var pts = [], n = 24;
      for (var i = 0; i < n; i++) {
        var a = (i / n) * Math.PI * 2 - Math.PI / 2;
        var r = i % 2 === 0 ? 50 : 30;
        pts.push([Math.round((50 + r * Math.cos(a)) * 10) / 10, Math.round((50 + r * Math.sin(a)) * 10) / 10]);
      }
      return pts;
    })(), fill: '#f39c12', name: 'Sun', w: 170, h: 170
  },
  flower: {
    path: 'M50 38A14 14 0 1 1 50.01 38ZM50 22A15 15 0 0 1 62 3A15 15 0 0 1 50 22ZM50 22A15 15 0 0 1 80 15A15 15 0 0 1 50 22ZM78 50A15 15 0 0 1 97 38A15 15 0 0 1 78 50ZM78 50A15 15 0 0 1 80 85A15 15 0 0 1 78 50ZM50 78A15 15 0 0 1 62 97A15 15 0 0 1 50 78ZM50 78A15 15 0 0 1 20 85A15 15 0 0 1 50 78ZM22 50A15 15 0 0 1 3 62A15 15 0 0 1 22 50ZM22 50A15 15 0 0 1 20 15A15 15 0 0 1 22 50Z',
    fill: '#fd79a8', name: 'Flower', w: 170, h: 170
  },
};
