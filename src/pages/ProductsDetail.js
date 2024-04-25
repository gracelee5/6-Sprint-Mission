import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Header from "../components/Header";
import heart from "../images/heart.svg";
import dots from "../images/3dots.svg";
import turnback from "../images/turnback.svg";
import { createGlobalStyle } from "styled-components";
import CommentInput from "../components/CommentInput";
import CommentList from "../components/CommentList.js";
import { Link } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: "Pretendard";
    font-style: normal;
  }
`;

function ProductsDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  const getProductById = async (productId) => {
    try {
      const response = await axios.get(
        `https://panda-market-api.vercel.app/products/${productId}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(productId);
        setProduct(data);
      } catch (error) {
        console.error("상품 정보를 불러오는 데 실패했습니다:", error);
      }
    };
    fetchProduct();
  }, [productId]);

  return (
    <>
      <GlobalStyle />
      <Header />
      <Container>
        <ProductContainer>
          {product ? (
            <>
              <ProductImage src={product.images} alt={product.name} />
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <Dots src={dots} />
                <ProductPrice>{product.price}원</ProductPrice>
                <Divider />
                <DescriptionTitle>상품 소개</DescriptionTitle>
                <Description>{product.description}</Description>
                <DescriptionTitle>상품 태그</DescriptionTitle>
                <ProductLikes>
                  <Heart src={heart}></Heart>
                  {product.favoriteCount}
                </ProductLikes>
              </ProductInfo>
            </>
          ) : (
            <div>로딩 중...</div>
          )}
        </ProductContainer>
        <CommentInput />
        <CommentList />
        <StyledLink to="/items">
          <BackButton>
            목록으로 돌아가기
            <img src={turnback} alt="목록으로 돌아가기" />
          </BackButton>
        </StyledLink>
      </Container>
    </>
  );
}

export default ProductsDetail;

const Container = styled.div`
  position: relative;
  width: 1200px;
  margin: 20px auto;
`;
const ProductContainer = styled.div`
  display: flex;
  gap: 24px;
`;
const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 690px;
`;
const ProductImage = styled.img`
  width: 486px;
  height: 486px;
  border-radius: 16px;
`;
const ProductName = styled.p`
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #1f2937;
`;
const ProductPrice = styled.p`
  font-weight: 600;
  font-size: 40px;
  line-height: 48px;
  color: #1f2937;
  margin: 24px 0;
`;
const DescriptionTitle = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #4b5563;
`;
const Description = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  color: #1f2937;
  margin: 10px 0;
`;
const ProductLikes = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #4b5563;
  display: flex;
  align-items: center;
  padding: 4px 12px;
  gap: 10px;
  width: 87px;
  height: 40px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 35px;
  margin: auto 0 0 0;
`;
const Dots = styled.img`
  position: absolute;
  margin: 0 0 0 680px;
`;

const Heart = styled.img`
  margin-right: 5px;
  width: 26px;
  height: 26px;
`;
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e5e7eb;
  margin-bottom: 16px;
`;
const BackButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 240px;
  height: 48px;
  background: #3692ff;
  border-radius: 40px;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  color: #ffffff;
  margin: 24px auto;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
`;
