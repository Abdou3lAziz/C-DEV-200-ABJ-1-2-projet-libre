import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Accueil from "./views/Accueil";
import Connexion from "./views/Connexion";
import Inscription from "./views/Inscription";


const router = createBrowserRouter([
  {
    path: "/",
    element: 
    <>
      <Accueil />
    </>
  },
  {
    path: "/inscription",
    element: 
    <>
      <Inscription />
    </>
  },
  {
    path: "/connexion",
    element: 
    <>
      <Connexion />
    </>
  },
  {
    path: "/services",
    element: 
    <> 
      <p>Nos services</p>
    </>
  },
  {
    path: "/apropos",
    element: 
    <> 
      <p>A propos</p>
    </>
  },
  {
    path: "/contact",
    element: 
    <> 
      <p>Contact</p>
    </>
  }
])
function App() {
  return <RouterProvider router={router}/>
}

export default App
