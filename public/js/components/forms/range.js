"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Range = (function (_React$Component) {
    _inherits(Range, _React$Component);

    function Range(props) {
        _classCallCheck(this, Range);

        _get(Object.getPrototypeOf(Range.prototype), "constructor", this).call(this, props);
        var min = props.min ? props.min : 0;
        var max = props.max ? props.max : 100;
        this.state = {
            min: min,
            max: max,
            step: props.step ? props.step : 1,
            defaultValueStart: props.defaultValueStart ? props.defaultValueStart : 0,
            defaultValueEnd: props.defaultValueEnd ? props.defaultValueEnd : 100,
            title: props.title ? props.title : "",
            start: min,
            end: max,
            value: "de " + min + " até " + max
        };
        this.handleEnd = this.handleEnd.bind(this);
        this.handleStart = this.handleStart.bind(this);
    }

    _createClass(Range, [{
        key: "handleStart",
        value: function handleStart(e) {
            var start = e.target.value;
            var end = this.state.end;
            var value = "de " + start + " até " + end;
            this.setState({ start: start, value: value }, function () {
                this.props.setValue(start, end);
            });
        }
    }, {
        key: "handleEnd",
        value: function handleEnd(e) {
            var end = e.target.value;
            var start = this.state.start;
            var value = "de " + start + " até " + end;
            this.setState({ end: end, value: value }, function () {
                this.props.setValue(start, end);
            });
        }
    }, {
        key: "nothing",
        value: function nothing() {}
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: "label-float" },
                    React.createElement("input", { className: "form-control form-g ", type: "text", name: "tx_nome_uf", id: "textRanger", placeholder: "", value: this.state.value, onChange: this.nothing }),
                    React.createElement(
                        "label",
                        { htmlFor: "name" },
                        this.state.title
                    ),
                    React.createElement("div", { className: "label-box-info-off" })
                ),
                React.createElement("input", { type: "range", className: "custom-range float-left",
                    min: this.state.min,
                    max: this.state.max,
                    step: this.state.step,
                    defaultValue: this.state.defaultValueStart,
                    name: "textRanger",
                    id: "rangerMin",
                    onChange: this.handleStart
                }),
                React.createElement("input", { type: "range", className: "custom-range float-right",
                    min: this.state.min,
                    max: this.state.max,
                    step: this.state.step,
                    defaultValue: this.state.defaultValueEnd,
                    name: "textRanger",
                    id: "rangerMax",
                    onChange: this.handleEnd
                })
            );
        }
    }]);

    return Range;
})(React.Component);