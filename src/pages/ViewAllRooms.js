import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { DataGrid } from '@mui/x-data-grid';
import {
    Button,
    Box
} from '@mui/material';
import axios from 'axios';
import Searchbar from '../components/SearchBar'
import { useNavigate } from "react-router";

 const ViewAllRooms = () => {
    const [roomsData, setRoomsData] = React.useState([]);
    const [ searchQuery, setSearchQuery ] = React.useState('');
   const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('mypegtoken')
        console.log('token', token)
       axios.get('http://localhost:5000/book/rooms',{
        headers: {
          'Authorization': `Bearer ${token}`
    }})
       .then((response) => {
        console.log(response.data);
        if(response.data.message==='Unauthorized')
         navigate('/login')
        setRoomsData(response.data);
       }).catch((error) => {
        console.log(error);
       })
    }, []);

    const filteredRows = roomsData
    .filter(row => row.number.toString().includes(searchQuery)) // filter rows based on search query
    .map(row => ({
      id: row.id,
      roomNumber: row.number,
      block: row.block,
      size: row.size,
      availableSlots: row.slots,
    }));

    const columns = [
        // { field: 'id', headerName: 'ID', width: 90 },
        { field: 'id', headerName: 'ID', width: 70 },      //Temporary trick to shift first column to right
        {
            field: 'roomNumber',
            headerName: 'Room No.',
            flex: 1,
        },
        {
            field: 'block',
            headerName: 'Block',
            flex: 1,
        },
        {
            field: 'size',
            headerName: 'Capacity',
            flex: 1,
        },
        {
            field: 'availableSlots',
            headerName: 'Available Slots',
            flex: 1,
        },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => bookButton(params.row.roomNumber,params.row.block,params.row.size,params.row.availableSlots),
        },
    ];

    const bookRoomHandler = (number,block) => {
        localStorage.setItem('selectedRoomNITH',block+'-'+number);
        navigate('/bookRoom/'+block+'-'+number);
    }

    const bookButton = (name,block,size,availableSlots) => {
        
        return (
            <Button variant="outlined" disabled={availableSlots===0?true:false} onClick={() => bookRoomHandler(name,block)}
            sx={{
                '&:hover': {
                  backgroundColor: '#1976d2',
                  color: '#fff',
                },
              }}>
                {availableSlots===0?'Full':'Book'}
            </Button>)
    }
    const handleSearch = event => {
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
                                    '& .MuiDataGrid-virtualScroller': {
                                        overflowX: 'hidden',
                                    },
                                    '& .MuiDataGrid-columnHeaders': {
                                        backgroundColor: 'rgba(242,242,242)',
                                        fontWeight: 'bold',
                                    }
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
           
    )
 }

 export default ViewAllRooms;