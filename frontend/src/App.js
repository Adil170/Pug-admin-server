import './App.css';

import {
  createBrowserRouter,
  RouterProvider,
  Link,
} from "react-router-dom";

import HotelForm from './components/HotelForm';
import HotelItems from './pages/HotelItems';
const router = createBrowserRouter([
  {
    path: "/",
    element: (
     <HotelForm/>
    ),
  },
  {
    
    path: "/items/:hotelId",
    element:(
      <HotelItems/>
    ),
  },
]);
<RouterProvider router={router} />

function App() {
  return <RouterProvider router={router}/>
  // return (
  //   <>

  //   <HotelForm/>
   
    
  //     </>
  
}

export default App;
