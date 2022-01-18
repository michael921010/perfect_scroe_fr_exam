import { useState, useCallback, Fragment, useMemo } from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import LazyLoad from "./LazyLoad";
import Skeleton from "../Skeleton";
import c from "classnames";

const ErrorMsg = styled(Typography)(({ theme }) => ({
  width: "fit-content",
  visibility: "visible",
}));

const Image = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const useStyles = makeStyles((theme) => ({
  transparent: {
    opacity: 0,
  },
  skeleton: {
    zIndex: 1,
    position: "absolute",
  },
}));

export default function LazyLoadImage({ errorMessage, onError, ...props }) {
  const classes = useStyles();
  const [error, setError] = useState(false);

  const hasMessage = useMemo(() => errorMessage?.length > 0, [errorMessage]);

  const handleError = useCallback(
    (...args) => {
      setError(true);
      onError?.(...args);
    },
    [onError]
  );

  return (
    <Fragment>
      {error && (
        <Skeleton
          animation={false}
          className={classes.skeleton}
          sx={[
            (theme) => ({
              ...(hasMessage && {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }),
            }),
          ]}
        >
          {hasMessage && <ErrorMsg>{errorMessage}</ErrorMsg>}
        </Skeleton>
      )}
      <LazyLoad className={c({ [classes.transparent]: error })}>
        <Image {...props} onError={handleError} />
      </LazyLoad>
    </Fragment>
  );
}

LazyLoadImage.defaultProps = {
  errorMessage: "No Image",
};
