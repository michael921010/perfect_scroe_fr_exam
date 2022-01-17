import { styled } from "@mui/material/styles";
import MuiCopyIcon from "@mui/icons-material/ContentCopyRounded";

const Icon = styled(MuiCopyIcon)(({ theme }) => ({
  transform: "rotate(180deg)",
  color: "#8A8A8F",
}));

export default function HomeIcon(props) {
  return <Icon {...props} />;
}
