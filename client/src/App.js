import React from 'react'
import {Container} from "@mui/material"
import Navbar from './components/Navbar/Navbar.js'
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Auth from './components/Auth/Auth.js'
import Home from './components/Home/Home.js'


function App() {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar/>
        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/auth"exact element={<Auth/>}/>
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App