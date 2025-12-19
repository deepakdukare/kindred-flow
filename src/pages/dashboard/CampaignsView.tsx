import { useState } from "react";
import { GlassCard } from "../../components/ui/GlassCard";
import { Activity, RefreshCw, FileText, Zap, Flame, Snowflake, TrendingUp, CheckCircle2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "../../components/ui/sheet";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "../../components/ui/dialog";

export const CampaignsView = () => {
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 1000);
    };

    // Mock Live Feed Data
    const liveFeed = [
        { id: 1, time: "2 sec ago", lead: "Sarah W", event: "Opened", score: "+10", segment: "Warm", action: "Updated", company: "TechFlow", prevScore: 82, newScore: 92 },
        { id: 2, time: "10 sec ago", lead: "John S", event: "Clicked", score: "+10", segment: "Warm", action: "CTA Logged", company: "Acme Corp", prevScore: 75, newScore: 85 },
        { id: 3, time: "1 min ago", lead: "Mike B", event: "Replied", score: "+20", segment: "Hot", action: "Promoted", company: "Global Industries", prevScore: 62, newScore: 82 },
        { id: 4, time: "2 min ago", lead: "David M", event: "Hard Bounce", score: "—", segment: "Cold", action: "Email Disabled", company: "FinTech Sol", prevScore: 45, newScore: 45 },
    ];

    const rules = [
        { event: "Opened", score: "+5 / +10", segment: "—", action: "Update Lead" },
        { event: "Clicked", score: "+10", segment: "—", action: "Track CTA" },
        { event: "Replied", score: "+20", segment: "Warm → Hot", action: "Alert Sales" },
        { event: "Hard Bounce", score: "—", segment: "Any → Cold", action: "Disable Email" },
    ];

    return (
        <div className="space-y-8">
            import {PageHeader} from "../../components/dashboard/PageHeader";

            return (
            <div className="space-y-8">
                <PageHeader
                    subtitle="Campaigns"
                    helperText="Track live engagement events and automate lead scoring."
                >
                    <div className="flex gap-2 items-center">
                        <Dialog>
                            <DialogTrigger asChild>
                                <button className="flex items-center gap-2 px-3 py-2 bg-green-500/10 rounded-lg text-green-400 text-sm font-medium border border-green-500/20 mr-2 hover:bg-green-500/20 transition-colors cursor-pointer">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    Webhook Status: Connected
                                </button>
                            </DialogTrigger>
                            <DialogContent className="bg-card border-white/10 text-white">
                                <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2"><Zap className="w-5 h-5 text-green-400" /> Active Webhook Connections</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 mt-4">
                                    <div className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-sm">Brevo Email Campaign Trigger</span>
                                            <Badge className="bg-green-500/20 text-green-400 border-0">Active</Badge>
                                        </div>
                                        <p className="text-xs text-white/40 font-mono break-all">
                                            https://deepakdukare-n8n-free.hf.space/webhook/d9cf76ca-d2a3-4d81-8c3a-0e63a8cadb97
                                        </p>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-sm">Engagement Tracking & Re-Scoring</span>
                                            <Badge className="bg-green-500/20 text-green-400 border-0">Listening</Badge>
                                        </div>
                                        <p className="text-xs text-white/40 font-mono break-all">
                                            https://deepakdukare-n8n-free.hf.space/webhook/brevo-engagement
                                        </p>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>

                        <Button variant="outline" className="border-white/10 hover:bg-white/5" onClick={handleRefresh}>
                            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} /> Refresh
                        </Button>
                        <Button variant="secondary" className="bg-white/10 hover:bg-white/20">
                            <FileText className="w-4 h-4 mr-2" /> View Logs
                        </Button>
                    </div>
                </PageHeader>

                {/* Campaign Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <GlassCard className="p-6 space-y-3 border-l-4 border-l-green-500">
                        <div className="flex justify-between items-start">
                            <div className="p-2 bg-green-500/20 rounded-lg">
                                <Activity className="w-5 h-5 text-green-400" />
                            </div>
                            <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">Active</Badge>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Engagement Tracking</h3>
                            <p className="text-xs text-white/50 mb-1">Source: Brevo Webhook</p>
                            <p className="text-xs text-white/40">/webhook/brevo-engagement</p>
                        </div>
                    </GlassCard>

                    <GlassCard className="p-6 space-y-3 border-l-4 border-l-red-500">
                        <div className="flex justify-between items-start">
                            <div className="p-2 bg-red-500/20 rounded-lg">
                                <Flame className="w-5 h-5 text-red-400" />
                            </div>
                            <CheckCircle2 className="w-4 h-4 text-white/20" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Hot Lead Promotions</h3>
                            <p className="text-xs text-white/50 mb-1">Rule: Reply (+20)</p>
                            <p className="text-xs text-white/40">Action: Segment → Hot</p>
                        </div>
                    </GlassCard>

                    <GlassCard className="p-6 space-y-3 border-l-4 border-l-blue-500">
                        <div className="flex justify-between items-start">
                            <div className="p-2 bg-blue-500/20 rounded-lg">
                                <Snowflake className="w-5 h-5 text-blue-400" />
                            </div>
                            <CheckCircle2 className="w-4 h-4 text-white/20" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Cold Lead Handling</h3>
                            <p className="text-xs text-white/50 mb-1">Rule: Hard Bounce</p>
                            <p className="text-xs text-white/40">Action: Segment → Cold</p>
                        </div>
                    </GlassCard>

                    <GlassCard className="p-6 space-y-3 border-l-4 border-l-purple-500">
                        <div className="flex justify-between items-start">
                            <div className="p-2 bg-purple-500/20 rounded-lg">
                                <TrendingUp className="w-5 h-5 text-purple-400" />
                            </div>
                            <CheckCircle2 className="w-4 h-4 text-white/20" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Score Adjustments</h3>
                            <p className="text-xs text-white/50 mb-1">Open: +5/10 • Click: +10</p>
                            <p className="text-xs text-white/40">Reply: +20</p>
                        </div>
                    </GlassCard>
                </div>

                {/* Engagement Rules Engine */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-400" />
                        <h2 className="text-xl font-bold">Engagement Rules Engine</h2>
                    </div>
                    <GlassCard className="p-0 overflow-hidden">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-white/5 text-white/50 border-b border-white/10">
                                <tr>
                                    <th className="p-4 font-medium">Event</th>
                                    <th className="p-4 font-medium">Score Change</th>
                                    <th className="p-4 font-medium">Segment Change</th>
                                    <th className="p-4 font-medium">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {rules.map((rule, i) => (
                                    <tr key={i} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4 font-medium">{rule.event}</td>
                                        <td className="p-4 text-green-400">{rule.score}</td>
                                        <td className="p-4 text-white/70">{rule.segment}</td>
                                        <td className="p-4 text-white/70">{rule.action}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </GlassCard>
                </div>

                {/* Live Engagement Feed */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-green-400" />
                        <h2 className="text-xl font-bold">Live Engagement Activity</h2>
                    </div>
                    <GlassCard className="p-0 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-white/5 text-white/50 border-b border-white/10">
                                <tr>
                                    <th className="p-4 font-medium">Time</th>
                                    <th className="p-4 font-medium">Lead</th>
                                    <th className="p-4 font-medium">Event</th>
                                    <th className="p-4 font-medium">Score Change</th>
                                    <th className="p-4 font-medium">Segment</th>
                                    <th className="p-4 font-medium">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {liveFeed.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-white/5 transition-colors cursor-pointer"
                                        onClick={() => setSelectedEvent(item)}
                                    >
                                        <td className="p-4 text-white/40 text-sm font-mono">{item.time}</td>
                                        <td className="p-4 font-medium text-blue-300">{item.lead}</td>
                                        <td className="p-4">
                                            <Badge variant="outline" className={`border-0 ${item.event === 'Replied' ? 'bg-green-500/20 text-green-400' :
                                                item.event === 'Hard Bounce' ? 'bg-red-500/20 text-red-400' :
                                                    'bg-blue-500/20 text-blue-400'
                                                }`}>
                                                {item.event}
                                            </Badge>
                                        </td>
                                        <td className="p-4 font-mono text-green-400">{item.score}</td>
                                        <td className="p-4">
                                            <Badge variant="secondary" className="bg-white/10 text-white/80">
                                                {item.segment === 'Hot' ? '🔥 Hot' : item.segment === 'Cold' ? '❄️ Cold' : 'Warm'}
                                            </Badge>
                                        </td>
                                        <td className="p-4 text-white/60 text-sm">{item.action}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </GlassCard>
                </div>

                {/* Event Detail Drawer */}
                <Sheet open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
                    <SheetContent className="w-[400px] border-l-white/10 bg-card/95 backdrop-blur-xl p-0">
                        {selectedEvent && (
                            <div className="h-full flex flex-col">
                                <div className="p-6 border-b border-white/10 bg-white/5">
                                    <h2 className="text-2xl font-bold mb-1">{selectedEvent.event} Event</h2>
                                    <p className="text-white/60 text-sm">{selectedEvent.time}</p>
                                </div>

                                <div className="p-6 space-y-6">
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider">Lead Details</h3>
                                        <div className="bg-white/5 p-4 rounded-lg space-y-2 border border-white/10">
                                            <div className="flex justify-between">
                                                <span className="text-white/60">Lead:</span>
                                                <span className="font-medium">{selectedEvent.lead}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-white/60">Company:</span>
                                                <span className="font-medium">{selectedEvent.company}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider">Scoring Impact</h3>
                                        <div className="bg-white/5 p-4 rounded-lg space-y-3 border border-white/10">
                                            <div className="flex justify-between items-center">
                                                <span className="text-white/60">Previous Score:</span>
                                                <span className="font-mono">{selectedEvent.prevScore}</span>
                                            </div>
                                            <div className="w-full h-px bg-white/10" />
                                            <div className="flex justify-between items-center">
                                                <span className="text-white/60">Event Impact:</span>
                                                <span className="font-mono text-green-400">{selectedEvent.score}</span>
                                            </div>
                                            <div className="w-full h-px bg-white/10" />
                                            <div className="flex justify-between items-center bg-green-500/10 -mx-4 -mb-4 p-4 rounded-b-lg">
                                                <span className="text-green-300 font-bold">New Score:</span>
                                                <span className="font-mono text-xl font-bold text-green-400">{selectedEvent.newScore}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider">Segment Change</h3>
                                        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                                            <Badge className="bg-yellow-500/10 text-yellow-500 border-0">Warm</Badge>
                                            <div className="flex-1 h-px bg-white/20 relative">
                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">→</div>
                                            </div>
                                            <Badge className={`${selectedEvent.segment === 'Hot' ? 'bg-red-500/20 text-red-500' :
                                                selectedEvent.segment === 'Cold' ? 'bg-blue-500/20 text-blue-500' : 'bg-yellow-500/20 text-yellow-500'
                                                } border-0`}>{selectedEvent.segment}</Badge>
                                        </div>
                                    </div>

                                    <div className="pt-6 mt-6 border-t border-white/10">
                                        <p className="text-xs text-white/30 text-center">
                                            Processed via Brevo Webhook → Normalize → Event Switch → Update Airtable
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </SheetContent>
                </Sheet>
            </div>
            );
};
