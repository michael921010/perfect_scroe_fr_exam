import { Slider } from "@mui/material";
import { makeStyles, withStyles } from "@mui/styles";
import c from "classnames";

const thumbSize = 20;
const CutomizedSlider = withStyles((theme) => ({
  root: {
    boxSizing: "border-box",
  },
  marked: {
    height: 8,
  },
  rail: {
    backgroundColor: theme.palette.common.white,
    opacity: 0.3,
    boxSizing: "border-box",
  },
  thumb: {
    width: thumbSize,
    height: thumbSize,
    left: `calc(50% - ${thumbSize / 2}px)`,
    top: `calc(50% - ${thumbSize / 2}px)`,
    backgroundColor: "#1B1B1B",
    border: "6px solid #FFD05D",
    transform: `matrix(-1, 0, 0, 1, ${-thumbSize / 2}, 0)`,
  },
  track: {
    background: `linear-gradient(to right, #FF5C01, #FFD25F)`,
    border: "none",
  },
  mark: {
    opacity: 0,
  },
  markLabel: {
    fontWeight: "500",
    fontSize: 16,
    lineHeight: "150%",
    letterSpacing: 0.15,
  },
  markLabelActive: {
    opacity: 1,
  },
}))(Slider);

const useStyles = makeStyles((theme) => ({
  hideThumbShadow: {
    boxShadow: "none !important",
    "&::before": {
      boxShadow: "none !important",
    },
  },
}));

export default function SliderBar({ thumbShadow, onChange, ...props }) {
  const classes = useStyles();
  return (
    <CutomizedSlider
      valueLabelDisplay="off" // 關閉 thumb 顯示的 value
      onChange={onChange}
      classes={{
        thumb: c({
          [classes.hideThumbShadow]: !thumbShadow,
        }),
      }}
      {...props}
    />
  );
}

SliderBar.defaultProps = {
  thumbShadow: true,
};
