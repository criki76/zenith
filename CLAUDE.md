# CLAUDE.md — ASD Zenith

## Panoramica
- **Nome cliente:** ASD Zenith (Associazione Sportiva Dilettantistica)
- **Tipo sito:** Sito statico istituzionale — centro Pilates, Yoga e Functional Lady
- **URL produzione:** https://www.zenithasd.it/
- **Deploy:** non rilevato (no vercel.json, no .htaccess, no Netlify config)
- **Dominio:** zenithasd.it — riferimenti hardcoded nel codice (canonical, OG, sitemap, robots)
- **Ultimo aggiornamento (sitemap):** 2025-11-16

---

## Stack
- **HTML / CSS / JS** — vanilla puro, zero framework, zero librerie esterne
- **Font:** system stack (`system-ui, -apple-system, Segoe UI, Roboto…`) — nessun Google Fonts, nessun @font-face
- **Librerie esterne:** nessuna
- **CDN:** nessuno
- **API / Servizi:** nessuno (contatti solo via link WhatsApp e tel:)
- **PWA:** manifest.json presente, installabile su mobile
- **Build tool / package.json:** non presenti — nessun processo di build

---

## Struttura file

```
index.html                         → pagina principale (SPA-style, tutte le sezioni)
privacy/privacy-policy.html        → policy legale (noindex)
assets/css/styles.css              → foglio di stile unico
assets/js/app.js                   → script principale (caricato con defer)
assets/js/menu-mobile.js           → ⚠️ DUPLICATO di app.js — non caricato da nessuna pagina
manifest.json                      → PWA manifest
robots.txt                         → Allow: /, Sitemap: .../sitemap.xml
sitemap.xml                        → 2 URL (index + privacy)
assets/img/                        → tutte le immagini (vedi sezione Immagini)
assets/icons/                      → icone PWA (192, 512, maskable)
```

---

## Palette colori

Definita come CSS custom properties in `styles.css`:

| Token | Valore | Uso |
|-------|--------|-----|
| `--bg` | `#f5f7f6` | Sfondo base pagina |
| `--text` | `#0d0f0e` | Testo principale |
| `--muted` | `#5b6b66` | Testo secondario / label |
| `--brand` | `#1f6f66` | Verde brand primario |
| `--brand-600` | `#195a54` | Brand scuro (hover, accento) |
| `--brand-200` | `#a3c8c3` | Brand chiaro (sfondo pill, badge) |
| `--card` | `#ffffff` | Sfondo card |
| `--line` | `#e8ecea` | Bordi e divisori |
| `--radius` | `18px` | Border-radius standard |
| `--shadow` | `0 10px 30px rgba(0,0,0,.06)` | Ombra card |

Dark mode supportata via `@media (prefers-color-scheme: dark)`.

---

## Pagine e sezioni

### `index.html` — pagina principale

| ID / classe | Sezione | Contenuto |
|-------------|---------|-----------|
| `.hero.hero-cover` | Hero | H1, sottotitolo, CTA WhatsApp + tel, sfondo studio-1.webp, spirale animata |
| `#corsi` | Corsi | 3 card (Pilates, Yoga, Functional Lady) + gallery 4 foto studio |
| `#filosofia` | Filosofia | Testo filosofia + 4 fact-pill (es. gruppi piccoli, senza giudizi…) |
| `#team` | Istruttrici | 2 card istruttrice (Samantha, Chiara) con foto e bio |
| `#orari` | Orari | Dual mode: mobile cards + desktop table; Lu–Sa |
| `#faq` | FAQ | 6 domande con `<details>/<summary>` nativo |
| `#cta` | Call-to-action | Testo motivazionale + 2 CTA (WhatsApp, tel) |
| `#contatti` (footer) | Footer | 3 colonne: brand info, contatti (tel/WA/email/indirizzo), info utili + dati legali |

### `privacy/privacy-policy.html`

Pagina legale con `noindex`. 10 sottosezioni (Chi siamo, Dati raccolti, Finalità, Sicurezza, Cookie, Social, Modalità, Tempi, Diritti, Aggiornamenti).

