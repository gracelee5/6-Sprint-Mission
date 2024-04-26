import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import noneComments from "../images/noneComments.svg";
function CommentList() {
  const [comments, setComments] = useState(null);
  const { productId } = useParams();

  const getComments = async (productId) => {
    try {
      const response = await axios.get(
        `https://panda-market-api.vercel.app/products/${productId}/comments`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getComments(productId);
        setComments(data.list);
        console.log(data);
      } catch (error) {
        console.error("댓글을 불러오는 데 실패했습니다:", error);
      }
    };
    fetchComments();
  }, [productId]);
  return (
    <>
      {!comments || comments.length === 0 ? (
        <NoneCommentsContainer>
          <img src={noneComments} alt="댓글이 없습니다." width={"200px"} />
          <NoneCommentsText>아직 문의가 없습니다</NoneCommentsText>
        </NoneCommentsContainer>
      ) : (
        <>
          <CommentListContainer>
            {comments.map((comment, id) => (
              <div key={id}>
                <Content>{comment.content}</Content>
                <ProfileContainer>
                  <ProfileImage src={comment.image} alt="작성자 이미지" />
                  <NickNameContainer>
                    <NickName>{comment.nickname}</NickName>
                    <UpDatedAt>{comment.updatedAt}</UpDatedAt>
                  </NickNameContainer>
                </ProfileContainer>
                <Divider />
              </div>
            ))}
          </CommentListContainer>
        </>
      )}
    </>
  );
}
export default CommentList;

const NoneCommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1200px;
  margin: 0 auto;
`;
const NoneCommentsText = styled.p`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #9ca3af;
  margin: 30px 0 0px;
`;
const CommentListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1200px;
  margin: 0 auto;
`;
const Content = styled.p`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  color: #1f2937;
`;
const ProfileContainer = styled.div`
  display: flex;
`;
const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
`;
const NickNameContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const NickName = styled.p`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #4b5563;
`;
const UpDatedAt = styled.p`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #9ca3af;
`;
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e5e7eb;
  margin: 16px 0;
`;
