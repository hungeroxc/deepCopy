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
