/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
    colors: {
      primary: '#EFD3AC',
      secondary: '#C75268',
      black: '#000000',
      white: '#ffffff',
      'dark-primary': '#FACD7A',
      'dark-secondary': '#902335',
      'base-background': '#f5f5f4',
      danger: '#dc2626',
      info: '#2563eb',
      success: '#16a34a',
      'gray-600': '#4b5563',
      'gray-300': '#d1d5db',
    },
  },
  plugins: [],
}
