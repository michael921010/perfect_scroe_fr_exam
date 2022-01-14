import { get } from "./";
import { merge } from "ramda";

// payload: { page, pageSize, keyword(?) }
export const fetchUsers = (payload) =>
  get("api/users/all", merge({ pageSize: 12 }, payload));
