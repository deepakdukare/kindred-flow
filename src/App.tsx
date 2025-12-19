import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { BookingPage } from "./pages/BookingPage";
import { ProposalViewer } from "./pages/ProposalViewer";
import { Login } from "./pages/dashboard/Login"; // Corrected path
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import { DashboardHome } from "./pages/dashboard/DashboardHome";
import { LeadsView } from "./pages/dashboard/LeadsView";
import { SearchConfigurationView } from "./pages/dashboard/SearchConfigurationView";
import { CampaignsView } from "./pages/dashboard/CampaignsView";
import { MeetingsView } from "./pages/dashboard/MeetingsView";
import { ProposalsView } from "./pages/dashboard/ProposalsView";
import { PaymentsView } from "./pages/dashboard/PaymentsView";
import { DeliveryView } from "./pages/dashboard/DeliveryView";
import { AnalyticsView } from "./pages/dashboard/AnalyticsView";
import { SettingsView } from "./pages/dashboard/SettingsView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/proposal/:id" element={<ProposalViewer />} />

        {/* Auth Route */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard Routes */}
        <Route path="/app" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="leads" element={<LeadsView />} />
          <Route path="search-config" element={<SearchConfigurationView />} />
          <Route path="campaigns" element={<CampaignsView />} />
          <Route path="meetings" element={<MeetingsView />} />
          <Route path="proposals" element={<ProposalsView />} />
          <Route path="payments" element={<PaymentsView />} />
          <Route path="deliverables" element={<DeliveryView />} />
          <Route path="analytics" element={<AnalyticsView />} />
          <Route path="settings" element={<SettingsView />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
