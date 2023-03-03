/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './src/**/*.{html,js}',
    './node_modules/tw-elements/dist/js/**/*.js',
    // 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      boxShadow: {
        'b-3': '0 0 3px 3px rgba(0,0,0,0.1)',
      },
      height: {
        "100vh": '100vh',
      }
    },
  },
  plugins: [
    // require('flowbite/plugin')
  ]
}