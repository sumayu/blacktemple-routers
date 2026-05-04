import OpenWrtInstallGuide from "./OpenWrtInstallGuide";
import PodkopGuide from "./PodkopGuide";
import V2RayAGuide from "./V2RayAGuide";
import KeeneticGuide from "./KeeneticGuide";

const routes: Record<string, React.FC> = {
  "/openwrt": OpenWrtInstallGuide,
  "/podkop": PodkopGuide,
  "/v2raya": V2RayAGuide,
  "/keenetic": KeeneticGuide,
};

export default function App() {
  const path = window.location.pathname;
  const Page = routes[path] ?? OpenWrtInstallGuide;
  return <Page />;
}