import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
      </div>

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">AI-Powered Sales Automation</span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up-delay-1 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            <span className="text-foreground">Close Deals </span>
            <span className="text-gradient">End-to-End</span>
            <br />
            <span className="text-foreground">With AI Automation</span>
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-up-delay-2 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            From lead discovery to payment collection — automate your entire sales pipeline 
            with intelligent workflows that never sleep.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="hero" 
              size="xl"
              onClick={scrollToContact}
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="hero-outline" size="xl">
              <Play className="w-5 h-5" />
              Request Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-3 gap-8 max-w-xl mx-auto">
            {[
              { value: "10x", label: "Faster Response" },
              { value: "85%", label: "Time Saved" },
              { value: "3x", label: "More Conversions" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl sm:text-4xl font-bold text-gradient">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