---

## Form e contatti

**Nessun form HTML** nel sito. I contatti avvengono esclusivamente tramite:

- **WhatsApp:** `https://wa.me/393921201453?text=Ciao%20Zenith%2C%20vorrei%20informazioni%20sui%20corsi`
- **Telefono:** `tel:+393921201453`
- **Email:** `zenithasd.9@gmail.com` (solo in privacy policy, non come mailto nel sito)
- **Social:** Instagram `@zenith_asd`, Facebook (link generico — ⚠️ verificare se esiste pagina reale)

---

## Immagini

- **Formato:** WebP (gallery, team), JPG/JPEG (hero, foto istruttrice Samantha), PNG (logo, icone, OG), SVG (spirale vettoriale)
- **Cartella:** `assets/img/` (foto), `assets/icons/` (PWA icons)
- **Script ottimizzazione:** nessuno (no Sharp, no build process)
- **AVIF:** non utilizzato
- **`srcset`:** non utilizzato — immagini con `<img src>` singolo
- **Lazy loading:** presente su immagini gallery (`loading="lazy"`)
- **Dimensioni esplicite (`width`/`height`):** non rilevate nel markup

**Inventario immagini:**

| File | Formato | Uso |
|------|---------|-----|
| `studio-1.webp` | WebP | Hero background + OG image |
| `zona-attesa.webp` | WebP | Gallery |
| `spogliatoi.webp` | WebP | Gallery |
| `sala.webp` | WebP | Gallery |
| `samantha.jpg` | JPG | Istruttrice Samantha |
| `chiara.jpeg` | JPEG | Istruttrice Chiara (usata in HTML) |
| `chiara.jpg` | JPG | ⚠️ Duplicato chiara |
| `chiara_risultato.webp` | WebP | ⚠️ Terza versione chiara — non rilevata in HTML |
| `zenith-logo-clean.png` | PNG | Logo header |
| `zenith-spiral-icon.png` | PNG | Brand icon |
| `spirale2.png` | PNG | Spirale animata hero |
| `spirale.png` | PNG | ⚠️ Versione backup spirale |
| `spirale.svg` | SVG | ⚠️ Spirale vettoriale — non usata in HTML |
| `1.jpg` | JPG | ⚠️ Nome generico — non rilevata in HTML |
| `og-zenith.png` | PNG | Open Graph (non usata — OG image è studio-1.webp) |

---

## SEO

| Check | Stato | Note |
|-------|-------|------|
| `<title>` | ✅ | "Pilates · Yoga · Functional Lady a Forlì \| ASD Zenith" |
| `meta description` | ✅ | Presente e compilata con keyword locali |
| H1 con keyword | ✅ | "Pilates e Yoga a Forlì, zona Stadio" |
| Alt text immagini | ✅ | Tutti presenti; decorativi con `aria-hidden="true"` |
| Schema.org | ✅ | `SportsActivityLocation` con indirizzo, tel, sport, orari |
| Canonical | ✅ | URL assoluto corretto |
| Open Graph | ✅ | title, description, image, type — URL assoluti |
| `sitemap.xml` | ✅ | Presente — 2 URL (index + privacy) |
| `robots.txt` | ✅ | Allow: /, link a sitemap |
| Privacy `noindex` | ✅ | `<meta name="robots" content="noindex">` |

**Segnalazioni SEO:**
- `foundingDate` nello schema.org è `2025-11-06` — verificare se corretto o da aggiornare
- Facebook social link è generico (`https://www.facebook.com`) — potrebbe danneggiare la brand authority

---

## Checklist velocità

