import { forwardRef } from "react";
import Button from "./Button";

const OutlinedButton = forwardRef(function ({ ...props }, ref) {
  return <Button ref={ref} variant="outlined" {...props} />;
});

export default OutlinedButton;
