import { AuthContextProvider } from "@/contexts/AuthContext";

import "./global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body>
        <AuthContextProvider>
          <div id="root">{children}</div>
        </AuthContextProvider>
      </body>
    </html>
  );
}
