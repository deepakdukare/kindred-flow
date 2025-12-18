import { ProjectStatus } from "../../components/dashboard/ProjectStatus";
import { GlassCard } from "../../components/ui/GlassCard";

export const DashboardHome = () => {
    return (
        <div className="max-w-6xl mx-auto py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Project Overview</h1>
                <p className="text-white/60">Welcome back, Deepak. Here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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

                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 min-h-[300px]">
                        <h3 className="font-bold mb-4">Activity Timeline</h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="flex gap-4 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                                    <div>
                                        <p className="text-sm font-medium">New Lead Captured</p>
                                        <p className="text-xs text-white/40">2 hours ago</p>
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
