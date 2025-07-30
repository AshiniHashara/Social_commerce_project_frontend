import Category from "./components/Category/Category"
import Navbar from "./components/Navbar/Navbar"
import Post_Product01 from "./pages/Post_Product01/Post_Product01"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Post_Product02 from "./pages/Post_Product02/Post_Product02"
import Post_Product03 from "./pages/Post_Product03/Post_Product03"
import Post_Product04 from "./pages/Post_Product04/Post_Product04"
import Post_Product05 from "./pages/Post_Product05/Post_Product05"
import Post_Product06 from "./pages/Post_Product06/Post_Product06"
import Post_Product07 from "./pages/Post_Product07/Post_Product07"
import WhatsApp from "./pages/WhatsApp/WhatsApp"
import Product_Share from "./pages/Product_Share/Product_Share"
import Product_Share_Display from "./pages/Product_Share_Display/Product_Share_Display"
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
            <Route path="/post06" element={<Post_Product06/>}/>
            <Route path="/post07" element={<Post_Product07/>}/>
            <Route path="/share/:id" element={<Product_Share/>}/>
            <Route path="/wha" element={<WhatsApp/>}/>
            <Route path="/product/:id/:retailerId" element={<Product_Share_Display/>}/>
          </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
