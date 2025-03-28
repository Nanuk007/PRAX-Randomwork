import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
} from "@mui/material";

const ProfileListSkeleton = () => {
  return (
    <List sx={{ width: "100%" }}>
      {[...Array(1)].map((_, index) => (
        <ListItem
          key={index}
          alignItems="flex-start"
          sx={{ mb: 2, backgroundColor: "background.paper" }}
        >
          <ListItemAvatar>
            <Skeleton variant="circular" width={56} height={56} />
          </ListItemAvatar>
          <ListItemText
            primary={<Skeleton variant="text" width="60%" />}
            secondary={<Skeleton variant="text" width="80%" />}
            sx={{ ml: 2 }}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ProfileListSkeleton;
