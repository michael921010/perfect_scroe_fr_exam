import { useMemo, useEffect, useCallback, useRef, useReducer } from "react";
import { Box, Typography, ImageList } from "@mui/material";
import { styled } from "@mui/styles";
import { ArrowBackIosRounded } from "@mui/icons-material";
import { useSearchParams } from "react-router-dom";
import { Link } from "components/common";
import { parse } from "query-string";
import { fetchUsers } from "api/user";
import PullToRefresh from "react-simple-pull-to-refresh";
import { pick } from "ramda";
import UserCard from "./UserCard";

const ArrowIcon = styled(ArrowBackIosRounded)({
  width: 25,
  heigth: 25,
});

const List = styled(ImageList)({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  // justifyContent: "center",
});

const initialState = {
  total: Infinity,
  totalPages: Infinity,
  users: [],
};
function reducer(state, action) {
  switch (action.type) {
    case "resetUsers": {
      const info = action.info;
      const users = [info.users];
      return {
        ...state,
        users,
        ...pick(["total", "totalPages"])(info),
      };
    }
    case "addUsers": {
      const info = action.info;
      state.users[info.page] = info.users;
      return {
        ...state,
        users: [...state.users],
        ...pick(["total", "totalPages"])(info),
      };
    }
    default:
      return state;
  }
}

export default function Results() {
  const [searchParams] = useSearchParams();
  const [state, dispatch] = useReducer(reducer, initialState);

  const page = useRef(0);
  const loading = useRef(false);

  const params = useMemo(
    () => parse(searchParams?.toString?.() ?? ""),
    [searchParams]
  );

  const flatUsers = useMemo(() => state.users.flat(), [state]);

  const getUsers = useCallback(
    async (refresh = false) => {
      try {
        if (loading.current) return;

        loading.current = true;
        // response: { page, pageSize, total, totalPages, data }
        const response = await fetchUsers({
          page: page.current + 1,
          pageSize: params?.pageSize,
          keyword: params?.q,
        });

        const _users = response?.data ?? [];
        if (_users?.length > 0) {
          const type = refresh ? "resetUsers" : "addUsers";
          const info = {
            page: page.current,
            users: _users,
            ...pick(["total", "totalPages"])(response),
          };
          dispatch({ type, info });
        } else {
          console.log("沒有更多 user 了。");
        }
      } catch (err) {
      } finally {
        loading.current = false;
      }
    },
    [params]
  );

  const handleRefresh = useCallback(async () => {
    // 已經在加載中，所以不在進行加載
    if (loading.current) return;

    page.current = 0;
    getUsers(true);
  }, [getUsers]);

  const handleFetch = useCallback(async () => {
    // 已經在加載中，所以不再進行加載
    if (loading.current) return;
    // page 已經到了總頁數值 totalPages，不再進行加載
    if (page.current + 1 >= state.totalPages) return;

    const target = state.users[page.current];
    // 該頁已經有資料了，要加載下一頁
    if (target?.length > 0) {
      page.current++;
    }
    getUsers();
  }, [state, getUsers]);

  // useEffect(() => {
  //   getUsers();
  // }, [getUsers]);

  return (
    <Box width="100%" display="flex" flexDirection="column" px={10}>
      <Link to="/" fitWidth>
        <Box
          width="100%"
          display="flex"
          flexDirection="row"
          alignItems="center"
          color="common.white"
          mt={13}
        >
          <ArrowIcon />
          <Typography variant="h4" sx={{ ml: 2 }}>
            Results
          </Typography>
        </Box>
      </Link>

      <Box sx={{ color: "common.white" }} width="100%">
        <PullToRefresh
          canFetchMore
          onRefresh={handleRefresh}
          onFetchMore={handleFetch}
        >
          <List>
            {flatUsers.map((user) => (
              <UserCard user={user} key={user?.id} />
            ))}
          </List>
        </PullToRefresh>
      </Box>
    </Box>
  );
}
