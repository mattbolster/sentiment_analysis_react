/** @type {import('tailwindcss').Config} */
module.exports = {
  /*./src/ specifies base dir where the source files are. The double asterix
  means to search recursively through all subdirectories within src. The file extensions
  given in the brackets tell tailwind to include any files with the afornmentioned file extensions */
  content: ["./src/**/*.{js, jsx, ts, tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

