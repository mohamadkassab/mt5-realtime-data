import React, { useState, useEffect } from "react";
import ConfirmDialog from "../common/ConfirmDialog";
import { useLocation, useNavigate } from "react-router-dom";
import { ExportXlsx } from "../../utils/functions/Functions";
import { useDispatch, useSelector } from "react-redux";
import AddButton from "../buttons/AddButton";
import DataGridTable from "../common/DataGridTable";
import { GetSheets, DeleteSheet } from "../../utils/redux/actions/Sheets";
import {
  SheetDataColumns,
  ROWS_PER_PAGE,
} from "../../utils/constants/Constants";
import ConfigurationList from "../common/SheetDataDisplay";

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
  const sheets = 
[
      {
        sheet_id: 1,
        sheet_name: "sheet 1",
        dealer_configuration_id: 121,
        dealer_configurations: [
          {
            Dealer_Conf_Manager_id: 674,
            server_name: "Dev",
            Login: 1000,
            SymbolSuffix: "XAUUSD",
            MainSymbol: "XAUUSD",
            Rules: [
              {
                name: "#1-col1",
                value: "10",
              },
              {
                name: "#2-col2",
                value: "11",
              },
            ],
          },
          {
            Dealer_Conf_Manager_id: 675,
            Name: "Dev",
            Login: 1000,
            SymbolSuffix: "XAUUSD.v",
            MainSymbol: "XAUUSD",
            Rules: [
              {
                name: "#1-col1",
                value: "12",
              },
              {
                name: "#2-col2",
                value: "13",
              },
            ],
          },   
          {
            Dealer_Conf_Manager_id: 676,
            server_name: "Dev",
            Login: 1000,
            SymbolSuffix: "EURUSD",
            MainSymbol: "EURUSD",
            Rules: [
              {
                name: "#1-col1",
                value: "10",
              },
              {
                name: "#2-col2",
                value: "11",
              },
            ],
          },
          {
            Dealer_Conf_Manager_id: 675,
            Name: "Dev",
            Login: 1000,
            SymbolSuffix: "EURUSD.v",
            MainSymbol: "EURUSD",
            Rules: [
              {
                name: "#1-col1",
                value: "12",
              },
              {
                name: "#2-col2",
                value: "13",
              },
            ],
          },
        ],
        COVERAGE_DETAILS: [
          {
            Dealer_Conf_coverage_id: 675,
            server_name: "Dev",
            Coverage: "coverage account",
            Symbol: "XAUUSD",
            Rules: [
              {
                name: "#1-col1",
                value: "12",
              },
              {
                name: "#2-col2",
                value: "13",
              },
            ],
          },
          {
            Dealer_Conf_coverage_id: 675,
            server_name: "Dev",
            Login: 1000,
            Symbol: "XAUUSD",
            Rules: [
              {
                name: "#1-col1",
                value: "12",
              },
              {
                name: "#2-col2",
                value: "13",
              },
            ],
          },
        ],
      },
      {
        sheet_id: 2,
        sheet_name: "sheet 2",
        dealer_configuration_id: 121,
        dealer_configurations: [
          {
            Dealer_Conf_Manager_id: 674,
            server_name: "Dev",
            Login: 1001,
            SymbolSuffix: "XAUUSD",
            MainSymbol: "XAUUSD",
            Rules: [
              {
                name: "#1-x1",
                value: "10",
              },
              {
                name: "#2-x2",
                value: "11",
              },
            ],
          },
          {
            Dealer_Conf_Manager_id: 675,
            Name: "Dev",
            Login: 1000,
            SymbolSuffix: "XAUUSD.v",
            MainSymbol: "XAUUSD",
            Rules: [
              {
                name: "#1-x1",
                value: "12",
              },
              {
                name: "#2-x2",
                value: "13",
              },
            ],
          },
        ],
        COVERAGE_DETAILS: [
          {
            Dealer_Conf_coverage_id: 675,
            server_name: "Dev",
            Login: 1000,
            Symbol: "XAUUSD",
            Rules: [
              {
                name: "#1-x1",
                value: "12",
              },
              {
                name: "#2-x2",
                value: "13",
              },
            ],
          },
          {
            Dealer_Conf_coverage_id: 675,
            server_name: "Dev",
            Login: 1000,
            Symbol: "XAUUSD",
            Rules: [
              {
                name: "#1-x1",
                value: "12",
              },
              {
                name: "#2-x2",
                value: "13",
              },
            ],
          },
        ],
      },
    ];

  React.useEffect(() => {
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
      <div>
        <ConfigurationList
          sheets={sheets}
          onInserting={onInserting}
        />
      </div>
    </div>
  );
};

export default SheetsDataTable;
