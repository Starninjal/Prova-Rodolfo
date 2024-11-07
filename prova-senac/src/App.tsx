import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import './App.css'
import CadastroUsuario from "./Components/CadastroUsuario/FormUsuario"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/usuario" element={<CadastroUsuario />}/>
      </Routes>
    </Router>
  )
}

export default App
