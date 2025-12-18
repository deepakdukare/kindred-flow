import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ValueProps from "@/components/ValueProps";
import HowItWorks from "@/components/HowItWorks";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ValueProps />
      <HowItWorks />
      <LeadCaptureForm />
      <Footer />
    </main>
  );
};

export default Index;
