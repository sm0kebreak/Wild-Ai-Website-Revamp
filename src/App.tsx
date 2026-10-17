import React, { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { StaticRouter } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import SiteJsonLd from "./components/SiteJsonLd";
import Index from "./pages/Index";
import PreviousEvents from "./pages/PreviousEvents";
import EventFebruary2026 from "./pages/EventFebruary2026";
import EventMarch2026 from "./pages/EventMarch2026";
import EventApril2026 from "./pages/EventApril2026";
import EventMay2026 from "./pages/EventMay2026";
import GopherAIConference from "./pages/GopherAIConference";
import ShowAndTell from "./pages/ShowAndTell";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Location from "./pages/Location";
import Chapters from "./pages/Chapters";
import ChapterPage from "./pages/ChapterPage";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Speak from "./pages/Speak";
import Sponsor from "./pages/Sponsor";
import StartAChapter from "./pages/StartAChapter";
import About from "./pages/About";
import Join from "./pages/Join";
import Companies from "./pages/Companies";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

// Create a new client outside of the component to avoid recreation on each render
const queryClient = new QueryClient();

const clock = globalThis as typeof globalThis & { __WILD_NOW__?: number };

type AppProps = {
  helmetContext?: object;
  queryClient?: QueryClient;
  location?: string;
};

const App = ({ helmetContext, queryClient: client = queryClient, location }: AppProps) => {
  const [, setLive] = useState(false);
  useEffect(() => {
    if (typeof clock.__WILD_NOW__ !== "number") return;
    delete clock.__WILD_NOW__;
    setLive(true);
  }, []);

  const routes = (
    <>
      <ScrollToTop />
      <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/events/february-2026" element={<EventFebruary2026 />} />
                <Route path="/events/march-2026" element={<EventMarch2026 />} />
                <Route path="/events/april-2026" element={<EventApril2026 />} />
                <Route path="/events/may-2026" element={<EventMay2026 />} />
                <Route path="/events/gopher-ai-demo-night" element={<GopherAIConference />} />
                <Route path="/events/gopher-ai-conference" element={<GopherAIConference />} />
                <Route path="/show-and-tell" element={<ShowAndTell />} />
                <Route path="/past-events" element={<PreviousEvents />} />
                <Route path="/location" element={<Location />} />
                <Route path="/locations" element={<Location />} />
                <Route path="/afterparty" element={<Navigate to="/" replace />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/admin/show-and-tell" element={<Navigate to="/" replace />} />
                <Route path="/admin/login" element={<Navigate to="/" replace />} />
                <Route path="/admin/*" element={<Navigate to="/" replace />} />
                <Route path="/admin" element={<Navigate to="/" replace />} />
                <Route path="/chapters" element={<Chapters />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/:slug" element={<EventDetail />} />
                <Route path="/speak" element={<Speak />} />
                <Route path="/sponsor" element={<Sponsor />} />
                <Route path="/start-a-chapter" element={<StartAChapter />} />
                <Route path="/about" element={<About />} />
                <Route path="/press" element={<Navigate to="/" replace />} />
                <Route path="/join" element={<Join />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/:city" element={<ChapterPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );

  return (
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <SiteJsonLd />
        <QueryClientProvider client={client}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {location !== undefined ? (
              <StaticRouter location={location}>{routes}</StaticRouter>
            ) : (
              <BrowserRouter>{routes}</BrowserRouter>
            )}
          </TooltipProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </React.StrictMode>
  );
};

export default App;
