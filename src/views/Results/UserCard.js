import {
  Box,
  Typography,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import { styled } from "@mui/styles";
import { LazyLoadImage, LazyLoad } from "components/common";

const Item = styled(ImageListItem)(({ theme }) => ({
  margin: "15px 17px",
  [theme.breakpoints.down("sm")]: {
    margin: "16px 0",
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

const ImageFrame = styled(Box)(({ theme }) => ({
  width: 219,
  height: 146,
  position: "relative",
  overflow: "hidden",
  minHeight: 146,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: "auto",
  },
}));

export default function Results({ user }) {
  return (
    <Item>
      <ImageFrame>
        <LazyLoadImage
          // src={user?.avater}
          src="https://www.kikikokomedia.com/wp-content/uploads/three_major_night_scenes.jpg"
          alt={user?.name}
          title={user?.name}
          loading="lazy"
        />
      </ImageFrame>
      <ImageListItemBar
        title={
          <Title variant="p" title={user?.name}>
            <LazyLoad
              skeletonProps={{ variant: "text", width: "70%", height: 16 }}
            >
              {user?.name}
            </LazyLoad>
          </Title>
        }
        subtitle={
          <Subtitle variant="p" title={user?.username}>
            <LazyLoad
              skeletonProps={{ variant: "text", width: "50%", height: 16 }}
            >
              {user?.username}
            </LazyLoad>
          </Subtitle>
        }
        position="below"
      />
    </Item>
  );
}
