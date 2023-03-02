
import { observe } from "./observe/index"
export function initState(vm){
    const opts = vm.$options

    if(opts.data){
        initData(vm)
    }
    
}

function initData(vm){
    let data = vm.$options.data
    data = typeof data === 'function'?data.call(vm):data

    vm._data = data
    // 对数据进行劫持
    observe(data)
    // 做代理
    for (let key in vm._data) {
        proxy(vm, '_data', key)
    }
}

export function proxy(target, sourceKey, key){

   Object.defineProperty(target,key,{
    get(){
        return target[sourceKey][key]
    },
    set(newVal){
        target[sourceKey][key] = newVal
    }
   })

}