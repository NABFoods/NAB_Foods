import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminNavbar from "./components/AdminNavbar"
import AdminFoodCard from "./components/AdminFoodCard"


export function AdminMenu () {
    return (
        <div>
            <AdminNavbar/>
            <AdminFoodCard/>
        </div>

        // <Router>
        //     <ul>
        //         <li><Link to="/adminMenu"/></li>
        //         <li><Link to="/orders"/></li>
        //     </ul>
        // <div>
        //     <h1>Admin Menu</h1>
        // </div>

        // </Router>
    )
}

export default AdminMenu;