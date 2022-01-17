import { useEffect, useCallback, useState, useRef } from "react";
import { Box, Typography, ImageList } from "@mui/material";
import { styled, makeStyles } from "@mui/styles";
import { fetchTags } from "api/tag";
import { forceCheck } from "react-lazyload";
import TagCard from "./TagCard";

const List = styled(ImageList)({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(0, 32),
    position: "relative",

    [theme.breakpoints.down("sm")]: {
      padding: 0,
      maxHeight: "100%",
    },
  },
  title: {
    marginTop: theme.spacing(10),
    paddingLeft: theme.spacing(0.5),

    [theme.breakpoints.down("sm")]: {
      marginTop: 0,
      padding: "20px 0 0 18px",

      zIndex: 1,
      position: "absolute",
      left: 0,
      top: 0,
      backgroundColor: theme.palette.background.default,
      width: "100%",
    },
  },
  list: {
    marginTop: theme.spacing(3),
    width: "100%",

    [theme.breakpoints.down("sm")]: {
      margin: 0,
      padding: "0 13px",
      paddingTop: 65,
      overflow: "hidden scroll",
      maxHeight: "100%",
      flexGrow: 1,
      gap: "0 !important",
    },
  },
}));

export default function Tags() {
  const classes = useStyles();
  const [tags, setTags] = useState([]);

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

  const handleScroll = useCallback((e) => {
    forceCheck();
  }, []);

  useEffect(() => {
    getTags();
  }, [getTags]);

  return (
    <Box className={classes.root}>
      <Box className={classes.title}>
        <Typography variant="h4" style={{ margin: "0 7px" }}>
          Tags
        </Typography>
      </Box>

      <List className={classes.list} onScroll={handleScroll}>
        {tags.map((tag) => (
          <TagCard key={tag?.id} tag={tag} />
        ))}
      </List>
    </Box>
  );
}
