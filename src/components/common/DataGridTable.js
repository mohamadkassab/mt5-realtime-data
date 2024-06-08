import DataGrid, {
    Column,
    Grouping,
    GroupPanel,
    ColumnChooser,
    SearchPanel,
    Sorting,
    Export,
    Selection,
    Scrolling,
  } from "devextreme-react/data-grid";
  
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

const DataGridTable = ({data, onExporting, allowedPageSizes, onEditing, onDeleting, columns})=>{
  const columnsDiv = columns.map((item, index) => {
    const columnProps = {
      dataField: item.dataField,
      caption: item.caption,
      alignment: item.alignment,
    };
    if (item.cellRender) {
      columnProps.cellRender = item.cellRender;
    }
    if (item.width) {
      columnProps.width = item.width;
    }
    if(item.groupIndex){
      columnProps.groupIndex = item.groupIndex;
    }
    if(!item.hideColumn){
      return <Column key={index} {...columnProps}></Column>;
    }

  });
    return(
      <div id="gridContainer">
        <DataGrid
        id="gridContainer"
        dataSource={data}
        columnHidingEnabled={true}
        width="100%"
        showBorders={true}
        showRowLines={false}
        rowAlternationEnabled={true}
        onExporting={onExporting}
        columnMinWidth={50}
        allowUpdating={true}
      >
        <Scrolling mode="virtual" />
        <Export enabled={true} allowExportSelectedData={true} />
        <SearchPanel visible={true} placeholder="Search..." />
        <Selection mode="multiple" />
        <Grouping 
         contextMenuEnabled={true}
        autoExpandAll={false} 
        expandMode="rowClick"/>
        <GroupPanel visible={true} emptyPanelText="" />
   
      
        <ColumnChooser enabled={false}/>
        <Sorting mode="multiple" />

        {columnsDiv}
        <Column
          caption="Action"
          alignment="center"
          fixedPosition="right"
          fixed={true}
          width={100}
          cellRender={(rowData) => (
            <div>
              <IconButton
                onClick={() => onEditing(rowData.data)}
                aria-label="delete"
              >
                <ModeEditOutlineOutlinedIcon />
              </IconButton>
              <IconButton
                onClick={() => onDeleting(rowData.data)}
                aria-label="delete"
                color="error"
              >
                <DeleteOutlineIcon />
              </IconButton>
            </div>
          )}
        />
      </DataGrid>
      </div>
    )
}

export default DataGridTable