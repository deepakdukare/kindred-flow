import { GlassCard } from "../../components/ui/GlassCard";
import { ArrowUpRight, ArrowDownRight, Users, DollarSign, TrendingUp, Activity } from "lucide-react";

export const AnalyticsView = () => {

    const kpis = [
        { label: "Total Revenue", value: "$42,500", change: "+12%", trend: "up", icon: DollarSign },
        { label: "Active Leads", value: "142", change: "+5%", trend: "up", icon: Users },
        { label: "Meetings Booked", value: "24", change: "+8%", trend: "up", icon: Activity },
        { label: "Avg. Engagement", value: "68%", change: "+3.2%", trend: "up", icon: TrendingUp },
        { label: "Conversion Rate", value: "3.2%", change: "-0.4%", trend: "down", icon: ArrowUpRight }, // Using ArrowUpRight as placeholder for a generic graph icon if needed
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Weekly Analytics</h1>
                    <p className="text-white/60">Performance metrics and insights.</p>
                </div>
                <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-sm">
                    Last 7 Days
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {kpis.map((kpi, i) => (
                    <GlassCard key={i} className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <kpi.icon className="w-5 h-5 text-primary" />
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-bold ${kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                                {kpi.change}
                                {kpi.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            </div>
                        </div>
                        <div>
                            <p className="text-white/60 text-sm mb-1">{kpi.label}</p>
                            <h3 className="text-2xl font-bold">{kpi.value}</h3>
                        </div>
                    </GlassCard>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Mock Chart Area */}
                <GlassCard className="min-h-[300px] flex flex-col">
                    <h3 className="font-bold mb-6">Revenue Trend</h3>
                    <div className="flex-1 flex items-end justify-between gap-2 px-2 pb-2">
                        {[35, 45, 30, 60, 75, 50, 80].map((h, i) => (
                            <div key={i} className="w-full bg-primary/20 rounded-t-sm hover:bg-primary/40 transition-colors relative group">
                                <div
                                    className="bg-primary absolute bottom-0 w-full rounded-t-sm transition-all duration-1000"
                                    style={{ height: `${h}%` }}
                                />
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                    ${h * 100}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-white/30 uppercase font-bold">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                </GlassCard>

                {/* Integration Events */}
                <GlassCard>
                    <h3 className="font-bold mb-6 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-primary" /> Live Events
                    </h3>
                    <div className="space-y-4">
                        {[
                            { event: "Payment Received", source: "Stripe", time: "2 mins ago" },
                            { event: "Proposal Accepted", source: "Cervoa Doc", time: "1 hour ago" },
                            { event: "Voice Call Completed", source: "AI Agent", time: "3 hours ago" },
                            { event: "New Lead Captured", source: "Landing Page", time: "5 hours ago" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    <span className="font-medium text-sm">{item.event}</span>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-white/60">{item.source}</p>
                                    <p className="text-[10px] text-white/30">{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};
