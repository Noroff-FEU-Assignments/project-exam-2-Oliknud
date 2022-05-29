import React from "react"
import { Link } from "react-router-dom"

const Footer = () => <footer className="page-footer">
    <div className="container">
        <h5 className="text-uppercase">Links</h5>
        <Link to={"/"}>Home</Link>
        <Link to={"/hotels"}>Hotels</Link>
        <Link to={"/booking"}>Book hotel</Link>
        <Link to={"/contact"}>Contact</Link>
    </div>

    <div className="footer-copyright text-center py-3">
        <p>© 2022 Copyright: Ole-A Knudsen</p>
    </div>

</footer>

export default Footer