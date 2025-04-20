import { Routes, Route, Navigate } from "react-router-dom"
import Home from "@/routes/Home"
import Login from "@/routes/Login"
import ProtectedRoute from "@/routes/ProtectedRoute"
import MyAccount from "@/routes/MyAccount"
import MyGyms from "@/routes/MyGyms"

function App() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="home" element={<ProtectedRoute><Home/></ProtectedRoute>}>
        <Route index element={<Navigate to="my-account" replace />} />
        <Route path="my-account" element={<MyAccount/>}></Route>
        <Route path="my-gyms"    element={<MyGyms/>}></Route>
      </Route>
    </Routes>
  )
}
 
export default App