import styled from "styled-components";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../products.css";
import heart from "../images/heart.svg";
import search from "../images/search.svg";
function Products() {
  const [products, setProducts] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);
  const [order, setOrder] = useState("recent");
  const [sortedItems, setSortedItems] = useState([]);
  const page = 1;
  const pageSize = 10;
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `https://panda-market-api.vercel.app/products?page=${page}&pageSize=${pageSize}&orderBy=${order}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = response.data;
        if (data && data.list) {
          setProducts(data.list.slice(0, 10));
          setBestProducts(data.list.slice(0, 4));
          const sorted = data.list.sort((a, b) => b[order] - a[order]);
          setSortedItems(sorted);
        } else {
          console.error("");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();

    console.log(order);
  }, [order]);

  const handleOrderChange = (event) => {
    setOrder(event.target.value);
  };
  return (
    <Container>
      <BestSectionTitle>베스트 상품</BestSectionTitle>
      <BestProductContainer>
        {bestProducts &&
          bestProducts.map((product) => (
            <BestProductItem key={product.id}>
              <BestProductImage src={product.images} alt={product.name} />
              <ProductName>{product.name}</ProductName>
              <ProductPrice>{product.price}원</ProductPrice>
              <ProductLikes>
                <Heart src={heart}></Heart>
                {product.favoriteCount}
              </ProductLikes>
            </BestProductItem>
          ))}
      </BestProductContainer>
      <div style={{ display: "flex", margin: "20px 0" }}>
        <SectionTitle>전체 상품</SectionTitle>
        <Search>
          <img
            src={search}
            alt="검색"
            style={{
              position: "relative",
              top: "10px",
              left: "40px",
              width: "24px",
              height: "24px",
            }}
          />
          <input type="text" placeholder="검색할 상품을 입력해주세요" />
        </Search>
        <ProductRegister>상품 등록하기</ProductRegister>
        <select value={order} onChange={handleOrderChange}>
          <option value="recent">최신순</option>
          <option value="favorite">좋아요순</option>
        </select>
      </div>
      <ProductContainer>
        {products &&
          products.map((product) => (
            <ProductItem key={product.id}>
              <ProductImage src={product.images} alt={product.name} />
              <ProductName>{product.name} 팝니다</ProductName>
              <ProductPrice>{product.price}원</ProductPrice>
              <ProductLikes>
                <Heart src={heart}></Heart>
                {product.favoriteCount}
              </ProductLikes>
            </ProductItem>
          ))}
      </ProductContainer>
    </Container>
  );
}

const Container = styled.div`
  box-sizing: border-box;
  width: 1200px;
  margin: 0 auto;
`;
const BestSectionTitle = styled.p`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 140%;
  display: flex;
  align-items: center;
  letter-spacing: 0.02em;
  color: #111827;
  margin-top: 20px;
`;
const SectionTitle = styled.p`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 140%;
  display: flex;
  align-items: center;
  letter-spacing: 0.02em;
  color: #111827;
`;
const BestProductContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 20px;
`;
const BestProductItem = styled.div``;
const BestProductImage = styled.img`
  width: 282px;
  height: 282px;
  border-radius: 16px;
`;
const ProductImage = styled.img`
  width: 221px;
  height: 221px;
  border-radius: 16px;
`;
const ProductName = styled.p`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #1f2937;
`;
const ProductPrice = styled.p`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #1f2937;
`;
const ProductLikes = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: #4b5563;
`;
const ProductContainer = styled.div`
  gap: 1rem;
  display: flex;
  width: 1200px;
  flex-wrap: wrap;
`;
const ProductItem = styled.div``;
const Heart = styled.img`
  margin-right: 10px;
`;
const Search = styled.div`
  display: flex;
`;
const ProductRegister = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 23px;
  gap: 10px;
  height: 42px;
  background: #3692ff;
  border-radius: 8px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
`;
export default Products;
