// import Layout from "@/components/Layout";
// import PageHero from "@/components/PageHero";
// import AnimatedSection from "@/components/AnimatedSection";
// import { Bus, Shield, MapPin, Clock } from "lucide-react";

// const routes = [
//   { area: "Dholpur City", stops: "Main Market, Railway Station, Bus Stand", time: "7:00 AM" },
//   { area: "Bari", stops: "Bari Town, Highway Junction", time: "6:45 AM" },
//   { area: "Rajakhera", stops: "Rajakhera Main Road, Crossing", time: "6:30 AM" },
//   { area: "Sarmathura", stops: "Sarmathura Center, NH-44", time: "6:40 AM" },
//   { area: "Saipau", stops: "Saipau Main Road", time: "6:50 AM" },
// ];

// const Transportation = () => (
//   <Layout>
//     <PageHero title="Transportation" subtitle="Safe and reliable transport for every student" breadcrumb="Transportation" />
//     <section className="section-padding">
//       <div className="container mx-auto">
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
//           {[
//             { icon: Bus, title: "15+ Buses", desc: "Modern fleet" },
//             { icon: Shield, title: "GPS Tracked", desc: "Real-time monitoring" },
//             { icon: MapPin, title: "20+ Routes", desc: "Wide coverage" },
//             { icon: Clock, title: "On Time", desc: "Punctual service" },
//           ].map((f, i) => (
//             <AnimatedSection key={f.title} delay={i * 0.1}>
//               <div className="bg-primary rounded-xl p-6 text-center text-primary-foreground card-hover">
//                 <f.icon className="w-8 h-8 mx-auto mb-2 text-secondary" />
//                 <h3 className="font-heading font-bold">{f.title}</h3>
//                 <p className="text-xs text-primary-foreground/70">{f.desc}</p>
//               </div>
//             </AnimatedSection>
//           ))}
//         </div>
//         <AnimatedSection>
//           <h2 className="section-title text-center">Route Details</h2>
//           <div className="gold-underline" />
//         </AnimatedSection>
//         <AnimatedSection delay={0.2}>
//           <div className="bg-card rounded-2xl border border-border overflow-hidden mt-8">
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-primary text-primary-foreground">
//                   <th className="text-left p-4 font-heading">Area</th>
//                   <th className="text-left p-4 font-heading hidden sm:table-cell">Major Stops</th>
//                   <th className="text-left p-4 font-heading">Pickup Time</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {routes.map((r, i) => (
//                   <tr key={r.area} className={`border-t border-border ${i % 2 === 0 ? "bg-card" : "bg-muted/30"}`}>
//                     <td className="p-4 font-semibold text-foreground">{r.area}</td>
//                     <td className="p-4 text-sm text-muted-foreground hidden sm:table-cell">{r.stops}</td>
//                     <td className="p-4 text-sm text-secondary font-semibold">{r.time}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </AnimatedSection>
//       </div>
//     </section>
//   </Layout>
// );

// export default Transportation;

import { useEffect, useState, useRef } from "react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import { Bus, Shield, MapPin, Clock } from "lucide-react";
 
const routes = [
  { area: "Dholpur City", stops: "Main Market, Railway Station, Bus Stand", time: "7:00 AM" },
  { area: "Bari", stops: "Bari Town, Highway Junction", time: "6:45 AM" },
  { area: "Rajakhera", stops: "Rajakhera Main Road, Crossing", time: "6:30 AM" },
  { area: "Sarmathura", stops: "Sarmathura Center, NH-44", time: "6:40 AM" },
  { area: "Saipau", stops: "Saipau Main Road", time: "6:50 AM" },
];
 
const busStops = [
  { name: "Green Park",       time: "07:30 AM", status: "done" },
  { name: "City Hospital",    time: "07:38 AM", status: "done" },
  { name: "Main Road",        time: "07:45 AM", status: "done" },
  { name: "Market Square",    time: "07:50 AM", status: "live" },
  { name: "Police Station",   time: "08:00 AM", status: "upcoming" },
  { name: "Lake View",        time: "08:08 AM", status: "upcoming" },
  { name: "Springfield School", time: "08:20 AM", status: "destination" },
];
 
// ─── Inline styles ────────────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
 
.tracker-wrap { font-family: 'Nunito', sans-serif; }
 
