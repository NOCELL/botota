module.exports = {
    "env": {
      "es6": true,
      "node": true,
      "mocha": true
    },
    "parserOptions": {
      "ecmaVersion": 6
    },
    "extends": "eslint:recommended",
    "plugins": [
      "mocha"
    ],
    "rules": {
      "indent": [
        "error", 2
      ],
      "linebreak-style": [
        "error", "unix"
      ],
      "quotes": [
        "error", "single"
      ],
      "no-console": ["error", { allow: ["warn", "error"] }],
      "semi": ["error", "never"],
      "mocha/no-exclusive-tests": "error"
    }
  }