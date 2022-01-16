import { useMemo } from "react";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import Drawer from "./Drawer";
import Profile from "./Profile";

export default function Layout({ children }) {
  const location = useLocation();

  const needProfile = useMemo(
    () => ["/", "/results"].includes(location?.pathname),
    [location]
  );

  console.log(needProfile, location);
  return (
    <Box display="flex" flexDirection="row">
      <Drawer />
      {children}
      {needProfile && <Profile />}
    </Box>
  );
}
