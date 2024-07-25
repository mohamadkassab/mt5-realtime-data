import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box } from "@mui/material";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import { goBackFunc, goNextFunc } from "../../utils/functions/Functions";
import {
  ATFXTOKEN,
  SheetDataColumns,
  Sheet2DataColumns,
  Sheet3DataColumns,
} from "../../utils/constants/Constants";
import { GetSheetToEditIds } from "../../utils/redux/actions/Sheets";
import { GetManagers } from "../../utils/redux/actions/Managers";
import { GetMT5SymbolConfigurations } from "../../utils/redux/actions/SymbolConfigurations";
import { GetCoverageAccounts } from "../../utils/redux/actions/CoverageAccounts";
import { GetServers } from "../../utils/redux/actions/Servers";
import { GetMT5CoverageSymbols } from "../../utils/redux/actions/SymbolConfigurations";
import { useLocation } from "react-router-dom";
import HorizontalLinearStepper from "../common/HorizontalLinearStepper";
import { transformSheetData } from "../../utils/functions/Functions";
import { EditSheet } from "../../utils/redux/actions/Sheets";
import { GetMT5SymbolsConfigurationsAndSuffixes } from "../../utils/redux/actions/SymbolConfigurations";
import {transformData,transformCoverageData,} from "../../utils/functions/Functions";
import Sheets1CreateForm from "./Sheets1CreateForm";
import Sheets2CreateForm from "./Sheets2CreateForm";
import AddButton from "../buttons/AddButton";
import { cellRenderPercentage } from "../cellRendering/CellRendering";
import { jwtDecode } from "jwt-decode";
import InputDialog from "../common/InputDialog";
import { useCallback } from "react";

