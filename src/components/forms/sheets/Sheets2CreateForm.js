import FormulaDataGridTable from "./FormulaDataGridTable";
import React from "react";

const Sheets2CreateForm = ({
  columns2,
  setColumns2,
  columns3,
  setColumns3,
  symbolsFormulas,
  setSymbolsFormulas,
  columnsCaption,
  setColumnsCaption,
  coverageSymbolsFormulas,
  setCoverageSymbolsFormulas

}) => {

  return (
    <div className=" col-span-2 ">
      <FormulaDataGridTable columns2={columns2} setColumns2={setColumns2} columns3={columns3} setColumns3={setColumns3}  symbolsFormulas={symbolsFormulas} setSymbolsFormulas={setSymbolsFormulas} columnsCaption={columnsCaption} setColumnsCaption={setColumnsCaption} coverageSymbolsFormulas={coverageSymbolsFormulas} setCoverageSymbolsFormulas={setCoverageSymbolsFormulas}/>
    </div>
  );
};
export default Sheets2CreateForm;
