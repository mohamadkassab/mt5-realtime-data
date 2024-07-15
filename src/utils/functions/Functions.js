import { Workbook } from "exceljs";
import { exportDataGrid } from "devextreme/excel_exporter";
import { saveAs } from "file-saver-es";
// import jwt_decode from 'jsonwebtoken';

export const ExportXlsx = (e, fileName) => {
  try{
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Main sheet");
    exportDataGrid({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(
          new Blob([buffer], { type: "application/octet-stream" }),
          `${fileName}.xlsx`
        );
      });
    });

  }catch(e){
    console.log(e);
  }
};

export const goBackFunc = (prevVisibility, setSheetVisibility) => {
  const currentIndex = prevVisibility.findIndex((v) => v === true);
  if (currentIndex === 0) {
    return prevVisibility;
  }
  const prevIndex = currentIndex - 1;
  const newVisibility = new Array(prevVisibility.length).fill(false);
  newVisibility[prevIndex] = true;

  setSheetVisibility(newVisibility);
};

export const goNextFunc = (prevVisibility, setSheetVisibility) => {
  setSheetVisibility((prevVisibility) => {
    const currentIndex = prevVisibility.findIndex((v) => v === true);
    if (currentIndex === prevVisibility.length - 1) {
      return prevVisibility;
    }
    const nextIndex = currentIndex + 1;
    const newVisibility = new Array(prevVisibility.length).fill(false);
    newVisibility[nextIndex] = true;

    return newVisibility;
  });
};

export const transformData = (
  data,
  managers,
  selectedManagers,
  managersIds,
  sheetToEdit,
  isFormDataChanged,
  symbolsFormulas
) => {
  try{
    if (sheetToEdit && sheetToEdit.sheet_id && !isFormDataChanged) {
      const newData = [];
      sheetToEdit?.formulas?.forEach((item) => {
        const selectedManager = managers.find(
          (manager) => manager.id === item.manager_id
        );
        let counter = 1;
        const newItem = {
          name: item.dealer_configuration_id,
          manager: selectedManager?.name,
          symbol: item.SymbolSuffix,
          isKey: item.SymbolSuffix === item.MainSymbol ? true : false,
          symbol_configuration_id: item.symbol_configuration_id,
          manager_id: item.manager_id,
        };
  
        item.values.forEach((valueItem) => {
          newItem[`#${counter}`] = valueItem.value;
          counter++;
        });
  
        newData.push(newItem);
      });
      return newData;
    } else {
      const newData = [];
      if (selectedManagers?.length > 0 && data) {
        managersIds.forEach((managerId, index) => {
  
          const selectedManager = managers.find(
            (manager) => manager.id === managerId
          );
  
          data.forEach((item) => {
            const newDataItem = {
              name: item.name,
              manager: selectedManager?.name,
              symbol: item.symbol,
              multiplier: item.multiplier,
              isKey: true,
              symbol_configuration_id: item.id,
              manager_id: managerId,
            };
      
              const oldValueItem = symbolsFormulas.find(
                oldItem => oldItem.symbol === item.symbol &&
                oldItem.symbol_configuration_id === item.id &&
                oldItem.manager_id === managerId
              );
  
            
              if(oldValueItem){
                Object.entries(oldValueItem).reduce((acc, [key, value]) => {
                  if (key.startsWith('#')) {
                    newDataItem[`${key}`] = value;
                  }
                });
              }
  
             
            newData.push(newDataItem);
  
  
            item.suffixes?.forEach((suffix) => {
              const newDataItem = {
                name: item.name,
                manager: selectedManager?.name,
                symbol: suffix.suffix,
                multiplier: suffix.multiplier,
                isKey: false,
                symbol_configuration_id: item.id,
                manager_id: managerId,
              };
  
              const oldValueItem = symbolsFormulas.find(
                oldItem => oldItem.symbol === suffix.suffix &&
                oldItem.symbol_configuration_id === item.id &&
                oldItem.manager_id === managerId
              );
  
            
              if(oldValueItem){
                Object.entries(oldValueItem).reduce((acc, [key, value]) => {
                  if (key.startsWith('#')) {
                    newDataItem[`${key}`] = value;
                  }
                });
              }
  
              newData.push(newDataItem);
            });
          });
        });
      }
      return newData;
    }
  }
  catch(e){
    console.log(e)
  }
};

