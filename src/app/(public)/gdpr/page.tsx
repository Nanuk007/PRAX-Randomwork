
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export const metadata = { title: "Podmienky | ZoškaSnap" };

export default function TermsConditions() {

  return (
    <Container>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
            GDPR
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
            Pre účely správy vašich údajov, naše stránky vyžadujú žiadne informácie o vašom zariadení. Všetky údaje, ktoré sa nachádzate na stránke, sú anonymné a nie sú uložené na serveri.
        </Typography>
    </Container>
  );
}