import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';



export function AdminMenu () {
    return (
        // <AdminFoodCard/>
        // <AdminNavbar/>

        <Router>
            <ul>
                <li><Link to="/adminMenu"/></li>
                <li><Link to="/orders"/></li>
            </ul>
        <div>
            <h1>Admin Menu</h1>
        </div>

        </Router>
    )
}

export default AdminMenu;