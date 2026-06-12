/* 
    Badrul Huda Academy - Main JavaScript
*/

// --- Firebase Cloud Database Configuration ---
// Fill in your free Firebase credentials below to make the website live!
// If left as is, the website will run in Local Mode (offline fallback via localStorage).
window.firebaseConfig = {
    apiKey: "AIzaSyCg_huCyYieDc7xz8h7cLZvwkb91xfLdKs",
    authDomain: "badrulhudaacademy-3341a.firebaseapp.com",
    databaseURL: "https://badrulhudaacademy-3341a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "badrulhudaacademy-3341a",
    storageBucket: "badrulhudaacademy-3341a.firebasestorage.app",
    messagingSenderId: "815336295058",
    appId: "1:815336295058:web:89d0df501c88285f6b344b",
    measurementId: "G-YF5RKM1S9C"
};

window.firebaseDb = null;
window.useFirebaseCloud = false;

// --- Default Data for pre-populating database on first run ---
const defaultFaculty = [
    {
        id: 1,
        name: "Sayyid Ali Bafakhy",
        role: "President, Badrul Huda",
        image: "c:\\Users\\USER\\Downloads\\WhatsApp-Image-2025-07-19-at-11.06.33-AM.webp",
        bio: "Specializing in the preservation of Prophetic traditions and Quranic exegesis with over 20 years of experience."
    },
    {
        id: 2,
        name: "Usman Musliyar Kundala",
        role: "Secratory, Badrul Huda",
        image: "c:\\Users\\USER\\Downloads\\WhatsApp Image 2026-06-08 at 12.19.31 PM.jpeg",
        bio: "A master of classical Arabic grammar and modern linguistics, helping students unlock the Quranic language."
    },
    {
        id: 3,
        name: "Noufal Ahsani Perunthatta",
        role: "Faculty of Academic Research",
        image: "assets/faculty_scholar.png",
        bio: "Bridging traditional Islamic sciences with contemporary academic frameworks and ethical research."
    },
    {
        id: 4,
        name: "Shafi Noorani",
        role: "Faculty, Badrul Huda",
        image: "assets/faculty_scholar.png",
        bio: "A master of classical Arabic grammar and modern linguistics, helping students unlock the Quranic language."
    },
    {
        id: 5,
        name: "Usman Saquafi",
        role: "Faculty, Badrul Huda",
        image: "assets/faculty_scholar.png",
        bio: "A master of classical Arabic grammar and modern linguistics, helping students unlock the Quranic language."
    },
    {
        id: 6,
        name: "Naseer Kottathara",
        role: "Manager, Badrul Huda",
        image: "assets/faculty_scholar.png",
        bio: "A master of classical Arabic grammar and modern linguistics, helping students unlock the Quranic language."
    }
];

