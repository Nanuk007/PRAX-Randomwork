// my-app/src/app/prispevok/[id]/page.tsx
import Typography from '@mui/material/Typography';

export const metadata = {
  title: "Detail komentaru"
}

export default function PostDetail({params} : {params: {id: string, komentareid: string}}) {
  return (
     
    <Typography> Detail komentaru cisla {params.id} a {params.komentareid} </Typography>

  );
}