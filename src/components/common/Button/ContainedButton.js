import { forwardRef } from "react";
import Button from "./Button";

const ContainedButton = forwardRef(function ({ ...props }, ref) {
  return <Button ref={ref} variant="contained" {...props} />;
});

export default ContainedButton;
