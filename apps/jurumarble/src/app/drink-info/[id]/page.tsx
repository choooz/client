"use client";

import dynamic from "next/dynamic";

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
