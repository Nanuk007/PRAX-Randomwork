// my-app/src/app/prispevok/[id]/page.tsx
import Typography from '@mui/material/Typography';

export const metadata = {
  title: "Detail prispevku"
}

export default function PostDetail({params} : {params: {id: string}}) {
  return (
     
    <Typography> Detail prispevku cisla {params.id} </Typography>

  );
}
