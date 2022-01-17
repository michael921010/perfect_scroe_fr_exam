import { styled } from "@mui/material/styles";
import { Box, List, ListItemText, ListItemIcon } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiListItem from "@mui/material/ListItem";
import { GridViewRounded } from "@mui/icons-material";
import { Link, Logo } from "components/common";
import { TagIcon, HomeIcon } from "icons";

const closedMixin = (theme) => ({
  width: theme.sizes.desktop.menu.width,
  backgroundColor: "#1B1B1B",
  overflowX: "hidden",
});

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...closedMixin(theme),
  "& .MuiDrawer-paper": closedMixin(theme),

  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const ListItem = styled(MuiListItem)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  ".MuiListItemIcon-root": {
    minWidth: "fit-content",
    ".MuiSvgIcon-root": {
      margin: "0 auto",
    },
  },
  ".MuiListItemText-root": {
    maxWidth: 40,
    overflow: "hidden",
    ".MuiTypography-root": {
      color: theme.palette.common.white,
      fontSize: 12,
      fontWeight: "normal",
      lineHeight: "150%",
      letterSpacing: 0.4,
    },
  },
}));

const list = [
  {
    path: "/",
    key: "home",
    label: "Home",
    Icon: HomeIcon,
  },
  {
    path: "/tags",
    key: "tags",
    label: "Tags",
    Icon: TagIcon,
  },
  {
    path: "/component",
    key: "component",
    label: "App",
    Icon: GridViewRounded,
  },
];

export default function MyDrawer() {
  return (
    <Drawer variant="permanent">
      <DrawerHeader>
        <Link to="/">
          <Logo />
        </Link>
      </DrawerHeader>
      <List>
        {list.map(({ path, key, label, Icon }) => (
          <Link to={path ?? "/"} key={key}>
            <ListItem>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );
}
