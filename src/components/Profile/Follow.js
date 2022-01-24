import { useMemo, useCallback, useRef, useReducer, useEffect } from "react";
import MuiList from "@mui/material/List";
import { styled } from "@mui/material/styles";
import { pick } from "ramda";
import { forceCheck } from "react-lazyload";
import { SimpleBar } from "components/common";
import Follower from "./Follower";

const List = styled(MuiList)({
  width: "100%",
  height: "100%",
  padding: 0,
  paddingTop: 25,
});

const ScrollBar = styled(SimpleBar)({
  width: "100%",
  maxHeight: "100%",
});

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

        // console.log(response);
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
          console.log("沒有更多 followers 了。");
        }
      } catch (err) {
      } finally {
        loading.current = false;
      }
    },
    [fetch]
  );

  const handleFetch = useCallback(async () => {
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
    page.current = 0;
    getFollowers();
  }, [getFollowers]);

  useEffect(() => {
    forceCheck();
  }, [flatFollowers]);

  return (
    <List dense>
      <ScrollBar onScroll={handleScroll}>
        {flatFollowers.map((follower) => (
          <Follower key={follower?.id} follower={follower} />
        ))}
      </ScrollBar>
    </List>
  );
}
