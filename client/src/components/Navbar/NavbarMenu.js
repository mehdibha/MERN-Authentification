import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signOut as signOutUser } from "../../actions/userActions";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

const NavbarMenu = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const avatar = useSelector((state) => state.userReducer.user.avatar);
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClose = () => {
        setAnchorEl(null);
    };
    const signOut = () => {
        handleClose();
        dispatch(signOutUser());
        history.push("/signin");
    };
    return (
        <div>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <img
                    src={avatar}
                    alt="profile"
                    style={{
                        width: "40px",
                        borderRadius: "4px",
                    }}
                />
                <AddIcon />
            </IconButton>
            <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                elevation={0}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MenuItem onClick={handleClose}>Compte</MenuItem>
                <MenuItem onClick={signOut}>Se déconnecter</MenuItem>
            </Menu>
        </div>
    );
};

export default NavbarMenu;
