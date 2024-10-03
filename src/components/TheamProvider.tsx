"use client";
import { createTheme, CssBaseline } from "@mui/material";
import { Navigation } from "@toolpad/core";
import { AppProvider } from "@toolpad/core/nextjs";
import HomeIcon from '@mui/icons-material/Home';

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

export const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    kind: "page",
    title: "Page",
    icon: <HomeIcon />,
  },
];
export default function CustomThemeProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider navigation={NAVIGATION as Navigation} theme={theme}>
      <CssBaseline />
      {children}
    </AppProvider>
  );
}
