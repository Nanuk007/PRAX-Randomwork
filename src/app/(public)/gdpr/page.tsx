// src/app/o-nas/page.tsx

import { Container, Button, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Metadata } from "next";
import Link from 'next/link';

export const metadata: Metadata = { 
  title: "O nás | ZoškaSnap",
  description: ""
};

export default function AboutUs() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button 
        component={Link}
        href="/"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Späť
      </Button>
      
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        GDPR
      </Typography>
      
      <Box sx={{ my: 4 }}>
        <Typography variant="body1" paragraph>
          V ZoškaSnap sa zaväzujeme chrániť vaše súkromie a osobné údaje. Naše zásady GDPR zabezpečujú, že:
        </Typography>
        <Typography component="ul" sx={{ pl: 4 }}>
          <li>Zhromažďujeme iba údaje nevyhnutné pre fungovanie našej služby.</li>
          <li>Vaše osobné informácie sú spracúvané zákonne, spravodlivo a transparentne.</li>
          <li>Implementujeme vhodné technické a organizačné opatrenia na zabezpečenie bezpečnosti údajov.</li>
          <li>Máte právo kedykoľvek pristupovať k svojim osobným údajom, opraviť ich alebo vymazať.</li>
        </Typography>
        <Typography variant="body1" paragraph sx={{ mt: 2 }}>
          Na našich serveroch neukladáme žiadne osobné informácie. Všetky údaje sú anonymizované a používajú sa výlučne na zlepšenie používateľskej skúsenosti.
        </Typography>
        <Typography variant="body1">
          Pre viac informácií o vašich právach podľa GDPR alebo o našich postupoch pri spracovaní údajov nás prosím kontaktujte.
        </Typography>
      </Box>
    </Container>
  );
}
