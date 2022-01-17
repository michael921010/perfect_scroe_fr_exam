import { Box, Typography, CircularProgress } from "@mui/material";

export default function LoadingScreen({ description, fullScreen }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height={fullScreen ? "100vh" : "100%"}
    >
      <CircularProgress variant="indeterminate" size={30} thickness={4} />
      {description?.length > 0 && (
        <Box mt={2}>
          <Typography
            variant="p"
            style={{ letterSpacing: 0.25, textTransform: "capitalize" }}
          >
            {description}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

LoadingScreen.defaultProps = {
  fullScreen: false,
  description: "",
};
