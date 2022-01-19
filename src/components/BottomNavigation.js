import { useCallback } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import MuiPaper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { useLocation, useNavigate } from "react-router-dom";
import c from "classnames";
import { navigationList } from "configs/layout";

const Paper = styled(MuiPaper)(({ theme }) => ({
  height: theme.sizes.mobile.bottomNavigation.height,
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "rgba(24, 24, 24, 0.2)",
  boxShadow: "inset 0px 0.5px 0px rgba(0, 0, 0, 0.8)",
  backdropFilter: "blur(54.3656px)",
  borderRadius: 0,

  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

const Navigation = styled(BottomNavigation)(({ theme }) => ({
  height: "100%",
  backgroundColor: "inherit",
}));

const Action = styled(BottomNavigationAction)(({ theme }) => ({
  color: `${theme.palette.common.white} !important`,
  svg: {
    transition: theme.transitions.create(
      "all",
      theme.transitions.duration.short,
      theme.transitions.easing.easeInOut
    ),
  },
  "&:hover": {
    svg: {
      fill: theme.palette.common.white,
    },
    ".MuiSvgIcon-root": {
      color: theme.palette.common.white,
    },
  },
}));

const useStyles = makeStyles((theme) => ({
  selected: {
    color: theme.palette.common.white,
  },
}));

export default function LabelBottomNavigation() {
  const classes = useStyles();
  const location = useLocation();
  const navigation = useNavigate();

  const handleChange = useCallback(
    (e, value) => {
      navigation(value);
    },
    [navigation]
  );

  return (
    <Paper elevation={3}>
      <Navigation value={location?.pathname} onChange={handleChange}>
        {navigationList.map(({ key, path, Icon }) => {
          const selected = location?.pathname === path;
          return (
            <Action
              key={key}
              value={path}
              icon={<Icon className={c({ [classes.selected]: selected })} />}
            />
          );
        })}
      </Navigation>
    </Paper>
  );
}
