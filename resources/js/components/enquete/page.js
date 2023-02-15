const Page = () => {

    const {useState, useEffect} = React;

    const [enquete, setEnquete] = useState('');

    console.log('---', enquete)

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

    const hadleEnquete = (str) => {
        setEnquete(str);
    }

    /*const Update = async () => {

        try {
            const result = await axios.post('api/dados_perfil_de_acesso', form);

        } catch (error) {
            console.log(error);
        }
    }*/

    const Update = async () => {

        $.ajax({
            method:'POST',
            url: getBaseUrl2 + 'dados_perfil_de_acesso/',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data:{
                tipo_perfil: enquete,
            },
            cache: false,
            success: function(data) {
                this.setState({loading: false, showMsg: 1, msg: 'Enviado com sucesso!'});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
                this.setState({loading: false, showMsg: 2, msg: 'Ocorreu um erro. Tente novamente!'});
            }.bind(this)
        });
    }

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="menu-enquete">
                    <div onClick={() => hadleEnquete('membro_ou_representante_osc')} style={{backgroundColor: enquete === 'membro_ou_representante_osc' ? '#e1e1e1' : ''}}><i className="fa fa-circle" aria-hidden="true"></i> Membro e/ou representante de OSC</div>
                    <div onClick={() => hadleEnquete('gestor_ou_servidor_publico')} style={{backgroundColor: enquete === 'gestor_ou_servidor_publico' ? '#e1e1e1' : ''}}><i className="fa fa-circle" aria-hidden="true"></i> Gestor e/ou servidor público</div>
                    <div onClick={() => hadleEnquete('pesquisador_ou_estudante')} style={{backgroundColor: enquete === 'pesquisador_ou_estudante' ? '#e1e1e1' : ''}}><i className="fa fa-circle" aria-hidden="true"></i> Pesquisador e/ou estudante</div>
                    <div onClick={() => hadleEnquete('jornalista_ou_midia')} style={{backgroundColor: enquete === 'jornalista_ou_midia' ? '#e1e1e1' : ''}}><i className="fa fa-circle" aria-hidden="true"></i> Jornalista e/ou profissional de mídia</div>
                    <div onClick={() => hadleEnquete('outros')} style={{backgroundColor: enquete === 'outros' ? '#e1e1e1' : ''}}><i className="fa fa-circle" aria-hidden="true"></i> Outros</div>
                    <button className="btn btn-theme bg-pri " style={{color: '#FFFFFF'}} type="button"  onClick={() => Update()}>Enviar</button>
                </div>
            </div>
        </div>
    );
};
