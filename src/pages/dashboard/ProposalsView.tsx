import { useState, useEffect } from "react";
import { GlassCard } from "../../components/ui/GlassCard";
import { FileText, Plus, RefreshCw, Send, Loader2, CheckCircle, ExternalLink, Download, FileType } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "../../components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { Badge } from "../../components/ui/badge";
import { triggerProposalGeneration } from "../../lib/api";

export const ProposalsView = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [selectedProposal, setSelectedProposal] = useState<any>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

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
        setIsSheetOpen(false); // Close drawer

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
            import {PageHeader} from "../../components/dashboard/PageHeader";

            return (
            <div className="space-y-6">
                <PageHeader
                    subtitle="Proposals"
                    helperText="Generate and track client proposals."
                >
                    <div className="flex gap-2">
                        <Button variant="outline" className="border-white/10 hover:bg-white/5">
                            <RefreshCw className="w-4 h-4 mr-2" /> Refresh
                        </Button>
                        <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsSheetOpen(true)}>
                            <Plus className="w-4 h-4 mr-2" /> New Proposal
                        </Button>
                    </div>
                </PageHeader>

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
                        <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsSheetOpen(true)}>
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
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetContent className="w-[400px] border-l-white/10 bg-card/95 backdrop-blur-xl">
                        <SheetHeader>
                            <SheetTitle>Create Manual Proposal</SheetTitle>
                            <SheetDescription>Triggers Gamma AI to generate a proposal document.</SheetDescription>
                        </SheetHeader>
                        <form onSubmit={handleGenerate} className="space-y-6 mt-8">
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

                            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20 text-xs text-blue-300">
                                <strong>Automation:</strong> Webhook → Get Lead → Build Gamma Prompt → Create Proposal → Update Airtable
                            </div>
                        </form>
                    </SheetContent>
                </Sheet>

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
