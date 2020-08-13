class Atuacoes extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loadingList:false,
            loading:false,
            actionForm: '',
            remove: [],
            loadingRemove: [],
            atuacao: {},
            editId: 0,
            areaAtuacao: null,
            subareaAtuacao: null,
            titleSub: null,
            imputOutros: false,
        };

        this.listArea = this.listArea.bind(this);

    }

    componentDidMount(){
        this.listArea();
    }

    listArea(){
        this.setState({button:false});
        $.ajax({
            method: 'GET',
            cache: false,
            url: getBaseUrl+'menu/osc/area_atuacao',
            success: function (data) {
                data.find(function(item){
                    item.checked = false;
                });
                this.setState({loading: false, areaAtuacao: data, button:true})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    callSubareaAtuacao(id){
        this.setState({button:false});
        $.ajax({
            method: 'GET',
            cache: false,
            url: getBaseUrl+'menu/osc/subarea_atuacao',
            success: function (data) {
                let areaAtuacao = this.state.areaAtuacao;
                let imputOutros = this.state.imputOutros;

                this.state.areaAtuacao.find(function(item){

                    if(item.cd_area_atuacao === id){
                        item.checked = !item.checked;
                        if(id===10){
                            imputOutros = !imputOutros;
                        }
                    }
                    item.subareas = data.filter(function(subitem){
                        return item.cd_area_atuacao === subitem.cd_area_atuacao;
                    });
                });
                this.setState({loading: false, areaAtuacao: areaAtuacao, id_area:id, titleSub:true, imputOutros:imputOutros})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }




    render(){

        let areaAtuacao = null;
        let subareaAtuacao = [];
        if(this.state.areaAtuacao){
            areaAtuacao = this.state.areaAtuacao.map(function (item) {

                let subarea = null;
                if(item.subareas){
                    subarea = item.subareas.map(function(subitem){
                        return(
                            <div key={"subarea_"+subitem.cd_subarea_atuacao}>
                                <div className="custom-control custom-checkbox" onChange={() => console.log(subitem.cd_subarea_atuacao)}>
                                    <input type="checkbox" className="custom-control-input" id={"subarea_"+subitem.cd_subarea_atuacao} required/>
                                    <label className="custom-control-label" htmlFor={"subarea_"+subitem.cd_subarea_atuacao} >{subitem.tx_nome_subarea_atuacao}</label>
                                </div>
                                <br />
                            </div>
                        );
                    });
                }

                subareaAtuacao.push(
                    <div key={"divArea_"+item.cd_area_atuacao} className="card" style={{display: item.checked ? '' : 'none'}}>
                        <div className="bg-lgt p-2">
                            <strong>{item.tx_nome_area_atuacao}</strong><br/>
                            {subarea}
                            <input className={"form-control form-g "} type="text" name="tx_nome_uf"  placeholder=" "/>
                        </div>
                    </div>
                );

                return (
                    <div className="col-md-6" key={"area_"+item.cd_area_atuacao} onChange={() => this.callSubareaAtuacao(item.cd_area_atuacao)}>
                        <div className="bg-lgt items-checkbox">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id={"area_"+item.cd_area_atuacao} required/>
                                <label className="custom-control-label" htmlFor={"area_"+item.cd_area_atuacao} >{item.tx_nome_area_atuacao}</label>
                            </div>
                        </div>
                    </div>
                );
            }.bind(this));
        }

        return(

        <div className="row">
            <div className="col-md-12">
                <div className="title-user-area">
                    <div className="mn-accordion-icon"><i className="fa fa-share-alt" aria-hidden="true"/></div>
                    <h3>Áreas e Subáreas de atuação da OSC</h3>
                    <hr/><br/>
                </div>
                <div className="text-center">Atividade econômica (CNAE)</div>
                <br/>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="col-md-12">
                        <strong>Área de Atuação</strong><hr/>
                        <div className="row">
                            {areaAtuacao}
                            <br/>
                            <br/>
                            <div className="col-md-12"  style={{display: this.state.imputOutros ? '' : 'none'}}>
                                <input className={"form-control form-g "} type="text" name="tx_nome_uf"  placeholder=" "/><br/>
                            </div>

                        </div>
                        <div style={{display: this.state.titleSub ? '' : 'none'}}>
                            <strong>Subárea de Atuação</strong><hr/>
                            <div className="card-columns">
                                {subareaAtuacao}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    }
}


ReactDOM.render(
<Atuacoes/>,
    document.getElementById('atuacoes')
);