export const transformCoverageData = (
  coverageAndSymbols,
  mt5CoverageAccounts,
  MT5CoverageSymbols,
  sheetToEdit,
  isCoverageFormDataChanged,
  coverageSymbolsFormulas
) => {

  try {
    if (sheetToEdit && sheetToEdit.sheet_id && !isCoverageFormDataChanged) {
      const newData = [];
      sheetToEdit.coverage_formulas.forEach((item, index) => {
        const selectedCoverage = mt5CoverageAccounts.find(
          (coverage) => coverage.id === item.coverage_id
        );
        if (item.values) {
          const selectedSymbol = MT5CoverageSymbols.find(
            (mt5Symbol) => mt5Symbol.Symbol_ID === item.symbol_id
          );
                let counter = 1;
          const newItem = {
            coverageId: selectedCoverage.id,
            coverageLogin: selectedCoverage.login,
            coverage: selectedCoverage.name,
            symbolId: selectedSymbol.Symbol_ID,
            symbol: selectedSymbol.Symbol,
          };

          item.values.forEach((itemValue, index) => {
            newItem[`#${counter}`] = itemValue.value;
            counter++;
          });
          newData.push(newItem);
        }
      });

      return newData;
    } else {
      const newData = [];
      if (coverageAndSymbols) {
        coverageAndSymbols.forEach((item, index) => {
          const selectedCoverage = mt5CoverageAccounts.find(
            (coverage) => coverage.id === item.coverageId
          );
          if (item.coverageId && item.symbols) {
            item.symbols.forEach((symbol, index) => {
              const selectedSymbol = MT5CoverageSymbols.find(
                (mt5Symbol) => mt5Symbol.Symbol_ID === symbol
              );

              const newDataItem = {
                coverageId: selectedCoverage.id,
                coverageLogin: selectedCoverage.login,
                coverage: selectedCoverage.name,
                symbolId: selectedSymbol.Symbol_ID,
                symbol: selectedSymbol.Symbol,
              }
              
              const oldValueItem = coverageSymbolsFormulas.find(
                oldItem => oldItem.symbol === selectedSymbol.Symbol &&
                oldItem.coverageId === selectedCoverage.id &&
                oldItem.coverageLogin === selectedCoverage.login
              );

              if(oldValueItem){
                Object.entries(oldValueItem).reduce((acc, [key, value]) => {
                  if (key.startsWith('#')) {
                    newDataItem[`${key}`] = value;
                  }
                });
              }

              newData.push(newDataItem);
            });
          }
        });
      }
      return newData;
    }
  } catch (e) {
    console.log(e);
  }
};

export const transformSheetData = (
  decodedToken,
  formData,
  symbolsFormulas,
  coverageSymbolsFormulas,
  columns2
) => {
  try{
    const Rules = [];
    const captions = [];
    let maxIndex = 0;
    const rulesStruct = {
      name: "",
      details: {
        dealer_manager_symbols_formulas: [],
        dealer_coverage_symbol_formula: [],
      },
    };
  
    function afterMaxIndex() {
      columns2.forEach((item, index) => {
        if (item.dataField.startsWith("#")) {
          maxIndex = maxIndex + 1;
          captions.push(item.caption);
        }
      });
  
      if (maxIndex > 0) {
        for (let i = 0; i < maxIndex; i++) {
          // const index = columns2.length - maxIndex + i + 1;
          const newRule = { ...rulesStruct };
          newRule.name = `${captions[i]}`;
  
          newRule.details = {
            ...newRule.details,
            dealer_manager_symbols_formulas: [],
            dealer_coverage_symbol_formula: [],
          };
  
          symbolsFormulas?.forEach((item) => {
            const newSymbol = {
              symbol: item.symbol,
              value: item[`#${i + 1}`] || 0,
              symbol_configuration_id: item.symbol_configuration_id,
              manager_id: item.manager_id,
            };
            newRule.details.dealer_manager_symbols_formulas.push(newSymbol);
          });

          coverageSymbolsFormulas?.forEach((item) => {
            const newSymbol = {
              symbol: item.symbol,
              coverage_id: item.coverageId,
              value: item[`#${i + 1}`] || 0,
            };
            newRule.details.dealer_coverage_symbol_formula.push(newSymbol);
          });
  
          Rules.push(newRule);
        }
      } else {
        const newRule = { ...rulesStruct };
        newRule.name = `Note 1`;
  
        newRule.details = {
          ...newRule.details,
          dealer_manager_symbols_formulas: [],
          dealer_coverage_symbol_formula: [],
        };
  
        symbolsFormulas?.forEach((item) => {
          const newSymbol = {
            symbol: item.symbol,
            value: 0,
            symbol_configuration_id: item.symbol_configuration_id,
            manager_id: item.manager_id,
          };
  
          newRule.details.dealer_manager_symbols_formulas.push(newSymbol);
        });
        coverageSymbolsFormulas?.forEach((item) => {
          const newSymbol = {
            symbol: item.symbol,
            coverage_id: item.coverageId,
            value: 0,
          };
          newRule.details.dealer_coverage_symbol_formula.push(newSymbol);
        });
  
        Rules.push(newRule);
      }
    }
    afterMaxIndex();
    return {
      sheet_name: formData.sheet_name,
      dealer_id: decodedToken.id,
      visibility: formData.visibility.toString(),
      server_id: formData.server_id,
      Rules: Rules,
    };
  }catch(e){
    console.log(e);
  }
};

export const toFixedIfNeeded = (num, decimals) => {
  try{
    if (typeof num !== 'number' || isNaN(num)) return 0;
    const parts = num.toString().split('.');
    if (parts.length === 2 && parts[1].length > decimals) {
      return num.toFixed(decimals);
    }
    return num;
  }catch(e){
    console.log(e);
    return 0
  }
};
