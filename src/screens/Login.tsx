import { useState } from "react";
import styled from "styled-components";
import { darkModeVar, isLoggedInVar } from "../apollo";

function Login() {
  const [big, setBig] = useState(false);

  const toggleBig = (big: boolean) => setBig(!big);

  return (
    <Container>
      <Title big={big}>Login</Title>
      <button onClick={() => isLoggedInVar(true)}>Login Now!</button>
      <button onClick={() => darkModeVar(true)}>To dark</button>
      <button onClick={() => darkModeVar(false)}>To light</button>
      <button onClick={() => toggleBig(big)}>
        {big ? "Smaller" : "Bigger"}
      </button>
    </Container>
  );
}

interface IContainerProps {
  big: boolean;
}

const Title = styled.h1<IContainerProps>`
  color: ${(props) => props.theme.fontColor};
  font-size: ${(props) => (props.big ? "32px" : "16px")};
`;

const Container = styled.div``;

export default Login;
