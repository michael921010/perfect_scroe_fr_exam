import { useMemo, useState, useEffect, useCallback } from "react";
import { Box, Typography, ImageList } from "@mui/material";
import { styled } from "@mui/styles";
import { ArrowBackIosRounded } from "@mui/icons-material";
import { useSearchParams } from "react-router-dom";
import { Link } from "components/common";
import { parse } from "query-string";
import { fetchUsers } from "api/user";
import UserCard from "./UserCard";

const ArrowIcon = styled(ArrowBackIosRounded)({
  width: 25,
  heigth: 25,
});

const List = styled(ImageList)({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  // justifyContent: "center",
});

export default function Results() {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);

  const params = useMemo(
    () => parse(searchParams?.toString?.() ?? ""),
    [searchParams]
  );

  const getUsers = useCallback(async () => {
    try {
      // response: { page, pageSize, total, totalPages, data }
      const response = await fetchUsers({
        page,
        pageSize: params?.pageSize,
        keyword: params?.q,
      });

      console.log(response);

      const _users = response?.data ?? [];
      if (_users?.length > 0) {
        setUsers(_users);
        // setUsers((u) => [...u, ..._users]);
      } else {
        console.log("沒有更多 Rser 了。");
      }
    } catch (err) {}
  }, [page, params]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // console.log(users);

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

      <Box sx={{ color: "common.white" }} mt={5} width="100%">
        <Box width="100%">
          <List>
            {users.map((user) => (
              <UserCard user={user} key={user?.id} />
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
}
