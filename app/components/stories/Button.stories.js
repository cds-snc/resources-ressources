export default {
  title: 'Button',
  argTypes: {
    bgColor: {
      control: 'text',
      defaultValue: 'black',
    },
    color: {
      control: 'text',
      defaultValue: '',
    },
    arrowColor: {
      control: 'text',
      defaultValue: '',
    },
    buttonText: {
      control: 'text',
      defaultValue: 'Awesome Button',
    },
  },
}

export const DefaultButton = (args) => ({
  template: `<Button bgColor="${args.bgColor}" color="${args.color}" arrowColor="${args.arrowColor}">${args.buttonText}</Button>`,
})

export const ButtonWhite = (args) =>
  `<div class="bg-black p-5"><Button bgColor="${args.bgColor}" color="${args.color}" arrowColor="${args.arrowColor}">${args.buttonText}</Button></div>`

ButtonWhite.args = {
  buttonText: 'White Button',
  bgColor: 'white',
}

export const ButtonYellow = (args) =>
  `<div class="bg-black p-5"><Button bgColor="${args.bgColor}" color="${args.color}" arrowColor="${args.arrowColor}">${args.buttonText}</Button></div>`

ButtonYellow.args = {
  buttonText: 'Yellow Button',
  bgColor: 'yellow-400',
}
