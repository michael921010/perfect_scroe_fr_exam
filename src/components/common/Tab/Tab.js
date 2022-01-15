import MuiTab from "@mui/material/Tab";
import { styled } from "@mui/styles";

const Tab = styled(MuiTab)(({ theme }) => ({
  color: " #929292",
  fontWeight: "normal",
  fontStyle: "normal",
  fontSize: 16,
  lineHeight: "150%",
  letterSpacing: 0.15,
  textTransform: "capitalize",
  "&.Mui-selected": {
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
}));

export default Tab;
