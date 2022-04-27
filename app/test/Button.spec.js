import { mount } from '@vue/test-utils'
import Link from '@/components/Button.vue'

describe('Button', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Link)
    expect(wrapper.vm).toBeTruthy()
  })
})
