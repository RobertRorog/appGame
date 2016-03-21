
var app = angular.module('appGame', []), timeOn=true,
    tabMining = {"tempResGold":0, "tempResStone":0, "tempResWood":0, "tempResStorage":0};


app.controller('mainCtrl', function($scope, $interval){   
    $scope.resGold = 137;
    $scope.resStone = 115;
    $scope.resWood = 123;
    $scope.resStorage = 140;
    $scope.upGold = 1;
    $scope.upStone = 1;
    $scope.upWood = 1;
    $scope.upStorage = 1;    

    tabMining.tempResGold = $scope.resGold;
    tabMining.tempResStone = $scope.resStone;
    tabMining.tempResWood = $scope.resWood;
    tabMining.tempResStorage = $scope.resStorage;

    
    
    $scope.clickLevelUp = function(val){
        switch(val) {
            case 'mineStorage' :
                                console.log(val);
                                $scope.upStorage = $scope.upStorage + 1;  
                                $scope.resStorage = $scope.resStorage + 10;
                                tabMining.tempResStorage = $scope.resStorage;
            break;    
            case 'mineWood' :
                                console.log(val);
                                $scope.upWood = $scope.upWood + 1;  
                                $scope.resWood = $scope.resWood + 10;
                                tabMining.tempResWood = $scope.resWood;
            break;     
            case 'mineStone' :
                                console.log(val);
                                $scope.upStone = $scope.upStone + 1;  
                                $scope.resStone = $scope.resStone + 10;
                                tabMining.tempResStone = $scope.resStone;
            break;    
            case 'mineGold' :
                                console.log(val);
                                $scope.upGold = $scope.upGold + 1;  
                                $scope.resGold = $scope.resGold + 10;
                                tabMining.tempResGold = $scope.resGold;
            break;     
        }
    }
    
    
    $interval(function() {
        if (tabMining.tempResStorage > (tabMining.tempResGold +0.26)) {
            tabMining.tempResGold = tabMining.tempResGold +1.26;
            angular.element(resGold).removeClass('color-red');
            angular.element(resGold).addClass('color-white');
        }
        else {
            tabMining.tempResGold = tabMining.tempResStorage;
            angular.element(resGold).addClass('color-red');
        }
        
        if (tabMining.tempResStorage > (tabMining.tempResStone +1.26)) {
            tabMining.tempResStone = tabMining.tempResStone +1.26;
            angular.element(resStone).removeClass('color-red');
            angular.element(resStone).addClass('color-white');
        }
        else {
            tabMining.tempResStone = tabMining.tempResStorage;    
            angular.element(resStone).addClass('color-red');
        }
        
        if (tabMining.tempResStorage > (tabMining.tempResWood +2.26)) {
            tabMining.tempResWood = tabMining.tempResWood +2.26;
            angular.element(resWood).removeClass('color-red');
            angular.element(resWood).addClass('color-white');
        }
        else {
            tabMining.tempResWood = tabMining.tempResStorage;
            angular.element(resWood).addClass('color-red');
        }
        
        
        $scope.resGold = parseInt(tabMining.tempResGold);
        $scope.resStone = parseInt(tabMining.tempResStone);
        $scope.resWood = parseInt(tabMining.tempResWood);
    }, 1000);
          
});




app.controller('minesInitCtrl', function($scope, minesFactory){   
    function init(){
        minesFactory.getMinesInit().success(
            function(data){
                $scope.mines = data;
            }
        );       
    }    
    init();

});

app.factory('minesFactory', function($http){
    var factory = {}, urlBase = 'app/data/';
    
    factory.getMines = function(){
        return $http.get(urlBase +'resource-data.json');
    };
    
    factory.getMinesInit = function(){
        return $http.get(urlBase +'resource-init.json');
    };
    
    return factory;
});









app.controller('myCurrentTimeCtrl', function($scope, $interval) {});      

app.directive('myCurrentTime', function($interval, dateFilter) {
        return function(scope, element) {
          
          function updateTime() {
            element.text(dateFilter(new Date(), 'y-MM-d hh:mm:ss'));
          }

          $interval(updateTime, 1000);
        }
    }           
);
