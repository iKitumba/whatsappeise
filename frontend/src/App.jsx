import MyRoutes from "./routes";

import { AuthContextProvider } from "./contexts/AuthContext";

const App = () => {
  return (
    <AuthContextProvider>
      <MyRoutes />
    </AuthContextProvider>
  );
};

export default App;
