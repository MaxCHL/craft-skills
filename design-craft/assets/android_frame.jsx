/**
 * Android Frame component — model-agnostic, preset-driven.
 *
 * Usage: inline this file into your HTML <script type="text/babel"> block.
 *
 * Presets:
 *   "pixel"          — 412×917  punch-hole center  (Pixel 9)              [default]
 *   "pixel-compact"  — 393×851  punch-hole center  (Pixel 9a)
 *   "samsung-s"      — 360×780  punch-hole center  (Galaxy S24)
 *   "samsung-plus"   — 384×854  punch-hole center  (Galaxy S24+)
 *   "ultra"          — 384×832  punch-hole center  (Galaxy S24 Ultra)
 *
 * Props:
 *   preset        — preset name  (default: "pixel")
 *   width         — number, overrides preset width
 *   height        — number, overrides preset height
 *   statusBarTime — string (default: "9:41")
 *   dark          — boolean, dark device shell (default: true)
 *   className     — string
 */

const ANDROID_PRESETS = {
  "pixel":         { width: 412, height: 917, radius: 45 },
  "pixel-compact": { width: 393, height: 851, radius: 45 },
  "samsung-s":     { width: 360, height: 780, radius: 42 },
  "samsung-plus":  { width: 384, height: 854, radius: 42 },
  "ultra":         { width: 384, height: 832, radius: 42 },
};

const AndroidFrame = ({
  children,
  preset        = "pixel",
  width:  wProp,
  height: hProp,
  statusBarTime = "9:41",
  dark          = true,
  className     = "",
}) => {
  const base       = ANDROID_PRESETS[preset] ?? ANDROID_PRESETS["pixel"];
  const W          = wProp ?? base.width;
  const H          = hProp ?? base.height;
  const radius     = base.radius;

  // Scale side-button positions proportionally to height
  const btnScale   = H / 917;
  const shellColor = dark ? "#1C1C1C" : "#E0E0E0";
  const btnColor   = dark ? "#383838" : "#C4C4C4";

  // Android status bar is always 24px (Material standard)
  const statusH    = 24;

  // Gesture navigation space at bottom (no hard nav bar — modern gesture nav)
  const contentBottom = 21;

  return (
    <div
      className={`android-frame ${className}`}
      style={{
        position:     "relative",
        width:        W,
        height:       H,
        background:   shellColor,
        borderRadius: radius,
        boxShadow: dark
          ? "0 0 0 2px #383838, 0 30px 80px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.06)"
          : "0 0 0 2px #C0C0C0, 0 30px 80px rgba(0,0,0,0.2),  inset 0 0 0 1px rgba(255,255,255,0.6)",
        overflow:     "hidden",
        flexShrink:   0,
      }}
    >
      {/* Volume up button (left side) */}
      <div style={{ position:"absolute", left:-3, top: Math.round(200*btnScale), width:3, height:Math.round(60*btnScale), background:btnColor, borderRadius:"2px 0 0 2px" }} />
      {/* Volume down button (left side) */}
      <div style={{ position:"absolute", left:-3, top: Math.round(274*btnScale), width:3, height:Math.round(60*btnScale), background:btnColor, borderRadius:"2px 0 0 2px" }} />
      {/* Power button (right side) */}
      <div style={{ position:"absolute", right:-3, top: Math.round(230*btnScale), width:3, height:Math.round(72*btnScale), background:btnColor, borderRadius:"0 2px 2px 0" }} />

      {/* Screen */}
      <div style={{
        position:     "absolute",
        inset:        0,
        borderRadius: radius,
        overflow:     "hidden",
        background:   "#FFFFFF",
      }}>

        {/* Punch-hole camera — centered at top */}
        <div style={{
          position:     "absolute",
          top:          14,
          left:         "50%",
          transform:    "translateX(-50%)",
          width:        12,
          height:       12,
          background:   "#000",
          borderRadius: "50%",
          zIndex:       100,
        }} />

        {/* Status bar */}
        <div style={{
          position:       "absolute",
          top:            0,
          left:           0,
          right:          0,
          height:         statusH,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          padding:        "0 16px",
          zIndex:         99,
          fontSize:       11,
          fontWeight:     500,
          fontFamily:     "'Google Sans', 'Roboto', sans-serif",
          color:          "inherit",
          pointerEvents:  "none",
        }}>
          {/* Time — left side */}
          <span style={{ letterSpacing: 0.2 }}>{statusBarTime}</span>

          {/* Icons — right side */}
          <div style={{ display:"flex", gap:5, alignItems:"center" }}>
            {/* Wi-Fi icon (Material style) */}
            <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
              <path d="M8 9.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"/>
              <path d="M8 6.2c1.6 0 3 .65 4.1 1.7L13.3 6.6A7.2 7.2 0 002.7 6.6l1.2 1.3C5 6.85 6.4 6.2 8 6.2z" opacity="0.65"/>
              <path d="M8 2.8c2.6 0 5 1.05 6.7 2.75L16 4.3A10 10 0 000 4.3l1.3 1.25C3 3.85 5.4 2.8 8 2.8z" opacity="0.35"/>
            </svg>
            {/* Signal bars (Material style) */}
            <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
              <rect x="0"    y="7"  width="3" height="5"  rx="0.5" opacity="0.35"/>
              <rect x="4.5"  y="5"  width="3" height="7"  rx="0.5" opacity="0.6"/>
              <rect x="9"    y="3"  width="3" height="9"  rx="0.5" opacity="0.8"/>
              <rect x="13.5" y="1"  width="2.5" height="11" rx="0.5"/>
            </svg>
            {/* Battery icon (Material style) */}
            <svg width="22" height="12" viewBox="0 0 22 12" fill="currentColor">
              <rect x="0"   y="1.5" width="18" height="9"  rx="2" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.35"/>
              <rect x="19"  y="4"   width="2"  height="4"  rx="1" opacity="0.4"/>
              <rect x="1.5" y="3"   width="13" height="6"  rx="1.5"/>
            </svg>
          </div>
        </div>

        {/* App content area */}
        <div style={{
          position: "absolute",
          top:      statusH,
          left:     0,
          right:    0,
          bottom:   contentBottom,
          overflow: "hidden",
        }}>
          {children}
        </div>

        {/* Gesture navigation bar (pill indicator) */}
        <div style={{
          position:      "absolute",
          bottom:        8,
          left:          "50%",
          transform:     "translateX(-50%)",
          width:         Math.round(W * 0.30),
          height:        4,
          background:    "currentColor",
          borderRadius:  2,
          opacity:       0.2,
          pointerEvents: "none",
        }} />

      </div>
    </div>
  );
};

// Convenience wrapper for individual app screens
const AndroidScreen = ({ children, bg = "#FFFFFF", style = {} }) => (
  <div style={{ width:"100%", height:"100%", background:bg, overflow:"hidden", ...style }}>
    {children}
  </div>
);
