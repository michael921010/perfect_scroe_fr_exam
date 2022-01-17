import { forwardRef } from "react";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const CssTextField = styled(TextField)(({ theme }) => ({
  ".MuiInputBase-root": {
    borderRadius: 6,
  },
  "& label.Mui-focused": {
    color: "rgba(255, 155, 51, 1)",
  },
  "& .MuiOutlinedInput-root": {
    height: 60,

    "& fieldset": {
      border: "3px solid rgba(255, 255, 255, 0.5)",
    },
    "&:hover fieldset": {
      border: "3px solid rgba(255, 155, 51, 0.8)",
    },
    "&.Mui-focused fieldset": {
      border: "3px solid rgba(255, 155, 51, 1)",
    },
  },
  "& input": {
    padding: "20px 18px",
    "&::placeholder": {
      color: theme.palette.common.white,
      opacity: 0.3,
    },
    "&.MuiInputBase-input": {
      fontWeight: "normal",
      fontSize: 14,
      lineHeight: "150%",
      display: "flex",
      alignItems: "center",
      letterSpacing: 0.25,
    },
  },
}));

const MyTextField = forwardRef(function ({ ...props }, ref) {
  return <CssTextField ref={ref} {...props} />;
});

MyTextField.defaultProps = {
  rows: 1,
};

export default MyTextField;
