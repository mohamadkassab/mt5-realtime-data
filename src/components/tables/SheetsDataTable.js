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
import ConfigurationList from "../forms/sheets/SheetDataDisplay";

const SheetsDataTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const error = useSelector((state) => state.error);
  const data = useSelector((state) => state.sheets);

  const [idToDelete, setIdToDelete] = useState(null);
  
  const [refresh, setRefresh] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState("");
  const [selectedSheetId, setSelectedSheetId] = useState(0);

  const [sheets, setSheets] = useState([
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
            { name: "#1-col1", value: "10" },
            { name: "#2-col2", value: "11" },
          ],
        },
        {
          Dealer_Conf_Manager_id: 675,
          Name: "Dev",
          Login: 1000,
          SymbolSuffix: "XAUUSD.v",
          MainSymbol: "XAUUSD",
          Rules: [
            { name: "#1-col1", value: "12" },
            { name: "#2-col2", value: "13" },
          ],
        },
        {
          Dealer_Conf_Manager_id: 676,
          server_name: "Dev",
          Login: 1000,
          SymbolSuffix: "EURUSD",
          MainSymbol: "EURUSD",
          Rules: [
            { name: "#1-col1", value: "10" },
            { name: "#2-col2", value: "11" },
          ],
        },
        {
          Dealer_Conf_Manager_id: 675,
          Name: "Dev",
          Login: 1000,
          SymbolSuffix: "EURUSD.v",
          MainSymbol: "EURUSD",
          Rules: [
            { name: "#1-col1", value: "12" },
            { name: "#2-col2", value: "13" },
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
            { name: "#1-col1", value: "12" },
            { name: "#2-col2", value: "13" },
          ],
        },
        {
          Dealer_Conf_coverage_id: 675,
          server_name: "Dev",
          Login: 1000,
          Symbol: "XAUUSD",
          Rules: [
            { name: "#1-col1", value: "12" },
            { name: "#2-col2", value: "13" },
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
            { name: "#1-x1", value: "10" },
            { name: "#2-x2", value: "11" },
          ],
        },
        {
          Dealer_Conf_Manager_id: 675,
          Name: "Dev",
          Login: 1000,
          SymbolSuffix: "XAUUSD.v",
          MainSymbol: "XAUUSD",
          Rules: [
            { name: "#1-x1", value: "12" },
            { name: "#2-x2", value: "13" },
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
            { name: "#1-x1", value: "12" },
            { name: "#2-x2", value: "13" },
          ],
        },
        {
          Dealer_Conf_coverage_id: 675,
          server_name: "Dev",
          Login: 1000,
          Symbol: "XAUUSD",
          Rules: [
            { name: "#1-x1", value: "12" },
            { name: "#2-x2", value: "13" },
          ],
        },
      ],
    },
  ]);


  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const updateData = () => {
    const newSheets = sheets.map(sheet => ({
      ...sheet,
      dealer_configurations: sheet.dealer_configurations.map(config => ({
        ...config,
        Rules: config.Rules.map(rule => ({
          ...rule,
          value: getRandomInt(10, 20).toString(),
        })),
      })),
      COVERAGE_DETAILS: sheet.COVERAGE_DETAILS.map(detail => ({
        ...detail,
        Rules: detail.Rules.map(rule => ({
          ...rule,
          value: getRandomInt(10, 20).toString(),
        })),
      })),
    }));

    setSheets(newSheets);
  };

  useEffect(() => {
    const intervalId = setInterval(updateData, 1000);
    return () => clearInterval(intervalId);
  }, [sheets]);

    const dummyData = {
      "sheet_id":1,
      "sheet_name":"sheet 1",
      "server_id":1,
      "managers":[
         0,
         1,
         2,
         3,
         100
      ],
      "symbol_configuration":[
         18,
         19,
         2,
         3,
         4
      ],
      "coverages":[
         {
            "coverage_id":0,
            "coverage_symbol_configuration_id":[
               0,
               1,
               2,
               3
            ]
         },
         {
            "coverage_id":0,
            "coverage_symbol_configuration_id":[
               0,
               1,
               2,
               3
            ]
         }
      ],
      "formulas":[
         {
            "configuration_id":0,
            "manager_id":0,
            "symbol_id":0,
            "values":[
               {
                  "col_name":"col1",
                  "value":10
               },
               {
                  "col_name":"col2",
                  "value":11
               }
            ]
         }
      ],
      "coverage_formulas":[
         {
            "configuration_id":0,
            "coverage_id":0,
            "symbol_id":0,
            "values":[
               {
                  "col_name":"col1",
                  "value":10
               },
               {
                  "col_name":"col2",
                  "value":11
               }
            ]
         }
      ]
   };

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

  const selectSheetId = (id) =>{
    setSelectedSheetId(id);
  }

  const onEditing = () => {
    navigate("/editSheet", { state: { dummyData }});
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
          onEditing={onEditing}
          selectSheetId={selectSheetId}
        />
      </div>
    </div>
  );
};

export default SheetsDataTable;
