import React, { useState, useEffect } from "react";
import ConfirmDialog from "../common/ConfirmDialog";
import { useLocation, useNavigate } from "react-router-dom";
import { ExportXlsx } from "../../utils/functions/Functions";
import { useDispatch, useSelector } from "react-redux";
import AddButton from "../buttons/AddButton";
import DataGridTable from "../common/DataGridTable";
import { GetSheets, DeleteSheet } from "../../utils/redux/actions/Sheets";
import { SheetDataColumns, ROWS_PER_PAGE } from "../../utils/constants/Constants";

const SheetsDataTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const allowedPageSizes = ROWS_PER_PAGE;

  const error = useSelector((state) => state.error);
  const data = useSelector((state) => state.sheets);

  const [idToDelete, setIdToDelete] = useState(null);
  const [dataToBeEdited, setDataToBeEdited] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState("");

  const confirmDeleteSentence = "Are you sure you want to delete this sheet account?";

  useEffect(() => {
    if (!error) {
      dispatch(GetSheets());
    }
  }, [dispatch, refresh, error]);

  const onDeleting = (data) => {
    if (data && data.id) {
      setIdToDelete(data.id);
      setItemToDelete(data.email);
      setShowConfirmDialog(true);
    }
  };

  const onExporting = (e) => {
    const fileName = location.pathname;
    ExportXlsx(e, fileName);
  };

  const refreshPage = () => {
    setRefresh((prev) => !prev);
  };

  const confirmDelete = async (response) => {
    if (response && idToDelete) {
      await dispatch(DeleteSheet(idToDelete));
      refreshPage();
    }
    setShowConfirmDialog(false);
    setIdToDelete(null);
  };

  const onEditing = (data) => {
    if (data) {
      setDataToBeEdited(data);

    }
  };

  const onInserting = () => {
    navigate("/createSheet");
  };

  return (
    <div>
      {showConfirmDialog && (
        <ConfirmDialog
          confirmDelete={confirmDelete}
          confirmSentence={confirmDeleteSentence}
          data={itemToDelete}
        />
      )}
      <div>
        <div className="flex justify-end">
          <AddButton onClick={onInserting} />
        </div>
        <DataGridTable
          data={data || []}
          onExporting={onExporting}
          allowedPageSizes={allowedPageSizes}
          onEditing={onEditing}
          onDeleting={onDeleting}
          columns={SheetDataColumns}
        />
      </div>
    </div>
  );
};

export default SheetsDataTable;

