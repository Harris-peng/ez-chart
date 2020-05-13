import * as utils from './utils'
import set from 'lodash/set'
// line bar
const processLineBar = (option, data, params = {names: []}, type) => {
  const [labels, ...values] = data
  const { names = [] } = params
  if (names.length > 0) {
    set(option, 'legend.data', names)
  }
  set(option, 'xAxis.data', labels)
  option.series = values.map((item, index) => {
    const otherSeries = utils.getSeries(option, index)
    return {
      name: names[index] || '',
      data: item,
      type,
      ...otherSeries
    }
  })
  return option
}
const processPieFunnel = (option, data, params = {names: []}, type) => {
  const [labels = [], ...values] = data
  const { names = [] } = params
  set(option, 'legend.data', labels)
  option.series = values.map((value, index) => {
    const otherSeries = utils.getSeries(option, index)
    return {
      name: names[index] || '',
      data: labels.map((label, index) => {
        return {
          name: label,
          value: value[index]
        }
      }),
      type,
      ...otherSeries
    }
  })
  return option
}
export default {
  line (option, data, params) {
    const LINE = 'line'
    return processLineBar(option, data, params, LINE)
  },
  bar (option, data, params) {
    const BAR = 'bar'
    return processLineBar(option, data, params, BAR)
  },
  pie (option, data, params) {
    const PIE = 'pie'
    return processPieFunnel(option, data, params, PIE)
  },
  scatter (option, data, params = {names: []}) {
    const { names = [] } = params
    option.series = data.map((item, i) => {
      const otherSeries = utils.getSeries(option, i)
      return {
        name: names[i] || '',
        data: item,
        type: 'scatter',
        ...otherSeries
      }
    })
    return option
  },
  effectScatter () {
    return {

    }
  },
  radar () {
    return {

    }
  },
  tree () {
    return {

    }
  },
  treemap (option, data, params) {
    option.series[0].data = data
    return option
  },
  graph (option, data, params) {
    return option
  },
  funnel (option, data, params) {
    const FUNNEL = 'funnel'
    return processPieFunnel(option, data, params, FUNNEL)
  }
}
