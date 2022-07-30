import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
function App() {
  return (
   <Router>
    <div className="main-container">
      <header>
        <a href="/">amazon</a>
      </header>
      <main>
        <Routes>
          <Route path="/"element={<HomeScreen/>}/>
          <Route path="/product/:slug"element={<ProductScreen/>}/>
        </Routes>
       </main>
       <footer>
        <p>&copy;2022,All Rights Reserved. Powered by Amazon</p>
        </footer>
    </div>
    </Router>
  );
}

export default App;
