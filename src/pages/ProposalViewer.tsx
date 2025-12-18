import { useState } from "react";
import { useParams } from "react-router-dom";
import { GlassCard } from "../components/ui/GlassCard";
import { Button } from "../components/ui/button";
import { CheckCircle, Download, FileText, ChevronRight } from "lucide-react";
import { acceptProposal } from "../lib/api";
import { cn } from "../lib/utils";

export const ProposalViewer = () => {
    const { id } = useParams();
    const [activeSection, setActiveSection] = useState("executive-summary");
    const [isAccepted, setIsAccepted] = useState(false);
    const [isSignLoading, setIsSignLoading] = useState(false);

    const sections = [
        { id: "executive-summary", label: "Executive Summary" },
        { id: "scope", label: "Scope of Work" },
        { id: "timeline", label: "Timeline" },
        { id: "pricing", label: "Investments" },
        { id: "terms", label: "Terms & Conditions" },
    ];

    const handleAccept = async () => {
        setIsSignLoading(true);
        await acceptProposal(id || "demo-proposal");
        setTimeout(() => {
            setIsSignLoading(false);
            setIsAccepted(true);
        }, 1500);
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-background text-foreground">

            {/* Sidebar */}
            <aside className="w-full md:w-64 border-r border-white/10 bg-card p-6 flex flex-col fixed md:sticky top-0 h-auto md:h-screen overflow-y-auto z-10">
                <div className="mb-8">
                    <h1 className="text-xl font-serif font-bold mb-2">Cervoa<span className="text-primary">.</span></h1>
                    <p className="text-xs text-white/40">Proposal #{id || "P-2025-001"}</p>
                </div>

                <nav className="space-y-1">
                    {sections.map(section => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={cn(
                                "w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-between group",
                                activeSection === section.id
                                    ? "bg-primary/10 text-primary"
                                    : "text-white/60 hover:text-white hover:bg-white/5"
                            )}
                        >
                            {section.label}
                            {activeSection === section.id && <ChevronRight className="w-4 h-4" />}
                        </button>
                    ))}
                </nav>

                <div className="mt-auto pt-6 border-t border-white/10">
                    <Button variant="outline" className="w-full justify-start gap-2 text-white/60">
                        <Download className="w-4 h-4" /> Download PDF
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-12 overflow-y-auto">
                <div className="max-w-4xl mx-auto space-y-8">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-serif font-bold">Automation Implementation</h2>
                            <p className="text-white/60">Prepared for: ACME Corp</p>
                        </div>
                        {isAccepted && (
                            <div className="flex items-center gap-2 text-green-500 bg-green-500/10 px-4 py-2 rounded-full font-bold text-sm">
                                <CheckCircle className="w-4 h-4" /> Accepted
                            </div>
                        )}
                    </div>

                    {/* Content Mockup */}
                    <GlassCard className="min-h-[600px] p-8 md:p-12">
                        {activeSection === "executive-summary" && (
                            <div className="space-y-6 animate-fade-in">
                                <h3 className="text-2xl font-bold border-b border-white/10 pb-4">Executive Summary</h3>
                                <p className="text-white/80 leading-relaxed">
                                    ACME Corp helps businesses scale, but manual sales processes are creating a bottleneck.
                                    Cervoa proposes a complete automation overhaul to streamline lead capture, engagement, and closing.
                                </p>
                                <p className="text-white/80 leading-relaxed">
                                    Our solution involves deploying a custom n8n workflow engine connected to a unified dashboard,
                                    enabling your team to focus on high-value interactions while AI handles the grunt work.
                                </p>
                            </div>
                        )}

                        {activeSection === "pricing" && (
                            <div className="space-y-6 animate-fade-in">
                                <h3 className="text-2xl font-bold border-b border-white/10 pb-4">Investment</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                        <h4 className="font-bold mb-2">Implementation</h4>
                                        <p className="text-3xl font-bold text-primary mb-1">$4,500</p>
                                        <p className="text-xs text-white/40">One-time fee</p>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                        <h4 className="font-bold mb-2">Monthly Retainer</h4>
                                        <p className="text-3xl font-bold text-white mb-1">$1,200</p>
                                        <p className="text-xs text-white/40">Per month</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Fallback for other sections */}
                        {activeSection !== "executive-summary" && activeSection !== "pricing" && (
                            <div className="space-y-6 animate-fade-in">
                                <h3 className="text-2xl font-bold border-b border-white/10 pb-4 text-capitalize">
                                    {sections.find(s => s.id === activeSection)?.label}
                                </h3>
                                <div className="h-4 bg-white/10 rounded w-3/4 animate-pulse" />
                                <div className="h-4 bg-white/10 rounded w-full animate-pulse" />
                                <div className="h-4 bg-white/10 rounded w-5/6 animate-pulse" />
                                <p className="text-white/40 italic pt-4">Content placeholder for demo...</p>
                            </div>
                        )}
                    </GlassCard>

                    {/* Action Bar */}
                    {!isAccepted && (
                        <div className="sticky bottom-6 bg-background/80 backdrop-blur-lg border border-white/10 p-4 rounded-xl flex items-center justify-between shadow-2xl">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm">Ready to proceed?</p>
                                    <p className="text-xs text-white/50">Accepting triggers the next phase (Invoicing).</p>
                                </div>
                            </div>
                            <Button
                                size="lg"
                                className="font-bold shrink-0"
                                onClick={handleAccept}
                                disabled={isSignLoading}
                            >
                                {isSignLoading ? "Signing..." : "Accept Proposal"}
                            </Button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};
