import { useState, useCallback, lazy, Suspense } from "react";
import { Box } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { makeStyles, styled } from "@mui/styles";
import { LoadingScreen, TabList, Tab } from "components/common";
import { fetchUsers, fetchFriends } from "api/user";
const Follow = lazy(() => import("./Follow"));

const size = { divider: 2, tabHeight: 48 };
const useStyles = makeStyles((theme) => ({
  root: {
    width: 375,
    maxHeight: "100vh",

    // "@media (max-width:1200px)": {
    "@media (max-height: 1440px)": {
      // display: "none",
    },
  },
}));

const Panel = styled(TabPanel)({
  height: `calc(100% - ${size.divider + size.tabHeight}px)`,
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
      <TabContext value={value}>
        <Box sx={{ borderBottom: size.divider, borderColor: "#1F1F1F" }}>
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
          {pages.map(({ value, fetch, Component }) => (
            <Panel key={value} value={value} style={{ padding: 0 }}>
              <Follow fetch={fetch} />
            </Panel>
          ))}
        </Suspense>
      </TabContext>
    </Box>
  );
}
