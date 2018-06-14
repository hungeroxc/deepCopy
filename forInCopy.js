function deepClone(obj) {
    if(!isObject(obj)) {
        throw new Error('obj不是一个对象')
    }
    let isArray = Array.isArray(obj)
    let cloneObj = isArray ? [] : {}
    /** 
     * @desc 取出对象中所有的值，判断如果还是对象，那么继续取出里面所有的值进行拷贝
    */
    for(let key in obj) {
        cloneObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
    }
    return cloneObj
}

/** 
 * 问题在于
*/
