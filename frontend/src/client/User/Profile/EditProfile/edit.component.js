import React from 'react';
import {Link} from 'react-router-dom';

import "./edit.styles.css"

const EditProfile = () => {
    // check if user matches token. if false, send to their own profile edit
    return (
        <div className="edituser-container">
            <div className="edituser-title">
                <h1>EDIT PROFILE PAGE</h1>
            </div>
            <div className="edituser-content">
                <p>some blah lorem info to edit content filling up space ipsum</p>
            </div>
            <div className="save-button">
                {/* needs an onclick to save info */}
                <Link to="/user/profile">Save</Link>
            </div>
        </div>
    )
}

export default EditProfile