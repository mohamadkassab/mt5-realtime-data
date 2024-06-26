import React from "react";
import { DataGrid, Column, Editing, Paging } from "devextreme-react/data-grid";
import "devextreme/dist/css/dx.light.css";
import {
  headerCellRender,
} from "../../cellRendering/CellRendering";
import {
  Sheet2DataColumns,
  Sheet3DataColumns,
} from "../../../utils/constants/Constants";
const FormulaDataGridTable = ({
  columns2,
  setColumns2,
  columns3,
  setColumns3,
  symbolsFormulas,
  setSymbolsFormulas,
  coverageSymbolsFormulas,
  setCoverageSymbolsFormulas,
}) => {

  const sheet2ColumnsLength = Sheet2DataColumns.length;
  const sheet3ColumnsLength = Sheet3DataColumns.length;

  const handleRemoveColumn = (e, col) => {
    const updatedColumns2 = columns2.filter((obj) => obj.dataField !== col.dataField);
    const updatedColumns3 = columns3.filter((obj) => obj.dataField !== col.dataField);

    updatedColumns2.forEach((obj, index) => {
      if (index >= sheet2ColumnsLength) {
        obj.dataField = `#${index + 1 - sheet2ColumnsLength}`;
        obj.caption = `#${index + 1 - sheet2ColumnsLength}-${obj.caption.slice(obj.caption.lastIndexOf('-') + 1).trim()}`;
      }
    });

    updatedColumns3.forEach((obj, index) => {
      if (index >= sheet3ColumnsLength) {
        obj.dataField = `#${index + 1 - sheet3ColumnsLength}`;
        obj.caption = `#${index + 1 - sheet3ColumnsLength}-${obj.caption.slice(obj.caption.lastIndexOf('-') + 1).trim()}`;
      }
    });

    const columnRemoved = parseInt(col.dataField.replace("#", ""), 10);

    const updatedData2 = (symbolsFormulas && symbolsFormulas.length > 0) ? symbolsFormulas.map((row) => {
      const newRow = { ...row };
      delete newRow[col.dataField];
      const updatedColumnsLength2 = updatedColumns2.length;
    
      for (let i = 0; i <= updatedColumnsLength2 - sheet2ColumnsLength - columnRemoved; i++) {
        newRow[`#${columnRemoved + i}`] = newRow[`#${columnRemoved + i + 1}`] || 0;
      }
      const columnTodelete = updatedColumnsLength2 - sheet2ColumnsLength + 1;
      delete newRow[`#${columnTodelete}`];
      return newRow;
    }) : [];

    const updatedData3 = (coverageSymbolsFormulas && coverageSymbolsFormulas.length > 0) ? coverageSymbolsFormulas.map((row) => {
      const newRow = { ...row };
    
      delete newRow[col.dataField];
      const updatedColumnsLength3 = updatedColumns3.length;
    
      for (let i = 0; i <= updatedColumnsLength3 - sheet3ColumnsLength - columnRemoved; i++) {
        newRow[`#${columnRemoved + i}`] = newRow[`#${columnRemoved + i + 1}`] || 0;
      }
      const columnTodelete = updatedColumnsLength3 - sheet3ColumnsLength + 1;
      delete newRow[`#${columnTodelete}`];
      return newRow;
    }) : [];

    setColumns2(updatedColumns2);
    setColumns3(updatedColumns3);
    setSymbolsFormulas(updatedData2);
    setCoverageSymbolsFormulas(updatedData3);
  };


  return (
    <div className="mt-8">
      <DataGrid
        dataSource={symbolsFormulas}
        className="formulaGridContainer my-2 always-visible-scrollbar"
        sorting={{ mode: "none" }}
        style={{ maxHeight: "40vh" }}
      >
        <Editing mode="cell" allowUpdating={true} />
        {columns2?.map((col, index) => (
          <Column
            key={`datagrid1-${index}`}
            dataField={col.dataField}
            caption={col.caption}
            alignment={col.alignment}
            allowEditing={col.allowUpdating}
            dataType={col.dataType}
            cellRender={col.cellRender}
            headerCellRender={headerCellRender(col, handleRemoveColumn)}
          />
        ))}
        <Paging enabled={false} />
      </DataGrid>

      <DataGrid
        dataSource={coverageSymbolsFormulas}
        className="formulaGridContainer my-2 always-visible-scrollbar"
        sorting={{ mode: "none" }}
        style={{ maxHeight: "20vh" }}
      >
        <Editing mode="cell" allowUpdating={true} />
        {columns3?.map((col, index) => (
          <Column
            key={`datagrid2-${index}`}
            dataField={col.dataField}
            caption={col.caption}
            alignment={col.alignment}
            allowEditing={col.allowUpdating}
            dataType={col.dataType}
            cellRender={col.cellRender}
          />
        ))}
        <Paging enabled={false} />
      </DataGrid>
      
    </div>
  );
};

export default FormulaDataGridTable;
