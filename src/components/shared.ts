import styled from "styled-components";

export const BaseBox = styled.div`
  background-color: white;
  width: 100%;
  border: 1px solid ${(props) => props.theme.borderColor};
`;
