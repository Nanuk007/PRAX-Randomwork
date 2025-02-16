"use client";

import React, { useState } from 'react';
import { Container, Typography, Box, Paper, Button } from "@mui/material";
import PrihlasenieButton from "@/components/prihlasenie/PrihlasenieButton";
import PrihlasenieDiscordButton from "@/components/prihlasenie/PrihlasenieDiscordButton";
import LoginModal from "@/components/LoginModal";



export default function Prihlasenie() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 56px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 3,
          }}
        >
          <Typography component="h1" variant="h4" gutterBottom>
            Prihlásenie
          </Typography>
          <PrihlasenieButton />
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleOpenLoginModal}
            sx={{ mt: 2 }}
          >
            Ešte nemáš účet registuj sa
          </Button>
          <LoginModal open={isLoginModalOpen} onClose={handleCloseLoginModal} />
        </Paper>
      </Container>
    </Box>
  );
}


// future
// // src/app/auth/prihlasenie/page.tsx

// import { useState } from "react";
// import { Container, Typography, Box, Paper, TextField, Button } from "@mui/material";
// import PrihlasenieButton from "@/components/prihlasenie/PrihlasenieButton";

// export default function Prihlasenie() {
//   const [isRegister, setIsRegister] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     if (isRegister) {
//       // Handle registration
//       console.log("Registering:", { email, password });
//       // Add registration logic here
//     } else {
//       // Handle login
//       console.log("Logging in:", { email, password });
//       // Add login logic here
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "calc(100vh - 56px)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#f0f4f8",
//       }}
//     >
//       <Container component="main" maxWidth="xs">
//         <Paper
//           elevation={3}
//           sx={{
//             padding: 4,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             backgroundColor: "#ffffff",
//             borderRadius: 3,
//           }}
//         >
//           <Typography component="h1" variant="h4" gutterBottom>
//             {isRegister ? "Registrácia" : "Prihlásenie"}
//           </Typography>
//           <form onSubmit={handleFormSubmit}>
//             <TextField
//               fullWidth
//               label="Email"
//               type="email"
//               variant="outlined"
//               margin="normal"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <TextField
//               fullWidth
//               label="Heslo"
//               type="password"
//               variant="outlined"
//               margin="normal"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{
//                 marginTop: 3,
//                 backgroundColor: "#4285F4",
//                 color: "#fff",
//                 "&:hover": { backgroundColor: "#357ae8" },
//                 borderRadius: 2,
//               }}
//             >
//               {isRegister ? "Zaregistrovať sa" : "Prihlásiť sa"}
//             </Button>
//           </form>
//           <Button
//             onClick={() => setIsRegister(!isRegister)}
//             sx={{ marginTop: 2 }}
//           >
//             {isRegister ? "Už máte účet? Prihláste sa" : "Ešte nemáte účet? Zaregistrujte sa"}
//           </Button>
//           <PrihlasenieButton />
//         </Paper>
//       </Container>
//     </Box>
//   );
// }