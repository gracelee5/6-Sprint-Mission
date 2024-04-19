import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "./Header";
import FileInput from "./FileInput";
function AddItem() {
  const [values, setValues] = useState({
    title: "",
    content: "",
    imgFile: null,
    price: "",
    tag: "",
  });

  const [isValid, setIsValid] = useState(false);

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const validateInputs = () => {
    const isValid =
      values.title.trim() !== "" &&
      values.content.trim() !== "" &&
      values.imgFile !== null &&
      values.price.trim() !== "" &&
      values.tag.trim() !== "";

    setIsValid(isValid);
  };

  useEffect(() => {
    validateInputs();
  }, [values]);

  const handleSubmit = () => {
    console.log("submit");
  };
  return (
    <>
      <Header />
      <Section>
        <TopSection>
          <RegisterText>상품 등록하기</RegisterText>
          <RegisterButton onClick={handleSubmit} disabled={!isValid}>
            등록
          </RegisterButton>
        </TopSection>
        <Text>상품 이미지</Text>
        <FileInput
          name="imgFile"
          value={values.imgFile}
          onChange={handleChange}
        />
        <Text>상품명</Text>
        <ProductName
          type="text"
          name="title"
          value={values.title}
          onChange={handleInputChange}
          placeholder="상품명을 입력해주세요."
        ></ProductName>
        <Text>상품 소개</Text>
        <ProductInfo
          type="text"
          name="content"
          value={values.content}
          onChange={handleInputChange}
          placeholder="상품 소개를 입력해주세요."
        ></ProductInfo>
        <Text>판매 가격</Text>
        <Price
          type="number"
          name="price"
          value={values.price}
          onChange={handleInputChange}
          placeholder="판매 가격을 입력해주세요."
        ></Price>
        <Text>태그</Text>
        <Tag
          type="text"
          name="tag"
          value={values.tag}
          onChange={handleInputChange}
          placeholder="태그를 입력해주세요."
        ></Tag>
      </Section>
    </>
  );
}
export default AddItem;

const Section = styled.div`
  width: 1200px;
  margin: 30px auto;
  @media (max-width: 1199px) {
    width: 100%;
    padding: 0 24px;
    background: red;
  }
`;
const TopSection = styled.div`
  display: flex;
  width: 100%;
`;
const RegisterText = styled.h1`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 33px;
  display: flex;
  align-items: center;
  color: #1f2937;
`;
const RegisterButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 20px;
  gap: 10px;
  width: 88px;
  height: 42px;
  background-color: ${(props) => (props.disabled ? "#9ca3af" : "#3692ff")};
  border-radius: 8px;
  border: none;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  margin: 0 0 0 auto;
`;
const Text = styled.p`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  display: flex;
  align-items: center;
  color: #1f2937;
  margin-top: 20px;
`;

const ProductName = styled.input`
  width: 100%;
  height: 56px;
  background: #f3f4f6;
  border-radius: 12px;
  padding: 0px 25px;
  &::placeholder {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #9ca3af;
  }
`;

const ProductInfo = styled.input`
  width: 100%;
  height: 200px;
  background: #f3f4f6;
  border-radius: 12px;
  padding: 0px 25px;
  position: relative;
  &::placeholder {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #9ca3af;
    position: absolute;
    top: 25px;
    left: 25px;
  }
`;
const Price = styled.input`
  width: 100%;
  height: 56px;
  background: #f3f4f6;
  border-radius: 12px;
  padding: 0px 25px;
  &::placeholder {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #9ca3af;
  }
`;

const Tag = styled.input`
  width: 100%;
  height: 56px;
  background: #f3f4f6;
  border-radius: 12px;
  padding: 0px 25px;
  &::placeholder {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #9ca3af;
  }
`;
