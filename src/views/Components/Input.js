import { Fragment, useState, useCallback, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { TextField } from "components/common";

const useStyles = makeStyles((theme) => ({
  title: {
    width: 65,
    height: 36,
    textTransform: "capitalize",
  },
}));

export default function InputBlock() {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const ref = useRef();

  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return (
    <Fragment>
      <Typography variant="h5" className={classes.title}>
        Input
      </Typography>

      <Box mt={3} style={{ width: "100%", maxWidth: 725 }}>
        <TextField
          ref={ref}
          fullWidth
          type="text"
          value={value}
          onChange={handler}
          placeholder="Keyword"
        />
      </Box>
    </Fragment>
  );
}
