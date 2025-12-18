import { GlassCard } from "../../components/ui/GlassCard";
import { Calendar, Clock, Video, Plus } from "lucide-react";

export const MeetingsView = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Meetings</h1>
                    <p className="text-white/60">Upcoming schedule and past interactions.</p>
                </div>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors">
                    <Plus className="w-4 h-4" /> Schedule New
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <GlassCard className="lg:col-span-2 p-6">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" /> Upcoming
                    </h3>
                    <div className="space-y-4">
                        {[
                            { title: "Discovery Call - Radiant Systems", date: "Today", time: "2:00 PM - 2:30 PM", type: "Zoom" },
                            { title: "Project Handoff - Alpha Corp", date: "Tomorrow", time: "11:00 AM - 12:00 PM", type: "Google Meet" },
                            { title: "Weekly Sync - Beta Inc", date: "Dec 22", time: "10:00 AM - 10:30 AM", type: "Zoom" },
                        ].map((m, i) => (
                            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-col flex-col items-center justify-center text-primary font-bold border border-primary/20 shrink-0">
                                        <span className="text-[10px] uppercase opacity-70 leading-none">{m.date.split(" ")[0]}</span>
                                        <span className="text-lg leading-none">{m.date.split(" ")[1] || "18"}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold">{m.title}</h4>
                                        <div className="flex items-center gap-3 text-xs text-white/50 mt-1">
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{m.time}</span>
                                            <span className="flex items-center gap-1"><Video className="w-3 h-3" />{m.type}</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="px-3 py-1.5 bg-primary/20 text-primary text-xs font-bold rounded hover:bg-primary/30 transition-colors">
                                    Join Meeting
                                </button>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                <div className="space-y-6">
                    <GlassCard className="p-6">
                        <h3 className="font-bold mb-4">Quick Calendar</h3>
                        <div className="w-full aspect-square bg-white/5 rounded-lg flex items-center justify-center text-white/20">
                            Calendar Widget Placeholder
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};
