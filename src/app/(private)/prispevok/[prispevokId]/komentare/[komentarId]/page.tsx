// src/app/prispevok/[prispevokId]/komentar/[komentarId]/page.tsx
import { Typography } from "@mui/material";

export default function _({params}: {params: { prispevokId: string, komentarId: string}}) {
  return (
    <div>
      <Typography>Komentar cislo: {params.komentarId} ku prispevku {params.prispevokId} </Typography>
      <Typography>Prispevok c.  {params.prispevokId} komentar c.  {params.komentarId} </Typography>
    </div>
  );
}