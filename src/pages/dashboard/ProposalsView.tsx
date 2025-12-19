import { useState, useEffect } from "react";
import { GlassCard } from "../../components/ui/GlassCard";
import { FileText, Plus, RefreshCw, Send, Loader2, CheckCircle, ExternalLink, Download, FileType, Zap } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "../../components/ui/sheet";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "../../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { Badge } from "../../components/ui/badge";
import { triggerProposalGeneration } from "../../lib/api";
import { PageHeader } from "../../components/dashboard/PageHeader";

export const ProposalsView = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [selectedProposal, setSelectedProposal] = useState<any>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Mock Data mimicking Airtable structure
    const [proposals, setProposals] = useState([
        { id: "prop_1", client: "TechFlow", type: "Sales Proposal", status: "Sent", updated: "2 mins ago", url: "https://gamma.app/doc/example1", generatedAt: "Dec 19, 2025" },
        { id: "prop_2", client: "Alpha Corp", type: "Product Demo", status: "Opened", updated: "Yesterday", url: "https://gamma.app/doc/example2", generatedAt: "Dec 18, 2025" },
        { id: "prop_3", client: "Beta Inc", type: "Custom Proposal", status: "Draft", updated: "Pending", url: "#", generatedAt: "-" },
    ]);

    const [formData, setFormData] = useState({
        lead: "",
        type: "Standard Sales Proposal",
        notes: ""
    });

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsGenerating(true);

        // Optimistic UI Update
        const newId = `prop_${Date.now()}`;
        const tempProposal = {
            id: newId,
            client: formData.lead.split("—")[0].trim(), // Extract name from "Name — Company"
            type: formData.type,
            status: "Generating",
            updated: "Just now",
            url: "#",
            generatedAt: "Pending"
        };
        setProposals([tempProposal, ...proposals]);
        setIsDialogOpen(false); // Close dialog

        // Trigger Webhook
        const success = await triggerProposalGeneration({
            recordId: "recMOCK_AIRTABLE_ID", // Valid mock ID
            source: "manual_proposal",
            triggeredBy: "proposals_page",
            leadName: formData.lead, // Additional context for mock
            proposalType: formData.type,
            notes: formData.notes
        });

        if (success) {
            // Simulate Polling / Wait loop
            setTimeout(() => {
                setProposals(prev => prev.map(p =>
                    p.id === newId ? { ...p, status: "Sent", updated: "Just now", url: "https://gamma.app/doc/new-proposal", generatedAt: "Dec 19, 2025" } : p
                ));
                setIsGenerating(false);
                setFormData({ lead: "", type: "Standard Sales Proposal", notes: "" });
            }, 5000); // 5 sec fake visual delay
        } else {
            setProposals(prev => prev.map(p =>
                p.id === newId ? { ...p, status: "Failed", updated: "Failed" } : p
            ));
            setIsGenerating(false);
            alert("Failed to trigger proposal generation.");
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Generating": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
            case "Sent": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
            case "Opened": return "bg-green-500/10 text-green-400 border-green-500/20";
            case "Failed": return "bg-red-500/10 text-red-400 border-red-500/20";
            case "Draft": return "bg-white/5 text-white/40 border-white/10";
            default: return "bg-white/5 text-white/60";
        }
    };

    return (
        <div className="space-y-6">

            <PageHeader
                subtitle="Proposals"
                helperText="Generate and track client proposals."
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
                                        <span className="font-bold text-sm">Gamma AI Proposal Engine</span>
                                        <Badge className="bg-green-500/20 text-green-400 border-0">Active</Badge>
                                    </div>
                                    <p className="text-xs text-white/40 font-mono break-all">
                                        Generates proposals on demand.
                                    </p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-sm">Airtable Lead Sync</span>
                                        <Badge className="bg-green-500/20 text-green-400 border-0">Two-Way</Badge>
                                    </div>
                                    <p className="text-xs text-white/40 font-mono break-all">
                                        Syncs status updates & documents.
                                    </p>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                    <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsDialogOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" /> New Proposal
                    </Button>
                    <Button variant="outline" className="border-white/10 hover:bg-white/5">
                        <RefreshCw className="w-4 h-4 mr-2" /> Refresh
                    </Button>
                </div>
            </PageHeader>

            {/* Automation Pipeline Visualization */}
            <GlassCard className="p-6">
                <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-6">Automation Pipeline</h3>
                <div className="relative flex items-center justify-between px-4">
                    {/* Connecting Line */}
                    <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-500/20 -z-0" />

                    {/* Step 1: Webhook */}
                    <div className="relative z-10 flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                            <RefreshCw className="w-5 h-5" />
                        </div>
                        <p className="text-xs font-medium">Webhook</p>
                        <Badge variant="outline" className="text-[10px] h-5 bg-blue-500/5 text-blue-300 border-blue-500/10">Active</Badge>
                    </div>

                    {/* Step 2: Get Lead */}
                    <div className="relative z-10 flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60">
                            <FileType className="w-5 h-5" />
                        </div>
                        <p className="text-xs font-medium">Get Lead</p>
                    </div>

                    {/* Step 3: Build Prompt */}
                    <div className="relative z-10 flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                            <Loader2 className="w-5 h-5" />
                        </div>
                        <p className="text-xs font-medium">Build Gamma Prompt</p>
                    </div>

                    {/* Step 4: Create Proposal */}
                    <div className="relative z-10 flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                            <FileText className="w-5 h-5" />
                        </div>
                        <p className="text-xs font-medium">Create Proposal</p>
                    </div>

                    {/* Step 5: Update Airtable */}
                    <div className="relative z-10 flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
                            <CheckCircle className="w-5 h-5" />
                        </div>
                        <p className="text-xs font-medium">Update Airtable</p>
                    </div>
                </div>
            </GlassCard>

            {/* Empty State / Table Logic */}
            {proposals.length === 0 ? (
                <GlassCard className="p-12 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center">
                        <FileText className="w-8 h-8 text-white/40" />
                    </div>
                    <h3 className="text-xl font-bold">No Proposals Yet</h3>
                    <p className="text-white/60 max-w-md">
                        Create your first proposal to start tracking client agreements.
                    </p>
                    <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsDialogOpen(true)}>
                        Create Manual Proposal
                    </Button>
                </GlassCard>
            ) : (
                <GlassCard className="p-0 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-white/5 text-xs uppercase text-white/40 border-b border-white/10">
                            <tr>
                                <th className="p-4 font-medium">Client</th>
                                <th className="p-4 font-medium">Proposal Type</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium">Last Updated</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {proposals.map((proposal) => (
                                <tr key={proposal.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4 font-bold">{proposal.client}</td>
                                    <td className="p-4 text-white/80">{proposal.type}</td>
                                    <td className="p-4">
                                        <Badge variant="outline" className={`border ${getStatusColor(proposal.status)}`}>
                                            {proposal.status === "Generating" && <Loader2 className="w-3 h-3 mr-1 animate-spin" />}
                                            {proposal.status}
                                        </Badge>
                                    </td>
                                    <td className="p-4 text-sm text-white/60">{proposal.updated}</td>
                                    <td className="p-4 text-right">
                                        <Button size="sm" variant="ghost" onClick={() => setSelectedProposal(proposal)}>
                                            View
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </GlassCard>
            )}

            {/* Create Proposal Modal */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-card border-white/10 text-white sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create Manual Proposal</DialogTitle>
                        <DialogDescription className="text-white/60">Triggers Gamma AI to generate a proposal document.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleGenerate} className="space-y-6 mt-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Lead</label>
                            <Select value={formData.lead} onValueChange={(v) => setFormData({ ...formData, lead: v })}>
                                <SelectTrigger className="bg-white/5 border-white/10">
                                    <SelectValue placeholder="Select Lead (Airtable)" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Sarah Williams — TechFlow">Sarah Williams — TechFlow</SelectItem>
                                    <SelectItem value="John Smith — Radiant Systems">John Smith — Radiant Systems</SelectItem>
                                    <SelectItem value="Emily Davis — NextGen">Emily Davis — NextGen</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Proposal Type</label>
                            <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v })}>
                                <SelectTrigger className="bg-white/5 border-white/10">
                                    <SelectValue placeholder="Select Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Standard Sales Proposal">Standard Sales Proposal</SelectItem>
                                    <SelectItem value="Discovery Proposal">Discovery Proposal</SelectItem>
                                    <SelectItem value="Product Demo Proposal">Product Demo Proposal</SelectItem>
                                    <SelectItem value="Custom Proposal">Custom Proposal</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Additional Notes</label>
                            <Textarea
                                placeholder="E.g. Focus on scalability, pricing tiers..."
                                className="bg-white/5 border-white/10 min-h-[100px]"
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            />
                        </div>

                        <Button type="submit" className="w-full font-bold bg-primary hover:bg-primary/90" disabled={isGenerating}>
                            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                            {isGenerating ? "Generating..." : "Generate Proposal"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Proposal Detail Drawer */}
            <Sheet open={!!selectedProposal} onOpenChange={(open) => !open && setSelectedProposal(null)}>
                <SheetContent className="w-[500px] border-l-white/10 bg-card/95 backdrop-blur-xl p-0">
                    {selectedProposal && (
                        <div className="h-full flex flex-col">
                            <div className="p-6 border-b border-white/10 bg-white/5">
                                <h2 className="text-xl font-bold mb-1">{selectedProposal.type}</h2>
                                <p className="text-white/60 text-sm">for {selectedProposal.client}</p>
                            </div>

                            <div className="p-6 space-y-8 overflow-auto flex-1">
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider">Proposal Status</h3>
                                    <div className="flex items-center gap-4">
                                        <Badge variant="outline" className={`text-lg px-4 py-1 border ${getStatusColor(selectedProposal.status)}`}>
                                            {selectedProposal.status}
                                        </Badge>
                                        <span className="text-sm text-white/40">Generated: {selectedProposal.generatedAt}</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider">Gamma Document</h3>
                                    <div className="p-6 bg-white/5 rounded-lg border border-white/10 text-center space-y-4">
                                        <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto text-purple-400">
                                            <FileText className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold">AI Generated {selectedProposal.type}</h4>
                                            <p className="text-sm text-white/40">Hosted on Gamma</p>
                                        </div>
                                        <Button className="w-full font-bold gap-2" onClick={() => window.open(selectedProposal.url, '_blank')} disabled={selectedProposal.status === "Generating" || selectedProposal.status === "Failed"}>
                                            <ExternalLink className="w-4 h-4" /> Open Proposal
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider">Actions</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Button variant="outline" className="border-white/10 hover:bg-white/5">
                                            <Send className="w-4 h-4 mr-2" /> Resend Email
                                        </Button>
                                        <Button variant="outline" className="border-white/10 hover:bg-white/5">
                                            <Download className="w-4 h-4 mr-2" /> Download PDF
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
