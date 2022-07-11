import React from "react";
import styled from "styled-components";
import Styles from "./PageNotFound.css";

const BoxContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  color: #000;  
`;

const SmallText = styled.h2`
  font-size: 30px;
  font-weight: 400;
  line-height: 1.24;
  color: #fff;
  margin: 0;
`;

const BigText = styled.h1`
  font-size: 160px;
  margin: 0;
  font-weight: 900;
  letter-spacing: 10px;
  background: -webkit-linear-gradient(rgb(232, 232, 232), rgba(100,200,200,1));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SmallerText = styled.p`
  font-size: 20px;
  font-weight: 100;
  color: #fff;
  margin: 10;
`;

export const MutedLink = styled.a`
  text-decoration:none;
  background: #ffffff55;
  color: #fff;
  padding: 6px 20px;
  border-radius: 25px;
  font-size: 14px;
  text-transform: uppercase;
  transition: 0.4s;
`;


function PageNotFound() {
    return (
        <BoxContainer>
            <SmallText> Oops! Page not Found.</SmallText>
            <BigText>404</BigText>
            <SmallerText>We can't find the page you're looking for.</SmallerText>
            <MutedLink href="#">Go back home</MutedLink>
        </BoxContainer>
    );
}

export default PageNotFound;