// src/app/prispevok/[prispevokId]/page.tsx

import Typography from "@mui/material/Typography";
export default function Prispevok({params}: {params: {prispevokId: string}}) {
  return (
    <div>
       <Typography> prispevok {params.prispevokId} </Typography>
    </div>
  );
}