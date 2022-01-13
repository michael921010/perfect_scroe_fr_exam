import { Fragment } from "react";
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
    width: 70,
    height: 21,
    color: theme.palette.common.white,
  },
}));

export default function Buttons() {
  const classes = useStyles();

  return (
    <Fragment>
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
          <Button
            text="Button"
            uppercase
            style={{ padding: "13px 16px", width: 335, height: 40 }}
          />
        </Box>
      </Box>

      <Box mt={6}>
        <Box mt={2}>
          <Box display="flex" flexDirection="row" alignItems="center">
            <Typography variant="body2" className={classes.body2}>
              Outlined
            </Typography>

            <Box display="flex" flexDirection="column" ml={5}>
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
              <MyContainedButton text="Button" capitalize />
            </Box>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
}
