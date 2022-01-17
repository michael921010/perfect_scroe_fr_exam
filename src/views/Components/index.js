import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Buttons from "./Buttons";
import Input from "./Input";
import Slider from "./Slider";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: "68px 88px",
  },
  caption: {
    width: 168,
    height: 45,
    fontWeight: "bold",
    textAlign: "center",
  },
}));

export default function Components() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box>
        <Typography variant="h4" className={classes.caption}>
          Component
        </Typography>
      </Box>

      <Box mt={5}>
        <Buttons />
      </Box>

      <Box mt={5}>
        <Input />
      </Box>

      <Box mt={5}>
        <Slider thumbShadow={false} />
      </Box>
    </Box>
  );
}
