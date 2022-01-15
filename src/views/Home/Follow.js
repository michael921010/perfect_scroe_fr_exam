import { useMemo, useCallback, useRef, useReducer, useEffect } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar as MuiAvatar,
} from "@mui/material";
import { makeStyles, styled, withStyles } from "@mui/styles";
import { Button } from "components/common";
import { pick } from "ramda";
import c from "classnames";

const Avatar = styled(MuiAvatar)({
  border: `1px solid #F8F8F8`,
  "> img": {
    objectFit: "cover",
  },
});

const MyButton = withStyles((theme) => ({
  root: {
    padding: "8px 10px",
    height: 29,
    borderRadius: 20,
  },
  label: {
    fontFamily: "Open Sans",
    fontWeight: "600",
    fontSize: 12,
    lineHeight: "100%",
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  text: {
    flex: "none",
    order: 1,
    flexGrow: 0,
    margin: 0,
    color: theme.palette.common.white,
    display: "inline-block",
    maxWidth: 115,
  },
  ellipsis: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
}));

const initialState = {
  total: Infinity,
  totalPages: Infinity,
  followers: [],
};
function reducer(state, action) {
  switch (action.type) {
    case "resetFollowers": {
      const info = action.info;
      const followers = [info.followers];
      return {
        ...state,
        followers,
        ...pick(["total", "totalPages"])(info),
      };
    }
    case "addFollowers": {
      const info = action.info;
      state.followers[info.page] = info.followers;
      return {
        ...state,
        followers: [...state.followers],
        ...pick(["total", "totalPages"])(info),
      };
    }
    default:
      return state;
  }
}

const pageSize = 15;
export default function Follow({ fetch }) {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);

  const page = useRef(0);
  const loading = useRef(false);

  const flatFollowers = useMemo(() => state.followers.flat(), [state]);

  const getFollowers = useCallback(
    async (refresh = false) => {
      try {
        if (loading.current) return;

        loading.current = true;
        // response: { page, pageSize, total, totalPages, data }
        const response = await fetch({ page: page.current + 1, pageSize });

        const _followers = response?.data ?? [];
        if (_followers?.length > 0) {
          const type = refresh ? "resetFollowers" : "addFollowers";
          const info = {
            page: page.current,
            followers: _followers,
            ...pick(["total", "totalPages"])(response),
          };
          dispatch({ type, info });
        } else {
          //   setError(true);
          console.log("沒有更多 followers 了。");
        }
      } catch (err) {
      } finally {
        loading.current = false;
      }
    },
    [fetch]
  );

  const handleRefresh = useCallback(async () => {
    // 已經在加載中，所以不在進行加載
    if (loading.current) return;

    page.current = 0;
    getFollowers(true);
  }, [getFollowers]);

  const handleFetch = useCallback(async () => {
    console.log("handleFetch");
    // 已經在加載中，所以不再進行加載
    if (loading.current) return;
    // page 已經到了總頁數值 totalPages，不再進行加載
    if (page.current + 1 >= state.totalPages) return;

    const target = state.followers[page.current];
    // 該頁已經有資料了，要加載下一頁
    if (target?.length > 0) {
      page.current++;
    }
    getFollowers();
  }, [state, getFollowers]);

  useEffect(() => {
    getFollowers();
  }, [getFollowers]);

  return (
    <List
      dense
      sx={{ width: "100%" }}
      style={{
        // maxHeight: "100%",
        height: "100%",
        // maxHeight: `calc(100vh - ${50}px)`,
        overflowY: "scroll",
        overflowX: "hidden",
      }}
    >
      {flatFollowers.map((followers) => {
        return (
          <ListItem
            key={followers?.id}
            secondaryAction={
              <MyButton
                capitalize
                style={{ width: followers?.isFollowing ? 76 : 60 }}
                text={followers?.isFollowing ? "Following" : "Follow"}
                variant={followers?.isFollowing ? "contained" : "outlined"}
              />
            }
            disablePadding
          >
            <ListItemButton
              style={{
                paddingRight: (followers?.isFollowing ? 76 : 60) + 16,
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sizes="40"
                  variant="rounded"
                  alt={followers?.name}
                  title={followers?.name}
                  //   src={followers?.avater}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfnvEBdcVuAH0XrcMmAMVHdYE2My7KLiIuLigwP_rWx6rHsKon&usqp=CAU"
                />
              </ListItemAvatar>
              <ListItemText
                id={followers?.id}
                primary={
                  <Typography
                    variant="body1"
                    title={followers?.name}
                    className={c(classes.text, classes.ellipsis)}
                  >
                    {followers?.name}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="body2"
                    title={followers?.username ?? "username"}
                    className={c(classes.text, classes.ellipsis)}
                    style={{ opacity: 0.5 }}
                  >
                    @{followers?.username ?? "username"}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
