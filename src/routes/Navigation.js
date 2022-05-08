import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import Layout from '../components/Layout';

// pages
import Home from '../pages/Home';
import Detail from "../pages/Detail";
import Types from "../pages/Types";
import Generation from '../pages/Generation';
import Search from '../pages/Search';

const Navigation = () => {

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout/>} >
                <Route index element={<Home/>} />
                <Route path="type">
                    <Route path=':id' element={<Types/>} />
                </Route>
                <Route path="generation">
                    <Route path=':id' element={<Generation/>} />
                    <Route path=':id/:type' element={<Generation/>} />
                </Route>
                <Route path="detail">
                    <Route path=":nameID" element={<Detail/>}/>
                </Route>
                <Route path="search">
                    <Route path=":query" element={<Search/>}/>
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
    )
}

export default Navigation;
