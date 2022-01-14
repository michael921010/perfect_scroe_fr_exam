import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 375,

    // "@media (max-width:1200px)": {
    "@media (max-height: 1440px)": {
      display: "none",
    },
  },
}));

export default function Profile() {
  const classes = useStyles();

  return <Box className={classes.root}></Box>;
}
