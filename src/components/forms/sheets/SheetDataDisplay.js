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
  Typography
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { DeleteSheet } from "../../../utils/redux/actions/Sheets";
import AddButton from "../../buttons/AddButton";
import EditButton from "../../buttons/EditButtons";
import { SheetHeaderCell } from "../../cellRendering/CellRendering";
import DeleteButton from "../../buttons/DeleteButton";
import ConfirmDialaog from "../../common/ConfirmDialog";
import { GetSheets } from "../../../utils/redux/actions/Sheets";

const ConfigurationSheet = ({ sheet, realTimeData }) => {
  const [rulesName, setRulesName] = useState([]);
  const [totalByConf, setTotalByConf] = useState({});
  const [totalByManyConf, setTotalByManyConf] = useState({});
  const [totalByManyCoverageConf, setTotalByManyCoverageConf] = useState({});
  const [totalCovered, setTotalCovered] = useState({});
  const [totalConfFiltered, setTotalConfFiltered] = useState([]);
  

    // Get Every Rule's name
    React.useEffect(() => {
      const dealer_configurations = sheet?.dealer_configurations;

      const newArray = dealer_configurations.map((obj, index, arr) => {
        if (index < arr.length - 1) {
          if( obj.MainSymbol !== arr[index + 1].MainSymbol){
            return `${obj.MainSymbol}`;
          }else{
            return "";
          }
        }
        return `${obj.MainSymbol}`; 
      });
      setTotalConfFiltered(newArray);


    }, [sheet]);

  // Get Every Rule's name
  React.useEffect(() => {
    if (sheet.dealer_configurations && sheet.dealer_configurations.length > 0) {
      const firstDealerConfig = sheet.dealer_configurations[0];
      if (firstDealerConfig.Rules && firstDealerConfig.Rules.length > 0) {
        const ruleNamesArray = firstDealerConfig.Rules.map((rule) => rule.name);
        setRulesName(ruleNamesArray);
      }
    }
  }, []);
  
    // Get Conf totals
    React.useEffect(() => {
      try{
        const newTotalByConf = {};
        Object.entries(realTimeData).forEach(([key, value]) =>{
          let rule0 = null;
          let rule1 = null;
          let rule2 = null;
          let rule3 = null;
          const keyParts = key.split(':');
          const sheetName = keyParts[0];
          const sheetId = keyParts[1];
          const serverId = keyParts[2];
          const loginId = keyParts[3];
          const managerId = keyParts[4];
          const suffix = keyParts[5];
          const mainSymbol = keyParts[6];
          const transactionType = keyParts[7];
          const symbolAndLogin = mainSymbol;
          const buyVol = transactionType === "BUY" ? parseFloat(value) : 0;
          const sellVol = transactionType === "SELL" ? parseFloat(value) : 0;
          const netVol = buyVol - sellVol;

          sheet.dealer_configurations.forEach((config, index) => {
         

            if(String(config.Login )=== loginId && String(config.SymbolSuffix) === suffix && String(config.MainSymbol) === mainSymbol){
              rule0 = parseInt(config.Rules[0]?.value, 10) / 100 || 0;
              rule1 = parseInt(config.Rules[1]?.value, 10) / 100 || 0;
              rule2 = parseInt(config.Rules[2]?.value, 10) / 100 || 0;
              rule3 = parseInt(config.Rules[3]?.value, 10) / 100 || 0;
            }

          });

          if (!newTotalByConf[symbolAndLogin]) {
            newTotalByConf[symbolAndLogin] = {
              totalBuySymbol: buyVol,
              totalSellSymbol: sellVol,
              totalNetSymbol: netVol,
              totalResult: [
                (netVol * rule0),
                (netVol * rule1),
                (netVol * rule2),
                (netVol * rule3),
              ],
            };
          } else {
            newTotalByConf[symbolAndLogin].totalBuySymbol += buyVol;
            newTotalByConf[symbolAndLogin].totalSellSymbol += sellVol;
            newTotalByConf[symbolAndLogin].totalNetSymbol += netVol;
            newTotalByConf[symbolAndLogin].totalResult[0] += (netVol * rule0);
            newTotalByConf[symbolAndLogin].totalResult[1] += (netVol * rule1);
            newTotalByConf[symbolAndLogin].totalResult[2] += (netVol * rule2);
            newTotalByConf[symbolAndLogin].totalResult[3] += (netVol * rule3);
          }
          

        });
        setTotalByConf(newTotalByConf);
      }
      catch(error){
        console.log(error);
      }
   
    }, [rulesName, realTimeData, sheet]);

  // Get Coverage conf totals
  // React.useEffect(() => {
  //   try{
  //     if (sheet?.COVERAGE_DETAILS) {
  //       const newTotalByManyCoverageConf = {
  //         totalBuySheet: 0,
  //         totalSellSheet: 0,
  //         totalNetSheet: 0,
  //         totalResult: [0, 0, 0, 0],
  //       };
  
  //       sheet.COVERAGE_DETAILS.forEach((config, index) => {
  //         let netVol = config.BuyVol - config.SellVol;
  //         newTotalByManyCoverageConf.totalBuySheet += config.BuyVol;
  //         newTotalByManyCoverageConf.totalSellSheet += config.SellVol;
  //         newTotalByManyCoverageConf.totalNetSheet += netVol;
  //         newTotalByManyCoverageConf.totalResult[0] +=
  //           (netVol * parseInt(config.Rules[0]?.value, 10)) / 100 || 0;
  //         newTotalByManyCoverageConf.totalResult[1] +=
  //           (netVol * parseInt(config.Rules[1]?.value, 10)) / 100 || 0;
  //         newTotalByManyCoverageConf.totalResult[2] +=
  //           (netVol * parseInt(config.Rules[2]?.value, 10)) / 100 || 0;
  //         newTotalByManyCoverageConf.totalResult[3] +=
  //           (netVol * parseInt(config.Rules[3]?.value, 10)) / 100 || 0;
  //       });
  //       setTotalByManyCoverageConf(newTotalByManyCoverageConf);
  //     }
  //   }
  //   catch(error){
  //     console.log(error);
  //   }

  // }, [sheet]);

  // Get total coverages
  // React.useEffect(() => {
  //   try{
  //     const newTotalCovered = {
  //       totals: {
  //         coveredBuy: 0,
  //         coveredSell: 0,
  //         coveredNet: 0,
  //         coveredResult: [0, 0, 0, 0],
  //       },
  //     };
  
  //     newTotalCovered.totals.coveredBuy +=
  //       totalByManyConf?.totalBuySheet - totalByManyCoverageConf?.totalBuySheet;
  //     newTotalCovered.totals.coveredSell +=
  //       totalByManyConf?.totalSellSheet - totalByManyCoverageConf?.totalSellSheet;
  //     newTotalCovered.totals.coveredNet +=
  //       totalByManyConf?.totalNetSheet - totalByManyCoverageConf?.totalNetSheet;
  //     for (let i = 0; i < rulesName.length; i++) {
  //       newTotalCovered.totals.coveredResult[i] +=
  //         totalByManyConf?.totalResult[i] -
  //         totalByManyCoverageConf?.totalResult[i];
  //     }
  
  //     setTotalCovered(newTotalCovered);
  //   }
  //   catch(error){
  //     console.log(error);
  //   }
   
  // }, [totalByManyConf, totalByManyCoverageConf]);

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
            <TableRow>
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
            </TableRow>
          </TableHead>
          {/* End Header columns */}
          {/* Start rendering dealer configuration */}
          <TableBody>
            {sheet?.dealer_configurations?.map((config, index) => {
              const nextConfig = sheet?.dealer_configurations?.[index + 1];
              const isLast = nextConfig?.MainSymbol !== config.MainSymbol;
              const buyIdentifier = `${sheet.sheet_name.toLowerCase()}:${sheet.sheet_id}:${config.server_id}:${config.Login}:${config.manager_id}:${config.SymbolSuffix}:${config.MainSymbol}:BUY`;
              const sellIdentifier = `${sheet.sheet_name.toLowerCase()}:${sheet.sheet_id}:${config.server_id}:${config.Login}:${config.manager_id}:${config.SymbolSuffix}:${config.MainSymbol}:SELL`;
              const buyVol = realTimeData[`${buyIdentifier}`] || 0;
              const sellVol = realTimeData[`${sellIdentifier}`] || 0;
              const netVol = (buyVol - sellVol);
              
              // const keyIdentifier = `${config.MainSymbol}${config.Login}`;
              // const totalByConfBuy = totalByConf[keyIdentifier]?.totalBuySymbol ?? 0;
              // console.log(totalByConfBuy)
              
              return (
                <React.Fragment key={`conf-${index}`}>
                  <TableRow>
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
                    <TableCell>{buyVol}</TableCell>
                    <TableCell>{sellVol}</TableCell>
                    <TableCell>{isNaN(netVol) ? 0 : netVol}</TableCell>
                    {/* Start display rules values and results */}
                    {config.Rules?.map((rule, ruleIndex) => {
                      const ruleValue = `${rule.value}%`;
                      const ruleResult = (
                        (buyVol - sellVol) * (rule.value / 100)
                      ).toFixed(2);
                      return (
                        <React.Fragment key={`conf-rule-${ruleIndex}`}>
                          <TableCell>{ruleValue}</TableCell>
                          <TableCell>{isNaN(ruleResult) ? 0 : ruleResult}</TableCell>
                        </React.Fragment>
                      );
                    })}
                    {/* End display rules values and results */}
                  </TableRow>

                  {/* End rendering dealer configuration */}
                  {/* Start check if next item its the end of the configuration */}
                  
                  {/* {console.log(`${config.MainSymbol}${config.Login}`)}
                  {console.log(totalByConf[`XAUUSD1105`]?.totalBuySymbol)}
                  {console.log(totalByConf[`${config.MainSymbol}${config.Login}`]?.totalBuySymbol)} */}

                  {isLast && (
                    
                    <TableRow key={`total-symbol-conf-${config.MainSymbol}`}>
                      <TableCell></TableCell>
                      <TableCell
                        sx={{
                          background: "#2e7d32",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        {"Total"}
                      </TableCell>
                      <TableCell>
                        {totalByConf[`${totalConfFiltered[index]}`]?.totalBuySymbol || 0}
                      </TableCell>
                      <TableCell>
                      {totalByConf[`${totalConfFiltered[index]}`]?.totalSellSymbol || 0}
                      </TableCell>
                      <TableCell>
                      {totalByConf[`${totalConfFiltered[index]}`]?.totalNetSymbol || 0}
                      </TableCell>
                      {config.Rules?.map((rule, ruleIndex) => {
                        const totalResult = totalByConf[`${totalConfFiltered[index]}`]?.totalResult[ruleIndex]?.toFixed(2) || 0;
                    
                        return (
                          <React.Fragment key={`conf-rule-${ruleIndex}`}>
                            <TableCell></TableCell>
                            <TableCell>{totalResult === "0.00" ? 0 : totalResult}</TableCell>
                          </React.Fragment>
                        );
                      })}
                    </TableRow>
                  )}
                  {/* End check if next item its the end of the configuration */}
                </React.Fragment>
              );
            })}
            
            {/* Start Total of all the main configurations */}
            {sheet?.dealer_configurations?.length > 0 && (
              <>
                <TableRow key={`total-sheet-conf${sheet.dealer_configurations.MainSymbol}`}>
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
                  <TableCell>{totalByManyConf?.totalBuySheet || 0}</TableCell>
                  <TableCell>{totalByManyConf?.totalSellSheet || 0}</TableCell>
                  <TableCell>{totalByManyConf?.totalNetSheet || 0}</TableCell>
                  {rulesName.map((_, ruleIndex) => {
                    const totalResult = totalByManyConf?.totalResult && totalByManyConf?.totalResult[ruleIndex]
                      ? totalByManyConf?.totalResult[ruleIndex].toFixed(2)
                      : 0;
                    return (
                      <React.Fragment key={`conf-rule-${ruleIndex}`}>
                        <TableCell></TableCell>
                        <TableCell>{totalResult}</TableCell>
                      </React.Fragment>
                    );
                  })}
                </TableRow>
              </>
            )}
            {/* End Total of all the main configurations */}
            {/* Start rendering coverage rows */}
            {sheet?.COVERAGE_DETAILS?.map((config, index) => {
              const netVol = (config.BuyVol - config.SellVol).toFixed(3);
              return (
                <React.Fragment key={`coverageConf-${index}`}>
                  <TableRow>
                    <TableCell>{config.Coverage}</TableCell>
                    <TableCell>{config.Symbol}</TableCell>
                    <TableCell>{config.BuyVol}</TableCell>
                    <TableCell>{config.SellVol}</TableCell>
                    <TableCell>{isNaN(netVol) ? 0 : netVol}</TableCell>
                    {config.Rules?.map((rule, ruleIndex) => {
                      const ruleValue = `${rule.value}%`;
                      const ruleResult = (
                        (config.BuyVol - config.SellVol) * (rule.value / 100)
                      ).toFixed(2);
                      return (
                        <React.Fragment key={`coverageConfRule-${ruleIndex}`}>
                          <TableCell>{ruleValue}</TableCell>
                          <TableCell>{isNaN(ruleResult) ? 0 : ruleResult}</TableCell>
                        </React.Fragment>
                      );
                    })}
                  </TableRow>
                </React.Fragment>
              );
            })}
            {/* End rendering coverage rows */}
            {/* Start total of the coverage rows */}
            {sheet?.COVERAGE_DETAILS?.length > 0 && (
              <>
                <TableRow key={`total-sheet-coverage-conf-${sheet.dealer_configurations.MainSymbol}`}>
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
                  <TableCell>{totalByManyCoverageConf?.totalBuySheet || 0}</TableCell>
                  <TableCell>{totalByManyCoverageConf?.totalSellSheet || 0}</TableCell>
                  <TableCell>{totalByManyCoverageConf?.totalNetSheet || 0}</TableCell>
                  {rulesName.map((_, ruleIndex) => {
                    const totalResult = totalByManyCoverageConf.totalResult && totalByManyCoverageConf.totalResult[ruleIndex]
                      ? totalByManyCoverageConf.totalResult[ruleIndex].toFixed(2)
                      : 0;
                    return (
                      <React.Fragment key={`conf-rule-${ruleIndex}`}>
                        <TableCell></TableCell>
                        <TableCell>{totalResult}</TableCell>
                      </React.Fragment>
                    );
                  })}
                </TableRow>
              </>
            )}
            {/* End total of the coverage rows */}
            {/* start covered total */}
            <TableRow key={`total-covered-${sheet.dealer_configurations.MainSymbol}`}>
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
              <TableCell>{isNaN(totalCovered?.totals?.coveredBuy) ? 0 : totalCovered?.totals?.coveredBuy.toFixed(2)}</TableCell>
              <TableCell>{isNaN(totalCovered?.totals?.coveredSell) ? 0 : totalCovered?.totals?.coveredSell.toFixed(2)}</TableCell>
              <TableCell>{isNaN(totalCovered?.totals?.coveredNet) ? 0 : totalCovered?.totals?.coveredNet.toFixed(2)}</TableCell>
              {rulesName.map((_, ruleIndex) => {
                const coveredResult = isNaN(totalCovered?.totals?.coveredResult[ruleIndex])? 0 : totalCovered?.totals?.coveredResult[ruleIndex]?.toFixed(2);
                return (
                  <React.Fragment key={`conf-rule-${ruleIndex}`}>
                    <TableCell></TableCell>
                    <TableCell>{coveredResult}</TableCell>
                  </React.Fragment>
                );
              })}
            </TableRow>
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
  setSelectedSheetId,
  selectedSheetName,
  setSelectedSheetName,
  realTimeData
}) => {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState(0);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const confirmDeleteSentece = "Are you sure you want to delete ";
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    setSelectedSheetId(sheets[newValue]?.sheet_id);
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
    dispatch(GetSheets());
  };


  React.useEffect(() => {
    if (sheets && sheets.length > 0) {
      setSelectedSheetId(sheets[0]?.sheet_id);
      setSelectedSheetName(sheets[0]?.sheet_name);
    }
  }, [sheets]);

  // Start Online Tag
//   const pulse = keyframes`
//   0% {
//     transform: scale(0.95);
//     box-shadow: 0 0 0 0 rgba(0, 255, 0, 0.7);
//   }

//   70% {
//     transform: scale(1);
//     box-shadow: 0 0 0 10px rgba(0, 255, 0, 0);
//   }

//   100% {
//     transform: scale(0.95);
//     box-shadow: 0 0 0 0 rgba(0, 255, 0, 0);
//   }
// `;

// const Circle = styled(Box)(({ theme, isConnected }) => ({
//   width: 12,
//   height: 12,
//   borderRadius: '50%',
//   backgroundColor: isConnected ? 'green' : 'red',
//   animation: isConnected ? `${pulse} 1.5s infinite` : 'none',
// }));

// const [isConnected, setIsConnected] = useState(true); 

  // React.useEffect(() => {
  //   // Simulate connection status change
  //   const interval = setInterval(() => {
  //     setIsConnected(prev => !prev);
  //   }, 1000); // Change status every 5 seconds

  //   return () => clearInterval(interval);
  // }, []);

// End Online Tag

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
              key={sheet.sheet_id}
              sx={{ fontWeight: 700 }}
            />
          ))}
        </Tabs>
        <div className="flex gap-4">
          {/* <Box display="flex" alignItems="center">
      <Circle isConnected={isConnected} />
      <Typography variant="body1"   style={{ 
          marginLeft: 8, 
          fontWeight: isConnected ? 'bold' : 'normal' 
        }}>
        {isConnected ? "Online" : "Offline"}
      </Typography>
    </Box> */}
        </div>
        <div className="flex gap-4">
        <DeleteButton onClick={onDeleting} caption="Delete" />
          <EditButton onClick={onEditing} />
          <AddButton onClick={onInserting} />
        </div>
      </div>
      {sheets?.map((sheet, index) => (
        <Box
          role="tabpanel"
          hidden={selectedTab !== index}
          id={`tabpanel-${index}`}
          key={index}
        >
          {selectedTab === index && <ConfigurationSheet sheet={sheet} realTimeData={realTimeData} />}
        </Box>
      ))}
    </Box>
  );
};

export default ConfigurationList;
