import {
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
  } from "@mui/material";
  
  interface Profile {
    id: string;
    user: {
      name: string | null;
    };
    avatarUrl?: string | null;
    bio?: string | null;
  }
  
  export default function SearchCard({ profile }: { profile: Profile }) {
    return (
      <ListItem
        key={profile.id}
        alignItems="flex-start"
        sx={{ mb: 2, backgroundColor: "background.paper" }}
      >
        <ListItemAvatar>
          <Avatar
            alt={profile.user.name || "Používateľ"}
            src={profile.avatarUrl || undefined}
            sx={{ width: 56, height: 56 }}
          />
        </ListItemAvatar>
        <ListItemText
          primary={profile.user.name}
          secondary={
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {profile.bio}
            </Typography>
          }
          sx={{ ml: 2 }}
        />
      </ListItem>
    );
  }