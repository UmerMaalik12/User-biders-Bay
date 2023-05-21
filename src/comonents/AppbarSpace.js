import { styled } from "@mui/material/styles";

export const AppbarSpace = styled("div")(({ theme }) => ({
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));