import React from "react";
import Layout from "./Components/Layout";
import { Routes, Route } from "react-router-dom";
import RegForm from "./Pages/Form";
import TableView from "./Components/Table";
import FormView from "./Components/FormView";
import EnhancedTable from "./Components/TableView";

const App = () => {
  const fields = "/Service/farmer.json";
  const desc = "/Details/description.json";

  return (
    <Routes>
      {/* <Form /> */}
      <Route path="/table" element={<TableView />} />
      <Route path="/" element={<Layout />}>
        <Route path="/farmer/add" element={<RegForm fields={fields} />} />
        <Route path="/farmer/view" element={<EnhancedTable fields={desc} />} />
      </Route>
    </Routes>
  );
};

export default App;
