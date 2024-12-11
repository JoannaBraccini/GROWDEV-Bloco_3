import { useEffect, useState } from "react";
import LeftContainer from "../components/LeftContainer.tsx";
import { RightContainer } from "../components/RightContainer.tsx";
import { DefaultLayout } from "../configs/layouts/DefaultLayout";
import { useAppDispatch, useAppSelector } from "../store/hooks.ts";

export function Sign() {
  const [method, setMethod] = useState<
    "Login" | "Register" | "Forgot Password"
  >("Login");

  const handleMethodChange = (
    newMethod: "Login" | "Register" | "Forgot Password"
  ) => {
    setMethod(newMethod);
  };

  // const dispatch = useAppDispatch();
  // const signupRedux = useAppSelector((state) => state.signup);
  // const userLoggedRedux = useAppSelector((state) => state.userLogged);

  // useEffect(() => {
  //   if (!userLoggedRedux.id) {

  //   }
  // }, [userLoggedRedux]);

  return (
    <DefaultLayout>
      <LeftContainer onMethodChange={handleMethodChange} />
      <RightContainer method={method} />
    </DefaultLayout>
  );
}
