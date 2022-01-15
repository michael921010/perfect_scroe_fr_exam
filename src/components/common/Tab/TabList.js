import MuiTabList from "@mui/lab/TabList";
import { withStyles } from "@mui/styles";

const TabList = withStyles((theme) => ({
  indicator: {
    backgroundColor: theme.palette.common.white,
  },
}))(MuiTabList);

export default TabList;
