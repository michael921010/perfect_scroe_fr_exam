import {
  useMemo,
  useState,
  useCallback,
  useRef,
  useReducer,
  useEffect,
} from "react";
import { Box, Typography, ImageList } from "@mui/material";
import MuiList from "@mui/material/List";
import { styled, makeStyles } from "@mui/styles";
import { useSearchParams } from "react-router-dom";
import { Link, Button, SimpleBar } from "components/common";
import { ArrowLeftIcon } from "icons";
import { parse } from "query-string";
import { fetchUsers } from "api/user";
import { pick } from "ramda";
import { forceCheck } from "react-lazyload";
import UserCard from "./UserCard";

const sizeLevel = { desktop: 113, mobile: 20, offset: 20 };

const ArrowIcon = styled(ArrowLeftIcon)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const ScrollBar = styled(SimpleBar)({
  width: "100%",
  maxHeight: "100%",
});

const List = styled(MuiList)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexFlow: "row wrap",
  paddingTop: 9.5,
  paddingBottom: 9.5,

  [theme.breakpoints.down("md")]: {
    paddingTop: 4,
    // gap: "0 !important",
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    overflow: "hidden",

    [theme.breakpoints.down("xl")]: {
      display: "flex",
      position: "relative",
      maxHeight: "100%",
    },
  },
  content: {
    display: "flex",
    flexDirection: "column",
    padding: `0 ${sizeLevel.desktop}px`,

    [theme.breakpoints.down("md")]: {
      padding: 0,
    },
  },
  title: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 92,
    marginLeft: -37.5,

    "& .MuiTypography-h4": {
      marginLeft: 31,
    },
  },
  title2: {
    zIndex: 1,
    position: "fixed",
    width: "100%",
    paddingTop: 20,
    backgroundColor: theme.palette.background.default,
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
  listWrap: {
    [theme.breakpoints.down("md")]: {
      flexGrow: 1,
      padding: `0 16px`,
      marginTop: 65,
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
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(false);
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

  const handleScroll = useCallback(
    (e) => {
      const { scrollTop, scrollHeight, clientHeight } = e.target;
      const atBottom = scrollHeight - scrollTop - clientHeight < 200;

      if (atBottom) {
        handleFetch();
      }
      forceCheck();
    },
    [handleFetch]
  );

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <Box className={classes.root}>
      <Box className={classes.title2}>
        <Typography variant="h4">Results</Typography>
      </Box>
      <ScrollBar onScroll={handleScroll}>
        <Box className={classes.content}>
          <Link to="/" fitWidth className={classes.link}>
            <Box className={classes.title}>
              <ArrowIcon />
              <Typography variant="h4">Results</Typography>
            </Box>
          </Link>

          <Box className={classes.listWrap}>
            {error && (
              <Typography sx={[{ pl: 1, mt: 2 }]}>
                There are no search results that you are looking for.
              </Typography>
            )}
            <List>
              {flatUsers.map((user) => (
                <UserCard user={user} key={user?.id} />
              ))}
            </List>
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
      </ScrollBar>
    </Box>
  );
}
