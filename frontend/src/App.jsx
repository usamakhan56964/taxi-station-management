// App.jsx
import React from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Dashboard.jsx";
import Drivers from "./pages/Drivers.jsx";
import Taxi from "./pages/Taxi.jsx";
import RideLogs from "./pages/RideLogs.jsx";
import Login from "./forms/Login.jsx";
import ForgotPassword from "./forms/ForgotPassword.jsx";
import ResetPassword from "./forms/ResetPassword.jsx";

const App = () => {
  const location = useLocation();

  // Define routes where Navbar should NOT show
  //const hideNavbarRoutes = ["/", "/forgot-password"];

  const hideNavbarRoutes = ["/", "/forgot-password", "/reset-password"];

  const shouldHideNavbar = hideNavbarRoutes.some(route => {
  // Exact match for "/" and "/forgot-password"
  if (route === "/" || route === "/forgot-password") {
    return location.pathname === route;
  }
  // Match dynamic reset-password route
  if (route === "/reset-password") {
    return location.pathname.startsWith("/reset-password/");
  }
  return false;
  });

  return (
    <div>
      {/*{!hideNavbarRoutes.includes(location.pathname) && <Navbar />}*/}
      {!shouldHideNavbar && <Navbar />}

      <main>
        <Routes>
          {/* Auth pages */}
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Protected app pages */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/taxis" element={<Taxi />} />
          <Route path="/ridelogs" element={<RideLogs />} />

          {/* Redirect unknown paths */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
