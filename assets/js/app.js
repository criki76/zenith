/* ==========================================================================
   ZENITH — Script principale (nav + UX micro-migliorie)
   Autore: Cristian + Zaira
   Dipendenze: nessuna (vanilla JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.site-header');
    const btn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('navLinks');

    /* ---------------------------------
       1) Sticky header leggero su scroll
       --------------------------------- */
    const onScroll = () => {
        if (!header) return;
        header.classList.toggle('is-stuck', window.scrollY > 6);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ------------------------------------------------
       2) Mobile nav: toggle accessibile + chiusure UX
       ------------------------------------------------ */
    let outsideClickHandler = null;
    let escHandler = null;

    function openMenu() {
        if (!btn || !nav) return;
        nav.classList.add('show');
        btn.setAttribute('aria-expanded', 'true');

        // Focus al primo link per tastiera
        const firstLink = nav.querySelector('a[href]');
        if (firstLink) firstLink.focus();

        // ESC per chiudere
        escHandler = (e) => { if (e.key === 'Escape') closeMenu(true); };
        document.addEventListener('keydown', escHandler);

        // Click fuori per chiudere
        outsideClickHandler = (e) => {
            if (!nav.contains(e.target) && e.target !== btn) closeMenu();
        };
        document.addEventListener('click', outsideClickHandler);
    }

    function closeMenu(refocusBtn = false) {
        if (!btn || !nav) return;
        nav.classList.remove('show');
        btn.setAttribute('aria-expanded', 'false');
        if (refocusBtn) btn.focus();

        if (escHandler) document.removeEventListener('keydown', escHandler);
        if (outsideClickHandler) document.removeEventListener('click', outsideClickHandler);
        escHandler = null;
        outsideClickHandler = null;
    }

    function toggleMenu() {
        if (!btn || !nav) return;
        const willOpen = !nav.classList.contains('show');
        willOpen ? openMenu() : closeMenu();
    }

    if (btn) {
        // Attributi ARIA minimi
        if (!btn.hasAttribute('aria-expanded')) btn.setAttribute('aria-expanded', 'false');
        if (!btn.hasAttribute('aria-controls')) btn.setAttribute('aria-controls', 'navLinks');

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleMenu();
        });
    }

    // Chiudi menu cliccando un link della nav (sia ancora che pagina)
    if (nav) {
        nav.addEventListener('click', (e) => {
            const a = e.target.closest('a[href]');
            if (!a) return;
            closeMenu();
        });
    }

    // Chiudi menu passando a layout desktop per evitare stati incoerenti
    window.addEventListener('resize', () => {
        if (!btn || !nav) return;
        const isBtnHidden = getComputedStyle(btn).display === 'none';
        if (isBtnHidden) closeMenu();
    });

    /* ----------------------------------------------------------
       3) Smooth scrolling per link interni (ancore tipo #faq)
       ---------------------------------------------------------- */
    function isInternalHashLink(el) {
        if (!el) return false;
        const href = el.getAttribute('href') || '';
        return href.startsWith('#') && href.length > 1;
    }

    function smoothScrollToHash(hash, updateHistory = true) {
        const target = document.querySelector(hash);
        if (!target) return;

        // Offset per header sticky
        const headerHeight = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - (headerHeight + 8);

        window.scrollTo({ top, behavior: 'smooth' });
        if (updateHistory) history.pushState(null, '', hash);
    }

    // Cattura click su QUALSIASI link hash interno
    document.addEventListener('click', (e) => {
        const a = e.target.closest('a[href^="#"]');
        if (!a || !isInternalHashLink(a)) return;

        e.preventDefault();
        const hash = a.getAttribute('href');
        smoothScrollToHash(hash, true);
    });

    // Se arrivi con hash già in URL, scrolla alla sezione con offset header
    if (location.hash && document.querySelector(location.hash)) {
        // Evita jump iniziale: scrolla dopo paint
        requestAnimationFrame(() => smoothScrollToHash(location.hash, false));
    }

    /* ------------------------------------------------------------------
       4) Evidenziazione link corrente (aria-current="page" per pagine)
          - Funziona sui link della nav con HREF a pagina (non hash)
       ------------------------------------------------------------------ */
    if (nav) {
        const links = nav.querySelectorAll('a[href]');
        const here = location.pathname.replace(/\/+$/, ''); // rimuovi trailing slash

        links.forEach((link) => {
            const href = link.getAttribute('href') || '';
            if (href.startsWith('#')) return; // solo pagine

            // Normalizza URL assoluto/relativo
            let path = '';
            try {
                path = new URL(href, location.origin).pathname.replace(/\/+$/, '');
            } catch {
                // se non parsabile, lascia stare
                return;
            }

            const isCurrent =
                path === here ||
                (path.endsWith('/index.html') && (here === '' || here === '/')) ||
                (here.endsWith('/index.html') && (path === '' || path === '/'));

            if (isCurrent) {
                link.setAttribute('aria-current', 'page');
                link.classList.add('is-active');
            } else {
                link.removeAttribute('aria-current');
                link.classList.remove('is-active');
            }
        });
    }

    /* -----------------------------------------------------------
       5) Qualità della vita: evidenzia sezione corrente in nav
          (solo quando i link puntano ad ancore della stessa pagina)
          — opzionale, minimo impatto
       ----------------------------------------------------------- */
    const sectionLinks = nav ? Array.from(nav.querySelectorAll('a[href^="#"]')) : [];
    const sectionTargets = sectionLinks
        .map(a => document.querySelector(a.getAttribute('href')))
        .filter(Boolean);

    // Observer leggero (fallback su scroll se non supportato)
    if ('IntersectionObserver' in window && sectionTargets.length) {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const id = '#' + entry.target.id;
                const link = sectionLinks.find(a => a.getAttribute('href') === id);
                if (!link) return;
                if (entry.isIntersecting) {
                    // Rimuovi stato dagli altri
                    sectionLinks.forEach(l => l.classList.remove('is-active'));
                    link.classList.add('is-active');
                }
            });
        }, { rootMargin: '-40% 0px -50% 0px', threshold: 0.01 });

        sectionTargets.forEach(sec => obs.observe(sec));
    }
});