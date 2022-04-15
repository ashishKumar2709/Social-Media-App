import React from 'react'
import {AppBar, Typography, Toolbar, Avatar,Button} from '@mui/material'
import useStyles from "./styles.js"
import memories from "../../images/memories.png"
import {Link, useNavigate, useLocation} from "react-router-dom"
import {useDispatch} from 'react-redux';
import decode from 'jwt-decode'

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();  
    const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('profile')));
    
    const logout = ()=>{
      dispatch({type:'LOGOUT' })
      navigate("/")
      setUser(null)
    }

    React.useEffect(()=>{
      const token = user?.token;

      if(token){
        const decodedToken = decode(token)
        console.log(decodedToken.exp)
        console.log(new Date().getTime())
        if(decodedToken.exp*1000<new Date().getTime())logout();
      }

      setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])

    const classes = useStyles();
  return (
    <AppBar className={classes.appBar} position="static" color="primary">
        <div className={classes.mainContainer}>
            <Typography className={classes.heading} component={Link} to ="/ " variant="h2" align='center'>Memories</Typography>
            <img className={classes.image} src={memories} alt="header-image" height='60px'></img>
        </div>
        <Toolbar className={classes.toolbar}>
          {user? (
            <div className={classes.profile}>
              <Avatar className={classes.purple}alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
              <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
              <Button variant="contained" className={classes.logout}color="secondary" onClick={logout}>Logout</Button>
            </div>
          ) : (
          <div>
            <Button component={Link}to="/auth" variant="contained" color="primary">
              Sign In
            </Button>
          </div>
          )}
        </Toolbar>
    </AppBar>
  )
} 

export default Navbar