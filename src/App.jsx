import { BrowserRouter,Routes,Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import Connections from "./components/Connections"
import Body from "./components/Body"
import {Provider} from "react-redux";
import appStore from "./utils/appStore"
import Feed from "./components/Feed"

function App() {

  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element = {<Body />} >
          <Route path="/" element = {<Feed />} />
          <Route path="/login" element = {<Login />} />
          <Route path="/connections" element = {<Connections />} />      
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>

    </>
  )
}
export default App

