import * as utils from './utils'
import baseOptions from './echarts-options'
import processOption from './process-option'
class EzChart {
  constructor (options) {
    utils.checkOptions(options)
    this.type = options.type
    this.data = options.data
    this.keyMap = options.keyMap
    this.params = utils._get('options.params', {})
  }
  getOption () {
    if (utils.isDefType(this.type)) {
      const option = EzChart.getBaseOption(this.type)
      const data = EzChart.getData(this.keyMap, this.data)
      return EzChart.processOption(option, data)
    } else if (utils.isCustomType(this.type)) {
      return this.customCharts[this.type].apply(this)
    }
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
