import { useEffect, useCallback, useState, useRef } from "react";
import { Box, Typography, ImageList, useMediaQuery } from "@mui/material";
import { styled, makeStyles } from "@mui/styles";
import { fetchTags } from "api/tag";
import { SimpleBar } from "components/common";
import TagCard from "./TagCard";

const ScrollBar = styled(SimpleBar)({
  width: "100%",
  maxHeight: "100%",
});

const List = styled(ImageList)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 6,

  [theme.breakpoints.down("md")]: {
    margin: 0,
    padding: "0 13px",
    paddingTop: 56 + 12,
    gap: "0 !important",
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "relative",

    [theme.breakpoints.down("md")]: {
      maxHeight: "100%",
    },
  },
  content: {
    display: "flex",
    flexDirection: "column",
    padding: "0 256px 0 250px",

    [theme.breakpoints.down("md")]: {
      padding: 0,
    },
  },
  title: {
    marginTop: 81,
    paddingLeft: 3,

    [theme.breakpoints.down("md")]: {
      marginTop: 0,
      padding: "20px 0 0 20px",

      zIndex: 1,
      position: "fixed",
      left: 0,
      top: 70,
      backgroundColor: theme.palette.background.default,
      width: "100%",
    },
  },
}));

export default function Tags() {
  const classes = useStyles();
  const [tags, setTags] = useState([]);
  const matchMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const loading = useRef(false);

  const getTags = useCallback(async () => {
    try {
      if (loading.current) return;

      loading.current = true;
      // response: [tag: {id, count, name }]
      const response = await fetchTags();

      if (Array.isArray(response) && response?.length > 0) {
        setTags(response);
      } else {
        console.log("tags 資料有誤");
      }
    } catch (err) {
    } finally {
      loading.current = false;
    }
  }, []);

  useEffect(() => {
    getTags();
  }, [getTags]);

  return (
    <Box className={classes.root}>
      <ScrollBar>
        <Box className={classes.content}>
          <Box className={classes.title}>
            <Typography variant={matchMobile ? "h5" : "h4"}>Tags</Typography>
          </Box>

          <List>
            {tags.map((tag) => (
              <TagCard key={tag?.id} tag={tag} />
            ))}
          </List>
        </Box>
      </ScrollBar>
    </Box>
  );
}
