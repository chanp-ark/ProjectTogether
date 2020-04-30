import React, {useEffect} from 'react';

import LogIn from "../LogIn/log_in.component";
import SignUp from "../SignUp/sign_up.component"

import './home.styles.css'

const Home = ({token, setToken, user, setUser, routeProps, validate}) => {
    
    // if logged in
    useEffect(()=> {
        if(token) routeProps.history.push(`/groups`)
    }, [token, routeProps.history, user])        
    
    return (
        <>
            <LogIn routeProps={routeProps} setToken={setToken} setUser={setUser} validate={validate}/>
            <div className="home-container">
                <div className="home-title">
                    <h1>project together</h1>
                </div>
                <div className="home-content">
                    <SignUp routeProps={routeProps} setToken={setToken} setUser={setUser} validate={validate} />
                    <div className="home-info">
                        <h3>Home Page Info</h3>
                        <p>Tellus in metus vulputate eu scelerisque felis. Interdum varius sit amet mattis vulputate enim nulla. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Magnis dis parturient montes nascetur ridiculus mus mauris vitae. Sit amet aliquam id diam maecenas ultricies mi eget mauris. Et malesuada fames ac turpis. Vitae tortor condimentum lacinia quis vel eros donec ac odio. In mollis nunc sed id semper risus in hendrerit. Proin fermentum leo vel orci. Malesuada fames ac turpis egestas sed. In fermentum et sollicitudin ac orci phasellus egestas.</p>
                    </div> 
                </div>
            </div>
        </>
        
    )
}

export default Home