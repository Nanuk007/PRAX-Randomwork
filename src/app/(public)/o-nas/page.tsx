// src/app/o-nas/page.tsx


import { Container, Box, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Metadata } from "next";

export const metadata: Metadata = { 
  title: "O nás | ZoškaSnap",
  description: "Zoznámte sa s projektom ZoškaSnap - vaším digitálnym pomocníkom pri štúdiu"
};

export default function AboutUs() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
          O nás
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Typography variant="body1" paragraph>
            Vitajte v ZoškaSnap! Sme inovatívny projekt vytvorený študentmi pre študentov, 
            ktorý sa zameriava na zjednodušenie a zefektívnenie procesu štúdia.
          </Typography>

          <Typography variant="body1" paragraph>
            Naša platforma umožňuje jednoduché zdieľanie študijných materiálov, poznámok 
            a skúseností medzi študentmi. Veríme, že spoločné vzdelávanie 
            a výmena vedomostí sú kľúčom k lepšiemu vzdelaniu.
          </Typography>

          <Typography variant="body1" paragraph>
            ZoškaSnap vznikol s víziou vytvoriť modernú a užívateľsky prívetivú platformu, 
            ktorá pomôže študentom efektívnejšie organizovať svoje študijné materiály 
            a zároveň vytvárať komunitu založenú na vzájomnej pomoci.
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Naše hodnoty:
            </Typography>
            <Typography component="ul" sx={{ pl: 2 }}>
              <li>Jednoduchosť a prístupnosť</li>
              <li>Bezpečnosť a spoľahlivosť</li>
              <li>Komunitná spolupráca</li>
              <li>Neustále zlepšovanie</li>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
