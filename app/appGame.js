 var app = angular.module('appGame',[]),
    tabMining = {"tempResGold":0, "tempResStone":0, "tempResWood":0, "tempResStorage":0,"init":0};



app.controller('mainCtrl',
    ['$rootScope', '$scope', '$interval', '$http', '$q', 'factoryMinesData','factoryUpdateMines', 
    function($rootScope, $scope, $interval, $http, $q, factoryMinesData, factoryUpdateMines){   

        $scope.loadFeed = function(url) {
            
            
            factoryMinesData.getData().then(function(data){  
                $scope.listOfMines   = data[1];
                             
                return data;
            }).then(function(data){  
               $scope.listDataMines   = data[0];
                               
                return data;
            }).then(function(data){
                console.log($scope.listOfMines);
                console.log($scope.listDataMines);
                
               $scope.resGold       = data[1][0].resources.res;
               $scope.resStone      = data[1][1].resources.res;
               $scope.resWood       = data[1][2].resources.res;
               $scope.resStorage    = data[1][3].resources.res;

                $scope.upGold    = 1;
                $scope.upStone   = 1;
                $scope.upWood    = 1;
                $scope.upStorage = 1;   

                tabMining.tempResGold       = $scope.resGold;
                tabMining.tempResStone      = $scope.resStone;
                tabMining.tempResWood       = $scope.resWood;
                tabMining.tempResStorage    = $scope.resStorage;
                
                $('#mydiv').hide();
               
            });  
		}

		$scope.loadFeed();
        
   
   
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
                                
                                console.log('Gold: '+ $scope.resGold);
                                console.log('Stone: '+ $scope.resStone);
                                console.log('Wood: '+ $scope.resWood);
                                
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
         
    
}]);


app.factory('factoryUpdateMines', function myServiceFactory() {
  return {
      updateData: function(){
          
      }
  }
}); 

app.factory('factoryMinesData', ['$http', '$q', function myServiceFactory( $http, $q) {
  return {
    getData: function() {
      var urlBase = 'app/data/';
      var ResourceDataURL = urlBase +'resource-data.json';
      var ResourceInitURL = urlBase +'resource-init.json';
 
      var defer = $q.defer();
      var ResourceData = $http.get(ResourceDataURL, { cache: 'true'});
      var ResourceInitData = $http.get(ResourceInitURL, { cache: 'true'});
 
      $q.when( $q.all([ResourceData, ResourceInitData]) ).then(function(data) {
        finalData = [data[0].data, data[1].data];
        defer.resolve(finalData);
      });
      return defer.promise;
    }
  }
}]);

app.controller('myCurrentTimeCtrl', ['$scope', '$interval',function($scope, $interval) {}]);      

app.directive('myCurrentTime',['$interval', 'dateFilter', function($interval, dateFilter) {
        return function(scope, element) {
          
          function updateTime() {
            element.text(dateFilter(new Date(), 'y-MM-d hh:mm:ss'));
          }

          $interval(updateTime, 1000);
        }
    }           
]);
