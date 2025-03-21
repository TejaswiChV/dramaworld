import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import TableResults from './components/TableResults'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Dramas from './components/Dramas'

function App() {
  return (
    <>
    <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<TableResults />} />
                <Route path="/dramas" element={<Dramas />} />
                {/* <Route path="/contact" element={<Contact />} /> */}
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