const defaultOrganisations = [
    {
        id: "swabah",
        title: "SWABAH",
        tagline: "Literary & Cultural Club",
        description: "SWABAH (meaning \"morning breeze\") is the literary and cultural association that fosters artistic, oratorical, and creative talents among students. Dedicated to building intellectual depth and creative expression, SWABAH provides students with platforms to showcase their artistic capacities, engage in intellectual dialogue, and nurture cultural leadership.",
        image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800",
        members: [
            {
                id: 1,
                name: "Muhammed Shibili MP",
                role: "Student President",
                bio: "Coordinates cultural events, designs the speech catalog, and directs the Bahar-e-Huda Fest.",
                image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150"
            },
            {
                id: 2,
                name: "Muhammed Sabith",
                role: "General Secretary",
                bio: "Maintains club records, drafts meeting resolutions, and handles event administration.",
                image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150"
            },
            {
                id: 3,
                name: "Muhammed Bilal",
                role: "Finance Secretary",
                bio: "Conducts structural workshops on classical Arabic scripts and edits the wall magazine.",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
            },
            {
                id: 4,
                name: "Muhammed Sinan E",
                role: "Vice President",
                bio: "Provides institutional advice, syllabus alignment, and judges debate forums.",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
            },
            {
                id: 5,
                name: "Sinan Ahamed",
                role: "Joint Secretary",
                bio: "Conducts structural workshops on classical Arabic scripts and edits the wall magazine.",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
            }
        ]
    },
    {
        id: "nadi-dawa",
        title: "Nadi Dawa",
        tagline: "Mission & Community Welfare",
        description: "Nadi Dawa is the spiritual outreach and community service wing of Badrul Huda Academy. Focused on moral propagation, humanitarian relief, and public education, Nadi Dawa trains students to serve as compassionate guides and active contributors to society. Through seminars, community camps, and moral outreach classes, Nadi Dawa spreads positive values and supports those in need.",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
        members: [
            {
                id: 1,
                name: "Ahmad Kabir",
                role: "President",
                bio: "Coordinates outreach classes, plans community support, and delegates humanitarian visits.",
                image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150"
            },
            {
                id: 2,
                name: "Abdul Rahim",
                role: "Secretary",
                bio: "Manages correspondence with partner organizations and oversees As-Safa publication cycles.",
                image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=150"
            },
            {
                id: 3,
                name: "Sayyid Ali Shihab",
                role: "Outreach Director",
                bio: "Directs village cleaning campaigns, coordinates emergency aid, and handles youth study circles.",
                image: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=150"
            },
            {
                id: 4,
                name: "Usman Saquafi",
                role: "Staff Advisor",
                bio: "Guides students on moral studies, validates newsletter content, and checks public course agendas.",
                image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150"
            }
        ]
    },
    {
        id: "qhsa",
        title: "QHSA",
        tagline: "Quwwathul Huda Students Association",
        description: "QHSA is the central student council representing the entire student body at Badrul Huda Academy. Dedicated to student welfare, venture governance, and institutional coordination, QHSA serves as a bridge between the faculty administration and the students. QHSA organizes academic initiatives, sports tournaments, and oversees hostel/mess committees.",
        image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800",
        members: [
            {
                id: 1,
                name: "Muhammed Rafi",
                role: "Student Chairman",
                bio: "Presides over council sessions, meets with academic deans, and guides venture fests.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
            },
            {
                id: 2,
                name: "Shamil Bilal",
                role: "General Secretary",
                bio: "Directs student welfare affairs, hostel mess meetings, and writes administrative proposals.",
                image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=150"
            },
            {
                id: 3,
                name: "Faris Wayanad",
                role: "Sports Captain",
                bio: "Leads student football & cricket teams, manages stadium rosters, and runs the Huda Olympiad.",
                image: "https://images.unsplash.com/photo-1506863530036-1efeddceb993?auto=format&fit=crop&q=80&w=150"
            },
            {
                id: 4,
                name: "Usman Musliyar Kundala",
                role: "Patron",
                bio: "Oversees council integrity, supports student welfare funding, and bridges student administration.",
                image: "https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&q=80&w=150"
            }
        ]
    }
];

// Helper to dynamically load external scripts
function loadFirebaseScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// Global initialization function
window.initializeFirebaseService = async function () {
    if (!window.firebaseConfig.apiKey || window.firebaseConfig.apiKey === "YOUR_API_KEY") {
        return false;
    }
    if (window.useFirebaseCloud) return true;

    try {
        if (typeof firebase === 'undefined') {
            await loadFirebaseScript("https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js");
            await loadFirebaseScript("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore-compat.js");
        }
        if (!firebase.apps.length) {
            firebase.initializeApp(window.firebaseConfig);
        }
        window.firebaseDb = firebase.firestore();
        window.useFirebaseCloud = true;
        console.log("Firebase Cloud DB loaded and active.");
        return true;
    } catch (err) {
        console.warn("Firebase failed to load, falling back to LocalStorage:", err);
        return false;
    }
};

