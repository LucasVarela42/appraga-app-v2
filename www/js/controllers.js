var appctrl = angular.module('starter.controllers', []);

appctrl.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalLogin = modal;
  });
  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modalLogin.hide();
  };
  // Open the login modal
  $scope.login = function() {
    $scope.modalLogin.show();
  };
  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  // $scope.pesquisar = {};
  // $ionicModal.fromTemplateUrl('templates/pesquisar.html', {
  //   scope: $scope,
  //   animation: 'slide-in-up'
  // }).then(function(modal) {
  //   $scope.modalPesquisar = modal;
  // });
  // $scope.closePesquisar = function() {
  //   $scope.modalPesquisar.hide();
  // };
  // $scope.pesquisar = function() {
  //   $scope.modalPesquisar.show();
  // };




});

appctrl.controller('AppragaCtrl', function($scope, $rootScope, plantasServices, pragasServices, manejosServices) {
  $scope.init = function(){
    $scope.getAll();
  }

  $scope.getAll = function(){
    plantasServices.getTodasPlantas()
    pragasServices.getTodasPragas()
    manejosServices.getTodosManejos()

    .then(function(resPlanta) {
      $rootScope.listaPlantas = plantasServices.listaPlantas;
      console.log($scope.listaPlantas);
    })
    .then(function(resPraga) {
      $rootScope.listaPragas = pragasServices.listaPragas;
      console.log($scope.listaPragas);
    })
    .then(function(resManejos) {
      $rootScope.listaManejos = manejosServices.listaManejos;
      console.log($scope.listaManejos);
    });
  }

  plantasServices.listaPlantas = [];
  pragasServices.listaPragas = [];
  manejosServices.listaManejos = [];
  $scope.init();
});

appctrl.controller('PlantaDetalhadaCtrl', function($scope, $stateParams, plantasServices) {
  $scope.init = function(){
    $scope.getAll();
  }
  $scope.getAll = function(){
    plantasServices.getPlantaDetalhada($stateParams.plantaId)
    .then(function(res) {
      $scope.plantaDetalhada = plantasServices.plantaDetalhada;
      console.log($scope.plantaDetalhada);
    });
  }
  plantasServices.plantaDetalhada = {};
  $scope.init();
});

appctrl.controller('PragaDetalhadaCtrl', function($scope, $stateParams, pragasServices) {
  $scope.init = function(){
    $scope.getAll();
  }
  $scope.getAll = function(){
    pragasServices.getPragaDetalhada($stateParams.pragaId)
    .then(function(res) {
      $scope.pragaDetalhada = pragasServices.pragaDetalhada;
      console.log($scope.pragaDetalhada);
    });
  }
  pragasServices.pragaDetalhada = {};
  $scope.init();
});

appctrl.controller('PlantaSelecionadaCtrl', function($scope, $stateParams, plantasServices) {
  $scope.init = function(){
    $scope.getSelected();
  }
  $scope.getSelected = function(){
    plantasServices.getPlantaSelecionada($stateParams.plantaId)
    .then(function(res) {
      $scope.plantaSelecionada = plantasServices.plantaSelecionada;
      console.log($scope.plantaSelecionada);
    });
  }
  plantasServices.plantaSelecionada = [];
  $scope.init();
});

appctrl.controller('PragaSelecionadaCtrl', function($scope, $stateParams, pragasServices) {
  $scope.init = function(){
    $scope.getSelected();
  }
  $scope.getSelected = function(){
    pragasServices.getPragaSelecionada($stateParams.pragaId)
    .then(function(res) {
      $scope.pragaSelecionada = pragasServices.pragaSelecionada;
      console.log($scope.pragaSelecionada);
    });
  }
  pragasServices.pragaSelecionada = [];
  $scope.init();
});

