import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useNavigate } from "react-router";
import { Card, Typography, CardContent, Box } from "@mui/material";

const Dashboard = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("mypegtoken");
    console.log("dash", token);
    axios
      .get("http://localhost:5000/book/mine", {
        headers: {
          Authorization: `Bearer ${token}`,
          regno: JSON.parse(localStorage.getItem("authpegUser"))
            .registrationnumber,
        },
      })
      .then((response) => {
        console.log(response.data);
        setBookingData(response.data);
        if (response.data.message === "Unauthorized") {
          navigate("/login");
          localStorage.removeItem("mypegtoken");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Layout>
      <h1>Your Booking</h1>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box sx={{ width: "50%" }}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 20 }} gutterBottom>
                Name: {bookingData.studentname}
              </Typography>
              <Typography sx={{ fontSize: 20 }} gutterBottom>
                Registration Number: {bookingData.registrationnumber}
              </Typography>
              <Typography sx={{ fontSize: 20 }} gutterBottom>
                Room Number: {bookingData.block}-{bookingData.roomnumber}
              </Typography>
              <Typography sx={{ fontSize: 20, color: "green" }} gutterBottom>
                Status: {bookingData.finalized ? "Finalized" : "Pending"}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Layout>
  );
};

export default Dashboard;
