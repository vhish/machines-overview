import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { MachineEntry } from "./types";

ChartJS.register(ArcElement, Tooltip, Legend);

let newData: MachineEntry[] = require("./machine_data.json");

const validWarrantyCount = newData.reduce(
  (acc, curr) => (curr.warranty === true ? ++acc : acc),
  0
);

const invalidWarrantyCount = newData.length - validWarrantyCount;
export const warrantyData = {
  labels: ["Valid Warranty", "Expired Warranty"],
  datasets: [
    {
      label: "Waranty Overview",
      data: [validWarrantyCount, invalidWarrantyCount],
      backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
      borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
      borderWidth: 1,
    },
  ],
};

const validServiceCount = newData.reduce(
  (acc, curr) => (curr.service_contract === true ? ++acc : acc),
  0
);

const invalidServiceCount = newData.length - validServiceCount;

export const serviceData = {
  labels: ["Valid Contracts", "Expired Contracts"],
  datasets: [
    {
      label: "Service Contract Overview",
      data: [validServiceCount, invalidServiceCount],
      backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
      borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
      borderWidth: 1,
    },
  ],
};

const OverviewCard = () => {
  return (
    <div
      style={{
        display: "flex",
        flexBasis: "auto",
        flexDirection: "column",
        marginTop: "-150px",
      }}
    >
      <Pie data={warrantyData} />
      <Pie data={serviceData} />
    </div>
  );
};

export default OverviewCard;
