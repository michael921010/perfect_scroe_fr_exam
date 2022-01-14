import { useState, useCallback, Fragment, useMemo } from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/styles";
import LazyLoad from "./LazyLoad";
import Skeleton from "../Skeleton";

const ErrorMsg = styled(Typography)(({ theme }) => ({
  width: "fit-content",
  color: theme.palette.common.white,
  visibility: "visible",
}));

const Image = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export default function LazyLoadImage({ errorMessage, onError, ...props }) {
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
      {error ? (
        <Skeleton
          animation={false}
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
      ) : (
        <LazyLoad>
          <Image {...props} onError={handleError} />
        </LazyLoad>
      )}
    </Fragment>
  );
}

LazyLoadImage.defaultProps = {
  errorMessage: "No Image",
};
