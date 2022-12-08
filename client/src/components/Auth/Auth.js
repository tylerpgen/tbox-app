import React, { useState } from "react";
import { Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import useStyles from "./styles";
import Input from "./Input";
import { signin, signup } from "../../actions/auth";

const initState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" };

const Auth = () => {
  const user = false;

  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initState);
  const dispatch = useDispatch();
  const history = useHistory();
  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    handleShowPassword(false);
  };
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const googleSuccess = async (res) => {
    const token = res?.credential;
    const result = jwt_decode(token);
    console.log(result);
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleError = () => {
    console.log("Google Login Error");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />
            )}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignUp ? "Sign Up" : "Login"}
          </Button>
          <div>
            {user ? (
              <div>Logged In</div>
            ) : (
              <GoogleLogin onSuccess={googleSuccess} onError={googleError} cookiePolicy="single_host_origin" />
            )}
          </div>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
