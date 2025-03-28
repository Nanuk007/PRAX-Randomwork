"use client";

import { useState, useCallback } from "react";
import { useAPICall } from "@/hooks/useApiCall";
import debounce from "lodash/debounce";
import { Container, List, TextField, Typography } from "@mui/material";
import ProfileListSkeleton from "./components/ProfileSkeletonLoader";
import SearchCard from "./components/SearchCard";

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
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const {
    data: dataJson,
    isLoading,
    isError,
  } = useAPICall(
    ["profiles", debouncedSearch],
    async () => {
      if (!debouncedSearch || debouncedSearch.length < 3) return [];
      const response = await fetch(
        `/api/profile/${encodeURIComponent(debouncedSearch)}`
      );

      if (!response.ok) {
        throw new Error("Nastala chyba pri nacitavani dát");
      }
      return response.json();
    },
    {
      enabled: debouncedSearch.length >= 3,
    }
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetSearch = useCallback(
    debounce((value: string) => {
      setDebouncedSearch(value);
    }, 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSetSearch(value);
  };

  if (isError) {
    return <Typography color="error">Nastala necakana chyba</Typography>;
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
      {search.length < 3 ? (
        <Typography>Zadajte aspoň 3 znaky pre vyhľadávanie</Typography>
      ) : isLoading ? (
        <ProfileListSkeleton />
      ) : dataJson?.length === 0 ? (
        <Typography>Žiadne výsledky</Typography>
      ) : (
        <List sx={{ width: "100%" }}>
          {dataJson?.map((profile: Profile) => (
            <SearchCard key={profile.id} profile={profile} />
          ))}
        </List>
      )}
    </Container>
  );
}
