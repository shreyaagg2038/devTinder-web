import { BrowserRouter,Routes,Route} from "react-router-dom"
import Navbar from "./navbar"
import Login from "./Login"
import Connections from "./Connections"
import Body from "./Body"

function App() {

  return (
    <>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element = {<Body />} >
          <Route path="/login" element = {<Login />} />
          <Route path="/connections" element = {<Connections />} />      
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}
export default App

