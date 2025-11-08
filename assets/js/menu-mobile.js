/* ==========================================================================
   ZENITH — Script principale (nav + UX micro-migliorie)
   Autore: Cristian + Zaira
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.site-header');
    const btn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('navLinks');

    /* -----------------------------
       1) Sticky header leggero
       ----------------------------- */
    const onScroll = () => {
        if (!header) return;
        const stuck = window.scrollY > 6;
        header.classList.toggle('is-stuck', stuck);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ---------------------------------------
       2) Mobile nav: toggle + ARIA + chiusure
       --------------------------------------- */
    let outsideClickHandler = null;
    let escHandler = null;

    function openMenu() {
        if (!btn || !nav) return;
        nav.classList.add('show');
        btn.setAttribute('aria-expanded', 'true');

        // primo link focus per tastiera
        const firstLink = nav.querySelector('a[href]');
        if (firstLink) firstLink.focus();

        // Chiudi con ESC
        escHandler = (e) => {
            if (e.key === 'Escape') closeMenu(true);
        };
        document.addEventListener('keydown', escHandler);

        // Chiudi cliccando fuori
        outsideClickHandler = (e) => {
            if (!nav.contains(e.target) && e.target !== btn) {
                closeMenu();
            }
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
        // Assicurati che gli attributi ARIA siano presenti
        btn.setAttribute('aria-expanded', 'false');
        if (!btn.hasAttribute('aria-controls')) btn.setAttribute('aria-controls', 'navLinks');

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleMenu();
        });
    }

    // Chiudi il menu quando si clicca un link della nav (in mobile)
    if (nav) {
        nav.addEventListener('click', (e) => {
            const a = e.target.closest('a[href]');
            if (!a) return;

            // Se è un anchor interno, faremo smooth scroll sotto (e chiudiamo il menu)
            const href = a.getAttribute('href') || '';
            const isHash = href.startsWith('#') && href.length > 1;
            if (isHash) {
                closeMenu();
            } else {
                // per link a pagina (es. associazione.html) chiudi subito
                closeMenu();
            }
        });
    }

    // Chiudi il menu se cambia dimensione finestra (evita stati incoerenti)
    window.addEventListener('resize', () => {
        if (!nav) return;
        if (getComputedStyle(btn).display === 'none') {
            // siamo in desktop: assicurati che il menu sia chiuso e aria aggiornata
            closeMenu();
        }
    });

    /* ----------------------------------------------------------
       3) Smooth scrolling per link interni (ancore tipo #faq)
       ---------------------------------------------------------- */
    document.addEventListener('click', (e) => {
        const a = e.target.closest('a[href^="#"]');
        if (!a) return;

        const hash = a.getAttribute('href');
        if (!hash || hash.length < 2) return;

        const target = document.querySelector(hash);
        if (!target) return;

        e.preventDefault();

        // calcola offset per header sticky (se serve)
        const headerHeight = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - (headerHeight + 8);

        window.scrollTo({
            top,
            behavior: 'smooth'
        });

        // opzionale: aggiornare l'URL con hash senza jump immediato
        history.pushState(null, '', hash);
    });

    /* -----------------------------------------------------
       4) Evidenziazione link corrente (aria-current="page")
       ----------------------------------------------------- */
    if (nav) {
        const links = nav.querySelectorAll('a[href]');
        const here = location.pathname.replace(/\/+$/, ''); // senza trailing slash
        links.forEach((link) => {
            const href = link.getAttribute('href') || '';
            if (href.startsWith('#')) return; // salta anchor
            try {
                const url = new URL(href, location.origin);
                const path = url.pathname.replace(/\/+$/, '');
                // Match semplice: stessa pagina oppure index.html vs /
                const isCurrent =
                    path === here ||
                    (path.endsWith('/index.html') && here === '') ||
                    (here.endsWith('/index.html') && path === '');

                if (isCurrent) {
                    link.setAttribute('aria-current', 'page');
                    link.classList.add('is-active');
                } else {
                    link.removeAttribute('aria-current');
                    link.classList.remove('is-active');
                }
            } catch {
                /* href relativo non valido per URL(): ignora */
            }
        });
    }
});