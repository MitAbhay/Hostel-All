import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  Box,
  Container,
  Fade,
  Typography,
  TextField,
  Button,
  CircularProgress,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Radio,
} from "@mui/material";
import axios from "axios";
import {
  StyledTextField,
  StyledTextFieldUnderline,
  ErrorMessage,
  CreateAccountButton,
  CreatingButtonContainer,
} from "../styles/loginstyles";
import { useNavigate } from "react-router";

const BookRoom = () => {
  const [name, setName] = useState(
    JSON.parse(localStorage.getItem("authpegUser")).name
  );
  const [regno, setRegno] = useState(
    JSON.parse(localStorage.getItem("authpegUser")).registrationnumber
  );
  const [address, setAddress] = useState("");
  const [feeFile, setFeefile] = useState(null);
  var [isLoading, setIsLoading] = useState(false);
  const [gender, setGender] = useState("female");

  var [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("mypegtoken");
  const student = JSON.parse(localStorage.getItem("authpegUser"));
  console.log(student);

  // useEffect(() => {
  //     axios.get('http://localhost:5000/checkAuth',{
  //         headers: {
  //           'Authorization': `Bearer ${token}`
  //     }})
  //        .then((response) => {
  //         console.log(response.data);
  //         if(response.data.message==='Unauthorized'){
  //             navigate('/login')
  //             localStorage.removeItem('mypegtoken')
  //         }
  //        }).catch((error) => {
  //         console.log(error);
  //        })
  // }, [])

  const roomNumber = localStorage.getItem("selectedRoomNITH");

  const handleBooking = () => {
    console.log("feefile", feeFile);
    axios
      .post(
        "http://localhost:5000/book/rooms/" + roomNumber,
        { name, regno, address, feeFile, gender, student },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.message === "success") {
          setErrorMessage(null);
          setIsLoading(false);
          alert("Room Booked Successfully");
        }
      })
      .catch((error) => {
        console.log("catchda", error);
        // setErrorMessage(error)
        // setIsLoading(false)
      });
  };

  return (
    <Layout>
      <h1>Book Room {roomNumber}</h1>
      <Container
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
            autoComplete="off"
          />
          <TextField
            disabled
            id="regno"
            InputProps={{
              classes: {
                underline: StyledTextFieldUnderline,
                input: StyledTextField,
              },
            }}
            value={regno}
            margin="normal"
            label="Registration Number"
            variant="filled"
            type="string"
            fullWidth
          />
          <TextField
            disabled
            id="roomNumber"
            InputProps={{
              classes: {
                underline: StyledTextFieldUnderline,
                input: StyledTextField,
              },
            }}
            value={roomNumber}
            margin="normal"
            label="Room Number"
            variant="filled"
            type="string"
            fullWidth
          />
          <TextField
            id="address"
            InputProps={{
              classes: {
                underline: StyledTextFieldUnderline,
                input: StyledTextField,
              },
            }}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            margin="normal"
            label="Address"
            placeholder="Address"
            type="text"
            fullWidth
            autoComplete="off"
          />
          <FormLabel
            id="demo-row-radio-buttons-group-label"
            sx={{ color: "black", marginTop: "1rem" }}
          >
            Gender
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            onChange={(e) => setGender(e.target.value)}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
          <Button
            variant="contained"
            component="label"
            sx={{ width: "30%", margin: "1rem 0 0 0", padding: "0.45rem" }}
            disableElevation
          >
            Add Hostel Receipt
            <input
              hidden
              multiple
              type="file"
              accept="application/pdf"
              onChange={(e) => {
                console.log(e.target.files);
                setFeefile(e.target.files[0]);
              }}
            />
          </Button>
          <div style={{ marginBottom: "2rem" }}>
            {feeFile && <span>{feeFile.name}</span>}
          </div>

          <CreatingButtonContainer>
            {isLoading ? (
              <CircularProgress size={26} />
            ) : (
              <Button
                onClick={handleBooking}
                disabled={regno.length === 0 || name.length === 0}
                size="large"
                variant="contained"
                color="primary"
                fullWidth
                className={CreateAccountButton}
              >
                Book Room
              </Button>
            )}
          </CreatingButtonContainer>
        </Box>
      </Container>
    </Layout>
  );
};

export default BookRoom;
