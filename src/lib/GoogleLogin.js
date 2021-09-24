export const loadGoogleScript = () => {
  // Loads the Google JavaScript Library
  (function () {
    const id = 'google-js';
    const src = 'https://apis.google.com/js/platform.js'; // (Ref. 1)

    // We have at least one script (React)
    const firstJs = document.getElementsByTagName('script')[0]; // (Ref. 2)

    // Prevent script from loading twice
    if (document.getElementById(id)) {
      return;
    } // (Ref. 3)
    const js = document.createElement('script'); // (Ref. 4)
    js.id = id;
    js.src = src;
    js.onload = window.onGoogleScriptLoad; // (Ref. 5)
    firstJs.parentNode.insertBefore(js, firstJs);
  })();
};
