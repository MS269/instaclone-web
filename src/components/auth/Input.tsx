import styled from "styled-components";

const Input = styled.input`
  background-color: #fafafa;
  width: 100%;
  margin-top: 5px;
  padding: 7px;
  border: 0.5px solid ${(props) => props.theme.borderColor};
  border-radius: 3px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
  }
`;

export default Input;
