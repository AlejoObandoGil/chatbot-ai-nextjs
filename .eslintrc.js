module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "next",
        'plugin:@next/next/recommended',
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-hooks",
        "jsx-a11y",
        "import",
        "prettier"
    ],
    "rules": {
        "react/no-unescaped-entities": "off",
        // "prettier/prettier": ["error"],
        // "no-unused-vars": "warn",
        // "no-console": "warn",
        // "react/self-closing-comp": "warn",
        // "react/react-in-jsx-scope": "off"
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    }
}
