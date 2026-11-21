/**
 * iOS Frame component — model-agnostic, preset-driven.
 *
 * Usage: inline this file into your HTML <script type="text/babel"> block.
 *
 * Presets (tracks current lineup, not tied to a specific model year):
 *   "standard"  — 393×852   Dynamic Island  (iPhone 16 / 17)              [default]
 *   "pro"       — 402×874   Dynamic Island  (iPhone 16 Pro / 17 Pro)
 *   "pro-max"   — 440×956   Dynamic Island  (iPhone 16 Pro Max / 17 Pro Max)
 *   "se"        — 375×667   Home button     (iPhone SE)
 *
 * Or pass width + height directly to override any preset:
 *   <IOSFrame width={430} height={932} island={true}>
 *
 * Props:
 *   preset        — "standard" | "pro" | "pro-max" | "se"  (default: "standard")
 *   width         — number, overrides preset width
 *   height        — number, overrides preset height
 *   island        — boolean, overrides preset Dynamic Island visibility
 *   homeButton    — boolean, overrides preset Home button visibility
 *   statusBarTime — string (default: "9:41")
 *   dark          — boolean, dark device shell (default: true)
 *   className     — string
 */

const IOS_PRESETS = {
  standard: { width: 393, height: 852, island: true,  homeButton: false, radius: 54 },
  pro:      { width: 402, height: 874, island: true,  homeButton: false, radius: 55 },
  "pro-max":{ width: 440, height: 956, island: true,  homeButton: false, radius: 58 },
  se:       { width: 375, height: 667, island: false, homeButton: true,  radius: 40 },
};

