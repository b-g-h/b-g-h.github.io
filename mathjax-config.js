MathJax.Hub.Config({
  extensions: ["tex2jax.js", "[a11y]/accessibility-menu.js", "AssistiveMML.js"],
  jax: ["input/TeX", "output/SVG"],
  menuSettings: {
    collapsible: false,
    autocollapse: false,
    explorer: false
  },
  tex2jax: {
    inlineMath: [ ['$','$'], ["\\(","\\)"] ],
    displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
    processEscapes: true
  },

  sre: {
    locale: 'de'
  },

  "SVG": {
    internalSpeechTitles: true,
    font: "STIX-Web",
    scale:  150,
    blacker: 5,
   }
});
