
module.exports = {
  "root": true,
  extends: [
    "eslint:recommended",
    "airbnb",
    "next",
    "next/core-web-vitals",
    "prettier",
  ],
  rules: {
    "no-unused-vars": "error",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".tsx"] }],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
   ]
  },

};
