import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// 루트 DOM 요소를 찾습니다. 타입스크립트에서는 이 요소가 null이 아니도록 명시적으로 확인해야 합니다.
const rootElement = document.getElementById("root");

// 만약 rootElement가 null이라면, 오류를 발생시킵니다. 이는 타입스크립트에서 런타임 오류를 방지하기 위함입니다.
if (!rootElement) {
  throw new Error(
    "루트 요소를 찾을 수 없습니다. index.html에 <div id='root'></div>가 있는지 확인하세요."
  );
}

// createRoot에 rootElement를 전달합니다.
const root = ReactDOM.createRoot(rootElement);

// ReactDOM의 render 메서드를 사용하여 App 컴포넌트를 렌더링합니다.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
