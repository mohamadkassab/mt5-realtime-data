import React, { useImperativeHandle, forwardRef } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const HorizontalLinearStepper = forwardRef(({ steps, onStepClick }, ref) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => {
      return prevActiveStep > 0 ? prevActiveStep - 1 : 0;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  React.useEffect(() => {
    handleReset();
  }, []);

  useImperativeHandle(ref, () => ({
    handleNext,
    handleBack,
  }));

  const handleStepClick = (index) => {
    if (onStepClick) {
      onStepClick(index);
    }
    setActiveStep(index);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={`${label}-${index}`}>
            <StepLabel onClick={() => handleStepClick(index)}>
              <div
                className="cursor-pointer transition duration-200 ease-in-out 
                 hover:font-bold "
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
