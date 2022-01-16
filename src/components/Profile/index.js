import { useState, useCallback, lazy, Suspense } from "react";
import { Box } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { makeStyles, styled } from "@mui/styles";
import { LoadingScreen, TabList, Tab, LazyLoad } from "components/common";
import { fetchUsers, fetchFriends } from "api/user";
const Follow = lazy(() => import("./Follow"));

const size = { divider: 2, tabHeight: 48 };
const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: "100vh",

    // "@media (max-width:900px)": {
    "@media (max-width: 1440px)": {
      display: "none",
    },
  },
  lazy: {
    width: 375,
    display: "flex",
    flexDirection: "column",
  },
}));

const Panel = styled(TabPanel)({
  flexGrow: 1,
  overflow: "hidden",
});

// "value" must be unique and string type
const pages = [
  {
    value: "1",
    label: "Followers",
    fetch: fetchUsers,
  },
  {
    value: "2",
    label: "Following",
    fetch: fetchFriends,
  },
];

export default function Profile() {
  const classes = useStyles();

  const [value, setValue] = useState("1");

  const handleChange = useCallback((e, value) => {
    setValue(value);
  }, []);

  return (
    <Box className={classes.root}>
      <LazyLoad className={classes.lazy} placeholder={null}>
        <TabContext value={value}>
          <Box
            width="100%"
            sx={{ borderBottom: size.divider, borderColor: "#1F1F1F" }}
          >
            <TabList
              onChange={handleChange}
              aria-label="Follow friends"
              allowScrollButtonsMobile
              variant="fullWidth"
            >
              {pages.map(({ value, label }) => (
                <Tab key={value} label={label} value={value} />
              ))}
            </TabList>
          </Box>

          <Suspense fallback={<LoadingScreen fullScreen />}>
            {pages.map(({ value, fetch }) => (
              <Panel
                key={value}
                value={value}
                style={{ padding: 0, width: "100%" }}
              >
                <Follow fetch={fetch} />
              </Panel>
            ))}
          </Suspense>
        </TabContext>
      </LazyLoad>
    </Box>
  );
}
