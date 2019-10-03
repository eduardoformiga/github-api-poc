import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Home from '@/pages/Home.vue'
import store from './store'
import VueRouter from 'vue-router'

describe('Home.vue', () => {
  const localVue = createLocalVue()
  localVue.component('font-awesome-icon', {})

  localVue.use(VueRouter)
  const router = new VueRouter()

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

  it('userInput should be an empty string when mount', () => {
    const wrapper = shallowMount(Home, {
      localVue,
      store,
      propsData
    })
    expect(wrapper.vm.userInput)
      .to.be.a('string')
      .that.is.equal('')
  })

  it('itens should be an empty array when mount', () => {
    const wrapper = shallowMount(Home, {
      localVue,
      store,
      propsData
    })
    expect(wrapper.vm.itens)
      .to.be.an('array')
      .that.have.lengthOf(0)
  })

  it('should show repos when search user and trigger repos button', async () => {
    const wrapper = shallowMount(Home, {
      localVue,
      store,
      propsData
    })
    await wrapper.vm.loadRepos()

    expect(wrapper.vm.itens)
      .to.be.an('array')
      .that.have.to.have.lengthOf.at.least(1)
  })

  it('should show starred when search user and trigger starred button', async () => {
    const wrapper = shallowMount(Home, {
      localVue,
      store,
      propsData
    })
    await wrapper.vm.loadStarred()

    expect(wrapper.vm.itens)
      .to.be.an('array')
      .that.have.to.have.lengthOf.at.least(1)
  })

  it('should show user card when search user and trigger starred or repos button', async () => {
    const wrapper = shallowMount(Home, {
      localVue,
      store,
      propsData
    })
    await wrapper.vm.loadRepos()

    expect(wrapper.vm.user)
      .to.be.an('object')
      .that.to.have.property('login', 'eduardoformiga')
  })

  it('should redirect to details page when click on user card', async () => {
    const wrapper = shallowMount(Home, {
      localVue,
      store,
      router,
      propsData
    })
    await wrapper.vm.redirectDetailsPage()

    expect(wrapper.vm.$route.path).to.equal('/details')
  })

  it('should show errors section when exception was thrown', async () => {
    const wrapper = shallowMount(Home, {
      localVue,
      store,
      propsData
    })

    const searchUser = () => {
      throw new Error()
    }
    wrapper.setMethods({ searchUser })

    await wrapper.vm.loadRepos()

    expect(wrapper.vm.errorHandler).to.be.an('object')
  })
})