| Check | Stato | Note |
|-------|-------|------|
| Font self-hosted con @font-face swap | ✅ | Non applicabile — solo system fonts (zero latenza font) |
| CSS unico in produzione | ✅ | Un solo file `styles.css`, nessun @import esterno |
| AVIF+WebP con srcset | ❌ | WebP presenti ma senza srcset; AVIF non usato |
| Hero con `fetchpriority=high` e preload | ⚠️ | `<link rel="preload">` presente per `studio-1.webp`; manca `fetchpriority="high"` sull'`<img>` |
| Immagini con `loading="lazy"` | ✅ | Presente sulle gallery (non sulle above-the-fold — corretto) |
| Immagini con dimensioni esplicite (width/height) | ❌ | Nessuna immagine ha width/height nel markup — rischio CLS |
| JS con `defer` | ✅ | `app.js` caricato con `defer` |
| Niente jQuery o Bootstrap | ✅ | Zero dipendenze esterne |
| Nessun Google Fonts | ✅ | System fonts — zero round-trip DNS |

---

## TODO aperti

1. **⚠️ `menu-mobile.js` inutilizzato** — duplicato di `app.js`, non viene caricato da nessuna pagina. Può essere eliminato.
2. **⚠️ `srcset` mancante** — le immagini non usano `srcset` + `sizes`. Aggiungere versioni responsive per migliorare LCP su mobile.
3. **⚠️ AVIF non usato** — per massima compressione moderna aggiungere AVIF con fallback WebP via `<picture>`.
4. **⚠️ Dimensioni `width`/`height` mancanti** sulle immagini — rischio CLS (Cumulative Layout Shift).
5. **⚠️ `fetchpriority="high"` mancante** sull'immagine hero — aggiungere per ottimizzare LCP.
6. **⚠️ Immagini duplicate** — `chiara.jpg`, `chiara.jpeg`, `chiara_risultato.webp` (3 versioni); `spirale.png`, `spirale.svg`, `spirale2.png`; `1.jpg` e `og-zenith.png` inutilizzati — pulizia asset consigliata.
7. **⚠️ Facebook link generico** — `https://www.facebook.com` nel footer. Aggiornare con URL pagina reale o rimuovere.
8. **⚠️ Date future** — `foundingDate: 2025-11-06`, `lastmod` sitemap `2025-11-16`. Verificare se intenzionali o errori di configurazione.
9. **⚠️ Email solo in privacy policy** — `zenithasd.9@gmail.com` non è raggiungibile come link `mailto:` dal sito principale.

---

## Note tecniche

- **Architettura:** sito interamente statico, no backend, no CMS, no build tool. Modifiche dirette ai file HTML/CSS/JS.
- **`app.js` struttura:** tutto racchiuso in `DOMContentLoaded`. Gestisce: sticky header, nav mobile accessibile (ESC, click-outside, focus management), smooth scroll su link hash, evidenziazione link corrente, IntersectionObserver per sezioni attive.
- **Orari dual rendering:** la sezione `#orari` ha due implementazioni indipendenti — `.orari-mobile` (cards, visibile sotto 880px) e `.orari-desktop` (tabella, visibile sopra 900px). Se si aggiornano gli orari vanno aggiornati **entrambi**.
- **Contatti:** il sito non ha un form. Tutto il flusso di contatto passa per WhatsApp (`wa.me`) o telefono diretto. Non è configurato Resend, EmailJS o simili.
- **PWA:** manifest.json configurato correttamente. Il sito è installabile su Android/iOS come app standalone. Theme color `#1f6f66` allineato al brand.
- **Dark mode:** `styles.css` include un blocco `@media (prefers-color-scheme: dark)` — le variabili CSS vengono sovrascritte per il tema scuro.
- **Spirale animata:** `.hero-spiral` usa `@keyframes breathing` (12.6s, ease-in-out infinite) che scala e modifica l'opacità. La riduzione di movimento è rispettata con `@media (prefers-reduced-motion: reduce)`.
- **Skip-link accessibilità:** presente nell'index — `<a class="skip-link" href="#main">`.
- **Anno footer:** generato dinamicamente da JS inline (`document.getElementById('y').textContent = new Date().getFullYear()`).
- **Codice Fiscale:** `04821690403` (presente in privacy policy). Affiliazione: OPES Italia.
