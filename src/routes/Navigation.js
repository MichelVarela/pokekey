import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import Layout from '../components/Layout';

// pages
import Home from '../pages/Home';
import Detail from "../pages/Detail";
import Types from "../pages/Types";

const Navigation = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout/>} >
                <Route index element={<Home/>} />
                <Route path="type">
                    <Route path=':id' element={<Types/>} />
                </Route>
                <Route path="detail">
                    <Route path=":name" element={<Detail/>}/>
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
    )
}

export default Navigation;
