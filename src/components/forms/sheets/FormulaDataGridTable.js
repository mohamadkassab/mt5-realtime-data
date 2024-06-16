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
  columnsCaption,
  setColumnsCaption,
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
        obj.caption = `#${index + 1 - sheet2ColumnsLength}`;
      }
    });

    updatedColumns3.forEach((obj, index) => {
      if (index >= sheet3ColumnsLength) {
        obj.dataField = `#${index + 1 - sheet3ColumnsLength}`;
        obj.caption = `#${index + 1 - sheet3ColumnsLength}`;
      }
    });

    const columnRemoved = parseInt(col.dataField.replace("#", ""), 10);

    const updatedData2 = symbolsFormulas.map((row) => {
      const newRow = { ...row };
      delete newRow[col.dataField];
      const updatedColumnsLength2 = updatedColumns2.length;
      for (
        let i = 0;
        i <= updatedColumnsLength2 - sheet2ColumnsLength - columnRemoved;
        i++
      ) {
        newRow[`#${columnRemoved + i}`] = newRow[`#${columnRemoved + i + 1}`] || 0;
      }
      const columnTodelete = updatedColumnsLength2 - sheet2ColumnsLength + 1;
      delete newRow[`#${columnTodelete}`];
      return newRow;
    });

    const updatedData3 = coverageSymbolsFormulas.map((row) => {
      const newRow = { ...row };

      delete newRow[col.dataField];
      const updatedColumnsLength3 = updatedColumns3.length;

      for ( let i = 0; i <= updatedColumnsLength3 - sheet3ColumnsLength - columnRemoved; i++) {
        newRow[`#${columnRemoved + i}`] = newRow[`#${columnRemoved + i + 1}`] || 0;
      }
      const columnTodelete = updatedColumnsLength3 - sheet3ColumnsLength + 1;
      delete newRow[`#${columnTodelete}`];
      return newRow;
    });

    setColumns2(updatedColumns2);
    setColumns3(updatedColumns3);
    setSymbolsFormulas(updatedData2);
    setCoverageSymbolsFormulas(updatedData3);
  };

  const handleCaptionChange = (e) => {
    if (e.parentType === "dataRow") {
      e.editorElement.onchange = (event) => {
        const newValue = event.target.value;
        const dataField = e.dataField;
        setColumnsCaption({
          ...columnsCaption,
          [dataField]: newValue,
        });
      };
    }
  };

  React.useEffect(()=>{
    for (let i = 1; i <= columns2.length; i++) {
      columnsCaption[`note${i}`] = columnsCaption[`note${i}`] || `Note`;
    }
  });

  return (
    <div className="mt-8">
 
      <DataGrid
        dataSource={[columnsCaption]}
        showBorders={true}
        focusedRowEnabled={true}
        showColumnHeaders={false}
        onEditorPrepared={handleCaptionChange}
      >
        <Editing mode="cell" allowUpdating={true} />
        {columns2?.map((col, index) => (
          <Column
            key={`datagrid0-${index}`}
            dataField={`note${index + 1}`}
            caption={`Note ${index + 1}`}
            alignment={col.alignment}
            dataType="text"
          />
        ))}
        <Paging enabled={false} />
      </DataGrid>

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
