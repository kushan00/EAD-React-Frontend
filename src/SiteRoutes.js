import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthContext from "./context/Auth.context";
import { useContext  } from "react";
import AppLayout from './components/layout/AppLayout';
import Blank from './pages/Blank';
import Home from './pages/Home';
import Logout from './pages/Auth/logout';
import Login from './pages/Auth/Login';
import Travelers from './pages/TravelersManagement/ViewTravelers';
import TicketBookingManagement from './pages/TicketBookingManagement/ViewTicketBooking';
import ViewAllUsers from './pages/UserManagement/ViewAllUsers'
import EditUser from './pages/UserManagement/EditUser'
import Adduser from './pages/UserManagement/AddNewUser';
import Profile from './pages/Auth/Profile';
import ViewPayment from './pages/PaymentManagement/ViewPayments';
import ViewAllTrains from './pages/TrainManagement/ViewAllTrains'
import EditTrain from './pages/TrainManagement/EditTrain'
import AddTrain from './pages/TrainManagement/AddTrain'
import PaymentHistory from './pages/PaymentManagement/PaymentHistory';



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

             
                            <Route path='/ticket-booking-manage' element={<TicketBookingManagement />} />
                            <Route path='/logout' element={<Logout />} />

                            <Route path='/edit-user/:id' element={<EditUser />} />
                            <Route path='/add-user' element={<Adduser />} />

                            <Route path='/view-invoices' element={<ViewPayment/>} />
                            <Route path='/payment-history' element={<PaymentHistory />} />

                        </Route>
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