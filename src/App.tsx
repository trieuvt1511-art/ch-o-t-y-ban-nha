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
import ListeningScreen from "./pages/ListeningScreen";
import AIChatScreen from "./pages/AIChatScreen";
import NotFound from "./pages/NotFound";
import FlashcardScreen from "./pages/FlashcardScreen";
import SentenceBuilderScreen from "./pages/SentenceBuilderScreen";
import AuthScreen from "./pages/AuthScreen";

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
            <Route path="/flashcards" element={<FlashcardScreen />} />
            <Route path="/sentence-builder" element={<SentenceBuilderScreen />} />
            <Route path="/review" element={<ReviewScreen />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/listening" element={<ListeningScreen />} />
            <Route path="/ai-chat" element={<AIChatScreen />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
