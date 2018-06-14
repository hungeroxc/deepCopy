
const obj = {
    num: 0,
    str: '',
    boolean: true,
    unf: undefined,
    nul: null,
    syb: Symbol('我是一个symbol'),
    obj: {
        name: '我是一个对象',
        id: 1,
        c: {aa: 1}
    },
    arr: [0, 1, 2],
    func() {
        console.log('我是一个函数')
    },
    date: new Date(0),
    reg: new RegExp('/我是一个正则/'),
    err: new Error('我是一个错误')
}


function isObject(obj) {
    return (typeof obj === 'object' || typeof obj === 'function') && obj !== null
}

function deepClone(obj) {
    if(!isObject(obj)) {
        throw new Error('obj不是一个对象')
    }
    let isArray = Array.isArray(obj)
    let cloneObj = isArray ? [] : {}
    for(let key in obj) {
        cloneObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
    }
    return cloneObj
}

let result = deepClone(obj)
