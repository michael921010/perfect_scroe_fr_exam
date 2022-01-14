import { useState } from "react";
import {
  Box,
  Typography,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import { styled } from "@mui/styles";
import { LazyLoad } from "components/common";

const Item = styled(ImageListItem)({
  margin: "15px 17px",
});

const Image = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

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

export default function Results({ user }) {
  const [error, setError] = useState(false);

  return (
    <Item>
      <Box width={219} height={146}>
        <LazyLoad>
          <Image
            // src={user?.avater}
            src="data:image/jpeg;base64,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"
            alt={user?.name}
            title={user?.name}
            loading="lazy"
          />
        </LazyLoad>
      </Box>
      <ImageListItemBar
        title={
          <Title variant="p" title={user?.name}>
            {user?.name}
          </Title>
        }
        subtitle={
          <Subtitle variant="p" title={user?.username}>
            {user?.username}
          </Subtitle>
        }
        position="below"
      />
    </Item>
  );
}
