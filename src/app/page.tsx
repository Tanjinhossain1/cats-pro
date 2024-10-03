import ListOfCats from "@/components/HomePage/ListOfCats";
import { DashboardLayout } from "@toolpad/core";
import { Fragment } from "react";

export default async function Home() {
  return (
    <Fragment>
      <DashboardLayout >
        <ListOfCats />
      </DashboardLayout>
    </Fragment>
  );
}
