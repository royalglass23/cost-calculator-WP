# RG Estimate Calculator — WordPress Plugin

A React/Vite single-page app delivered as a WordPress plugin shortcode. Customers complete a 7-step visual wizard describing their frameless glass balustrade or pool fence project and receive an instant indicative price range.

---

## How it works

1. WordPress page with `[rg_calculator]` shortcode loads the plugin
2. Plugin enqueues `rg-calculator.js` + `rg-calculator.css` and injects the REST endpoint URL via `wp_localize_script`
3. React app mounts on `#rg-calculator-root`, runs the wizard entirely client-side
4. On submit, pricing is calculated in the browser then posted to `POST /wp-json/royal-glass/v1/leads`
5. WordPress saves the lead to `wp_rg_leads`, emails staff, returns `{ ok: true, leadId: N }`
6. Customer sees their estimate range

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

Edit `src/lib/calculator/calculator.config.ts` — this is the only file that contains pricing. All values are in NZD, excluding GST. After editing, run `npm run build` and redeploy.

---

## Deploying to WordPress

### First-time install

1. `npm run build`
2. Copy build output into the plugin:
   ```
   cp dist/rg-calculator.js  wordpress-plugin/rg-calculator/assets/
   cp dist/rg-calculator.css wordpress-plugin/rg-calculator/assets/
   cp dist/*.jpg             wordpress-plugin/rg-calculator/assets/
   ```
3. Zip the plugin (PowerShell):
   ```powershell
   Compress-Archive -Path wordpress-plugin\rg-calculator -DestinationPath wordpress-plugin\rg-calculator.zip -Force
   ```
4. WordPress Admin → Plugins → Add New → Upload Plugin → `rg-calculator.zip` → Install → Activate
5. Create a page: title `Get an Instant Estimate`, slug `estimate`, content `[rg_calculator]`, full-width template, Publish
6. If the REST API returns 404: Settings → Permalinks → Post name → Save

### Subsequent deploys (JS/CSS updates only)

1. `npm run build`
2. Copy `dist/rg-calculator.js` and `dist/rg-calculator.css` to `wp-content/plugins/rg-calculator/assets/` via cPanel File Manager
3. No plugin reactivation needed

---

## Plugin structure

```
wordpress-plugin/rg-calculator/
├── rg-calculator.php        # Bootstrap, shortcode, asset enqueue
├── assets/
│   ├── rg-calculator.js     # Built React app (copy from dist/ after build)
│   └── rg-calculator.css    # Built styles (copy from dist/ after build)
└── includes/
    ├── database.php          # wp_rg_leads table + CRUD helpers
    ├── validation.php        # Input validation, sanitization, rate limiting
    ├── email.php             # wp_mail() notification to admin
    ├── api.php               # REST route handlers
    └── admin-page.php        # "RG Leads" admin menu page
```

---

## Lead management

Submitted leads appear under **RG Leads** in the WordPress admin. Statuses: `NEW` → `REVIEWED` → `ACCEPTED` or `REJECTED`. Rejected leads are kept in the database — they are never deleted.

---

## What's intentionally not in V1

- ServiceM8 integration (deferred — requires admin approval before job creation)
- n8n automation (reserved for post-approval workflow)
- Lead detail view with accept/reject buttons in admin UI
