import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

export default styled(Link, {
  shouldForwardProp: (prop) => prop !== "fitWidth",
})(({ theme, fitWidth }) => ({
  color: theme.palette.common.white,
  textDecoration: "none",

  ...(fitWidth && {
    width: "fit-content",
  }),
}));
