'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PolarChart = (function (_React$Component) {
    _inherits(PolarChart, _React$Component);

    function PolarChart(props) {
        _classCallCheck(this, PolarChart);

        _get(Object.getPrototypeOf(PolarChart.prototype), 'constructor', this).call(this, props);

        this.state = {

            series: props.data.serie,
            options: {
                chart: {
                    type: 'polarArea'
                },
                colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8000', '#8000ff', '#0080ff'],
                labels: props.data.labels,
                /*legend: {
                    show: false,
                },*/
                legend: {
                    onItemClick: {
                        toggleDataSeries: false
                    }
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'left'
                        }
                    }
                }]
            }

        };
    }

    _createClass(PolarChart, [{
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
                    React.createElement(ReactApexChart, { options: this.state.options, series: this.state.series, type: 'polarArea', height: '200' })
                ),
                React.createElement('div', { id: "html-dist-" + this.props.id })
            );
        }
    }]);

    return PolarChart;
})(React.Component);

ReactDOM.render(React.createElement(PolarChart, null), document.getElementById('polarChart'));