import styled from "styled-components";

const SButton = styled.input`
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

function Button(props: any) {
  return <SButton {...props} />;
}

export default Button;
