import MuiSkeleton from "@mui/material/Skeleton";
import { styled, makeStyles } from "@mui/styles";

const CSSSkeleton = styled(MuiSkeleton)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  opacity: 0.06,
}));

const useStyles = makeStyles((theme) => ({
  root: ({ fullScreen }) => ({
    ...(fullScreen && {
      width: "100%",
      height: "100%",
    }),
  }),
}));

export default function MySkeleton({ fullScreen, ...props }) {
  const classes = useStyles({ fullScreen });
  return <CSSSkeleton className={classes.root} {...props} />;
}

MySkeleton.defaultProps = {
  animation: "wave",
  variant: "rect",
  fullScreen: true,
  //   fullWidth: true,
};
