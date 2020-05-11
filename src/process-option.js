import * as utils from './utils'
export default {
  line (options, datas, params) {
    const [label, ...values] = datas
    options.xAxis.data = label
    options.series = values.map(item => {
      return {
        data: item,
        type: 'line'
      }
    })
    return options
  },
  bar (options, datas, params = {names: []}) {
    const [label, ...values] = datas
    const { names = [] } = params
    options.xAxis.data = label
    options.series = values.map((item, index) => {
      return {
        name: names[index] || '',
        type: 'bar',
        barMaxWidth: '50',
        data: item
      }
    })
    return options
  },
  pie (options, datas, params) {
    const [label, values] = datas
    options.legend.data = label
    options.series.data = label.map((item, index) => {
      return {
        name: item,
        value: values[index]
      }
    })
    return options
  },
  scatter () {
    return {

    }
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
  treemap (options, datas, params) {
    options.series[0].data = datas
    return options
  },
  graph (options, datas, params) {
    return options
  },
  funnel (options, datas, params) {
    const [labels, ...values] = datas
    const names = params.names || []
    const width = utils.keepDecimals(80 / values.length)
    options.series = values.map((list, i) => {
      return {
        name: names[i] || '',
        type: 'funnel',
        left: '10%',
        top: 10,
        bottom: 10,
        width: `${width}%`,
        sort: params.sort || 'ascending',
        gap: 2,
        label: {
          show: true,
          position: 'right'
        },
        data: utils.setData(list, labels)
      }
    })
    return options
  }
}
