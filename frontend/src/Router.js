import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from "./client/HomePage/home";
import About from "./client/About/about";
import Groups from "./client/Groups/groups"
import GroupDetails from "./client/GroupDetails/groupDetails.component"
import User from './client/User/user.component';
import Profile from './client/User/Profile/profile.component';


const Main = ({token, setToken, user, setUser, groupId, setGroupId, refresh, setRefresh }) => {    
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
                if(users.username !== user) setAllUsers(users)})
            .catch(err=> {
                console.error(err)
            })
    }, [user, refresh]) 
    
    
    
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
    }, [groupId, refresh])
    
    // const findOne = (arr, targetKey, targetVal) => {
    //     arr.map(obj => {
    //         for (let key in obj) {
    //             if (key === targetKey && obj[key] === targetVal) {
    //                 console.log(obj)
    //                 return obj
    //             }
    //         }
    //     })
    // }
        
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
                        user={user} 
                        setToken={setToken} 
                        setUser={setUser} 
                        validate={validate} /> } 
                />

                <Route 
                    exact 
                    path='/about' 
                    render={ routeProps => 
                        <About routeProps={routeProps} /> } 
                />
                
                <Route 
                    exact 
                    path='/groups' 
                    render={routeProps => 
                        <Groups
                            routeProps={routeProps}
                            validate={validate}
                            groups={groups}
                            token={token}
                            user={user}
                            groupId={groupId}
                            setGroupId={setGroupId}
                            setRefresh={setRefresh} /> } 
                />
                  
                <Route 
                    exact 
                    path={`/groups/:group`} 
                    render={ routeProps => 
                        <GroupDetails 
                            groupId={groupId} 
                            routeProps={routeProps} 
                            user={user} 
                            token={token}
                    />  }
                />
                
                <Route 
                    exact 
                    path='/users' 
                    render={ routeProps => 
                        <User 
                            user={user} 
                            token={token} 
                            allUsers={allUsers} /> } 
                />
                
                <Route 
                    exact 
                    path={`/users/:user`}
                    render={ routeProps => 
                        <Profile 
                            reactProps={routeProps} 
                            user={user} 
                            setUser={setUser} 
                            token={token} 
                            refresh={refresh} 
                            setRefresh={setRefresh}
                            allUsers={allUsers} /> }
                />
                
            </Switch>
        </main>
    )
}


export default Main