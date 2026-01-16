import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { MobileCTABar } from "@/components/ui/mobile-cta-bar";
import { ScrollToTop } from "@/components/scroll-to-top";
import NotFound from "@/pages/not-found";
import { Layout } from "@/components/layout/layout";

import Home from "@/pages/home";
import Services from "@/pages/services";
import HowItWorks from "@/pages/how-it-works";
import PartnerSignup from "@/pages/partner-signup";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import AdminDashboard from "@/pages/admin";
import CalculatorPage from "@/pages/calculator";
import PrivacyPolicy from "@/pages/privacy-policy";
import FAQ from "@/pages/faq";
import Terms from "@/pages/terms";

function Router() {
  return (
    <Switch>
      <Route path="/admin/:rest*" component={AdminDashboard} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/">
        <Layout>
          <Home />
        </Layout>
      </Route>
      <Route path="/services">
        <Layout>
          <Services />
        </Layout>
      </Route>
      <Route path="/how-it-works">
        <Layout>
          <HowItWorks />
        </Layout>
      </Route>
      <Route path="/partner-signup">
        <Layout>
          <PartnerSignup />
        </Layout>
      </Route>
      <Route path="/about">
        <Layout>
          <About />
        </Layout>
      </Route>
      <Route path="/contact">
        <Layout>
          <Contact />
        </Layout>
      </Route>
      <Route path="/calculator">
        <CalculatorPage />
      </Route>
      <Route path="/privacy-policy">
        <Layout>
          <PrivacyPolicy />
        </Layout>
      </Route>
      <Route path="/faq">
        <Layout>
          <FAQ />
        </Layout>
      </Route>
      <Route path="/terms">
        <Layout>
          <Terms />
        </Layout>
      </Route>
      <Route>
        <Layout>
          <NotFound />
        </Layout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ScrollToTop />
        <Toaster />
        <Router />
        <WhatsAppButton />
        <MobileCTABar />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