appctrl.controller('CadastroPlantaCtrl', function($scope, $rootScope, $ionicModal, cadastroPlantaServices, $ionicHistory, $state, pragasServices, plantasServices) {
  $scope.cadastro = {
    checked: [],
    pragas: []
  };
  $scope.listaPragas = [];
  // $scope.pragasSelecionadas = [];
  $ionicModal.fromTemplateUrl('templates/planta-cadastro.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalCadastrar = modal;
  });

  $scope.closeCadastrar = function() {
    $scope.modalCadastrar.hide();
  };

  $scope.cadastrar = function() {
    $scope.listaPragas = pragasServices.listaPragas;
    $scope.modalCadastrar.show();
  };

  // $scope.check = function(value) {
  //   console.log(value);
  //   var idx = $scope.listaPragas.indexOf(value);
  //   if (idx >= 0 && !value) {
  //     $scope.pragasSelecionadas.splice(idx, 1);
  //     console.log($scope.pragasSelecionadas);
  //   }
  //   if (idx < 0 && value) {
  //     $scope.pragasSelecionadas.push(value);
  //     $scope.pragasSelecionadas
  //   }
  // };

  // $scope.stateChanged = function(checked){
  //     if(checked){
  //         $scope.myChoices.push(checked);
  //         $scope.pragasSelecionadas
  //     }else{
  //         var index = $scope.myChoices.indexOf(checked);
  //         $scope.myChoices.splice(index,1);
  //         $scope.pragasSelecionadas
  //     }
  // };

  // $scope.pragaSelecionada = function(praga) {
  //   if(praga){
  //   $scope.pragasSelecionadas = praga ;
  //   // $scope.pragasSelecionadas.push(JSON.stringify(pragasServices.listaPragas[praga]._id));
  //   console.log($scope.pragasSelecionadas);
  //   // return $scope.pragasSelecionadas;
  //   }else {
  //     console.log("indefinido");
  //   }
  // }

  // $scope.getPos = function(item, arr){
  //       console.log(arr.indexOf(item) +":"+item.id)
  //
  //       if ($scope.cadastro.pragas.indexOf(item) == -1
  //          && $scope.cadastro.checked[arr.indexOf(item)]==true){
  //           $scope.cadastro.pragas.push(item)
  //       }
  //
  //       if ($scope.cadastro.pragas.indexOf(item) != -1
  //           &&  !$scope.cadastro.checked[arr.indexOf(item)] ){
  //           console.log($scope.cadastro.checked[arr.indexOf(item)] + " remove:" + item +" :"+ arr.indexOf(item) )
  //           $scope.cadastro.pragas.splice($scope.cadastro.pragas.indexOf(item),1)
  //       }
  //
  //       var resultado = angular.toJson(arr.indexOf(item));
  //       console.log("resultado"+resultado);
  //       return arr.indexOf(item);
  //   }

  $scope.$watch(function() {
    return $scope.cadastro.checked;
  }, function(value) {
    // console.log(value);
    $scope.cadastro.pragas = [];
    angular.forEach($scope.cadastro.checked, function(boolean, index) {
      boolean && $scope.cadastro.pragas.push(getPragaByIndex(index));
      // console.log(boolean);
      // console.log(index);
    });
  }, true);

  function getPragaByIndex (index) {
    // console.log($scope.listaPragas.indexOf(index));
    // for (var i = 0; i < $scope.listaPragas.length; i++) {
    if ($scope.listaPragas.indexOf(index) == -1) {
      // console.log($scope.listaPragas[index]._id);
      return $scope.listaPragas[index]._id;
    }
    // }
  };

  $scope.doCadastro = function() {
    cadastroPlantaServices.postPlanta($scope.cadastro)
    .then(function(res) {
      $scope.cadastro = cadastroPlantaServices.cadastrarPlanta;
      // $rootScope.listaPlantas = $rootScope.listaPlantas.concat($scope.cadastro);
      // $scope.pragasSelecionadas = cadastroPlantaServices.cadastrarPlanta;
    });
    $scope.closeCadastrar();
  };



  $scope.backAndRefresh = function(){
    $ionicHistory.clearCache()
    .then(function(){
      $rootScope.listaPlantas = $rootScope.listaPlantas.concat($scope.cadastro);
      // $scope.listaPlantas = [];
      // $scope.cadastro = {};
      // console.log($rootScope.listaPlantas);
      // $state.reload();
      // $ionicHistory.clearHistory();
    });
  };

  cadastroPlantaServices.cadastrarPlanta = {};
});

