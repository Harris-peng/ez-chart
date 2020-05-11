import * as utils from './utils'
import baseOptions from './options'
import processOption from './process-option'
import merge from 'lodash/merge'
import get from 'lodash/get'
class EzChart {
  constructor (options = {}) {
    this.options = options
  }
  getOption (options) {
    this.checkOptions(options)
    if (utils.isDefType(this.type)) {
      const option = EzChart.getBaseOption(this.type)
      const data = EzChart.getData(this.keyMap, this.data)
      return EzChart.processOption(option, data, this.type)
    } else if (utils.isCustomType(this.type)) {
      return EzChart.options.customCharts[this.type].apply(this, [this.options])
    }
  }
  checkOptions (options = {}) {
    Object.assign(this.options, options)
    utils.checkOptions(this.options)
    this.setOption()
  }
  setOption () {
    const {type, data, keyMap, params = {}} = this.options
    this.type = type
    this.data = data
    this.keyMap = keyMap
    this.params = params
  }
  static
  getBaseOption (type) {
    const option = merge(baseOptions[type](), get(EzChart, 'options.baseOptions', {}))
    return option
  }
  static
  getData (keyMap = [], list = []) {
    const data = utils.getParamsArray(keyMap, list)
    return data
  }
  static
  processOption (data, option, type) {
    return processOption[type](data, option)
  }
  static
  extend ({customCharts: {}, baseOptions = {}} = options) {
    EzChart.options = options
  }
  static utils = utils
}

export default EzChart
