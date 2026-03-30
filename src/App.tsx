import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/context/AppContext";
import HomeScreen from "./pages/HomeScreen";
import Dashboard from "./pages/Dashboard";
import ScenarioSelection from "./pages/ScenarioSelection";
import LessonScreen from "./pages/LessonScreen";
import ReviewScreen from "./pages/ReviewScreen";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/scenarios" element={<ScenarioSelection />} />
            <Route path="/lesson/:id" element={<LessonScreen />} />
            <Route path="/review" element={<ReviewScreen />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
