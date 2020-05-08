export default {
  line () {
    return {
      tooltip: {
        show: true,
        trigger: 'axis'
      },
      grid: {
        left: '2%',
        top: '10%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: []
      },
      yAxis: {
        type: 'value'
      },
      series: []
    };
  },
  bar () {
    return {
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '2%',
        top: '10%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: [],
        axisTick: {
          alignWithLabel: true
        }
      },
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: []
    };
  },
  pie () {
    return {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        type: 'scroll',
        orient: 'horizontal',
        left: 'center',
        top: 'bottom',
        data: []
      },
      series: {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {show: false},
        data: []
      }
    };
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
  treemap () {
    return {
      series: [{
        type: 'treemap',
        roam: false,
        data: []
      }]
    };
  },
  gauge () {
    return {
      tooltip: {
        formatter: '{b} : {c}%'
      },
      series: []
    };
  },
  funnel () {
    return {
      title: {},
      tooltip: {
        trigger: 'item'
      },
      toolbox: {
        feature: {
          dataView: {readOnly: false},
          restore: {},
          saveAsImage: {}
        }
      },
      series: []
    };
  },
  graph () {
    return {
      series: []
    };
  }
}
