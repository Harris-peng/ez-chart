import {needOptionsKeys, UNIT_LIST} from './constant'
import baseOptions from './options'
import EzChart from './chart'
import get from 'lodash/get'
const types = Object.keys(baseOptions)
export const checkOptions = (options) => {
  const message = []
  needOptionsKeys.forEach(key => {
    if (!options[key]) {
      message.push(`we must need ${key}`)
    }
  })
  if (message.length > 0) {
    throw new Error(message.join('\n'))
  }
  return true
}
/**
 * 从数组对象中获取给定参数的值得数组集合
 * @param params @type Array|String 需要收集的参数列表
 * @param list @type Array 源列表数据
 * @example
 * let params = ['id','name']
 * let list = [{id:1,name:'xiaoming',desc:'ceshi'},{id:2,name:'xiaozhang',desc:'ceshi2'}]
 * getParamsArray(params, list)
 * @returns [[1,2],['xiaoming','xiaozhang']]
 */
export const getParamsArray = (params = [], list = []) => {
  try {
    params = Array.isArray(params) ? params : [params]
    return list.reduce((a, b) => {
      return params.map((name, index) => {
        return (a[index] || []).concat(b[name] || [0])
      })
    }, [])
  } catch (err) {
    throw new Error(err)
  }
}
export const isDefType = (type) => {
  return types.includes(type)
}
export const isCustomType = (type) => {
  const customTypes = getCustomTypes()
  return customTypes.includes(type)
}
export const checkType = (type) => {
  return isDefType(type) || isCustomType(type)
}
export const setData = (list, labels) => {
  let res = []
  if (list && list.length) {
    res = list.map((value, j) => {
      return {value, name: labels[j]}
    })
  }
  return res
}
export const keepDecimals = (value, bit = 2) => {
  if (Number.isNaN(value)) {
    value = 0
    console.error('keepDecimals value = NAN')
  }
  if (typeof value !== 'number' || typeof bit !== 'number') {
    value = bit = 0
    console.error('keepDecimals参数不合法')
  }
  let num = Math.pow(10, bit)
  return Math.round(value * num) / num
}
/**
 * 指定一个数字列表，返回取整之后的新列表及单位
 * @param list
 * @param rate // 阈值达到该阈值的才取整
 * @returns {{unit: *, list: *}}
 * @formatUnit([0,1000,1500])
 * {
 *   list: [0 ,1, 1.5],
 *   unit: '千'
 * }
 */
export const formatNumbers = (list = [], rate = 4) => {
  let sortlist = list.sort((a, b) => a - b)
  let len = (sortlist.find(item => item) + '').length - 1
  if (list.length === 0 || len < rate) {
    return {
      list: list,
      unit: '',
      divisor: 1
    }
  }
  if (len > UNIT_LIST.length) len = UNIT_LIST.length
  if (len) {
    list = list.map(num => {
      return num / Math.pow(10, len)
    })
  }
  return {
    list: list,
    unit: UNIT_LIST[len],
    divisor: Math.pow(10, len)
  }
}
/**
 * 保留数字有效小数位
 * @param num
 * @param bit 保留位数
 * @returns {number|*}
 * keepDecimalPlaces(1000.0001111,2)
 * 1000.00011
 */
export const keepDecimalPlaces = (num, bit = 2) => {
  if (!num) return num
  const reg = new RegExp(`(\\d+\\.0*[1-9]{1,${bit}})(\\d*)`)
  return Number(String(num).replace(reg, '$`$1'))
}
export const getCustomTypes = function () {
  return Object.keys(get(EzChart, 'options.customCharts', {}))
}
