"use client";

import { useState, useCallback, useTransition } from "react";
import { debounce } from 'lodash';
import { Container, List, TextField, Typography } from "@mui/material";
import ProfileListSkeleton from "./components/ProfileSkeletonLoader";
import SearchCard from "./components/SearchCard";
import { searchProfiles } from "./actions";

interface Profile {
  id: string;
  user: {
    name: string | null;
  };
  avatarUrl?: string | null;
  bio?: string | null;
}

export default function OptimizedInstagramStyleSearch() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Profile[]>([]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      startTransition(async () => {
        try {
          const results = await searchProfiles(value);
          setSearchResults(results);
          setError(null);
        } catch (err) {
          setError("Nastala chyba pri vyhľadávaní");
          setSearchResults([]);
        }
      });
    }, 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSearch(value);
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        Hladaj
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        label="Názov používateľa"
        value={search}
        onChange={handleSearchChange}
        sx={{ mb: 3 }}
      />
      {isPending ? (
        <ProfileListSkeleton />
      ) : searchResults.length === 0 ? (
        <Typography>Žiadne výsledky</Typography>
      ) : (
        <List sx={{ width: "100%" }}>
          {searchResults.map((profile: Profile) => (
            <SearchCard key={profile.id} profile={profile} />
          ))}
        </List>
      )}
    </Container>
  );
}