"use client";

import { useState, useRef, useEffect } from "react";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { ChevronDown, Code, Layout, Server, Download, Sparkles, Box, Github, Linkedin, Mail, Menu, X, ChevronUp, BookOpen, GraduationCap, Laptop, Terminal, Globe, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { name: "Feed", href: "/" },
    {
        name: "Projects",
        href: "/projects",
        dropdown: {
            title: "Built for developers in the agent-first era",
            linkText: "Explore all projects ↗",
            linkHref: "/projects",
            items: [
                { title: "Professional", icon: Sparkles, href: "/projects?tag=pro" },
                { title: "Frontend", icon: Layout, href: "/projects?tag=front" },
                { title: "Fullstack", icon: Server, href: "/projects?tag=full" },
                { title: "Open Source", icon: Box, href: "/projects?tag=oss" },
            ],
        },
    },
    {
        name: "Courses",
        dropdown: {
            title: "Learn the craft of modern software",
            linkText: "View all courses ↗",
            linkHref: "/about#courses",
            items: [
                { title: "Next.js Masterclass", icon: GraduationCap, href: "/courses/nextjs" },
                { title: "Tailwind CSS", icon: Laptop, href: "/courses/tailwind" },
                { title: "React Patterns", icon: BookOpen, href: "/courses/react" },
                { title: "Fullstack Guide", icon: Terminal, href: "/courses/fullstack" },
            ]
        }
    },
    { name: "Blog", href: "/blog" },
    {
        name: "Connect",
        dropdown: {
            title: "Let's build something great together",
            linkText: "Get in touch ↗",
            linkHref: "mailto:contato@gabrielgama.io",
            items: [
                { title: "Github", icon: Github, href: "https://github.com/gabrielgama" },
                { title: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/gabrielgama" },
                { title: "Email", icon: Mail, href: "mailto:contato@gabrielgama.io" },
                { title: "Snippets", icon: Code, href: "/blog?category=snippets" },
            ]
        }
    }
];

export function Navbar() {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [expandedMobileItems, setExpandedMobileItems] = useState<string[]>([]);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // i18n
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const isInstitutionalPage = pathname === '/about';

    const switchLanguage = () => {
        const nextLocale = locale === 'pt' ? 'en' : 'pt';
        router.replace(pathname, { locale: nextLocale });
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        if (!isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    };

    const toggleMobileAccordion = (name: string) => {
        setExpandedMobileItems(prev =>
            prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
        );
    };

    // Track Scroll
    useEffect(() => {
        if (typeof window === "undefined") return;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Hide if scrolling down past 50px AND dropdown is closed
            if (currentScrollY > lastScrollY && currentScrollY > 50 && !activeMenu) {
                setIsVisible(false);
            }
            // Show if scrolling up or at top
            else {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY, activeMenu]);

    const handleMouseEnter = (menuName: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setActiveMenu(menuName);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setActiveMenu(null);
        }, 200);
    };

    const isDropdownActive = activeMenu && navItems.find((i) => i.name === activeMenu)?.dropdown;

    return (
        <header
            className={`fixed top-0 z-50 w-full transition-all duration-300 ease-in-out font-sans ${isDropdownActive || isMobileMenuOpen
                ? "bg-background border-b border-stone-200 translate-y-0"
                : "bg-background/80 backdrop-blur-md border-b border-transparent hover:border-stone-200"
                } ${!isVisible ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}`}
            onMouseLeave={handleMouseLeave}
        >
            <div className="flex w-full items-center justify-between px-6 md:px-12 h-12 relative">
                {/* LEFT SECTION (LOGO + NAV) */}
                <div className="flex items-center gap-8 h-full">
                    {/* LOGO */}
                    <Link
                        href="/"
                        className="text-base font-medium tracking-tight text-stone-900 z-50 transition-colors duration-300"
                        onMouseEnter={() => handleMouseEnter("logo")}
                        onClick={() => isMobileMenuOpen && toggleMobileMenu()}
                    >
                        Gabriel<span className={`${isMobileMenuOpen ? 'text-stone-400' : 'text-stone-500'} font-normal ml-[3px]`}>Gama</span>
                    </Link>

                    {/* DESKTOP LINKS OR BACK BUTTON */}
                    <div className="hidden md:flex items-center h-full z-20">
                        <AnimatePresence mode="wait">
                            {isInstitutionalPage ? (
                                <motion.div
                                    key="back-button"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                >
                                    <Link
                                        href="/"
                                        className="flex items-center gap-2 px-4 py-1.5 ml-4 text-[14px] leading-[21px] tracking-[0.1px] font-medium text-stone-500 hover:text-stone-900 transition-colors"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        {locale === 'pt' ? 'Voltar para o portfólio' : 'Back to portfolio'}
                                    </Link>
                                </motion.div>
                            ) : (
                                <motion.nav
                                    key="nav-links"
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="flex items-center gap-1 h-full"
                                >
                                    {navItems.map((item) => (
                                        <div
                                            key={item.name}
                                            className="relative h-full flex items-center"
                                            onMouseEnter={() => handleMouseEnter(item.name)}
                                        >
                                            <Link
                                                href={item.href || "#"}
                                                className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-[14px] leading-[21px] tracking-[0.1px] font-medium transition-colors
                                  ${activeMenu === item.name
                                                        ? "bg-stone-100 text-stone-900"
                                                        : "text-[#45474D] hover:text-stone-900 hover:bg-stone-50"}`}
                                            >
                                                {item.name}
                                                {item.dropdown && (
                                                    <ChevronDown
                                                        className={`w-3.5 h-3.5 ml-0.5 text-stone-400 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                                      ${activeMenu === item.name ? "rotate-180 text-stone-900" : ""}`}
                                                    />
                                                )}
                                            </Link>
                                        </div>
                                    ))}
                                </motion.nav>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* RIGHT SECTION (LANGUAGE TOGGLE + DESKTOP ABOUT + MOBILE TOGGLE) */}
                <div className="flex items-center gap-4 z-50">
                    <div className="hidden md:flex items-center gap-4">
                        {/* Language Switcher */}
                        <button
                            onClick={switchLanguage}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900"
                        >
                            <Globe className="w-3.5 h-3.5" />
                            <span className="uppercase">{locale}</span>
                        </button>

                        {/* About Button */}
                        <div onMouseEnter={() => handleMouseEnter("contact")}>
                            <motion.button
                                className="relative overflow-hidden group cursor-pointer"
                                onHoverStart={() => {
                                    // Trigger animation logic could be here if needed for complexity
                                }}
                                whileHover="hover"
                            >
                                <Link
                                    href={isInstitutionalPage ? "/cv.pdf" : "/about"}
                                    target={isInstitutionalPage ? "_blank" : undefined}
                                    className="block rounded-full bg-stone-900 px-6 py-2 text-[13px] font-medium text-white transition-all group-hover:bg-black group-hover:shadow-lg"
                                >
                                    <motion.span
                                        className="block relative overflow-hidden"
                                        layout
                                        variants={{
                                            hover: {
                                                y: [0, 2, 0],
                                                transition: { duration: 0.2, ease: "easeOut", delay: 0.1 }
                                            }
                                        }}
                                    >
                                        <AnimatePresence mode="wait">
                                            <motion.span
                                                key={isInstitutionalPage ? "cv" : "about"}
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.2 }}
                                                className="flex items-center justify-center gap-2 whitespace-nowrap"
                                            >
                                                {isInstitutionalPage ? (
                                                    <>
                                                        <Download className="w-3.5 h-3.5" />
                                                        {locale === 'pt' ? 'Baixar CV' : 'Download CV'}
                                                    </>
                                                ) : (
                                                    'About'
                                                )}
                                            </motion.span>
                                        </AnimatePresence>
                                    </motion.span>

                                    {/* Falling Icon/Text Element */}
                                    <motion.div
                                        className="absolute -top-6 left-1/2 -translate-x-1/2 text-white pointer-events-none opacity-0 group-hover:opacity-100 flex items-center gap-1"
                                        variants={{
                                            hover: {
                                                y: [0, 30],
                                                opacity: [0, 1, 0],
                                                transition: { duration: 0.3, ease: "circIn" }
                                            }
                                        }}
                                    >
                                        <span className="text-[10px] uppercase tracking-widest font-bold">
                                            {isInstitutionalPage ? 'CV' : 'About'}
                                        </span>
                                    </motion.div>
                                </Link>
                            </motion.button>
                        </div>
                    </div>

                    {/* MOBILE TOGGLE */}
                    <button
                        className={`md:hidden p-2 rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'bg-stone-900 text-white shadow-lg' : 'text-stone-600 hover:bg-stone-100'}`}
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {/* DESKTOP MEGA MENU PANEL */}
                <div
                    className={`hidden md:block absolute top-full left-0 w-full overflow-hidden transition-all duration-300 origin-top rounded-b-[24px]
            ${isDropdownActive ? "opacity-100 bg-background shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border-b border-x border-stone-200" : "opacity-0 bg-transparent pointer-events-none"}`}
                    style={{
                        maxHeight: isDropdownActive ? "500px" : "0px",
                        clipPath: isDropdownActive ? "inset(0px -100vw -100vh -100vw)" : "inset(0px 0px 100% 0px)"
                    }}
                >
                    <div className="mx-auto w-full max-w-[1400px] px-6 py-10 relative">
                        {navItems.map((item) => {
                            if (!item.dropdown) return null;
                            const isActive = activeMenu === item.name;
                            return (
                                <div
                                    key={`dropdown-${item.name}`}
                                    className={`w-full flex justify-center gap-16 transition-all duration-400 transform
                    ${isActive ? "opacity-100 translate-y-0 relative z-10" : "opacity-0 -translate-y-4 absolute inset-0 z-0 pointer-events-none"}`}
                                >
                                    <div className="w-[300px] pt-2">
                                        <h3 className="text-2xl font-normal tracking-tight text-stone-900 mb-8 leading-[1.15]">
                                            {item.dropdown.title}
                                        </h3>
                                        <Link
                                            href={item.dropdown.linkHref}
                                            className="text-[13px] font-medium text-stone-500 hover:text-stone-900 transition-colors"
                                        >
                                            {item.dropdown.linkText}
                                        </Link>
                                    </div>

                                    <div className="w-[480px] grid grid-cols-2 gap-x-2 gap-y-2">
                                        {item.dropdown.items.map((sub, i) => {
                                            const Icon = sub.icon;
                                            return (
                                                <Link
                                                    key={i}
                                                    href={sub.href}
                                                    className={`flex items-center gap-4 p-3 rounded-xl hover:bg-stone-50 transition-all duration-300 group
                                ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
                                                    style={{ transitionDelay: isActive ? `${i * 50}ms` : "0ms" }}
                                                >
                                                    <div className="w-8 h-8 rounded shrink-0 border border-transparent flex items-center justify-center text-stone-500 group-hover:text-stone-900 transition-all">
                                                        <div className="relative">
                                                            <Icon className="w-4 h-4 stroke-[1.5]" />
                                                            <div className="absolute inset-0 bg-stone-100 rounded opacity-0 group-hover:opacity-100 -z-10 scale-50 group-hover:scale-150 transition-all duration-300 ease-out"></div>
                                                        </div>
                                                    </div>
                                                    <span className="text-[14px] font-medium text-stone-700 group-hover:text-stone-900 transition-colors">{sub.title} <span className="text-stone-300 group-hover:text-stone-500 transition-colors opacity-0 group-hover:opacity-100 ml-1 inline-block -translate-x-1 group-hover:translate-x-0">›</span></span>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* MOBILE FULL SCREEN MENU */}
                <div className={`md:hidden fixed inset-0 w-full h-[100dvh] bg-[#fafaf9] z-40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
                    <div className="flex flex-col pt-24 px-6 h-full overflow-y-auto">
                        <nav className="flex flex-col">
                            {navItems.map((item) => (
                                <div key={`mobile-${item.name}`} className="border-b border-stone-100">
                                    <div className="flex items-center justify-between w-full">
                                        <Link
                                            href={item.href || "#"}
                                            className="flex-1 py-6 text-2xl font-normal text-stone-900"
                                            onClick={item.dropdown ? undefined : toggleMobileMenu}
                                        >
                                            {item.name}
                                        </Link>
                                        {item.dropdown && (
                                            <button
                                                onClick={() => toggleMobileAccordion(item.name)}
                                                className="p-6 focus:outline-none"
                                            >
                                                {expandedMobileItems.includes(item.name) ? <ChevronUp className="w-6 h-6 text-stone-400" /> : <ChevronDown className="w-6 h-6 text-stone-400" />}
                                            </button>
                                        )}
                                    </div>

                                    {item.dropdown && (
                                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedMobileItems.includes(item.name) ? 'max-h-[1000px] mb-8 opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <div className="grid grid-cols-1 gap-1 pl-2">
                                                {item.dropdown.items.map((sub, i) => {
                                                    const Icon = sub.icon;
                                                    return (
                                                        <Link
                                                            key={i}
                                                            href={sub.href}
                                                            className="flex items-center gap-4 py-4 group"
                                                            onClick={toggleMobileMenu}
                                                        >
                                                            <div className="w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center text-stone-400 group-active:text-stone-900 group-active:bg-stone-100 transition-all">
                                                                <Icon className="w-5 h-5 stroke-[1.5]" />
                                                            </div>
                                                            <div className="flex items-center justify-between flex-1 pr-2">
                                                                <span className="text-[18px] font-medium text-stone-700">{sub.title}</span>
                                                                <span className="text-stone-300">›</span>
                                                            </div>
                                                        </Link>
                                                    )
                                                })}
                                                <div className="mt-2 pt-6 border-t border-stone-100">
                                                    <Link
                                                        href={item.dropdown.linkHref}
                                                        className="inline-flex items-center gap-2 px-6 py-3 bg-stone-50 rounded-full text-[14px] font-medium text-stone-500 active:bg-stone-100 active:text-stone-900 transition-all"
                                                        onClick={toggleMobileMenu}
                                                    >
                                                        {item.dropdown.linkText}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>

                        <div className="mt-auto pb-12 pt-8 flex flex-col gap-4">
                            {/* Language Switcher Mobile */}
                            <button
                                onClick={() => {
                                    switchLanguage();
                                    toggleMobileMenu();
                                }}
                                className="w-full rounded-2xl bg-stone-50 py-4 flex items-center justify-center gap-2 text-[15px] font-medium text-stone-600"
                            >
                                <Globe className="w-4 h-4" />
                                <span className="">{locale === 'pt' ? 'Switch to English' : 'Mudar para Português'}</span>
                            </button>

                            <Link
                                href="/about"
                                className="w-full rounded-2xl bg-stone-900 py-5 flex items-center justify-center gap-3 text-lg font-medium text-white shadow-xl"
                                onClick={toggleMobileMenu}
                            >
                                About
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header >
    );
}
