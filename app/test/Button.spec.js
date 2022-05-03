import {  shallowMount } from '@vue/test-utils'

import Button from '@/components/Button.vue'


describe('Button', () => {
  let wrapper;

  const defaultYellow = 'yellow-400'

  jest.mock('@fortawesome/vue-fontawesome')
  beforeEach( () => {
    wrapper = shallowMount(Button, {
      stubs: ['font-awesome-icon']
    })
  })

  it('should render correctly', () => {
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('shows background as black, arrow as yellow', () => {
    const button = wrapper.find('button')
    expect(button.classes()).toContain('bg-black')
    expect(button.classes()).toContain('text-white')
    expect(button.find('font-awesome-icon-stub').classes()).toContain(`text-${defaultYellow}`)
  })

  it('shows background as black, arrow as defined', () => {
    const arrowColor = 'red-500'
    wrapper = shallowMount(Button, {
      stubs: ['font-awesome-icon'],
      propsData: { arrowColor }
      
    })
    const button = wrapper.find('button')
    expect(button.classes()).toContain('bg-black')
    expect(button.classes()).toContain('text-white')
    expect(button.find('font-awesome-icon-stub').classes()).toContain(`text-${arrowColor}`)
  })

  it('shows background as yellow, arrow as black', () => {
     wrapper = shallowMount(Button, {
      stubs: ['font-awesome-icon'],
      propsData: { bgColor: defaultYellow  }
    })
    const button = wrapper.find('button')
    expect(button.classes()).toContain(`bg-${defaultYellow}`)
    expect(button.classes()).toContain('text-black')
    expect(button.find('font-awesome-icon-stub').classes()).toContain("text-black")
  })

  it('shows background as white, arrow as black', () => {
    wrapper = shallowMount(Button, {
      stubs: ['font-awesome-icon'],
      propsData: { bgColor: 'white'  }
    })
    const button = wrapper.find('button')
    expect(button.classes()).toContain('bg-white')
    expect(button.classes()).toContain('text-black')
    expect(button.find('font-awesome-icon-stub').classes()).toContain("text-black")
  })

})
