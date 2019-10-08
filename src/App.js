import React from "react";
import "./App.css";
import Dashboard from "./Dashboard";
import Store from "./Store";

function App() {
  return (
    <React.Fragment>
      <Store>
        <Dashboard />
      </Store>
    </React.Fragment>
  );
}

export default App;
