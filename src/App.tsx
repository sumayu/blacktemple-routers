import { useState, useEffect } from "react";
import OpenWrtInstallGuide from "./OpenWrtInstallGuide";
import PodkopGuide from "./PodkopGuide";
import V2RayAGuide from "./V2RayAGuide";
import KeeneticGuide from "./KeeneticGuide";

const routes: Record<string, React.FC> = {
  "/openwrt":  OpenWrtInstallGuide,
  "/podkop":   PodkopGuide,
  "/v2raya":   V2RayAGuide,
  "/keenetic": KeeneticGuide,
};

export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handler = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  const Page = routes[path] ?? OpenWrtInstallGuide;
  return <Page />;
}