"use client";

import styled from "styled-components";
import LoginPageHeader from "./components/LoginPageHeader";
import WelcomeSection from "./components/WelcomeSection";
import LoginSection from "./components/LoginSection";

function LoginPage() {
  return (
    <Container>
      <LoginPageHeader />
      <WelcomeSection />
      <LoginSection />
    </Container>
  );
}

const Container = styled.div`
  padding: 0 20px;
  margin: 0 auto;
`;

export default LoginPage;
