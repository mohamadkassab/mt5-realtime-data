import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FormControl,
  Autocomplete,
  TextField,
  FormControlLabel,
  Switch,
  Checkbox,
  Box,
  Popper,
} from "@mui/material";

// Start relative variables
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
// End relative variables

const Sheets1CreateForm = ({
  formData,
  columns,
  handleChangeFormData,
  coverageAndSymbols,
  setCoverageAndSymbols,
}) => {
  const [touched, setTouched] = React.useState(false);
  const [error, setError] = React.useState('');
  const Managers = useSelector((state) => state.Managers);
  const [managers, setManagers] = React.useState(Managers);
  const Servers = useSelector((state) => state.Servers);
  const mt5SymbolConfigurations = useSelector(
    (state) => state.mt5SymbolConfigurations
  );
  const [symbolConfigurations, setSymbolConfigurations] = React.useState([]);
  const mt5CoverageAccounts = useSelector((state) => state.CoverageAccounts);
  const MT5CoverageSymbols = useSelector((state) => state.MT5CoverageSymbols);
  const serverId = formData[columns[3].dataField];

  // End relative variables



  React.useEffect(() => {
    try {
      const filteredManager = Managers.filter(
        (manager) => manager.server_id === serverId
      );
      const symbols = mt5SymbolConfigurations.filter(
        (config) => config.server_id === serverId
      );
      setManagers(filteredManager);
      setSymbolConfigurations(symbols.length ? symbols : []);
    } catch (e) {}
  }, [Managers, serverId, mt5SymbolConfigurations]);

  const handleToggle = (event) => {
    const { name, checked } = event.target;
    handleChangeFormData({
      target: {
        name: name,
        value: checked,
      },
    });
  };

  const addCoverageAccount = () => {
    const newData = {
      coverageId: "",
      symbols: [],
    };
    setCoverageAndSymbols((prevData) => [...prevData, newData]);
  };

  const removeCoverageAccount = (index) => {
    setCoverageAndSymbols(coverageAndSymbols.filter((_, i) => i !== index));
  };

  const updateDataAtIndex = (index, newData, dataField) => {
    if (dataField === "coverageId") {
      const newCoverageAndSymbols = [...coverageAndSymbols];
      newCoverageAndSymbols[index].coverageId = newData;
      setCoverageAndSymbols(newCoverageAndSymbols);
    } else {
      const newCoverageAndSymbols = [...coverageAndSymbols];
      newCoverageAndSymbols[index] = {
        ...newCoverageAndSymbols[index],
        symbols: newData,
      };
      setCoverageAndSymbols(newCoverageAndSymbols);
    }
  };
  
  const handleBlur = () => {
    setTouched(true);
    if (!formData[columns[1].dataField]) {
      setError('This field is required');
    } else {
      setError('');
    }
  };

  const handleChange = (e) => {
    handleChangeFormData(e);
    if (touched && e.target.value) {
      setError('');
    }
  };

  return (
    <>
      <TextField
        type="text"
        variant="outlined"
        required
        name={columns[1].dataField}
        label={columns[1].caption}
        value={formData[columns[1].dataField]}
        onChange={handleChange}
        onBlur={handleBlur}
        error={!!error}
        helperText={error}
        sx={{
          width: "100%",
          "@media (min-width: 1000px)": {},
        }}
      />

      <FormControl
            sx={{
              width: "100%",
              "@media (min-width: 1000px)": {},
            }}
        variant="outlined"
      >
        <Autocomplete
          id="outlined-autocomplete"
          options={Servers}
          getOptionLabel={(option) => option.server_name}
          value={
            Servers.find(
              (server) => server.id === formData[columns[3].dataField]
            ) || null
          }
          onChange={(event, newValue) => {
            handleChangeFormData({
              target: {
                name: columns[3].dataField,
                value: newValue ? newValue.id : "",
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

      <FormControl
          sx={{
            width: "100%",
            "@media (min-width: 1000px)": {},
          }}
        variant="outlined"
      >
        <Autocomplete
          id="outlined-autocomplete"
          options={managers}
          getOptionLabel={(option) => option.name}
          value={managers.filter((manager) =>
            formData[columns[4].dataField].includes(manager.id)
          )}
          onChange={(event, newValue) => {
            const selectedItems = newValue.map((option) => option.id);
            handleChangeFormData({
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
          renderOption={(props, option, { selected }) => {
            const { key, ...rest } = props;
            return (
              <li key={option.id} {...rest}>
                <Checkbox checked={selected} />
                {option.name}
              </li>
            );
          }}
          // renderTags={() => null}
        />
      </FormControl>

      <FormControl
            sx={{
              width: "100%",
              "@media (min-width: 1000px)": {},
            }}
        variant="outlined"
      >
        <Autocomplete
          id="outlined-autocomplete"
          options={symbolConfigurations}
          getOptionLabel={(option) => option.symbol}
          value={symbolConfigurations.filter((config) =>
            formData[columns[5].dataField].includes(config.id)
          )}
          onChange={(event, newValue) => {
            const selectedItems = newValue.map((option) => option.id);
            handleChangeFormData({
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
          renderOption={(props, option, { selected }) => {
            const { key, ...rest } = props;
            return (
              <li key={key} {...rest}>
                <Checkbox checked={selected} />
                {option.symbol}
              </li>
            );
          }}
          // renderTags={() => null}
        />
      </FormControl>

      <ListItemButton
        sx={{
          justifyContent: "initial",
          px: 1,
          maxWidth: 250,
        }}
        onClick={addCoverageAccount}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: 3,
            justifyContent: "initial",
          }}
        >
          <AddCircleOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="Add Coverage Account" sx={{ opacity: 1 }} />
      </ListItemButton>

      <div className="flex justify-center">
        <label className="mr-2 flex items-center">Visibility</label>
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
      <div className="col-span-2 gridContainer">
        <Box
          className="gridContainer"
          sx={{
            overflow: "auto",

            width: "100%",
            display: coverageAndSymbols?.length > 0 ? "block" : "block",
          }}
        >
          <div className="grid grid-cols-1 mt-1">
            {Array.isArray(coverageAndSymbols) &&
              coverageAndSymbols.map((coverageAccount, rowKey) => {
                const index = coverageAndSymbols?.length - 1 - rowKey;
                return (
                  <div className="flex gap-4 mb-4  items-center" key={index}>
                    <FormControl
                      sx={{
                        width: "100%",
                        "@media (min-width: 1000px)": {},
                      }}
                      variant="outlined"
                    >
                      <Autocomplete
                        key={index}
                        options={mt5CoverageAccounts.filter(
                          (account) =>
                            !coverageAndSymbols.some(
                              (coverage) => coverage.coverageId === account.id
                            )
                        )}
                        getOptionLabel={(option) => option.name}
                        value={
                          mt5CoverageAccounts.find(
                            (option) =>
                              coverageAndSymbols[index]?.coverageId ===
                              option.id
                          ) || null
                        }
                        onChange={(event, newValue) => {
                          updateDataAtIndex(
                            index,
                            newValue ? newValue.id : null,
                            "coverageId"
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Coverage Account"
                            variant="outlined"
                            required
                          />
                        )}
                        disableClearable
                        isOptionEqualToValue={(option, value) =>
                          option.id === value.id
                        }
                        PopperComponent={(props) => (
                          <Popper
                            {...props}
                            sx={{ maxHeight: 300 }}
                            placement="bottom-start"
                          />
                        )}
                      />
                    </FormControl>
                    
                  <FormControl
                    sx={{
                      width: "100%",
                      "@media (min-width: 1000px)": {},
                    }}
                    variant="outlined"
                  >
                    <Autocomplete
                      id="outlined-autocomplete"
                      options={MT5CoverageSymbols.filter(
                        (symbol) =>
                          symbol.coverage_id ===
                        coverageAndSymbols[index].coverageId
                      )}
                      getOptionLabel={(option) => option.Symbol}
                      value={MT5CoverageSymbols.filter((symbol) => 
                        coverageAndSymbols[index]?.symbols?.includes(symbol.Symbol_ID)
                      )}
                      onChange={(event, newValue) => {
                        const selectedItems = newValue.map(
                          (option) => option.Symbol_ID
                        );
                        updateDataAtIndex(index, selectedItems);
                      }}
                      multiple
                      disableCloseOnSelect
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Coverage symbol configuration"
                          variant="outlined"
                          required
                        />
                      )}
                      renderOption={(props, option, { selected }) => {
                        const { key, ...rest } = props;
                        return (
                          <li key={key} {...rest}>
                            <Checkbox checked={selected} />
                            {option.Symbol}
                          </li>
                        );
                      }}
                      // renderTags={() => null}
                    />
                  </FormControl>

                    <div className="flex w-full max-w-[50px]">
                      <ListItemButton
                        key={`listitembutton-${index}`}
                        sx={{
                          margin: "1rem",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onClick={(event) => removeCoverageAccount(index)}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            justifyContent: "initial",
                          }}
                        >
                          <RemoveCircleOutlineIcon />
                        </ListItemIcon>
                      </ListItemButton>
                    </div>
                  </div>
                );
              })}
          </div>
        </Box>
      </div>
    </>
  );
};

export default Sheets1CreateForm;
