import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

const Logo = styled(Typography)({
  height: 15,
  textTransform: "uppercase",
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: 13,
  lineHeight: "15px",
  letterSpacing: "-0.05em",
  background: "-webkit-linear-gradient(270deg, #FFD25F 0.13%, #FF5C01 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
});

export default function MyLogo({ text }) {
  return <Logo>{text}</Logo>;
}

MyLogo.defaultProps = {
  text: "Logo",
};
