import MuiBadge from "@mui/material/Badge";
import { withStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import MuiCopyIcon from "@mui/icons-material/ContentCopyRounded";

const Badge = withStyles({
  dot: {
    minWidth: "fit-content",
    width: 7,
    height: 7,
    borderRadius: "50%",
    backgroundColor: "#00D1FF",
    boxSizing: "border-box",
    border: "1px solid #1B1B1B",
  },
})(MuiBadge);

const Icon = styled(MuiCopyIcon)({
  transform: "rotate(180deg)",
  fill: "#8A8A8F",
});

export default function TagIcon(props) {
  return (
    <Badge color="primary" variant="dot">
      <Icon {...props} />
    </Badge>
  );
}
