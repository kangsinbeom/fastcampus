import styled from "styled-components";

export const PostItem = styled.div`
  padding: 24px 0px;
  border-top: 1px solid #f2f2f2;
  > a {
    text-decoration: none;
    color: black;
  }
  .title {
    font-size: 20px;
    font-weight: 600;
    margin: 14px 0px;
  }
  .content {
    color: gray;
    font-size: 16px;
  }
`;

export const ProfileBox = styled.div`
  display: flex;
  gap: 8px;
  font-size: 14px;
  align-items: center;
  .profile {
    width: 36px;
    height: 36px;
    background-color: #f2f2f2;
    border-radius: 50%;
  }
  .date,
  .author {
    color: gray;
  }
`;

export const UtilBox = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: row-reverse;
  font-size: 14px;
  color: gray;
  .delete,
  .edit {
    &:focus,
    :hover {
      color: black;
    }
  }
`;
