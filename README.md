# HR Digital Agency Website

## Files
- 10 HTML pages (`index`, `about`, `services`, `portfolio`, `pricing`, `process`, `testimonials`, `blog`, `faq`, `contact`) + `404.html`
- `style.css` — all styling (class names match the HTML)
- `script.js` — mobile menu, scroll reveal, FAQ accordion, active nav link, demo form handling
- `favicon.svg`, `robots.txt`, `sitemap.xml`

## Run locally
Open `index.html` in a modern browser, or serve the folder:

    python3 -m http.server 8000   # then open http://localhost:8000

## Before publishing
Replace brand name, email, WhatsApp number, portfolio placeholders, testimonial placeholders and pricing. The contact/newsletter forms currently show an in-page demo message; connect them to Formspree, EmailJS, PHP, Firebase, or your hosting backend (see the TODO in `script.js`). Make sure the domain in `sitemap.xml` / `robots.txt` matches your real domain.
