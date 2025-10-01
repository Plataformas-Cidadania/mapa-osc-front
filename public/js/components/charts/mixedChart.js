// Import the formatLargeNumbers function from apexMixed.js
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function formatLargeNumbers(value) {
    if (!value && value !== 0) return null;
    var formattedValue = undefined;
    if (value >= 1e9) {
        formattedValue = (value / 1e9).toFixed(2) + ' B'; // Bilhões
    } else if (value >= 1e6) {
            formattedValue = (value / 1e6).toFixed(2) + ' M'; // Milhões
        } else if (value >= 1e3) {
                formattedValue = (value / 1e3).toFixed(2) + ' K'; // Milhares
            } else {
                    formattedValue = value.toString(); // Valor menor que mil
                }
    return formattedValue;
}

var MixedChart = (function (_React$Component) {
    _inherits(MixedChart, _React$Component);

    function MixedChart(props) {
        _classCallCheck(this, MixedChart);

        _get(Object.getPrototypeOf(MixedChart.prototype), 'constructor', this).call(this, props);
        console.log('MixedChart', props);
        this.state = {
            options: {
                chart: {
                    stacked: false,
                    id: props.id,
                    toolbar: {
                        tools: {
                            download: '<i class="fas fa-image chart-custom-icon"/>',
                            reset: '<i class="fas fa-undo-alt chart-custom-icon-reset"/>'
                        }
                    }
                },
                /*customIcons: [
                    {
                        icon: '<i class="fas fa-chart-line"/>',
                        index: 0,
                        title: '',
                        class: 'chart-custom-icon',
                        click: () => {
                            console.log('chart line');
                        }
                    },
                    {
                        icon: '<i class="fas fa-chart-bar"/>',
                        index: 0,
                        title: '',
                        class: 'chart-custom-icon',
                        click: () => {
                            console.log('chart bar');
                        }
                    },
                    {
                        icon: '<i class="fas fa-chart-area"/>',
                        index: 0,
                        title: '',
                        class: 'chart-custom-icon',
                        click: () => {
                            console.log('chart area');
                            this.state.typeChart = 'area';
                        }
                    }
                ]*/
                stroke: {
                    width: [2, 2, 5]
                },
                /*curve: 'smooth',*/
                plotOptions: {
                    bar: {
                        columnWidth: '50%'
                    }
                },

                fill: {
                    opacity: [0.85, 0.25, 1],
                    gradient: {
                        inverseColors: false,
                        shade: 'light',
                        type: "vertical",
                        opacityFrom: 0.85,
                        opacityTo: 0.55,
                        stops: [0, 100, 100, 100]
                    }
                },
                markers: {
                    size: 0
                },
                xaxis: {
                    type: 'number',
                    categories: props.labels,
                    tickAmount: 10,
                    labels: {
                        rotate: 0,
                        /*rotateAlways: true,
                        offsetX: 0,
                        offsetY: 10,*/
                        trim: false
                    }
                    //categories: ['01 Jan 2001', '02 Jan 2001', '03 Jan 2001', '04 Jan 2001', '05 Jan 2001', '05 Jan 2001'],
                },
                yaxis: [_extends({
                    labels: {
                        formatter: function formatter(value) {
                            return formatLargeNumbers(value);
                        }
                    }
                }, props.yaxis)],
                tooltip: {
                    shared: true,
                    intersect: false,
                    y: {
                        formatter: function formatter(y) {
                            if (typeof y !== "undefined") {
                                return formatLargeNumbers(y);
                            }
                            return y;
                        }
                    }
                }
            },
            /*series: [{
                name: 'series1',
                data: [31, 40, 28, 51, 42, 109, 100]
            }]*/
            series: this.formatSeriesData(props.series)
        };
    }

    _createClass(MixedChart, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            //console.log('aaaa');
        }
    }, {
        key: 'formatSeriesData',
        value: function formatSeriesData(series) {
            if (!series) return series;

            // Create a deep copy of the series to avoid modifying the original data
            return series.map(function (serie) {
                return _extends({}, serie, {
                    // Keep the original data for calculations but use formatted values for display
                    originalData: [].concat(_toConsumableArray(serie.data)),
                    // Format each data point
                    data: serie.data.map(function (value) {
                        return value;
                    })
                });
            });
        }
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
                    React.createElement(ReactApexChart, { options: this.state.options, series: this.state.series, type: 'line', height: '350' })
                ),
                React.createElement('div', { id: "html-dist-" + this.props.id })
            );
        }
    }]);

    return MixedChart;
})(React.Component);