import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import AddItem from "./components/AddItem";

function App() {
  //Products 주소는 /items지만 메인 페이지가 없어서 *로 잠깐 대체
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Products />} />
        <Route path="/additem" element={<AddItem />} />
      </Routes>
    </Router>
  );
}

export default App;
