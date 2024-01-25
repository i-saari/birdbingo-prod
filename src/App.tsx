import './App.css';
import {CardPage} from "./layouts/card/CardPage";
import {SelectionPage} from "./layouts/selection/SelectionPage";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {NavBar} from "./layouts/nav/NavBar";
import {CssBaseline} from "@mui/material";
import {styled} from "@mui/material/styles";

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

function App() {
    return (
        <BrowserRouter>
            <CssBaseline />
            <NavBar />
            <Offset />
            <Routes>
                <Route path="/" element={
                    <SelectionPage/>
                }/>
                <Route path="/card" element={
                    <CardPage/>
                }/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
