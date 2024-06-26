import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ConfigurationList from "../forms/sheets/SheetDataDisplay";
import { GetSheets } from "../../utils/redux/actions/Sheets";

const SheetsDataTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedSheetId, setSelectedSheetId] = useState(0);
  const [selectedSheetName, setSelectedSheetName] = useState("");
  const sheets = useSelector((state) => state.sheets);

  // const [sheets, setSheets] = useState([
  //   {
  //     sheet_id: 97,
  //     sheet_name: "sheet 1",
  //     dealer_configuration_id: 121,
  //     dealer_configurations: [
  //       {
  //         Dealer_Conf_Manager_id: 674,
  //         server_name: "Dev",
  //         Login: 1000,
  //         SymbolSuffix: "XAUUSD",
  //         MainSymbol: "XAUUSD",
  //         BuyVol:1,
  //         SellVol:2,
  //         Rules: [
  //           { name: "#1-col1", value: "10" },
  //           { name: "#2-col2", value: "11" },
  //         ],
  //       },
  //       {
  //         Dealer_Conf_Manager_id: 675,
  //         Name: "Dev",
  //         Login: 1000,
  //         SymbolSuffix: "XAUUSD.v",
  //         MainSymbol: "XAUUSD",
  //         BuyVol:3,
  //         SellVol:4,
  //         Rules: [
  //           { name: "#1-col1", value: "12" },
  //           { name: "#2-col2", value: "13" },
  //         ],
  //       },
  //       {
  //         Dealer_Conf_Manager_id: 676,
  //         server_name: "Dev",
  //         Login: 1000,
  //         SymbolSuffix: "EURUSD",
  //         MainSymbol: "EURUSD",
  //         BuyVol:10,
  //         SellVol:21,
  //         Rules: [
  //           { name: "#1-col1", value: "10" },
  //           { name: "#2-col2", value: "11" },
  //         ],
  //       },
  //       {
  //         Dealer_Conf_Manager_id: 675,
  //         Name: "Dev",
  //         Login: 1000,
  //         SymbolSuffix: "EURUSD.v",
  //         MainSymbol: "EURUSD",
  //         BuyVol:11,
  //         SellVol:15,
  //         Rules: [
  //           { name: "#1-col1", value: "12" },
  //           { name: "#2-col2", value: "13" },
  //         ],
  //       },
  //     ],
  //     COVERAGE_DETAILS: [
  //       {
  //         Dealer_Conf_coverage_id: 675,
  //         server_name: "Dev",
  //         Coverage: "coverage account",
  //         Symbol: "XAUUSD",
  //         BuyVol:1,
  //         SellVol:2,
  //         Rules: [
  //           { name: "#1-col1", value: "12" },
  //           { name: "#2-col2", value: "13" },
  //         ],
  //       },
  //       {
  //         Dealer_Conf_coverage_id: 675,
  //         server_name: "Dev",
  //         Login: 1000,
  //         Symbol: "EURUSD",
  //         BuyVol:44,
  //         SellVol:12,
  //         Rules: [
  //           { name: "#1-col1", value: "12" },
  //           { name: "#2-col2", value: "13" },
  //         ],
  //       },
  //     ],
  //   }
  // ]);


  // const getRandomInt = (min, max) => {
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // };

  // const updateData = () => {
  //   const newSheets = sheets.map(sheet => ({
  //     ...sheet,
  //     dealer_configurations: sheet.dealer_configurations.map(config => ({
  //       ...config,
  //       BuyVol:getRandomInt(10, 20),
  //       SellVol:getRandomInt(10, 20),
  //     })),
  //     COVERAGE_DETAILS: sheet.COVERAGE_DETAILS.map(detail => ({
  //       ...detail,
  //       BuyVol:getRandomInt(10, 20),
  //       SellVol:getRandomInt(10, 20),
  //     })),
  //   }));

  //   setSheets(newSheets);
  // };

  // useEffect(() => {
  //   const intervalId = setInterval(updateData, 1000);
  //   return () => clearInterval(intervalId);
  // }, [sheets]);

  React.useEffect(() => {
    dispatch(GetSheets());
  }, [dispatch]);

  React.useEffect(() => {
    console.log(sheets);
  }, [sheets]);

  const onEditing = () => {
    navigate("/editSheet", { state: { selectedSheetId }});
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
          selectedSheetId={selectedSheetId}
          setSelectedSheetId={setSelectedSheetId}
          selectedSheetName={selectedSheetName}
          setSelectedSheetName={setSelectedSheetName}
        />
      </div>
    </div>
  );
};

export default SheetsDataTable;
