import LeftContainer from "../components/LeftContainer.tsx";
import { RightContainer } from "../components/RightContainer.tsx";
import { DefaultLayout } from "../configs/layouts/DefaultLayout";

export function Sign() {
  return (
    <DefaultLayout>
      <LeftContainer />
      <RightContainer />
    </DefaultLayout>
  );
}
