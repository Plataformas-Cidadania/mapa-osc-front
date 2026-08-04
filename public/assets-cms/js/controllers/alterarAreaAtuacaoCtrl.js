cmsApp.controller('alterarAreaAtuacaoCtrl', ['$scope', '$http', function($scope, $http){
    var config = window.areaAtuacaoConfig || {};
    var updateBaseUrl = config.updateBaseUrl || 'cms/alterar-area-atuacao/';

    $scope.processandoSalvar = false;

    $scope.alterar = function (){
        $scope.processandoSalvar = true;

        $http.post(updateBaseUrl + $scope.id, {area_atuacao: $scope.area_atuacao}).success(function (data){
            $scope.processandoSalvar = false;
            $scope.mensagemSalvar = data;
        }).error(function(data){
            $scope.mensagemSalvar = "Ocorreu um erro: " + data;
            $scope.processandoSalvar = false;
        });
    };

    $scope.validar = function(valor) {
        if(valor === undefined && $scope.form.$dirty){
            return "campo-obrigatorio";
        }
        return "";
    };
}]);
