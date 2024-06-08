import { Workbook } from "exceljs";
import { exportDataGrid } from "devextreme/excel_exporter";
import { saveAs } from "file-saver-es";

export const ExportXlsx = (e, fileName) => {
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

