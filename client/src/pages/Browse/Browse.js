import React from "react";
import { useSelector } from "react-redux";
import "./style.css";

const Browse = () => {
    const user = useSelector((state) => state.userReducer.user);

    return (
        <div className="page">
            <h1 className="page-content">BROWSE</h1>
            <p style={{ color: "white" }}>{`SALUT ${user.firstName} ${user.lastName}!`} </p>
        </div>
    );
};

export default Browse;
