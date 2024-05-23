import React, { useState, useEffect, useCallback, ChangeEvent } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Header from "../components/Header";
import FileInput from "../components/FileInput";
import TagInput from "../components/TagInput";

// 글로벌 스타일 정의
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: "Pretendard";
    font-style: normal;
  }
`;

// AddItem 컴포넌트
function AddItem(): JSX.Element {
  // 상태 타입 정의
  interface Values {
    title: string;
    content: string;
    imgFile: File | null;
    price: string;
    tag: string;
  }

  const [values, setValues] = useState<Values>({
    title: "",
    content: "",
    imgFile: null,
    price: "",
    tag: "",
  });

  const [tags, setTags] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(false);

  // handleChange 함수의 타입 정의
  const handleChange = (name: string, value: string | File | null) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // handleInputChange 함수의 타입 정의
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  // 입력 값 검증 함수
  const validateInputs = useCallback(() => {
    const isValid =
      values.title.trim() !== "" &&
      values.content.trim() !== "" &&
      values.price.trim() !== "" &&
      tags.length > 0;

    setIsValid(isValid);
  }, [values, tags]);

  // 입력 값 검증 함수 호출
  useEffect(() => {
    validateInputs();
  }, [values, validateInputs]);

  // 제출 함수
  const handleSubmit = () => {
    console.log("submit");
  };

  return (
    <>
      <GlobalStyle />
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
        />
        <Text>상품 소개</Text>
        <ProductInfo
          name="content"
          value={values.content}
          onChange={handleInputChange}
          placeholder="상품 소개를 입력해주세요."
        />
        <Text>판매 가격</Text>
        <Price
          type="number"
          name="price"
          value={values.price}
          onChange={handleInputChange}
          placeholder="판매 가격을 입력해주세요."
        />
        <Text>태그</Text>
        <TagInput
          tags={tags}
          setTags={setTags}
          placeholder="태그를 입력해주세요."
        />
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
  }
`;
const TopSection = styled.div`
  display: flex;
  width: 100%;
`;
const RegisterText = styled.h1`
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
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  margin: 0 0 0 auto;
`;
const Text = styled.p`
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  display: flex;
  align-items: center;
  color: #1f2937;
  margin: 20px 0;
`;

const ProductName = styled.input`
  width: 100%;
  height: 56px;
  background: #f3f4f6;
  border-radius: 12px;
  padding: 0px 25px;
  border: none;
  &::placeholder {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #9ca3af;
  }
`;

const ProductInfo = styled.textarea`
  width: 100%;
  height: 200px;
  background: #f3f4f6;
  border-radius: 12px;
  padding: 20px 25px;
  position: relative;
  border: none;
  &::placeholder {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #9ca3af;
  }
`;
const Price = styled.input`
  width: 100%;
  height: 56px;
  background: #f3f4f6;
  border-radius: 12px;
  padding: 0px 25px;
  border: none;
  &::placeholder {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #9ca3af;
  }
`;
