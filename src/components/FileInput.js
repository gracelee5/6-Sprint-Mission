import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import X from "../images/ic_X.svg";
import { relative } from "path";
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
      <ImageRegister
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleChange}
        ref={inputRef}
      />
      <Container>
        {value && <Image src={preview} alt="이미지 등록"></Image>}
        {value && <Delete onClick={handleClearClick} src={X}></Delete>}
      </Container>
    </Container>
  );
}

export default FileInput;

const Container = styled.div`
  display: flex;
  position: relative;
  gap: 20px;
`;
const ImageRegister = styled.input`
  width: 282px;
  height: 282px;
`;
const Image = styled.img`
  box-sizing: border-box;
  width: 282px;
  height: 282px;
  border: none;
  border-radius: 12px;
`;
const Delete = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
`;
