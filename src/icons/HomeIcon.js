import { styled } from "@mui/material/styles";
import MuiCopyIcon from "@mui/icons-material/ContentCopyRounded";

const Icon = styled(MuiCopyIcon)(({ theme }) => ({
  transform: "rotate(180deg)",
  color: theme.palette.common.white,
}));

export default function HomeIcon(props) {
  return <Icon {...props} />;
}
