import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from "./client/HomePage/home";
import SignUp from "./client/SignUp/sign_up.component";
import LogIn from "./client/LogIn/log_in.component"
import About from "./client/About/about";
import Groups from "./client/Groups/groups"
import MultiStepForm from './client/Groups/CreateGroup/multistep-form.component';
import User from './client/User/user.component';
import Profile from './client/User/Profile/profile.component';
import EditProfile from './client/User/Profile/EditProfile/edit.component';
import GroupDetails from './client/Groups/GroupDetails/groupDetails.component'

const Main = ({token, setToken, id, setId}) => {
    // groups
    const [groups, setGroups] = React.useState([])
    
    const [ groupId, setGroupId ] = React.useState('')

    
    React.useEffect( () => {
        const result = () => {
            fetch("http://localhost:5000/groups", {method: "GET"})
                .then(response => response.json())
                .then(data => setGroups(data.groups))
                .catch(err => {
                    console.error(err)
                })
            }
        result()
    }, [])
    
    return (
        <main>
            <Switch>
                <Route exact path='/' component={Home} />
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
                    path='/users/signup' 
                    render= { routeProps => 
                        <SignUp 
                            routeProps={routeProps}
                            token={token}
                            setToken={setToken} />
                    } />
                <Route 
                    exact 
                    path='/users/login' 
                    render={ routeProps => 
                        <LogIn 
                            routeProps={routeProps}
                            token={token}
                            setToken={setToken}
                            id={id}
                            setId={setId}
                            />
                    } />
                <Route 
                    exact 
                    path='/users' 
                    render={ routeProps => <User routeProps={routeProps}/> } />
                <Route 
                    exact 
                    path={`/users/profile/${id}`}
                    render={ routeProps => <Profile routeProps={routeProps} id={id}/>}
                />
                
                
                <Route 
                    exact 
                    path={`/users/profile/${id}/edit`}
                    render={ routeProps => 
                        <EditProfile routeProps={routeProps} token={token}/>} />
            </Switch>
        </main>
    )
}


export default Main