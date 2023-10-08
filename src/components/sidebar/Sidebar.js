import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.scss';
import AuthContext from "../../context/Auth.context";
import { useContext  } from "react";

const Sidebar = () => {

    const { userLogged } = useContext(AuthContext);

    const sidebarNavItems = [
        {
    
            display: 'Home',
            icon: <i style={{ fontFamily: 'inherit' }} className='bx bx-home'></i>,
            to: '/',
            section: ''
        },
        {
            display: 'User Management',
            icon: <i className='bx bx-user'></i>,
            to: '/user-manage',
            section: 'user-manage'
        },
        {
            display: 'Traveler Management',
            icon: <i class='bx bxs-user' ></i>,
            to: '/travel-manage',
            section: 'travel-manage'
        },
        {
            display: 'Ticket Booking Management',
            icon: <i className='bx bxs-receipt'></i>,
            to: '/ticket-booking-manage',
            section: 'ticket-booking-manage'
        },
        {
            display: 'Train Management',
            icon: <i class='bx bxs-train'></i>,
            to: '/train-manage',
            section: 'train-manage'
        },
        {
            display: 'Payments',
            icon: <i class='bx bxs-credit-card-front'></i>,
            to: '/view-invoices',
            section: 'payments'
        },
        userLogged ?
        {
            display: 'Profile',
            icon: <i className='bx bx-star'></i>,
            to: '/profile',
            section: 'profile'
        }
        :
        {
        },
        userLogged ?
        {
            display: 'logout',
            icon: <i class='bx bxs-chevron-left-circle' ></i>,
            to: '/logout',
            section: 'logout'
        }
        :
        {
            display: 'Login',
            icon: <i className='bx bx-star'></i>,
            to: '/login',
            section: 'Login'
        },
    ]


    const [activeIndex, setActiveIndex] = useState(0);
    const sidebarRef = useRef();
    const location = useLocation();

 

    // change active index
    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    return (
        <div className='sidebar' style={{ backgroundColor: '#c4c4c2' }} >
            <div className="sidebar__logo">
                <center style={{ color: "black", fontFamily: 'arial'}}>
                    <b>
                        Train Ticket Booking System
                    </b>
                </center>
            </div>
            <div style={{ backgroundColor: '#c4c4c2' }} ref={sidebarRef} className="sidebar__menu">
                {
                    sidebarNavItems.map((item, index) => (
                        <Link to={item.to} key={index}>
                            <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}
                                style={{ color: activeIndex == index ? "teal" : "black" }}>
                                <div className="sidebar__menu__item__icon">
                                    {item.icon}
                                </div>
                                <div className="sidebar__menu__item__text">
                                    {item.display}
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default Sidebar;
