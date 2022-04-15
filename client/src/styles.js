import { makeStyles } from "@mui/styles";
import { createTheme } from '@mui/material/styles';

const theme=createTheme();

export default makeStyles(()=>({
    
    appBar: {
        borderRadius: 10,
        margin: '30px 0',
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
      },
    heading: {
        color: 'rgba(0,183,255, 1)',
      },
    image: {
        marginLeft: '10',
      },
    [theme.breakpoints.down('sm')]:{
      mainContainer:{
        flexDirection:"column-reverse"
      }
    }

}))