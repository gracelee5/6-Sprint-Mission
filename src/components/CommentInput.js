import React from "react";
import styled from "styled-components";
function CommentInput() {
  return (
    <>
      <Text>문의하기</Text>
      <InputArea placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다." />
      <RegisterButton>등록</RegisterButton>
    </>
  );
}
export default CommentInput;

const Text = styled.p`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #111827;
  margin: 40px 0 0 0;
`;
const InputArea = styled.textarea`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 16px 24px;
  gap: 10px;
  width: 1200px;
  height: 104px;
  background: #f3f4f6;
  border-radius: 12px;
  border: none;
  margin: 10px 0;
  &::placeholder {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #9ca3af;
  }
`;
const RegisterButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 23px;
  gap: 10px;
  width: 74px;
  height: 42px;
  background: #9ca3af;
  border-radius: 8px;
  margin: 0 0 0 auto;
  border: none;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #ffffff;
`;
