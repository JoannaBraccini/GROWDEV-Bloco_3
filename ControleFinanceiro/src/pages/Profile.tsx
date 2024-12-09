import { DefaultLayout } from "../config/layout/DefaultLayout";
import { ProfileInfoModal } from "../components/ProfileInfo";
import { BalanceCard } from "../components/BalanceCard";
import { Grid2 } from "@mui/material";

export function Profile() {
  return (
    <DefaultLayout>
      <Grid2 height={"100%"} textAlign={"center"}>
        <BalanceCard />

        <ProfileInfoModal />
      </Grid2>
    </DefaultLayout>
  );
}
