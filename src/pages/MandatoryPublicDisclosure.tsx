import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CBSEAFFILICATION from "/public/PDFs/Affiliation.pdf";
import specil_edu from "/public/PDFs/Special-Educator-AGREEMENT-LETTER.pdf";
import transferCertificate from "/public/PDFs/Document.pdf";
import Buliding_Safety from "@/assets/Building_Safety.png";
import society from  "@/assets/Society.png"
import noc from "/public/PDFs/Noc .pdf"
import result from "@/assets/SchoolResult.jpeg"
import WaterSafety from "@/assets/WaterSafety.jpeg";
import Firesafety from "@/assets/Firesafety.jpeg"
import comette from "/public/PDFs/schoolcomittie.pdf"
import SelfCertificate from "@/assets/SelfCertificate.jpeg"
import certificateLand from "@/assets/certificateLand.jpeg"
gsap.registerPlugin(ScrollTrigger, useGSAP);

const schoolInfo: [string, string][] = [
  ["Name of the School", "St. Joseph's International School"],
  ["Affiliation Number", "1731119"],
  ["School Code", "11616"],
  ["Address with Pin Code", "Ashiyana Colony, Jail Road, Near Railway Station, Dholpur, Rajasthan - 328001"],
  ["Principal Name ", "Mr. Praveen Tyagi "],
  ["E-mail ID", "st.josephDholpur.com"],
  ["Phone / Mobile Number", "++91-99286-23387 / +91‑88245-51683"],
];

const documents = [
  {
    label: "CBSE Affiliation Letter",
    file: CBSEAFFILICATION,
  },
  {
    label: "Society Registration",
    file: society,
  },
  {
    label: "School Recognition under RTE",
    file: specil_edu,
  },
  {
    label: "NOC by State Government",
    file: noc,
  },
  {
    label: "Building Fitness Certificate",
    file: Buliding_Safety,
  },
  {
    label:"Water Safety Letter",
    file:WaterSafety
  },
  {
    label:"Fire Safety Letter",
    file:Firesafety
  }
];


// const documents = [
//   "CBSE Affiliation Letter",
//   "Society Registration",
//   "School Recognition under RTE",
//   "NOC by State Government",
//   "Certificate by DEO",
//   "Building Fitness Certificate",
//   "Water Safety Letter",
//   "Fire Safety Letter",
// ];
// const results = [
//   "Fee Structure",
//   "Annual Academic Calendar",
//   "School Management Committee List",
//   "Parent Teachers Association",
//   "Anti-Bullying Committee",
//   "W-POSH Committee",
//   "Grievance Redressal Committee",
//   "POSCO Committee",
//   "Board Result of Last 3 Years",
//   "Transfer Certificate",
//   "Annual Report 2025-26",
//   "Declaration of Content of Books",
// ];



const results = [
  {
    label: "Fee Structure",
    file:  "/fee-structure",
  },
//   {
//     label: "Annual Academic Calendar",
//     // file: academicCalendar,
//   },
  {
    label: "School Management Committee List",
    file: comette,
  },
  {
    label: "Teacher List with Qualifications",
    file: "/faculty",
  },
//   {
//     label: "Parent Teachers Association",
//     // file: pta,
//   },
//   {
//     label: "Anti-Bullying Committee",
//     // file: antiBullying,
//   },
//   {
//     label: "W-POSH Committee",
//     // file: wPosh,
//   },
//   {
//     label: "Grievance Redressal Committee",
//     // file: grievance,
//   },
//   {
//     label: "POSCO Committee",
//     // file: posco,
//   },
  {
    label: "Board Result of Last 3 Years",
    file: result,
  },
  {
    label: "Transfer Certificate",
    file: transferCertificate,
  },
   {
    label: "SELF-Certifications Proforma",
    file: SelfCertificate,
  },
  {
    label: "Certificate Of Land",
    file: certificateLand,
  },
//   {
//     label: "Annual Report 2025-26",
//     // file: annualReport,
//   },
//   {
//     label: "Declaration of Content of Books",
//     // file: booksDeclaration,
//   },
];

const staffStats: [string, string][] = [
  ["Principal", "01"],
  ["Vice-Principal", "01"],
  ["Headmistress / Headmaster", "02"],
  ["Total Number of Teachers", "17"],
  ["PGT", "2"],
  ["TGT", "8"],
  ["PRT", "3"],
 
  ["Teacher Section Ratio", "1 : 1.5"],
];

const infra: [string, string][] = [
  ["Total Campus Area (in Sq. Mtr.)", "-- Meter"],
  ["Number & Size of Classrooms (Sq. Ft.)", "26 — 46 x 45 Sq Ft"],
  ["Number & Size of Laboratories (Sq. Ft.)", "04 — 55 x 14 Sq Ft"],
  ["Number & Size of Library (Sq. Ft.)", "01 — 47 x 46 Meter"],
];

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mpd-title font-heading text-4xl md:text-5xl font-extrabold text-primary text-center pb-2 border-b-2 border-secondary/40 inline-block mx-auto">
    {children}
  </h2>
);

