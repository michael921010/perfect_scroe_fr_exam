import MuiSkeleton from "@mui/material/Skeleton";
import { styled, makeStyles } from "@mui/styles";
import c from "classnames";

const CSSSkeleton = styled(MuiSkeleton)(({ theme }) => ({
  opacity: 1,
  backgroundColor: "rgba(255, 255, 255, 0.06)",
}));

const useStyles = makeStyles((theme) => ({
  root: ({ fullScreen }) => ({
    ...(fullScreen && {
      width: "100%",
      height: "100%",
      maxWidth: "100%",
    }),
  }),
}));

export default function MySkeleton({
  className,
  fullScreen,
  children,
  ...props
}) {
  const classes = useStyles({ fullScreen });
  return (
    <CSSSkeleton className={c(classes.root, className)} {...props}>
      {children}
    </CSSSkeleton>
  );
}

MySkeleton.defaultProps = {
  className: "",
  animation: "wave",
  variant: "rect",
  fullScreen: true,
  //   fullWidth: true,
};
