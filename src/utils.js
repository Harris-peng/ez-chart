import {needOptionsKeys} from './constant'
import echartsOptions from './echarts-options'
import get from 'lodash/get'
const types = Object.keys(echartsOptions)

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
export let getCustomTypes = function () {
  return Object.keys(this.customCharts)
}
export const _get = get
