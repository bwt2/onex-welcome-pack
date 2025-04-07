import { Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import Login from "./pages/login"
import { ProtectedRoute } from "./components/ProtectedRoute"

function App() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="home" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
    </Routes>
  )
}
 
export default App