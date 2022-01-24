import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Box, ListItemIcon } from "@mui/material";
import MuiList from "@mui/material/List";
import MuiListItemText from "@mui/material/ListItemText";
import MuiDrawer from "@mui/material/Drawer";
import MuiListItem from "@mui/material/ListItem";
import { Link, Logo } from "components/common";
import { useLocation } from "react-router-dom";
import c from "classnames";
import { navigationList } from "configs/layout";

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

  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 1),
  width: "100%",
  height: 88,
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const ListItem = styled(MuiListItem)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "8.5px 16px",

  "&:hover": {
    svg: {
      fill: theme.palette.common.white,
    },
    ".MuiSvgIcon-root": {
      color: theme.palette.common.white,
    },
    ".MuiListItemText-root": {
      opacity: 1,
    },
  },
  ".MuiListItemIcon-root": {
    minWidth: "fit-content",
    ".MuiSvgIcon-root": {
      margin: "0 auto",
      transition: theme.transitions.create(
        "all",
        theme.transitions.duration.short,
        theme.transitions.easing.easeInOut
      ),
    },
    svg: {
      transition: theme.transitions.create(
        "all",
        theme.transitions.duration.short,
        theme.transitions.easing.easeInOut
      ),
    },
  },
  ".MuiListItemText-root": {
    maxWidth: 40,
    overflow: "hidden",
    transition: theme.transitions.create(
      "all",
      theme.transitions.duration.short,
      theme.transitions.easing.easeInOut
    ),
    ".MuiTypography-root": {
      fontSize: 12,
      fontWeight: "normal",
      lineHeight: "150%",
      letterSpacing: 0.4,
    },
  },
}));

const List = styled(MuiList)({
  padding: 0,
});

const ListItemText = styled(MuiListItemText)({
  margin: 0,
});

const useStyles = makeStyles((theme) => ({
  selected: {
    color: theme.palette.common.white,
    fill: theme.palette.common.white,
  },
  hidden: {
    opacity: 0,
  },
}));

export default function MyDrawer() {
  const classes = useStyles();
  const location = useLocation();

  return (
    <Drawer variant="permanent">
      <DrawerHeader>
        <Link to="/">
          <Logo />
        </Link>
      </DrawerHeader>
      <List>
        {navigationList.map(({ path, key, label, Icon }) => {
          const selected = location?.pathname === path;
          return (
            <Link to={path ?? "/"} key={key}>
              <ListItem>
                <ListItemIcon>
                  <Icon className={c({ [classes.selected]: selected })} />
                </ListItemIcon>
                <ListItemText
                  className={c({ [classes.hidden]: !selected })}
                  primary={label}
                />
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Drawer>
  );
}
