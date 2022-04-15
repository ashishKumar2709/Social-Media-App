import React from 'react';
import { Typography,TextField,Button,Paper } from '@mui/material';
import useStyles from './styles.js';
import {createPost,updatePost} from '../../actions/posts.js'
import FileBase64 from 'react-file-base64';
import {useDispatch,useSelector} from 'react-redux';




function Form({currentId,setCurrentId}){

    const user = JSON.parse(localStorage.getItem('profile'));
    
    const[postData,setPostData]=React.useState({
        title:'',message:'',tags:'',selectedFile:'',
    })

    const post =useSelector((state)=>currentId?state.posts.find(ele=>ele._id===currentId):null)

    const classes = useStyles();

    const dispatch =useDispatch();

    React.useEffect(()=>{if(post)setPostData(post)},[post])
    
    function handleSubmit(event){
        event.preventDefault();
        if(currentId ){
            dispatch(updatePost(currentId,{...postData, name: user?.result?.name}))
            
        }else{
            dispatch(createPost({...postData, name: user?.result?.name}))
           
        }
        clear()
    }
    
    function clear(){
        setCurrentId(null)
        setPostData({
            title:'',message:'',tags:'',selectedFile:'',
        })
    }
    function handleChange(event){
        const {name,value}=event.target;
        setPostData(pre=>{
            return {...pre,[name]:postData.tags?value.split(','):value}
        })

    }
    if(!user?.result?.name){
        return(
            <Paper className={classes.paper}>
                <Typography variant='h6' align='center'>
                    Please sign in to create posts and see other posts.
                </Typography>
            </Paper>
        )
    }
    return(
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.form} ${classes.root}`}onSubmit={handleSubmit}>
                <Typography variant='h6'>{currentId?"Editing":"Enter Details"}</Typography>
                {/* <TextField 
                    name='creator' 
                    variant='outlined'
                    label='Creator'
                    fullWidth 
                    value={postData.creator}
                    onChange={handleChange}
                /> */}
                <TextField 
                    name='title' 
                    variant='outlined'
                    label='Title'
                    fullWidth 
                    value={postData.title}
                    onChange={handleChange}
                />
                <TextField 
                    name='message' 
                    variant='outlined'
                    label='Message'
                    fullWidth 
                    value={postData.message}
                    onChange={handleChange}
                />
                <TextField 
                    name='tags' 
                    variant='outlined'
                    label='Tags'
                    fullWidth 
                    value={postData.tags}
                    onChange={handleChange}
                />
                <div className={classes.fileInput}><FileBase64 type='file' multiple={false} onDone={({base64})=>setPostData(pre=>{return {...pre,selectedFile:base64}})}/></div>
                <Button className={classes.buttonSubmit}variant='contained'color="primary"size='large'type='submit'fullWidth>Submit</Button>
                <Button variant='contained'color="secondary"size='small'onClick={clear}fullWidth>Clear</Button>

            </form>

        </Paper>
    )
}

export default Form;