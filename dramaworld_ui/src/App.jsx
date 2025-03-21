import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import TableResults from './components/TableResults'

function App() {
  return (
    <>
      <div>
        <NavBar />
        <TableResults />
       </div>
    </>
  )
}

export default App
