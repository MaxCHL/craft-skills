# React + Babel CDN 設定參考

單檔 HTML 視覺設計稿標準設定。不需要 npm 或 build 工具，直接在瀏覽器執行。

---

## CDN 引入

### React 18（推薦，穩定版）

```html
<!-- Recommended: React 18 stable -->
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
```

> **注意**：React 19 已移除 UMD builds，無法用 `<script src>` + Babel standalone 的方式載入。
> 單檔 HTML 設計稿請固定使用 React 18。

---

## 標準 HTML 模板骨架

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Design Draft</title>

  <!-- React 18 CDN -->
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

  <style>
    /* global styles here */
    body { margin: 0; font-family: sans-serif; }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    // --- inline frame components go here (before App) ---

    function App() {
      return (
        <div>
          <h1>Hello</h1>
        </div>
      );
    }

    // Mount using React 18 createRoot
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<App />);
  </script>
</body>
</html>
```

`<script type="text/babel">` 是關鍵——Babel standalone 會攔截此 type 並做 JSX 轉譯。

---

## Inline 元件（assets/ 目錄的使用方式）

單檔 HTML 無法 `import`，需將框架元件直接貼入同一個 `<script type="text/babel">` 區塊。

**正確做法**：把 `ios_frame.jsx` / `android_frame.jsx` / `macos_window.jsx` 的內容複製到 App 之前。

```html
<script type="text/babel">
  // --- IOSFrame inlined from assets/ios_frame.jsx ---
  const IOSFrame = ({ children, title = "App" }) => {
    return (
      <div style={{ /* frame styles */ }}>
        <div className="status-bar">{title}</div>
        <div className="screen">{children}</div>
        <div className="home-indicator" />
      </div>
    );
  };

  // --- AndroidFrame inlined from assets/android_frame.jsx ---
  const AndroidFrame = ({ children }) => { /* ... */ };

  // --- MacOSWindow inlined from assets/macos_window.jsx ---
  const MacOSWindow = ({ children, title = "Window" }) => { /* ... */ };

  // --- Main App uses the frames above ---
  function App() {
    return (
      <IOSFrame title="My App">
        <p>Content here</p>
      </IOSFrame>
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
</script>
```

重點：
- 用 `const IOSFrame = ...`，**不要** `export default` 或 `import`
- 框架元件必須定義在 `App` **之前**，否則會有 ReferenceError
- 全部放在同一個 `<script type="text/babel">` 區塊內

---

## 常見陷阱

### 組件名必須大寫

```jsx
// Wrong: JSX treats lowercase as HTML tag, not component
const myCard = () => <div>...</div>;
<myCard />  // renders as unknown HTML element

// Correct
const MyCard = () => <div>...</div>;
<MyCard />
```

### className，不是 class

```jsx
// Wrong
<div class="container">

// Correct
<div className="container">
```

### style 是物件，不是字串

```jsx
// Wrong
<div style="color: red; font-size: 16px">

// Correct: double braces — outer = JSX expression, inner = JS object
<div style={{ color: "red", fontSize: "16px" }}>
```

### 事件名稱用 camelCase

```jsx
// Wrong
<button onclick={handleClick}>

// Correct
<button onClick={handleClick}>
```

其他常見：`onChange`、`onSubmit`、`onMouseEnter`、`onKeyDown`

### JSX 只能有一個根元素

```jsx
// Wrong: two sibling root elements
return (
  <h1>Title</h1>
  <p>Body</p>
);

// Correct: wrap with Fragment
return (
  <>
    <h1>Title</h1>
    <p>Body</p>
  </>
);
```

### 條件渲染

```jsx
// Short-circuit: render only when condition is true
{isLoading && <Spinner />}

// Ternary: render A or B
{isLoggedIn ? <Dashboard /> : <LoginPage />}

// Warning: 0 && <X /> renders "0" — use !!count or count > 0
{count > 0 && <Badge count={count} />}
```

### useState 必須在最頂層

```jsx
// Wrong: hook inside condition
function App() {
  if (someCondition) {
    const [value, setValue] = useState(0); // breaks Rules of Hooks
  }
}

// Correct: always at top level of the component
function App() {
  const [value, setValue] = useState(0);
  // then use it conditionally below
}
```

---

## 生產用 CDN（Production Build）

設計稿完成後可改用 minified 版本，移除開發警告、體積更小：

```html
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
```

URL 規律：將 `.development.js` 替換為 `.production.min.js`。  
注意：Babel standalone 本身沒有 development/production 區分，`babel.min.js` 即為標準用法。

---

## Chart.js 整合

資訊圖表（infographic）需要時加入：

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js"></script>
```

搭配 `useRef` + `useEffect` 使用，必須在 effect 內初始化，且在 cleanup 時銷毀：

```jsx
const { useRef, useEffect } = React;

function BarChart({ data, labels }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null); // keep chart instance for cleanup

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    // Destroy previous instance before creating new one
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: "Value",
          data: data,
          backgroundColor: "rgba(99, 102, 241, 0.7)",
        }],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
      },
    });

    // Cleanup on unmount
    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [data, labels]); // re-run when data changes

  return <canvas ref={canvasRef} />;
}
```

---

## Tailwind（選用）

需要 utility-class 快速排版時加入：

```html
<script src="https://cdn.tailwindcss.com"></script>
```

注意事項：
- CDN 版本為 JIT on-demand，不支援 `@apply`、自訂 `theme.extend` 需透過 `tailwind.config`
- Prototype 與設計稿用途已足夠
- 若需自訂設定：

```html
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          brand: "#6366f1",
        },
      },
    },
  };
</script>
```
