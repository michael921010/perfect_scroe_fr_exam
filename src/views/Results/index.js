import { useMemo, useState, useCallback, useRef, useReducer } from "react";
import { Box, Typography, ImageList, useMediaQuery } from "@mui/material";
import { styled, makeStyles } from "@mui/styles";
import { useSearchParams } from "react-router-dom";
import { Link, PullToRefresh, Button } from "components/common";
import { ArrowLeftIcon } from "icons";
import { parse } from "query-string";
import { fetchUsers } from "api/user";
import { pick } from "ramda";
import { forceCheck } from "react-lazyload";
import UserCard from "./UserCard";

const sizeLevel = { desktop: 80, mobile: 20, offset: 20 };

const ArrowIcon = styled(ArrowLeftIcon)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const List = styled(ImageList)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",

  [theme.breakpoints.down("md")]: {
    marginTop: 4,
    gap: "0 !important",
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    padding: `0 ${sizeLevel.desktop}px`,
    overflow: "hidden",

    [theme.breakpoints.down("md")]: {
      padding: 0,
      overflow: "hidden",
      maxHeight: "100%",
    },
  },
  title: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: theme.spacing(13),

    "& .MuiTypography-h4": {
      marginLeft: 31,
    },
  },
  title2: {
    marginTop: 20,
    "& .MuiTypography-h4": {
      marginLeft: sizeLevel.offset,
    },

    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  button: {
    display: "flex",
    marginTop: theme.spacing(4),
    position: "fixed",
    bottom: -12,
    left:
      sizeLevel.desktop +
      16 +
      1 + // Button 的 border-width
      theme.sizes.desktop.menu.width,

    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  link: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  content: {
    [theme.breakpoints.down("md")]: {
      overflow: "hidden scroll",
      height: "100%",
      flexGrow: 1,
      padding: `0 16px`,
    },
  },
}));

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
  const classes = useStyles();
  const matchDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const page = useRef(0);
  const loading = useRef(false);
  const scroll = useRef(null);

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

        // console.log(response);
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
          setError(true);
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

  const handleScroll = useCallback((e) => {
    forceCheck();
  }, []);

  return (
    <Box className={classes.root}>
      <Link to="/" fitWidth className={classes.link}>
        <Box className={classes.title}>
          <ArrowIcon />
          <Typography variant="h4">Results</Typography>
        </Box>
      </Link>

      <Box className={classes.title2}>
        <Typography variant="h4">Results</Typography>
      </Box>

      <Box
        ref={scroll}
        className={classes.content}
        width="100%"
        onScroll={handleScroll}
      >
        {error && (
          <Typography sx={[{ pl: 1, mt: 2 }]}>
            There are no search results that you are looking for.
          </Typography>
        )}
        <PullToRefresh
          container={matchDesktop ? null : scroll.current}
          fetchMoreThreshold={200}
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

      <Box className={classes.button}>
        <Button
          text="More"
          uppercase
          style={{ padding: "13px 16px", width: 343, height: 40 }}
          onClick={handleFetch}
        />
      </Box>
    </Box>
  );
}
