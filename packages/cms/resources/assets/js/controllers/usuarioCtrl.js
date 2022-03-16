cmsApp.controller('usuarioCtrl', ['$scope', '$http', 'Upload', '$timeout', function($scope, $http, Upload, $timeout){

    $scope.usuarios = [];
    $scope.currentPage = 1;
    $scope.lastPage = 0;
    $scope.totalItens = 0;
    $scope.maxSize = 5;
    $scope.itensPerPage = 50;
    $scope.dadoPesquisa = '';
    $scope.campos = "id_usuario, tx_email_usuario, tx_nome_usuario, bo_ativo";
    $scope.campoPesquisa = "tx_email_usuario";
    $scope.processandoListagem = false;
    $scope.processandoExcluir = false;
    $scope.ordem = "id_usuario";
    $scope.sentidoOrdem = "desc";
    var $listar = false;//para impedir de carregar o conteúdo dos watchs no carregamento da página.



    $scope.$watch('currentPage', function(){
        if($listar){
            listarUsuarios();
        }
    });
    $scope.$watch('itensPerPage', function(){
        if($listar){
            listarUsuarios();
        }
    });
    $scope.$watch('dadoPesquisa', function(){
        if($listar){
            listarUsuarios();
        }
    });

    var listarUsuarios = function(){
        $scope.processandoListagem = true;
        $http({
            url: 'cms/listar-usuarios-oscs',
            method: 'GET',
            params: {
                page: $scope.currentPage,
                itensPorPagina: $scope.itensPerPage,
                dadoPesquisa: $scope.dadoPesquisa,
                campos: $scope.campos,
                campoPesquisa: $scope.campoPesquisa,
                ordem: $scope.ordem,
                sentido: $scope.sentidoOrdem
            }
        }).success(function(data, status, headers, config){
            $scope.usuarios = data.data;
            $scope.lastPage = data.last_page;
            $scope.totalItens = data.total;
            $scope.primeiroDaPagina = data.from;
            $scope.ultimoDaPagina = data.to;
            $listar = true;
            //console.log(data);
            $scope.processandoListagem = false;
        }).error(function(data){
            $scope.message = "Ocorreu um erro: "+data;
            $scope.processandoListagem = false;
        });
    };


    $scope.ordernarPor = function(ordem){
        $scope.ordem = ordem;
        //console.log($scope.ordem);
        if($scope.sentidoOrdem=="asc"){
            $scope.sentidoOrdem = "desc";
        }else{
            $scope.sentidoOrdem = "asc";
        }

        listarUsuarios();
    };

    $scope.validar = function(){

    };


    listarUsuarios();

    //INSERIR/////////////////////////////

    $scope.tinymceOptions = tinymceOptions;
    $scope.mostrarForm = false;
    $scope.processandoInserir = false;


    $scope.limparImagem = function(){
        delete $scope.picFile;
        $scope.form.file.$error.maxSize = false;
    };

    $scope.validar = function(valor) {
        //console.log(valor);
        if(valor===undefined){
            return "campo-obrigatorio";
        }
        return "";
    };
    /////////////////////////////////


    //////////////////////////////////
    //////////////////////////////////
    $scope.status = function(id){
        console.log(id);
        $scope.mensagemStatus = '';
        $scope.idStatus = '';
        $scope.processandoStatus = true;
        $http({
            url: 'cms/status-usuario-osc/'+id,
            method: 'GET'
        }).success(function(data, status, headers, config){
            //console.log(data);
            $scope.processandoStatus = false;
            //$scope.excluido = true;
            $scope.mensagemStatus = 'color-success';
            $scope.idStatus = id;
            listarUsuarios();
        }).error(function(data){
            $scope.message = "Ocorreu um erro: "+data;
            $scope.processandoStatus = false;
            $scope.mensagemStatus = "Erro ao tentar status!";
        });
    };



}]);
