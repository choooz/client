"use client";

import BottomBar from "components/BottomBar";
import React from "react";
import DrinkCommentContainer from "./components/DrinkCommentContainer";
import DrinkInfoContainer from "./components/DrinkInfoContainer";

function DrinkInfoPage() {
  return (
    <>
      <DrinkInfoContainer />
      <DrinkCommentContainer />
    </>
  );
}

export default DrinkInfoPage;
