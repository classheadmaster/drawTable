import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import element from 'element-ui'
import eletable from '@/components/element-table'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Router)
Vue.use(element)
Vue.use(element, { size: 'small', zIndex: 3000 })

export default new Router({
    routes: [{
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld
    }, {
        path: '/table',
        name: 'table',
        component: eletable
    }]
})