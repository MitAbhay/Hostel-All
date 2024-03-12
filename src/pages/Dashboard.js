import React, { useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();

  //   useEffect(() => {
  //     const token = localStorage.getItem("mypegtoken");
  //     console.log("dash", token);
  //     axios
  //       .get("http://localhost:5000/checkAuth", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((response) => {
  //         console.log(response.data);
  //         if (response.data.message === "Unauthorized") {
  //           navigate("/login");
  //           localStorage.removeItem("mypegtoken");
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }, []);

  return (
    <Layout>
      <h1>Welcome</h1>
    </Layout>
  );
};

export default Dashboard;
