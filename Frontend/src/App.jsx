import AppRoutes from "./routes/AppRoutes";

import AuthInitializer from "./component/auth/AuthInitializer";
import ScrollToTop from "./component/common/ScrollToTop";

function App() {
  return(
    <>
      <ScrollToTop/>
      <AuthInitializer/>
      <AppRoutes/>
    </>
  )
}

export default App;