import { GlassCard } from "../ui/GlassCard";
import { Bot, Mail, Calendar, FileText, Zap, BarChart } from "lucide-react";

export const ValueProps = () => {

    const features = [
        {
            icon: <Bot className="w-8 h-8 text-primary" />,
            title: "Lead Discovery",
            description: "Automatically validate and enrich leads. We score them before they even reach your CRM.",
        },
        {
            icon: <Mail className="w-8 h-8 text-primary" />,
            title: "Smart Follow-ups",
            description: "Personalized email sequences that react to opens, clicks, and replies instantly.",
        },
        {
            icon: <Calendar className="w-8 h-8 text-primary" />,
            title: "Meeting Automation",
            description: "Seamless scheduling with automated reminders and Zoom link generation.",
        },
        {
            icon: <FileText className="w-8 h-8 text-primary" />,
            title: "Proposal -> Payment",
            description: "Generate professional proposals and accept payments in one smooth workflow.",
        },
        {
            icon: <Zap className="w-8 h-8 text-primary" />,
            title: "Voice Agent",
            description: "AI that answers calls, qualifies intent, and schedules meetings 24/7.",
        },
        {
            icon: <BarChart className="w-8 h-8 text-primary" />,
            title: "Real-time Analytics",
            description: "Track every interaction and dollar on a live dashboard.",
        },
    ];

    return (
        <section id="features" className="py-24 relative overflow-hidden">
            <div className="container px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold font-serif mb-6">
                        Automate Every Step of the <br /> <span className="text-gradient-gold">Sales Cycle</span>
                    </h2>
                    <p className="text-white/60 text-lg">
                        Stop juggling tools. Cervoa connects lead gen, outreach, scheduling, and closing into one event-driven engine.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <GlassCard key={index} hoverEffect={true} className="flex flex-col gap-4">
                            <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10 mb-2">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold">{feature.title}</h3>
                            <p className="text-white/60 leading-relaxed">
                                {feature.description}
                            </p>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    );
};
