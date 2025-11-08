// Mobile menu toggle
const mobileBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
        const expanded = mobileBtn.getAttribute('aria-expanded') === 'true';
        mobileBtn.setAttribute('aria-expanded', (!expanded).toString());
        navLinks.classList.toggle('show');
    });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const id = a.getAttribute('href').slice(1);
        const el = document.getElementById(id);
        if (el) {
            e.preventDefault();
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (navLinks && navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                mobileBtn && mobileBtn.setAttribute('aria-expanded', 'false');
            }
        }
    });
});

/* ===== NAV: sticky shadow + scroll-spy (robusto) ===== */
(() => {
    const run = () => {
        // 1) Trova l'header in modo tollerante
        const header =
            document.querySelector('.site-header') ||
            document.querySelector('header');

        if (!header || !('classList' in header)) {
            // niente header -> esco senza errori
            return;
        }

        // 2) Ombra sticky
        const onScroll = () => {
            header.classList.toggle('is-stuck', window.scrollY > 6);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        // 3) Scroll-spy
        const sections = document.querySelectorAll('main section[id]');
        const links = Array.from(
            document.querySelectorAll('.site-header .nav a[href^="#"]')
        );
        const byId = (id) => links.find((a) => a.getAttribute('href') === `#${id}`);

        const spy = () => {
            let current = null;
            sections.forEach((sec) => {
                const rect = sec.getBoundingClientRect();
                const offsetTop = rect.top + window.scrollY - 120; // offset header
                if (window.scrollY >= offsetTop && window.scrollY < offsetTop + sec.offsetHeight) {
                    current = sec.id;
                }
            });
            links.forEach((a) => a.classList.remove('is-active'));
            const link = current ? byId(current) : null;
            if (link && link.classList) link.classList.add('is-active');
        };

        spy();
        window.addEventListener('scroll', spy, { passive: true });
    };

    // 4) Avvia solo quando il DOM è pronto (fallback se manca defer)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else {
        run();
    }
})();