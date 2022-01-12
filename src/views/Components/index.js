import { Box, Typography } from "@mui/material";
import { makeStyles, withStyles } from "@mui/styles";
import { Button, OutlinedButton, ContainedButton } from "components/common";

const MyOutlinedButton = withStyles((theme) => ({
  root: {
    padding: "8px 10px",
    width: 60,
    height: 29,
    borderRadius: 20,
  },
  label: {
    fontFamily: "Open Sans",
    fontWeight: "600",
    fontSize: 12,
  },
}))(OutlinedButton);

const MyContainedButton = withStyles((theme) => ({
  root: {
    padding: "8px 10px",
    width: 60,
    height: 29,
    borderRadius: 20,
  },
  label: {
    fontFamily: "Open Sans",
    fontWeight: "600",
    fontSize: 12,
  },
}))(ContainedButton);

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "68px 88px",
    color: theme.palette.common.white,
  },
  caption: {
    width: 168,
    height: 45,
    textAlign: "center",
    letterSpacing: 0.25,
  },
  title: {
    width: 78,
    height: 36,
    textTransform: "capitalize",
    color: theme.palette.common.white,
  },
  normal: {
    width: 62,
    height: 14,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: theme.palette.common.white,
  },
  body2: {
    width: 57,
    height: 21,
    color: theme.palette.common.white,
  },
}));

export default function Components() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box>
        <Typography variant="h4" className={classes.caption}>
          Component
        </Typography>
      </Box>

      <Box mt={5}>
        <Typography variant="h5" className={classes.title}>
          Button
        </Typography>

        <Box mt={3}>
          <Box>
            <Typography variant="span" className={classes.normal}>
              NORMAL
            </Typography>
          </Box>
          <Box display="flex" flexDirection="row" mt={1}>
            <Button text="Button" uppercase style={{ padding: "13px 16px" }} />
          </Box>
        </Box>

        <Box mt={6}>
          <Box mt={2}>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Typography variant="body2" className={classes.body2}>
                Outlined
              </Typography>

              <Box display="flex" flexDirection="column" ml={5}>
                <Typography
                  style={{
                    fontWeight: "bold",
                    fontSize: 14,
                    textTransform: "uppercase",
                  }}
                >
                  NORMAL
                </Typography>
                <MyOutlinedButton text="Button" capitalize />
              </Box>
            </Box>
          </Box>

          <Box mt={2}>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Typography variant="body2" className={classes.body2}>
                Contained
              </Typography>

              <Box display="flex" flexDirection="column" ml={5}>
                <Typography
                  style={{
                    fontWeight: "bold",
                    fontSize: 14,
                    textTransform: "uppercase",
                  }}
                >
                  NORMAL
                </Typography>
                <MyContainedButton text="Button" capitalize />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
