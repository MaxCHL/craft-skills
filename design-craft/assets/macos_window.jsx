/**
 * macOS Window Frame component.
 *
 * Usage: inline this file into your HTML <script type="text/babel"> block.
 * Requires the React global object (uses React.useState, not destructured useState).
 *
 * Presets (content area size, title bar adds 28px):
 *   "default"  — 1280×800
 *   "large"    — 1440×900
 *   "small"    — 960×600
 *   "dialog"   — 640×480
 *
 * Props:
 *   preset    — preset name  (default: "default")
 *   width     — number, overrides preset content width
 *   height    — number, overrides preset content height
 *   title     — string (default: "")
 *   dark      — boolean, dark window chrome (default: false)
 *   className — string
 */

const MacOSWindow = ({
  children,
  preset = "default",
  width: widthProp,
  height: heightProp,
  title = "",
  dark = false,
  className,
}) => {
  const PRESETS = {
    default: { width: 1280, height: 800 },
    large:   { width: 1440, height: 900 },
    small:   { width: 960,  height: 600 },
    dialog:  { width: 640,  height: 480 },
  };

  const base = PRESETS[preset] || PRESETS.default;
  const contentWidth  = widthProp  ?? base.width;
  const contentHeight = heightProp ?? base.height;

  const TITLE_BAR_HEIGHT = 28;

  // Traffic light definitions: id, base color, border color, hover icon SVG path
  const LIGHTS = [
    {
      id: "close",
      color:  "#FF5F57",
      border: "#E0524E",
      icon: (
        // × close
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <line x1="1.5" y1="1.5" x2="6.5" y2="6.5" stroke="rgba(0,0,0,0.45)" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="6.5" y1="1.5" x2="1.5" y2="6.5" stroke="rgba(0,0,0,0.45)" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      id: "minimize",
      color:  "#FEBC2E",
      border: "#E6A82A",
      icon: (
        // − minimize
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <line x1="1.5" y1="4" x2="6.5" y2="4" stroke="rgba(0,0,0,0.45)" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      id: "zoom",
      color:  "#28C840",
      border: "#1EB135",
      icon: (
        // ↗ zoom (two diagonal arrows indicating expand)
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <line x1="1.5" y1="6.5" x2="6.5" y2="1.5" stroke="rgba(0,0,0,0.45)" strokeWidth="1.25" strokeLinecap="round"/>
          <polyline points="3.5,1.5 6.5,1.5 6.5,4.5" stroke="rgba(0,0,0,0.45)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <line x1="1.5" y1="6.5" x2="6.5" y2="1.5" stroke="rgba(0,0,0,0.45)" strokeWidth="1.25" strokeLinecap="round"/>
          <polyline points="4.5,6.5 1.5,6.5 1.5,3.5" stroke="rgba(0,0,0,0.45)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      ),
    },
  ];

  // Track hover state per traffic light button
  const [hoveredLight, setHoveredLight] = React.useState(null);

  const titleBarBg = dark
    ? "rgba(40,40,40,0.95)"
    : "#EBEBEB";

  const titleBarStyle = {
    height: TITLE_BAR_HEIGHT,
    background: titleBarBg,
    backdropFilter: dark ? "blur(20px)" : undefined,
    WebkitBackdropFilter: dark ? "blur(20px)" : undefined,
    display: "flex",
    alignItems: "center",
    position: "relative",
    userSelect: "none",
    flexShrink: 0,
  };

  const titleTextStyle = {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 14,
    fontWeight: 500,
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
    color: dark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.75)",
    pointerEvents: "none",
    // Prevent text from overlapping traffic lights on very narrow windows
    paddingLeft: 72,
    paddingRight: 72,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };

  return (
    <div
      className={className}
      style={{
        width: contentWidth,
        display: "inline-flex",
        flexDirection: "column",
        borderRadius: 10,
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.12)",
        flexShrink: 0,
      }}
    >
      {/* Title bar */}
      <div style={titleBarStyle}>

        {/* Traffic lights — absolutely positioned at left:12, vertically centered */}
        <div style={{
          position: "absolute",
          left: 12,
          top: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          gap: 0, // gap handled via explicit left positions below
        }}>
          {LIGHTS.map((light, index) => {
            const isHovered = hoveredLight === light.id;
            // left offsets: 0, 16, 32 (center-to-center 8px on 12px diameter buttons = left gap of 4px → positions 0, 16, 32)
            const offsetLeft = index * 16;
            return (
              <div
                key={light.id}
                onMouseEnter={() => setHoveredLight(light.id)}
                onMouseLeave={() => setHoveredLight(null)}
                style={{
                  position: "absolute",
                  left: offsetLeft,
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: light.color,
                  border: `1px solid ${light.border}`,
                  boxSizing: "border-box",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "default",
                  transition: "filter 0.1s ease",
                  filter: isHovered ? "brightness(0.9)" : "none",
                }}
              >
                {/* Show icon on hover */}
                {isHovered && (
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    // Shift icon into the center of the button (SVG is 8×8 inside 12×12)
                    lineHeight: 0,
                  }}>
                    {light.icon}
                  </div>
                )}
              </div>
            );
          })}
          {/* Invisible spacer to hold the row width so the parent flex row is sized correctly */}
          <div style={{ width: 12 + 16 * 2, height: 12, visibility: "hidden", flexShrink: 0 }} />
        </div>

        {/* Centered window title */}
        {title && (
          <span style={titleTextStyle}>{title}</span>
        )}
      </div>

      {/* Content area */}
      <div style={{
        width: contentWidth,
        height: contentHeight,
        position: "relative",
        overflow: "hidden",
        background: "#FFFFFF",
      }}>
        {children}
      </div>
    </div>
  );
};
