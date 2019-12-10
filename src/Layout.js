import styled from "styled-components";
import HeaderPic from "./components/pic/headerPic.jpg";

export const DivLink = styled.div`
  cursor: pointer;
  position: absolute;
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
  margin-top: 0%;
  margin-bottom: 3%;
  font-size: 10vw;
  color: #fff;
  text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #00deff,
    0 0 70px #00deff, 0 0 80px #00deff, 0 0 100px #00deff, 0 0 150px #00deff;
`;

export const HeaderStyle = styled.div`
  height: 20vh;
  margin-top: -1%;
  padding: 5%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  object-fit: cover;
  border-bottom: solid;
  border-width: 2vh;
  border-color: white;
  background-size: 100% 100%;
  background-image: url(${HeaderPic});
`;
