import FormulaDataGridTable from "../../common/FormulaDataGridTable";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetMT5Suffixes } from "../../../utils/redux/actions/SymbolConfigurations";

const Sheets2CreateForm = ({
  columns1,
  columns2,
  setColumns2,
  formData,
  handleChangeformData,
}) => {
  const dispatch = useDispatch();
  const mt5SymbolConfigurations = useSelector((state) => state.mt5SymbolConfigurations);
  const mt5Suffixes = useSelector((state) => state.mt5Suffixes);
  const fetchInitialData = async () => {
  await dispatch(GetMT5Suffixes());
  };
  React.useEffect(() => {
    fetchInitialData();
  }, []);
  return (
    <div className=" col-span-2">
      <FormulaDataGridTable columns1={columns1} formData={formData} handleChangeformData={handleChangeformData} columns2={columns2} setColumns2={setColumns2} symbols={mt5SymbolConfigurations} suffixes={mt5Suffixes} />
    </div>
  );
};
export default Sheets2CreateForm;
