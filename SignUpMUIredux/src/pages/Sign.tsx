import { useState } from "react";
import LeftContainer from "../components/LeftContainer.tsx";
import { RightContainer } from "../components/RightContainer.tsx";
import { DefaultLayout } from "../configs/layouts/DefaultLayout";

export function Sign() {
  const [method, setMethod] = useState<
    "Login" | "Register" | "Forgot Password"
  >("Login");

  const handleMethodChange = (
    newMethod: "Login" | "Register" | "Forgot Password"
  ) => {
    setMethod(newMethod);
  };

  return (
    <DefaultLayout>
      <LeftContainer onMethodChange={handleMethodChange} />
      <RightContainer method={method} />
    </DefaultLayout>
  );
}
