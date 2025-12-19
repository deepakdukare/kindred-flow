import { useState } from "react";
import { GlassCard } from "../../components/ui/GlassCard";
import { CreditCard, DollarSign, RefreshCw, AlertCircle, CheckCircle2, XCircle, FileText, Send, Clock, Download, ExternalLink, Mail, Zap } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Badge } from "../../components/ui/badge";
import { Sheet, SheetContent } from "../../components/ui/sheet";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { sendPaymentConfirmation, sendPaymentReminder } from "../../lib/api";
import { PageHeader } from "../../components/dashboard/PageHeader";

export const PaymentsView = () => {
    const [selectedTx, setSelectedTx] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false);
    const [newInvoice, setNewInvoice] = useState({ client: "", amount: "", description: "", dueDate: "" });

    const handleCreateInvoice = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsCreateInvoiceOpen(false);
            alert("Invoice created successfully!");
            setNewInvoice({ client: "", amount: "", description: "", dueDate: "" });
        }, 1500);
    };

    // Mock Data reflecting standardized fields and states
    const transactions = [
        {
            id: "inv_1042",
            client: "Radiant Systems",
            amount: "₹45,000",
            status: "PAID",
            date: "Dec 18, 2025",
            method: "Stripe",
            stage: "In Delivery",
            lastAction: "Confirmation Sent",
            email: "finance@radiant.com",
            recordId: "recMOCK1",
            timeline: [
                { date: "Dec 18", event: "Invoice Sent" },
                { date: "Dec 18", event: "Payment Received", highlight: true },
                { date: "Dec 18", event: "Delivery Activated" }
            ]
        },
        {
            id: "inv_1045",
            client: "Alpha Corp",
            amount: "₹75,000",
            status: "FAILED",
            date: "Dec 20, 2025",
            method: "Stripe",
            stage: "Awaiting Payment",
            lastAction: "Reminder Sent",
            email: "billing@alpha.com",
            recordId: "recMOCK2",
            timeline: [
                { date: "Dec 18", event: "Invoice Sent" },
                { date: "Dec 20", event: "Payment Failed", error: true },
                { date: "Dec 21", event: "Reminder Sent" }
            ]
        },
        {
            id: "inv_1049",
            client: "Beta Inc",
            amount: "₹30,000",
            status: "PENDING",
            date: "Dec 22, 2025",
            method: "Bank Transfer",
            stage: "Awaiting Payment",
            lastAction: "Invoice Sent",
            email: "accounts@beta.com",
            recordId: "recMOCK3",
            timeline: [
                { date: "Dec 22", event: "Invoice Sent" },
            ]
        },
    ];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "PAID": return <Badge className="bg-green-500/10 text-green-400 border border-green-500/20"><CheckCircle2 className="w-3 h-3 mr-1" /> Paid</Badge>;
            case "FAILED": return <Badge className="bg-red-500/10 text-red-400 border border-red-500/20"><XCircle className="w-3 h-3 mr-1" /> Failed</Badge>;
            case "PENDING": return <Badge className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"><AlertCircle className="w-3 h-3 mr-1" /> Pending</Badge>;
            default: return <Badge variant="outline">{status}</Badge>;
        }
    };

    const handleAction = async (action: string) => {
        if (!selectedTx) return;
        setIsLoading(true);
        let success = false;

        if (action === "confirm_email") {
            success = await sendPaymentConfirmation({
                recordId: selectedTx.recordId,
                email: selectedTx.email,
                invoiceId: selectedTx.id,
                amount: parseInt(selectedTx.amount.replace(/[^0-9]/g, ''))
            });
        } else if (action === "reminder_email") {
            success = await sendPaymentReminder({
                recordId: selectedTx.recordId,
                email: selectedTx.email,
                invoiceId: selectedTx.id,
                attempt: "manual"
            });
        }

        setIsLoading(false);
        if (success) {
            alert(`Action '${action}' successful.`);
            setSelectedTx(null);
        } else {
            alert("Action failed. Check console/logs.");
        }
    };

    return (
        <div className="space-y-6">

            <PageHeader
                subtitle="Payments"
                helperText="Monitor invoices, payment confirmations, failures, and reminders."
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
                                        <span className="font-bold text-sm">Stripe Payments</span>
                                        <Badge className="bg-green-500/20 text-green-400 border-0">Connected</Badge>
                                    </div>
                                    <p className="text-xs text-white/40 font-mono break-all">
                                        Processing live payments & subscriptions.
                                    </p>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                    <Dialog open={isCreateInvoiceOpen} onOpenChange={setIsCreateInvoiceOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-primary hover:bg-primary/90">
                                <FileText className="w-4 h-4 mr-2" /> Create Invoice
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-card border-white/10 text-white sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Create New Invoice</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleCreateInvoice} className="space-y-4 mt-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Client Name</label>
                                    <Input
                                        placeholder="e.g. Radiant Systems"
                                        value={newInvoice.client}
                                        onChange={(e) => setNewInvoice({ ...newInvoice, client: e.target.value })}
                                        className="bg-white/5 border-white/10"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Amount</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">₹</span>
                                        <Input
                                            placeholder="0.00"
                                            value={newInvoice.amount}
                                            onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
                                            className="bg-white/5 border-white/10 pl-8"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Description</label>
                                    <Textarea
                                        placeholder="Services rendered..."
                                        value={newInvoice.description}
                                        onChange={(e) => setNewInvoice({ ...newInvoice, description: e.target.value })}
                                        className="bg-white/5 border-white/10"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Due Date</label>
                                    <Input
                                        type="date"
                                        value={newInvoice.dueDate}
                                        onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
                                        className="bg-white/5 border-white/10 block w-full"
                                        required
                                    />
                                </div>
                                <div className="pt-4 flex justify-end gap-2">
                                    <Button type="button" variant="ghost" onClick={() => setIsCreateInvoiceOpen(false)} className="hover:bg-white/10">Cancel</Button>
                                    <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isLoading}>
                                        {isLoading ? "Creating..." : "Create Invoice"}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                    <Button variant="outline" className="border-white/10 hover:bg-white/5">
                        <RefreshCw className="w-4 h-4 mr-2" /> Refresh
                    </Button>
                </div>
            </PageHeader>

            {/* Transaction History Table */}
            <div className="space-y-4">
                <GlassCard className="p-0 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-white/5 text-xs uppercase text-white/40 border-b border-white/10">
                            <tr>
                                <th className="p-4 font-medium">Client</th>
                                <th className="p-4 font-medium">Invoice</th>
                                <th className="p-4 font-medium">Amount</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium">Last Action</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {transactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-white/5 transition-colors cursor-pointer" onClick={() => setSelectedTx(tx)}>
                                    <td className="p-4 font-bold">{tx.client}</td>
                                    <td className="p-4 font-mono text-sm text-white/60">{tx.id}</td>
                                    <td className="p-4 font-bold">{tx.amount}</td>
                                    <td className="p-4">{getStatusBadge(tx.status)}</td>
                                    <td className="p-4 text-sm text-white/60">{tx.lastAction}</td>
                                    <td className="p-4 text-right">
                                        <Button size="sm" variant="ghost" className="h-8 text-xs">View</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </GlassCard>
            </div>

            {/* Payment Detail Drawer */}
            <Sheet open={!!selectedTx} onOpenChange={(open) => !open && setSelectedTx(null)}>
                <SheetContent className="w-[450px] border-l-white/10 bg-card/95 backdrop-blur-xl p-0">
                    {selectedTx && (
                        <div className="h-full flex flex-col">
                            <div className="p-6 border-b border-white/10 bg-white/5">
                                <div className="flex justify-between items-start mb-2">
                                    <h2 className="text-xl font-bold">{selectedTx.client}</h2>
                                    {getStatusBadge(selectedTx.status)}
                                </div>
                                <p className="text-white/60 text-sm font-mono flex items-center gap-2">
                                    <FileText className="w-3 h-3" /> {selectedTx.id}
                                </p>
                            </div>

                            <div className="p-6 space-y-8 overflow-auto flex-1">
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider">Payment Details</h3>
                                    <div className="bg-white/5 p-4 rounded-lg space-y-3 border border-white/10">
                                        <div className="flex justify-between">
                                            <span className="text-white/60 text-sm">Amount Paid</span>
                                            <span className="font-bold">{selectedTx.amount}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-white/60 text-sm">Method</span>
                                            <span className="text-white/80 text-sm">{selectedTx.method}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-white/60 text-sm">Date</span>
                                            <span className="text-white/80 text-sm">{selectedTx.date}</span>
                                        </div>
                                        <div className="flex justify-between pt-2 border-t border-white/5">
                                            <span className="text-white/60 text-sm">Delivery Status</span>
                                            <span className="text-white/80 text-sm text-blue-400">{selectedTx.stage}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider">Actions</h3>
                                    <div className="grid grid-cols-1 gap-3">
                                        {selectedTx.status === "PAID" && (
                                            <>
                                                <Button className="w-full justify-start gap-2" variant="outline" onClick={() => handleAction('confirm_email')} disabled={isLoading}>
                                                    <Mail className="w-4 h-4" /> Send Payment Confirmation Email
                                                </Button>
                                                <Button className="w-full justify-start gap-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">
                                                    <ExternalLink className="w-4 h-4" /> View Delivery Workspace
                                                </Button>
                                                <Button className="w-full justify-start gap-2" variant="ghost">
                                                    <Download className="w-4 h-4" /> Download Receipt
                                                </Button>
                                            </>
                                        )}
                                        {selectedTx.status === "FAILED" && (
                                            <>
                                                <Button className="w-full justify-start gap-2" variant="outline" onClick={() => handleAction('reminder_email')} disabled={isLoading}>
                                                    <Mail className="w-4 h-4" /> Send Payment Reminder Email
                                                </Button>
                                                <Button className="w-full justify-start gap-2 bg-red-500/20 text-red-400 hover:bg-red-500/30">
                                                    <RefreshCw className="w-4 h-4" /> Retry Payment (Stripe Link)
                                                </Button>
                                            </>
                                        )}
                                        {selectedTx.status === "PENDING" && (
                                            <>
                                                <Button className="w-full justify-start gap-2" variant="outline" onClick={() => handleAction('reminder_email')} disabled={isLoading}>
                                                    <Clock className="w-4 h-4" /> Send Reminder
                                                </Button>
                                                <Button className="w-full justify-start gap-2" variant="ghost">
                                                    <Send className="w-4 h-4" /> Resend Invoice
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider">Payment Timeline</h3>
                                    <div className="space-y-4 pl-2 border-l border-white/10 ml-2">
                                        {selectedTx.timeline.map((event: any, i: number) => (
                                            <div key={i} className="relative pl-6">
                                                <span className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ${event.highlight ? 'bg-green-500' : event.error ? 'bg-red-500' : 'bg-white/20'}`} />
                                                <p className="text-sm font-medium">{event.event}</p>
                                                <p className="text-xs text-white/40">{event.date}</p>
                                            </div>
                                        ))}
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
