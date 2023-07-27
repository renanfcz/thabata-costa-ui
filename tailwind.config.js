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
      primary: '#ef4444',
      'light-primary': '#fca5a5',
      'dark-primary': '#b91c1c',
      secondary: '#f97316',
      'light-secondary': '#fdba74',
      'dark-secondary': '#c2410c',
      black: '#000000',
      white: '#ffffff',
      'base-background': '#f5f5f4',
      danger: '#dc2626',
      info: '#2563eb',
      success: '#16a34a',
      warn: '#D18020',
      'gray-600': '#4b5563',
      'gray-400': '#9ca3af',
      'gray-300': '#d1d5db',
      'gray-200': '#e5e7eb',
      'gray-100': '#f3f4f6',
    },
  },
  plugins: [],
}
