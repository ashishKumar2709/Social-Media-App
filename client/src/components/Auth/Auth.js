import React from 'react';
import {useNavigate} from 'react-router-dom';
import {GoogleLogin} from 'react-google-login';
import {Avatar, Button, Paper, Grid, Typography, Container} from '@mui/material'
import useStyles from './styles.js';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useDispatch} from "react-redux";
import Input from './Input.js';
import Icon from "./Icon";
import {signin, signup} from "../../actions/auth.js"

function Auth() {
    const [showPassword, setShowPassword]=React.useState(false)
    const dispatch = useDispatch();
    const classes = useStyles();
    const [isSignUp, setisSignUp] = React.useState(false);
    const[formData,setFormData]=React.useState({firstName:"",lastName:"",email:"",password:"",confirmPassword:""})
    const navigate = useNavigate();
    const handleShowPassword =()=>{
        setShowPassword(pre=>!pre)
    }
    function handleSubmit(event){
        event.preventDefault();
       if(isSignUp){
           dispatch(signup(formData,navigate))
       }
       else{
        dispatch(signin(formData,navigate))
       }
    }
    const handleChange = (event)=>{
        const {name, value} =event.target
        setFormData(pre=>{
            return {...pre,[name]:value}
        })
    }
    const switchMode = ()=>{
        setisSignUp(pre=>!pre)
        setShowPassword(false)
    }
    const googleSuccess = async (res)=>{
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({type: 'AUTH', data:{result, token}})
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    const googleFailure = (error)=>{
        console.log("Google Sign-in was unsuccessful. Try again later.")
        console.log(error.message)
    }
    console.log(formData)
  return (
    <Container component="main" maxWidth='xs'>
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography variant='h5'>{isSignUp ? "Sign Up": "Sign In"}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignUp && (
                            <>
                                <Input name='firstName' label="First Name"  value = {formData.firstName} handleChange={handleChange}autoFocus half/>
                                <Input name='lastName' label="Last Name"  value = {formData.lastName} handleChange={handleChange}half/>
                             </>
                        )

                    }
                    <Input name='email' label="Email Address"  value = {formData.email} handleChange={handleChange}type="email"/>
                    <Input name='password' label="Password"  value = {formData.password} handleChange={handleChange} type={showPassword?"text":"password"}handleShowPassword={handleShowPassword}/>
                    {isSignUp&&<Input name="confirmPassword" label="Confirm Password"  value = {formData.confirmPassword} handleChange={handleChange} type="password"/>}
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}onSubmit={handleSubmit}>{isSignUp?"Sign Up": "Sign In"}</Button>
                <GoogleLogin
                    clientId='1078800264516-d6lcpv44j147nblcr9aekf4bud64p4pi.apps.googleusercontent.com'
                    render={(renderProps)=>(
                        <Button 
                        className={classes.googleButton}
                        color="primary"
                        fullWidth
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        startIcon={<Icon/>}
                        variant='contained'>Sign in with Google</Button>
                    )
                    }
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy='single_host_origin'
                    />
                <Grid container>
                    <Grid item>
                        <Button onClick={switchMode}>{isSignUp?"Already have an account? Sign in.":"Don't have an account? Sign up."}</Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth