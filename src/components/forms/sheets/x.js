//   // Get Conf totals
//   React.useEffect(() => {
//     try{
//       if (sheet?.dealer_configurations) {
//         const rulesNameLength = rulesName.length;
//         const newTotalByConf = {};
//         const newTotalByManyConf = {
//           totalBuySheet: 0,
//           totalSellSheet: 0,
//           totalNetSheet: 0,
//           totalResult: [0, 0, 0, 0],
//         };
  
//         sheet.dealer_configurations.forEach((config, index) => {
//           const mainSymbol = config.MainSymbol;
//           const login = config.Login;
//           const symbolAndLogin = mainSymbol + login;
//           let netVol = config.BuyVol - config.SellVol;
//           newTotalByManyConf.totalBuySheet += config.BuyVol;
//           newTotalByManyConf.totalSellSheet += config.SellVol;
//           newTotalByManyConf.totalNetSheet += netVol;
  
//           if (!newTotalByConf[symbolAndLogin]) {
//             newTotalByConf[symbolAndLogin] = {
//               totalBuySymbol: config.BuyVol,
//               totalSellSymbol: config.SellVol,
//               totalNetSymbol: netVol,
//               totalResult: [
//                 (netVol * parseInt(config.Rules[0]?.value, 10)) / 100 || 0,
//                 (netVol * parseInt(config.Rules[1]?.value, 10)) / 100 || 0,
//                 (netVol * parseInt(config.Rules[2]?.value, 10)) / 100 || 0,
//                 (netVol * parseInt(config.Rules[3]?.value, 10)) / 100 || 0,
//               ],
//             };
//           } else {
//             newTotalByConf[symbolAndLogin].totalBuySymbol += config.BuyVol;
//             newTotalByConf[symbolAndLogin].totalSellSymbol += config.SellVol;
//             newTotalByConf[symbolAndLogin].totalNetSymbol += netVol;
//             newTotalByConf[symbolAndLogin].totalResult[0] +=
//               (netVol * parseInt(config.Rules[0]?.value, 10)) / 100 || 0;
//             newTotalByConf[symbolAndLogin].totalResult[1] +=
//               (netVol * parseInt(config.Rules[1]?.value, 10)) / 100 || 0;
//             newTotalByConf[symbolAndLogin].totalResult[2] +=
//               (netVol * parseInt(config.Rules[2]?.value, 10)) / 100 || 0;
//             newTotalByConf[symbolAndLogin].totalResult[3] +=
//               (netVol * parseInt(config.Rules[3]?.value, 10)) / 100 || 0;
//           }
  
//           for (let i = 0; i < rulesNameLength; i++) {
//             const ruleValue = parseInt(config.Rules[i]?.value, 10) || 0;
//             newTotalByManyConf.totalResult[i] +=
//               ruleValue === 0 ? 0 : (netVol * ruleValue) / 100;
//           }
//         });
//         setTotalByManyConf(newTotalByManyConf);
//         setTotalByConf(newTotalByConf);
//       }
//     }
//     catch(error){
//       console.log(error);
//     }
 
//   }, [rulesName, sheet]);