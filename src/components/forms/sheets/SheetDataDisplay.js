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
  TableFooter
} from "@mui/material";
import { useDispatch } from "react-redux";
import { DeleteSheet } from "../../../utils/redux/actions/Sheets";
import AddButton from "../../buttons/AddButton";
import EditButton from "../../buttons/EditButtons";
import { SheetHeaderCell } from "../../cellRendering/CellRendering";
import DeleteButton from "../../buttons/DeleteButton";
import ConfirmDialaog from "../../common/ConfirmDialog";
import { GetSheets } from "../../../utils/redux/actions/Sheets";
import { KeyboardArrowDown, KeyboardArrowUp, KeyboardArrowUpRounded } from '@mui/icons-material';
import {toFixedIfNeeded} from "../../../utils/functions/Functions"
import { DECIMAL_POINTS } from "../../../utils/constants/Constants";

const ConfigurationSheet = ({ sheet, realTimeData }) => {
  const [rulesName, setRulesName] = useState([]);
  const [totalByConf, setTotalByConf] = useState({});
  const [totalByManyConf, setTotalByManyConf] = useState({});
  const [totalByManyConfCov, setTotalByManyConfCov] = useState({});
  const [totalByManyCoverageConf, setTotalByManyCoverageConf] = useState({});
  const [totalCovered, setTotalCovered] = useState({});
  const [totalConfFiltered, setTotalConfFiltered] = useState([]);
  const [totalTopConfFiltered, setTotalTopConfFiltered] = useState([]);
  const [showCollapseRows, setShowCollapseRows] = useState([]);
  const MemoizedTableRow = React.memo(TableRow);


  const showCollapse = (groupName)=>{
    const newArray = showCollapseRows.map((item, index)=>{
      if(item.groupName === groupName){
        return {
          ...item,
          isDisplayed: !(item.isDisplayed)
        }
      }
      else{
        return {...item}
      }
    })
    setShowCollapseRows(newArray)
  }
  // start grouping algorithm
  React.useEffect(() => {
    const dealer_configurations = sheet?.dealer_configurations;
    const newArray = dealer_configurations.map((obj, index, arr) => {
      if (index < arr.length - 1) {
        if ((obj.MainSymbol !== arr[index + 1].MainSymbol) || (obj.Login !== arr[index + 1].Login)) {
          return `${sheet.sheet_id}${obj.MainSymbol}${obj.Login}`;
        } else {
          return "";
        }
      }
      return `${sheet.sheet_id}${obj.MainSymbol}${obj.Login}`;
    });
    setTotalConfFiltered(newArray);
  }, [sheet]);
  
   React.useEffect(() => {
    let currentIndex = 0;
    const newArray = [...totalConfFiltered]
    totalConfFiltered.forEach((item, index) =>{
      if(item !== ""){
        newArray[currentIndex] = item;
        newArray[index] = "";
        currentIndex = index + 1 ;
      }
    })
    setTotalTopConfFiltered(newArray)
  }, [totalConfFiltered]);

  React.useEffect(() => {
   let currentIdentifier = "";
    const newArray = totalTopConfFiltered.map((item, index)=>{
      if (item !== "") {
        currentIdentifier = item
    }
    return {
      groupName: currentIdentifier,   
      isDisplayed : false,
  };
    })
    setShowCollapseRows(newArray);
  }, [totalTopConfFiltered]);
  // end grouping algorithm

  // Get Every Rule's name
  const ruleNamesArray = React.useMemo(() => {
    if (sheet.dealer_configurations && sheet.dealer_configurations.length > 0) {
      const firstDealerConfig = sheet.dealer_configurations[0];
      if (firstDealerConfig.Rules && firstDealerConfig.Rules.length > 0) {
        return firstDealerConfig.Rules.map((rule) => rule.name);
      }
    }
    return [];
  }, [sheet]);

  React.useEffect(() => {
    setRulesName(ruleNamesArray);
  }, [ruleNamesArray]);

  // Get totalByConf and manyConf
  React.useEffect(() => {
    try {
      const newTotalByConf = {};
      const newTotalByManyConf = {};
      const newTotalByManyConfCov = {};
      Object.entries(realTimeData).forEach(([key, value]) => {
        const keyParts = key.split(":");
        if(keyParts[7] !== "cov"){
          let rule0 = null;
          let rule1 = null;
          let rule2 = null;
          let rule3 = null;
          const sheetName = keyParts[0];
          const sheetId = keyParts[1];
          const serverId = keyParts[2];
          const loginId = keyParts[3];
          const managerId = keyParts[4];
          const suffix = keyParts[5];
          const mainSymbol = keyParts[6];
          const transactionType = keyParts[7];
          const symbolAndLogin = sheetId + mainSymbol + loginId;
          const buyVol = transactionType === "buy" ? parseFloat(value) : 0;
          const sellVol = transactionType === "sell" ? parseFloat(value) : 0;
          const netVol = buyVol - sellVol;
          const totalByManyConfIdentifier = sheetId + "tbmc";
          if (!newTotalByManyConf[totalByManyConfIdentifier]) {
            newTotalByManyConf[totalByManyConfIdentifier] = {
              totalBuySheet: 0,
              totalSellSheet: 0,
              totalNetSheet: 0,
              totalResult: [0, 0, 0, 0],
            };
          }
          newTotalByManyConf[totalByManyConfIdentifier].totalBuySheet += buyVol;
          newTotalByManyConf[totalByManyConfIdentifier].totalSellSheet += sellVol;
          newTotalByManyConf[totalByManyConfIdentifier].totalNetSheet += netVol;
  
          sheet.dealer_configurations.forEach((config, index) => {
            if (
              String(config.Login) === loginId &&
              String(config.SymbolSuffix) === suffix &&
              String(config.MainSymbol) === mainSymbol
            ) {
              rule0 = parseInt(config.Rules[0]?.value, 10) / 100 || 0;
              rule1 = parseInt(config.Rules[1]?.value, 10) / 100 || 0;
              rule2 = parseInt(config.Rules[2]?.value, 10) / 100 || 0;
              rule3 = parseInt(config.Rules[3]?.value, 10) / 100 || 0;
              newTotalByManyConf[totalByManyConfIdentifier].totalResult[0] +=
                (netVol * parseInt(config.Rules[0]?.value, 10)) / 100 || 0;
              newTotalByManyConf[totalByManyConfIdentifier].totalResult[1] +=
                (netVol * parseInt(config.Rules[1]?.value, 10)) / 100 || 0;
              newTotalByManyConf[totalByManyConfIdentifier].totalResult[2] +=
                (netVol * parseInt(config.Rules[2]?.value, 10)) / 100 || 0;
              newTotalByManyConf[totalByManyConfIdentifier].totalResult[3] +=
                (netVol * parseInt(config.Rules[3]?.value, 10)) / 100 || 0;
            }
          });
          
        if (!newTotalByConf[symbolAndLogin]) {
          newTotalByConf[symbolAndLogin] = {
            totalBuySymbol: buyVol,
            totalSellSymbol: sellVol,
            totalNetSymbol: netVol,
            totalResult: [
              netVol * rule0,
              netVol * rule1,
              netVol * rule2,
              netVol * rule3,
            ],
          };
        } else {
          newTotalByConf[symbolAndLogin].totalBuySymbol += buyVol;
          newTotalByConf[symbolAndLogin].totalSellSymbol += sellVol;
          newTotalByConf[symbolAndLogin].totalNetSymbol += netVol;
          newTotalByConf[symbolAndLogin].totalResult[0] += netVol * rule0;
          newTotalByConf[symbolAndLogin].totalResult[1] += netVol * rule1;
          newTotalByConf[symbolAndLogin].totalResult[2] += netVol * rule2;
          newTotalByConf[symbolAndLogin].totalResult[3] += netVol * rule3;
        }
 
        }else{
          let rule0 = null;
          let rule1 = null;
          let rule2 = null;
          let rule3 = null;
          const sheetName = keyParts[0];
          const sheetId = keyParts[1];
          const serverId = keyParts[2];
          const loginId = keyParts[3];
          const coverageId = keyParts[4];
          const symbol = keyParts[5];
          const transactionType = keyParts[6];

    
          const buyVol = transactionType === "buy" ? parseFloat(value) : 0;
          const sellVol = transactionType === "sell" ? parseFloat(value) : 0;
          const netVol = buyVol - sellVol;
          const totalByManyConfIdentifier = sheetId + "tbmc";
          if (!newTotalByManyConfCov[totalByManyConfIdentifier]) {
            newTotalByManyConfCov[totalByManyConfIdentifier] = {
              totalBuySheet: 0,
              totalSellSheet: 0,
              totalNetSheet: 0,
              totalResult: [0, 0, 0, 0],
            };
          }
          newTotalByManyConfCov[totalByManyConfIdentifier].totalBuySheet += buyVol;
          newTotalByManyConfCov[totalByManyConfIdentifier].totalSellSheet += sellVol;
          newTotalByManyConfCov[totalByManyConfIdentifier].totalNetSheet += netVol;
  
          sheet.dealer_configurations.forEach((config, index) => {
            if (
              String(config.Login) === loginId &&
              String(config.symbol) === symbol
            ) {
              rule0 = parseInt(config.Rules[0]?.value, 10) / 100 || 0;
              rule1 = parseInt(config.Rules[1]?.value, 10) / 100 || 0;
              rule2 = parseInt(config.Rules[2]?.value, 10) / 100 || 0;
              rule3 = parseInt(config.Rules[3]?.value, 10) / 100 || 0;
              newTotalByManyConfCov[totalByManyConfIdentifier].totalResult[0] +=
                (netVol * parseInt(config.Rules[0]?.value, 10)) / 100 || 0;
                newTotalByManyConfCov[totalByManyConfIdentifier].totalResult[1] +=
                (netVol * parseInt(config.Rules[1]?.value, 10)) / 100 || 0;
                newTotalByManyConfCov[totalByManyConfIdentifier].totalResult[2] +=
                (netVol * parseInt(config.Rules[2]?.value, 10)) / 100 || 0;
                newTotalByManyConfCov[totalByManyConfIdentifier].totalResult[3] +=
                (netVol * parseInt(config.Rules[3]?.value, 10)) / 100 || 0;
            }
          });          
        }
      });
      setTotalByConf(newTotalByConf);
      setTotalByManyConf(newTotalByManyConf);
      setTotalByManyConfCov(newTotalByManyConfCov);
    } catch (e) {
      console.log(e);
    }
  }, [rulesName, realTimeData, sheet]);

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
          {/* Start Header columns */}
          <TableHead>
            <MemoizedTableRow>
              <SheetHeaderCell caption={"Manager / Coverage"} />
              <SheetHeaderCell caption={"Symbol"} />
              <SheetHeaderCell caption={"Buy Vol"} />
              <SheetHeaderCell caption={"Sell Vol"} />
              <SheetHeaderCell caption={"Net Vol"} />
              {rulesName.map((name, index) => (
                <React.Fragment key={`header-${index}`}>
                  <SheetHeaderCell caption={name || `formula-${index + 1}`} />
                  <SheetHeaderCell caption={`Result ${index + 1}`} />
                </React.Fragment>
              ))}
            </MemoizedTableRow>
          </TableHead>
          {/* End Header columns */}
          {/* Start rendering dealer configuration */}
          <TableBody>
            {sheet?.dealer_configurations?.map((config, index) => {
              const buyIdentifier = `${sheet.sheet_name}:${
                sheet.sheet_id
              }:${config.server_id}:${config.Login}:${config.manager_id}:${
                config.SymbolSuffix
              }:${config.MainSymbol}:buy`;

              const sellIdentifier = `${sheet.sheet_name}:${
                sheet.sheet_id
              }:${config.server_id}:${config.Login}:${config.manager_id}:${
                config.SymbolSuffix
              }:${config.MainSymbol}:sell`;

              const buyVol = realTimeData[`${buyIdentifier}`] || 0;
              const sellVol = realTimeData[`${sellIdentifier}`] || 0;
              const netVol = buyVol - sellVol;

              return (
                <React.Fragment key={`conf-${index}`}  >
                  {totalTopConfFiltered[index] !== "" && (
                    <MemoizedTableRow key={`total-symbol-conf-${config.MainSymbol}`}>
                      <TableCell ><KeyboardArrowDown onClick={() => showCollapse(totalTopConfFiltered[index]) } sx={{ cursor: 'pointer' }}/></TableCell>
                      <TableCell
                        sx={{
                          background: "#2e7d32",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        {`${config.MainSymbol} / ${config.Login}`}
                      </TableCell>
                      <TableCell>
                           {toFixedIfNeeded(totalByConf[`${totalTopConfFiltered[index]}`]?.totalBuySymbol || 0 , DECIMAL_POINTS)}
                      </TableCell>
                      <TableCell>
                           {toFixedIfNeeded(totalByConf[`${totalTopConfFiltered[index]}`]?.totalSellSymbol || 0 , DECIMAL_POINTS)}
                      </TableCell>
                      <TableCell>
                          {toFixedIfNeeded(totalByConf[`${totalTopConfFiltered[index]}`]?.totalNetSymbol || 0 , DECIMAL_POINTS)}
                      </TableCell>
                      {config.Rules?.map((rule, ruleIndex) => {
                        const totalResult =
                          totalByConf[
                            `${totalTopConfFiltered[index]}`
                          ]?.totalResult[ruleIndex] || 0;

                        return (
                          <React.Fragment key={`conf-rule-${ruleIndex}`}>
                            <TableCell>{rule.value}%</TableCell>
                            <TableCell>
                            {toFixedIfNeeded(totalResult , DECIMAL_POINTS)}

                            </TableCell>
                          </React.Fragment>
                        );
                      })}
                    </MemoizedTableRow>
                  )}



                  {showCollapseRows[index]?.isDisplayed && (<MemoizedTableRow >
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
                    <TableCell>{toFixedIfNeeded(buyVol , DECIMAL_POINTS)}</TableCell>
                    <TableCell>{toFixedIfNeeded(sellVol , DECIMAL_POINTS)}</TableCell>
                    <TableCell>{toFixedIfNeeded(netVol , DECIMAL_POINTS)}</TableCell>
                    {/* Start display rules values and results */}
                    {config.Rules?.map((rule, ruleIndex) => {
                      const ruleValue = `${rule.value}%`;
                      const ruleResult = (
                        (buyVol - sellVol) *
                        (rule.value / 100)
                      );
                      return (
                        <React.Fragment key={`conf-rule-value-${ruleIndex}`}>
                          <TableCell>{ruleValue}</TableCell>
                          <TableCell>
                            {toFixedIfNeeded(ruleResult , DECIMAL_POINTS)}
                          </TableCell>
                        </React.Fragment>
                      );
                    })}
                    {/* End display rules values and results */}
                  </MemoizedTableRow>)} 
             
                  {/* End rendering dealer configuration */}
                </React.Fragment>
              );
            })}
            {/* Start Total of all the main configurations */}
            {sheet?.dealer_configurations?.length > 0 && (
              <>
                <MemoizedTableRow
                  key={`total-sheet-conf${sheet.dealer_configurations.MainSymbol}`}
                >
                  <TableCell></TableCell>
                  <TableCell
                    sx={{
                      background: "#325a7d",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {"Total"}
                  </TableCell>
                  <TableCell>
                  {toFixedIfNeeded(totalByManyConf[`${sheet.sheet_id}tbmc`]?.totalBuySheet || 0 , DECIMAL_POINTS)}
                  </TableCell>
                  <TableCell>
                    {toFixedIfNeeded(totalByManyConf[`${sheet.sheet_id}tbmc`]?.totalSellSheet|| 0 , DECIMAL_POINTS)}
                  </TableCell>
                  <TableCell>
                    {toFixedIfNeeded(totalByManyConf[`${sheet.sheet_id}tbmc`]?.totalNetSheet || 0 , DECIMAL_POINTS)}
                  </TableCell>
                  {rulesName.map((_, ruleIndex) => {
                    const totalResult =
                      totalByManyConf[`${sheet.sheet_id}tbmc`]?.totalResult &&
                      totalByManyConf[`${sheet.sheet_id}tbmc`]?.totalResult[
                        ruleIndex
                      ]
                        ? totalByManyConf[`${sheet.sheet_id}tbmc`]?.totalResult[
                            ruleIndex
                          ]
                        : 0;
                    return (
                      <React.Fragment key={`conf-tbmc-${ruleIndex}`}>
                        <TableCell></TableCell>
                        <TableCell>{toFixedIfNeeded(totalResult , DECIMAL_POINTS)}</TableCell>
                      </React.Fragment>
                    );
                  })}
                </MemoizedTableRow>
              </>
            )}
            {/* End Total of all the main configurations */}
            {/* Start rendering coverage rows */}
            {sheet?.COVERAGE_DETAILS?.map((config, index) => {

              const buyIdentifier = `${sheet.sheet_name}:${sheet.sheet_id}:${config.coverage_server_id}:${config.Login}:${config.coverage_account_id}:${config.Symbol}:buy:cov`;
              const sellIdentifier = `${sheet.sheet_name}:${sheet.sheet_id}:${config.coverage_server_id}:${config.Login}:${config.coverage_account_id}:${config.Symbol}:sell:cov`;
              const buyVol = realTimeData[`${buyIdentifier}`] || 0;
              const sellVol = realTimeData[`${sellIdentifier}`] || 0;
              const netVol = buyVol - sellVol;
              return (
                <React.Fragment key={`coverage-conf-${index}`}>
                  <MemoizedTableRow>
                    <TableCell>{config.Login}</TableCell>
                    <TableCell>{config.Symbol}</TableCell>
                    <TableCell>{toFixedIfNeeded(buyVol , DECIMAL_POINTS)}</TableCell>
                    <TableCell>{toFixedIfNeeded(sellVol , DECIMAL_POINTS)}</TableCell>
                    <TableCell>{toFixedIfNeeded(netVol , DECIMAL_POINTS)}</TableCell>
                    {config.Rules?.map((rule, ruleIndex) => {
                      const ruleValue = `${rule.value}%`;
                      const ruleResult = (
                        (buyVol - sellVol) *
                        (rule.value / 100)
                      );
                      return (
                        <React.Fragment key={`coverage-conf-rule-${ruleIndex}`}>
                          <TableCell>{ruleValue}</TableCell>
                          <TableCell>
                            {toFixedIfNeeded(ruleResult , DECIMAL_POINTS)}
                          </TableCell>
                        </React.Fragment>
                      );
                    })}
                  </MemoizedTableRow>
                </React.Fragment>
              );
            })}
            {/* End rendering coverage rows */}
            {/* Start total of the coverage rows */}
            {sheet?.COVERAGE_DETAILS?.length > 0 && (
              <>
                <MemoizedTableRow
                  key={`total-sheet-coverage-conf-${sheet.dealer_configurations.MainSymbol}`}
                >
                  <TableCell></TableCell>
                  <TableCell
                    sx={{
                      background: "#325a7d",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {"Total"}
                  </TableCell>
                  <TableCell>
                    {toFixedIfNeeded(totalByManyConfCov[`${sheet.sheet_id}tbmc`]?.totalBuySheet || 0 , DECIMAL_POINTS)}
                  </TableCell>
                  <TableCell>
                    {toFixedIfNeeded(totalByManyConfCov[`${sheet.sheet_id}tbmc`]?.totalSellSheet || 0 , DECIMAL_POINTS)}
                  </TableCell>
                  <TableCell>
                    {toFixedIfNeeded(totalByManyConfCov[`${sheet.sheet_id}tbmc`]?.totalNetSheet || 0 , DECIMAL_POINTS)}
                  </TableCell>
                  {rulesName.map((_, ruleIndex) => {
                    const totalResult =
                    totalByManyConfCov.totalResult &&
                    totalByManyConfCov.totalResult[ruleIndex] ? totalByManyConfCov.totalResult[ruleIndex]?.toFixed(2) : 0;
                    return (
                      <React.Fragment key={`coverage-conf-rule-value${ruleIndex}`}>
                        <TableCell></TableCell>
                        <TableCell>{toFixedIfNeeded(totalResult , DECIMAL_POINTS)}</TableCell>
                      </React.Fragment>
                    );
                  })}
                </MemoizedTableRow>
              </>
            )}
            {/* End total of the coverage rows */}
            {/* start covered total */}
            <MemoizedTableRow
              key={`total-covered-${sheet.dealer_configurations.MainSymbol}`}
              className="sticky bottom-0 bg-secondary"
            >
              <TableCell></TableCell>
              <TableCell
                sx={{
                  background: "#020817",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {"Covered"}
              </TableCell>
              <TableCell>
                {toFixedIfNeeded((totalByManyConf[`${sheet.sheet_id}tbmc`]?.totalBuySheet || 0) - (totalByManyConfCov[`${sheet.sheet_id}tbmc`]?.totalBuySheet || 0) , DECIMAL_POINTS)}
              </TableCell>
              <TableCell>
               {toFixedIfNeeded((totalByManyConf[`${sheet.sheet_id}tbmc`]?.totalSellSheet || 0) - (totalByManyConfCov[`${sheet.sheet_id}tbmc`]?.totalSellSheet || 0) , DECIMAL_POINTS)}
              </TableCell>
              <TableCell>
                {toFixedIfNeeded((totalByManyConf[`${sheet.sheet_id}tbmc`]?.totalNetSheet || 0) - (totalByManyConfCov[`${sheet.sheet_id}tbmc`]?.totalNetSheet || 0) , DECIMAL_POINTS)}
              </TableCell>
              {rulesName.map((_, ruleIndex) => {
                const coveredResult = (totalByManyConf[`${sheet.sheet_id}tbmc`]?.totalResult[ruleIndex] || 0) - (totalByManyConfCov[`${sheet.sheet_id}tbmc`]?.totalResult[ruleIndex] || 0)

                return (
                  <React.Fragment key={`coverage-conf-tbmc${ruleIndex}`}>
                    <TableCell></TableCell>
                    <TableCell>{toFixedIfNeeded(coveredResult , DECIMAL_POINTS)}</TableCell>
                  </React.Fragment>
                );
              })}
            </MemoizedTableRow>
            {/* End covered total */}
          </TableBody>
          
        </Table>
      </TableContainer>
    </Box>
  );
};

const ConfigurationList = ({
  sheets,
  onInserting,
  onEditing,
  selectedSheetId,
  setSelectedSheetIdfunction,
  selectedSheetName,
  setSelectedSheetName,
  realTimeData,
  userId
}) => {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState(0);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const confirmDeleteSentece = "Are you sure you want to delete ";
  
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    setSelectedSheetIdfunction(sheets[newValue]?.sheet_id);
    setSelectedSheetName(sheets[newValue]?.sheet_name);
  };
  
  const onDeleting = () => {
    setShowConfirmDialog(true);
  };

  const confirmDelete = (response) => {
    if (response) {
      onDelete();
    }
    setShowConfirmDialog(false);
  };

  const onDelete = async () => {
    await dispatch(DeleteSheet(selectedSheetId));
    await dispatch(GetSheets());
    handleTabChange("", 0);
  };

  React.useEffect(() => {
    if (sheets && sheets.length > 0) {
      setSelectedSheetIdfunction(sheets[0]?.sheet_id);
      setSelectedSheetName(sheets[0]?.sheet_name);
    }
  }, [sheets]);

  return (
    <Box>
      {showConfirmDialog && (
        <ConfirmDialaog
          confirmDelete={confirmDelete}
          confirmSentece={confirmDeleteSentece}
          data={selectedSheetName}
        />
      )}
      <div className="flex items-center justify-between">
        <div className="max-w-[500px] md:max-w-[1000px]">
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          {sheets?.map((sheet, index) => (
            <Tab
              label={sheet.sheet_name}
              key={`sheet-${sheet.sheet_id}`}
              sx={{ fontWeight: 700 }}
            />
          ))}
        </Tabs>
        </div>

        <div className="flex gap-4"></div>
        <div className="flex gap-4">
          {sheets[selectedTab]?.creator_dealer_id === userId &&  <DeleteButton onClick={onDeleting} caption="Delete" />}
          {sheets[selectedTab]?.creator_dealer_id === userId &&   <EditButton onClick={onEditing} />}
          <AddButton onClick={onInserting} />
        </div>
      </div>
      {sheets?.map((sheet, index) => (
        <Box
          role="tabpanel"
          hidden={selectedTab !== index}
          id={`tabpanel-${sheet.sheet_id}`}
          key={index}
        >
          {selectedTab === index && (
            <ConfigurationSheet sheet={sheet} realTimeData={realTimeData} />
          )}

        </Box>
      ))}
    </Box>
  );
};

export default ConfigurationList;
