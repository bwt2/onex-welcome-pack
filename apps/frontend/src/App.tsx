import { Routes, Route } from "react-router-dom"
import Home from "@/routes/Home"
import Login from "@/routes/Login"
import ProtectedRoute from "@/routes/ProtectedRoute"

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