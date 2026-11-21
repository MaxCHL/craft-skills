/**
 * Browser window frame component.
 * Usage: inline this file into your HTML <script type="text/babel"> block.
 *
 * <BrowserWindow url="https://yoursite.com" width={1280} height={800}>
 *   <YourContent />
 * </BrowserWindow>
 */

const BrowserWindow = ({
  children,
  url = "https://example.com",
  width = 1280,
  height = 800,
  theme = "light", // "light" | "dark"
}) => {
  const isDark = theme === "dark";
  const chrome = {
    bg:     isDark ? "#2D2D2D" : "#F0F0F0",
    border: isDark ? "#1A1A1A" : "#CCCCCC",
    dot1:   "#FF5F57",
    dot2:   "#FEBC2E",
    dot3:   "#28C840",
    urlBg:  isDark ? "#3C3C3C" : "#FFFFFF",
    urlText:isDark ? "#AAAAAA" : "#666666",
    bar:    isDark ? "#3A3A3A" : "#E0E0E0",
  };

  return (
    <div style={{
      width,
      display: "flex",
      flexDirection: "column",
      borderRadius: 10,
      overflow: "hidden",
      boxShadow: "0 20px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.1)",
      flexShrink: 0,
    }}>
      {/* Chrome bar */}
      <div style={{
        background: chrome.bg,
        borderBottom: `1px solid ${chrome.border}`,
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        userSelect: "none",
      }}>
        {/* Traffic lights */}
        <div style={{ display:"flex", gap:8, flexShrink:0 }}>
          {[chrome.dot1, chrome.dot2, chrome.dot3].map((c, i) => (
            <div key={i} style={{ width:12, height:12, borderRadius:"50%", background:c }} />
          ))}
        </div>

        {/* Tab bar hint */}
        <div style={{
          display: "flex",
          gap: 2,
          flexShrink: 0,
        }}>
          <div style={{
            background: isDark ? "#4A4A4A" : "#FFFFFF",
            borderRadius: "6px 6px 0 0",
            padding: "4px 16px",
            fontSize: 12,
            color: isDark ? "#E0E0E0" : "#333",
            border: `1px solid ${chrome.border}`,
            borderBottom: "none",
          }}>
            {url.replace(/https?:\/\//, "").split("/")[0]}
          </div>
        </div>

        {/* URL bar */}
        <div style={{
          flex: 1,
          background: chrome.urlBg,
          borderRadius: 6,
          padding: "5px 12px",
          fontSize: 13,
          color: chrome.urlText,
          border: `1px solid ${chrome.border}`,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}>
          {/* Lock icon */}
          <svg width="10" height="12" viewBox="0 0 10 12" fill={chrome.urlText}>
            <rect x="1" y="5" width="8" height="7" rx="1.5"/>
            <path d="M2.5 5V3.5a2.5 2.5 0 015 0V5" stroke={chrome.urlText} strokeWidth="1.5" fill="none"/>
          </svg>
          <span style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
            {url}
          </span>
        </div>
      </div>

      {/* Content area */}
      <div style={{
        width,
        height,
        overflow: "hidden",
        background: "#FFFFFF",
        position: "relative",
      }}>
        {children}
      </div>
    </div>
  );
};
