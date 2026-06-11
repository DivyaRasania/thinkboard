import {Route, Routes} from "react-router";

import HomePage from "./pages/HomePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import NoteDetailPage from "./pages/NoteDetailPage.jsx";

const App = () => {
    return (
        <div className={"absolute top-0 z-[-2] h-screen w-screen bg-[#000000] " +
            "bg-[radial-gradient(#20161F_1px,#DB924B_1px)] bg-[size:20px_20px]"}>
            <Routes>
                <Route path={"/"} element={<HomePage/>}/>
                <Route path={"/create"} element={<CreatePage/>}/>
                <Route path={"/note/:id"} element={<NoteDetailPage/>}/>
            </Routes>
        </div>
    );
};

export default App;