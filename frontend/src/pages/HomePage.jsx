import {useEffect, useState} from "react";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar.jsx";
import RateLimitedUI from "../components/RateLimitedUI.jsx";
import NoteCard from "../components/NoteCard.jsx";
import api from "../lib/axios.js";

const HomePage = () => {
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await api.get("/notes");
                setNotes(res.data);

                setIsRateLimited(false);
            } catch (err) {
                console.error("Error fetching notes");

                if (err.response.status === 429) {
                    setIsRateLimited(true);
                } else {
                    toast.error("Failed to load notes");
                }
            } finally {
                setLoading(false);
            }
        }

        fetchNotes();
    }, []);

    return (
        <div className="min-h-screen">
            <Navbar/>

            {isRateLimited && <RateLimitedUI/>}

            <div className={"max-w-7xl mx-auto p-4 mt-6"}>
                {loading && <div className={"text-center text-primary py-10"}>Loading notes...</div>}

                {notes.length > 0 && !isRateLimited && (
                    <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
                        {notes.map((note) => (
                            <div key={note._id}>
                                <NoteCard note={note}/>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;