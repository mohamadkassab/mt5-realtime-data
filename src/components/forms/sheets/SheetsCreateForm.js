import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box } from "@mui/material";
import PrimaryButton from "../../buttons/PrimaryButton";
import SecondaryButton from "../../buttons/SecondaryButton";
import { goBackFunc, goNextFunc } from "../../../utils/functions/Functions";
import {
  ATFXTOKEN,
  SheetDataColumns,
  Sheet2DataColumns,
  Sheet3DataColumns,
} from "../../../utils/constants/Constants";
import { GetManagers } from "../../../utils/redux/actions/Managers";
import { GetMT5SymbolConfigurations } from "../../../utils/redux/actions/SymbolConfigurations";
import { GetCoverageAccounts } from "../../../utils/redux/actions/CoverageAccounts";
import { GetServers } from "../../../utils/redux/actions/Servers";
import { GetMT5CoverageSymbols } from "../../../utils/redux/actions/SymbolConfigurations";
import HorizontalLinearStepper from "../../common/HorizontalLinearStepper";
import { transformSheetData } from "../../../utils/functions/Functions";
import { CreateSheet } from "../../../utils/redux/actions/Sheets";
import { GetMT5SymbolsConfigurationsAndSuffixes } from "../../../utils/redux/actions/SymbolConfigurations";
import {
  transformData,
  transformCoverageData,
} from "../../../utils/functions/Functions";
import Sheets1CreateForm from "./Sheets1CreateForm";
import Sheets2CreateForm from "./Sheets2CreateForm";
import AddButton from "../../buttons/AddButton";
import { cellRenderPercentage } from "../../cellRendering/CellRendering";
import { jwtDecode } from "jwt-decode";
import InputDialog from "../../common/InputDialog";

const SheetsCreateForm = () => {
  const dispatch = useDispatch();
  const stepperRef = useRef();
  const mt5SymbolConfigurations = useSelector(
    (state) => state.mt5SymbolConfigurations
  );
  const MT5SymbolsConfigurationsAndSuffixes = useSelector(
    (state) => state.MT5SymbolsConfigurationsAndSuffixes
  );
  const Managers = useSelector((state) => state.Managers);
  const mt5CoverageAccounts = useSelector((state) => state.CoverageAccounts);
  const MT5CoverageSymbols = useSelector((state) => state.MT5CoverageSymbols);
  const [isLastSheet, setIsLastSheet] = useState(false);
  const [symbolsFormulas, setSymbolsFormulas] = useState([]);
  const [coverageSymbolsFormulas, setCoverageSymbolsFormulas] = useState([]);
  const [selectedSymbolsData, setSelectedSymbolsData] = useState([]);
  const [selectedSymbols, setSelectedSymbols] = useState([]);
  const [showCaptionBox, setShowCaptionBox] = useState(false);
  const [columns2, setColumns2] = useState(Sheet2DataColumns);
  const [columns3, setColumns3] = useState(Sheet3DataColumns);
  const columns = SheetDataColumns;
  const [coverageAndSymbols, setCoverageAndSymbols] = useState("");
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
  const isSymbolConfIdChange = formData[columns[5].dataField];
  const isManagerIdChange = formData[columns[4].dataField];
  const [sheetVisibility, setSheetVisibility] = React.useState([true, false]);
  const activeStepIndex = sheetVisibility.findIndex((value) => value === true);
  const activeStepLabel = activeStepIndex !== -1 ? steps[activeStepIndex] : "";

  const handleChangeFormData = (event) => {
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
    if (formData[columns[1].dataField] === "") {
      return;
    }
    console.log(transformedData);
    dispatch(CreateSheet(transformedData));
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
        setColumns2([...columns2, newColumn]);
        setColumns3([...columns3, newColumn]);
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

  const checkLastTrueIndex = () => {
    const index = sheetVisibility.indexOf(true);
    const isLast = index === sheetVisibility.length - 1;
    setIsLastSheet(isLast);
  };

  const handleStepClick = (index) => {
    const newSheetVisibility = sheetVisibility.map((_, i) => i === index);
    setSheetVisibility(newSheetVisibility);
  };

  React.useEffect(() => {
    dispatch(GetServers());
    dispatch(GetManagers());
    dispatch(GetMT5SymbolConfigurations());
    dispatch(GetCoverageAccounts());
    dispatch(GetMT5CoverageSymbols());
  }, [dispatch]);

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
    if (Managers && selectedSymbolsData.length > 0) {
      setSymbolsFormulas(
        transformData(
          selectedSymbolsData,
          Managers,
          formData[columns[10].dataField],
          formData[columns[4].dataField],
          [],
          true,
          symbolsFormulas
        )
      );
    }
  }, [selectedSymbolsData, Managers]);

  React.useEffect(() => {
    setCoverageSymbolsFormulas(
      transformCoverageData(
        coverageAndSymbols,
        mt5CoverageAccounts,
        MT5CoverageSymbols,
        [],
        true,
        coverageSymbolsFormulas
      )
    );
  }, [coverageAndSymbols]);

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

export default SheetsCreateForm;
