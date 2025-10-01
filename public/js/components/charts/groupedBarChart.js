'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GroupedBarChart = (function (_React$Component) {
    _inherits(GroupedBarChart, _React$Component);

    function GroupedBarChart(props) {
        _classCallCheck(this, GroupedBarChart);

        _get(Object.getPrototypeOf(GroupedBarChart.prototype), 'constructor', this).call(this, props);

        this.state = {
            options: {
                plotOptions: {
                    bar: {
                        horizontal: true,
                        dataLabels: {
                            position: 'top'
                        }
                    }
                },
                chart: {
                    stacked: false,
                    id: props.id
                },
                dataLabels: {
                    enabled: true,
                    offsetX: -6,
                    style: {
                        fontSize: '12px',
                        colors: ['#fff']
                    }
                },
                stroke: {
                    show: true,
                    width: 1,
                    colors: ['#fff']
                },

                xaxis: {
                    categories: props.labels
                }
            },
            series: []
        };
    }

    _createClass(GroupedBarChart, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {

            if (props.series) {
                if (props.series != this.state.series || props.labels != this.state.options.labels) {
                    var options = this.state.options;
                    options.xaxis.categories = props.labels;
                    this.setState({ series: props.series, options: options });
                    ApexCharts.exec(this.props.id, 'updateSeries', props.series);
                    ApexCharts.exec(this.props.id, 'updateOptions', options);
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {

            //console.log(this.state);
            //console.log(this);

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { id: 'chart' },
                    React.createElement(ReactApexChart, { options: this.state.options, series: this.state.series, type: 'bar', height: '350' })
                ),
                React.createElement('div', { id: 'html-dist' })
            );
        }
    }]);

    return GroupedBarChart;
})(React.Component);