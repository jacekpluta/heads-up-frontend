import styled from "styled-components";

export const HeaderLayout = styled.header`
  width: 100%;
  text-align: center;
  background-color: blue;
  font-size: 24px;
  font-weight: bold;
  color: white;
  padding: 20px;
`;

export const MainLayout = styled.div`
  display: flex;
  justify-content: space-between;
  flex-flow: row wrap;
`;

export const BoxLayout = styled.header`
  width: 5%;
  height: 5%;
  background-color: red;
  border-style: solid;
  border-width: 4px 4px 4px 4px;
  border-radius: 5px;
  border-color: green;
  text-align: center;
  background-color: red;
  font-size: 10px;
  font-weight: bold;
  color: white;
  padding: 12%;
  margin-top: 2%;
`;

export const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;

  color: ${props => props.theme.main};
  border: 2px solid ${props => props.theme.main};
`;
