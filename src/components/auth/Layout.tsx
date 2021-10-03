import React from "react";
import styled from "styled-components";
import Header from "../Header";

interface ILayoutProps {
  children: React.ReactNode;
}

const Content = styled.main`
  max-width: 930px;
  width: 100%;
  margin: 0 auto;
  margin-top: 45px;
`;

function Layout({ children }: ILayoutProps) {
  return (
    <>
      <Header />
      <Content>{children}</Content>
    </>
  );
}

export default Layout;
