import * as React from "react";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
  Dialog,
  TextField,
} from "@mui/material/";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
const InputDialog = ({ title, onSubmit, confirmSentece, dataName }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [data, setData] = React.useState("");
  const handleReject = () => {
    onSubmit("");
  };
  const handleConfirm = () => {
    onSubmit(data);
  };

  const handleChange = (event) => {
    setData(event.target.value);
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={true}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <div variant="h4" component="h1" className="select-none cursor-default caret-transparent">
            {title}
          </div>
        </DialogTitle>
        <DialogContent>
          <div color="primary" style={{ fontWeight: "bold" }} className="select-none cursor-default caret-transparent">
            {confirmSentece}
            <div className="text-error" style={{ fontWeight: "bold" }}>
              <TextField
                type="text"
                variant="outlined"
                required
                name={dataName}
                label={dataName}
                value={data}
                onChange={handleChange}
                sx={{
                  width: "100%",
                  marginTop: "2rem",
                  "@media (min-width: 1000px)": {},
                }}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <div className="w-full">
            <div className="flex justify-start px-2">
              <PrimaryButton onClick={handleConfirm} caption="Confirm" />
              <SecondaryButton onClick={handleReject} caption="Cancel" />
            </div>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InputDialog;
