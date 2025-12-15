import { Workbox } from "workbox-window";

let wb: Workbox | undefined;

export function registerServiceWorker(): void {
  if ("serviceWorker" in navigator) {
    wb = new Workbox("/sw.js");

    wb.addEventListener("installed", (event) => {
      if (event.isUpdate) {
        console.log("New content available, please refresh.");

        if (confirm("New version available! Click OK to update.")) {
          window.location.reload();
        }
      } else {
        console.log("Content cached for offline use.");
      }
    });

    wb.addEventListener("activated", (event) => {
      if (!event.isUpdate) {
        console.log("Service Worker activated for the first time!");
      }
    });

    wb.register()
      .then(() => {
        console.log("Service Worker registered successfully.");
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  }
}

export function unregisterServiceWorker(): Promise<boolean> {
  if ("serviceWorker" in navigator) {
    return navigator.serviceWorker.ready
      .then((registration) => registration.unregister())
      .catch((error) => {
        console.error("Service Worker unregistration failed:", error);
        return false;
      });
  }
  return Promise.resolve(false);
}

export function checkForUpdates(): void {
  if (wb) {
    wb.update();
  }
}
