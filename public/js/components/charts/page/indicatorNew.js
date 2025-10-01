'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndicatorNew = (function (_React$Component) {
    _inherits(IndicatorNew, _React$Component);

    function IndicatorNew(props) {
        _classCallCheck(this, IndicatorNew);

        _get(Object.getPrototypeOf(IndicatorNew.prototype), 'constructor', this).call(this, props);
        this.state = {
            data: []
        };
        this.load = this.load.bind(this);
        this.loadCharts = this.loadCharts.bind(this);
    }

    _createClass(IndicatorNew, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.load();
        }
    }, {
        key: 'load',
        value: function load() {
            var _this = this;
            var data = _this.state.data;

            $.ajax({
                method: 'GET',
                url: 'indicadores/analises/',
                data: {},
                cache: false,
                async: false,
                success: function success(result) {
                    _this.loadCharts(result, 0, data);
                },
                error: function error(xhr, status, err) {
                    console.error(status, err.toString());
                    _this.setState({ loading: false });
                }
            });
        }
    }, {
        key: 'loadCharts',
        value: function loadCharts(charts, i, data) {}
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(Accordion, null)
            );
        }
    }]);

    return IndicatorNew;
})(React.Component);

ReactDOM.render(React.createElement(IndicatorNew, null), document.getElementById('indicator-new'));
/*<ApexMixed
   chartId="chart"
   data={this.state.data}
/>*/