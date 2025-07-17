/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        noerifu_regular: ['noerifu-regular', 'sans-serif'], // 'yourfont'がTailwindのクラス名になります
        SanariFontB002: ['SanariFontB002', 'sans-serif'],
      },},
  },
  plugins: [
  ],
}

