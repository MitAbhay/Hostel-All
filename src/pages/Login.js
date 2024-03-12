import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Grid,
  Typography,
  Button,
  Tabs,
  Tab,
  Fade,
  CircularProgress,
} from "@mui/material";
import { AuthProvider, AuthContext } from "../context/AuthContext";
import {
  CustomGrid,
  StyledTextField,
  StyledTextFieldUnderline,
  ErrorMessage,
  TabClass,
  FormContainer,
  ForgetButton,
  FormButtonsWrapper,
  Form,
  LogotypeContainer,
  LogotypeImage,
  LogotypeText,
  LoginLoader,
  Copyright,
  CreateAccountButton,
  CreatingButtonContainer,
} from "../styles/loginstyles";

const Login = (props) => {
  const [name, setName] = useState("");
  const [regno, setRegno] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, register } = useContext(AuthContext);
  var [activeTabId, setActiveTabId] = useState(0);
  var [isLoading, setIsLoading] = useState(false);
  var [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("mypegtoken");
    if (token) navigate("/dashboard");
  }, []);

  const handleLogin = () => {
    console.log("call backend", localStorage.getItem("profileNITH"));
    login(email, password, navigate, setIsLoading, setErrorMessage);
  };

  const handleChangeTab = (id) => {
    setActiveTabId(id);
    setErrorMessage(null);
  };

  const handleRegister = () => {
    console.log("test");
    register(
      email,
      name,
      password,
      regno,
      navigate,
      setIsLoading,
      setErrorMessage
    );
  };

  return (
    <CustomGrid>
      <LogotypeContainer>
        <img src="./nith1.png" alt="logo" className={LogotypeImage} />
        <LogotypeText>Hostel Allotment System</LogotypeText>
      </LogotypeContainer>
      <FormContainer>
        <Form>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => handleChangeTab(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" className={TabClass} />
            <Tab label="New User" className={TabClass} />
          </Tabs>

          {activeTabId === 0 && (
            <React.Fragment>
              {errorMessage && (
                <Fade in={true}>
                  <Typography color="secondary" className={ErrorMessage}>
                    {errorMessage.message}
                  </Typography>
                </Fade>
              )}
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: StyledTextFieldUnderline,
                    input: StyledTextField,
                  },
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                label="Email"
                placeholder="Email"
                type="email"
                fullWidth
                autoComplete="off"
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: StyledTextFieldUnderline,
                    input: StyledTextField,
                  },
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                label="Password"
                placeholder="Password"
                type="password"
                fullWidth
                autoComplete="off"
              />
              <FormButtonsWrapper>
                {isLoading ? (
                  <CircularProgress size={26} className={LoginLoader} />
                ) : (
                  <Button
                    disabled={email.length === 0 || password.length === 0}
                    onClick={handleLogin}
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Login
                  </Button>
                )}
                <Button color="primary" size="large" className={ForgetButton}>
                  Forget Password
                </Button>
              </FormButtonsWrapper>
            </React.Fragment>
          )}
          {activeTabId === 1 && (
            <React.Fragment>
              {errorMessage && (
                <Fade in={true}>
                  <Typography color="secondary" className={ErrorMessage}>
                    {errorMessage}
                  </Typography>
                </Fade>
              )}
              <TextField
                id="name"
                InputProps={{
                  classes: {
                    underline: StyledTextFieldUnderline,
                    input: StyledTextField,
                  },
                }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
                label="Name"
                placeholder="Name"
                type="text"
                fullWidth
              />
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: StyledTextFieldUnderline,
                    input: StyledTextField,
                  },
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                label="Email"
                placeholder="Email"
                type="email"
                fullWidth
              />
              <TextField
                id="regno"
                InputProps={{
                  classes: {
                    underline: StyledTextFieldUnderline,
                    input: StyledTextField,
                  },
                }}
                value={regno}
                onChange={(e) => setRegno(e.target.value)}
                margin="normal"
                label="Registration Number"
                placeholder="Registration Number"
                type="string"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: StyledTextFieldUnderline,
                    input: StyledTextField,
                  },
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                label="Password"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <CreatingButtonContainer>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={handleRegister}
                    disabled={
                      email.length === 0 ||
                      password.length === 0 ||
                      name.length === 0
                    }
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={CreateAccountButton}
                  >
                    Create your account
                  </Button>
                )}
              </CreatingButtonContainer>
            </React.Fragment>
          )}
        </Form>
        <Typography color="primary" className={Copyright}>
          © NIT, Hamirpur
        </Typography>
      </FormContainer>
    </CustomGrid>
  );
};

export default Login;
