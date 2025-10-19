
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Barcode from "./components/Barcode";
import SingleLineBarcode from "./pages/SingleLineBarcode";
import CategoryPage from "./pages/Category";

function App() {
  return (

      <div>
        {/* <Barcode /> */}
        <Routes>
          <Route path="/"  element={<Barcode/>}/>
          <Route path="/:categoryId"  element={<Barcode/>}/>
          <Route path="single"  element={<SingleLineBarcode/>}/>
          <Route path="category"  element={<CategoryPage/>}/>
        </Routes>
      </div>

  );
}

export default App;
