
// import { Button }  from '../Button.vue'
export default {
    title: 'Button',
    argTypes: {
        bgColor: {
            control: 'text',
            defaultValue: 'black'
        },
        color: {
            control: 'text',
            defaultValue: ''
        },
        arrowColor: {
            control: 'text',
            defaultValue: ''
        },
        buttonText: {
            control: 'text',
            defaultValue: 'Awesome Button'
        }
    }

  }

export const DefaultButton = (args, { argTypes }) => ({
    template: `<Button bgColor="${args.bgColor}" color="${args.color}" arrowColor="${args.arrowColor}">${args.buttonText}</Button>`
})

export const ButtonLight = () =>
'<div class="bg-black"><Button bgColor="white">Light Button</Button></div>'
// const Template = (args) => ({
// // 👈 Your template goes here
// });
    
