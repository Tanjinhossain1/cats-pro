import React, { Fragment } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { CatsTypes } from "@/types/CatsType";
import { Box, Grid, Typography } from "@mui/material";
import Link from "next/link";

export default function DetailsDrawer({
  selectedCat,
  setDrawerOpen,
}: {
  selectedCat: CatsTypes;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Fragment>
      <br />
      <br />
      <br />
      <Typography
        onClick={() => setDrawerOpen(false)}
        sx={{
          textAlign: "start",
          alignItems: "center",
          display: "flex",
          color: "red",
          mb: 1,
          cursor: "pointer",
        }}
      >
        <CloseIcon sx={{ fontSize: 35 }} color="error" />
        Close
      </Typography>
      <Box>
        <Image
          src={selectedCat.url}
          alt={`Cat`}
          height={400}
          width={400}
          style={{
            objectFit: "contain",
            width: "100%",
          }}
          loading="lazy"
        />
      </Box>
      {(selectedCat?.categories && selectedCat?.categories[0]) ||
      (selectedCat?.breeds && selectedCat?.breeds[0]) ? null : (
        <Typography sx={{ textAlign: "center", fontSize: 20 }}>
          No More Details 😅
        </Typography>
      )}
      {selectedCat?.categories && selectedCat?.categories[0] ? (
        <CommonGridComponent
          label="Categories"
          value={selectedCat?.categories?.[0]?.name}
        />
      ) : null}

      {selectedCat?.breeds && selectedCat?.breeds[0] ? (
        <Box sx={{ ml: 2, mb: 5 }}>
          <Typography
            sx={{ fontSize: 22, fontWeight: 600, mt: 1 }}
            component={"h1"}
          >
            <span style={{ textDecoration: "underline" }}>Bread Details</span>:-
          </Typography>

          <CommonGridComponent
            label="Bread Name"
            value={selectedCat?.breeds?.[0]?.name}
          />
          <CommonGridComponent
            label="Country"
            value={selectedCat?.breeds?.[0]?.origin}
          />
          <CommonGridComponent
            label="Activities"
            value={selectedCat?.breeds?.[0]?.temperament}
          />

          <Typography
            sx={{ fontSize: 22, fontWeight: 600, mt: 3 }}
            component={"h1"}
          >
            <span style={{ textDecoration: "underline" }}>Weight</span>:-
          </Typography>

          <CommonGridComponent
            label="Imperial"
            value={selectedCat?.breeds?.[0]?.weight?.imperial}
          />
          <CommonGridComponent
            label="Metric"
            value={selectedCat?.breeds?.[0]?.weight?.metric}
          />

          <Typography
            sx={{ fontSize: 22, fontWeight: 600, mt: 3 }}
            component={"h1"}
          >
            <span style={{ textDecoration: "underline" }}>Description</span>:-
          </Typography>

          <Typography
            sx={{
              fontSize: 16,
              ml: 5,
              p: 1,
            }}
          >
            {selectedCat?.breeds?.[0]?.description}
          </Typography>
            {
                selectedCat?.breeds?.[0]?.vetstreet_url || selectedCat?.breeds?.[0]?.wikipedia_url ? 
                <Typography
                sx={{ fontSize: 22, fontWeight: 600, mt: 3 }}
                component={"h1"}
                >
            <span style={{ textDecoration: "underline" }}>
              Other Details Link
            </span>
            :-
          </Typography>
        : null}
          <Typography>
            {selectedCat?.breeds?.[0]?.vetstreet_url ? (
              <Link
                target="_blank"
                href={selectedCat?.breeds?.[0]?.vetstreet_url}
              >
                Vetstreet
              </Link>
            ) : null}
            {selectedCat?.breeds?.[0]?.wikipedia_url ? (
              <Link
                target="_blank"
                style={{ marginLeft: "10px" }}
                href={selectedCat?.breeds?.[0]?.wikipedia_url}
              >
                Wikipedia
              </Link>
            ) : null}
          </Typography>
        </Box>
      ) : null}
    </Fragment>
  );
}

const CommonGridComponent = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <Grid container alignItems="center" sx={{ mt: 1, pl: 5 }}>
      <Grid item xs={3}>
        <Typography sx={{ fontSize: 18, fontWeight: 400 }}>
          <b>{label}</b>
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography sx={{ fontSize: 20 }}>:</Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography sx={{ fontSize: 16 }}>{value}</Typography>
      </Grid>
    </Grid>
  );
};
