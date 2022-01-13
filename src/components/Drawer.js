import { styled } from "@mui/material/styles";
import {
  Box,
  Drawer as MuiDrawer,
  Typography,
  List,
  ListItemText,
  ListItemIcon,
  ListItem as MuiListItem,
} from "@mui/material";
import { GridViewRounded } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { TagIcon, HomeIcon } from "icons";

const drawerWidth = 80;
const closedMixin = (theme) => ({
  width: drawerWidth,
  backgroundColor: "#1B1B1B",
  overflowX: "hidden",
});

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...closedMixin(theme),
  "& .MuiDrawer-paper": closedMixin(theme),
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Logo = styled(Typography)({
  height: 15,
  textTransform: "uppercase",
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: 13,
  lineHeight: "15px",
  letterSpacing: "-0.05em",
  background: "-webkit-linear-gradient(270deg, #FFD25F 0.13%, #FF5C01 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
});

const Link = styled(RouterLink)({
  textDecoration: "none",
});

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
          <Logo>Logo</Logo>
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
