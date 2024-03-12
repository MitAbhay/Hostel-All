import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Box } from "@mui/material";
import axios from "axios";
import Searchbar from "../components/SearchBar";
import { useNavigate } from "react-router";

const ApproveBookings = () => {
  const [roomsData, setRoomsData] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const navigate = useNavigate();
  const isAdmin = JSON.parse(localStorage.getItem("authpegUser")).isverified;

  useEffect(() => {
    const token = localStorage.getItem("mypegtoken");
    console.log("token", token);
    axios
      .get("http://localhost:5000/admin/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
          isAdmin: isAdmin,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.message === "Unauthorized") navigate("/login");
        setRoomsData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filteredRows = roomsData
    .filter((row) => row.roomnumber.toString().includes(searchQuery)) // filter rows based on search query
    .map((row) => ({
      id: row.id,
      roomNumber: row.roomnumber,
      block: row.block,
      name: row.studentname,
      finalized: row.finalized,
    }));

  const columns = [
    // { field: 'id', headerName: 'ID', width: 90 },
    { field: "id", headerName: "ID", width: 70 }, //Temporary trick to shift first column to right
    {
      field: "roomNumber",
      headerName: "Room No.",
      flex: 1,
    },
    {
      field: "block",
      headerName: "Block",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Student Name",
      flex: 1,
    },
    {
      field: "finalized",
      headerName: "Approved",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) =>
        bookButton(
          params.row.roomNumber,
          params.row.block,
          params.row.finalized,
          params.row.id
        ),
    },
  ];

  const bookRoomHandler = (number, block, finalized, id) => {
    localStorage.setItem("selectedRoomNITH", block + "-" + number);
    const token = localStorage.getItem("mypegtoken");
    console.log("url", "http://localhost:5000/admin/bookings/approve/" + id);
    axios
      .post(
        "http://localhost:5000/admin/bookings/approve/",
        { bookingId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            isadmin: isAdmin,
          },
        }
      )
      .then((response) => {
        console.log("approve", response.data);
        if (response.data.message === "success") {
          alert("Room Booked Successfully");
        }
      })
      .catch((error) => {
        console.log("catchda", error);
        // setErrorMessage(error)
        // setIsLoading(false)
      });
  };

  const bookButton = (name, block, finalized, id) => {
    return (
      <Button
        variant="outlined"
        disabled={finalized}
        onClick={() => bookRoomHandler(name, block, finalized, id)}
        sx={{
          "&:hover": {
            backgroundColor: "#1976d2",
            color: "#fff",
          },
        }}
      >
        {finalized ? "Approved" : "Approve"}
      </Button>
    );
  };
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Layout>
      <Searchbar filterName={searchQuery} onFilterName={handleSearch} />
      <Box sx={{ overflowX: "hidden" }}>
        <DataGrid
          sx={{
            "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
              outline: "none !important",
            },
            "& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus":
              {
                outline: "none !important",
              },
            "& .MuiDataGrid-virtualScroller": {
              overflowX: "hidden",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "rgba(242,242,242)",
              fontWeight: "bold",
            },
          }}
          autoHeight={true}
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          disableRowSelectionOnClick
          rowHeight={61}
        />
      </Box>
    </Layout>
  );
};

export default ApproveBookings;
