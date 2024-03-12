import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
// import Rooms from './pages/Rooms';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import ViewAllRooms from './pages/ViewAllRooms';
import BookRoom from './pages/BookRoom';
import ApproveBookings from './pages/ApproveBookings';
import YourBooking from './pages/YourBooking';

function App() {
  return (
    <Router>
        <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/bookRoom/:id" element={<PrivateRoute><BookRoom/></PrivateRoute> } />
        <Route exact path="/yourBooking" element={<PrivateRoute><YourBooking/></PrivateRoute> } />
        <Route exact path="/allRooms" element={<PrivateRoute><ViewAllRooms/></PrivateRoute> } />
        <Route exact path="/approveBookings" element={<PrivateRoute><ApproveBookings/></PrivateRoute> } />
        <Route exact path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute> } />
        </Routes>
    </Router>
  );
}

export default App;