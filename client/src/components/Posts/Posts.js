import React from 'react'
import { Grid, CircularProgress } from "@mui/material"
import { useSelector } from 'react-redux'
import useStyles from './styles.js'
import Post from './Post/Post'


function Posts({setCurrentId}) {
  const classes = useStyles();
  const posts = useSelector((state)=>state.posts)
  return (
    !posts.length?<CircularProgress/>:(
      <Grid className={classes.mainContainer} container alignItems="strech" spacing={3}>
          {posts.map((post)=>(
            <Grid item key={post._id} xs={12} sm={6}>
              <Post post={post} setCurrentId={setCurrentId}/>
            </Grid>
          ))}
      </Grid>
    )
  )
}

export default Posts