import { Routes, Route, Navigate } from "react-router-dom"
import Home from "@/routes/Home"
import Login from "@/routes/Login"
import ProtectedRoute from "@/routes/ProtectedRoute"
import MyAccount from "@/routes/MyAccount"
import MyGyms from "@/routes/MyGyms"
import Loading from "./routes/Loading"
import { HomeQuery as HomeQueryType } from "./routes/__generated__/HomeQuery.graphql"
import { HomeQuery } from "@/routes/Home"
import { useQueryLoader } from "react-relay"
import { useUser } from "@/contexts/UserContext"
import { useEffect } from "react"

function App() {
  const { user } = useUser();
  const [homeQueryRef, loadHomeQuery] = useQueryLoader<HomeQueryType>(HomeQuery);

  useEffect(() => {
    if (user?.id && user?.homeGymId) {
      const HomeQueryVariable = {
          userId: String(user?.id),
          homeGymId: String(user?.homeGymId)
      }
      loadHomeQuery(HomeQueryVariable);
    }
  }, [user, loadHomeQuery]);

  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="home" element={
          <ProtectedRoute>
            {homeQueryRef ? <Home queryRef={homeQueryRef} /> : <Loading/>}
          </ProtectedRoute>
      }>
        <Route index element={<Navigate to="my-account" replace />} />
        <Route path="my-account" element={<MyAccount/>}></Route>
        <Route path="my-gyms"    element={<MyGyms/>}></Route>
      </Route>
    </Routes>
  )
}
 
export default App;