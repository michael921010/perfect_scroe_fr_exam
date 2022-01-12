import Button from "./Button";

export default function OutlinedButton({ ...props }) {
  return <Button rounded variant="outlined" {...props} />;
}
