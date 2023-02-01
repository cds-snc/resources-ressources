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
    /* margin: {
      '5': '20px'
    } */
  },
}
