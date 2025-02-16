// src/app/layout.tsx

import { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/NavBar";
import AuthProvider from "../components/providers/AuthProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import QueryProvider from "@/components/providers/QueryProvider";
export const metadata: Metadata = {
  title: "SnapZoška",
  description: "Created by Švikruha",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body>
        <QueryProvider>
        <AuthProvider>
          <ThemeProvider>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <main style={{ flexGrow: 1 }}>
              {children}
            </main>
          <Navbar /> 
          </div>
          </ThemeProvider>
        </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}


