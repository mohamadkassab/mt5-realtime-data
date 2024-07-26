import React, { useImperativeHandle, forwardRef } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const HorizontalLinearStepper = forwardRef((props, ref) => {

  const handleNext = () => {
    props.handleStepperNext();
  };

  const handleBack = () => {
   props.handleStepperBack();
  };

  const handleReset = () => {
    props.handleStepperReset();
  };

  useImperativeHandle(ref, () => ({
    handleNext,
    handleBack,
  }));

  const handleStepClick = (index) => {
    props.handleStepperClick(index);
  };
  
  React.useEffect(() => {
    handleReset();
  }, []);


  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={props.activeStep}>
        {props?.steps?.map((label, index) => (
          <Step key={`${label}-${index}`}>
            <StepLabel
              onClick={() => handleStepClick(index)}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              <div
                className="cursor-pointer transition duration-200 ease-in-out 
                  rounded-md px-2 "
              >
                {label}
              </div>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
});

export default HorizontalLinearStepper;
