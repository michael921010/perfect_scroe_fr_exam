import LazyLoad from "react-lazyload";
import { styled } from "@mui/styles";
import Skeleton from "./Skeleton";

const CSSLazyLoad = styled(LazyLoad)({
  width: "100%",
  height: "100%",
});

export default function MyLazyLoad({ children, ...props }) {
  return (
    <CSSLazyLoad height="100%" placeholder={<Skeleton />} {...props}>
      {children}
    </CSSLazyLoad>
  );
}
