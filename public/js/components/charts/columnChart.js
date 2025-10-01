'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ColumnChart = (function (_React$Component) {
    _inherits(ColumnChart, _React$Component);

    function ColumnChart(props) {
        _classCallCheck(this, ColumnChart);

        _get(Object.getPrototypeOf(ColumnChart.prototype), 'constructor', this).call(this, props);
        this.state = {
            options: {
                chart: {
                    type: 'bar',
                    height: 350
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                xaxis: {
                    categories: props.labels,
                    tickAmount: 10,
                    labels: {
                        rotate: 0,
                        trim: false
                    }
                },
                yaxis: {
                    title: {
                        text: props.series.name
                    }
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function formatter(val) {
                            return " " + val + " ";
                        }
                    }
                }
            },
            /*series: [{
                name: 'series1',
                data: [31, 40, 28, 51, 42, 109, 100],
                type: "column",
            }]*/
            series: props.series
        };
    }

    _createClass(ColumnChart, [{
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'render',
        value: function render() {
            if (!this.state.series) {
                return;
            }
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { id: this.props.id },
                    React.createElement(ReactApexChart, { options: this.state.options, series: this.state.series, type: 'bar', height: '350' })
                ),
                React.createElement('div', { id: "html-dist-" + this.props.id })
            );
        }
    }]);

    return ColumnChart;
})(React.Component);