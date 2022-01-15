import { useEffect, useCallback, useState, useRef } from "react";
import { Box, Typography, ImageList } from "@mui/material";
import { styled } from "@mui/styles";
import { fetchTags } from "api/tag";
import TagCard from "./TagCard";

const List = styled(ImageList)({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
});

export default function Tags() {
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

  useEffect(() => {
    getTags();
  }, [getTags]);

  return (
    <Box width="100%" display="flex" flexDirection="column" px={32}>
      <Box color="common.white" mt={10} pl={0.5}>
        <Typography variant="h4" style={{ margin: "0 7px" }}>
          Tags
        </Typography>
      </Box>

      <List mt={3} sx={{ width: "100%", color: "common.white" }}>
        {tags.map((tag) => (
          <TagCard key={tag?.id} tag={tag} />
        ))}
      </List>
    </Box>
  );
}
