import styled from "styled-components";
import { BaseBox } from "../sharedStyles";

interface IProps {
  children: React.ReactNode;
}

const Container = styled(BaseBox)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  padding: 35px 40px 25px 40px;
  form {
    display: flex;
    justify-items: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 35px;
  }
`;

function FormBox({ children }: IProps) {
  return <Container>{children}</Container>;
}

export default FormBox;
