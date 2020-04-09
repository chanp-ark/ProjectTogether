import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from "./client/HomePage/home";
// import About from "./client/About/about";
// import Groups from "./client/Groups/groups"
// import MultiStepForm from './client/Groups/CreateGroup/multistep-form.component';
// import User from './client/User/user.component';
// import Profile from './client/User/Profile/profile.component';
// import EditProfile from './client/User/Profile/EditProfile/edit.component';
// import GroupDetails from './client/Groups/GroupDetails/groupDetails.component'

const Main = ({token, setToken, userId, setUserId, profileId, setProfileId}) => {
    
    // if token and userId is set to true, fetch logged in user's info
    // OR JUST PUT HANDLE LOGIN AND SIGN UP IN APP.jS
    
    return (
        <main>
            <Switch>
                {/* HOME PAGE */}
                <Route exact path='/' render={routeProps => <Home routeProps={routeProps} token={token} userId={userId} setToken={setToken} setUserId={setUserId} />} />
                {/* ABOUT PAGE */}
                {/* <Route 
                    exact 
                    path='/about' 
                    render={ routeProps => 
                        <About routeProps={routeProps} />  
                    } />
                <Route 
                    exact 
                    path='/groups' 
                    render={routeProps => 
                        <Groups
                            routeProps={routeProps}
                            groups={groups}
                            setGroups={setGroups}
                            token={token}
                            id={id}
                            groupId={groupId}
                            setGroupId={setGroupId}
                        />
                    } />
                <Route 
                exact 
                path={`/groups/${groupId}`} 
                render={routeProps => 
                    <GroupDetails
                        routeProps={routeProps}
                        groups={groups}
                        token={token}
                        id={id}
                        groupId={groupId}
                        setGroupId={setGroupId}
                    />
                } />
                
                <Route 
                    exact 
                    path='/groups/new' 
                    render={ routeProps => 
                        <MultiStepForm 
                            routeProps={routeProps} 
                            token={token}
                            groups={groups}
                            setGroups={setGroups}
                            id={id}
                        /> 
                    } />
                <Route 
                    exact 
                    path='/users' 
                    render={ routeProps => <User profileName={profileName} setProfileName={setProfileName} routeProps={routeProps} id={id} /> } />
                <Route 
                    exact 
                    path={`/users/${id}`}
                    render={ routeProps => <Profile profileName={profileName} routeProps={routeProps} id={id}/>}
                />
                
                
                <Route 
                    exact 
                    path={`/users/profile/${id}/edit`}
                    render={ routeProps => 
                        <EditProfile routeProps={routeProps} token={token}/>} /> */}
            </Switch>
        </main>
    )
}


export default Main