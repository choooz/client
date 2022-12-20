import { Button } from "@common/ui";
import styled from "styled-components";

export default function Home() {
  return (
    <>
      <AppLayout>안녕하세요</AppLayout>
    </>
  );
}

const AppLayout = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 0 0.5rem;
  font: 11px menlo;
`;
