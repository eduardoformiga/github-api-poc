import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Home from '@/pages/Home.vue'
import store from './store'

describe('Home.vue', () => {
  const localVue = createLocalVue()
  localVue.component('font-awesome-icon', {})

  const propsData = {
    userInput: '',
    itens: [],
    errorHandler: null
  }

  it('Render component when mount', () => {
    const wrapper = shallowMount(Home, {
      localVue,
      store,
      propsData
    })
    expect(wrapper.isVueInstance()).to.equal(true)
  })

  it('userInput should be empty when mount', () => {
    const wrapper = shallowMount(Home, {
      localVue,
      store,
      propsData
    })
    expect(wrapper.vm.userInput).to.equal('')
  })

  it('itens should be empty array when mount', () => {
    const wrapper = shallowMount(Home, {
      localVue,
      store,
      propsData
    })
    expect(wrapper.vm.itens).to.have.lengthOf(0)
  })

  //TODO should show repos when search user and trigger repos button
  //TODO should show starred when search user and trigger starred button
  //TODO should show user card when search user and trigger starred or repos button
  //TODO should show errors section when exception was thrown
  //TODO should redirect to details page when click on user card
})