const SheetsEditForm = () => {
  const MemoizedSheets1CreateForm= React.memo(Sheets1CreateForm)
  const MemoizedSheets2CreateForm= React.memo(Sheets2CreateForm)
  const location = useLocation();
  const [sheetId, setSheetId] = useState({});
  const [sheetToEdit, setSheetToEdit] = useState({});
  const dispatch = useDispatch();
  const stepperRef = useRef();
  const mt5SymbolConfigurations = useSelector((state) => state.mt5SymbolConfigurations);
  const MT5SymbolsConfigurationsAndSuffixes = useSelector((state) => state.MT5SymbolsConfigurationsAndSuffixes);
  const sheetToEditIds = useSelector((state) => state.sheetToEditIds);
  const Managers = useSelector((state) => state.Managers);
  const MT5CoverageAccounts = useSelector((state) => state.CoverageAccounts);
  const MT5CoverageSymbols = useSelector((state) => state.MT5CoverageSymbols);
  const [isLastSheet, setIsLastSheet] = useState(false);
  const [isFormDataChanged, setIsFormDataChanged] = useState(false);
  const [isCoverageFormDataChanged, setIsCoverageFormDataChanged] = useState(false);
  const [symbolsFormulas, setSymbolsFormulas] = useState([]);
  const [coverageSymbolsFormulas, setCoverageSymbolsFormulas] = useState([]);
  const [selectedSymbolsData, setSelectedSymbolsData] = useState([]);
  const [selectedSymbols, setSelectedSymbols] = useState([]);
  const [showCaptionBox, setShowCaptionBox] = useState(false);
  const [columns2, setColumns2] = useState(Sheet2DataColumns);
  const [columns3, setColumns3] = useState(Sheet3DataColumns);
  const columns = SheetDataColumns;
  const [coverageAndSymbols, setCoverageAndSymbols] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [formData, setFormData] = useState({
    [columns[1].dataField]: "",
    [columns[2].dataField]: true,
    [columns[3].dataField]: "",
    [columns[4].dataField]: [],
    [columns[5].dataField]: [],
    [columns[6].dataField]: 0,
    [columns[7].dataField]: [],
    [columns[8].dataField]: [],
    [columns[9].dataField]: [],
    [columns[10].dataField]: [],
  });
  const steps = ["Managers & Coverages", "Formulas"];
  const confirmSentece = "Please enter a caption for the new formula";
  const dataName = "formulaCaption";
  const titleInputDialog = "Formula column caption";
  const [error, setError] = React.useState("");
  const isSymbolConfIdChange = formData[columns[5].dataField];
  const isManagerIdChange = formData[columns[4].dataField];
  const [sheetVisibility, setSheetVisibility] = React.useState([true, false]);
  const activeStepIndex = sheetVisibility.findIndex((value) => value === true);
  const activeStepLabel = activeStepIndex !== -1 ? steps[activeStepIndex] : "";

  const handleChangeFormData = (event) => {
    setIsFormDataChanged(true);
    let updatedFormData = {
      ...formData,
      [event.target.name]: event.target.value,
    };

    if (event.target.name === columns[5].dataField) {
      const selectedIds = event.target.value;
      const selectedSymbols = mt5SymbolConfigurations
        .filter((item) => selectedIds.includes(item.id))
        .map((item) => item.symbol);

      updatedFormData = {
        ...updatedFormData,
        [columns[9].dataField]: selectedSymbols,
      };
    } else if (event.target.name === columns[4].dataField) {
      const selectedManagersIds = event.target.value;
      const selectedManagers = Managers.filter((item) =>
        selectedManagersIds.includes(item.id)
      ).map((item) => item.name);
      updatedFormData = {
        ...updatedFormData,
        [columns[10].dataField]: selectedManagers,
      };
    }

    setFormData(updatedFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem(ATFXTOKEN);
    const decodedToken = jwtDecode(token);
    const transformedData = transformSheetData(
      decodedToken,
      formData,
      symbolsFormulas,
      coverageSymbolsFormulas,
      columns2
    );
    dispatch(EditSheet(transformedData, sheetId));
  };

  const handleAddColumn = (columnCaption) => {
    setShowCaptionBox(false);
    if (columnCaption !== "") {
      const sheet2ColumnsLength = Sheet2DataColumns.length;
      if (columns2.length < sheet2ColumnsLength + 4) {
        const newColumn = {
          dataField: `#${columns2.length - (sheet2ColumnsLength - 1)}`,
          caption: `#${
            columns2.length - (sheet2ColumnsLength - 1)
          }-${columnCaption}`,
          allowUpdating: true,
          dataType: "number",
          alignment: "left",
          cellRender: (cellData) => cellRenderPercentage(cellData),
        };
        setColumns2((prevState)=>{
          return [...prevState, newColumn]
        });
        setColumns2((prevState)=>{
          return [...prevState, newColumn]
        });
      }
    }
  };

  const handleShowInputDialog = () => {
    setShowCaptionBox(true);
  };

  const goBack = () => {
    setIsLastSheet(false);
    goBackFunc(sheetVisibility, setSheetVisibility);
    if (stepperRef.current) {
      stepperRef.current.handleBack();
    }
  };

  const goNext = () => {
    checkLastTrueIndex();
    goNextFunc(sheetVisibility, setSheetVisibility);
    if (stepperRef.current) {
      stepperRef.current.handleNext();
    }
  };

  const handleStepClick = (index) => {
    if(formData[columns[1].dataField]){
    const newSheetVisibility = sheetVisibility.map((_, i) => i === index);
    setSheetVisibility(newSheetVisibility);
    }   else{
      setError("This field is required");
    }

  };

  const checkLastTrueIndex = useCallback(() => {
    const index = sheetVisibility.indexOf(true);
    const isLast = index === sheetVisibility.length - 1;
    setIsLastSheet(isLast);
  },[sheetVisibility]);
  
  const getInitialData = useCallback(() =>{
    dispatch(GetServers());
    dispatch(GetManagers());
    dispatch(GetMT5SymbolConfigurations());
    dispatch(GetCoverageAccounts());
    dispatch(GetMT5CoverageSymbols());
  },[]);

  React.useEffect(() => {
    getInitialData()
  }, [dispatch]);

  React.useEffect(() => {
    setSheetId(location.state.selectedSheetId);
  }, []);

  React.useEffect(() => {
    dispatch(GetSheetToEditIds(sheetId));
  }, [sheetId]);

  React.useEffect(() => {
    setSheetToEdit(sheetToEditIds);
  }, [sheetToEditIds]);

  React.useEffect(() => {
   if(coverageAndSymbols === sheetToEdit?.coverages){
    setIsCoverageFormDataChanged(false);
   } else{
    setIsCoverageFormDataChanged(true);
   }
  }, [coverageAndSymbols]);

  React.useEffect(() => {
    const columnsFormulaLength =
    sheetToEdit?.formulas?.[0]?.values?.length ?? 0;
    const sheet2ColumnsLength = Sheet2DataColumns.length;
    const sheet3ColumnsLength = Sheet3DataColumns.length;
    const newColumns = [];

    for (let i = 0; i < columnsFormulaLength; i++) {
      const newColumn = {
        dataField: `#${columns2.length + i - (sheet2ColumnsLength - 1)}`,
        caption: `${sheetToEdit?.formulas[0]?.values[i].col_name}`,
        allowUpdating: true,
        dataType: "number",
        alignment: "left",
        cellRender: (cellData) => cellRenderPercentage(cellData),
      };
      newColumns.push(newColumn);
    }

    setColumns2((prevColumns) => {
      if (prevColumns.length > sheet2ColumnsLength) return prevColumns;
      return [...prevColumns, ...newColumns];
    });

    setColumns3((prevColumns) => {
      if (prevColumns.length > sheet3ColumnsLength) return prevColumns;
      return [...prevColumns, ...newColumns];
    });
  }, [sheetToEdit]);

  React.useEffect(() => {
if(mt5SymbolConfigurations, Managers, sheetToEdit){


    const selectedIds = sheetToEdit?.symbol_configuration || [];
    const selectedSymbols = mt5SymbolConfigurations
      .filter((item) => selectedIds.includes(item.id))
      .map((item) => item.symbol);

    const selectedManagersIds = sheetToEdit?.managers || [];
    const selectedManagers = Managers.filter((item) =>
      selectedManagersIds.includes(item.id)
    ).map((item) => item.name);

    setCoverageAndSymbols(sheetToEdit?.coverages);
    setFormData({
      [columns[1].dataField]: sheetToEdit?.sheet_name || "",
      [columns[2].dataField]:
        sheetToEdit?.visibility !== undefined ? sheetToEdit?.visibility : true,
      [columns[3].dataField]: sheetToEdit?.server_id || "",
      [columns[4].dataField]: sheetToEdit?.managers || [],
      [columns[5].dataField]: sheetToEdit?.symbol_configuration || [],
      [columns[6].dataField]:
        sheetToEdit?.dealer_id !== undefined ? sheetToEdit?.dealer_id : 0,
      [columns[7].dataField]: [],
      [columns[8].dataField]: [],
      [columns[9].dataField]: selectedSymbols || [],
      [columns[10].dataField]: selectedManagers || [],
    });   
  }
  }, [mt5SymbolConfigurations, Managers, sheetToEdit, columns]);

  // KEEP FORMULAS  UPDATED
  React.useEffect(() => {
    dispatch(GetMT5SymbolsConfigurationsAndSuffixes());
  }, [isSymbolConfIdChange, isManagerIdChange]);

  React.useEffect(() => {
    if (MT5SymbolsConfigurationsAndSuffixes) {
      setSelectedSymbols(
        mt5SymbolConfigurations
          .filter((item) => formData[columns[5].dataField].includes(item.id))
          .map((item) => item.symbol)
      );
    }
  }, [MT5SymbolsConfigurationsAndSuffixes]);

  React.useEffect(() => {
    if (selectedSymbols) {
      setSelectedSymbolsData(
        MT5SymbolsConfigurationsAndSuffixes.filter((item) =>
          selectedSymbols.includes(item.symbol)
        )
      );
    }
  }, [selectedSymbols]);

  React.useEffect(() => {
  if(Managers && selectedSymbolsData.length > 0){
  setSymbolsFormulas(
    transformData(
      selectedSymbolsData,
      Managers,
      formData[columns[10].dataField],
      formData[columns[4].dataField],
      sheetToEdit,
      isFormDataChanged,
      symbolsFormulas
    )
  );
}}, [isFormDataChanged, selectedSymbolsData, Managers]);

React.useEffect(() => {
  if(MT5CoverageAccounts && MT5CoverageSymbols){
      setCoverageSymbolsFormulas(
        transformCoverageData(
          coverageAndSymbols,
          MT5CoverageAccounts,
          MT5CoverageSymbols,
          sheetToEdit,
          isCoverageFormDataChanged,
          coverageSymbolsFormulas
        )
      );
    }
  }, [coverageAndSymbols, MT5CoverageAccounts, MT5CoverageSymbols, isCoverageFormDataChanged]);
  // END OF KEEP FORMULAS  UPDATED

  React.useEffect(() => {
    checkLastTrueIndex();
  }, [sheetVisibility]);

  return (
    <div className="">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4  flex items-center border border-primary rounded px-8 mt-8">
            <div className="flex flex-col items-center">
              <div className=" grid grid-cols-3 mt-8">
                <div className="flex justify-center items-center">
                  <HorizontalLinearStepper
                    ref={stepperRef}
                    steps={steps}
                    onStepClick={handleStepClick}
                  />
                </div>
                <div className="flex justify-center items-center">
                  <Typography variant="h5">{activeStepLabel}</Typography>
                </div>
                <div className="flex justify-end items-center">
                  {sheetVisibility[1] && (
                    <AddButton
                      onClick={handleShowInputDialog}
                      caption="Formula"
                    />
                  )}
                </div>
              </div>

              <div className="min-h-[50vh] flex items-center">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 ">
                  {showCaptionBox && (
                    <InputDialog
                      title={titleInputDialog}
                      onSubmit={handleAddColumn}
                      confirmSentece={confirmSentece}
                      dataName={dataName}
                    />
                  )}
                  {sheetVisibility[0] && (
                    <Sheets1CreateForm
                      formData={formData}
                      columns={columns}
                      handleChangeFormData={handleChangeFormData}
                      coverageAndSymbols={coverageAndSymbols}
                      setCoverageAndSymbols={setCoverageAndSymbols}
                      error={error}
                      setError={setError}
                    />
                  )}
                  {sheetVisibility[1] && (
                    <Sheets2CreateForm
                      columns2={columns2}
                      setColumns2={setColumns2}
                      columns3={columns3}
                      setColumns3={setColumns3}
                      symbolsFormulas={symbolsFormulas}
                      setSymbolsFormulas={setSymbolsFormulas}
                      coverageSymbolsFormulas={coverageSymbolsFormulas}
                      setCoverageSymbolsFormulas={setCoverageSymbolsFormulas}
                    />
                  )}
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </form>
      </Box>
      <div className="flex justify-center  w-full">
        <div className="">
          <SecondaryButton onClick={goBack} caption="Back" />
          {isLastSheet ? (
            <PrimaryButton caption="Save" onClick={handleSubmit} />
          ) : (
            <PrimaryButton onClick={goNext} caption="Next" />
          )}
        </div>
      </div>
    </div>
  );
};

export default SheetsEditForm;
