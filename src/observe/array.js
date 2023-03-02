let oldArrayProto = Array.prototype

export let newArrayProto = Object.create(oldArrayProto)

const methods = ['push','pop','unshift','shift','splice','sort','reverse']


methods.forEach(method =>{
    newArrayProto[method] = function(...args){
        const result = oldArrayProto[method].call(this,...args)

        let inserted
        console.log(this)
        let ob = this.__ob__
        switch(method){
            case 'push':
            case 'pop':
                inserted = args
            case 'splice':
                inserted = args.slice(2)
            default:
                break
        }

        if(inserted){
            // 有增加的参数
            ob.observeArray(inserted)
        }

        return result
    }

})