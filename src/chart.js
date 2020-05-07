import * as utils from './utils'
import baseOptions from './options'
import processOption from './process-option'
class EzChart {
  constructor (options = {}) {
    this.options = options
  }
  getOption (options) {
    this.checkOptions(options)
    if (utils.isDefType(this.type)) {
      const option = EzChart.getBaseOption(this.type)
      const data = EzChart.getData(this.keyMap, this.data)
      return EzChart.processOption(option, data)
    } else if (utils.isCustomType(this.type)) {
      return this.customCharts[this.type].apply(this, [this.options])
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
    let option = {}
    if (baseOptions[type]) option = baseOptions[type]()
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
  extendCustomChart (customCharts) {
    this.customCharts = customCharts
  }
  static utils = utils
}

utils.getCustomTypes = utils.getCustomTypes.bind(EzChart)

export default EzChart
