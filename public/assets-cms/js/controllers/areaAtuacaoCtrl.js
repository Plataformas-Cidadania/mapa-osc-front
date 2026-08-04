cmsApp.controller('areaAtuacaoCtrl', ['$scope', '$http', function($scope, $http){
    var config = window.areaAtuacaoConfig || {};
    $scope.detailBaseUrl = config.detailBaseUrl || 'cms/area-atuacao/';
    var listUrl = config.listUrl || 'cms/listar-areas-atuacao';
    var insertUrl = config.insertUrl || 'cms/inserir-area-atuacao';
    var deleteBaseUrl = config.deleteBaseUrl || 'cms/excluir-area-atuacao/';

    $scope.areasAtuacao = [];
    $scope.currentPage = 1;
    $scope.lastPage = 0;
    $scope.totalItens = 0;
    $scope.maxSize = 5;
    $scope.itensPerPage = 10;
    $scope.dadoPesquisa = '';
    $scope.campos = "cd_area_atuacao, tx_nome_area_atuacao";
    $scope.campoPesquisa = "tx_nome_area_atuacao";
    $scope.processandoListagem = false;
    $scope.processandoExcluir = false;
    $scope.ordem = "tx_nome_area_atuacao";
    $scope.sentidoOrdem = "asc";
    var listarHabilitado = false;

    $scope.$watch('currentPage', function(){
        if(listarHabilitado){
            listarAreasAtuacao();
        }
    });

    $scope.$watch('itensPerPage', function(){
        if(listarHabilitado){
            listarAreasAtuacao();
        }
    });

    $scope.$watch('dadoAreaAtuacao', function(){
        if(listarHabilitado){
            listarAreasAtuacao();
        }
    });

    var listarAreasAtuacao = function(){
        $scope.processandoListagem = true;
        $scope.dadoPesquisa = $scope.dadoAreaAtuacao || '';

        $http({
            url: listUrl,
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
        }).success(function(data){
            $scope.areasAtuacao = data.data;
            $scope.lastPage = data.last_page;
            $scope.totalItens = data.total;
            $scope.primeiroDaPagina = data.from;
            $scope.ultimoDaPagina = data.to;
            listarHabilitado = true;
            $scope.processandoListagem = false;
        }).error(function(data){
            $scope.message = "Ocorreu um erro: " + data;
            $scope.processandoListagem = false;
        });
    };

    $scope.ordernarPor = function(ordem){
        $scope.ordem = ordem;
        $scope.sentidoOrdem = $scope.sentidoOrdem == "asc" ? "desc" : "asc";
        listarAreasAtuacao();
    };

    $scope.mostrarForm = false;
    $scope.processandoInserir = false;

    $scope.inserir = function(){
        $scope.mensagemInserir = "";
        $scope.processandoInserir = true;

        $http.post(insertUrl, {area_atuacao: $scope.area_atuacao}).success(function(){
            listarAreasAtuacao();
            delete $scope.area_atuacao;
            $scope.mensagemInserir = "Gravado com sucesso!";
            $scope.processandoInserir = false;
        }).error(function(){
            $scope.mensagemInserir = "Ocorreu um erro!";
            $scope.processandoInserir = false;
        });
    };

    $scope.validar = function(valor) {
        if(valor === undefined){
            return "campo-obrigatorio";
        }
        return "";
    };

    $scope.perguntaExcluir = function (id, titulo){
        $scope.idExcluir = id;
        $scope.tituloExcluir = titulo;
        $scope.excluido = false;
        $scope.mensagemExcluido = "";
    };

    $scope.excluir = function(id){
        $scope.processandoExcluir = true;
        $http({
            url: deleteBaseUrl + id,
            method: 'GET'
        }).success(function(){
            $scope.processandoExcluir = false;
            $scope.excluido = true;
            $scope.mensagemExcluido = "Excluido com sucesso!";
            listarAreasAtuacao();
        }).error(function(data){
            $scope.message = "Ocorreu um erro: " + data;
            $scope.processandoExcluir = false;
            $scope.mensagemExcluido = "Erro ao tentar excluir!";
        });
    };

    listarAreasAtuacao();
}]);
