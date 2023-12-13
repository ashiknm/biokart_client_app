import "./App.css";
import Layout from "./components/Layout";
import Loginpage from "./components/Loginpage";
import Registerpage from "./components/Registerpage";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";

import ProfileSettings from "./scenes/profileSettings";
import CreditsSettings from "./scenes/creditsSettings";
import NotificationSettings from "./scenes/notificationSettings";
import Help from "./scenes/help";
import Profile from "./scenes/profile";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";


import { Routes, Route } from "react-router-dom";

import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}



function App() {

  const [theme, colorMode] = useMode();


  return (
    <ColorModeContext.Provider value={colorMode} >
  <ThemeProvider theme={theme}>
  <CssBaseline />
    
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route path="/register" element={<Registerpage />} />
        <Route path="/login" element={<Loginpage />} />

        <Route element = {<PersistLogin />}>
        <Route  element={<RequireAuth />} > 
        <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />}>
            <Route path="profile" element={<Profile />} />
            <Route path="profileSettings" element={<ProfileSettings />} />
            <Route path="creditsSettings" element={<CreditsSettings />} />
            <Route
              path="notificationSettings"
              element={<NotificationSettings />}
            />
            <Route path="help" element={<Help />} />
          </Route>
        </Route>
        </Route>



      </Route>
    </Routes>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
