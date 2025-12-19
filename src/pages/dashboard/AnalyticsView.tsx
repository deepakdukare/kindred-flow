import { GlassCard } from "../../components/ui/GlassCard";
import {
    BarChart3, PieChart, ArrowUpRight, ArrowDownRight, Users,
    CreditCard, CheckCircle2, Calendar, TrendingUp, Lightbulb,
    Download, Filter, ChevronDown, Video
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { cn } from "../../lib/utils";

export const AnalyticsView = () => {
    // Mock Data reflecting the requested "Single-Glance" philosophy
    const kpis = [
        { label: "Total Leads", value: "124", change: "+12%", trend: "up", icon: Users },
        { label: "Closed Won", value: "18", change: "+5%", trend: "up", icon: CheckCircle2 },
        { label: "Revenue", value: "$92,000", change: "+18%", trend: "up", icon: CreditCard },
        { label: "Close Rate", value: "14.5%", change: "-1.2%", trend: "down", icon: PieChart },
        { label: "Avg Deal Size", value: "$5,111", change: "+4%", trend: "up", icon: TrendingUp },
    ];

    const meetings = [
        { title: "Implementation Kickoff", with: "Jane Doe (CSM)", time: "Today • 2:00 PM", status: "Confirmed", type: "zoom" },
        { title: "CRM Integration Review", with: "Tech Team", time: "Tomorrow • 11:00 AM", status: "Pending", type: "google" },
        { title: "Strategy Session", with: "Sales Lead", time: "Dec 22 • 10:00 AM", status: "Confirmed", type: "zoom" },
    ];

    const projectProgress = [
        { name: "Cervoa Implementation", progress: 45, status: "Active", milestone: "Visual Design" },
        { name: "Radiant Systems Automation", progress: 72, status: "Active", milestone: "QA Testing" },
    ];

    return (
        <div className="space-y-6">
            {/* 1. Header & Filters */}
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 sticky top-0 bg-background/95 backdrop-blur z-10 py-4 border-b border-white/5 -mx-6 px-6">
                <div>
                    <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
                    <p className="text-white/60">Single-glance business health & ROI.</p>
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                    <Select defaultValue="7d">
                        <SelectTrigger className="w-[100px] bg-white/5 border-white/10">
                            <SelectValue placeholder="Range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="7d">Last 7D</SelectItem>
                            <SelectItem value="30d">Last 30D</SelectItem>
                            <SelectItem value="90d">Last 90D</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select defaultValue="all">
                        <SelectTrigger className="w-[120px] bg-white/5 border-white/10">
                            <SelectValue placeholder="Source" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Sources</SelectItem>
                            <SelectItem value="apollo">Apollo</SelectItem>
                            <SelectItem value="clay">Clay</SelectItem>
                            <SelectItem value="organic">Organic</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button variant="outline" className="border-white/10 hover:bg-white/5">
                        <Download className="w-4 h-4 mr-2" /> Export
                    </Button>
                </div>
            </div>

            {/* 2. KPI Snapshot Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {kpis.map((kpi, index) => (
                    <GlassCard key={index} className="p-4 space-y-2">
                        <div className="flex justify-between items-start">
                            <p className="text-white/60 text-xs font-medium uppercase tracking-wider">{kpi.label}</p>
                            <kpi.icon className="w-4 h-4 text-white/40" />
                        </div>
                        <div className="flex items-end justify-between">
                            <h3 className="text-2xl font-bold">{kpi.value}</h3>
                            <span className={cn(
                                "text-xs font-bold px-1.5 py-0.5 rounded flex items-center",
                                kpi.trend === "up" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                            )}>
                                {kpi.trend === "up" ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                                {kpi.change}
                            </span>
                        </div>
                    </GlassCard>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 3. Project Overview Panel */}
                <div className="lg:col-span-2 space-y-6">
                    <GlassCard className="p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                        <div className="relative z-10">
                            <h2 className="text-xl font-bold mb-1">Project Overview</h2>
                            <p className="text-white/60 mb-6">Welcome back, Deepak. Here's what's happening today.</p>

                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
                                    <p className="text-sm text-white/40">Total Leads</p>
                                    <p className="text-2xl font-bold">124</p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
                                    <p className="text-sm text-white/40">Meetings</p>
                                    <p className="text-2xl font-bold">8</p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
                                    <p className="text-sm text-white/40">Actions</p>
                                    <p className="text-2xl font-bold text-amber-400">3</p>
                                </div>
                            </div>

                            <div className="p-4 bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 rounded-lg flex justify-between items-center">
                                <div>
                                    <p className="text-xs text-primary font-bold uppercase tracking-wider mb-1">Next Milestone</p>
                                    <h3 className="text-lg font-bold">Visual Design Approval</h3>
                                    <p className="text-xs text-white/60 mt-1">Due: Dec 20, 2025 • Assigned: Jane Doe</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="secondary">Email</Button>
                                    <Button size="sm">Book Call</Button>
                                </div>
                            </div>
                        </div>
                    </GlassCard>

                    {/* 5. Project Progress */}
                    <GlassCard className="p-6 space-y-6">
                        <h3 className="font-bold flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-primary" /> Delivery Progress
                        </h3>
                        <div className="space-y-6">
                            {projectProgress.map((project, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium">{project.name}</span>
                                        <span className="text-white/60">{project.progress}%</span>
                                    </div>
                                    <Progress value={project.progress} className="h-2" />
                                    <div className="flex justify-between text-xs text-white/40">
                                        <span>Status: {project.status}</span>
                                        <span>Current: {project.milestone}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* 6. Smart Insight Panel */}
                    <GlassCard className="p-6 bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border-indigo-500/20">
                        <div className="flex items-center gap-2 mb-4 text-indigo-400">
                            <Lightbulb className="w-5 h-5" />
                            <h3 className="font-bold">System Insights</h3>
                        </div>
                        <ul className="space-y-3 text-sm">
                            <li className="flex gap-2 items-start">
                                <span className="text-indigo-400">•</span>
                                <span className="text-white/80">Close rate slightly below target <span className="text-white/40">(15%)</span></span>
                            </li>
                            <li className="flex gap-2 items-start">
                                <span className="text-indigo-400">•</span>
                                <span className="text-white/80">Meetings converting well</span>
                            </li>
                            <li className="flex gap-2 items-start">
                                <span className="text-indigo-400">•</span>
                                <span className="text-white/80">Recommend improving lead qualification</span>
                            </li>
                        </ul>
                        <Button className="w-full mt-4 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/20">
                            View Recommendations
                        </Button>
                    </GlassCard>

                    {/* 4. Upcoming Meetings */}
                    <GlassCard className="p-6 space-y-4">
                        <h3 className="font-bold flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-primary" /> Upcoming Meetings
                        </h3>
                        <div className="space-y-4">
                            {meetings.map((meeting, i) => (
                                <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <Badge variant="outline" className="text-[10px] h-5 border-white/10 text-white/40">
                                            {meeting.time}
                                        </Badge>
                                        {meeting.status === "Confirmed" && <CheckCircle2 className="w-3 h-3 text-green-400" />}
                                    </div>
                                    <h4 className="font-bold text-sm">{meeting.title}</h4>
                                    <p className="text-xs text-white/60 mb-3">w/ {meeting.with}</p>
                                    <Button size="sm" className="w-full h-7 text-xs" variant={meeting.status === 'Confirmed' ? 'default' : 'secondary'}>
                                        {meeting.status === 'Confirmed' ? <><Video className="w-3 h-3 mr-1.5" /> Join Zoom</> : 'Pending'}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </div>
            </div>

            {/* 7. Footer: Confidence Signals */}
            <div className="pt-6 border-t border-white/5 flex flex-wrap gap-4 text-xs text-white/40">
                <span>Last Sync:</span>
                <span className="flex items-center gap-1 text-green-400/60"><CheckCircle2 className="w-3 h-3" /> Airtable</span>
                <span className="flex items-center gap-1 text-green-400/60"><CheckCircle2 className="w-3 h-3" /> Calendly</span>
                <span className="flex items-center gap-1 text-green-400/60"><CheckCircle2 className="w-3 h-3" /> Stripe</span>
                <span className="flex items-center gap-1 text-green-400/60"><CheckCircle2 className="w-3 h-3" /> Brevo</span>
            </div>
        </div>
    );
};
