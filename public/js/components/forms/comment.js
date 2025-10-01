'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Comment = (function (_React$Component) {
    _inherits(Comment, _React$Component);

    function Comment(props) {
        _classCallCheck(this, Comment);

        _get(Object.getPrototypeOf(Comment.prototype), 'constructor', this).call(this, props);
        this.state = {
            form: {
                name: '',
                email: '',
                description: ''
            },
            button: true,
            loading: false,
            requireds: {
                name: true,
                email: true,
                description: true
            },
            showMsg: false,
            msg: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.comment = this.comment.bind(this);
        this.validate = this.validate.bind(this);
    }

    _createClass(Comment, [{
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'handleInputChange',
        value: function handleInputChange(event) {
            var target = event.target;
            var value = target.type === 'checkbox' ? target.checked : target.value;
            var name = target.name;

            var form = this.state.form;
            form[name] = value;

            this.setState({ form: form });
        }
    }, {
        key: 'validate',
        value: function validate() {

            var valid = true;

            var requireds = this.state.requireds;

            var form = this.state.form;

            for (var index in requireds) {
                if (!form[index] || form[index] === '') {
                    requireds[index] = false;
                    valid = false;
                } else {
                    requireds[index] = true;
                }
            }

            if (!this.validateName(this.state.form.name)) {
                requireds.name = false;
                valid = false;
            }

            this.setState({ requireds: requireds });

            return valid;
        }
    }, {
        key: 'validateName',
        value: function validateName(name) {
            var array_name = name.split(' ');
            //console.log(array_name);
            //console.log(array_name.length);
            if (array_name.length < 2) {
                return false;
            }

            return true;
        }
    }, {
        key: 'comment',
        value: function comment(e) {
            //console.log(this.validate());
            if (!this.validate()) {
                return;
            }

            this.setState({ loading: true, button: false, showMsg: false, msg: '' }, function () {

                $.ajax({
                    method: 'POST',
                    url: 'comment',
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    data: {
                        form: this.state.form
                    },
                    cache: false,
                    success: (function (data) {
                        console.log('reg', data);
                        this.setState({ loading: false });
                    }).bind(this),
                    error: (function (xhr, status, err) {
                        console.error(status, err.toString());
                        this.setState({ loading: false });
                    }).bind(this)
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'form',
                    null,
                    React.createElement(
                        'div',
                        { className: 'container' },
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-md-6' },
                                React.createElement(
                                    'div',
                                    { className: 'label-float' },
                                    React.createElement('input', { className: "form-control form-g " + (this.state.requireds.name ? '' : 'invalid-field'), type: 'text', name: 'name', onChange: this.handleInputChange, placeholder: ' ', required: this.state.requireds.name ? '' : 'required' }),
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'name' },
                                        'Nome'
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'label-box-info' },
                                        React.createElement(
                                            'p',
                                            { style: { display: this.state.requireds.name ? 'none' : 'block' } },
                                            React.createElement('i', { className: 'fas fa-exclamation-circle' }),
                                            ' Digite o nome e sobre nome'
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-md-6' },
                                React.createElement(
                                    'div',
                                    { className: 'label-float' },
                                    React.createElement('input', { className: "form-control form-g" + (this.state.requireds.email ? '' : 'invalid-field'), type: 'text', name: 'email', onChange: this.handleInputChange, value: this.state.form.email, placeholder: ' ', required: this.state.requireds.email ? '' : 'required' }),
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'email' },
                                        'E-mail'
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'label-box-info' },
                                        React.createElement(
                                            'p',
                                            { style: { display: this.state.requireds.email ? 'none' : 'block' } },
                                            React.createElement('i', { className: 'fas fa-exclamation-circle' }),
                                            ' Escolha um endereço de e-mail valido'
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-md-12' },
                                React.createElement(
                                    'div',
                                    { className: 'label-float' },
                                    React.createElement('textarea', { className: "form-control form-g", type: 'text', name: 'description', onChange: this.handleInputChange, value: this.state.form.description, placeholder: ' ', required: this.state.requireds.description ? '' : 'required' }),
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'description' },
                                        'Descrição'
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'label-box-info' },
                                        React.createElement(
                                            'p',
                                            { style: { display: this.state.requireds.name ? 'none' : 'block' } },
                                            React.createElement('i', { className: 'fas fa-exclamation-circle' }),
                                            ' Digite uma descrição'
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-md-12' },
                                React.createElement(
                                    'button',
                                    { type: 'button', style: { display: this.state.button ? 'block' : 'none' }, className: 'btn btn-primary', onClick: this.comment },
                                    'Cadastrar'
                                ),
                                React.createElement('br', null),
                                React.createElement(
                                    'div',
                                    { style: { display: this.state.showMsg ? 'block' : 'none' }, className: 'text-danger' },
                                    this.state.msg
                                ),
                                React.createElement(
                                    'div',
                                    { style: { display: this.state.loading ? 'block' : 'none' } },
                                    React.createElement('i', { className: 'fa fa-spin fa-spinner' }),
                                    'Processando'
                                )
                            )
                        )
                    )
                ),
                React.createElement('br', null),
                React.createElement('br', null)
            );
        }
    }]);

    return Comment;
})(React.Component);

ReactDOM.render(React.createElement(Comment, null), document.getElementById('comment'));