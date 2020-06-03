import * as utils from './utils'
import baseOptions from './options'
import processOption from './process-option'
import lodash from 'lodash'
class EzChart {
  constructor (options = {}) {
    this.options = options
  }
  getOption (options) {
    this.checkOptions(options)
    if (utils.isDefType(this.type)) {
      const option = this.getBaseOption(this.type)
      const data = this.getData(this.keyMap, this.data)
      return this.processOption(option, data, this.type)
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
  getBaseOption (type) {
    // 合并默认参数和初始化参数
    const options = lodash.merge(baseOptions[type](), lodash.get(EzChart, 'options.echartsOption', {}))
    lodash.merge(options, this.params.options || {})
    return options
  }
  getData (keyMap = [], list = []) {
    return utils.getParamsArray(keyMap, list)
  }
  processOption (data, option, type) {
    return processOption[type](data, option)
  }
  static
  extend (options = {customCharts: {}, echartsOption: {}}) {
    EzChart.options = options
  }
  static utils = utils
}

export default EzChart