appctrl.controller('CadastroPragaCtrl', function($scope, $ionicModal, cadastroPragaServices, pragasServices, plantasServices) {
  $scope.cadastro = {
    checked: [],
    plantas: []
  };
  $scope.listaPlantas = [];

  $ionicModal.fromTemplateUrl('templates/praga-cadastro.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalCadastrar = modal;
  });

  $scope.closeCadastrar = function() {
    $scope.modalCadastrar.hide();
  };

  $scope.cadastrar = function() {
    $scope.listaPlantas = plantasServices.listaPlantas;
    $scope.modalCadastrar.show();
  };

  $scope.$watch(function() {
    return $scope.cadastro.checked;
  }, function(value) {
    $scope.cadastro.plantas = [];
    angular.forEach($scope.cadastro.checked, function(boolean, index) {
      boolean && $scope.cadastro.plantas.push(getPlantaByIndex(index));
    });
  }, true);

  function getPlantaByIndex (index) {
    if ($scope.listaPlantas.indexOf(index) == -1) {
      console.log($scope.listaPlantas[index]._id);
      return $scope.listaPlantas[index]._id;
    }
  };

  $scope.doCadastro = function() {
    cadastroPragaServices.postPraga($scope.cadastro)
    .then(function(res) {
      $scope.cadastro = cadastroPragaServices.cadastrarPraga;
      console.log($scope.cadastro);
    });
    pragasServices.getTodasPragas();
    $scope.closeCadastrar();
  };

  cadastroPragaServices.cadastrarPraga = {};
});

appctrl.controller('RemoverPlantaCtrl', function($scope, $ionicModal, plantasServices, removerPlantaServices) {
  $scope.removerSelecionada = [];
  $scope.listaPlantas = [];
  $ionicModal.fromTemplateUrl('templates/planta-delete.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalRemover = modal;
  });

  $scope.isSelectedPlanta = function(planta){
    $scope.removerSelecionada.push($scope.listaPlantas[planta]);
    console.log($scope.removerSelecionada);
  }

  $scope.closeRemover = function() {
    $scope.modalRemover.hide();
  };

  $scope.remover = function() {
    $scope.listaPlantas = plantasServices.listaPlantas;
    $scope.modalRemover.show();
    console.log($scope.listaPlantas);
  };

  $scope.doRemover = function(index) {
    alert("Chegou");
    console.log($scope.listaPlantas[index]);
    removerPlantaServices.deletePlanta($scope.listaPlantas[index])
    .then(function(res) {
      alert("Passou");
      $scope.removerSelecionada = removerPlantaServices.removerPlanta;
      console.log($scope.removerSelecionada);
    });
    $scope.listaPlantas = plantasServices.listaPlantas;
    // $scope.closeRemover();
  };

  removerPlantaServices.removerPlanta = [];
});

appctrl.controller('PesquisarCtrl', function($scope, $rootScope, $ionicModal, $ionicFilterBar, $state) {
  var filterBarInstance;
  // $scope.pesquisar = [];
  $ionicModal.fromTemplateUrl('templates/pesquisar.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalPesquisar = modal;
  });

  $scope.closePesquisar = function() {
    $scope.modalPesquisar.hide();
  };

  $scope.showFilterBar = function () {


    if ($state.is("app.tabs.plantas")) {
      filterBarInstance = $ionicFilterBar.show({
        items: $rootScope.listaPlantas,
        update: function (filteredItems, filterText) {
          $rootScope.listaPlantas = filteredItems;
          // if (filterText) {
          //   console.log(filteredItems);
          //   console.log(filterText);
          // }
        },
        filterProperties: 'nome'
      });
    } else if ($state.is("app.tabs.pragas")) {
      filterBarInstance = $ionicFilterBar.show({
        items: $rootScope.listaPragas,
        update: function (filteredItems, filterText) {
          $rootScope.listaPragas = filteredItems;
        },
        filterProperties: 'nome'
      });
    } else if ($state.is("app.tabs.manejos")) {
      filterBarInstance = $ionicFilterBar.show({
        items: $rootScope.listaManejos,
        update: function (filteredItems, filterText) {
          $rootScope.listaManejos = filteredItems;
        },
        filterProperties: 'nome'
      });
    }
    // console.log($state.current);
  };

});
