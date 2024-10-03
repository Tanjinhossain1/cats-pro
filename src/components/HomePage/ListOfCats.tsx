"use client";
import { CatsTypes, PaginationTypes } from "@/types/CatsType";
import {
  Box,
  Card,
  CardMedia,
  Grid,
  Pagination,
} from "@mui/material";
import axios from "axios";
import React, { Fragment, useState } from "react";

export default function ListOfCats({
  catsData,
  paginationData,
}: {
  catsData: CatsTypes[];
  paginationData: PaginationTypes;
}) {
  const [cats, setCats] = useState<CatsTypes[]>(catsData);
  const [pagination, setPagination] = useState<PaginationTypes>(paginationData);

  // When change the page from pagination component then fetch and set the cats to the state
  const fetchCats = async (page: number) => {
    try {
      const catsResponse = await axios.get(
        `${process.env.CATS_API_SERVER_URL}/search?limit=${pagination?.limit}&page=${page}`,
        {
          headers: {
            "x-api-key": process.env.CATS_API_KEY,
          },
        }
      );
      // set cats data and pagination details to the state
      setCats(catsResponse.data);
      setPagination({
        total: Number(catsResponse.headers["pagination-count"]) || 100,
        page: Number(catsResponse.headers["pagination-page"]) || page,
        limit: Number(catsResponse.headers["pagination-limit"]) || 9,
      });
    } catch (error) {
      console.error("Error fetching cat images:", error);
    }
  };

  const onPageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    fetchCats(newPage);
  };

  // Get the total pages for list of cats
  const totalPages = Math.ceil(pagination.total / pagination.limit);

  return (
    <Fragment>
      <Grid container  spacing={3}>
        {cats?.map((cat, index) => (
          <Grid item xs={12} sm={6}  xl={2.3} lg={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                image={cat.url}
                alt={`Cat ${index + 1}`}
                height="300"
                sx={{
                  objectFit: "cover",
                  height: "200px",
                  width: "100%",
                }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* pagination component show here  */}
      <Box display="flex" justifyContent="center" mb={5} mt={4}>
        <Pagination
          count={totalPages}
          page={pagination.page}
          onChange={onPageChange}
          color="secondary"
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </Fragment>
  );
}