document.addEventListener('DOMContentLoaded', () => {

    // --- Pre-populate Local Storage with defaults if empty ---
    if (!localStorage.getItem('badrulHudaFaculty')) {
        localStorage.setItem('badrulHudaFaculty', JSON.stringify(defaultFaculty));
    }
    if (!localStorage.getItem('badrulHudaOrganisations')) {
        localStorage.setItem('badrulHudaOrganisations', JSON.stringify(defaultOrganisations));
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');

    // Create Back to Top Button
    const backToTop = document.createElement('div');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        // Navbar Scrolled
        if (window.scrollY > 50) {
            if (navbar) navbar.classList.add('scrolled');
            backToTop.classList.add('show');
        } else {
            if (navbar) navbar.classList.remove('scrolled');
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (menuToggle && navLinks) {
        // Create Sidebar Header on Mobile if not exists
        if (!navLinks.querySelector('.sidebar-header')) {
            const sidebarHeader = document.createElement('div');
            sidebarHeader.className = 'sidebar-header';
            sidebarHeader.innerHTML = `
                <div class="sidebar-logo">
                    <img src="assets/logo.jpg" alt="Badrul Huda" onerror="this.style.display='none';">
                    <div class="sidebar-logo-text">
                        Badrul Huda Academy
                        <span>Panamaram</span>
                    </div>
                </div>
                <button class="sidebar-close" id="sidebar-close-btn" aria-label="Close Menu">&times;</button>
            `;
            navLinks.insertBefore(sidebarHeader, navLinks.firstChild);
            
            // Add close button event
            const closeBtn = sidebarHeader.querySelector('#sidebar-close-btn');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    closeMenu();
                });
            }
        }

        // Create overlay scrim if not exists
        let overlay = document.querySelector('.nav-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'nav-overlay';
            document.body.appendChild(overlay);
        }

        function openMenu() {
            navLinks.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scroll when menu open
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        }

        function closeMenu() {
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }

        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (navLinks.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        overlay.addEventListener('click', closeMenu);

        // Close menu when clicking normal links, but NOT dropdown triggers on mobile
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const isDropdownTrigger = link.parentElement.classList.contains('nav-item-dropdown');
                
                // If it is a dropdown trigger and we are on mobile, let the chevron click toggle it
                if (isDropdownTrigger && window.innerWidth <= 768) {
                    return;
                }
                
                closeMenu();
            });
        });

        // Toggle dropdowns in mobile menu when clicking the chevron specifically
        const dropdowns = navLinks.querySelectorAll('.nav-item-dropdown');
        dropdowns.forEach(dropdown => {
            const triggerLink = dropdown.querySelector('a');
            if (triggerLink) {
                triggerLink.addEventListener('click', (e) => {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        e.stopPropagation();

                        // Close other mobile dropdowns
                        dropdowns.forEach(other => {
                            if (other !== dropdown) {
                                other.classList.remove('open');
                            }
                        });

                        dropdown.classList.toggle('open');
                    }
                });
            }
        });
    }

    // --- Active Link on Scroll ---
    const sections = document.querySelectorAll('section[id]');

    function scrollActive() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 150;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href*='${sectionId}']`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                if (navLink) navLink.classList.add('active');
            } else {
                if (navLink) navLink.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', scrollActive);

    // --- Sponsorship Form Handler ---
    const sponsorshipForm = document.getElementById('sponsorship-form');

    if (sponsorshipForm) {
        sponsorshipForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(sponsorshipForm);
            const sponsorData = {
                name: formData.get('sponsor_name'),
                phone: formData.get('sponsor_phone'),
                category: formData.get('sponsorship_category'),
                message: formData.get('sponsor_message'),
                timestamp: new Date().toLocaleString()
            };

            // Log the data (In production, send to backend)
            console.log('Sponsorship Registration:', sponsorData);

            // Store in localStorage for demonstration
            let sponsorships = JSON.parse(localStorage.getItem('sponsorships')) || [];
            sponsorships.push(sponsorData);
            localStorage.setItem('sponsorships', JSON.stringify(sponsorships));

            // Show success message
            const successMsg = document.createElement('div');
            successMsg.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: #4caf50;
                color: white;
                padding: 16px 24px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 10000;
                animation: slideIn 0.3s ease-in;
                font-weight: 600;
            `;
            successMsg.innerHTML = `
                <i class="fas fa-check-circle" style="margin-right: 10px;"></i>
                Thank you for your sponsorship! We'll contact you soon.
            `;
            document.body.appendChild(successMsg);

            // Remove message after 4 seconds
            setTimeout(() => {
                successMsg.style.animation = 'slideOut 0.3s ease-out';
                setTimeout(() => successMsg.remove(), 300);
            }, 4000);

            // Reset form
            sponsorshipForm.reset();

            // Optional: Send to backend email service
            // sendSponsorshipEmail(sponsorData);
        });
    }

    // --- Gallery Slider ---
    let currentSlide = 0;
    const sliderTrack = document.getElementById('slider-track');
    const sliderDots = document.getElementById('slider-dots');

    function loadGallerySlides() {
        if (!sliderTrack) return;

        const gallery = JSON.parse(localStorage.getItem('badrulHudaGallery')) || [];

        if (gallery.length === 0) {
            // Keep the default slide if no photos
            return;
        }

        // Clear existing slides except the default one
        if (gallery.length > 0) {
            sliderTrack.innerHTML = '';
        }

        // Add slides from gallery
        gallery.forEach((photo, index) => {
            const slide = document.createElement('div');
            slide.className = 'slide';
            slide.style.backgroundImage = `url('${photo.image}')`;
            slide.style.backgroundSize = 'cover';
            slide.style.backgroundPosition = 'center';
            sliderTrack.appendChild(slide);
        });

        // Create dots
        sliderDots.innerHTML = '';
        gallery.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.onclick = () => goToSlide(index);
            sliderDots.appendChild(dot);
        });

        currentSlide = 0;
    }

    window.prevSlide = function () {
        const slides = sliderTrack.querySelectorAll('.slide');
        if (slides.length === 0) return;

        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    };

    window.nextSlide = function () {
        const slides = sliderTrack.querySelectorAll('.slide');
        if (slides.length === 0) return;

        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    };

    window.goToSlide = function (index) {
        const slides = sliderTrack.querySelectorAll('.slide');
        if (slides.length === 0) return;

        currentSlide = index;
        updateSlider();
    };

    function updateSlider() {
        if (!sliderTrack) return;

        const slides = sliderTrack.querySelectorAll('.slide');
        if (slides.length === 0) return;

        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

        // Update dots
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Load gallery on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadGallerySlides);
    } else {
        loadGallerySlides();
    }

    // Listen for storage changes (when admin adds photos)
    window.addEventListener('storage', loadGallerySlides);

    // Auto-slide every 10 seconds
    let sliderInterval = setInterval(() => {
        const slides = sliderTrack ? sliderTrack.querySelectorAll('.slide') : [];
        if (slides.length > 1) nextSlide();
    }, 10000);

    // --- Ventures Accordion Trigger Logic ---
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');
    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const item = trigger.parentElement;
            const content = item.querySelector('.accordion-content');
            const icon = trigger.querySelector('.accordion-icon');
            const isOpen = item.classList.contains('open');

            // Close all other items
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('open');
                    otherItem.querySelector('.accordion-content').style.maxHeight = '0';
                    const otherIcon = otherItem.querySelector('.accordion-icon');
                    if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                }
            });

            if (isOpen) {
                item.classList.remove('open');
                content.style.maxHeight = '0';
                if (icon) icon.style.transform = 'rotate(0deg)';
            } else {
                item.classList.add('open');
                content.style.maxHeight = content.scrollHeight + 'px';
                if (icon) icon.style.transform = 'rotate(180deg)';
            }
        });
    });

    // --- Server Sync API Layer (Firebase Cloud DB / localStorage Sync) ---
    window.syncWithServer = async function (callback) {
        const firebaseActive = await window.initializeFirebaseService();
        if (firebaseActive && window.firebaseDb) {
            try {
                // Fetch news from Firebase Firestore
                const newsSnapshot = await window.firebaseDb.collection("news").get();
                const news = [];
                newsSnapshot.forEach(doc => {
                    const item = doc.data();
                    item.id = parseInt(doc.id) || item.id;
                    news.push(item);
                });
                localStorage.setItem('badrulHudaNews', JSON.stringify(news));

                // Fetch gallery from Firebase Firestore
                const gallerySnapshot = await window.firebaseDb.collection("gallery").get();
                const gallery = [];
                gallerySnapshot.forEach(doc => {
                    const item = doc.data();
                    item.id = parseInt(doc.id) || item.id;
                    gallery.push(item);
                });
                localStorage.setItem('badrulHudaGallery', JSON.stringify(gallery));

                // Fetch faculty from Firebase Firestore
                try {
                    const facultySnapshot = await window.firebaseDb.collection("faculty").get();
                    if (facultySnapshot.size > 0) {
                        const faculty = [];
                        facultySnapshot.forEach(doc => {
                            const item = doc.data();
                            item.id = parseInt(doc.id) || item.id;
                            faculty.push(item);
                        });
                        localStorage.setItem('badrulHudaFaculty', JSON.stringify(faculty));
                    }
                } catch (err) {
                    console.error("Failed to sync faculty from Firebase:", err);
                }

                // Fetch organisations from Firebase Firestore
                try {
                    const orgSnapshot = await window.firebaseDb.collection("organisations").get();
                    if (orgSnapshot.size > 0) {
                        const orgs = [];
                        orgSnapshot.forEach(doc => {
                            orgs.push(doc.data());
                        });
                        localStorage.setItem('badrulHudaOrganisations', JSON.stringify(orgs));
                    }
                } catch (err) {
                    console.error("Failed to sync organisations from Firebase:", err);
                }

                console.log('Synced news, gallery, faculty and organisations from Firebase Cloud.');
                if (callback) callback();
            } catch (err) {
                console.error("Firebase sync error:", err);
                if (callback) callback();
            }
        } else {
            console.log('Running in Local Mode (offline localStorage fallback).');
            if (callback) callback();
        }
    };

    // Sync database on page load and trigger UI reloads
    if (document.getElementById('slider-track')) {
        window.syncWithServer(loadGallerySlides);
    } else {
        window.syncWithServer();
    }

    // --- Ventures Accordion Helper & Sync from Dropdown ---
    window.openVentureAccordion = function (index) {
        const items = document.querySelectorAll('.accordion-item');
        if (items[index]) {
            const trigger = items[index].querySelector('.accordion-trigger');
            if (trigger) {
                if (!items[index].classList.contains('open')) {
                    trigger.click();
                }
                setTimeout(() => {
                    items[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
            }
        }
    };

    // Check query params to open venture on load
    const urlParams = new URLSearchParams(window.location.search);
    const ventureParam = urlParams.get('venture');
    if (ventureParam !== null && ventureParam !== undefined && ventureParam !== '') {
        setTimeout(() => {
            window.openVentureAccordion(parseInt(ventureParam));
        }, 500);
    }

    // Intercept dropdown sub-venture link clicks to open accordion directly if already on about.html
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href*="about.html?venture="]');
        if (link) {
            const url = new URL(link.href, window.location.origin);
            const ventureId = url.searchParams.get('venture');
            if ((window.location.pathname.endsWith('about.html') || window.location.pathname === '/' || window.location.pathname === '') && ventureId !== null) {
                e.preventDefault();
                window.openVentureAccordion(parseInt(ventureId));
                // If it is in mobile drawer, close the drawer
                if (typeof closeMenu === 'function') closeMenu();
            }
        }
    });

    // --- Subdropdown Menu Toggle (for Ventures list inside header dropdown) ---
    const subdropdownToggles = document.querySelectorAll('.subdropdown-toggle');
    subdropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                const parent = toggle.parentElement;
                parent.classList.toggle('open');
            }
        });
    });

});
