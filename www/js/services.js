(function () {

  var app = angular.module('starter.services', []);

  app.service('plantasServices', function($q, $http){
    var plantas = this;
    plantas.listaPlantas = [];
    plantas.plantaDetalhada = {};
    plantas.plantaSelecionada = [];

    plantas.getTodasPlantas = function(){
      var defer = $q.defer();
      $http.get('https://api.mlab.com/api/1/databases/appraga/collections/plantas?s={"_id": 1}&apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff')
      .success(function(response){
        angular.forEach(response, function(carregar){
          plantas.listaPlantas.push(carregar);
          defer.resolve(carregar);
        });
      });
      return defer.promise;
    }

    plantas.getPlantaDetalhada = function(plantaId){
      var defer = $q.defer();
      var plantaIdJson = angular.toJson(plantas.listaPlantas[plantaId]._id);
      // $http.get('https://api.mlab.com/api/1/databases/appraga/collections/plantas?q={%22_id%22:%20%22'+ plantaId +'%22}&apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff')
      $http.get('https://api.mlab.com/api/1/databases/appraga/collections/plantas?q={_id:'+plantaIdJson+'}&apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff')
      .success(function(response){
        plantas.plantaDetalhada = response;
        defer.resolve(response);
      });
      return defer.promise;
    }

    plantas.getPlantaSelecionada = function(plantaId){
      var defer = $q.defer();
      // var plantaIdJson = angular.toJson(plantas.listaPlantas[plantaId-1].pragas);
      var plantaIdJson;
      angular.forEach(plantas.listaPlantas[plantaId].pragas, function(praga){
        plantaIdJson = angular.toJson(praga);
        console.log(plantaIdJson);

        $http.get('https://api.mlab.com/api/1/databases/appraga/collections/pragas?q={_id:'+plantaIdJson+'}&s={"_id": 1}&apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff')
        .success(function(response){
          plantas.plantaSelecionada.push(response[0]);
          defer.resolve(response);
          // console.log(response);
        });

      });
      return defer.promise;
    }
    // console.log(plantas);
    return plantas;
  });

  app.service('pragasServices', function($q, $http){
    var pragas = this;
    pragas.listaPragas = [];
    pragas.pragaDetalhada = {};
    pragas.pragaSelecionada = [];

    pragas.getTodasPragas = function(){
      var defer = $q.defer();
      // $http.get('https://api.mlab.com/api/1/databases/appraga/collections/pragas?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff')
      $http.get('https://api.mlab.com/api/1/databases/appraga/collections/pragas?s={"_id": 1}&apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff')
      .success(function(response){
        angular.forEach(response, function(carregar){
          pragas.listaPragas.push(carregar);
          defer.resolve(carregar);
        });
      });
      return defer.promise;
    }

    pragas.getPragaDetalhada = function(pragaId){
      var defer = $q.defer();
      var pragaIdJson = angular.toJson(pragas.listaPragas[pragaId]._id);
      // $http.get('https://api.mlab.com/api/1/databases/appraga/collections/pragas?q={%22id%22:%20%22'+ pragaId +'%22}&apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff')
      $http.get('https://api.mlab.com/api/1/databases/appraga/collections/pragas?q={_id:'+pragaIdJson+'}&apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff')
      .success(function(response){
        pragas.pragaDetalhada = response;
        defer.resolve(response);
        // console.log(response);
      });
      return defer.promise;
    }

    pragas.getPragaSelecionada = function(pragaId){
      var defer = $q.defer();
      var pragaIdJson;
      angular.forEach(pragas.listaPragas[pragaId].plantas, function(planta){
        pragaIdJson = angular.toJson(planta);
        $http.get('https://api.mlab.com/api/1/databases/appraga/collections/plantas?q={_id:'+pragaIdJson+'}&s={"_id": 1}&apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff')
        .success(function(response){
          pragas.pragaSelecionada.push(response[0]);
          defer.resolve(response);
        });
      });
      return defer.promise;
    }
    // console.log(pragas);
    return pragas;
  });

  app.service('manejosServices', function($q, $http){
    var manejos = this;
    manejos.listaManejos = [];

    manejos.getTodosManejos = function(){
      var defer = $q.defer();
      $http.get('https://api.mlab.com/api/1/databases/appraga/collections/manejos?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff')
      .success(function(response){
        angular.forEach(response, function(carregar){
          manejos.listaManejos.push(carregar);
          defer.resolve(carregar);
        });
      });
      return defer.promise;
    }

    // console.log(manejos);
    return manejos;
  });

  app.service('cadastroPlantaServices', function($q, $http){
    var plantas = this;
    plantas.cadastrarPlanta = {};

    plantas.postPlanta = function(cadastro){
      var defer = $q.defer();
      // console.log(cadastro);
      if (Object.keys(cadastro).length == 0 ) {
        alert("Empty Object!")
      }else{
        var cadastroJson = angular.toJson(cadastro);
        // console.log(cadastroJson);
        $http.post('https://api.mlab.com/api/1/databases/appraga/collections/plantas?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff', cadastroJson)
        .success(function(response){
          plantas.cadastrarPlanta = response;
          defer.resolve(response);
        });
      }
      return defer.promise;
    }
    // console.log(plantas);
    return plantas;
  });

  app.service('cadastroPragaServices', function($q, $http){
    var pragas = this;
    pragas.cadastrarPraga = {};

    pragas.postPraga = function(cadastro){
      var defer = $q.defer();
      if (Object.keys(cadastro).length == 0 ) {
        alert("Empty Object!")
      }else{
        var cadastroJson = angular.toJson(cadastro);
        $http.post('https://api.mlab.com/api/1/databases/appraga/collections/pragas?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff', cadastroJson)
        .success(function(response){
          pragas.cadastrarPraga = response;
          defer.resolve(response);
          // console.log(response);
        });
      }
      return defer.promise;
    }
    // console.log(pragas);
    return pragas;
  });

  app.service('removerPlantaServices', function($q, $http){
    var plantas = this;
    plantas.removerPlanta = [];

    plantas.deletePlanta = function(remover){
      var defer = $q.defer();
      console.log(JSON.stringify(remover._id));
      if (Object.keys(remover).length == 0 ) {
        alert("Empty Object!")
      }else{
        var removerJson = angular.toJson(remover._id);
        console.log(removerJson);
        // $http.delete('https://api.mlab.com/api/1/databases/appraga/collections/plantas?q={_id:'+removerJson+'}&apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff')
        $http.delete('https://api.mlab.com/api/1/databases/appraga/collections/plantas?apiKey=XRSrAQkYZvpYR1cLVVbR5rknsPC0hZff',  JSON.stringify(remover))
        .success(function(response){
          plantas.removerPlanta = response;
          defer.resolve(response);
          console.log(response);
        });
      }

      return defer.promise;
    }
    return plantas;
  });

  // app.factory('myService', function() {
  //  var savedData = {}
  //  function set(data) {
  //    savedData = data;
  //  }
  //  function get() {
  //   return savedData;
  //  }
  //
  //  return {
  //   set: set,
  //   get: get
  //  }
  //
  // });

}());
