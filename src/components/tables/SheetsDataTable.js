import React, { useState, useEffect } from "react";
import ConfirmDialaog from "../common/ConfirmDialaog";
import { useLocation } from "react-router-dom";
import { ExportXlsx } from "../../utils/functions/Functions";
import { useDispatch, useSelector } from "react-redux";
import AddButton from "../buttons/AddButton";
import DataGridTable from "../common/DataGridTable";

// Start relative variables
import { GetSheets, DeleteSheet } from "../../utils/redux/actions/Sheets";
import {
  Sheet1DataColumns,
  ROWS_PER_PAGE,
} from "../../utils/constants/Constants";
import SheetsCreateForm from "../forms/sheets/SheetsCreateForm";
import SheetsEditForm from "../forms/sheets/SheetsEditForm";
import { GetMT5Managers } from "../../utils/redux/actions/Managers";
import { GetMT5SymbolConfigurations } from "../../utils/redux/actions/SymbolConfigurations";
// End relative variables

const SheetsDataTable = () => {
  const allowedPageSizes = ROWS_PER_PAGE;
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const [idToDelete, setIdToDelete] = useState(0);
  const [dataToBeEdited, setDataToBeEdited] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [createForm, setCreateForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const confirmDeleteSentece =
    "Are you sure you want to delete this sheet account";
  const location = useLocation();
  // Start relative variables

  const [itemToDelete, setItemToDelete] = useState("");
  const data = useSelector((state) => state.sheets);
  const columns = Sheet1DataColumns;

  useEffect(() => {
    if (!error) {
      dispatch(GetSheets());
    }
  }, [dispatch, refresh]);

  const onDeleting = (data) => {
    setIdToDelete(data.id);
    setItemToDelete(data.email); // Relative variables
    setShowConfirmDialog(true);
  };

  // End relative variables

  const onExporting = (e) => {
    const fileName = location.pathname;
    ExportXlsx(e, fileName);
  };

  const refreshPage = () => {
    setRefresh(!refresh);
  };

  const confirmDelete = (response) => {
    if (response) {
      onDelete();
    } else {
      setIdToDelete(0);
    }
    setShowConfirmDialog(false);
  };

  const createFormVisibility = (props) => {
    setCreateForm(props);
  };

  const editFormVisibility = (props) => {
    setEditForm(props);
  };

  const onDelete = async () => {
    await dispatch(DeleteSheet(idToDelete));
    refreshPage();
  };

  const onEditing = (data) => {
    setDataToBeEdited(data);
    setEditForm(true);
  };

  const onInserting =  () => {
    dispatch(GetMT5Managers());
    dispatch(GetMT5SymbolConfigurations());
    setCreateForm(true);
  };

  return (
    <div>
      {showConfirmDialog && (
        <ConfirmDialaog
          confirmDelete={confirmDelete}
          confirmSentece={confirmDeleteSentece}
          data={itemToDelete}
        />
      )}
      {createForm && (
        <SheetsCreateForm
          createFormVisibility={createFormVisibility}
          refreshPage={refreshPage}
        />
      )}
      {editForm && (
        <SheetsEditForm
          editFormVisibility={editFormVisibility}
          data={dataToBeEdited}
          refreshPage={refreshPage}
        />
      )}

      <div
        className={`${createForm ? "blur-sm" : ""}${editForm ? "blur-sm" : ""}`}
      >
        <div className="flex justify-end">
          <AddButton onClick={onInserting} />
        </div>
        <DataGridTable
          data={data}
          onExporting={onExporting}
          allowedPageSizes={allowedPageSizes}
          onEditing={onEditing}
          onDeleting={onDeleting}
          columns={columns}
        />
      </div>
    </div>
  );
};
export default SheetsDataTable;
