module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: {
          'AYZD-PURPLE': '#7B61FF',
          'gray': {
            100: '#F3F4F6',
            300: '#D1D5DB',
            400: '#7E7E7E',
            500: '#5E5E5E',
            600: '#424242',
            700: '#303030',
            800: '#1D1D1D',
            900: '#090909'
          },
          'dark-red': '#BD2150',
          'green': '#20E77B',
          'yellow': '#D3B23D',
          'calendar-button': '#6366F1',
        },
      },
      spacing: {
        4.5: '18px',
        15: '60px',
        18: '4.5rem',
        41: '164px'
      },
      fontSize: {
        'xxs': ['8px', '12px']
      },
      fontFamily: {
        'inter': "'Inter', sans-serif"
      },
      backgroundImage: theme => ({
        'base': "linear-gradient(101.57deg, #A129FF 0%, #7B61FF 100%)",
        'secondary': "linear-gradient(101.57deg, #10B981 0%, #1EAEFF 100%)"
      }),
      boxShadow: {
        'footer': '0px 4px 27px 18px rgba(0, 0, 0, 0.6)'
      },
      zIndex: {
        '-1': '-1',
        100: '100',
        1000: '1000'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('@tailwindcss/line-clamp'),
  ],
}