/* ── animated bus on road ── */
.road-scene {
  position: relative;
  background: linear-gradient(180deg, #e8f4fd 0%, #cce8f7 100%);
  border-radius: 20px;
  overflow: hidden;
  height: 130px;
  box-shadow: inset 0 -4px 12px rgba(0,0,0,.07);
}
.road {
  position: absolute; bottom: 0; left: 0; right: 0;
  height: 44px;
  background: #3d4f60;
  border-radius: 0 0 20px 20px;
}
.road::after {
  content: '';
  position: absolute; top: 50%; left: 0; right: 0; height: 4px;
  background: repeating-linear-gradient(90deg, #f5c542 0 40px, transparent 40px 80px);
  transform: translateY(-50%);
  animation: roadMove 1.2s linear infinite;
}
@keyframes roadMove {
  from { background-position: 0 0; }
  to   { background-position: -80px 0; }
}
/* clouds */
.cloud {
  position: absolute;
  background: #fff;
  border-radius: 50px;
  opacity: .8;
}
.cloud::before, .cloud::after {
  content: ''; position: absolute;
  background: #fff; border-radius: 50%;
}
.cloud-1 { width:70px; height:22px; top:14px; animation: cloudDrift 12s linear infinite; }
.cloud-1::before { width:32px; height:32px; top:-16px; left:10px; }
.cloud-1::after  { width:22px; height:22px; top:-10px; left:32px; }
.cloud-2 { width:50px; height:16px; top:30px; animation: cloudDrift 18s linear infinite; animation-delay:-6s; }
.cloud-2::before { width:22px; height:22px; top:-12px; left:8px; }
.cloud-2::after  { width:16px; height:16px; top:-8px;  left:26px; }
@keyframes cloudDrift {
  from { left: 105%; }
  to   { left: -20%; }
}
/* the bus */
.bus-svg-wrap {
  position: absolute;
  bottom: 30px;
  animation: busDrive 3s ease-in-out infinite;
}
@keyframes busDrive {
  0%,100% { transform: translateY(0); }
  50%      { transform: translateY(-4px); }
}
/* wheels spin */
.wheel { animation: spin 0.6s linear infinite; transform-origin: center; }
@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
 
/* ── stop list ── */
.stop-list { position: relative; padding-left: 0; }
.stop-row {
  display: flex; align-items: flex-start; gap: 14px;
  padding: 10px 0; position: relative;
}
.stop-line-wrap {
  display: flex; flex-direction: column; align-items: center;
  flex-shrink: 0; width: 32px;
}
.stop-dot {
  width: 32px; height: 32px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; flex-shrink: 0; position: relative; z-index: 1;
}
.dot-done { background:#22c55e; color:#fff; box-shadow:0 0 0 3px #bbf7d0; }
.dot-live  {
  background:#f59e0b; color:#fff;
  box-shadow:0 0 0 3px #fde68a;
  animation: livePulse 1.4s ease-in-out infinite;
}
@keyframes livePulse {
  0%,100% { box-shadow:0 0 0 3px #fde68a; }
  50%      { box-shadow:0 0 0 8px #fef3c7; }
}
.dot-upcoming    { background:#e5e7eb; color:#9ca3af; border:2px solid #d1d5db; }
.dot-destination { background:#3b82f6; color:#fff; box-shadow:0 0 0 3px #bfdbfe; }
.connector {
  width: 2px; flex: 1; min-height: 10px;
}
.conn-done      { background:#22c55e; }
.conn-live      { background:linear-gradient(#22c55e,#f59e0b); }
.conn-upcoming  { background:#e5e7eb; background:repeating-linear-gradient(180deg,#d1d5db 0 6px,transparent 6px 12px); }
 
.stop-name { font-weight: 700; font-size: 15px; line-height:1.2; }
.stop-time { font-size: 13px; color:#6b7280; margin-top:1px; }
.live-badge {
  display:inline-block; padding:2px 10px; border-radius:99px;
  background:#fef3c7; color:#b45309; font-size:11px; font-weight:800;
  letter-spacing:.04em; text-transform:uppercase;
  animation: badgeFade 1.4s ease-in-out infinite;
}
@keyframes badgeFade { 0%,100%{opacity:1} 50%{opacity:.5} }
.upcoming-badge { display:inline-block; padding:2px 10px; border-radius:99px;
  background:#f3f4f6; color:#9ca3af; font-size:11px; font-weight:700; }
 
/* ── status card ── */
.status-card {
  background:#fff; border-radius:16px;
  border:1.5px solid #e5e7eb;
  box-shadow:0 4px 24px rgba(0,0,0,.06);
  padding:20px 24px;
}
.progress-bar-bg { background:#e5e7eb; border-radius:99px; height:8px; overflow:hidden; }
.progress-bar-fill {
  height:100%; border-radius:99px;
  background:linear-gradient(90deg,#f59e0b,#fb923c);
  transition: width .6s ease;
}
.eta-val { color:#22c55e; font-weight:800; }
`;
 
// ─── Bus SVG ──────────────────────────────────────────────────────────────────
function BusSVG() {
  return (
    <svg width="100" height="58" viewBox="0 0 100 58" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* body */}
      <rect x="4" y="8" width="88" height="36" rx="8" fill="#f59e0b"/>
      {/* roof stripe */}
      <rect x="4" y="8" width="88" height="10" rx="8" fill="#d97706"/>
      <rect x="4" y="14" width="88" height="4" fill="#d97706"/>
      {/* front */}
      <rect x="80" y="12" width="10" height="26" rx="4" fill="#fbbf24"/>
      {/* windows */}
      <rect x="12" y="14" width="16" height="14" rx="3" fill="#bae6fd" stroke="#7dd3fc" strokeWidth="1.2"/>
      <rect x="34" y="14" width="16" height="14" rx="3" fill="#bae6fd" stroke="#7dd3fc" strokeWidth="1.2"/>
      <rect x="56" y="14" width="16" height="14" rx="3" fill="#bae6fd" stroke="#7dd3fc" strokeWidth="1.2"/>
      {/* headlight */}
      <rect x="86" y="20" width="7" height="5" rx="2" fill="#fef9c3"/>
      {/* bumper */}
      <rect x="4" y="40" width="88" height="5" rx="3" fill="#92400e"/>
      {/* wheels */}
      <g className="wheel">
        <circle cx="22" cy="50" r="8" fill="#1f2937"/>
        <circle cx="22" cy="50" r="4" fill="#6b7280"/>
        <circle cx="22" cy="50" r="1.5" fill="#d1d5db"/>
      </g>
      <g className="wheel">
        <circle cx="72" cy="50" r="8" fill="#1f2937"/>
        <circle cx="72" cy="50" r="4" fill="#6b7280"/>
        <circle cx="72" cy="50" r="1.5" fill="#d1d5db"/>
      </g>
      {/* SCHOOL text */}
      <text x="50" y="36" textAnchor="middle" fill="#7c2d12" fontSize="7" fontWeight="900" fontFamily="Nunito,sans-serif" letterSpacing="1">SCHOOL</text>
      {/* smoke puffs */}
      <circle cx="5" cy="22" r="3" fill="#d1d5db" opacity="0.5">
        <animate attributeName="r" values="2;5;2" dur="1.2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.5;0;0.5" dur="1.2s" repeatCount="indefinite"/>
        <animate attributeName="cx" values="5;0;-5" dur="1.2s" repeatCount="indefinite"/>
        <animate attributeName="cy" values="22;16;10" dur="1.2s" repeatCount="indefinite"/>
      </circle>
    </svg>
  );
}
 
// ─── Journey Tracker ──────────────────────────────────────────────────────────
function JourneyTracker() {
  const liveIdx = busStops.findIndex(s => s.status === "live");
  const progress = Math.round(((liveIdx + 0.5) / (busStops.length - 1)) * 100);
 
  // Simulated bus position animation along road (left%)
  const [busX, setBusX] = useState(35);
  useEffect(() => {
    // oscillate bus X position to simulate movement on road
    let t = 0;
    const iv = setInterval(() => {
      t += 0.03;
      setBusX(35 + Math.sin(t) * 6);
    }, 50);
    return () => clearInterval(iv);
  }, []);
 
  const doneCount = busStops.filter(s => s.status === "done").length;
  const total = busStops.length - 1; // exclude destination for fraction
 
  return (
    <div className="tracker-wrap">
      <style>{css}</style>
 
      {/* ── Road scene ── */}
      <div className="road-scene mb-6">
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="road" />
        <div className="bus-svg-wrap" style={{ left: `${busX}%` }}>
          <BusSVG />
        </div>
        {/* school icon at right */}
        <div style={{ position:"absolute", right:24, bottom:32, fontSize:28 }}>🏫</div>
      </div>
 
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, alignItems:"start" }}>
        {/* ── Stop list ── */}
        <div className="stop-list">
          {busStops.map((stop, i) => {
            const isLast = i === busStops.length - 1;
            const connClass =
              stop.status === "done" ? "conn-done"
              : stop.status === "live" ? "conn-live"
              : "conn-upcoming";
            const dotClass =
              stop.status === "done" ? "dot-done"
              : stop.status === "live" ? "dot-live"
              : stop.status === "destination" ? "dot-destination"
              : "dot-upcoming";
 
            return (
              <div className="stop-row" key={stop.name}>
                <div className="stop-line-wrap">
                  <div className={`stop-dot ${dotClass}`}>
                    {stop.status === "done" ? "✓"
                     : stop.status === "live" ? "🚌"
                     : stop.status === "destination" ? "🏫"
                     : "○"}
                  </div>
                  {!isLast && <div className={`connector ${connClass}`} style={{ minHeight:18 }} />}
                </div>
                <div style={{ paddingBottom: isLast ? 0 : 8 }}>
                  <div className="stop-name" style={{
                    color: stop.status === "live" ? "#b45309"
                          : stop.status === "destination" ? "#1d4ed8"
                          : stop.status === "done" ? "#166534"
                          : "#374151"
                  }}>{stop.name}</div>
                  <div className="stop-time">
                    <span style={{ color: stop.status === "live" ? "#d97706" : undefined }}>
                      {stop.time}
                    </span>
                    {" "}
                    {stop.status === "live" && <span className="live-badge">LIVE</span>}
                    {stop.status === "upcoming" && <span className="upcoming-badge">Upcoming</span>}
                    {stop.status === "destination" && <span className="upcoming-badge">Destination</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
 
        {/* ── Status card ── */}
        <div>
          <div className="status-card mb-4">
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
              <span style={{ fontSize:32 }}>🚌</span>
              <div>
                <div style={{ fontWeight:800, fontSize:18, color:"#1f2937" }}>Bus is on the way</div>
                <div style={{ fontSize:13, color:"#6b7280" }}>
                  {busStops[liveIdx]?.name}
                </div>
              </div>
            </div>
            <div className="progress-bar-bg mb-2">
              <div className="progress-bar-fill" style={{ width:`${progress}%` }} />
            </div>
            <div style={{ fontSize:12, color:"#6b7280", textAlign:"right", marginBottom:12 }}>
              {doneCount + 1} / {total + 1} Stops
            </div>
            <div style={{ fontSize:14, color:"#374151" }}>
              ETA to School: <span className="eta-val">30 mins</span>
            </div>
          </div>
 
          {/* mini legend */}
          <div className="status-card" style={{ padding:"14px 18px" }}>
            <div style={{ fontWeight:800, fontSize:13, color:"#374151", marginBottom:10 }}>Legend</div>
            {[
              { dot:"dot-done",        label:"Completed stop" },
              { dot:"dot-live",        label:"Current location" },
              { dot:"dot-upcoming",    label:"Upcoming stop" },
              { dot:"dot-destination", label:"Destination" },
            ].map(l => (
              <div key={l.label} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
                <div className={`stop-dot ${l.dot}`} style={{ width:20, height:20, fontSize:9 }}>
                  {l.dot === "dot-done" ? "✓" : l.dot === "dot-live" ? "●" : l.dot === "dot-destination" ? "🏫" : "○"}
                </div>
                <span style={{ fontSize:12, color:"#4b5563" }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
 
// ─── Page ─────────────────────────────────────────────────────────────────────
const Transportation = () => (
  <Layout>
    <PageHero
      title="Transportation"
      subtitle="Safe and reliable transport for every student"
      breadcrumb="Transportation"
    />
 
    <section className="section-padding">
      <div className="container mx-auto">
 
        {/* Feature badges */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { icon: Bus,    title: "15+ Buses",  desc: "Modern fleet" },
            { icon: Shield, title: "GPS Tracked", desc: "Real-time monitoring" },
            { icon: MapPin, title: "20+ Routes",  desc: "Wide coverage" },
            { icon: Clock,  title: "On Time",     desc: "Punctual service" },
          ].map((f, i) => (
            <AnimatedSection key={f.title} delay={i * 0.1}>
              <div className="bg-primary rounded-xl p-6 text-center text-primary-foreground card-hover">
                <f.icon className="w-8 h-8 mx-auto mb-2 text-secondary" />
                <h3 className="font-heading font-bold">{f.title}</h3>
                <p className="text-xs text-primary-foreground/70">{f.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
 
        {/* Journey Tracker */}
        <AnimatedSection>
          <h2 className="section-title text-center">Bus Stoppage</h2>
          <div className="gold-underline" />
        </AnimatedSection>
 
        <AnimatedSection delay={0.2}>
          <div className="bg-card rounded-2xl border border-border p-6 mt-8">
            <JourneyTracker />
          </div>
        </AnimatedSection>
 
        {/* Route table */}
        <AnimatedSection delay={0.1} className="mt-16">
          <h2 className="section-title text-center">Route Details</h2>
          <div className="gold-underline" />
        </AnimatedSection>
 
        <AnimatedSection delay={0.3}>
          <div className="bg-card rounded-2xl border border-border overflow-hidden mt-8">
            <table className="w-full">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="text-left p-4 font-heading">Area</th>
                  <th className="text-left p-4 font-heading hidden sm:table-cell">Major Stops</th>
                  <th className="text-left p-4 font-heading">Pickup Time</th>
                </tr>
              </thead>
              <tbody>
                {routes.map((r, i) => (
                  <tr
                    key={r.area}
                    className={`border-t border-border ${i % 2 === 0 ? "bg-card" : "bg-muted/30"}`}
                  >
                    <td className="p-4 font-semibold text-foreground">{r.area}</td>
                    <td className="p-4 text-sm text-muted-foreground hidden sm:table-cell">{r.stops}</td>
                    <td className="p-4 text-sm text-secondary font-semibold">{r.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedSection>
 
      </div>
    </section>
  </Layout>
);
 
export default Transportation;