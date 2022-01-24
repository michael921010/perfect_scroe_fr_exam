import { useMemo } from "react";
import {
  Typography,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar as MuiAvatar,
} from "@mui/material";
import { makeStyles, withStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import { Button, LazyLoad } from "components/common";
import c from "classnames";

const Avatar = styled(MuiAvatar)({
  border: `1px solid #F8F8F8`,
  img: {
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

const Item = styled(ListItem)({
  position: "relative",
  padding: "6px 16px",
  ".MuiListItemSecondaryAction-root": {
    right: 16,
  },
});

const ItemText = styled(ListItemText)({
  display: "flex",
  flexDirection: "column",
  margin: 0,
});

const ItemButton = styled(ListItemButton)({
  padding: 0,
});

const useStyles = makeStyles((theme) => ({
  text: {
    flex: "none",
    order: 1,
    flexGrow: 0,
    margin: 0,
    display: "inline-block",
    maxWidth: 210,
  },
  ellipsis: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
}));

const skeletonProps = {
  avatar: { variant: "rect", width: 40, height: 40 },
  name: {
    variant: "text",
    width: 180,
    height: 12,
    style: { margin: "5px 0" },
  },
  username: {
    variant: "text",
    width: 120,
    height: 12,
    style: { margin: "5px 0" },
  },
};

export default function Follower({ follower }) {
  const classes = useStyles();

  const isFollowing = useMemo(() => follower?.isFollowing, [follower]);

  return (
    <Item
      key={follower?.id}
      secondaryAction={
        <LazyLoad style={{ lineHeight: "100%" }} placeholder={null}>
          <MyButton
            capitalize
            style={{ width: isFollowing ? 76 : 60 }}
            text={isFollowing ? "Following" : "Follow"}
            variant={isFollowing ? "contained" : "outlined"}
          />
        </LazyLoad>
      }
      disablePadding
    >
      <ItemButton style={{ paddingRight: (isFollowing ? 77 : 65) + 16 }}>
        <ListItemAvatar>
          <LazyLoad skeletonProps={skeletonProps.avatar}>
            <Avatar
              sizes="40"
              variant="rounded"
              alt={follower?.name}
              title={follower?.name}
              // src={follower?.avater}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfnvEBdcVuAH0XrcMmAMVHdYE2My7KLiIuLigwP_rWx6rHsKon&usqp=CAU"
            />
          </LazyLoad>
        </ListItemAvatar>
        <ItemText
          id={follower?.id}
          disableTypography
          primary={
            <LazyLoad
              style={{ lineHeight: "100%" }}
              skeletonProps={skeletonProps.name}
            >
              <Typography
                variant="body1"
                title={follower?.name}
                className={c(classes.text, classes.ellipsis)}
              >
                {follower?.name}
              </Typography>
            </LazyLoad>
          }
          secondary={
            <LazyLoad
              style={{ lineHeight: "100%" }}
              skeletonProps={skeletonProps.username}
            >
              <Typography
                variant="body2"
                title={follower?.username}
                className={c(classes.text, classes.ellipsis)}
                style={{ opacity: 0.5 }}
              >
                @{follower?.username ?? "username"}
              </Typography>
            </LazyLoad>
          }
        />
      </ItemButton>
    </Item>
  );
}
