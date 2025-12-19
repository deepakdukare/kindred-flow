import { PageHeader } from "../../components/dashboard/PageHeader";
import { GlassCard } from "../../components/ui/GlassCard";
import {
    Shield, Activity, Zap, Bell, Lock, RefreshCw,
    CheckCircle2, AlertTriangle, Key, User, Power
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

export const SettingsView = () => {
    return (
        <div className="space-y-6">
            <PageHeader
                subtitle="Admin Controls"
                helperText="Centralized control plane for AI-driven sales, delivery, and revenue automation."
            >
                <div className="text-right text-xs text-white/40">
                    <p>Environment: <span className="text-green-400">Production</span></p>
                    <p>Version: v1.0.0</p>
                </div>
            </PageHeader>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* 1. Account & Identity */}
                <GlassCard className="p-6">
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                        <User className="w-5 h-5 text-primary" /> Account & Identity
                    </h3>
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-amber-600 flex items-center justify-center text-lg font-bold">
                            DD
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold">Deepak Dukare</h4>
                            <p className="text-white/60 text-sm">Role: Admin • Workspace: Cervoa Automation</p>
                        </div>
                        <Button variant="outline" size="sm" className="border-white/10 ml-auto">Edit Profile</Button>
                    </div>
                </GlassCard>

                {/* 2. System Health (Live) */}
                <GlassCard className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <Activity className="w-5 h-5 text-green-400" /> System Health
                        </h3>
                        <Badge className="bg-green-500/10 text-green-400 border-green-500/20">Operational</Badge>
                    </div>
                    <div className="space-y-2">
                        <HealthItem label="n8n Workflows" status="Running" />
                        <HealthItem label="Airtable Sync" status="Active" />
                        <HealthItem label="Email Engine" status="Connected" />
                        <HealthItem label="Calendly" status="Connected" />
                        <HealthItem label="Stripe" status="Listening" />
                    </div>
                </GlassCard>

                {/* 3. Automation Controls */}
                <GlassCard className="p-6">
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                        <Zap className="w-5 h-5 text-amber-400" /> Automation Controls
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="border-white/10 hover:bg-white/5 justify-start">
                            <Power className="w-4 h-4 mr-2" /> Pause Automations
                        </Button>
                        <Button variant="outline" className="border-white/10 hover:bg-white/5 justify-start">
                            <RefreshCw className="w-4 h-4 mr-2" /> Resume Automations
                        </Button>
                        <Button variant="outline" className="border-white/10 hover:bg-white/5 justify-start col-span-2">
                            <Activity className="w-4 h-4 mr-2" /> View Workflow Logs
                        </Button>
                    </div>
                </GlassCard>

                {/* 4. Notifications & Alerts */}
                <GlassCard className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <Bell className="w-5 h-5 text-red-400" /> Alerts
                        </h3>
                        <Badge className="bg-red-500/10 text-red-400 border-red-500/20">3 New</Badge>
                    </div>
                    <div className="space-y-3">
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md flex gap-3 text-sm">
                            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                            <div>
                                <p className="font-bold text-red-200">Campaign Paused</p>
                                <p className="text-red-300/60 text-xs">Low response rate detected on 'Tech Outreach'.</p>
                            </div>
                        </div>
                        <div className="p-3 bg-white/5 border border-white/10 rounded-md flex gap-3 text-sm">
                            <div className="w-2 h-2 rounded-full bg-amber-400 mt-2" />
                            <div>
                                <p className="font-bold">Manual Review Needed</p>
                                <p className="text-white/60 text-xs">2 New leads have incomplete data.</p>
                            </div>
                        </div>
                        <Button className="w-full mt-2" variant="ghost">View All Alerts</Button>
                    </div>
                </GlassCard>

                {/* 5. Security */}
                <GlassCard className="lg:col-span-2 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <Shield className="w-5 h-5 text-blue-400" /> Security & Access
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-green-400">
                                <CheckCircle2 className="w-4 h-4" /> Webhooks Secured
                            </div>
                            <p className="text-xs text-white/40">All endpoints are receiving signed payloads.</p>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-green-400">
                                <CheckCircle2 className="w-4 h-4" /> API Keys Masked
                            </div>
                            <p className="text-xs text-white/40">Sensitive keys hidden from frontend.</p>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-green-400">
                                <Lock className="w-4 h-4" /> Admin-Only Access
                            </div>
                            <p className="text-xs text-white/40">Role-based controls are active.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 mt-6">
                        <Button variant="outline" className="border-white/10">Rotate API Keys</Button>
                        <Button variant="outline" className="border-white/10">Manage Webhooks</Button>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};

function HealthItem({ label, status }: { label: string, status: string }) {
    return (
        <div className="flex justify-between items-center p-2 rounded hover:bg-white/5 transition-colors">
            <span className="text-white/60 text-sm">{label}</span>
            <span className="flex items-center gap-2 text-sm font-medium">
                <CheckCircle2 className="w-3 h-3 text-green-400" />
                {status}
            </span>
        </div>
    );
}
