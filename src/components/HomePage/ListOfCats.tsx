"use client";
import { CatBreadDetails, CatsTypes, PaginationTypes } from "@/types/CatsType";
import {
  Box,
  Button,
  Card,
  Drawer,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Pagination,
  Select,
  Skeleton,
  Typography,
} from "@mui/material";
import axios from "axios";
import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import { ZoomIn } from "@mui/icons-material";
import DetailsDrawer from "./DetailsDrawer";

type FilterOrderType = "ASC" | "DESC" | "RAND";

export default function ListOfCats() {
  // all states 
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cats, setCats] = useState<CatsTypes[]>([]);

  const [filterByOrder, setFilterByOrder] = useState<FilterOrderType>("DESC");
  const [listOfBreeds, setListOfBreeds] = useState<CatBreadDetails[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [selectedCat, setSelectedCat] = useState<CatsTypes | null>(null);
  const [pagination, setPagination] = useState<PaginationTypes>({
    limit: 100,
    page: 1,
    total: 0,
  });

  // fetch data from api
  const fetchCats = async (
    page: number,
    order?: FilterOrderType,
    searchByBreed?: string
  ) => {
    setIsLoading(true);
    try {
      const catsResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_CATS_API_SERVER_URL}/images/search?limit=${pagination?.limit}&page=${page}&order=${order ? order : filterByOrder}${searchByBreed ? `&breed_ids=${searchByBreed}` : ""}`,
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_CATS_API_KEY,
          },
        }
      );

      setCats(catsResponse.data);
      setPagination({
        total: Number(catsResponse.headers["pagination-count"]) || 100,
        page: Number(catsResponse.headers["pagination-page"]) || page,
        limit: Number(catsResponse.headers["pagination-limit"]) || 100,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching cat images:", error);
    }
  };

  const onPageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPagination({
      total: Number(pagination.total),
      page: Number(newPage),
      limit: Number(pagination.limit) || 100,
    });
    fetchCats(newPage);
  };

  useEffect(() => {
    // get all breeds for filtering and display
    const fetchBreads = async () => {
      try {
        const catsBreedsResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_CATS_API_SERVER_URL}/breeds`,
          {
            headers: {
              "x-api-key": process.env.NEXT_PUBLIC_CATS_API_KEY,
            },
          }
        );
        setListOfBreeds(catsBreedsResponse.data);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching Breeds:", error);
      }
    };
    fetchBreads();
    fetchCats(1);
  }, []);

  const totalPages = Math.ceil(pagination.total / pagination.limit) - 1;

  return (
    <Fragment>
      <Grid textAlign={"left"} alignItems={"center"} container>
        <Grid xs={2.2} lg={1}>
          <Typography sx={{ fontSize: 16, pl: 1,fontWeight:600 }}>Filters:- </Typography>
        </Grid>
        {["ASC", "DESC", "RAND"].map((filter: string) => {
          return (
            <Grid key={filter} xs={1.7} lg={0.9}>
              <Button
                onClick={() => {
                  setFilterByOrder(filter as FilterOrderType);
                  fetchCats(pagination.page, filter as FilterOrderType);
                }}
                disabled={filterByOrder === filter}
                sx={{ textDecoration: "underline" }}
              >
                {filter}
              </Button>
            </Grid>
          );
        })}
        <Grid xs={0.5}></Grid>
        <Grid xs={4} md={4} lg={1.5} xl={1.3}>
          <FormControl variant="outlined" fullWidth>
            <Select
              renderValue={(value: string) => {
                const selectedBreed = listOfBreeds.find(
                  (breed) => breed.id === value
                );
                return selectedBreed ? selectedBreed.name : "Select Breed";
              }}
              onChange={(e) =>
                fetchCats(pagination.page, "RAND", e.target.value)
              }
              labelId="breed-select-label"
              displayEmpty
              disableUnderline
              placeholder="dksjf"
              variant="standard"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 80 * 5,
                    fontSize: "12px",
                  },
                },
              }}
              sx={{
                "& .MuiSelect-select": {
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  height: "300px",
                },
                "& .MuiSelect-icon": {
                  marginLeft: 1,
                },
                border: "none",
                boxShadow: "none",
              }}
            >
              {listOfBreeds.map((breed, index) => (
                <MenuItem key={index} value={breed.id}>
                  {breed.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid sx={{ p: 1 }} container spacing={3}>
        {isLoading
          ? Array.from({ length: 100 })?.map((cat, index) => (
              <Fragment key={index}>
                <Grid item xs={12} sm={6} xl={2.3} lg={4}>
                  <Card>
                    <Skeleton
                      animation="wave"
                      sx={{ bgcolor: "grey.400" }}
                      variant="rectangular"
                      height={200}
                    />
                  </Card>
                </Grid>
                {index === 24 || index === 49 || index === 74 ? (
                  <Grid xs={12}>
                    <Box display="flex" justifyContent="center" mb={5} mt={4}>
                      <Pagination
                        count={totalPages}
                        page={pagination.page}
                        onChange={onPageChange}
                        disabled
                        color="secondary"
                        variant="outlined"
                        shape="rounded"
                      />
                    </Box>
                  </Grid>
                ) : null}
              </Fragment>
            ))
          : null}

        {!isLoading
          ? cats?.map((cat, index) => (
              <Fragment key={index}>
                <Grid item xs={12} sm={6} xl={2.3} lg={4}>
                  <Card
                    onClick={() => {
                      setDrawerOpen(true);
                      setSelectedCat(cat);
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: "8px",
                      boxShadow:
                      hoveredIndex === index
                      ? "0 8px 16px rgba(0, 0, 0, 0.3)"
                      : "none",
                      transition: "box-shadow 0.3s ease",
                    }}
                    >
                    <Image
                      src={cat.url}
                      alt={`Cat ${index + 1}`}
                      height={300}
                      width={300}
                      style={{
                        border:'1px solid gray',
                        objectFit: "cover",
                        borderRadius: "8px",
                        height: "200px",
                        width: "100%",
                        transition: "transform 0.3s ease-in-out",
                        transform:
                          hoveredIndex === index ? "scale(1.1)" : "scale(1)",
                      }}
                      loading="lazy"
                    />

                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        transition: "opacity 0.3s ease",
                        opacity: hoveredIndex === index ? 1 : 0,
                        pointerEvents: "none",
                      }}
                    />

                    <IconButton
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform:
                          hoveredIndex === index
                            ? "translate(-50%, -50%) scale(1)"
                            : "translate(-50%, -50%) scale(0.7)",
                        color: "white",
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                        transition: "transform 0.3s ease, opacity 0.3s ease",
                        opacity: hoveredIndex === index ? 1 : 0,
                        pointerEvents: hoveredIndex === index ? "auto" : "none",
                      }}
                      onClick={() => console.log("Preview Clicked")}
                    >
                      <ZoomIn sx={{ fontSize: 30 }} />
                    </IconButton>
                  </Card>
                </Grid>

                {index === 24 || index === 49 || index === 74 ? (
                  <Grid xs={12}>
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
                  </Grid>
                ) : null}
              </Fragment>
            ))
          : null}
      </Grid>
      {
        totalPages > 0 ?
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
      :null  }

      {selectedCat ? (
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: {
                xs: "100%",
                sm: "80%",
                md: "80%",
                lg: "50%",
                xl: "30%",
                xxl: "20%",
              },
            },
          }}
        >
          <DetailsDrawer
            selectedCat={selectedCat}
            setDrawerOpen={setDrawerOpen}
          />
        </Drawer>
      ) : null}
    </Fragment>
  );
}
