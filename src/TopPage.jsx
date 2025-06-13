// TopPage.jsx
import React from 'react';
import TopBar from './TopBar';
import { useUser } from './contexts/UserContext';
import { Loading } from "./Loading";

function TopPage() {
    const { userData, loading, error } = useUser();

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="app">
            <TopBar />
            <main className="main-content">
                {/* Your main content goes here */}
                <h1>Welcome to My Site!</h1>
                <p>This is some content below the fixed top bar.</p>
                {/* Add a lot of content to make the page scrollable for testing */}
                {Array.from({ length: 50 }).map((_, i) => (
                    <p key={i}>Scrollable content line {i + 1}.</p>
                ))}
            </main>
        </div>
    );
}

export default TopPage