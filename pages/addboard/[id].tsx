import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Header from "../../components/Header";
import Heart from "../../images/heart.svg";
import Dots from "../../images/3dots.svg";
import Turnback from "./../../images/turnback.svg";
import { createGlobalStyle } from "styled-components";
import CommentInput from "../../components/CommentInput";
import CommentList from "../../components/CommentList";
import Link from "next/link";
import { useRouter } from "next/router";

interface Product {
  id: number;
  name: string;
  images: string;
  description: string;
  favoriteCount: number;
}
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: "Pretendard";
    font-style: normal;
  }
`;

function BoardDetail() {
  const router = useRouter();
  const { articleId } = router.query;
  const numericArticleId = Array.isArray(articleId)
    ? parseInt(articleId[0], 10)
    : parseInt(articleId || "", 10);

  const [product, setProduct] = useState<Product | null>(null);

  const getProductById = async (articleId: number) => {
    try {
      const response = await axios.get(
        `https://panda-market-api.vercel.app/articles/${articleId}`
      );
      console.log("api 호출 성공");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (!numericArticleId || isNaN(numericArticleId)) {
        console.error("상품 ID가 유효하지 않습니다.");
        return;
      }

      try {
        const data = await getProductById(numericArticleId);
        setProduct(data);
      } catch (error) {
        console.error("상품 정보를 불러오는 데 실패했습니다:", error);
      }
    };

    fetchProduct();
  }, [numericArticleId]);

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
                <Dots />
                <Divider />
                <DescriptionTitle>상품 소개</DescriptionTitle>
                <Description>{product.description}</Description>

                <ProductLikes>
                  <Heart></Heart>
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
        <Link href="/items">
          <BackButton>
            목록으로 돌아가기
            <Turnback />
          </BackButton>
        </Link>
      </Container>
    </>
  );
}

export default BoardDetail;

const Container = styled.div`
  position: relative;
  width: 1200px;
  margin: 20px auto;
  @media (max-width: 1199px) {
    width: 696px;
  }
  @media (max-width: 767px) {
    width: 344px;
  }
`;
const ProductContainer = styled.div`
  display: flex;
  gap: 24px;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;
const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 690px;
  @media (max-width: 767px) {
    width: 344px;
  }
`;
const ProductImage = styled.img`
  width: 486px;
  height: 486px;
  border-radius: 16px;
  @media (max-width: 1199px) {
    width: 340px;
    height: 340px;
  }
`;
const ProductName = styled.p`
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #1f2937;
  @media (max-width: 1199px) {
    font-size: 20px;
  }
  @media (max-width: 767px) {
    font-size: 16px;
  }
`;
const ProductPrice = styled.p`
  font-weight: 600;
  font-size: 40px;
  line-height: 48px;
  color: #1f2937;
  margin: 24px 0;
  @media (max-width: 1199px) {
    font-size: 32px;
  }
  @media (max-width: 767px) {
    font-size: 24px;
  }
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
  margin: 10px 0 30px;
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
const Dots1 = styled.img`
  position: absolute;
  margin: 0 0 0 680px;
  @media (max-width: 1199px) {
    margin: 0 0 0 330px;
  }
  @media (max-width: 767px) {
    margin: 0 0 0 330px;
  }
`;

const Heart1 = styled.img`
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
