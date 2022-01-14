import { useState, useCallback, useMemo } from "react";
import { Box, Typography, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { TextField, SliderBar, Button } from "components/common";
import Profile from "./Profile";
import { last } from "ramda";
import { useNavigate, createSearchParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  subtitle: {
    fontSize: 14,
    lineHeight: "150%",
    letterSpacing: 0.15,
    flex: "none",
    order: 0,
    flexGrow: 0,
    margin: "0 8px",
  },
}));

const marks = [
  { value: 3, label: "3" },
  { value: 6, label: "6" },
  { value: 9, label: "9" },
  { value: 12, label: "12" },
  { value: 15, label: "15" },
  { value: 19, label: "50" },
];
const pagePadding = 130;

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
    <Box width="100%" display="flex" flexDirection="row">
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        style={{ padding: `0 ${pagePadding}px` }}
      >
        <Box mt={7} color="common.white" width="100%">
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

        <Box mt={7} color="common.white" width="100%">
          <Typography variant="h5" style={{ height: 36 }}>
            # of results per page
          </Typography>

          <Box
            mt={4}
            display="flex"
            flexDirection="row"
            alignItems="flex-end"
            color="common.white"
          >
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

        <Divider
          sx={{
            backgroundColor: "common.white",
            mt: 3,
            border: 1,
            borderColor: "common.white",
          }}
          width="100%"
          style={{ opacity: 0.1 }}
        />

        <Box
          display="flex"
          mt={4}
          sx={[
            (theme) => ({
              position: "fixed",
              bottom: 87,
              left: pagePadding + theme.sizes.desktop.menu.width,
            }),
          ]}
        >
          <Button
            text="Search"
            uppercase
            style={{ padding: "13px 16px", width: 343, height: 40 }}
            onClick={submit}
          />
        </Box>
      </Box>
      <Profile />
    </Box>
  );
}
