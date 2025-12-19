import { useState } from "react";
import { GlassCard } from "../../components/ui/GlassCard";
import { FolderOpen, UploadCloud, FileText, CheckCircle2, Clock, MessageSquare, Shield, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "../../components/ui/sheet";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "../../components/ui/dialog";
import { Checkbox } from "../../components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Input } from "../../components/ui/input";
import { uploadDeliveryAsset } from "../../lib/api";
import { PageHeader } from "../../components/dashboard/PageHeader";

export const DeliveryView = () => {
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    // Mock Data
    const [deliverables, setDeliverables] = useState<any[]>([]); // Start empty to show empty state
    const [timeline, setTimeline] = useState([
        { date: "Dec 18", event: "Payment Received", status: "completed" },
        { date: "Dec 18", event: "Portal Access Granted", status: "completed" },
        { date: "Pending", event: "Kickoff Call", status: "pending" },
        { date: "In Progress", event: "Automation Setup", status: "active" },
        { date: "Upcoming", event: "Review & Handoff", status: "upcoming" },
    ]);

    const [uploadForm, setUploadForm] = useState({
        file: "",
        category: "Other",
        visibility: "client"
    });

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUploading(true);

        // Simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        const success = await uploadDeliveryAsset({
            dealId: "recMOCK_DEAL",
            fileUrl: "https://mock-storage.com/file.pdf", // Mocked URL
            category: uploadForm.category,
            uploadedBy: "CSM",
            fileName: uploadForm.file || "New Asset.pdf"
        });

        if (success) {
            setDeliverables(prev => [
                {
                    id: Date.now(),
                    name: uploadForm.file || "New Deliverable.pdf",
                    category: uploadForm.category,
                    date: "Just now",
                    uploadedBy: "Sarah (CSM)"
                },
                ...prev
            ]);
            setIsUploadOpen(false);
            setUploadForm({ file: "", category: "Other", visibility: "client" });
            alert("Asset uploaded successfully.");
        } else {
            alert("Failed to upload asset.");
        }
        setIsUploading(false);
    };

    return (
        <div className="space-y-6">

            <PageHeader
                subtitle="Delivery Portal"
                helperText="Project: Radiant Systems – Sales Automation"
            >
                <div className="flex gap-2">
                    <Button variant="outline" className="border-white/10 hover:bg-white/5">
                        <MessageSquare className="w-4 h-4 mr-2" /> Message Team
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsUploadOpen(true)}>
                        <UploadCloud className="w-4 h-4 mr-2" /> Upload New Asset
                    </Button>
                </div>
            </PageHeader>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Main Content: Files */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <FolderOpen className="w-5 h-5 text-primary" /> Client Files & Deliverables
                    </h3>

                    {deliverables.length === 0 ? (
                        <GlassCard className="py-16 flex flex-col items-center justify-center text-center space-y-4 border-dashed border-white/10 bg-white/5">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center">
                                <FolderOpen className="w-8 h-8 text-white/20" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Client Folders Empty</h3>
                                <p className="text-white/40 max-w-sm mx-auto mt-1">
                                    No deliverables uploaded yet. Your project is now active. Our team will start sharing files here shortly.
                                </p>
                            </div>
                            <Button variant="secondary" onClick={() => setIsUploadOpen(true)}>
                                Upload First Asset
                            </Button>
                        </GlassCard>
                    ) : (
                        <div className="space-y-3">
                            {deliverables.map((file) => (
                                <GlassCard key={file.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold group-hover:text-primary transition-colors">{file.name}</h4>
                                            <div className="flex items-center gap-2 text-xs text-white/40">
                                                <span>{file.category}</span>
                                                <span>•</span>
                                                <span>Uploaded by {file.uploadedBy}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-sm text-white/40">{file.date}</span>
                                </GlassCard>
                            ))}
                        </div>
                    )}
                </div>

                {/* Sidebar: Timeline & Info */}
                <div className="space-y-6">
                    {/* Project Info Card */}
                    <GlassCard className="p-6 space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">
                                S
                            </div>
                            <div>
                                <p className="text-xs text-white/40 uppercase tracking-wider">Assigned Manager</p>
                                <p className="font-bold">Sarah (CSM)</p>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-white/10 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-white/60">Start Date</span>
                                <span>Dec 18, 2025</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-white/60">Est. Completion</span>
                                <span>Jan 15, 2026</span>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Timeline */}
                    <GlassCard className="p-6">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" /> Delivery Timeline
                        </h3>
                        <div className="space-y-6 relative pl-2 border-l border-white/10 ml-2">
                            {timeline.map((item, i) => (
                                <div key={i} className="relative pl-6">
                                    <span className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full 
                                        ${item.status === 'completed' ? 'bg-green-500' :
                                            item.status === 'active' ? 'bg-primary animate-pulse' :
                                                'bg-white/20'}`}
                                    />
                                    <p className={`text-sm font-medium ${item.status === 'completed' ? 'text-white' : item.status === 'active' ? 'text-primary' : 'text-white/60'}`}>
                                        {item.event}
                                    </p>
                                    <p className="text-xs text-white/40">{item.date}</p>
                                </div>
                            ))}
                        </div>
                    </GlassCard>

                    <GlassCard className="p-4 bg-yellow-500/5 border-yellow-500/10">
                        <div className="flex gap-3">
                            <Shield className="w-5 h-5 text-yellow-500 shrink-0" />
                            <div>
                                <h4 className="font-bold text-sm text-yellow-500">Secure Workspace</h4>
                                <p className="text-xs text-white/60 mt-1">
                                    Only authorized team members and client accounts can view these files.
                                </p>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>

            {/* Upload Modal */}
            <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
                <DialogContent className="bg-card border-white/10 text-white sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Upload Deliverable</DialogTitle>
                        <DialogDescription className="text-white/60">Share documents, reports, or assets with the client.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleUpload} className="space-y-6 mt-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">File Name (Mock)</label>
                            <Input
                                placeholder="e.g. Automation_Setup_Guide.pdf"
                                className="bg-white/5 border-white/10"
                                value={uploadForm.file}
                                onChange={(e) => setUploadForm({ ...uploadForm, file: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Category</label>
                            <Select value={uploadForm.category} onValueChange={(v) => setUploadForm({ ...uploadForm, category: v })}>
                                <SelectTrigger className="bg-white/5 border-white/10">
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Proposal">Proposal</SelectItem>
                                    <SelectItem value="Automation Docs">Automation Docs</SelectItem>
                                    <SelectItem value="Credentials">Credentials</SelectItem>
                                    <SelectItem value="Reports">Reports</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Visibility</label>
                            <Select defaultValue="client">
                                <SelectTrigger className="bg-white/5 border-white/10">
                                    <SelectValue placeholder="Select Visibility" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="client">Client can view</SelectItem>
                                    <SelectItem value="internal">Internal only</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input type="checkbox" id="notify" className="rounded bg-white/10 border-white/20" />
                            <label htmlFor="notify" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Notify client via email
                            </label>
                        </div>

                        <Button type="submit" className="w-full font-bold bg-primary hover:bg-primary/90" disabled={isUploading}>
                            {isUploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <UploadCloud className="w-4 h-4 mr-2" />}
                            {isUploading ? "Uploading..." : "Upload Asset"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};
