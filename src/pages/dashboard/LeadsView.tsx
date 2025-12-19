import { useState } from "react";
import { GlassCard } from "../../components/ui/GlassCard";
import { Table, User, MoreHorizontal, Filter, Search, Phone, Mail, Calendar, RefreshCw, Zap } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "../../components/ui/sheet";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Slider } from "../../components/ui/slider";




import { PageHeader } from "../../components/dashboard/PageHeader";

export const LeadsView = () => {
    const [selectedLead, setSelectedLead] = useState<any>(null);

    // Mock Leads Data (representing Airtable)
    const leads = [
        { id: 1, name: "Sarah Williams", company: "TechFlow", score: 92, segment: "Hot", stage: "Meeting Booked", activity: "Proposal Viewed", email: "sarah@techflow.io", source: "Inbound" },
        { id: 2, name: "John Smith", company: "Acme Corp", score: 85, segment: "Hot", stage: "Negotiation", activity: "Email Opened", email: "john@acme.com", source: "Apollo" },
        { id: 3, name: "Emily Davis", company: "NextGen", score: 78, segment: "Warm", stage: "Engagement", activity: "Clicked Link", email: "emily@nextgen.com", source: "Webinar" },
        { id: 4, name: "David Miller", company: "FinTech Sol", score: 45, segment: "Cold", stage: "New", activity: "Form Submitted", email: "david@fintech.net", source: "Apollo" },
        { id: 5, name: "Michael Brown", company: "Global Ind", score: 62, segment: "Warm", stage: "Enrichment", activity: "Lead Captured", email: "m.brown@global.com", source: "Apollo" },
    ];

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col gap-6">
            <PageHeader
                subtitle="Leads & Clients"
                helperText="Manage your pipeline and track interactions."
            >
                <div className="flex gap-2 items-center">
                    <Dialog>
                        <DialogTrigger asChild>
                            <button className="flex items-center gap-2 px-3 py-2 bg-green-500/10 rounded-lg text-green-400 text-sm font-medium border border-green-500/20 mr-2 hover:bg-green-500/20 transition-colors cursor-pointer">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                System Status: Active
                            </button>
                        </DialogTrigger>
                        <DialogContent className="bg-card border-white/10 text-white">
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-2"><Zap className="w-5 h-5 text-green-400" /> Active System Connections</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 mt-4">
                                <div className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-sm">Airtable Marketing Base</span>
                                        <Badge className="bg-green-500/20 text-green-400 border-0">Connected</Badge>
                                    </div>
                                    <p className="text-xs text-white/40 font-mono break-all">
                                        Syncing new leads and updates.
                                    </p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-sm">Apollo Lead Enrichment</span>
                                        <Badge className="bg-green-500/20 text-green-400 border-0">Listening</Badge>
                                    </div>
                                    <p className="text-xs text-white/40 font-mono break-all">
                                        Enriching incoming leads automatically.
                                    </p>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                    <Button variant="outline" className="border-white/10 hover:bg-white/5">
                        <RefreshCw className="w-4 h-4 mr-2" /> Refresh
                    </Button>
                </div>
            </PageHeader>

            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <Input placeholder="Search name or company..." className="pl-10 bg-white/5 border-white/10" />
                    </div>
                    <Button variant="outline" className="border-white/10 hover:bg-white/5 gap-2">
                        <Filter className="w-4 h-4" /> Filter
                    </Button>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="w-48 space-y-2">
                        <div className="flex justify-between text-xs text-white/60">
                            <span>Cold</span>
                            <span>Warm</span>
                            <span>Hot</span>
                        </div>
                        <Slider defaultValue={[33, 66]} max={100} step={1} className="w-full" />
                    </div>
                </div>
            </div>

            {/* Leads Table */}
            <GlassCard className="flex-1 p-0 overflow-hidden relative">
                <div className="absolute inset-0 overflow-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="sticky top-0 bg-black/80 backdrop-blur-md z-10">
                            <tr className="border-b border-white/10 text-white/50 text-sm">
                                <th className="p-4 font-medium">Name</th>
                                <th className="p-4 font-medium">Company</th>
                                <th className="p-4 font-medium">Score</th>
                                <th className="p-4 font-medium">Segment</th>
                                <th className="p-4 font-medium">Stage</th>
                                <th className="p-4 font-medium">Last Activity</th>
                                <th className="p-4 font-medium"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {leads.map((lead) => (
                                <tr
                                    key={lead.id}
                                    className="hover:bg-white/5 transition-colors cursor-pointer group"
                                    onClick={() => setSelectedLead(lead)}
                                >
                                    <td className="p-4 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs">
                                            {lead.name.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{lead.name}</p>
                                            <p className="text-xs text-white/40">{lead.email}</p>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-white/70">{lead.company}</td>
                                    <td className="p-4 font-bold">{lead.score}</td>
                                    <td className="p-4">
                                        <Badge variant="outline" className={`border-0 ${lead.segment === 'Hot' ? 'bg-red-500/20 text-red-400' :
                                            lead.segment === 'Warm' ? 'bg-yellow-500/20 text-yellow-400' :
                                                'bg-blue-500/20 text-blue-400'
                                            }`}>
                                            {lead.segment}
                                        </Badge>
                                    </td>
                                    <td className="p-4">
                                        <Badge variant="secondary" className="bg-white/10 text-white/80 hover:bg-white/20">
                                            {lead.stage}
                                        </Badge>
                                    </td>
                                    <td className="p-4 text-xs text-white/50 flex items-center gap-2">
                                        {lead.activity.includes("Call") ? <Phone className="w-3 h-3" /> :
                                            lead.activity.includes("Email") ? <Mail className="w-3 h-3" /> :
                                                <Calendar className="w-3 h-3" />}
                                        {lead.activity}
                                    </td>
                                    <td className="p-4 text-right">
                                        <MoreHorizontal className="w-4 h-4 text-white/40" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </GlassCard>

            {/* Lead Detail Drawer (Sheet) */}
            <Sheet open={!!selectedLead} onOpenChange={(open) => !open && setSelectedLead(null)}>
                <SheetContent className="w-[400px] sm:w-[540px] border-l-white/10 bg-card/95 backdrop-blur-xl p-0">
                    {selectedLead && (
                        <div className="h-full flex flex-col">
                            {/* Header */}
                            <div className="p-6 border-b border-white/10 bg-white/5">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex gap-4">
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xl font-bold">
                                            {selectedLead.name.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold">{selectedLead.name}</h2>
                                            <p className="text-white/60">{selectedLead.company}</p>
                                            <div className="flex gap-2 mt-2">
                                                <Badge className="bg-white/10 text-white/60 hover:bg-white/20">Source: {selectedLead.source}</Badge>
                                                <Badge className={`border-0 ${selectedLead.segment === 'Hot' ? 'bg-red-500/20 text-red-500' :
                                                    selectedLead.segment === 'Warm' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-blue-500/20 text-blue-500'
                                                    }`}>
                                                    {selectedLead.segment} ({selectedLead.score})
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <Button size="sm" variant="outline" className="border-white/10 hover:bg-white/5">
                                        <Mail className="w-4 h-4 mr-2" /> Email
                                    </Button>
                                    <Button size="sm" variant="outline" className="border-white/10 hover:bg-white/5">
                                        <Phone className="w-4 h-4 mr-2" /> Call
                                    </Button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-auto p-6 space-y-8">
                                {/* Timeline */}
                                <div>
                                    <h3 className="font-bold mb-4 flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-primary" /> Activity Timeline
                                    </h3>
                                    <div className="space-y-6 relative ml-2 pl-6 border-l border-white/10">
                                        {[
                                            { event: "Voice call completed", time: "2 hours ago", active: true },
                                            { event: "Link clicked", time: "Yesterday", active: true },
                                            { event: "Email opened", time: "2 days ago", active: true },
                                            { event: "Enriched via Clay", time: "3 days ago", active: true },
                                            { event: "Lead captured", time: "3 days ago", active: true },
                                        ].map((item, i) => (
                                            <div key={i} className="relative">
                                                <div className={`absolute -left-[29px] w-3 h-3 rounded-full border-2 border-background ${item.active ? 'bg-green-500' : 'bg-white/20'}`} />
                                                <p className="text-sm font-medium">{item.event}</p>
                                                <p className="text-xs text-white/40">{item.time}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div>
                                    <h3 className="font-bold mb-4">Manual Actions (Triggers Workflows)</h3>
                                    <div className="grid grid-cols-1 gap-3">
                                        <Button variant="secondary" className="w-full justify-start bg-white/5 hover:bg-white/10 border border-white/10">
                                            Force Re-Enrich (Clay)
                                        </Button>
                                        <Button variant="secondary" className="w-full justify-start bg-white/5 hover:bg-white/10 border border-white/10">
                                            Change Segment (Override)
                                        </Button>
                                        <Button variant="secondary" className="w-full justify-start bg-white/5 hover:bg-white/10 border border-white/10">
                                            Assign Representative
                                        </Button>
                                        <Button variant="destructive" className="w-full justify-start bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20">
                                            Pause Outreach
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    );
};
