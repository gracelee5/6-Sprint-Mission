import styled from "styled-components";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "../products.css";
import heart from "../images/heart.svg";
import search from "../images/search.svg";
import arrowDown from "../images/arrow_down.svg";
import Header from "./Header";

function Products() {
  const [products, setProducts] = useState([0]);
  const [bestProducts, setBestProducts] = useState([0]);
  const [order, setOrder] = useState("recent");
  const [isOpen, setIsOpen] = useState(false);
  const page = 1;
  const pageSize = 10;

  const navigate = useNavigate();

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
          setProducts(sorted);
        } else {
          alert("에러가 발생했습니다.");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [order]);

  const handleOrderChange = (selectedOrder) => {
    setOrder(selectedOrder);
    setIsOpen(false); // Close dropdown after selecting an option
  };
  return (
    <>
      <Header />
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
          <Tools>
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
              <SearchInput
                type="text"
                placeholder="검색할 상품을 입력해주세요"
              ></SearchInput>
            </Search>
            <ProductRegister onClick={() => navigate("/additem")}>
              상품 등록하기
            </ProductRegister>
            <CustomSelect>
              <SelectButton onClick={() => setIsOpen(!isOpen)}>
                <Order>{order === "recent" ? "최신순" : "좋아요순"}</Order>
                <Arrow src={arrowDown} alt="드롭다운 화살표" />
              </SelectButton>
              <OptionsContainer isOpen={isOpen}>
                <Option onClick={() => handleOrderChange("recent")}>
                  최신순
                </Option>
                <Option onClick={() => handleOrderChange("favorite")}>
                  좋아요순
                </Option>
              </OptionsContainer>
            </CustomSelect>
          </Tools>
        </div>
        <ProductContainer>
          {products &&
            products.map((product) => (
              <ProductItem key={product.id}>
                <ProductImage src={product.images} alt={product.name} />
                <ProductName>{product.name}</ProductName>
                <ProductPrice>{product.price}원</ProductPrice>
                <ProductLikes>
                  <Heart src={heart}></Heart>
                  {product.favoriteCount}
                </ProductLikes>
              </ProductItem>
            ))}
        </ProductContainer>
      </Container>
    </>
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
const ProductItem = styled.div`
  width: 221px;
`;
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
  cursor: pointer;
`;

const CustomSelect = styled.div`
  position: relative;
  display: inline-block;
`;

const SelectButton = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 12px 0px;
  gap: 10px;
  width: 130px;
  height: 42px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #1f2937;
`;

const OptionsContainer = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: absolute;
  z-index: 1;
  width: 130px;
  height: 84px;
  background: #ffffff;
  border-width: 1px 1px 0px 1px;
  border-style: solid;
  border-color: #e5e7eb;
  border-radius: 12px 12px 12px 12px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #1f2937;
`;

const Option = styled.div`
  padding: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 130px;
  height: 42px;
  border-bottom: 1px solid #ccc;
  &:hover {
    background-color: #ddd;
  }
`;
const Tools = styled.div`
  display: flex;
  gap: 20px;
  margin: 0 30px 0 auto;
`;
const SearchInput = styled.input`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 9px 20px 9px 46px;
  gap: 10px;
  border: none;
  width: 325px;
  height: 42px;
  background: #f3f4f6;
  border-radius: 12px;
`;
const Arrow = styled.img`
  width: 24px;
  margin: -2px 0px 0 0px;
`;
const Order = styled.div`
  margin: 0 0px 0 20px;
  width: 60px;
`;
export default Products;
