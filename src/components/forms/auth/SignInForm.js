import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SignIn } from "../../../utils/redux/actions/Auth";

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  const error = useSelector((state) => state.error);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handler = async (e) => {
    e.preventDefault();
    await dispatch(SignIn(formData));
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [dispatch, isAuthenticated, navigate]);

  return (
    <form onSubmit={handler}>
      <div className="w-full flex flex-col items-center">
        <div className="max-w-3xl sm:min-w-[500px] flex flex-col items-center bg-white flex flex-col py-10 rounded gap-y-12 ">
          <div>
            <h1 className="text-4xl">User portal</h1>
          </div>

          <div className="w-full flex flex-col gap-y-4 px-10">
            <TextField
              required
              id="outlined-basic"
              name="username"
              type="email"
              label="Username"
              variant="outlined"
              value={formData.username}
              onChange={handleChange}
            />

            <FormControl sx={{ width: "full" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password *
              </InputLabel>
              <OutlinedInput
                required
                id="outlined-adornment-password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </div>

          <div className="w-2/5">
            <Button
              color="primary"
              size="large"
              fullWidth={true}
              variant="contained"
              type="submit"
            >
              Sign In
            </Button>
            {error && (
              <p className="text-center text-red-500 text-sm mt-2">
                {" "}
                The username or password that you've entered is incorrect
              </p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignInForm;
