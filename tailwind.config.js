const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
    darkMode: 'class',
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {},
    },
    plugins: [],
});
