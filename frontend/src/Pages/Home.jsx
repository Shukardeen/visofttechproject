import React, { useEffect, useState } from 'react'
import { About, Contact, Hero, OurWork, Service } from "../Sections/Sections.js"
import { replace, useLocation, useNavigate } from 'react-router-dom'
import { AuthModals } from "../Components/Components.js"

function Home() {
    const navigate = useNavigate();
    const location = useLocation();
    const showAuthModal = location.state?.showAuthModal || false;
    const unauthorizedAcceess = location.state?.unauthorizedAcceess || false;
    const [isAuthOpen, setIsAuthOpen] = useState(false);

    useEffect(() => {
        if(showAuthModal) {
            setIsAuthOpen(true);
            navigate("/", { replace: true });
        };
        if(unauthorizedAcceess) {
            alert ("You are not authorized to perform this action");
            navigate("/", { replace: true });
        };
    }, [showAuthModal, unauthorizedAcceess, navigate]);
    return (
        <>
            <Hero />
            <Service />
            <About />
            <OurWork />
            <Contact />

            <AuthModals 
            isOpen={isAuthOpen}
            onClose={() => setIsAuthOpen(false)}
            initialMode='login'
            />
        </>
    )
}

export default Home
