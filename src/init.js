import {
    initState
} from './state'
export function initMixin(Vue) {
    Vue.prototype._init = function(options){
        // vm 就是vue
        const vm = this
        // 把vm option挂在$options上
        vm.$options = options
        // 初始化vm
        initState(vm)
        
    }

}