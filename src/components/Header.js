import styled from "styled-components";
import React from "react";
import Logo from "../images/logo.svg";
import { useNavigate, useLocation } from "react-router";
function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <HeaderContainer>
      <MenuContainer>
        <img
          src={Logo}
          alt="판다마켓 로고"
          width={"153px"}
          onClick={() => navigate("/")}
        />
        <FreeBoard>자유게시판</FreeBoard>
        <UsedMarket
          active={location.pathname === "/items"}
          onClick={() => navigate("/items")}
        >
          중고마켓
        </UsedMarket>
      </MenuContainer>
      <Login>로그인</Login>
    </HeaderContainer>
  );
}
const HeaderContainer = styled.div`
  box-sizing: border-box;
  position: sticky;
  width: 100%;
  height: 70px;
  left: 0px;
  top: 0px;
  display: flex;
  background: #ffffff;
  border-bottom: 1px solid #dfdfdf;
  align-items: center;
  z-index: 2;
`;
const MenuContainer = styled.div`
  margin-left: 200px;
  display: flex;
  gap: 30px;
  align-items: center;
  @media (max-width: 1199px) {
    margin-left: 24px;
  }
`;
const FreeBoard = styled.p`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #4b5563;
`;
const UsedMarket = styled.p`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #3692ff;
`;
const Login = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 88px;
  height: 42px;
  margin: 0 200px 0 auto;
  background: #3692ff;
  border-radius: 8px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  color: #ffffff;
  @media (max-width: 1199px) {
    margin: 0 24px 0 auto;
  }
`;
export default Header;
