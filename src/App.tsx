import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTopOnRoute from "./components/ScrollToTopOnRoute";
import Index from "./pages/Index";
import About from "./pages/About";
import Leadership from "./pages/Leadership";
import Capabilities from "./pages/Capabilities";
import Infrastructure from "./pages/Infrastructure";
import Industries from "./pages/Industries";
import Quality from "./pages/Quality";
import Contact from "./pages/Contact";
import NewsEvents from "./pages/NewsEvents";
import Careers from "./pages/Careers";
import Gallery from "./pages/Gallery";
import OurUnits from "./pages/OurUnits";
import UnitDetail from "./pages/UnitDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTopOnRoute />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/capabilities" element={<Capabilities />} />
          <Route path="/infrastructure" element={<Infrastructure />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/quality" element={<Quality />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/news" element={<NewsEvents />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/units" element={<OurUnits />} />
          <Route path="/units/:unitId" element={<UnitDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
