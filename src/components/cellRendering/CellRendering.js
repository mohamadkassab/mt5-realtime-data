import React from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { TableCell } from "@mui/material";

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

export const cellRenderPercentage = (cellData) => {
  const value = cellData.value !== undefined ? cellData.value : 0;
  return <> {value}%</>;
};

export const headerCellRender = (col, handleRemoveColumn) => {
  return (headerInfo) => {
    const { column, columnIndex } = headerInfo;
    return (
      <div className="header-cell flex items-center justify-center ">
        <span>{col.caption}</span>
        {col.caption.startsWith("#") && (
          <>
            <RemoveCircleOutlineIcon
              className="md:ml-8 sm:ml-4 hover:cursor-pointer"
              onClick={(e) => handleRemoveColumn(e, col)}
              columnindex={columnIndex}
            />
          </>
        )}
      </div>
    );
  };
};

export const symbolCellRender = (data) => {
  const cellStyle = data.data.isKey
    ? { color: "green", fontWeight: "bold" }
    : {};

  return <div style={cellStyle}>{data.value}</div>;
};

export const coverageSymbolCellRender = (data) => {
  const cellStyle = { color: "green", fontWeight: "bold" };

  return <div style={cellStyle}>{data.value}</div>;
};

export const SheetHeaderCell = ({ caption }) => {
  return (
    <>
      <TableCell
        sx={{
          position: "sticky",
          top: 0,
          backgroundColor: "white",
          zIndex: 1,
          fontWeight: "bold",
        }}
      >
        {caption}
      </TableCell>
    </>
  );
};
