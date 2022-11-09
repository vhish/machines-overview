import React, { useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Logo from "./components/Logo";
import "./App.css";
import OverviewCard from "./OverviewGraph";
import { MachineEntry } from "./types";

let data: MachineEntry[] = require("./machine_data.json");

const App = () => {
  const displayData = data.map(
    ({
      customer,
      asset_type,
      serial_number,
      service_contract,
      warranty,
    }: MachineEntry) => ({
      customer,
      asset_type,
      warranty: warranty ? "Valid" : "Expired",
      service_contract: service_contract ? "Active" : "Expired",
    })
  );

  const [rowData] = useState(displayData);
  const [dark, setDarkMode] = useState(false);

  const [columnDefs] = useState([
    { field: "customer" },
    { field: "asset_type", headerName: "Asset Type" },
    {
      field: "serial_number",
      headerName: "Serial Number",
    },
    {
      field: "service_contract",
      headerName: "Service Contract",
    },
    { field: "warranty" },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
    }),
    []
  );

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      return setDarkMode(true);
    }
    return setDarkMode(false);
  };

  const onCellClicked = (cell: any) => {
    console.log("Cell Clicked", cell);
  };

  const onGridReady = (params: any) => {
    params.api.sizeColumnsToFit();
  };

  return (
    <div
      style={{ height: "100vh", padding: "25px" }}
      className={`container ${dark && "dark-mode"}`}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "100px" }}>
        <Logo /> | <h2>Machine Data Graph and Status</h2>
        <div>
          <small>{dark ? "Light Theme" : "Dark Theme"}</small>
          <label className="switch">
            <input type="checkbox" onChange={handleOnChange} />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
        <div
          className={dark ? "ag-theme-alpine-dark" : "ag-theme-alpine"}
          style={{ width: "75%", height: "600px" }}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            animateRows={true}
            gridOptions={{ suppressMenuHide: true }}
            onGridReady={onGridReady}
            rowSelection="multiple"
            onCellClicked={(cell) => onCellClicked(cell)}
          />
        </div>
        <div style={{ width: "300px", height: "300px", marginBottom: "10px" }}>
          <OverviewCard />
        </div>
      </div>
    </div>
  );
};

export default App;
