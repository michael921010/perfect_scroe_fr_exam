import { Fragment, useState, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { last } from "ramda";
import { SliderBar } from "components/common";

const useStyles = makeStyles((theme) => ({
  title: {
    width: 65,
    height: 36,
    textTransform: "capitalize",
    color: theme.palette.common.white,
  },
}));
const marks = [
  { value: 1, label: "3" },
  { value: 2, label: "6" },
  { value: 3, label: "9" },
  { value: 4, label: "12" },
  { value: 5, label: "15" },
  { value: 6, label: "50" },
];

export default function Slider() {
  const classes = useStyles();
  const [value, setValue] = useState(2);

  const handler = useCallback((e, val) => {
    setValue(val);
  }, []);

  return (
    <Fragment>
      <Typography variant="h5" className={classes.title}>
        Slider
      </Typography>

      <Box mt={3}>
        <Box mt={1} style={{ width: "100%", maxWidth: 725 }}>
          <SliderBar
            min={marks?.[0]?.value}
            max={last(marks)?.value}
            value={value}
            thumbShadow={false}
            marks={marks}
            onChange={handler}
          />
        </Box>
      </Box>
    </Fragment>
  );
}
