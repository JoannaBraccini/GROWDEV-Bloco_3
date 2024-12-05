import { PanelTable } from "../components/PanelTable";
import { DefaultLayout } from "../config/layout/DefaultLayout";

export function Home() {
  return (
    <DefaultLayout>
      <PanelTable />
    </DefaultLayout>
  );
}
