// my-app/src/app/prispevok/page.tsx
import Typography from '@mui/material/Typography';

export const metadata = {title: "Post"}

export default function Post({params}) {
  return (
     
    <Typography> Prispevok cislo {params.id}  </Typography>

  );
}