const LinkRow = ({ label ,file}: { label: string ,file:any}) => (
  <a
    href={file}
    target="_blank"
    rel="noopener noreferrer"
    className="mpd-link block text-center text-primary hover:text-secondary underline underline-offset-4 decoration-1 hover:decoration-2 text-base md:text-lg font-medium py-1.5 transition-colors"
  >
    {label}
  </a>
);

const MandatoryPublicDisclosure = () => {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".mpd-title", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
      gsap.from(".mpd-row", {
        opacity: 0,
        y: 15,
        duration: 0.4,
        stagger: 0.03,
        ease: "power2.out",
        scrollTrigger: { trigger: ".mpd-content", start: "top 85%" },
      });
      gsap.utils.toArray<HTMLElement>(".mpd-link").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          x: -10,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 95%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="min-h-screen bg-background">
      <Header />

      <main className="mpd-content max-w-3xl mx-auto px-4 py-16 md:py-20 space-y-16">
        {/* SCHOOL INFORMATION */}
        <section className="text-center space-y-4">
          <div className="flex justify-center">
            <SectionTitle>School Information</SectionTitle>
          </div>
          <div className="pt-4 space-y-1.5">
            {schoolInfo.map(([k, v]) => (
              <p key={k} className="mpd-row text-sm md:text-base text-foreground">
                <span className="font-semibold text-primary">{k}:</span>{" "}
                <span className="text-foreground/80">{v}</span>
              </p>
            ))}
          </div>
        </section>

        {/* DOCUMENT & INFORMATION */}
        <section className="text-center space-y-4">
          <div className="flex justify-center">
            <SectionTitle>Document &amp; Information</SectionTitle>
          </div>
          <p className="mpd-row pt-2 text-sm tracking-wider uppercase text-secondary font-bold">
            CLICK TO VIEW :
          </p>
          <div className="space-y-1">
            {documents.map((d) => (
              <LinkRow key={d} label={d.label} file={d.file}/>
            ))}
          </div>
        </section>

        {/* RESULT & ACADEMICS */}
        <section className="text-center space-y-4">
          <div className="flex justify-center">
            <SectionTitle>Result &amp; Academics</SectionTitle>
          </div>
          <p className="mpd-row pt-2 text-sm tracking-wider uppercase text-secondary font-bold">
            CLICK TO VIEW :
          </p>
          <div className="space-y-1">
            {results.map((r) => (
              <LinkRow key={r} label={r.label} file={r.file} />
            ))}
          </div>
        </section>

        {/* STAFF INFORMATION */}
        <section className="text-center space-y-3">
          <div className="flex justify-center">
            <SectionTitle>Staff Information</SectionTitle>
          </div>
          <div className="pt-4 space-y-1.5 text-sm md:text-base">
            <p className="mpd-row">
              <span className="font-semibold text-primary">Principal:</span> Mr. Praveen Tyagi 
              {/* (M.A. Eng., B.Ed., Ph.D) */}
            </p>
            {staffStats.map(([k, v]) => (
              <p key={k} className="mpd-row">
                <span className="font-semibold text-primary">{k}:</span> {v}
              </p>
            ))}
            <p className="mpd-row pt-2">
              <span className="font-semibold text-primary">Click to view:</span>{" "}
              <a href="#" className="text-primary underline hover:text-secondary">PGT</a> ·{" "}
              <a href="#" className="text-primary underline hover:text-secondary">TGT</a> ·{" "}
              <a href="#" className="text-primary underline hover:text-secondary">PRT</a> ·{" "}
              <a href="#" className="text-primary underline hover:text-secondary">NTT</a>
            </p>
            <p className="mpd-row pt-3 text-sm">
              <span className="font-semibold text-primary">Details of Special Educator:</span> Mr. Vishnu Bansal
              {/* Mr. Vishnu Bansal */}
            </p>
            <p className="mpd-row text-sm">
              <span className="font-semibold text-primary">Counsellor &amp; Wellness Teacher:</span> Mrs. Shivani Gupta 
              {/* (M.A. Psychology, B.Ed.) */}
               &amp; 
             Mrs. Aarti Sanjay Parmar
              {/* (B.A. Psychology, B.Ed.) */}
            </p>
          </div>
        </section>

        {/* SCHOOL INFRASTRUCTURE */}
        <section className="text-center space-y-4">
          <div className="flex justify-center">
            <SectionTitle>School Infrastructure</SectionTitle>
          </div>
          <div className="pt-4 space-y-1.5 text-sm md:text-base">
            {infra.map(([k, v]) => (
              <p key={k} className="mpd-row">
                <span className="font-semibold text-primary">{k}:</span> {v}
              </p>
            ))}
          </div>
        </section>

        <p className="text-center text-xs text-muted-foreground pt-8 border-t border-border/40">
          Published as per CBSE Mandatory Public Disclosure norms — Session 2025-26
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default MandatoryPublicDisclosure