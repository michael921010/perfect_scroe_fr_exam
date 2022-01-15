import { get } from "./";
import { merge } from "ramda";

const pageSize = 12; // default pageSize

// payload: { page, pageSize, keyword(?) }
export const fetchUsers = (payload) =>
  get("api/users/all", merge({ pageSize }, payload));

// payload: { page, pageSize }
export const fetchFriends = (payload) =>
  get("api/users/friends", merge({ pageSize }, payload));
