import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

export default <Partial<Config>>{
  content: [],
  cssPath: ['~/assets/css/tailwind.css', { injectPosition: "first" }],
  theme: {
    extend: {
      colors: {
        primary: colors.green
      }
    },
  },
  plugins: [],
}

