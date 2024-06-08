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

const Sheets1CreateForm = ({formData, columns, handleChangeformData}) => {

 
  const mt5Managers = useSelector((state) => state.mt5Managers);
  const mt5SymbolConfigurations = useSelector(
    (state) => state.mt5SymbolConfigurations
  );
  const [managers, setManagers] = React.useState([]);
  const [symbolConfigurations, setSymbolConfigurations] = React.useState([]);

  const serverId = formData[columns[3].dataField];

  // End relative variables



  const handleToggle = (event) => {
    const { name, checked } = event.target;
    handleChangeformData({
      target: {
        name: name,
        value: checked ,
      },
    });
  };

  React.useEffect(() => {
    if (mt5Managers) {

      setManagers([]);
      setSymbolConfigurations([]);
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
      <TextField
        type="text"
        variant="outlined"
        required
        name={columns[1].dataField}
        label={columns[1].caption}
        value={formData[columns[1].dataField]}
        onChange={handleChangeformData}
        
      />

      <FormControl sx={{ width: "100%" }} variant="outlined">
        <Autocomplete
          id="outlined-autocomplete"
          options={mt5Managers}
          getOptionLabel={(option) => option.server_name}
          value={
            mt5Managers.find(
              (manager) => manager.server === formData[columns[3].dataField]
            ) || null
          }
          onChange={(event, newValue) => {
            handleChangeformData({
              target: {
                name: columns[3].dataField,
                value: newValue ? newValue.server : "",
              },
            });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={columns[3].caption}
              variant="outlined"
              required
            />
          )}
        />
      </FormControl>

      <FormControl sx={{ width: "100%" }} variant="outlined">
        <Autocomplete
          id="outlined-autocomplete"
          options={managers}
          getOptionLabel={(option) => option.Name}
          value={managers.filter((manager) =>
            formData[columns[4].dataField].includes(manager.Login)
          )}
          onChange={(event, newValue) => {
            const selectedItems = newValue.map((option) => option.Login);
            handleChangeformData({
              target: {
                name: columns[4].dataField,
                value: selectedItems ? selectedItems : [],
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
              <Checkbox checked={selected} />
              {option.Name}
            </li>
          )}
          renderTags={() => null}
        />
      </FormControl>

      <FormControl sx={{ width: '100%' }} variant="outlined">
      <Autocomplete
        id="outlined-autocomplete"
        options={symbolConfigurations}
        getOptionLabel={(option) => option.symbol}
        value={symbolConfigurations.filter((config) =>
          formData[columns[5].dataField].includes(config.id)
        )}
        onChange={(event, newValue) => {
          const selectedItems = newValue.map((option) => option.id);
          handleChangeformData({
            target: {
              name: columns[5].dataField,
              value: selectedItems ? selectedItems : [],
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
            <Checkbox checked={selected} />
            {option.symbol}
          </li>
        )}
        renderTags={() => null}
      />
    </FormControl>

      <div className="flex justify-center">
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={formData[columns[2].dataField]}
              onChange={handleToggle}
              name={columns[2].dataField}
            />
          }
          label={formData[columns[2].dataField] ? "Public" : "Private"}
        />
      </div>
    </>
  );
};

export default Sheets1CreateForm;
