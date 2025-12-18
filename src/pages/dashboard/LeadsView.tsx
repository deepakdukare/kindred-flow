import { GlassCard } from "../../components/ui/GlassCard";
import { Table, User, MoreHorizontal, Filter } from "lucide-react";

export const LeadsView = () => {
    const leads = [
        { name: "John Smith", company: "Acme Corp", score: 85, stage: "Negotiation", activity: "Email opened 2h ago" },
        { name: "Sarah Williams", company: "TechFlow", score: 92, stage: "Meeting Booked", activity: "Proposal viewed" },
        { name: "Michael Brown", company: "Global Industries", score: 64, stage: "Enrichment", activity: "Lead captured" },
        { name: "Emily Davis", company: "NextGen Startups", score: 78, stage: "Engagement", activity: "Clicked link" },
        { name: "David Miller", company: "FinTech Sol", score: 45, stage: "New", activity: "Form submitted" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Leads & Clients</h1>
                    <p className="text-white/60">Manage your pipeline and track interactions.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg flex items-center gap-2 hover:bg-white/10 transition-colors">
                        <Filter className="w-4 h-4" /> Filter
                    </button>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition-colors">
                        Add Lead
                    </button>
                </div>
            </div>

            <GlassCard className="p-0 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/10 bg-white/5 text-white/50 text-sm">
                            <th className="p-4 font-medium">Name</th>
                            <th className="p-4 font-medium">Company</th>
                            <th className="p-4 font-medium">Lead Score</th>
                            <th className="p-4 font-medium">Stage</th>
                            <th className="p-4 font-medium">Last Activity</th>
                            <th className="p-4 font-medium"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {leads.map((lead, i) => (
                            <tr key={i} className="hover:bg-white/5 transition-colors group">
                                <td className="p-4 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                        <User className="w-4 h-4 text-white/70" />
                                    </div>
                                    <span className="font-medium">{lead.name}</span>
                                </td>
                                <td className="p-4 text-white/70">{lead.company}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${lead.score > 80 ? 'bg-green-500/20 text-green-400' :
                                            lead.score > 60 ? 'bg-yellow-500/20 text-yellow-400' :
                                                'bg-white/10 text-white/50'
                                        }`}>
                                        {lead.score}
                                    </span>
                                </td>
                                <td className="p-4 text-sm">{lead.stage}</td>
                                <td className="p-4 text-xs text-white/50">{lead.activity}</td>
                                <td className="p-4 text-right">
                                    <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-white/10 rounded">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </GlassCard>
        </div>
    );
};
