import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  border-bottom: 1px solid #f2f2f2;
  padding: 10px 40px;
  min-height: 40px;
  align-items: center;
  > a {
    margin: 0px 10px;
    text-decoration: none;
    color: gray;
  }
`;
// hover a focus a = color: black
