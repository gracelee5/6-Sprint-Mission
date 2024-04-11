import styled from "styled-components";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Img from "../images/productImg.png";
import heart from "../images/heart.svg";
function Products() {
  const [products, setProducts] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://panda-market-api.vercel.app/products",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = response.data;
        if (data && data.list) {
          setProducts(data.list.slice(0, 12));
          setBestProducts(data.list.slice(0, 4));
        } else {
          console.error("");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Container>
      <SectionTitle>베스트 상품</SectionTitle>
      <BestProductContainer>
        {bestProducts.map((product) => (
          <BestProductItem key={product.id}>
            <BestProductImage src={Img} alt={product.name} />
            <ProductName>{product.name} 팝니다</ProductName>
            <ProductPrice>{product.price}원</ProductPrice>
            <ProductLikes>
              <Heart src={heart}></Heart>
              {product.favoriteCount}
            </ProductLikes>
          </BestProductItem>
        ))}
      </BestProductContainer>
      <SectionTitle>전체 상품</SectionTitle>
      <ProductContainer>
        {products.map((product) => (
          <ProductItem key={product.id}>
            <ProductImage src={Img} alt={product.name} />
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
  display: flex;
  gap: 1rem;
`;
const ProductItem = styled.div``;
const Heart = styled.img`
  margin-right: 10px;
`;
export default Products;
