import styled from "styled-components";

interface ISInputProps {
  hasError?: boolean;
}

const Input = styled.input<ISInputProps>`
  background-color: #fafafa;
  width: 100%;
  margin-top: 5px;
  padding: 7px;
  border: 0.5px solid
    ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
  border-radius: 3px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
  }
  &:focus {
    border-color: ${(props) => (props.hasError ? "tomato" : "rgb(38, 38, 38)")};
  }
`;

Input.defaultProps = {
  hasError: false,
};

export default Input;
