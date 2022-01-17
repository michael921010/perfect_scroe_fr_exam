import MuiBadge from "@mui/material/Badge";
import { withStyles } from "@mui/styles";
import HomeIcon from "./HomeIcon";

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

export default function TagIcon(props) {
  return (
    <Badge color="primary" variant="dot">
      <HomeIcon {...props} />
    </Badge>
  );
}
