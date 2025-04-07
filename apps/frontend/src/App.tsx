import { Layout } from "./components/layout"
import { Header } from "./components/header" 
import { Dashboard } from "./components/dashboard"

function App() {
  return (
    <Layout>
      <Header />
      <Dashboard />
    </Layout>
  )
}
 
export default App