import ListOfCats from "@/components/HomePage/ListOfCats";
import { DashboardLayout } from "@toolpad/core";
import axios from "axios";
import { Fragment } from "react";

export default async function Home() {
  const catsResponse = await axios.get(
    `${process.env.CATS_API_SERVER_URL}/search?page=1&limit=50`,
    {
      headers: {
        "x-api-key": process.env.CATS_API_KEY,
      },
    }
  );

  return (
    <Fragment>
      <DashboardLayout >
        <ListOfCats
          paginationData={{
            limit: Number(catsResponse?.headers["pagination-limit"]),
            page: Number(catsResponse?.headers["pagination-page"]),
            total: Number(catsResponse?.headers["pagination-count"]),
          }}
          catsData={catsResponse?.data}
        />
      </DashboardLayout>
    </Fragment>
  );
}
