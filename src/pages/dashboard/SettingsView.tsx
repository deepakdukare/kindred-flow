import { GlassCard } from "../../components/ui/GlassCard";
import { User, Bell, Lock, CreditCard, Globe } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export const SettingsView = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold">Settings</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="space-y-1">
                    {[
                        { icon: User, label: "Profile", active: true },
                        { icon: Bell, label: "Notifications" },
                        { icon: Lock, label: "Security" },
                        { icon: CreditCard, label: "Billing" },
                        { icon: Globe, label: "Integrations" },
                    ].map((item, i) => (
                        <button key={i} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${item.active ? 'bg-primary/10 text-primary' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
                            <item.icon className="w-4 h-4" />
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="md:col-span-3 space-y-6">
                    <GlassCard className="p-8">
                        <h3 className="font-bold text-xl mb-6">Profile Information</h3>

                        <div className="flex items-center gap-6 mb-8">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-orange-500 text-3xl font-bold flex items-center justify-center">
                                DD
                            </div>
                            <div>
                                <Button variant="outline" size="sm" className="mb-2 border-white/10 hover:bg-white/5">Change Avatar</Button>
                                <p className="text-xs text-white/40">JPG, GIF or PNG. 1MB max.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">First Name</label>
                                <Input defaultValue="Deepak" className="bg-white/5 border-white/10" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Last Name</label>
                                <Input defaultValue="Dukare" className="bg-white/5 border-white/10" />
                            </div>
                            <div className="space-y-2 sm:col-span-2">
                                <label className="text-sm font-medium">Email Address</label>
                                <Input defaultValue="deepak@example.com" className="bg-white/5 border-white/10" />
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/10 flex justify-end">
                            <Button>Save Changes</Button>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};
