import * as React from "react";
import {
  DialogTitle,
  useMediaQuery,
  useTheme,
  Dialog,
} from "@mui/material/";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
const ConfirmDialog = ({ confirmDelete, confirmSentece, data }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleReject = () => {
    confirmDelete(false);
  };
  const handleConfirm = () => {
    confirmDelete(true);
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={true}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <div variant="h4" component="h1">
            {"Confirm action"}
          </div>
        </DialogTitle>
        <div className="flex items-center justify-center px-6">
          <div color="primary" style={{ fontWeight: "bold" }}>
            {confirmSentece}
            <div className="text-error" style={{ fontWeight: "bold" }}>
              {data} ?
            </div>
          </div>
        </div>

        <div className="w-full pb-4">
          <div className="flex justify-start ">
            <PrimaryButton onClick={handleConfirm} caption="Confirm" />
            <SecondaryButton onClick={handleReject} caption="Cancel" />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ConfirmDialog;
