import RootNavigation from "./navigation";

import { AuthProvider } from "./context/Auth";

const App = () => {
  return (
    <AuthProvider>
      <RootNavigation />
    </AuthProvider>
  );
};

export default App;
