import { useState, useCallback, useMemo } from "react";
import { Box, Typography, Divider } from "@mui/material";
import { makeStyles, withStyles } from "@mui/styles";
import { TextField, SliderBar, Button } from "components/common";
import { last } from "ramda";
import { useNavigate, createSearchParams } from "react-router-dom";

const pagePadding = { desktop: 130, mobile: 20 };
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    padding: `0 ${pagePadding.desktop}px`,
    maxHeight: "100%",
    overflow: "hidden scroll",
    position: "relative",

    [theme.breakpoints.down("sm")]: {
      padding: `0 ${pagePadding.mobile}px`,
      paddingBottom: 24,
    },
  },
  title: {
    marginTop: theme.spacing(7),
    width: "100%",

    [theme.breakpoints.down("sm")]: {
      marginTop: 0,
    },
  },
  divider: {
    backgroundColor: theme.palette.common.white,
    marginTop: theme.spacing(3),
    border: `1px solid ${theme.palette.common.white}`,
    width: "100%",
    opacity: 0.1,

    [theme.breakpoints.down("sm")]: {
      marginTop: 221,
    },
  },
  subtitle: {
    fontSize: 14,
    lineHeight: "150%",
    letterSpacing: 0.15,
    flex: "none",
    order: 0,
    flexGrow: 0,
    margin: "0 8px",
  },
  button: {
    display: "flex",
    marginTop: theme.spacing(4),
    position: "fixed",
    bottom: 87,
    left: pagePadding.desktop + theme.sizes.desktop.menu.width,

    [theme.breakpoints.down("sm")]: {
      position: "relative",
      left: "initial",
      bottom: "initial",
      justifyContent: "center",
      width: "100%",
      marginTop: theme.spacing(10),
    },
  },
}));

const Submit = withStyles((theme) => ({
  root: {
    padding: "13px 16px",
    width: 343,
    height: 40,

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}))(Button);

const marks = [
  { value: 3, label: "3" },
  { value: 6, label: "6" },
  { value: 9, label: "9" },
  { value: 12, label: "12" },
  { value: 15, label: "15" },
  { value: 19, label: "50" },
];

export default function Home() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [sliderIndex, setSliderIndex] = useState(4);

  const sliderInfo = useMemo(() => marks[sliderIndex] ?? {}, [sliderIndex]);

  const handleQuery = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  const handleSlider = useCallback((e, val) => {
    const index = marks.findIndex(({ value }) => value === val);
    setSliderIndex(index);
  }, []);

  const submit = useCallback(
    (e) => {
      const pageSize = Number(sliderInfo?.label);

      if (isNaN(pageSize)) {
        // 阿伯出事啦
      } else {
        navigate({
          pathname: "/results",
          search: createSearchParams({ q: query, pageSize }).toString(),
        });
      }
    },
    [query, sliderInfo, navigate]
  );

  return (
    <Box className={classes.root}>
      <Box className={classes.title}>
        <Typography variant="h5" style={{ height: 36 }}>
          Search
        </Typography>

        <Box mt={3}>
          <TextField
            fullWidth
            type="text"
            value={query}
            onChange={handleQuery}
            placeholder="Keyword"
          />
        </Box>
      </Box>

      <Box mt={7} width="100%">
        <Typography variant="h5" style={{ height: 36 }}>
          # of results per page
        </Typography>

        <Box mt={4} display="flex" flexDirection="row" alignItems="flex-end">
          <Typography variant="h3" style={{ height: 50 }}>
            {sliderInfo?.label ?? ""}
          </Typography>
          <Typography style={{ height: 24 }} className={classes.subtitle}>
            results
          </Typography>
        </Box>
        <Box mt={1}>
          <SliderBar
            min={marks?.[0]?.value}
            max={last(marks)?.value}
            step={null}
            value={sliderInfo.value}
            thumbShadow={false}
            marks={marks}
            onChange={handleSlider}
          />
        </Box>
      </Box>

      <Divider className={classes.divider} />

      <Box className={classes.button}>
        <Submit text="Search" uppercase onClick={submit} />
      </Box>
    </Box>
  );
}
