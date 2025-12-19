import { useState } from "react";
import { GlassCard } from "../../components/ui/GlassCard";
import { Calendar as CalendarIcon, Clock, Video, RefreshCw, Send, Plus, CheckCircle2, MoreHorizontal, FileText, CheckSquare, Sparkles } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Badge } from "../../components/ui/badge";
import { triggerMeetingRequest } from "../../lib/api";

export const MeetingsView = () => {
    const [isScheduling, setIsScheduling] = useState(false);
    const [scheduleForm, setScheduleForm] = useState({
        lead: "",
        type: "Discovery",
        notes: ""
    });

    const meetings = {
        today: [
            { id: 1, title: "Discovery Call – Radiant Systems", time: "2:00 PM – 2:30 PM", platform: "Zoom", status: "Scheduled", joinUrl: "#", lead: "John Smith" },
        ],
        upcoming: [
            { id: 2, title: "Project Handoff – Alpha Corp", date: "Tomorrow", time: "11:00 AM – 12:00 PM", platform: "Google Meet", status: "Scheduled", joinUrl: "#", lead: "Sarah Williams" },
            { id: 3, title: "Weekly Sync – Beta Inc", date: "Dec 22", time: "10:00 AM – 10:30 AM", platform: "Zoom", status: "Scheduled", joinUrl: "#", lead: "Michael Brown" },
        ],
        past: [
            { id: 4, title: "Intro Call – TechFlow", date: "Yesterday", time: "9:00 AM – 9:30 AM", platform: "Zoom", status: "Completed", lead: "Sarah Williams" },
        ]
    };

    const handleSchedule = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsScheduling(true);
        const success = await triggerMeetingRequest(scheduleForm);
        setIsScheduling(false);
        if (success) {
            alert("Meeting options sent! Lead will receive suggested slots via email.");
            setScheduleForm({ lead: "", type: "Discovery", notes: "" });
        } else {
            alert("Failed to send meeting options.");
        }
    };

    // Simple Calendar Grid Generator
    const generateCalendarDays = () => {
        const days = [];
        for (let i = 0; i < 35; i++) {
            const day = i - 2; // Offset for starting day (approx)
            days.push(day > 0 && day <= 31 ? day : "");
        }
        return days;
    };

    import { PageHeader } from "../../components/dashboard/PageHeader";

    return (
        <div className="space-y-6">
            <PageHeader
                subtitle="Meetings"
                helperText="Manage meeting scheduling, confirmations, and outcomes."
            />

            {/* Integration Status Bar */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-2 text-sm text-green-400">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Calendly Connected
                    </div>
                    <div className="flex items-center gap-2 text-sm text-green-400">
                        <span className="w-2 h-2 rounded-full bg-green-500" /> Google Calendar Synced
                    </div>
                    <div className="flex items-center gap-2 text-sm text-green-400">
                        <span className="w-2 h-2 rounded-full bg-green-500" /> Zoom Active
                    </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-white/40">
                    <span>Last sync: 2 mins ago</span>
                    <button className="hover:text-white transition-colors"><RefreshCw className="w-3 h-3" /></button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 1. Schedule New Meeting (Form) */}
                <GlassCard className="lg:col-span-1 p-6 space-y-6 flex flex-col h-fit">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <div className="p-2 bg-primary/20 rounded-lg">
                            <Plus className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Schedule New Meeting</h3>
                            <p className="text-xs text-white/50">Triggers automated booking workflow</p>
                        </div>
                    </div>

                    <form onSubmit={handleSchedule} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Lead (Airtable)</label>
                            <Select value={scheduleForm.lead} onValueChange={(val) => setScheduleForm({ ...scheduleForm, lead: val })}>
                                <SelectTrigger className="bg-white/5 border-white/10">
                                    <SelectValue placeholder="Select Lead" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="John Smith">John Smith — Radiant Systems</SelectItem>
                                    <SelectItem value="Sarah Williams">Sarah Williams — TechFlow</SelectItem>
                                    <SelectItem value="Emily Davis">Emily Davis — NextGen</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Meeting Type</label>
                            <Select value={scheduleForm.type} onValueChange={(val) => setScheduleForm({ ...scheduleForm, type: val })}>
                                <SelectTrigger className="bg-white/5 border-white/10">
                                    <SelectValue placeholder="Select Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Discovery">Discovery Call (30 min)</SelectItem>
                                    <SelectItem value="Demo">Product Demo (45 min)</SelectItem>
                                    <SelectItem value="Handoff">Project Handoff (60 min)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Notes / Context</label>
                            <Textarea
                                placeholder="Shared with sales rep & included in notes..."
                                value={scheduleForm.notes}
                                onChange={(e) => setScheduleForm({ ...scheduleForm, notes: e.target.value })}
                                className="bg-white/5 border-white/10 min-h-[100px]"
                            />
                        </div>

                        <Button type="submit" className="w-full font-bold bg-primary hover:bg-primary/90" disabled={isScheduling}>
                            <Send className={`w-4 h-4 mr-2 ${isScheduling ? 'animate-pulse' : ''}`} />
                            {isScheduling ? "Sending Options..." : "Send Meeting Options"}
                        </Button>
                    </form>
                </GlassCard>

                {/* 2 & 3. Quick Calendar & Upcoming Tabs */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Quick Calendar */}
                    <GlassCard className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-lg flex items-center gap-2">
                                <CalendarIcon className="w-5 h-5 text-primary" /> Quick Calendar
                            </h3>
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <button className="p-1 hover:bg-white/10 rounded">&lt;</button>
                                <span>December 2025</span>
                                <button className="p-1 hover:bg-white/10 rounded">&gt;</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-7 gap-1 text-center text-sm">
                            <div className="text-white/40 py-2">Su</div><div className="text-white/40 py-2">Mo</div><div className="text-white/40 py-2">Tu</div><div className="text-white/40 py-2">We</div><div className="text-white/40 py-2">Th</div><div className="text-white/40 py-2">Fr</div><div className="text-white/40 py-2">Sa</div>
                            {generateCalendarDays().map((day, i) => (
                                <div key={i} className={`p-2 rounded-lg relative min-h-[40px] flex items-center justify-center ${day === 18 ? 'bg-primary/20 text-primary font-bold' : 'hover:bg-white/5'}`}>
                                    {day}
                                    {/* Mock Indicators */}
                                    {day === 18 && <span className="absolute bottom-1 w-1 h-1 rounded-full bg-blue-400" />}
                                    {day === 19 && <span className="absolute bottom-1 w-1 h-1 rounded-full bg-green-400" />}
                                    {day === 22 && <span className="absolute bottom-1 w-1 h-1 rounded-full bg-blue-400" />}
                                </div>
                            ))}
                        </div>
                    </GlassCard>

                    {/* Upcoming Meetings Tabs */}
                    <Tabs defaultValue="today" className="w-full">
                        <TabsList className="bg-white/5 border border-white/10 w-full justify-start p-1 h-auto">
                            <TabsTrigger value="today" className="flex-1">Today</TabsTrigger>
                            <TabsTrigger value="upcoming" className="flex-1">Upcoming</TabsTrigger>
                            <TabsTrigger value="past" className="flex-1">Past</TabsTrigger>
                        </TabsList>

                        <div className="mt-4 space-y-4">
                            <TabsContent value="today" className="space-y-4 data-[state=inactive]:hidden">
                                {meetings.today.map(m => (
                                    <GlassCard key={m.id} className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-l-4 border-l-blue-500">
                                        <div className="flex items-center gap-4 w-full sm:w-auto">
                                            <div className="p-3 bg-blue-500/20 rounded-full text-blue-400">
                                                <Video className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg">{m.title}</h4>
                                                <p className="text-sm text-white/60 flex items-center gap-2">
                                                    <Clock className="w-3 h-3" /> {m.time} • {m.platform}
                                                </p>
                                            </div>
                                        </div>
                                        <Button className="w-full sm:w-auto font-bold bg-primary hover:bg-primary/80" onClick={() => window.open(m.joinUrl, '_blank')}>
                                            Join Meeting
                                        </Button>
                                    </GlassCard>
                                ))}
                            </TabsContent>

                            <TabsContent value="upcoming" className="space-y-4 data-[state=inactive]:hidden">
                                {meetings.upcoming.map(m => (
                                    <GlassCard key={m.id} className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                                        <div className="flex items-center gap-4 w-full sm:w-auto">
                                            <div className="w-12 h-12 flex flex-col items-center justify-center bg-white/5 rounded border border-white/10">
                                                <span className="text-[10px] text-white/40 font-bold uppercase">{m.date === 'Tomorrow' ? 'TMR' : 'DEC'}</span>
                                                <span className="font-bold text-lg leading-none">{m.date === 'Tomorrow' ? new Date().getDate() + 1 : '22'}</span>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg">{m.title}</h4>
                                                <p className="text-sm text-white/60 flex items-center gap-2">
                                                    <Clock className="w-3 h-3" /> {m.time} • {m.platform}
                                                </p>
                                            </div>
                                        </div>
                                        <Button variant="outline" className="w-full sm:w-auto border-white/10 hover:bg-white/5">
                                            Join Meeting
                                        </Button>
                                    </GlassCard>
                                ))}
                            </TabsContent>

                            <TabsContent value="past" className="space-y-4 data-[state=inactive]:hidden">
                                {meetings.past.map(m => (
                                    <GlassCard key={m.id} className="p-4 border-l-4 border-l-white/20 opacity-70 hover:opacity-100 transition-opacity">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-bold text-lg">{m.title}</h4>
                                                <p className="text-sm text-white/60">{m.time} • {m.lead}</p>
                                            </div>
                                            <Badge variant="outline" className="border-white/10">Completed</Badge>
                                        </div>
                                        {/* Post-Meeting Actions */}
                                        <div className="mt-4 pt-4 border-t border-white/10 flex gap-2">
                                            <Button size="sm" variant="ghost" className="h-8 text-xs hover:bg-white/10 font-normal">
                                                <FileText className="w-3 h-3 mr-2" /> Add Notes
                                            </Button>
                                            <Button size="sm" variant="ghost" className="h-8 text-xs hover:bg-white/10 font-normal text-purple-400">
                                                <Sparkles className="w-3 h-3 mr-2" /> Generate Proposal
                                            </Button>
                                            <Button size="sm" variant="ghost" className="h-8 text-xs hover:bg-white/10 font-normal">
                                                <CheckSquare className="w-3 h-3 mr-2" /> Mark Outcome
                                            </Button>
                                        </div>
                                    </GlassCard>
                                ))}
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};
