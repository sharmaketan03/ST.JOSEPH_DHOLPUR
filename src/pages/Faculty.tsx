import React from "react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import { GraduationCap, BadgeCheck, FileText } from "lucide-react";

const facultyData = {
  PRT: [
    { name: "Mrs. Yashmeen", id: "2041468", reg: "T22002041468" },
    { name: "Mrs. Brajbala Mishra" },
    { name: "Mrs. Pooja Sharma" },
  ],
  TGT: [
    { name: "Mrs. Tanu Brijesh Sharma", id: "3240822", reg: "T26003240822" },
    { name: "Mr. Vishnu Bansal", id: "3240756", reg: "REG-T26003240756" },
    { name: "Mrs. Aarti Sanjay Parmar", id: "3240734", reg: "126003240734" },
    { name: "Mrs. Shivani Gupta", id: "3199664", reg: "T25003199664" },
    { name: "Mr. Harendra Singh", id: "3199628", reg: "T25003199628" },
    { name: "Mrs. Kavita Singh", id: "2035653", reg: "T22002035653" },
    { name: "Mrs. Sarika Shrivastav", id: "2035604", reg: "122002035604" },
    { name: "Mr. Ajeej Khan", id: "2041513", reg: "T22002041513" },
  ],
  PGT: [
  
    { name: "Mrs. SARLA CHEJARA", id: "2041378", reg: "T22002041378" },
    { name: "Mrs. LALITA TYAGI", id: "2005332", reg: "T22002005332" },
    
  ],
  Principal: [
    { name: "Mr. PRAVEEN KUMAR TYAGI", id: "2041269", reg: "T22002041269" },
  ],
};

type TabType = "PRT" | "TGT" | "PGT" | "Principal";
const tabs: TabType[] = ["PRT", "TGT", "PGT", "Principal"];

const Faculty = () => {
  const [filter, setFilter] = React.useState<TabType>("PRT");

  return (
    <Layout>
      <PageHero
        title="Our Faculty"
        subtitle="Meet our dedicated team of educators"
        breadcrumb="Faculty"
      />
      <section className="section-padding">
        <div className="container mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="section-title">Experienced & Passionate Educators</h2>
              <div className="gold-underline" />
              <p className="section-subtitle">
                Our faculty members are highly qualified professionals dedicated
                to nurturing every student's potential.
              </p>
            </div>
          </AnimatedSection>

          {/* Tab Buttons */}
          <div className="flex items-center justify-center gap-3 mb-8 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-6 py-2 rounded-full border transition-all duration-300 
                  ${filter === tab
                    ? "bg-[#192457] text-white shadow-md scale-105"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Faculty Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facultyData[filter].map((f, i) => (
              <AnimatedSection key={f.id} delay={i * 0.08}>
                <div className="bg-card rounded-xl border border-border p-6 text-center card-hover">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-3 capitalize">
                    {f.name.toUpperCase()}
                  </h3>
                  {/* Teacher ID */}
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground bg-muted rounded-lg px-3 py-1.5 mb-2">
                    <BadgeCheck className="w-3.5 h-3.5 text-yellow-600" />
                    <span>ID: <strong className="text-foreground">{f.id}</strong></span>
                  </div>
                  {/* Registration Number */}
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground bg-muted rounded-lg px-3 py-1.5">
                    <FileText className="w-3.5 h-3.5 text-yellow-600" />
                    <span>Reg: <strong className="text-foreground">{f.reg}</strong></span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Faculty;