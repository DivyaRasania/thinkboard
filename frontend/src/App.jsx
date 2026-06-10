import {Route, Routes} from "react-router";
import CreatePage from "./pages/CreatePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import NoteDetailPage from "./pages/NoteDetailPage.jsx";

const App = () => {
    return (
        <div data-theme="coffee">
            <Routes>
                <Route path={"/"} element={<HomePage/>}/>
                <Route path={"/create"} element={<CreatePage/>}/>
                <Route path={"/note/:id"} element={<NoteDetailPage/>}/>
            </Routes>
        </div>
    );
};

export default App;