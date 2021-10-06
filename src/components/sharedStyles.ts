import styled from "styled-components";

export const BaseBox = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  width: 100%;
  border: 1px solid ${(props) => props.theme.borderColor};
`;

export const FatLink = styled.span`
  color: rgb(142, 142, 142);
  font-weight: 600;
`;

export const FatText = styled.span`
  font-weight: 600;
`;
