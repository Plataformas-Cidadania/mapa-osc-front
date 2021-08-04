cmsApp.controller('postCtrl', ['$scope', '$http', 'Upload', '$timeout', function($scope, $http, Upload, $timeout){

    $scope.posts = [];
    $scope.currentPage = 1;
    $scope.lastPage = 0;
    $scope.totalItens = 0;
    $scope.maxSize = 5;
    $scope.itensPerPage = 10;
    $scope.dadoPesquisa = '';
    $scope.campos = "id, titulo, imagem, status, destaque";
    $scope.campoPesquisa = "titulo";
    $scope.processandoListagem = false;
    $scope.processandoExcluir = false;
    $scope.ordem = "titulo";
    $scope.sentidoOrdem = "asc";
    $scope.categoria_id = 0;
    var $listar = false;//para impedir de carregar o conteúdo dos watchs no carregamento da página.

    $scope.$watch('currentPage', function(){
        if($listar){
            listarPosts();
        }
    });
    $scope.$watch('itensPerPage', function(){
        if($listar){
            listarPosts();
        }
    });
    $scope.$watch('dadoPesquisa', function(){
        if($listar){
            listarPosts();
        }
    });
    $scope.categoria_id = function(categoria_id){
        $scope.categoria_id = categoria_id;
        listarPosts();
    };


    var listarPosts = function(){
        $scope.processandoListagem = true;
        $http({
            url: 'cms/listar-posts',
            method: 'GET',
            params: {
                page: $scope.currentPage,
                itensPorPagina: $scope.itensPerPage,
                dadoPesquisa: $scope.dadoPesquisa,
                campos: $scope.campos,
                campoPesquisa: $scope.campoPesquisa,
                ordem: $scope.ordem,
                sentido: $scope.sentidoOrdem,
                categoria_id: $scope.categoria_id
            }
        }).success(function(data, status, headers, config){
            $scope.posts = data.data;
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

        listarPosts();
    };

    $scope.validar = function(){

    };


    listarPosts();

    //INSERIR/////////////////////////////

    $scope.tinymceOptions = tinymceOptions;
    $scope.mostrarForm = false;
    $scope.processandoInserir = false;

    $scope.inserir = function (file, arquivo){

        $scope.mensagemInserir = "";

        if(file==null && arquivo==null){
            $scope.processandoInserir = true;
            $scope.progress = 0;

            //console.log($scope.post);
            $http.post("cms/inserir-post", {post: $scope.post, integrante_post: $scope.integrante_post}).success(function (data){
                 listarPosts();
                //delete $scope.post;//limpa o form
                delete $scope.post.data;
                delete $scope.post.titulo;
                delete $scope.post.resumida;
                delete $scope.post.slug;
                delete $scope.post.descricao;
                $scope.mensagemInserir =  "Gravado com sucesso!";
                $scope.processandoInserir = false;
             }).error(function(data){
                $scope.mensagemInserir = "Ocorreu um erro!";
                $scope.processandoInserir = false;
             });
        }else{


            Upload.upload({
                url: 'cms/inserir-post',
                data: {post: $scope.post, file: file, arquivo: arquivo, integrante_post: $scope.integrante_post},
            }).then(function (response) {
                $timeout(function () {
                    $scope.result = response.data;
                });
                //console.log(response.data);
                //delete $scope.post;//limpa o form
                delete $scope.post.data;
                delete $scope.post.titulo;
                delete $scope.post.resumida;
                delete $scope.post.slug;
                delete $scope.post.descricao;
                $scope.picFile = null;//limpa o file
                $scope.fileArquivo = null;//limpa o file
                listarPosts();
                $scope.mensagemInserir =  "Gravado com sucesso!";
            }, function (response) {
                console.log(response.data);
                if (response.status > 0){
                    $scope.errorMsg = response.status + ': ' + response.data;
                }
            }, function (evt) {
                //console.log(evt);
                // Math.min is to fix IE which reports 200% sometimes
                $scope.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }

    };

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

    //EXCLUIR/////////////////////////
    $scope.perguntaExcluir = function (id, titulo, imagem){
        $scope.idExcluir = id;
        $scope.tituloExcluir = titulo;
        $scope.imagemExcluir = imagem;
        $scope.excluido = false;
        $scope.mensagemExcluido = "";
    };

    $scope.excluir = function(id){
        $scope.processandoExcluir = true;
        $http({
            url: 'cms/excluir-post/'+id,
            method: 'GET'
        }).success(function(data, status, headers, config){
            console.log(data);
            $scope.processandoExcluir = false;
            $scope.excluido = true;
            $scope.mensagemExcluido = "Excluído com sucesso!";
            listarPosts();
        }).error(function(data){
            $scope.message = "Ocorreu um erro: "+data;
            $scope.processandoExcluir = false;
            $scope.mensagemExcluido = "Erro ao tentar excluir!";
        });
    };
    //////////////////////////////////
    $scope.status = function(id){
        //console.log(id);
        $scope.mensagemStatus = '';
        $scope.idStatus = '';
        $scope.processandoStatus = true;
        $http({
            url: 'cms/status-post/'+id,
            method: 'GET'
        }).success(function(data, status, headers, config){
            //console.log(data);
            $scope.processandoStatus = false;
            //$scope.excluido = true;
            $scope.mensagemStatus = 'color-success';
            $scope.idStatus = id;
            listarPosts();
        }).error(function(data){
            $scope.message = "Ocorreu um erro: "+data;
            $scope.processandoStatus = false;
            $scope.mensagemStatus = "Erro ao tentar status!";
        });
    };
    //////////////////////////////////
    $scope.destaque = function(id){
        //console.log(id);
        $scope.mensagemDestaque = '';
        $scope.idDestaque = '';
        $scope.processandoDestaque = true;
        $http({
            url: 'cms/destaque-post/'+id,
            method: 'GET'
        }).success(function(data, destaque, headers, config){
            //console.log(data);
            $scope.processandoDestaque = false;
            //$scope.excluido = true;
            $scope.mensagemDestaque = 'color-success';
            $scope.idDestaque = id;
            listarPosts();
        }).error(function(data){
            $scope.message = "Ocorreu um erro: "+data;
            $scope.processandoDestaque = false;
            $scope.mensagemDestaque = "Erro ao tentar destaque!";
        });
    };

}]);
