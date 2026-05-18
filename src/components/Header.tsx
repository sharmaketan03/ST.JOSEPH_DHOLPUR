import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import logo from "@/assets/logo.png";
import cert from "@/assets/PDFs/Document_39.pdf"

const navItems = [
  { label: "Home", path: "/" },
  {
    label: "About",
    children: [
      { label: "About Us", path: "/about" },
        { label: "Director's Message", path: "/director-message" },
      { label: "Principal's Message", path: "/principal-message" },
      { label: "Vision & Mission", path: "/vision-mission" },
      { label: "Faculty", path: "/faculty" },
    ],
  },
  {
    label: "Academics",
    children: [
      { label: "Academics", path: "/academics" },
      { label: "Curriculum", path: "/curriculum" },
      { label: "Achievements", path: "/achievements" },
    ],
  },
  {
    label: "Campus Life",
    children: [
      { label: "Student Life", path: "/student-life" },
      { label: "Sports", path: "/sports" },
      { label: "Co-Curricular", path: "/co-curricular" },
      { label: "Infrastructure", path: "/infrastructure" },
    ],
  },
  { label: "Admissions", path: "/admissions" },
  { label: "Gallery", path: "/gallery" },
  {
    label: "More",
    children: [
      { label: "Events", path: "/events" },
      { label: "News", path: "/news" },
      { label: "Calendar", path: "/calendar" },
      { label: "Transportation", path: "/transportation" },
      {label:"Certifications" , path:cert,external: true,},
      { label: "Fee Structure", path: "/fee-structure" },
    ],
  },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  return (
    <header className="sticky top-0 bg-white" style={{ zIndex: 9999 ,backgroundColor:"#fff"}}>
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-xs py-2 px-4 hidden md:block">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> +91-9928623387</span>
            <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> st.josephDholpur.com</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" /> Dholpur, Rajasthan, India
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-card shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="St. Joseph's International School Logo" className="h-14 w-14 object-contain" />
            <div>
              <h1 className="text-lg font-heading font-bold text-primary leading-tight">St. Joseph's</h1>
              <p className="text-xs text-muted-foreground leading-tight">International School, Dholpur</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="nav-link flex items-center gap-1 px-3 py-2">
                    {item.label} <ChevronDown className="w-3 h-3" />
                  </button>
                  <div
  className={`absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 min-w-[200px] z-50 transition-all duration-200 ${
    openDropdown === item.label
      ? "opacity-100 visible translate-y-0"
      : "opacity-0 invisible -translate-y-2"
  }`}
>
  {/* {item.children.map((child) => (
    <Link
      key={child.path}
      to={child.path}
      className={`block px-4 py-2 text-sm hover:bg-primary/10 transition-colors ${
        location.pathname === child.path
          ? "text-primary font-semibold bg-primary/10"
          : "text-foreground"
      }`}
    >
      {child.label}
    </Link>
  ))} */}
  {item.children.map((child) =>
  child.external ? (
    <a
      key={child.path}
      href={child.path}
      target="_blank"
      rel="noopener noreferrer"
      className="block py-1.5 px-3 text-sm text-foreground hover:text-primary hover:bg-primary/10 rounded"
    >
      {child.label}
    </a>
  ) : (
    <Link
      key={child.path}
      to={child.path}
      onClick={() => setMobileOpen(false)}
      className="block py-1.5 px-3 text-sm text-foreground hover:text-primary hover:bg-primary/10 rounded"
    >
      {child.label}
    </Link>
  )
)}
</div>
                </div>
              ) : (
                <Link
                  key={item.path}
                  to={item.path!}
                  className={`nav-link px-3 py-2 ${location.pathname === item.path ? "text-primary font-semibold" : ""}`}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Mobile toggle */}
          <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          
          <div className="lg:hidden bg-card border-t animate-fade-in z-999 inset-0">
            <div className="container mx-auto px-4 py-4 space-y-1">
              {navItems.map((item) =>
                item.children ? (
                  <div key={item.label}>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                      className="w-full text-left py-2 px-3 nav-link flex items-center justify-between"
                    >
                      {item.label} <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />
                    </button>
                    {openDropdown === item.label && (
                      <div className="pl-4 space-y-1 bg-white rounded-md">
                        {/* {item.children.map((child) => (
                          <Link key={child.path} to={child.path} onClick={() => setMobileOpen(false)}  className="block py-1.5 px-3 text-sm text-foreground hover:text-primary hover:bg-primary/10 rounded">
                            {child.label}
                          </Link>
                        ))} */}
                        {item.children.map((child) =>
  child.external ? (
    <a
      key={child.path}
      href={child.path}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => setMobileOpen(false)}
      className="block py-1.5 px-3 text-sm text-foreground hover:text-primary hover:bg-primary/10 rounded"
    >
      {child.label}
    </a>
  ) : (
    <Link
      key={child.path}
      to={child.path}
      onClick={() => setMobileOpen(false)}
      className="block py-1.5 px-3 text-sm text-foreground hover:text-primary hover:bg-primary/10 rounded"
    >
      {child.label}
    </Link>
  )
)}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link key={item.path} to={item.path!} onClick={() => setMobileOpen(false)} className="block py-2 px-3 nav-link">
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;