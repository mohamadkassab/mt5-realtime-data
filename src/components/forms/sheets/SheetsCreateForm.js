import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VisibilityOff, Visibility } from "@mui/icons-material/";
import {
  Button,
  Typography,
  FormControl,
  InputLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Autocomplete,
  TextField,
  FormControlLabel,
  Switch,
  Container,
  Box,
  Paper,
} from "@mui/material";
import TypographyContainer from "../../common/TypographyContainer";
import PrimaryButton from "../../buttons/PrimaryButton";
import SecondaryButton from "../../buttons/SecondaryButton";
import { goBackFunc, goNextFunc } from "../../../utils/functions/Functions";
import { Sheet1DataColumns, Sheet2DataColumns } from "../../../utils/constants/Constants";

// Start relative variables
import Sheets1CreateForm from "./Sheets1CreateForm";
import Sheets2CreateForm from "./Sheets2CreateForm";
import Sheets3CreateForm from "./Sheets3CreateForm";
import Sheets4CreateForm from "./Sheets4CreateForm";
// End relative variables

const SheetsCreateForm = ({ createFormVisibility, refreshPage }) => {
  const success = useSelector((state) => state.success);

  const [sheetVisibility, setSheetVisibility] = React.useState([
    true,
    false,
    false,
    false,
  ]);

  // SHEET 1
  const columns1 = Sheet1DataColumns;
  const [formData1, setFormData1] = useState({
    [columns1[1].dataField]: "",
    [columns1[2].dataField]: true,
    [columns1[3].dataField]: "",
    [columns1[4].dataField]: [],
    [columns1[5].dataField]: [],
    [columns1[6].dataField]: 0,
    [columns1[7].dataField]: [],
    [columns1[8].dataField]: [],
  });

  
  const handleChangeformData1 = (event) => {
    setFormData1({
      ...formData1,
      [event.target.name]: event.target.value,
    });
  };

  // SHEET 2
  const [columns2, setColumns2] = useState(Sheet2DataColumns);
  const [formData2Symbols, setFormData2Symbols] = useState([]);
  const [formData2Suffixes, setFormData2Suffixes] = useState([]);



  const formTitle = "Create Sheet";
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const hideForm = () => {
    createFormVisibility(false);
  };

  const goBack = () => {
    goBackFunc(sheetVisibility, setSheetVisibility);
  };
  const goNext = () => {
    goNextFunc(sheetVisibility, setSheetVisibility);
  };

  React.useEffect(() => {
    if (success) {
      refreshPage();
    }
  }, [success]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "rgba(255, 255, 255, 1)",
        p: 3,
        borderRadius: 1,
        boxShadow: 3,
        zIndex: 1200,
        display: "flex",
        flexDirection: "column",
      }}
      component={Paper}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TypographyContainer>{formTitle}</TypographyContainer>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4  min-h-[50vh] flex items-center ">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {sheetVisibility[0] && <Sheets1CreateForm formData={formData1} columns={columns1} handleChangeformData={handleChangeformData1} />}
              {sheetVisibility[1] && <Sheets2CreateForm  columns1={columns1} columns2={columns2} setColumns2={setColumns2}  formData={formData1} handleChangeformData={handleChangeformData1} />}
              {sheetVisibility[2] && <Sheets3CreateForm />}
              {sheetVisibility[3] && <Sheets4CreateForm />}
            </div>
          </div>
        </form>
      </Box>
      <div className="flex justify-between  w-full">
        <div>
          <PrimaryButton caption="Save" type="submit" />
          <SecondaryButton onClick={hideForm} caption="Cancel" />
        </div>
        <div className="">
          <SecondaryButton onClick={goBack} caption="Back" />
          <PrimaryButton onClick={goNext} caption="Next" />
        </div>
      </div>
    </Container>
  );
};

export default SheetsCreateForm;


