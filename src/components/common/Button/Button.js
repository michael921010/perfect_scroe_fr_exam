import { Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import c from "classnames";

const useStyles = makeStyles((theme) => ({
  root: {
    boxSizing: "border-box",
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.common.white}`,
    color: theme.palette.background.default,
    borderRadius: 4,
    fontSize: 14,
    lineHeight: "100%",
    textAlign: "center",

    "&:hover": {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.background.default,
      border: `1px solid ${theme.palette.common.white}`,
    },
  },
  label: {
    flex: "none",
    order: 0,
    flexGrow: 0,
    margin: "0px 10px",
    textTransform: "initial",
  },
  capitalize: {
    textTransform: "capitalize",
  },
  uppercase: {
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  outlined: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.common.white,

    "&:hover": {
      color: theme.palette.background.default,
      backgroundColor: theme.palette.common.white,
    },
  },
}));

export default function MyButton({
  className,
  classes: _classes,
  text,
  capitalize,
  uppercase,
  rounded,
  contained,
  ...props
}) {
  const classes = useStyles();

  return (
    <Button
      classes={{
        root: c(classes.root, className, _classes.root),
        outlined: c(classes.outlined, _classes.outlined),
      }}
      {...props}
    >
      <Typography
        variant="span"
        className={c(
          classes.label,
          {
            [classes.capitalize]: capitalize,
            [classes.uppercase]: uppercase,
          },
          _classes.label
        )}
      >
        {text}
      </Typography>
      {/* {text} */}
    </Button>
  );
}

MyButton.defaultProps = {
  className: "",
  classes: {},
  text: "",
  capitalize: false,
  uppercase: false,
};
