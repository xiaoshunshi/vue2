
import { newArrayProto } from './array'
class Observer{
    constructor(data){
        // 在data上挂载一个__ob__标识，表明已经被劫持过了
        Object.defineProperty(data,'__ob__',{
            value:this,
            enumerable:false
        })
        if(Array.isArray(data)){
            data.__proto__ = newArrayProto
            this.observeArray(data)
        }else{
            this.walk(data)
        }

    }
    walk(data){
        Object.keys(data).forEach(key => defineReactive(data,key,data[key]))
    }
    observeArray(data){
        // 对数组的每一项进行观察
        data.forEach(item =>observe(item))

    }

}

export function defineReactive(target,key,value){
    // 继续循环value值，知道这个value是普通数据类型
    observe(value)

    Object.defineProperty(target,key,{
        get(){
            console.log('取值')
            return value
        },
        set(newVal){
            console.log('set')
            if(value === newVal) return
            value = newVal
        }
    })
}

export function observe(data){
    if(typeof data !== 'object' || data === null){
        return
    }
    if(data.__ob__ instanceof Observer){
        // 如果data上有__ob__,说明已经被劫持过了，不用再劫持
        return data.__ob__ 
    }
    return new Observer(data)
}