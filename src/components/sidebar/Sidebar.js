import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.scss';
// import AuthContext from "../../context/Auth.context";
// import {useContext} from 'react';

const loggedUserToken = localStorage.getItem("token");
console.log(loggedUserToken);
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
    loggedUserToken ?
    {
        display: 'Profile',
        icon: <i className='bx bx-star'></i>,
        to: '/profile',
        section: 'profile'
    }
    :
    {
    },
    loggedUserToken ?
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

const Sidebar = () => {


    //const { Token, userRole } = useContext(AuthContext);

    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 50);
    }, []);

    // change active index
    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    return (
        <div className='sidebar' style={{ backgroundColor: 'white' }} >
            <div className="sidebar__logo">
                <center style={{ color: "#1591b0", fontFamily: 'arial'}}>
                    <b>
                        Train Ticket Booking System
                    </b>
                </center>
            </div>
            <div style={{ backgroundColor: 'white' }} ref={sidebarRef} className="sidebar__menu">
                {/* <div
                ref={indicatorRef}
                className="sidebar__menu__indicator"
                style={{
                    transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
                }}
            ></div> */}
                {
                    sidebarNavItems.map((item, index) => (
                        <Link to={item.to} key={index}>
                            <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}
                                style={{ color: activeIndex == index ? "#1591b0" : "black" }}>
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
