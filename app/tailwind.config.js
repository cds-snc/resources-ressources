module.exports = {
  content: ['./utils/richTextRenderOptions.js'],

  variants: {
    backgroundColor: ['hover', 'active'],
    textColor: ['hover', 'active'],
    extend: {
      transform: ['group-hover'],
      scale: ['group-hover'],
      translate: ['group-hover'],
    },
  },

  theme: {
    extend: {
      colors: {
        'cds-yellow': '#ffcc33', // CDS yellow,
        'cds-blue': '#004986',
      },
    },
    fontFamily: {
      logo: ['"Oswald"'],
    },
    minWidth: {
      '1/3': '33%',
      '1/4': '25%',
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
}
