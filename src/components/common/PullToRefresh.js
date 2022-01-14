import { makeStyles } from "@mui/styles";
import PullToRefresh from "react-simple-pull-to-refresh";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .lds-ellipsis": {
      "& >div": {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
}));

export default function MyPullToRefresh({ children, ...props }) {
  const classes = useStyles();
  return (
    <PullToRefresh className={classes.root} {...props}>
      {children}
    </PullToRefresh>
  );
}

MyPullToRefresh.defaultProps = {
  canFetchMore: true,
};
