import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddButton from "../buttons/AddButton";
import EditButton from "../buttons/EditButtons";
import SheetHeaderCell from "./SheetHeaderCell";

const ConfigurationSheet = ({ sheet }) => {
  const [ruleNames, setRuleNames] = useState([]);
  const [totalsSymbols, setTotalsSymbols] = useState({});
  const [totalsSheets, setTotalsSheets] = useState({});

  React.useEffect(() => {
    if (sheet.dealer_configurations && sheet.dealer_configurations.length > 0) {
      const firstDealerConfig = sheet.dealer_configurations[0];
      if (firstDealerConfig.Rules && firstDealerConfig.Rules.length > 0) {
        const ruleNamesArray = firstDealerConfig.Rules.map((rule) => rule.name);
        setRuleNames(ruleNamesArray);
      }
    }
  }, []);

  React.useEffect(() => {
    if (sheet?.dealer_configurations) {
      const newTotalsSymbols = {};
      const newTotalsSheet = {
        dealer_conf: { totalBuySheet: 0, totalSellSheet: 0 },
      };

      sheet.dealer_configurations.forEach((config, index) => {
        const mainSymbol = config.MainSymbol;
        newTotalsSheet["dealer_conf"].totalBuySheet += index * index;
        newTotalsSheet["dealer_conf"].totalSellSheet += (index * index) / 1.6;
        if (!newTotalsSymbols[mainSymbol]) {
          newTotalsSymbols[mainSymbol] = {
            totalBuySymbol: index * index,
            totalSellSymbol: (index * index) / 1.6,
          };
        } else {
          newTotalsSymbols[mainSymbol].totalBuySymbol += index * index;
          newTotalsSymbols[mainSymbol].totalSellSymbol += (index * index) / 1.6;
        }
      });
      setTotalsSheets(newTotalsSheet);
      setTotalsSymbols(newTotalsSymbols);
    }
  }, [sheet]);

  React.useEffect(() => {
    if (sheet?.COVERAGE_DETAILS) {
      const newTotalsSheet = {
        coverage_conf: { totalBuySheet: 0, totalSellSheet: 0 },
      };

      sheet.COVERAGE_DETAILS.forEach((config, index) => {
        newTotalsSheet["coverage_conf"].totalBuySheet += index * index;
        newTotalsSheet["coverage_conf"].totalSellSheet += (index * index) / 1.6;
      });
      setTotalsSheets(newTotalsSheet);
    }
  }, [sheet]);

  return (
    <Box elevation={3}>
      <TableContainer
        component={Box}
        sx={{
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <SheetHeaderCell caption={`Manager / Coverage`} />
              <SheetHeaderCell caption={`Symbol`} />
              <SheetHeaderCell caption={`Buy Vol`} />
              <SheetHeaderCell caption={`Sell Vol`} />
              <SheetHeaderCell caption={`Net Vol`} />
              {ruleNames.map((name, index) => (
                <>
                  <SheetHeaderCell caption={name || `formula-${index + 1}`} />
                  <SheetHeaderCell caption={`Result ${index + 1}`} />
                </>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {sheet?.dealer_configurations?.map((config, index) => {
              const nextConfig = sheet?.dealer_configurations?.[index + 1];
              return (
                <>
                  <TableRow key={index}>
                    <TableCell>{config.Login}</TableCell>
                    <TableCell
                      style={
                        config.SymbolSuffix === config.MainSymbol
                          ? { fontWeight: "bold", color: "green" }
                          : {}
                      }
                    >
                      {config.SymbolSuffix}
                    </TableCell>
                    <TableCell>{index * index}</TableCell>
                    <TableCell>{(index * index) / 1.6}</TableCell>
                    <TableCell>
                      {(index * index - (index * index) / 1.6).toFixed(3)}
                    </TableCell>

                    {config.Rules?.map((rule, ruleIndex) => (
                      <>
                        <TableCell>{`${rule.value}%`}</TableCell>
                        <TableCell>
                          {(
                            (index * index - (index * index) / 1.6) *
                            (rule.value / 100)
                          ).toFixed(3)}
                        </TableCell>
                      </>
                    ))}
                  </TableRow>

                  {nextConfig?.MainSymbol !== config.MainSymbol && (
                    <TableRow
                      key={`total-${sheet.dealer_configurations.MainSymbol}`}
                    >
                      <TableCell></TableCell>
                      <TableCell
                        sx={{
                          background: "#2e7d32",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        {`Total`}{" "}
                      </TableCell>
                      <TableCell>
                        {totalsSymbols[config.MainSymbol]?.totalBuySymbol || 0}
                      </TableCell>
                      <TableCell>
                        {totalsSymbols[config.MainSymbol]?.totalSellSymbol || 0}
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  )}
                </>
              );
            })}

            {sheet?.dealer_configurations?.length > 0 && (
              <>
                <TableRow
                  key={`total-${sheet.dealer_configurations.MainSymbol}`}
                >
                  <TableCell></TableCell>
                  <TableCell
                    sx={{
                      background: "#325a7d",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {`Total`}
                  </TableCell>
                  <TableCell>
                    {totalsSheets["dealer_conf"]?.totalBuySheet || 0}
                  </TableCell>
                  <TableCell>
                    {totalsSheets["dealer_conf"]?.totalSellSheet || 0}
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </>
            )}

            {sheet?.COVERAGE_DETAILS?.map((config, index) => {
              return (
                <>
                  <TableRow key={index}>
                    <TableCell>{config.Coverage}</TableCell>
                    <TableCell>{config.Symbol}</TableCell>
                    <TableCell>{index * index}</TableCell>
                    <TableCell>{(index * index) / 1.6}</TableCell>
                    <TableCell>
                      {(index * index - (index * index) / 1.6).toFixed(3)}
                    </TableCell>

                    {config.Rules?.map((rule, ruleIndex) => (
                      <>
                        <TableCell>{`${rule.value}%`}</TableCell>
                        <TableCell>
                          {(
                            (index * index - (index * index) / 1.6) *
                            (rule.value / 100)
                          ).toFixed(3)}
                        </TableCell>
                      </>
                    ))}
                  </TableRow>
                </>
              );
            })}

            {sheet?.COVERAGE_DETAILS?.length > 0 && (
              <>
                <TableRow
                  key={`total-${sheet.dealer_configurations.MainSymbol}`}
                >
                  <TableCell></TableCell>
                  <TableCell
                    sx={{
                      background: "#325a7d",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {`Total`}
                  </TableCell>
                  <TableCell>
                    {totalsSheets["coverage_conf"]?.totalBuySheet || 0}
                  </TableCell>
                  <TableCell>
                    {totalsSheets["coverage_conf"]?.totalSellSheet || 0}
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </>
            )}

            <TableRow key={`total-${sheet.dealer_configurations.MainSymbol}`}>
              <TableCell></TableCell>
              <TableCell
                sx={{
                  background: "#020817",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {`Covered`}
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

const ConfigurationList = ({ sheets, onInserting }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <Box>
      <div className="flex items-center justify-between">
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          {sheets.map((sheet, index) => (
            <Tab
              label={sheet.sheet_name}
              key={index}
              sx={{ fontWeight: 700 }}
            />
          ))}
        </Tabs>
        <div className="flex gap-4">
          <EditButton onClick={onInserting} />
          <AddButton onClick={onInserting} />
        </div>
      </div>
      {sheets.map((sheet, index) => (
        <Box
          role="tabpanel"
          hidden={selectedTab !== index}
          id={`tabpanel-${index}`}
          key={index}
        >
          {selectedTab === index && <ConfigurationSheet sheet={sheet} />}
        </Box>
      ))}
    </Box>
  );
};

export default ConfigurationList;
