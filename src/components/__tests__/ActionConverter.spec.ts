import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ActionConverter from '../ActionConverter.vue'

describe('ActionConverter', () => {
  it('renders properly', () => {
    const wrapper = mount(ActionConverter, { props: {} })
    expect(wrapper.html()).toContain('Raw Code')
  })
})
