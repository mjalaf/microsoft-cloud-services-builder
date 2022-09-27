import React from "react";

import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import DashboardRoutes from "./Pages/Dashboard/DashboardRoutes";
import MainMenu from "./components/Menu/Manu";


function App()  { 
  return (
    <div>
      <MainMenu />
      <div className="container mt-3">
      <DashboardRoutes/>
    </div>

</div>
  );
}

export default App;

