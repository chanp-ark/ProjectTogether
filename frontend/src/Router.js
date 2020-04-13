import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from "./client/HomePage/home";
import About from "./client/About/about";
import Groups from "./client/Groups/groups"
import GroupDetails from './client/Groups/GroupDetails/groupDetails.component'
// import MultiStepForm from './client/Groups/CreateGroup/multistep-form.component';
// import User from './client/User/user.component';
// import Profile from './client/User/Profile/profile.component';
// import EditProfile from './client/User/Profile/EditProfile/edit.component';

const Main = ({token, setToken, userId, setUserId, groupId, setGroupId}) => {
    
    // if token and userId is set to true, fetch logged in user's info

    // send logged in user to group
    
console.log("router", groupId)
    // Validation
    const validate = (obj) => {
        for (let i in obj) {
            console.log(i, obj[i])
            if (!obj[i]) return alert ("You must enter all fields")
            if (i === 'username') {
                if (obj['username'].match(' ')) return alert("Username must be one word")
                // check for punctuation
            }     
            if (i === 'password') {
                if (obj['password'].length < 6) return alert("Password must be at least 6 characters")
                if (obj['confirmPw'] && obj['password'] !== obj['confirmPw']) return alert("Passwords do not match")
            }
            if (i === 'name') {
                // check for punctuation
            }
        }
        return true
    }
    
    return (
        <main>
            <Switch>
                {/* HOME PAGE */}
                <Route exact path='/' render={routeProps => <Home routeProps={routeProps} token={token} userId={userId} setToken={setToken} setUserId={setUserId} validate={validate}/>} />
                {/* ABOUT PAGE */}
                <Route 
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
                            validate={validate}
                            token={token}
                            userId={userId}
                            groupId={groupId}
                            setGroupId={setGroupId}
                            
                        />
                    } />
                  
                <Route 
                    exact 
                    path={`/groups/${groupId}`} 
                    render={routeProps => <GroupDetails groupId={groupId} routeProps={routeProps} userId={userId} token={token} />} />
                
                  {/* 
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
                    render={ routeProps => <User profileName={profileName} setProfileName={setProfileName} routeProps={routeProps} userId={userId} token={token} /> } />
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
                <Redirect to="/" />
            </Switch>
        </main>
    )
}


export default Main