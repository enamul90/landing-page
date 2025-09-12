import React from "react";
import FreePage from "@/landingPage/landingPage1/FreePage";
import Index from "@/landingPage/landingPage2/Index";
import LandingPage3 from "@/landingPage/landingPage3/LandingPage3";

const templates = {
  1: <FreePage />,
  2: <Index />,
  3: <LandingPage3 />,
};
export default function Page({ params }) {
  return templates[params.id] || <div>Landing Page Not Found</div>;
}
