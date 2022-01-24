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
    width: theme.sizes.desktop.profile.width,
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  lazy: {
    width: theme.sizes.desktop.profile.width,
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  tabs: {
    width: "100%",
    borderBottom: `${size.divider}px solid #1F1F1F`,
    position: "absolute",
  },
}));

const MyTab = styled(Tab)({
  paddingTop: 0,
  paddingBottom: 9,
  minHeight: 0,
});

const Panel = styled(TabPanel)({
  flexGrow: 1,
  overflow: "hidden",
  marginTop: 65,
  padding: 0,
  width: "100%",
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
        <Box className={classes.tabs}>
          <TabList
            sx={[{ pt: 4 }]}
            onChange={handleChange}
            aria-label="Follow friends"
            allowScrollButtonsMobile
            variant="fullWidth"
          >
            {pages.map(({ value, label }) => (
              <MyTab key={value} label={label} value={value} />
            ))}
          </TabList>
        </Box>

        <Suspense fallback={<LoadingScreen fullScreen />}>
          {pages.map(({ value, fetch }) => (
            <Panel key={value} value={value}>
              <Follow fetch={fetch} />
            </Panel>
          ))}
        </Suspense>
      </TabContext>
    </Box>
  );
}
