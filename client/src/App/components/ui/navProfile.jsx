import React from "react";
import PropTypes from "prop-types";
import styles from "../../scss/components/navProfile.module.scss";
import { BiUserCheck, BiExit } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/user";

const NavProfile = ({ username }) => {
    const dicpatch = useDispatch();
    return (
        <div className={styles.profileWrapper}>
            <div className={styles.profileWrapper_username}>
                {username} <BiUserCheck size="40px" fill="white" />
                <div className={styles.profileWrapper_Border}></div>
                <Link to="/">
                    <button
                        onClick={() => dicpatch(logOut())}
                        className={styles.profileWrapper_btnLogOut}
                    >
                        <BiExit size="35px" fill="white" />
                    </button>
                </Link>
            </div>
        </div>
    );
};
NavProfile.propTypes = {
    username: PropTypes.string
};
export default NavProfile;
