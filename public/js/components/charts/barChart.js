'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BarChart = (function (_React$Component) {
    _inherits(BarChart, _React$Component);

    function BarChart(props) {
        _classCallCheck(this, BarChart);

        _get(Object.getPrototypeOf(BarChart.prototype), 'constructor', this).call(this, props);

        this.state = {
            options: {
                chart: {
                    events: {
                        click: function click(chart, w, e) {
                            //console.log(chart, w, e)
                        }
                    },
                    id: props.id
                },
                colors: props.colors,
                plotOptions: {
                    bar: {
                        columnWidth: '45%',
                        distributed: true
                    }
                },
                dataLabels: {
                    enabled: false
                },
                xaxis: {
                    //categories: ['BRT', 'Joe', 'Jake', 'Amber', 'Peter', 'Mary', 'David', 'Lily'],
                    categories: props.data ? props.data.titles : [],
                    labels: {
                        style: {
                            colors: props.colors,
                            fontSize: '14px'
                        }
                    }
                }
            },
            series: [{
                //data: props.data ? props.data.values : [10, 20, 30, 80, 70, 60, 50, 40]
                data: props.data ? props.data.values : []
            }]
        };

        this.update = this.update.bind(this);
    }

    _createClass(BarChart, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            //console.log(props);
            if (props.data) {
                if (props.data.titles != this.state.options.xaxis.categories || props.data.values != this.state.series[0].data) {
                    var options = this.state.options;
                    options.xaxis.categories = props.data.titles;
                    var series = this.state.series;
                    series[0].data = props.data.values;
                    this.setState({ options: options, series: series });

                    ApexCharts.exec(this.props.id, 'updateSeries', series);
                    ApexCharts.exec(this.props.id, 'updateOptions', options);
                }
            }
        }
    }, {
        key: 'update',
        value: function update() {
            //let series = this.state.series;
            //series[0].data = [10, 200, 30, Math.floor(Math.random() * (90 - 50 + 1)) + 50, 70, 60, 50, Math.floor(Math.random() * (90 - 50 + 1)) + 50];
            ApexCharts.exec(this.props.id, 'updateSeries', [{
                data: [40, 55, 65, 11, 23, 44, 54, 33]
            }]);
            var options = this.state.options;
            options.xaxis.categories = ['aaa', 'sss', 'ddd', 'fff', 'ggg', 'hhh', 'jjj', 'kkk', 'lll'];
            ApexCharts.exec(this.props.id, 'updateOptions', options);
            //this.setState({series: series});
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

    return BarChart;
})(React.Component);