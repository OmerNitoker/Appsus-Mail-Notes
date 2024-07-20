const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { BookIndex } from "./apps/books/BookIndex.jsx"
import { Home } from "./views/Home.jsx"
import { MailIndex } from "./apps/mail/views/MailIndex.jsx"
import { NoteIndex } from "./apps/note/views/NoteIndex.jsx"
import { MailDetails } from "./apps/mail/views/MailDetails.jsx"
import { MailCompose } from "./apps/mail/views/MailCompose.jsx"
import {AddTxt} from "./apps/note/views/AddTxt.jsx"
import {AddImg} from "./apps/note/views/AddImg.jsx"
import {AddVideo} from "./apps/note/views/AddVideo.jsx"
import {AddList} from "./apps/note/views/AddList.jsx"
import {AddAudio} from "./apps/note/views/AddAudio.jsx"



export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/book" element={<BookIndex />} />
                <Route path="/mail" element={<MailIndex />} />
                <Route path="/note" element={<NoteIndex />} />
                <Route path="/mail/:mailId" element={<MailDetails/>}/>
                <Route path="mail/compose" element={<MailCompose/>}/>
                <Route path="/add-txt" element={<AddTxt />} />
                <Route path="/add-img" element={<AddImg />} />
                <Route path="/add-vid" element={<AddVideo />} />
                <Route path="/add-list" element={<AddList />} />
                <Route path="/add-audio" element={<AddAudio />} />
            </Routes>
        </section>
    </Router>
}
