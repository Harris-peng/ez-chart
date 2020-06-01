import cloneDeep from 'lodash/cloneDeep'
const tooltip = {
  trigger: 'axis'
}
const legend = {
  orient: 'vertical',
  left: 'left',
  data: []
}
const xAxis = {
  type: 'category',
  data: []
}
const yAxis = {
  type: 'value'
}
const grid = {
  left: '2%',
  top: '10%',
  right: '4%',
  bottom: '3%',
  containLabel: true
}
const series = []
export default {
  ...['line', 'bar', 'scatter'].reduce((acc, curr) => {
    acc[curr] = () => {
      return {
        tooltip: cloneDeep(tooltip),
        legend: cloneDeep(legend),
        grid: cloneDeep(grid),
        xAxis: cloneDeep(xAxis),
        yAxis: cloneDeep(yAxis),
        series
      }
    }
    return acc
  }, {}),
  pie () {
    return {
      tooltip: {
        trigger: 'item'
      },
      legend: cloneDeep(legend),
      series: [{
        radius: ['40%', '70%'],
        label: {show: false},
        data: []
      }]
    }
  },
  scatter () {
    return {
      tooltip: {
        trigger: 'item'
      },
      xAxis: {},
      yAxis: {},
      series: [{
        symbolSize: 20
      }]
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
  treemap () {
    return {
      series: [{
        type: 'treemap',
        roam: false,
        data: []
      }]
    }
  },
  gauge () {
    return {
      tooltip: {
        formatter: '{b} : {c}%'
      },
      series: []
    }
  },
  funnel () {
    return {
      tooltip: {
        trigger: 'item'
      },
      legend: cloneDeep(legend),
      toolbox: {
        feature: {
          dataView: {readOnly: false},
          restore: {},
          saveAsImage: {}
        }
      },
      series: [{
        left: '10%',
        top: 10,
        bottom: 10,
        sort: 'ascending',
        gap: 2
      }]
    }
  },
  graph () {
    return {
      series: []
    }
  }
}
