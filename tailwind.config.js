const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
    darkMode: 'class',
    content: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'deep-midnight-blue': '#0a0a23',
                'royal-blue': '#4169E1',
                lavender: '#E6E6FA',
                'medium-orchid': '#BA55D3',
                'neon-cyan': '#00FFFF'
            }
        }
    },
    plugins: []
});
