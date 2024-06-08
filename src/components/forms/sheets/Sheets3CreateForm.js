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
  Checkbox,
} from "@mui/material";
import FormContainer from "../../common/FormContainer";
import TypographyContainer from "../../common/TypographyContainer";

// Start relative variables
import { Sheet1DataColumns } from "../../../utils/constants/Constants";
import { CreateSheet } from "../../../utils/redux/actions/Sheets";
import { GetMT5Managers } from "../../../utils/redux/actions/Managers";
import { GetMT5SymbolConfigurations } from "../../../utils/redux/actions/SymbolConfigurations";
import FormulaDataGridTable from "../../common/FormulaDataGridTable";
// End relative variables

const Sheets3CreateForm = () => {
  const dispatch = useDispatch();
  const success = useSelector((state) => state.success);


  // Start relative variables

  const columns = Sheet1DataColumns;
  const mt5Managers = useSelector((state) => state.mt5Managers);
  const mt5SymbolConfigurations = useSelector(
    (state) => state.mt5SymbolConfigurations
  );
  const [managers, setManagers] = React.useState([]);
  const [symbolConfigurations, setSymbolConfigurations] = React.useState([]);
  const [formData, setFormData] = useState({
    [columns[1].dataField]: "",
    [columns[2].dataField]: true,
    [columns[3].dataField]: "",
    [columns[4].dataField]: "",
    [columns[5].dataField]: "",
  });
  const serverId = formData[columns[3].dataField];

  // End relative variables

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };




  const handleToggle = (event) => {
    const { name, checked } = event.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };






  React.useEffect(() => {
    if (mt5Managers) {
      setFormData({
        ...formData,
        [columns[4].dataField]: "",
        [columns[5].dataField]: "",
      });
      const server = mt5Managers.find((server) => server.server === serverId);
      const symbols = mt5SymbolConfigurations.filter(
        (config) => config.server_id === serverId
      );
      if (server && server.managers) {
        setManagers(server.managers);
        setSymbolConfigurations(symbols);
      }
    }
  }, [serverId]);

  return (
    <>
    
   

        

    <FormControl sx={{ minWidth: '223px'}} variant="outlined">
  <Autocomplete
    id="outlined-autocomplete"
    options={managers}
    getOptionLabel={(option) => option.Name}
    value={
      managers.filter(
        (manager) => formData[columns[4].dataField].includes(manager.Login)
      )
    }
    onChange={(event, newValue) => {
      const selectedManagers = newValue.map((option) => option.Login);
      handleChange({
        target: {
          name: columns[4].dataField,
          value: selectedManagers,
        },
      });
    }}
    multiple
    disableCloseOnSelect
    renderInput={(params) => (
      <TextField
        {...params}
        label={columns[4].caption}
        variant="outlined"
        required
      />
    )}
    renderOption={(props, option, { selected }) => (
      <li {...props}>
        <Checkbox
          checked={selected}
        />
        {option.Name}
      </li>
    )}
    renderTags={() => null} 
  />
</FormControl>




<FormControl sx={{ minWidth: '223px'}} variant="outlined">
  <Autocomplete
    id="outlined-autocomplete"
    options={symbolConfigurations}
    getOptionLabel={(option) => option.symbol}
    value={
      symbolConfigurations.find(
        (config) => formData[columns[5].dataField].includes(config.id)
      )
    }
    onChange={(event, newValue) => {
      const selectedsymbolConfigurations = newValue.map((option) => option.id);
      handleChange({
        target: {
          name: columns[5].dataField,
          value: selectedsymbolConfigurations,
        },
      });
    }}
    multiple
    disableCloseOnSelect
    renderInput={(params) => (
      <TextField
        {...params}
        label={columns[5].caption}
        variant="outlined"
        required
      />
    )}
    renderOption={(props, option, { selected }) => (
      <li {...props}>
        <Checkbox
          checked={selected}
        />
        {option.symbol}
      </li>
    )}
    renderTags={() => null}
  />
</FormControl>

   

       

 
 
    </>
  );
};

export default Sheets3CreateForm;
