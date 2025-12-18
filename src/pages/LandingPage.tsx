
import { Navbar } from "../components/website/Navbar";
import { Hero } from "../components/website/Hero";
import { ValueProps } from "../components/website/ValueProps";
import { LeadForm } from "../components/website/LeadForm";
import { VoiceAgentSection } from "../components/website/VoiceAgentSection";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
            <Navbar />
            <main>
                <Hero />
                <ValueProps />
                <VoiceAgentSection />
                <LeadForm />
            </main>

            {/* Simple Footer */}
            <footer className="py-12 border-t border-white/10 text-center text-white/40 text-sm">
                <p>© 2025 Cervoa. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
