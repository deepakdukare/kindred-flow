import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { BookingPage } from "./pages/BookingPage";
import { Login } from "./pages/dashboard/Login";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import { DashboardHome } from "./pages/dashboard/DashboardHome";
import { PaymentView } from "./pages/dashboard/PaymentView";
import { DeliverablesView } from "./pages/dashboard/DeliverablesView";
import { SupportView } from "./pages/dashboard/SupportView";
import { SocialMediaView } from "./pages/dashboard/SocialMediaView";
import { AnalyticsView } from "./pages/dashboard/AnalyticsView";
import { LeadsView } from "./pages/dashboard/LeadsView";
import { MeetingsView } from "./pages/dashboard/MeetingsView";
import { ProposalsView } from "./pages/dashboard/ProposalsView";
import { SettingsView } from "./pages/dashboard/SettingsView";
import { ProposalViewer } from "./pages/ProposalViewer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/proposal/:id" element={<ProposalViewer />} />

        {/* Auth Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/app" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="payments" element={<PaymentView />} />
          <Route path="deliverables" element={<DeliverablesView />} />
          <Route path="messages" element={<SupportView />} />
          <Route path="social" element={<SocialMediaView />} />
          <Route path="analytics" element={<AnalyticsView />} />
          <Route path="leads" element={<LeadsView />} />
          <Route path="meetings" element={<MeetingsView />} />
          <Route path="proposals" element={<ProposalsView />} />
          <Route path="settings" element={<SettingsView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
