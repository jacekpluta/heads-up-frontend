import styled from "styled-components";
import HeaderPic from "../pic//headerPic.jpg";

export const DivLink = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  text-decoration: none;
  z-index: 1;
  background-color: white;
  opacity: 0;
  filter: alpha(opacity=0);
`;

export const ParStyle = styled.p`
  text-align: center;
  width: 100%;
  font-size: 5vw;
  color: #fff;
`;

export const BlueBackgroundStyle = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: linear-gradient(180deg, #05f, #09f);
`;

export const HeaderStyle = styled.div`
  box-sizing: border-box;
  height: 100px;
  border-bottom-style: solid;
  border-bottom-width: 5px;
  border-bottom-color: white;
  object-fit: cover;
  background-size: 100% 100%;
  background-image: url(${HeaderPic});
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1;
`;