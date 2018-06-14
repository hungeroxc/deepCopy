

const obj = {
    arr: [111, 222],
    obj: {key: '对象'},
    a: () => {console.log('函数')},
    date: new Date(),
    reg: new RegExp(/正则/ig)
}


function isObj(obj) {
    return (typeof obj === 'object' || typeof obj === 'function') && obj !== null
}

function deepCopy(obj, hash = new WeakMap()) {
    if (hash.has(obj)) return hash.get(obj)

    let isArray = Array.isArray(obj)
    // 初始化拷贝对象
    let cloneObj = isArray ? [] : {}
    // 哈希表设值
    hash.set(obj, cloneObj)
    // 获取源对象所有属性描述符
    let allDesc = Object.getOwnPropertyDescriptors(obj)
    // 获取源对象所有的 Symbol 类型键
    let symKeys = Object.getOwnPropertySymbols(obj)
    // 拷贝 Symbol 类型键对应的属性
    if (symKeys.length > 0) {
        symKeys.forEach(symKey => {
            cloneObj[symKey] = isObj(obj[symKey]) ? deepCopy(obj[symKey], hash) : obj[symKey]
        })
    }

    // 拷贝不可枚举属性,因为 allDesc 的 value 是浅拷贝，所以要放在前面
    cloneObj = Object.create(
        Object.getPrototypeOf(cloneObj),
        allDesc
    )
    // 拷贝可枚举属性（包括原型链上的）
    for (let key in obj) {
        cloneObj[key] = isObj(obj[key]) ? deepCopy(obj[key], hash) : obj[key];
    }

    return cloneObj
}

function cloneDeep(obj) {
    let family = {}
    let parent = Object.getPrototypeOf(obj)

    while (parent != null) {
        family = completeAssign(deepCopy(family), parent)
        parent = Object.getPrototypeOf(parent)
    }
    function completeAssign(target, ...sources) {
        sources.forEach(source => {
            let descriptors = Object.keys(source).reduce((descriptors, key) => {
                descriptors[key] = Object.getOwnPropertyDescriptor(source, key)
                return descriptors
            }, {})

            // Object.assign 默认也会拷贝可枚举的Symbols
            Object.getOwnPropertySymbols(source).forEach(sym => {
                let descriptor = Object.getOwnPropertyDescriptor(source, sym)
                if (descriptor.enumerable) {
                    descriptors[sym] = descriptor
                }
            })
            Object.defineProperties(target, descriptors)
        })
        return target
    }

    return completeAssign(deepCopy(obj), family)
}

// let result = deepCopy(obj)

// console.log(result)

// for (let key in result) {
//         console.log(`${key}相同吗？ `, result[key] === obj[key])
// }
