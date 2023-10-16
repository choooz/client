"use client";

import dynamic from "next/dynamic";
import React from "react";

const DynamicDrinkInfoContainer = dynamic(() => import("./components/DrinkInfoContainer"));
const DynamicDrinkCommentContainer = dynamic(() => import("./components/DrinkCommentContainer"));

function DrinkInfoPage() {
  return (
    <>
      <DynamicDrinkInfoContainer />
      <DynamicDrinkCommentContainer />
    </>
  );
}

export default DrinkInfoPage;
