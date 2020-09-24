cmsApp.controller('alterarSettingCtrl', ['$scope', '$http', 'Upload', function($scope, $http, Upload){

    $scope.processandoSalvar = false;



    //ALTERAR/////////////////////////////

   // $scope.tinymceOptions = tinymceOptions;

    $scope.mostrarForm = false;
    $scope.removerImagem = false;

    $scope.alterar = function (file){
       // console.log($scope.setting);
        if(file==null){

            $scope.processandoSalvar = true;
            //console.log($scope.setting);
            $http.post("/cms/alterar-setting/"+$scope.id, {'setting': $scope.setting, 'removerImagem': $scope.removerImagem}).success(function (data){
                //console.log(data);
                $scope.processandoSalvar = false;
                $scope.mensagemSalvar = data;
                $scope.removerImagem = false;
            }).error(function(data){
                //console.log(data);
                $scope.mensagemSalvar = "Ocorreu um erro: "+data;
                $scope.processandoSalvar = false;
            });

        }else{

            file.upload = Upload.upload({
                url: '/cms/alterar-setting/'+$scope.id,
                data: {setting: $scope.setting, file: file},
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
                $scope.picFile = null;//limpa o form
                $scope.mensagemSalvar =  "Gravado com sucesso!";
                $scope.removerImagem = false;
                $scope.imagemBD = '/imagens/settings/'+response.data;
                console.log($scope.imagemDB);
            }, function (response) {
                if (response.status > 0){
                    $scope.errorMsg = response.status + ': ' + response.data;
                }
            }, function (evt) {
                //console.log(evt);
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });

        }
    };
    $scope.limparImagem = function(){
        $scope.picFile = null;
        $scope.imagemBD = null;
        $scope.removerImagem = true;
    };

    $scope.carregaImagem  = function(img) {
        if(img!=''){
            $scope.imagemBD = '/imagens/settings/xs-'+img;
            //console.log($scope.imagemBD);
        }
    };
    $scope.validar = function(valor) {
        if(valor===undefined && $scope.form.$dirty){
            return "campo-obrigatorio";
        }
        return "";
    };
    /////////////////////////////////
    
    

    

}]);
