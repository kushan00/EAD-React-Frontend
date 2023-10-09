import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthContext from "./context/Auth.context";
import { useContext  } from "react";
import AppLayout from './components/layout/AppLayout';
import Blank from './pages/Blank';
import Home from './pages/Home';
import Logout from './pages/Auth/logout';
import Login from './pages/Auth/Login';
import AddItem from './pages/Staff_managment/AddItem';
import ViewItems from './pages/Staff_managment/ViewItems';
import UpdateItem from './pages/Staff_managment/UpdateItem';
import AddSupplierShop from './pages/Staff_managment/AddSupplierShop';
import UpdateSupplierShop from './pages/Staff_managment/UpdateSupplierShop';
import ViewSupplierShops from './pages/Staff_managment/ViewSupplierShop';
import ViewAllUsers from './pages/UserManagement/ViewAllUsers'
import EditUser from './pages/UserManagement/EditUser'
import Adduser from './pages/UserManagement/AddNewUser';
import Profile from './pages/Auth/Profile';

import ViewPayment from './pages/Payment/ViewPayment';
import Payment from './pages/Payment/Payment';

import ViewAllTrains from './pages/Train_management/ViewAllTrains'
import EditTrain from './pages/Train_management/EditTrain'
import AddTrain from './pages/Train_management/AddTrain'

import PaymentSuccess from './pages/Payment/PaymentSuccess';
import PaidDeatils from './pages/Payment/PaidDetails';
import PaymentHistory from './pages/Payment/PaymentHistory';



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
                            <Route path='/user-manage' element={<Blank />} />
                            <Route path='/travel-manage' element={<ViewItems />} />


                            <Route path='/train-manage' element={<ViewAllTrains />} />
                            <Route path='/add-train' element={<AddTrain />} />                     
                            <Route path='/edit-train/:id' element={<EditTrain />} />

                            <Route path='/site-details' element={<Blank />} />
                            <Route path='/ticket-booking-manage' element={<ViewSupplierShops />} />
                            <Route path='/logout' element={<Logout />} />

                            <Route path='/add-item' element={<AddItem />} />
                            <Route path='/update-item/:id' element={<UpdateItem />} />

                            <Route path='/add-suppliershop' element={<AddSupplierShop />} />
                            <Route path='/update-suppliershop/:id' element={<UpdateSupplierShop />} />

                            <Route path='/edit-user/:id' element={<EditUser />} />
                            <Route path='/add-user' element={<Adduser />} />


                            <Route path='/view-invoices' element={<ViewPayment/>} />
                            <Route path='/card' element={<Payment/>} />
                            <Route path='/payment-success' element={<PaymentSuccess />} />
                            <Route path='/paid-details/:id' element={<PaidDeatils/>} />
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