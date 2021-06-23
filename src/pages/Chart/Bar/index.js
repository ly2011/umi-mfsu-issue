import React, { Component } from 'react'
import { Row, Col, Spin } from 'antd'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'

// import ReactEcharts from 'echarts-for-react'
import isEqual from 'lodash/isEqual'
import PageHeaderWrapper from 'components/PageHeaderWrapper'
import { saleChartOption, customerChartOption } from './config'

const generateColItemGrid = () => {
  const xs = 24
  const sm = 24
  const md = 12
  const lg = 12
  const xl = 12
  const xxl = 12
  return {
    xs,
    sm,
    md,
    lg,
    xl,
    xxl
  }
}

const chartStyle = { height: 225, width: '100%' }

const saleData = {
  yearTarget: 1700,
  yearComplete: 298.2,
  quarterTarget: 800,
  quarterComplete: 288.2,
  monthTarget: 500,
  monthComplete: 287.2,
  userName: '刘亦菲',
  month: 1585581405438
}
const customerData = {
  month: '2020-03',
  thisMonthCustomer: 51,
  totalCompleteVisit: 30,
  totalCustomer: 52,
  totalPlanVisit: 138,
  userName: '关晓彤',
  visitRate: 21.74
}
class Bar extends Component {
  state = {
    saleLoading: false,
    customerLoading: true,
    sale: {},
    customer: {}
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState)
  }

  componentDidMount () {
    this.getAllData()
  }

  getAllData = () => {
    this.setState({
      saleLoading: true,
      customerLoading: true
    })
    setTimeout(() => {
      this.setState({
        saleLoading: false,
        customerLoading: false,
        sale: { ...saleData, month: Date.now() },
        customer: { ...customerData, month: Date.now() }
      })
    }, 1000)
  }

  getSaleChartOption = () => {
    const options = saleChartOption(this.state.sale)
    return options
  }

  getCustomerChartOption = () => {
    const options = customerChartOption(this.state.customer)
    return options
  }

  getOption = () => ({
    title: {
      text: '某站点用户访问来源',
      subtext: '纯属虚构',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          { value: 335, name: '直接访问' },
          { value: 310, name: '邮件营销' },
          { value: 234, name: '联盟广告' },
          { value: 135, name: '视频广告' },
          { value: 1548, name: '搜索引擎' }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  })

  render () {
    const colGrid = generateColItemGrid()
    const { saleLoading, customerLoading } = this.state

    return (
      <PageHeaderWrapper title="Bar图表展示">
        <Row type="flex" gutter={[8, 8]}>
          <Col {...colGrid}>
            <Spin spinning={saleLoading}>
              <ReactEchartsCore echarts={echarts} option={this.getSaleChartOption()} theme="light" style={chartStyle} />
            </Spin>
          </Col>
          <Col {...colGrid}>
            <Spin spinning={customerLoading}>
              <ReactEchartsCore echarts={echarts} option={this.getCustomerChartOption()} theme="light" style={chartStyle} />
            </Spin>
          </Col>
          <Col {...colGrid}>
            <ReactEchartsCore echarts={echarts} option={this.getOption()} theme="light" style={chartStyle} />
          </Col>
        </Row>
      </PageHeaderWrapper>
    )
  }
}

export default Bar
