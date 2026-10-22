# Viva Motors

A responsive static dealership website for Viva Motors Ltd, based on the vehicle details and photos supplied for the project.

## Preview locally

From this folder, start a simple web server:

```powershell
py -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080).

The site has no package or build dependencies. It is ready to publish as a static site once the GitHub repository has its first commit. In GitHub, open **Settings → Pages** and choose deployment from the `main` branch and `/ (root)`.

## Hero film

- The opening hero uses the supplied 5.2-second showroom clip at `assets/video/car-dealership-hero.mp4`.
- It plays once, muted, and can be replayed or paused with the on-screen film control. Visitors who prefer reduced motion see the poster until they choose to play it.
- Replace the MP4 to update the hero film. The poster uses the GLC photo at `assets/vehicles/mercedes-glc-250-2017/01.jpg`.

## Updating vehicles and photos

- Vehicle names, prices, listed specifications, features, search data and WhatsApp enquiry text are in `app.js`.
- Vehicle photos are in `assets/vehicles/<vehicle-slug>/`. The numbered images are shown in the details gallery; the cover image number is set by `coverIndex` in `app.js`.
- Replace or remove listing details there when the stock changes. Unprovided mileage and specifications are left unspecified.
- The Facebook reference screenshot showed the page name but not its direct URL. The current Facebook link opens a search for “Viva Motors Ltd Kiambu”; replace that anchor in `index.html` if the exact page URL is available.

## Contact links

The site uses the supplied WhatsApp number, Kiambu Road location, Instagram handle and TikTok profile. WhatsApp enquiries open with a vehicle-specific message; no form collects customer documents or personal information.
