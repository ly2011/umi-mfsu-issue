import { formatDate } from 'utils/time'

const cardPaddingBase = '5px'
const titleTextStyleColor = 'rgba(0, 0, 0, 0.85)'
const titleTextStyleOption = {
  rich: {
    a: {
      color: titleTextStyleColor,
      fontSize: 13,
      fontWeight: 500,
      lineHeight: 19.5
    }
  }
}
const subTitleTextStyleOption = {
  rich: {
    b: {
      // width: 60,
      color: titleTextStyleColor,
      lineHeight: 18,
      align: 'right'
    }
  }
}
const tooltipOption = {
  show: false
}
const gridOption = {
  left: `${cardPaddingBase.replace('px', '') / 2}px`,
  right: '0%',
  bottom: `${cardPaddingBase.replace('px', '') / 2}px`,
  containLabel: true
}
const xAxisOption = {
  axisLine: {
    show: false,
    lineStyle: {
      width: 1,
      color: '#e8e8e8',
      type: 'solid',
      shadowBlur: 0
    }
  },
  axisTick: {
    show: true,
    alignWithLabel: true
  },
  axisLabel: {
    interval: 0,
    color: titleTextStyleColor
    // margin: 18
  },
  type: 'category'
}
const yAxisOption = {
  show: true,
  axisLine: {
    show: false
  },
  axisTick: {
    show: false,
    alignWithLabel: true
  },
  splitLine: {
    show: true,
    lineStyle: {
      width: 1,
      color: '#e8e8e8',
      type: 'dashed',
      shadowBlur: 0
    }
  },
  axisLabel: {
    interval: 0,
    color: titleTextStyleColor
  }
}
export const saleChartOption = data => {
  // eslint-disable-next-line
  const { yearTarget, yearComplete, quarterTarget, quarterComplete, monthTarget, monthComplete, userName, month } = data

  return {
    title: [
      {
        padding: 4,
        text: '{a|销售目标达成情况}',
        top: 0,
        shadowBlur: 0,
        textStyle: titleTextStyleOption
      },
      {
        top: -10,
        right: 4,
        shadowBlur: 0,
        subtext: `{b|月度：}{b|${formatDate(month, 'YYYY-MM')}}`,
        subtextStyle: subTitleTextStyleOption
      }
      // {
      //   top: 8,
      //   right: 4,
      //   shadowBlur: 0,
      //   subtext: `{b|责任人：}{b|${userName || ''}}`,
      //   subtextStyle: subTitleTextStyleOption
      // }
    ],
    color: ['rgba(24, 144, 255, 0.85)', '#FCCE10'],
    tooltip: tooltipOption,
    legend: {
      left: 'center',
      data: ['销售目标', '目标达成']
    },
    grid: gridOption,
    // xAxis: [
    //   {
    //     ...xAxisOption,
    //     data: ['年度目标', '季度目标', '月度目标']
    //   }
    // ],
    // yAxis: yAxisOption,
    series: [
      {
        name: '年度目标',
        type: 'pie',
        center: ['30%', '50%'],
        label: {
          position: 'inside',
          formatter (param) {
            const { data: dataValue } = param || {}
            return dataValue ? `${dataValue.name || ''}：${dataValue.value} 万元` : ''
          }
        },
        data: [
          { name: '销售目标', value: yearTarget },
          { name: '目标达成', value: yearComplete }
        ]
      },
      {
        name: '季度目标',
        type: 'pie',
        center: ['70%', '50%'],
        label: {
          position: 'inside',
          formatter (param) {
            const { data: dataValue } = param || {}
            return dataValue ? `${dataValue.name || ''}：${dataValue.value} 万元` : ''
          }
        },
        data: [
          { name: '销售目标', value: quarterTarget },
          { name: '目标达成', value: quarterComplete }
        ]
      }
    ]
    //   series: [
    //     {
    //       name: '销售目标',
    //       type: 'bar',
    //       barWidth: '15%',
    //       label: {
    //         show: true,
    //         position: 'top'
    //       },
    //       // stack: 'targe',
    //       data: [yearTarget, quarterTarget, monthTarget]
    //     },
    //     {
    //       name: '目标达成',
    //       type: 'bar',
    //       barWidth: '15%',
    //       label: {
    //         show: true,
    //         position: 'top'
    //       },
    //       // stack: 'targe',
    //       data: [yearComplete, quarterComplete, monthComplete]
    //     }
    //   ]
  }
}

export const customerChartOption = data => {
  // eslint-disable-next-line
  const { userName, month, totalCustomer, thisMonthCustomer, totalCompleteVisit, visitRate } = data
  return {
    title: [
      {
        padding: 4,
        text: '{a|客户触点}',
        top: 0,
        textStyle: titleTextStyleOption
      },
      {
        top: -10,
        right: 4,
        subtext: `{b|月度：}{b|${month || ''}}`,
        subtextStyle: subTitleTextStyleOption
      }
      // {
      //   top: 8,
      //   right: 4,
      //   subtext: `{b|责任人：}{b|${userName || ''}}`,
      //   subtextStyle: subTitleTextStyleOption
      // }
    ],
    color: ['rgba(24, 144, 255, 0.85)'],
    tooltip: tooltipOption,
    grid: gridOption,
    xAxis: [
      {
        ...xAxisOption,
        data: ['负责客户总数', '本月开发客户数', '本月拜访客户次数', '拜访及时率']
      }
    ],
    yAxis: yAxisOption,
    series: [
      {
        type: 'bar',
        barWidth: '20%',
        label: {
          show: true,
          position: 'top',
          formatter (param) {
            const { data: dataValue, dataIndex } = param || {}
            if (dataIndex !== 3) {
              return dataValue
            }
            return dataValue ? `${dataValue}%` : dataValue
          }
        },
        data: [totalCustomer, thisMonthCustomer, totalCompleteVisit, visitRate]
      }
    ]
  }
}
