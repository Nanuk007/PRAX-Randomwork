// src/app/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import {redirect} from "next/navigation";
import NoLoginHomeView from "@/sections/HomeViews/NoLoginHomeView";
export const metadata = { title: "Domov | ZoškaSnap" };

export default async function Home() {
  const activeSession = await getServerSession(authOptions);
  if (activeSession) {
    redirect("/prispevok")
  }
  return <>{<NoLoginHomeView />}</>;
}

// import HomeIcon from "@mui/icons-material/Home";
// import SearchIcon from "@mui/icons-material/Search";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { useState } from "react";

//   const [navValue, setNavValue] = useState(0);
// <Container maxWidth="sm" sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
//   <Box component="main" sx={{ flexGrow: 1, paddingTop: 2 }}>
//     <Typography variant="h4" gutterBottom>
//       Vitajte na SnapZoška!
//     </Typography>
//     <Typography variant="body1">
//       Toto je vaša úvodná stránka. Tu nájdete príspevky od používateľov, pridáte vlastné alebo preskúmate nové príspevky.
//     </Typography>
//   </Box>

//   {/* Bottom Navigation */}
//   <BottomNavigation
//     value={navValue}
//     onChange={(event, newValue) => setNavValue(newValue)}
//     showLabels
//   >
//     <BottomNavigationAction label="Domov" icon={<HomeIcon />} />
//     <BottomNavigationAction label="Hľadať" icon={<SearchIcon />} />
//     <BottomNavigationAction label="Pridať" icon={<AddCircleIcon />} />
//     <BottomNavigationAction label="Notifikácie" icon={<NotificationsIcon />} />
//     <BottomNavigationAction label="Profil" icon={<AccountCircleIcon />} />
//   </BottomNavigation>
// </Container>
