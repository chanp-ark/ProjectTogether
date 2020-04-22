import React, { useState, useEffect } from 'react'
import { Switch, Route} from 'react-router-dom'

import Home from "./client/HomePage/home";
import About from "./client/About/about";
import Groups from "./client/Groups/groups"
import GroupDetails from './client/GroupDetails/groupDetails.component'
import User from './client/User/user.component';
import Profile from './client/User/Profile/profile.component';


const Main = ({token, setToken, userId, setUserId, groupId, setGroupId, refresh, setRefresh }) => {

    // all users
        // sort users by created date, most recent first, **do this later
    const [allUsers, setAllUsers] = useState([])

    useEffect( () => {
        fetch("http://localhost:5000/users",
            {
                method: 'GET',
            })
            .then(response => response.json())
            .then(data => data.profile)
            .then(users => {
                if(users.username !== userId) setAllUsers(users)})
            .catch(err=> {
                console.error(err)
            })
    }, [userId]) 
    
    // all groups
    const [ groups, setGroups ] = useState([])
            
    useEffect( () => {
        const result = () => {
            fetch("http://localhost:5000/groups", {method: "GET"})
                .then(response => response.json())
                .then(data => setGroups(data.groups))
                .catch(err => {
                    console.error(err)
                })
            }
            result()
    }, [groupId])
    
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
                if (obj['password'].length < 4) return alert("Password must be at least 4 characters")
                if (obj['confirmPw'] && obj['password'] !== obj['confirmPw']) return alert("Passwords do not match")
            }
            if (i === 'name') {
                if (i.length >= 12) return alert("Group Name cannot be more than 12 characters")
            }
        }
        return true
    }
    
    return (
        <main>
            <Switch>
                {/* HOME PAGE */}
                <Route exact path='/' render={routeProps =>
                     <Home 
                        routeProps={routeProps} 
                        token={token} 
                        userId={userId} 
                        setToken={setToken} 
                        setUserId={setUserId} 
                        validate={validate} />
                    } />
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
                            groups={groups}
                            token={token}
                            userId={userId}
                            groupId={groupId}
                            setGroupId={setGroupId}
                            refresh={refresh}
                            setRefresh={setRefresh} />
                    } />
                  
                <Route 
                    exact 
                    path={`/groups/:slug`} 
                    render={routeProps => <GroupDetails groupId={groupId} routeProps={routeProps} userId={userId} token={token} />} />
                
                
                <Route 
                    exact 
                    path='/users' 
                    render={ routeProps => 
                        <User 
                            userId={userId} 
                            token={token} 
                            allUsers={allUsers} /> } />
                
                <Route 
                    exact 
                    path={`/users/:slug`}
                    render={ routeProps => <Profile reactProps={routeProps} userId={userId} token={token} refresh={refresh} setRefresh={setRefresh}/>}
                />
                
            </Switch>
        </main>
    )
}


export default Main