const IOSFrame = ({
  children,
  preset        = "standard",
  width:  wProp,
  height: hProp,
  island:     islandProp,
  homeButton: homeProp,
  statusBarTime = "9:41",
  dark          = true,
  className     = "",
}) => {
  const base       = IOS_PRESETS[preset] ?? IOS_PRESETS.standard;
  const W          = wProp      ?? base.width;
  const H          = hProp      ?? base.height;
  const hasIsland  = islandProp ?? base.island;
  const hasHome    = homeProp   ?? base.homeButton;
  const radius     = base.radius;

  // Scale side-button positions proportionally to height
  const btnScale   = H / 852;
  const shellColor = dark ? "#1A1A1A" : "#E8E8E8";
  const btnColor   = dark ? "#3A3A3A" : "#C8C8C8";

  // Dynamic Island dimensions (proportional to width)
  const islandW    = Math.round(W * 0.321); // ~126px at 393px width
  const islandH    = Math.round(W * 0.094); // ~37px at 393px width

  // Status bar height: taller when there's an island, shorter for SE
  const statusH    = hasIsland ? 59 : hasHome ? 44 : 50;

  // Content area bottom offset: home indicator vs home button
  const contentBottom = hasHome ? 0 : 34;

  return (
    <div
      className={`ios-frame ${className}`}
      style={{
        position:  "relative",
        width:     W,
        height:    H,
        background: shellColor,
        borderRadius: radius,
        boxShadow: dark
          ? "0 0 0 2px #3A3A3A, 0 30px 80px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.08)"
          : "0 0 0 2px #C0C0C0, 0 30px 80px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(255,255,255,0.6)",
        overflow:  "hidden",
        flexShrink: 0,
      }}
    >
      {/* Silent / volume buttons (left side) */}
      <div style={{ position:"absolute", left:-3, top: Math.round(160*btnScale), width:3, height:Math.round(36*btnScale), background:btnColor, borderRadius:"2px 0 0 2px" }} />
      <div style={{ position:"absolute", left:-3, top: Math.round(210*btnScale), width:3, height:Math.round(64*btnScale), background:btnColor, borderRadius:"2px 0 0 2px" }} />
      <div style={{ position:"absolute", left:-3, top: Math.round(284*btnScale), width:3, height:Math.round(64*btnScale), background:btnColor, borderRadius:"2px 0 0 2px" }} />
      {/* Power button (right side) */}
      <div style={{ position:"absolute", right:-3, top: Math.round(200*btnScale), width:3, height:Math.round(80*btnScale), background:btnColor, borderRadius:"0 2px 2px 0" }} />

      {/* Screen */}
      <div style={{
        position:     "absolute",
        inset:        0,
        borderRadius: radius,
        overflow:     "hidden",
        background:   "#FFFFFF",
      }}>

        {/* Dynamic Island */}
        {hasIsland && (
          <div style={{
            position:      "absolute",
            top:           14,
            left:          "50%",
            transform:     "translateX(-50%)",
            width:         islandW,
            height:        islandH,
            background:    "#000",
            borderRadius:  islandH / 2,
            zIndex:        100,
          }} />
        )}

        {/* SE notch area — thick top bezel, no cutout needed */}

        {/* Status bar */}
        <div style={{
          position:       "absolute",
          top:            0,
          left:           0,
          right:          0,
          height:         statusH,
          display:        "flex",
          alignItems:     "flex-end",
          justifyContent: "space-between",
          padding:        "0 28px 8px",
          zIndex:         99,
          fontSize:       15,
          fontWeight:     600,
          fontFamily:     "-apple-system, 'SF Pro Display', sans-serif",
          color:          "inherit",
          pointerEvents:  "none",
        }}>
          <span>{statusBarTime}</span>
          <div style={{ display:"flex", gap:6, alignItems:"center" }}>
            {/* Cellular signal bars */}
            <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
              <rect x="0"    y="6" width="3" height="6" rx="1" opacity="0.4"/>
              <rect x="4.5"  y="4" width="3" height="8" rx="1" opacity="0.6"/>
              <rect x="9"    y="2" width="3" height="10" rx="1" opacity="0.8"/>
              <rect x="13.5" y="0" width="3" height="12" rx="1"/>
            </svg>
            {/* Wi-Fi */}
            <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
              <path d="M8 9.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"/>
              <path d="M8 6C9.8 6 11.4 6.7 12.6 7.8L14 6.4A8 8 0 002 6.4l1.4 1.4C4.6 6.7 6.2 6 8 6z" opacity="0.6"/>
              <path d="M8 2.5c2.8 0 5.3 1.1 7.1 3L16.5 4A10.5 10.5 0 000 4l1.4 1.5C3.2 3.6 5.5 2.5 8 2.5z" opacity="0.3"/>
            </svg>
            {/* Battery */}
            <svg width="25" height="12" viewBox="0 0 25 12" fill="currentColor">
              <rect x="0"   y="1" width="21" height="10" rx="3" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.35"/>
              <rect x="22"  y="4" width="2"  height="4"  rx="1" opacity="0.4"/>
              <rect x="1.5" y="2.5" width="16" height="7" rx="2"/>
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

        {/* Home indicator (swipe bar) — modern iPhones */}
        {!hasHome && (
          <div style={{
            position:  "absolute",
            bottom:    8,
            left:      "50%",
            transform: "translateX(-50%)",
            width:     Math.round(W * 0.34),
            height:    5,
            background: "currentColor",
            borderRadius: 3,
            opacity:   0.2,
            pointerEvents: "none",
          }} />
        )}

        {/* Home button — SE */}
        {hasHome && (
          <div style={{
            position:     "absolute",
            bottom:       12,
            left:         "50%",
            transform:    "translateX(-50%)",
            width:        56,
            height:       56,
            borderRadius: "50%",
            border:       "2px solid rgba(0,0,0,0.15)",
            background:   "rgba(0,0,0,0.04)",
            pointerEvents: "none",
          }} />
        )}
      </div>
    </div>
  );
};

// Convenience wrapper for individual app screens
const AppScreen = ({ children, bg = "#FFFFFF", style = {} }) => (
  <div style={{ width:"100%", height:"100%", background:bg, overflow:"hidden", ...style }}>
    {children}
  </div>
);
