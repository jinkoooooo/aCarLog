import * as React from "react";
import styled from "styled-components/macro";
import { Power } from "react-feather";
import {Link, useHistory} from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  Tooltip,
  Menu,
  MenuItem,
  IconButton as MuiIconButton,
} from "@material-ui/core";
import {userLogout} from "../redux/reducers/authStore";
import {useTypedSelector} from "../redux/reducers";
import Login from "../pages/login/Login";


const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

function UserDropdown() {
  const [anchorMenu, setAnchorMenu] = React.useState<any>(null);
  const userAuth = useTypedSelector(state => state.userAuth);
  const dispatcher = useDispatch();

  const toggleMenu = (event: React.SyntheticEvent) => {
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenu(null);
  };

  const handleSignOut = async () => {
    dispatcher(
        userLogout()
    );

    closeMenu();
  };



  return (
    <React.Fragment>
      <Tooltip title="Account">
        <IconButton
          aria-owns={Boolean(anchorMenu) ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={toggleMenu}
          color="inherit"
        >
          <Power />
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={closeMenu}
      >
        <MenuItem onClick={closeMenu}>Profile</MenuItem>
        {userAuth.isAuth ? <MenuItem component={Link} to="/aCarLog" onClick={handleSignOut}>Sign Out</MenuItem>
            : <MenuItem onClick={closeMenu}><Login/></MenuItem> }

      </Menu>
    </React.Fragment>
  );
}

export default UserDropdown;
