import ApexCharts from 'apexcharts/dist/apexcharts.common'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

window.ApexCharts = ApexCharts

export default class Charts extends Component {
  constructor (props) {
    super(props)
    if (React.createRef) {
      this.chartRef = React.createRef()
    } else {
      this.setRef = el => this.chartRef = el
    }
    this.chart = null
  }

  render () {
    const { ...props } = this.props
    return React.createElement('div', {
      ref: React.createRef
        ? this.chartRef
        : this.setRef,
      ...props
    })
  }

  componentDidMount () {
    const current = React.createRef ? this.chartRef.current : this.chartRef
    this.chart = new ApexCharts(current, this.getConfig())
    this.chart.render()
  }

  getConfig () {
    const { type, height, width, series, options } = this.props
    const newOptions = {
      chart: {
        type,
        height,
        width
      },
      series
    }

    return this.extend(options, newOptions)
  }

  isObject(item) {
    return (
      item && typeof item === 'object' && !Array.isArray(item) && item != null
    )
  }

  extend (target, source) {
    if (typeof Object.assign !== 'function') {
      (function () {
        Object.assign = function (target) {
          // We must check against these specific cases.
          if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object')
          }

          let output = Object(target)
          for (let index = 1; index < arguments.length; index++) {
            let source = arguments[index]
            if (source !== undefined && source !== null) {
              for (let nextKey in source) {
                if (source.hasOwnProperty(nextKey)) {
                  output[nextKey] = source[nextKey]
                }
              }
            }
          }
          return output
        }
      })()
    }

    let output = Object.assign({}, target)
    if (this.isObject(target) && this.isObject(source)) {
      Object.keys(source).forEach((key) => {
        if (this.isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, {
              [key]: source[key]
            })
          } else {
            output[key] = this.extend(target[key], source[key])
          }
        } else {
          Object.assign(output, {
            [key]: source[key]
          })
        }
      })
    }
    return output
  }

  componentDidUpdate (prevProps) {
    if (!this.chart) return null
    const { options, series } = this.props
    const prevOptions = JSON.stringify(prevProps.options)
    const prevSeries = JSON.stringify(prevProps.series)
    const currentOptions = JSON.stringify(options)
    const currentSeries = JSON.stringify(series)

    if (prevOptions !== currentOptions || prevSeries !== currentSeries) {
      if (prevSeries === currentSeries) {
        // series is not changed,but options are changed
        this.chart.updateOptions(this.getConfig())
      } else if (prevOptions === currentOptions) {
        // options are not changed, just the series is changed
        this.chart.updateSeries(series)
      } else {
        // both might be changed
        this.chart.updateOptions(this.getConfig())
      }
    }
  }

  componentWillUnmount () {
    if (this.chart && typeof this.chart.destroy === 'function') this.chart.destroy()
  }
}

Charts.propTypes = {
  type: PropTypes.string.isRequired,
  width: PropTypes.any,
  height: PropTypes.any,
  series: PropTypes.array.isRequired,
  options: PropTypes.object.isRequired
}

Charts.defaultProps = {
  type: 'line',
  width: '100%',
  height: 'auto'
}

var ReactApexChart=function(t,e,r){"use strict";t=t&&t.hasOwnProperty("default")?t.default:t;var i="default"in e?e.default:e;r=r&&r.hasOwnProperty("default")?r.default:r;var s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(t[i]=r[i])}return t};window.ApexCharts=t;class n extends e.Component{constructor(t){super(t),i.createRef?this.chartRef=i.createRef():this.setRef=(t=>this.chartRef=t),this.chart=null}render(){const t=function(t,e){var r={};for(var i in t)e.indexOf(i)>=0||Object.prototype.hasOwnProperty.call(t,i)&&(r[i]=t[i]);return r}(this.props,[]);return i.createElement("div",s({ref:i.createRef?this.chartRef:this.setRef},t))}componentDidMount(){const e=i.createRef?this.chartRef.current:this.chartRef;this.chart=new t(e,this.getConfig()),this.chart.render()}getConfig(){const{type:t,height:e,width:r,series:i,options:s}=this.props,n={chart:{type:t,height:e,width:r},series:i};return this.extend(s,n)}isObject(t){return t&&"object"==typeof t&&!Array.isArray(t)&&null!=t}extend(t,e){"function"!=typeof Object.assign&&(Object.assign=function(t){if(void 0===t||null===t)throw new TypeError("Cannot convert undefined or null to object");let e=Object(t);for(let t=1;t<arguments.length;t++){let r=arguments[t];if(void 0!==r&&null!==r)for(let t in r)r.hasOwnProperty(t)&&(e[t]=r[t])}return e});let r=Object.assign({},t);return this.isObject(t)&&this.isObject(e)&&Object.keys(e).forEach(i=>{this.isObject(e[i])&&i in t?r[i]=this.extend(t[i],e[i]):Object.assign(r,{[i]:e[i]})}),r}componentDidUpdate(t){if(!this.chart)return null;const{options:e,series:r,height:i,width:s}=this.props,n=JSON.stringify(t.options),h=JSON.stringify(t.series),o=JSON.stringify(e),a=JSON.stringify(r);n===o&&h===a&&i===t.height&&s===t.width||(h===a?this.chart.updateOptions(this.getConfig()):n===o&&i===t.height&&s===t.width?this.chart.updateSeries(r):this.chart.updateOptions(this.getConfig()))}componentWillUnmount(){this.chart&&"function"==typeof this.chart.destroy&&this.chart.destroy()}}return n.propTypes={type:r.string.isRequired,width:r.any,height:r.any,series:r.array.isRequired,options:r.object.isRequired},n.defaultProps={type:"line",width:"100%",height:"auto"},n}(ApexCharts,React,PropTypes);
