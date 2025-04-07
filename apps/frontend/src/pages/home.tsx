import { Layout } from "../components/layout"
import { Header } from "../components/header" 
import { Dashboard } from "../components/dashboard"
import { Button } from "@/components/ui/button"
import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router";



function App() {
  const userContext = useUser();
  if (!userContext) {
    throw new Error("useUser must be used within a UserProvider");
  }
  const { setUser } = userContext;
  const navigate = useNavigate();
  
  function handleClick(){
    setUser(null);
    navigate("/")
  }

  return (
    <Layout>
      <Header>
        <Button onClick={handleClick} variant="ghost" className="text-xl font-semibold text-white">
          Log Out
        </Button>
      </ Header>
      <Dashboard />
    </Layout>
  )
}
 
export default App