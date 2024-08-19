import React, { useState } from 'react';

export default function NoteTakingApp() {
    const [notes, setNotes] = useState([]);
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [selectedNote, setSelectedNote] = useState(null);
    const [isNoteVisible, setIsNoteVisible] = useState(true);

    function handleAddNote() {
        if (noteTitle && noteContent) {
            setNotes([...notes, { title: noteTitle, content: noteContent }]);
            setNoteTitle('');
            setNoteContent('');
        }
    }

    function handleTitleChange(e) {
        setNoteTitle(e.target.value);
    }

    function handleContentChange(e) {
        setNoteContent(e.target.value);
    }

    function handleNoteClick(index) {
        setSelectedNote(notes[index]);
        setIsNoteVisible(true);  // Show the note content when clicked
    }

    function handleHideNote() {
        setIsNoteVisible(false);  // Hide the note content when the "Hide Note" button is clicked
    }

    return (
        <div className="w-screen h-screen flex bg-gray-100 font-sans">
            {/* Sidebar */}
            <div className="w-1/4 h-full bg-white p-4 shadow-lg border-r border-gray-200 overflow-y-auto">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6">Your Notes</h2>
                <ul>
                    {notes.map((note, index) => (
                        <li
                            key={index}
                            onClick={() => handleNoteClick(index)}
                            className={`cursor-pointer p-3 mb-2 rounded-lg transition ${
                                selectedNote && selectedNote.title === note.title && isNoteVisible
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 text-gray-700'
                            } hover:bg-blue-100 hover:text-blue-500`}
                        >
                            <span className="font-medium">{note.title}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main content area */}
            <div className="w-3/4 h-full flex flex-col justify-center items-center p-10 bg-gray-50">
                <div className="flex flex-col justify-center items-center bg-white p-8 rounded-lg shadow-lg max-w-lg w-full mb-8 border border-gray-200">
                    <h2 className="mb-6 text-3xl font-semibold text-gray-800">Create a Note</h2>
                    <input
                        className="bg-gray-200 mb-4 p-3 rounded-lg w-full border focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                        type="text"
                        value={noteTitle}
                        onChange={handleTitleChange}
                        placeholder="Enter note title"
                    />
                    <textarea
                        className="bg-gray-200 mb-4 p-3 rounded-lg w-full border focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                        value={noteContent}
                        onChange={handleContentChange}
                        placeholder="Enter note content"
                        rows="6"
                    />
                    <button
                        onClick={handleAddNote}
                        className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-600 transition w-full"
                    >
                        Add Note
                    </button>
                </div>

                {/* Display selected note */}
                {selectedNote && isNoteVisible && (
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full border border-gray-200">
                        <h3 className="text-2xl font-semibold mb-4 text-gray-800">{selectedNote.title}</h3>
                        <p className="text-gray-700">{selectedNote.content}</p>
                        <button
                            onClick={handleHideNote}
                            className="text-blue-500 hover:text-blue-700 transition mt-6"
                        >
                            Hide Note
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
