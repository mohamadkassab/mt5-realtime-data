import React, { useState } from 'react';
import { DataGrid, Column , Editing } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';
import SecondaryButton from '../buttons/RemoveButton'
import PrimaryButton from "../buttons/AddButton"
import { Sheet2DataColumns } from '../../utils/constants/Constants';
import { cellRenderPercentage } from '../cellRendering/CellRendering';

const FormulaDataGridTable = ({columns1, formData, handleChangeformData, columns2, setColumns2, symbols, suffixes}) => {

  const sheet2ColumnsLength = Sheet2DataColumns.length


  

  const handleAddColumn = () => {
    if (columns2.length < 6 ) {
    const newColumn = { dataField: `#${columns2.length -1 }`, caption: `#${columns2.length -1 }`, allowUpdating:true, dataType:"number", alignment:"left",     cellRender: (cellData) => (cellRenderPercentage(cellData)) };
    setColumns2([...columns2, newColumn]);}
  };
  const handleRemoveColumn = () => {
    if (columns2.length > sheet2ColumnsLength) {
      const updatedColumns = columns2.slice(0, -1);
      setColumns2(updatedColumns);
    }
  };
  const data = [
    { configuration: 1, symbol: 'John Doe' },
    { configuration: 2, symbol: 'Jane Smith' },
    { configuration: 3, symbol: 'John Doe' },
    { configuration: 4, symbol: 'Jane Smith' },
    { configuration: 5, symbol: 'John Doe' },
    { configuration: 6, symbol: 'Jane Smith' },
    { configuration: 7, symbol: 'John Doe' },
    { configuration: 8, symbol: 'Jane Smith' },
    { configuration: 9, symbol: 'John Doe' },
    { configuration: 10, symbol: 'Jane Smith' },
    { configuration: 11, symbol: 'John Doe' },
    { configuration: 12, symbol: 'Jane Smith' },
    { configuration: 13, symbol: 'John Doe' },
    { configuration: 14, symbol: 'Jane Smith' },
    { configuration: 15, symbol: 'John Doe' },
    { configuration: 16, symbol: 'Jane Smith' },
    { configuration: 17, symbol: 'John Doe' },
    { configuration: 18, symbol: 'Jane Smith' },
    { configuration: 19, symbol: 'John Doe' },
    { configuration: 20, symbol: 'Jane Smith' },
  ];

  console.log(symbols);
  console.log(suffixes);
  return (
    <div>
      <div className='flex justify-end space-x-4'>
      <SecondaryButton onClick={handleRemoveColumn} caption="Formula" />
      <PrimaryButton onClick={handleAddColumn} caption="Formula" />
     
      </div>
      
      <DataGrid dataSource={data} className='formulaGridContainer my-2 ' >
      <Editing
        mode="cell" 
        allowUpdating={true}
      />
        {columns2?.map((col, index) => (
          <Column key={index} dataField={col.dataField} caption={col.caption}  alignment={col.alignment} allowEditing={col.allowUpdating} dataType={col.dataType}  />
        ))}
      </DataGrid>
    </div> 
  );
};

export default FormulaDataGridTable;
