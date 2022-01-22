import {
  Box,
  Typography,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Skeleton, LazyLoad } from "components/common";

const Item = styled(ImageListItem)(({ theme }) => ({
  margin: "18px 12px",
  width: 150,
  height: 150,

  [theme.breakpoints.down("md")]: {
    padding: 12,
    margin: 0,
    width: `${100 / 3}%`,
  },
  [theme.breakpoints.down("sm")]: {
    width: `${100 / 2}%`,
  },
  [theme.breakpoints.down("xs")]: {
    width: "100%",
  },
}));

const Title = styled(Typography)({
  fontSize: 15,
  lineHeight: "150%",
  letterSpacing: 0.14,
});

const Subtitle = styled(Typography)({
  fontSize: 11.175,
  lineHeight: "150%",
  letterSpacing: 0.37,
  color: "#B2B2B2",
});

const Container = styled(Box)({
  width: "100%",
  height: 150,
  overflow: "hidden",
});

const Frame = styled(Box)(({ theme }) => ({
  visibility: "visible",
  position: "absolute",
  height: 50,
  maxWidth: `calc(100% - ${10 * 2}px)`,
  left: 10,
  bottom: 14,
  border: `4px solid ${theme.palette.common.white}`,
  borderRadius: 8,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: "7px 14px",
}));

const TagName = styled(Typography)({
  display: "inline-block",
  width: "100%",
  fontWeight: "bold",

  flex: "none",
  order: 0,
  flexGrow: 0,
});

const Bar = styled(ImageListItemBar)(({ theme }) => ({
  ".MuiImageListItemBar-titleWrap": {
    padding: "10px 0 0 0",
  },
}));

const useStyles = makeStyles((theme) => ({
  ellipsis: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
}));

export default function Tags({ tag }) {
  const classes = useStyles();
  return (
    <Item key={tag?.id}>
      <Container>
        <LazyLoad>
          <Skeleton
            style={{ borderRadius: 10, position: "relative" }}
            animation={false}
          >
            <Frame>
              <TagName
                variant="h5"
                className={classes.ellipsis}
                title={tag?.name}
              >
                {tag?.name}
              </TagName>
            </Frame>
          </Skeleton>
        </LazyLoad>
      </Container>
      <Bar
        title={
          <Title variant="p" title={tag?.name}>
            <LazyLoad
              skeletonProps={{ variant: "text", width: "70%", height: 16 }}
              className={classes.ellipsis}
            >
              {tag?.name}
            </LazyLoad>
          </Title>
        }
        subtitle={
          <Subtitle variant="p">
            <LazyLoad
              skeletonProps={{ variant: "text", width: "60%", height: 14 }}
              className={classes.ellipsis}
            >
              {tag?.count ?? 0} Results
            </LazyLoad>
          </Subtitle>
        }
        position="below"
      />
    </Item>
  );
}
