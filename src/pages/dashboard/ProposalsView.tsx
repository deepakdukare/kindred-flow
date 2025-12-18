import { GlassCard } from "../../components/ui/GlassCard";
import { FileText, Download, Send, Eye } from "lucide-react";
import { Link } from "react-router-dom";

export const ProposalsView = () => {
    const proposals = [
        { id: "P-2025-001", client: "Acme Corp", title: "Automation Implementation", status: "Viewed", value: "$4,500", date: "Dec 15, 2025" },
        { id: "P-2025-002", client: "TechFlow", title: "Social Media Strategy", status: "Sent", value: "$2,800", date: "Dec 12, 2025" },
        { id: "P-2025-003", client: "Global Ind", title: "Full Funnel Optimization", status: "Draft", value: "$8,000", date: "Dec 10, 2025" },
    ];

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 p-8 rounded-2xl border border-white/10 relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-serif font-bold mb-2">Proposals</h1>
                    <p className="text-white/60 max-w-xl">Create, track, and manage your AI-generated proposals. High conversion starts here.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {proposals.map((p, i) => (
                    <GlassCard key={i} className="p-6 flex flex-col group hover:border-primary/50 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <FileText className="w-5 h-5 text-white group-hover:text-primary transition-colors" />
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-1 rounded ${p.status === 'Viewed' ? 'bg-blue-500/20 text-blue-400' :
                                    p.status === 'Sent' ? 'bg-yellow-500/20 text-yellow-400' :
                                        'bg-white/10 text-white/40'
                                }`}>
                                {p.status}
                            </span>
                        </div>

                        <h3 className="font-bold text-lg mb-1">{p.title}</h3>
                        <p className="text-sm text-white/60 mb-4">{p.client} • {p.id}</p>

                        <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                            <span className="font-bold text-lg">{p.value}</span>
                            <div className="flex gap-2">
                                <Link to={`/proposal/${p.id}`} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="View">
                                    <Eye className="w-4 h-4" />
                                </Link>
                                <button className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Download">
                                    <Download className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </GlassCard>
                ))}

                {/* Add New Card */}
                <button className="border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center p-6 text-white/40 hover:text-white hover:border-white/30 transition-all min-h-[200px]">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
                        <Plus className="w-6 h-6" />
                    </div>
                    <span className="font-bold">New Proposal</span>
                </button>
            </div>
        </div>
    );
};

// Icon dummy
import { Plus } from "lucide-react";
