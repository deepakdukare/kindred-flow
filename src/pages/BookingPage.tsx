import { useEffect } from "react";
import { Navbar } from "../components/website/Navbar";
import { GlassCard as UiGlassCard } from "../components/ui/GlassCard";
import { InlineWidget } from "react-calendly";

export const BookingPage = () => {

    useEffect(() => {
        // Simulate triggering the scheduling email webhook on page load or specific action
        // In a real scenario, this might happen *before* landing here, via email link.
        // For this demo, we assume the user clicked a link that brought them here.
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
            <Navbar />
            <main className="pt-32 pb-20 px-6 container mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                        Let's <span className="text-gradient-gold">Connect</span>
                    </h1>
                    <p className="text-white/60 text-lg">
                        Choose a time that works best for you. Our team is ready to demonstrate how Cervoa can transform your sales pipeline.
                    </p>
                </div>

                <UiGlassCard className="max-w-5xl mx-auto p-4 md:p-8 min-h-[800px]">
                    {/* Replace with your actual Calendly URL */}
                    <InlineWidget
                        url="https://calendly.com/deepakdukare/30min"
                        styles={{ height: '750px' }}
                        pageSettings={{
                            backgroundColor: '0f172a',
                            hideEventTypeDetails: false,
                            hideLandingPageDetails: false,
                            primaryColor: 'f59e0b',
                            textColor: 'ffffff'
                        }}
                    />
                </UiGlassCard>
            </main>

            <footer className="py-12 border-t border-white/10 text-center text-white/40 text-sm">
                <p>© 2025 Cervoa. All rights reserved.</p>
            </footer>
        </div>
    );
};
