# RG Cost Calculator — WordPress Plugin

A React/Vite single-page app delivered as a WordPress plugin shortcode. Customers complete a 7-step visual wizard describing their frameless glass balustrade or pool fence project, submit their contact details, and receive an instant indicative price range.

Current version: **2.1.0**

---

## How it works

1. A WordPress page with `[rg_calculator]` shortcode loads the plugin
2. Plugin enqueues `rg-calculator.js` + `rg-calculator.css` and injects the REST config via `window.rgCalculatorConfig`
3. React app mounts on `#rg-calculator-root` and runs the 7-step wizard client-side
4. On step 7, pricing is calculated in the browser
5. Customer fills in contact details (step 9 — lead capture)
6. On submit, lead is posted to `POST /wp-json/royal-glass/v1/leads`
7. WordPress saves to `wp_rg_leads`, schedules admin email asynchronously, returns `{ ok: true, leadId: N }`
8. Customer sees their price estimate with an optional amber bar listing any items to confirm at site visit
9. Customer can click "Get this estimate in your inbox" to receive the full HTML estimate email

---

## Development

```bash
npm install
npm run dev      # dev server at localhost:5173
npm run build    # produces dist/rg-calculator.js and dist/rg-calculator.css
npm run lint
```

---

## Changing prices

Edit `src/lib/calculator/config.ts` — this is the only file that contains pricing. All values are in NZD, excluding GST. After editing, run `npm run build` and redeploy.

---

## Deploying to WordPress

### Build and package

```bash
npm run build
cp dist/rg-calculator.js  wordpress-plugin/rg-calculator/assets/
cp dist/rg-calculator.css wordpress-plugin/rg-calculator/assets/
```

```powershell
Compress-Archive -Path wordpress-plugin\rg-calculator -DestinationPath wordpress-plugin\rg-calculator.zip -Force
```

> Do NOT copy `dist/*.jpg` — images are not built by Vite. They live permanently in the assets folder.

### First-time install

1. Build and package (above)
2. WordPress Admin > Plugins > Add New > Upload Plugin > `rg-calculator.zip` > Install > Activate
3. Create a page: title `Get an Instant Estimate`, slug `estimate`, content `[rg_calculator]`, full-width template, Publish
4. If the REST API returns 404: Settings > Permalinks > Post name > Save

### Subsequent deploys (JS/CSS only)

Upload `dist/rg-calculator.js` and `dist/rg-calculator.css` to `wp-content/plugins/rg-calculator/assets/` via cPanel or SFTP. No plugin reactivation needed. To deploy PHP changes, re-upload the full ZIP.

### wp-config.php constants

```php
define('RG_GOOGLE_MAPS_KEY',   'AIza...');
define('RG_TURNSTILE_SITE_KEY','0x...');
define('RG_TURNSTILE_SECRET',  '0x...');
define('RG_LEAD_NOTIFY_EMAIL', 'roxy@royalglass.co.nz');
```

Turnstile only activates when both keys are set. Google Maps only activates when the key is set.

---

## Plugin structure

```
wordpress-plugin/rg-calculator/
├── rg-calculator.php           # Bootstrap, shortcode, asset enqueue, SEO schema
├── assets/
│   ├── rg-calculator.js        # Built React app (copy from dist/ after build)
│   ├── rg-calculator.css       # Built styles (copy from dist/ after build)
│   └── *.jpg                   # Wizard option images (permanent — do not overwrite)
└── includes/
    ├── database.php            # wp_rg_leads table schema + CRUD helpers
    ├── validation.php          # Input validation, sanitization
    ├── api.php                 # REST route handlers (leads + estimate-email)
    ├── email.php               # Admin notification + customer HTML estimate email
    ├── admin-pricing.php       # WP admin: edit pricing values
    └── admin-leads.php         # WP admin: view submitted leads
```

---

## Lead management

Submitted leads appear under **RG Leads** in the WordPress admin.

**Status flow:** `NEW` -> `REVIEWED` -> `ACCEPTED` or `REJECTED`

---

## Bot protection

| Layer | Detail |
|---|---|
| Time gate | Rejects submissions under 3 seconds |
| Honeypot | Hidden `website_url` field — bots fill it, humans don't |
| Cloudflare Turnstile | Invisible CAPTCHA — only active when both keys are configured |
| Rate limit | 10 lead submissions / 5 estimate emails per IP per hour; admin bypass |

---

## Email behaviour

- **Admin notification** — sent automatically on every new lead (plain text)
- **Customer estimate email** — sent only when the customer clicks "Get this estimate in your inbox"; always contains the real price range; includes an amber bar if any items need confirming at site visit
- Both emails send asynchronously — no user-facing delay

---

## What is intentionally not in this version

- ServiceM8 integration (deferred)
- n8n automation (reserved for post-approval workflow)
- Lead detail view with accept/reject buttons in admin UI
