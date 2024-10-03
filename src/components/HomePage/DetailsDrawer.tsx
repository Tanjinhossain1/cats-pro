import React, { Fragment } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { CatsTypes } from "@/types/CatsType";
import { Box, Typography } from "@mui/material";

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
      <Box
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
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
    </Fragment>
  );
}
