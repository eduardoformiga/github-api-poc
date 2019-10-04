import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Details from '@/pages/Details.vue'
import { store, clearStore } from './store'
import VueRouter from 'vue-router'
import routes from './helpers/routes'

describe('Details.vue', () => {
  let localVue
  let router

  before(async () => {
    clearStore()
    store.dispatch('user/searchUser')

    localVue = createLocalVue()
    localVue.use(VueRouter)
    router = new VueRouter(routes)
  })

  it('should render component when mount', () => {
    const wrapper = shallowMount(Details, {
      localVue,
      store
    })
    expect(wrapper.isVueInstance()).to.equal(true)
  })

  it('should redirect to home page when click on router-link', () => {
    const wrapper = shallowMount(Details, {
      localVue,
      store,
      router
    })

    wrapper.find('.home-link').trigger('click')
    expect(wrapper.vm.$route.path).to.equal('/')
  })

  it('should load user data when mount', () => {
    const wrapper = shallowMount(Details, {
      localVue,
      store
    })
    expect(wrapper.vm.user)
      .to.be.an('object')
      .that.to.have.property('login', 'eduardoformiga')
  })
})
