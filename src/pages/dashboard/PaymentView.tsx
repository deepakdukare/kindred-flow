import { useState } from "react";
import { GlassCard } from "../../components/ui/GlassCard";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { processPayment } from "../../lib/api";
import { CreditCard, Lock, CheckCircle, Download } from "lucide-react";

export const PaymentView = () => {

    const [isProcessing, setIsProcessing] = useState(false);
    const [isPaid, setIsPaid] = useState(false);

    // Mock Invoice Data
    const invoice = {
        id: "INV-2025-001",
        date: "Dec 18, 2025",
        amount: 4500.00,
        description: "Cervoa Implementation - Milestone 1",
        status: isPaid ? "Paid" : "Due"
    };

    const handlePay = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        const success = await processPayment(invoice.amount, invoice.id);
        setIsProcessing(false);
        if (success) setIsPaid(true);
    };

    return (
        <div className="max-w-4xl mx-auto py-8">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Payments</h1>
                    <p className="text-white/60">Manage your invoices and billing.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Invoice Details */}
                <GlassCard>
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Invoice</span>
                            <h2 className="text-2xl font-bold mt-1">#{invoice.id}</h2>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${invoice.status === 'Paid'
                            ? 'bg-green-500/20 text-green-500'
                            : 'bg-amber-500/20 text-amber-500'
                            }`}>
                            {invoice.status.toUpperCase()}
                        </div>
                    </div>

                    <div className="space-y-4 text-sm">
                        <div className="flex justify-between py-2 border-b border-white/10">
                            <span className="text-white/60">Date Issued</span>
                            <span>{invoice.date}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-white/10">
                            <span className="text-white/60">Description</span>
                            <span className="text-right">{invoice.description}</span>
                        </div>
                        <div className="flex justify-between py-2 font-bold text-lg pt-4">
                            <span>Total Amount</span>
                            <span>${invoice.amount.toFixed(2)}</span>
                        </div>
                    </div>

                    {isPaid && (
                        <Button variant="outline" className="w-full mt-6 gap-2">
                            <Download className="w-4 h-4" /> Download Receipt
                        </Button>
                    )}
                </GlassCard>

                {/* Payment Form */}
                <GlassCard className="relative overflow-hidden">
                    {isPaid ? (
                        <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-fade-in-up">
                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle className="w-8 h-8 text-green-500" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Payment Successful</h3>
                            <p className="text-white/60">Thank you! Your payment has been processed.</p>
                        </div>
                    ) : (
                        <form onSubmit={handlePay} className="space-y-6">
                            <div className="flex items-center gap-2 mb-4">
                                <CreditCard className="w-5 h-5 text-primary" />
                                <h3 className="font-bold">Pay with Card</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-white/40">Card Number</label>
                                    <div className="relative">
                                        <Input placeholder="0000 0000 0000 0000" className="bg-white/5 border-white/10 pl-10 font-mono" />
                                        <Lock className="w-4 h-4 text-white/30 absolute left-3 top-2.5" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-white/40">Expiry</label>
                                        <Input placeholder="MM/YY" className="bg-white/5 border-white/10 font-mono" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-white/40">CVC</label>
                                        <Input placeholder="123" className="bg-white/5 border-white/10 font-mono" />
                                    </div>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full font-bold h-12 text-lg"
                                disabled={isProcessing}
                            >
                                {isProcessing ? "Processing..." : `Pay $${invoice.amount}`}
                            </Button>

                            <div className="flex items-center justify-center gap-2 text-xs text-white/30">
                                <Lock className="w-3 h-3" />
                                Seconds Mock Payment
                            </div>
                        </form>
                    )}
                </GlassCard>
            </div>
        </div>
    );
};
