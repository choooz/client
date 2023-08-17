"use client";

import { PROFILE_EDIT_PAGE_TAB_LIST } from "lib/constants";
import React, { useState } from "react";
import styled from "styled-components";
import TabContainer from "../components/TabContainer";
import UserInfoEditContainer from "./components/UserInfoEditContainer";

function ProfileEditPage() {
  const [selectedTab, setSelectedTab] = useState("profile_modify");

  const onClickSelectedTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedTab(e.currentTarget.value);
  };

  return (
    <PageContainer>
      <TabContainer
        tabList={PROFILE_EDIT_PAGE_TAB_LIST}
        selectedTab={selectedTab}
        onClickSelectedTab={onClickSelectedTab}
      />
      <UserInfoEditContainer />
    </PageContainer>
  );
}

const PageContainer = styled.div`
  width: 100%;
  ${({ theme }) => theme.textStyle.Font_Regular};
`;

export default ProfileEditPage;
