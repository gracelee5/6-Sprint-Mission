import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import X from "../images/ic_X.svg";
import plus from "../images/ic_plus.svg";
function FileInput({ name, value, initialPreview, onChange }) {
  const [preview, setPreview] = useState(initialPreview);
  const inputRef = useRef();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    onChange(name, null);
  };
  const handleButtonClick = () => {
    inputRef.current.click(); // 버튼 클릭 시 input 엘리먼트 클릭
  };
  useEffect(() => {
    if (!value) return;
    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      setPreview(initialPreview);
      URL.revokeObjectURL(nextPreview);
    };
  }, [value, initialPreview]);

  return (
    <Container>
      <InputWrapper onClick={handleButtonClick}>
        <ImageRegister
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleChange}
          ref={inputRef}
        />
        <Plus src={plus} />
        <InputText>이미지 등록</InputText>
      </InputWrapper>
      <Container1>
        {value && <Image src={preview} alt="이미지 등록"></Image>}
        {value && <Delete onClick={handleClearClick} src={X}></Delete>}
      </Container1>
    </Container>
  );
}

export default FileInput;

const Container = styled.div`
  display: flex;
  gap: 20px;
`;
const Container1 = styled.div`
  display: flex;
  position: relative;
`;
const ImageRegister = styled.input`
  width: 282px;
  height: 282px;
  background-color: #f3f4f6;
  cursor: pointer;
  opacity: 0;
  @media (max-width: 1199px) {
    width: 162px;
    height: 162px;
  }
`;

const Image = styled.img`
  box-sizing: border-box;
  width: 282px;
  height: 282px;
  border: none;
  border-radius: 12px;
  @media (max-width: 1199px) {
    width: 162px;
    height: 162px;
  }
`;
const Delete = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
`;
const InputText = styled.p`
  position: absolute;
  margin: -110px 102px;
  z-index: 1;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #9ca3af;
  width: 100px;
  @media (max-width: 1199px) {
    margin: -60px 45px;
  }
`;
const Plus = styled.img`
  position: absolute;
  margin: -180px 115px;
  z-index: 1;
  @media (max-width: 1199px) {
\
    margin: -115px 55px;
  }
`;
const InputWrapper = styled.div`
  position: relative;
  width: 282px;
  height: 282px;
  margin: 10px 0;
  background: #f3f4f6;
  border-radius: 12px;
  border: none;
  @media (max-width: 1199px) {
    width: 162px;
    height: 162px;
  }
`;
