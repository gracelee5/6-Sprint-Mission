import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import AddItem from "./pages/AddItem";
import ProductsDetail from "./pages/ProductsDetail";
function App() {
  //Products 주소는 /items지만 메인 페이지가 없어서 *로 잠깐 대체
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Products />} />
        <Route path="/additem" element={<AddItem />} />
        <Route path="/items" element={<Products />} />
        <Route path="/items/:productId" element={<ProductsDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
