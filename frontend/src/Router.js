import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from "./client/HomePage/home";
import SignUp from "./client/SignUp/sign_up.component";
import LogIn from "./client/LogIn/log_in.component"
import About from "./client/About/about";
import Projects from "./client/Projects/projects"
import MultiStepForm from './client/Projects/CreateProject/multistep-form.component';

const Main = () => {
    
       // fill initialState with projects in database
       const initialProjects = [
        {
            projectName: "Project 1",
            techStack: "react node",
            description: "we gun make something cool",
            curCap: 2,
            maxCap: 6,
            users: ["John", "Jane"]
        },
        {
            projectName: "Project 2",
            techStack: "angular express",
            description: "we gun make something great",
            curCap: 4,
            maxCap: 5,
            users: ["James", "Jo", "Joseph", "Jasmine"]
        },
        {
            projectName: "Project 3",
            techStack: "jQuery PHP",
            description: "we're old",
            curCap: 1,
            maxCap: 3,
            users: ["Diane"]
        },
        {
            projectName: "Project 4",
            techStack: "react node",
            description: "we gun make something amazing",
            curCap: 2,
            maxCap: 4,
            users: ["Kenzie", "Kash"]
        }
    ]
    
    const [projects, setProjects] = React.useState(initialProjects)
    
    
    return (
        <main>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route 
                    exact 
                    path='/about' 
                    render={ routeProps => 
                        < About
                            routeProps={routeProps} 
                        />  
                    }
                />
                <Route 
                    exact 
                    path='/projects' 
                    render={routeProps => 
                        <Projects 
                            routeProps={routeProps}
                            projects={projects}
                            setProjects={setProjects}
                        />
                    } 
                />
                <Route 
                    exact 
                    path='/projects/new' 
                    render={ routeProps => 
                        < MultiStepForm 
                            routeProps={routeProps} 
                            projects={projects}
                            setProjects={setProjects}
                        /> 
                    }
                />
                <Route 
                    exact 
                    path='/signup' 
                    render= { routeProps => 
                        <SignUp 
                            routeProps={routeProps}
                        />
                    } 
                />
                <Route exact path='/login' component={LogIn} />
            </Switch>
        </main>
    )
}


export default Main