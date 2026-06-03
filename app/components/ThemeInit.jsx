import Script from "next/script";

import { CLASS_DARK, CLASS_LIGHT, THEME_DARK, THEME_STORAGE_KEY } from "@/lib/theme";

const boot = `
(function () {
  var root = document.documentElement;
  var dark = "${CLASS_DARK}";
  var light = "${CLASS_LIGHT}";
  var key = "${THEME_STORAGE_KEY}";
  var stored = null;
  try { stored = localStorage.getItem(key); } catch (e) {}
  var cls = light;
  if (stored === "${THEME_DARK}") cls = dark;
  root.classList.remove(dark, light);
  root.classList.add(cls);
})();
`;

export default function ThemeInit() {
  return (
    <Script id="theme-init" strategy="beforeInteractive">
      {boot}
    </Script>
  );
}
