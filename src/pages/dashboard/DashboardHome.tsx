import { ProjectStatus } from "../../components/dashboard/ProjectStatus";
import { GlassCard } from "../../components/ui/GlassCard";

import { PageHeader } from "../../components/dashboard/PageHeader";

export const DashboardHome = () => {
    return (
        <div className="max-w-6xl mx-auto">
            <PageHeader
                subtitle="Project Overview"
                helperText="Welcome back, Deepak. Here's what's happening today."
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Column */}
                {/* Main Column */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <GlassCard className="p-6">
                            <p className="text-sm text-white/50 mb-1">Total Leads</p>
                            <p className="text-2xl font-bold">124</p>
                        </GlassCard>
                        <GlassCard className="p-6">
                            <p className="text-sm text-white/50 mb-1">Meetings</p>
                            <p className="text-2xl font-bold text-primary">8</p>
                        </GlassCard>
                        <GlassCard className="p-6">
                            <p className="text-sm text-white/50 mb-1">Pending Actions</p>
                            <p className="text-2xl font-bold">3</p>
                        </GlassCard>
                    </div>

                    {/* Active Project Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <GlassCard className="p-6">
                            <h3 className="font-bold mb-4 text-primary">Next Milestone</h3>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold">3</div>
                                <div>
                                    <p className="font-medium">Visual Design Approval</p>
                                    <p className="text-xs text-white/40">Due: Dec 20, 2025</p>
                                </div>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-1.5 mt-2">
                                <div className="bg-primary h-full rounded-full w-[70%]" />
                            </div>
                        </GlassCard>

                        <GlassCard className="p-6">
                            <h3 className="font-bold mb-4 text-primary">Assigned CSM</h3>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-lg font-bold">
                                    JD
                                </div>
                                <div>
                                    <p className="font-medium">Jane Doe</p>
                                    <p className="text-xs text-white/40">Customer Success Manager</p>
                                    <div className="flex gap-2 mt-1">
                                        <button className="text-[10px] bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors">Email</button>
                                        <button className="text-[10px] bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors">Book Call</button>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 min-h-[300px]">
                        <h3 className="font-bold mb-4">Upcoming Meetings</h3>
                        <div className="space-y-4">
                            {[
                                { title: "Implementation Kickoff", time: "Today, 2:00 PM", with: "Jane Doe (CSM)", status: "Confirmed" },
                                { title: "CRM Integration Review", time: "Tomorrow, 11:00 AM", with: "Tech Team", status: "Pending" },
                                { title: "Strategy Session", time: "Dec 22, 10:00 AM", with: "Sales Lead", status: "Confirmed" }
                            ].map((meeting, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5">
                                    <div className="flex gap-4">
                                        <div className="w-1 h-full bg-primary rounded-full" />
                                        <div>
                                            <p className="font-medium">{meeting.title}</p>
                                            <p className="text-xs text-white/40">{meeting.time} • w/ {meeting.with}</p>
                                        </div>
                                    </div>
                                    <div className="px-2 py-1 rounded text-[10px] font-bold bg-white/10 text-white/60">
                                        {meeting.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Side Column */}
                <div className="space-y-8">
                    <ProjectStatus />
                </div>
            </div>
        </div>
    );
};
