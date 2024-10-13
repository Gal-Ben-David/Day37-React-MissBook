const { useState } = React
const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./pages/Home.jsx"
import { About } from "./pages/About.jsx"
import { Dashboard } from "./pages/Dashboard.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { BookDetails } from "./cmps/BookDetails.jsx"
import { BookEdit } from "./cmps/BookEdit.jsx"
import { AddReview } from "./cmps/AddReview.jsx"
import { BookAdd } from "./cmps/BookAdd.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"


export function App() {
    return (
        <Router>
            <section className="app">
                <AppHeader />
                <main className="main-layout">
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/home" element={<Home />} />

                        <Route path="/about" element={<About />} />
                        <Route path="/dashboard" element={<Dashboard />} />

                        <Route path="/book" element={<BookIndex />} />
                        <Route path="/book/:bookId" element={<BookDetails />} />
                        <Route path="/book/edit" element={<BookEdit />} />
                        <Route path="/book/edit/:bookId" element={<BookEdit />} />
                        <Route path="/book/review/:bookId" element={<AddReview />} />
                        <Route path="/book/Add" element={<BookAdd />} />
                    </Routes>
                </main>
                <UserMsg />
            </section>
        </Router>
    )
}