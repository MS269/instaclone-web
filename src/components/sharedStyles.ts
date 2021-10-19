import styled from "styled-components";

export const BaseBox = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  width: 100%;
  border: 1px solid ${(props) => props.theme.borderColor};
`;

export const Button = styled.input`
  text-align: center;
  background-color: ${(props) => props.theme.accent};
  width: 100%;
  margin-top: 12px;
  padding: 8px 0px;
  border: none;
  border-radius: 3px;
  color: white;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  font-weight: 600;
`;

export const FatLink = styled.span`
  color: rgb(142, 142, 142);
  font-weight: 600;
`;

export const FatText = styled.span`
  font-weight: 600;
`;
