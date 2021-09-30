import styled from "styled-components";

const Button = styled.input`
  text-align: center;
  background-color: ${(props) => props.theme.accent};
  width: 100%;
  margin-top: 12px;
  padding: 8px 0px;
  border: none;
  border-radius: 3px;
  color: white;
  font-weight: 600;
`;

export default Button;
