import { useState } from "react";
import { DefaultLayout } from "../configs/layouts/DefaultLayout";
import { LeftContainer } from "../components/LeftContainer/index.tsx";
import { RightContainer } from "../components/RightContainer/index.tsx";

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
