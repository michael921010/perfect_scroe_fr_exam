import { useState, useCallback, useMemo } from "react";
import { Box, Typography, Divider } from "@mui/material";
import { makeStyles, withStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import { TextField, SliderBar, Button, SimpleBar } from "components/common";
import { last } from "ramda";
import { useNavigate, createSearchParams } from "react-router-dom";

const ScrollBar = styled(SimpleBar)({
  width: "100%",
  maxHeight: "100%",
});

const pagePadding = { desktop: 130, mobile: 20 };
const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    overflow: "hidden",

    [theme.breakpoints.down("xl")]: {
      display: "flex",
      position: "relative",
      maxHeight: "100%",
    },
  },
  content: {
    [theme.breakpoints.down("md")]: {
      paddingBottom: 110,
    },
  },
  wrapper: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    padding: `0 ${pagePadding.desktop}px`,

    [theme.breakpoints.down("md")]: {
      padding: `0 ${pagePadding.mobile}px`,
      paddingBottom: 24,
      alignItems: "center",
    },
  },
  title: {
    marginTop: 54,
    width: "100%",
    maxWidth: 725,

    [theme.breakpoints.down("md")]: {
      marginTop: 0,
    },
  },
  field: {
    marginTop: 20,
    maxWidth: 725,
    [theme.breakpoints.down("md")]: {
      marginTop: 16,
    },
  },
  slideBar: {
    marginTop: 30,
    width: "100%",
    maxWidth: 725,

    [theme.breakpoints.down("md")]: {
      marginTop: 28,
    },
  },
  results: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    [theme.breakpoints.down("md")]: {
      marginTop: 16,
    },
  },
  slider: {
    marginTop: 20,
    [theme.breakpoints.down("md")]: {
      marginTop: 30,
    },
  },
  divider1: {
    backgroundColor: theme.palette.common.white,
    marginTop: 30,
    border: `1px solid ${theme.palette.common.white}`,
    width: "100%",
    opacity: 0.1,
    maxWidth: 725,

    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  divider2: {
    backgroundColor: theme.palette.common.white,
    marginTop: 20,
    border: `1px solid ${theme.palette.common.white}`,
    width: "100%",
    opacity: 0.1,
    maxWidth: 725,

    [theme.breakpoints.down("md")]: {
      marginTop: 221,
    },
  },
  subtitle: {
    fontSize: 16,
    lineHeight: "150%",
    letterSpacing: 0.15,
    flex: "none",
    order: 0,
    flexGrow: 0,
    margin: "0 10px",
  },
  button: {
    display: "flex",
    position: "fixed",
    bottom: 87,
    left: pagePadding.desktop + theme.sizes.desktop.menu.width,

    [theme.breakpoints.down("md")]: {
      position: "fixed",
      left: 0,
      right: 0,
      bottom: theme.sizes.mobile.bottomNavigation.height,
      padding: "46px 20px 24px 20px",
      display: "flex",
      justifyContent: "center",
      backgroundColor: theme.palette.background.default,
    },
  },
}));

const Submit = withStyles((theme) => ({
  root: {
    padding: "13px 16px",
    width: 343,
    height: 40,

    [theme.breakpoints.down("md")]: {
      width: "100%",
      maxWidth: 725,
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
      <ScrollBar>
        <Box className={classes.content}>
          <Box className={classes.wrapper}>
            <Box className={classes.title}>
              <Typography variant="h5" style={{ height: 36 }}>
                Search
              </Typography>

              <Box className={classes.field}>
                <TextField
                  fullWidth
                  type="text"
                  value={query}
                  onChange={handleQuery}
                  placeholder="Keyword"
                />
              </Box>
            </Box>

            <Divider className={classes.divider1} />

            <Box className={classes.slideBar}>
              <Typography variant="h5" style={{ height: 36 }}>
                # of results per page
              </Typography>

              <Box className={classes.results}>
                <Typography variant="h3" style={{ height: 50 }}>
                  {sliderInfo?.label ?? ""}
                </Typography>
                <Typography className={classes.subtitle}>results</Typography>
              </Box>
              <Box className={classes.slider}>
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

            <Divider className={classes.divider2} />
          </Box>
          <Box className={classes.button}>
            <Submit text="Search" uppercase onClick={submit} />
          </Box>
        </Box>
      </ScrollBar>
    </Box>
  );
}
