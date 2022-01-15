import LazyLoad from "react-lazyload";
import { styled } from "@mui/styles";
import Skeleton from "../Skeleton";

const CSSLazyLoad = styled(LazyLoad, {
  shouldForwardProp: (prop) => !["height"].includes(prop),
})(({ height }) => ({
  width: "100%",
  height,
}));

// const offset = [-500, -500]; // This is open for Skeleton correction
const offset = 0;
export default function MyLazyLoad({ children, skeletonProps, ...props }) {
  return (
    <CSSLazyLoad
      resize
      offset={offset}
      placeholder={<Skeleton {...skeletonProps} />}
      {...props}
    >
      {children}
    </CSSLazyLoad>
  );
}

MyLazyLoad.defaultProps = {
  height: "100%",
  skeletonProps: { variant: "rect" },
};
