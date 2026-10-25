# Arsh Abbas | Portfolio

A 3D, scroll-driven portfolio. `index.html` is the whole frontend. `api/contact.js` is the backend that emails you when someone uses the contact form.

## Put it online (free)

1. **GitHub:** create a repository and upload everything in this folder (keep `api/contact.js` inside the `api` folder).
2. **Resend (email sending):** sign up at resend.com with **arshabbas.edu@gmail.com**, then create an API key. On the free plan the default sender can deliver to your own signup email, which is exactly what this form needs.
3. **Vercel (hosting):** sign in at vercel.com with GitHub, click Add New > Project, import the repository, then open Settings > Environment Variables and add `RESEND_API_KEY` with your key. Deploy.
4. **Test:** open your `something.vercel.app` link, send a message through the form, and check your inbox.

Until the backend is set up (or if it ever fails), the form falls back to opening the visitor's email app, so no message is lost.

## Custom domain (optional)

Buy a domain such as arshabbas.com from any registrar, then in Vercel go to Settings > Domains, add it, and follow the DNS records Vercel shows.

## Things to personalise

- **Photo:** already included in `index.html` (About section). To change it, replace the `<img src="data:...">` inside `<div class="ph" id="ph">` with your new image; `photo.webp` is a copy of the processed portrait.
- **Projects:** edit the four `.pc` cards. Cards marked "Next up" are placeholders until you build them.
- **Resume:** replace `Arsh_Abbas_Resume.pdf` whenever you update it.
- **Lab experience:** add your real role, dates and tasks in the Journey and Resume sections.
