import * as React from "react";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
  Dialog,
  Button,
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
        <DialogContent>
          <div color="primary" style={{ fontWeight: "bold" }}>
            {confirmSentece}
            <div className="text-error" style={{ fontWeight: "bold" }}>
              {data}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <div className="w-full">
            <div className="flex justify-start px-2">
          
              <PrimaryButton onClick={handleConfirm} caption="Confirm"/>
              <SecondaryButton onClick={handleReject} caption="Cancel"/>
            </div>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmDialog;
