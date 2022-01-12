import Button from "./Button";

export default function ContainedButton({ ...props }) {
  return <Button rounded variant="contained" {...props} />;
}
