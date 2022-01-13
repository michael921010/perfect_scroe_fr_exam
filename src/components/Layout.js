import { Box } from "@mui/material";
import Drawer from "./Drawer";

export default function Layout({ children }) {
  return (
    <Box display="flex" flexDirection="row">
      <Drawer />
      {children}
    </Box>
  );
}
