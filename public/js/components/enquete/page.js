var _this = this;

const Page = () => {

    const { useState, useEffect } = React;

    const [enquete, setEnquete] = useState('');

    console.log('---', enquete);

    /*const [form, setForm] = useState({
        tipo_perfil: enquete,
    });
     console.log('form:', form)*/

    /*useEffect(() => {
        Recurso();
    }, []);
     useEffect(() => {
        Recurso();
    }, [page]);
     const Recurso = async () => {
        try {
            const result = await axios.get('api/recurso/paginado/'+perPage, {
                params: {
                    page:page+1
                }
            });
            setRecursos(result.data.data);
            setTotal(result.data.total)
        } catch (error) {
            console.log(error);
        }
    }*/

    const hadleEnquete = str => {
        setEnquete(str);
    };

    /*const Update = async () => {
         try {
            const result = await axios.post('api/dados_perfil_de_acesso', form);
         } catch (error) {
            console.log(error);
        }
    }*/

    const Update = async () => {

        $.ajax({
            method: 'POST',
            url: getBaseUrl2 + 'dados_perfil_de_acesso',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data: {
                tipo_perfil: enquete
            },
            cache: false,
            success: function (data) {
                this.setState({ loading: false, showMsg: 1, msg: 'Enviado com sucesso!' });
            }.bind(_this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
                this.setState({ loading: false, showMsg: 2, msg: 'Ocorreu um erro. Tente novamente!' });
            }.bind(_this)
        });
    };

    return React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
            'div',
            { className: 'col-md-12' },
            React.createElement(
                'div',
                { className: 'menu-enquete' },
                React.createElement(
                    'div',
                    { onClick: () => hadleEnquete('membro_ou_representante_osc'), style: { backgroundColor: enquete === 'membro_ou_representante_osc' ? '#e1e1e1' : '' } },
                    React.createElement('i', { className: 'fa fa-circle', 'aria-hidden': 'true' }),
                    ' Membro e/ou representante de OSC'
                ),
                React.createElement(
                    'div',
                    { onClick: () => hadleEnquete('gestor_ou_servidor_publico'), style: { backgroundColor: enquete === 'gestor_ou_servidor_publico' ? '#e1e1e1' : '' } },
                    React.createElement('i', { className: 'fa fa-circle', 'aria-hidden': 'true' }),
                    ' Gestor e/ou servidor p\xFAblico'
                ),
                React.createElement(
                    'div',
                    { onClick: () => hadleEnquete('pesquisador_ou_estudante'), style: { backgroundColor: enquete === 'pesquisador_ou_estudante' ? '#e1e1e1' : '' } },
                    React.createElement('i', { className: 'fa fa-circle', 'aria-hidden': 'true' }),
                    ' Pesquisador e/ou estudante'
                ),
                React.createElement(
                    'div',
                    { onClick: () => hadleEnquete('jornalista_ou_midia'), style: { backgroundColor: enquete === 'jornalista_ou_midia' ? '#e1e1e1' : '' } },
                    React.createElement('i', { className: 'fa fa-circle', 'aria-hidden': 'true' }),
                    ' Jornalista e/ou profissional de m\xEDdia'
                ),
                React.createElement(
                    'div',
                    { onClick: () => hadleEnquete('outros'), style: { backgroundColor: enquete === 'outros' ? '#e1e1e1' : '' } },
                    React.createElement('i', { className: 'fa fa-circle', 'aria-hidden': 'true' }),
                    ' Outros'
                ),
                React.createElement(
                    'button',
                    { className: 'btn btn-theme bg-pri ', style: { color: '#FFFFFF' }, type: 'button', onClick: () => Update() },
                    'Enviar'
                )
            )
        )
    );
};