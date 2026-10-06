# J Crafts | Prestige Tailoring House

A responsive tailoring management app built with HTML, CSS, and vanilla JavaScript. No package install or build step is required.

## Run

Open `index.html` in a modern browser. The app saves customers, orders, measurements, payments, settings, and uploaded photos in that browser's local storage. Data is local to the browser profile and is not synced; use **Settings → Download backup** to keep a JSON copy.

## Project structure

- `index.html` contains the navigation, dashboard, customer/order/payment/measurement/gallery/settings views, and the forms and dialogs.
- `style.css` contains the visual system, responsive layouts, dark theme, modal states, and print-receipt rules.
- `script.js` owns local storage, customer and order records, payments, search, sorting, reminders, image compression, exports, and UI event handling.
- `assets/` is reserved for optional static brand assets. Uploaded customer and gallery photos are compressed and stored in browser local storage instead.

## Notes

Order IDs are generated as `JCH-0001` and increment automatically. The app creates customer records when an order is saved and updates a matching customer when their phone number is reused. Customer/order/payment data, gallery images, and settings can be exported and restored from Settings. Clearing browser data also removes the app's local records, so keep backups for important information.
