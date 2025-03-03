import {
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
    Box,
  } from "@mui/material";
import Link from "next/link";
  
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
        <Link 
          href={`/profil/${profile.id}`}
          style={{ 
            textDecoration: 'none', 
            color: 'inherit',
            display: 'flex',
            width: '100%',
            alignItems: 'center'
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            width: '100%',
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'translateY(-2px)',
            }
          }}>
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
          </Box>
        </Link>
      </ListItem>
    );
  }