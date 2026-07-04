import AboutSection from "./home/AboutSection";
import LeadershipSection from "./home/LeadershipSection";
import HistorySection from "./home/HistorySection";
import ExpertiseSection from "./home/ExpertiseSection";
import ExecutiveSection from "./home/ExecutiveSection";
import CabinetSection from "./home/CabinetSection";
import { NewsSection } from "./home/NewsSection";

/* ─── Main Component ────────────────────────────────── */
export default function Main() {
  return (
    <main>
      <AboutSection />
      <LeadershipSection />
      <HistorySection />
      <ExecutiveSection />
      <CabinetSection />
      <ExpertiseSection />
      <NewsSection />
    </main>
  );
}
