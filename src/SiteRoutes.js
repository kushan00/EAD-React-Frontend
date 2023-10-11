import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthContext from "./context/Auth.context";
import { useContext  } from "react";
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';
import Logout from './pages/Auth/logout';
import Login from './pages/Auth/Login';
import Travelers from './pages/TravelersManagement/ViewTravelers';
import ViewAllReservations from './pages/TicketBookingManagement/ViewAllReservations';
import AddReservation from './pages/TicketBookingManagement/AddReservation';
import EditReservation from './pages/TicketBookingManagement/EditReservation';
import ViewAllUsers from './pages/UserManagement/ViewAllUsers'
import EditUser from './pages/UserManagement/EditUser'
import Adduser from './pages/UserManagement/AddNewUser';
import Profile from './pages/Auth/Profile';
import ViewAllTrains from './pages/TrainManagement/ViewAllTrains'
import EditTrain from './pages/TrainManagement/EditTrain'
import AddTrain from './pages/TrainManagement/AddTrain'
import ViewAllSchedules from './pages/ScheduleManagement/ViewAllSchedules';
import AddSchedule from './pages/ScheduleManagement/AddSchedule';
import EditSchedule from './pages/ScheduleManagement/EditSchedule';
import SelectSchedule from './pages/TicketBookingManagement/SelectSchedule';
import TravellerBooking from './pages/TravellerBooking';
import Navbar from './components/Navbar/Navbar';
import TravelerProfile from './pages/TravelerProfile';
import AddUserReservation from './pages/AddUserResevation';


function SiteRoutes() {


    const { userLogged } = useContext(AuthContext);
    console.log(" userLogged ",userLogged);
    return (
        <div>
            <BrowserRouter>

                <Routes>
                {userLogged ? 
                    (
                    <>
                        <Route path='/' element={<AppLayout />}>
                            <Route index element={<Home />} />
                            <Route path='/profile' element={<Profile  />} />
                            <Route path='/user-manage' element={<ViewAllUsers />} />
                            <Route path='/travel-manage' element={<Travelers />} />

                            <Route path='/train-manage' element={<ViewAllTrains />} />
                            <Route path='/add-train' element={<AddTrain />} />                     
                            <Route path='/edit-train/:id' element={<EditTrain />} />

             
                            <Route path='/ticket-booking-manage' element={<ViewAllReservations />} />
                            <Route path='/select-schedule' element={<SelectSchedule />} />  
                            <Route path='/add-reservation/:id' element={<AddReservation />} />                     
                            <Route path='/edit-reservation/:id' element={<EditReservation />} />
                            
                            <Route path='/logout' element={<Logout />} />

                            <Route path='/edit-user/:id' element={<EditUser />} />
                            <Route path='/add-user' element={<Adduser />} />

                            <Route path='/schedule-manage' element={<ViewAllSchedules />} />
                            <Route path='/add-schedule' element={<AddSchedule />} />                     
                            <Route path='/edit-schedule/:id' element={<EditSchedule />} />                            

                        </Route>                   
                        
                        <Route path='/traveler-booking' element={<TravellerBooking />} />
                        <Route path='/traveler-profile' element={<TravelerProfile />} />
                        <Route path='/add-user-reservation/:id' element={<AddUserReservation />} />  
                        
                    </>
                    )
                    :
                    (
                    <>
                        <Route path='*' element={<Login />}/>
                        <Route path='/login' element={<Login />} />
                    </>
                    )
                    }
                    
                    
                </Routes>
            </BrowserRouter>
        </div>

    );
}

export default SiteRoutes;

//nethmi