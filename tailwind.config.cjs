module.exports = {
  purge: {
    content: [
      "./src/**/*.html",
      "./src/**/*.svelte"
    ],
    options: {
      keyframes: true,
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        current: "currentColor",
        transparent: "transparent",
        white: "#fff",
        black: "#000",
        teal: {
          50: "#edfafa",
          100: "#d5f5f6",
          200: "#afecef",
          300: "#7edce2",
          400: "#16bdca",
          500: "#0694a2",
          600: "#047481",
          700: "#036672",
          800: "#05505c",
          900: "#014451",
        },
      },
      boxShadow: {
        teal: '0 4px 14px 0 rgba(126, 220, 226, 0.45)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
