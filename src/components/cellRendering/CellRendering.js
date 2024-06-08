import React from "react";

export const booleanCellRender = ({ value }) => {
  return (
    <div
      style={{
        color: value ? "#2e7d32" : "#d32f2f",
        fontWeight: "bold",
      }}
    >
      {value ? "Active" : "Not Active"}
    </div>
  );
};

export const cellRenderPercentage = (cellData)=>{
  const value = cellData.value !== undefined ? cellData.value : 0;
  return(
    <div>
    {value}%
  </div>
  )
}
