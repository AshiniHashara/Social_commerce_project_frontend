import Category from "./components/Category/Category"
import Navbar from "./components/Navbar/Navbar"
import Post_Product01 from "./pages/Post_Product01/Post_Product01"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Post_Product02 from "./pages/Post_Product02/Post_Product02"
import Post_Product03 from "./pages/Post_Product03/Post_Product03"
import Post_Product04 from "./pages/Post_Product04/Post_Product04"
import Post_Product05 from "./pages/Post_Product05/Post_Product05"
function App() {
 

  return (
    <>
     <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Category/>}/>
            <Route path="/post01" element={<Post_Product01/>}/>
            <Route path="/post02/:category" element={<Post_Product02/>} />
            <Route path="/post03" element={<Post_Product03/>}/>
            <Route path="/post04" element={<Post_Product04/>}/>
            <Route path="/post05" element={<Post_Product05/>}/>
          </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
