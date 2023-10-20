'use client';

import styled from 'styled-components';

import LoginPageHeader from './components/LoginPageHeader';
import LoginSection from './components/LoginSection';
import TermsOfUseSection from './components/TermsOfUse';
import WelcomeSection from './components/WelcomeSection';

function LoginPage() {
  return (
    <Container>
      <LoginPageHeader />
      <WelcomeSection />
      <LoginSection />
      <TermsOfUseSection />
    </Container>
  );
}

const Container = styled.div`
  padding: 0 20px;
  margin: 0 auto;
`;

export default LoginPage;
