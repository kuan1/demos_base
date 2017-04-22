var app = angular.module("myApp",["ngStorage"]);

app.controller("myCtrl",function($scope,$localStorage){
    $scope.btnflag = "true";
    //初始化localStorage
    $scope.$storage = $localStorage.$default({
        users:[]
    });
    $scope.users = $scope.$storage.users;

    //显示模态框
    $scope.addUser = function(){
        $scope.btnflag = true;
        $scope.uname = "";
        $scope.sex = "";
        $scope.tel = "";
        var len = $scope.users.length;
        if(len == 0){
            $scope.uid = 100;
            //console.log($scope.uid)
        }else{
            $scope.uid = parseInt($scope.users[len-1].uid) + 1;
        }
    };

    //增加用户
    $scope.add = function(){
        var newUser = {
            uid:$scope.uid,
            uname:$scope.uname,
            sex:$scope.sex,
            tel:$scope.tel
        };
        if(newUser.uname && newUser.sex && newUser.tel){
            var len = $scope.users.length;
            $scope.users.push(newUser);
            $scope.uid = parseInt($scope.uid) + 1;
            $scope.uname = "";
            $scope.sex = "";
            $scope.tel = "";
        }else{
            alert("内容填写不全");
            console.log($scope.sex)
        }
    };

    //删除用户
    $scope.deleteTr = function(index){
        $scope.users.splice(index,1);
        $scope.checkedArr.splice(index,1);
    };

    //修改用户
    $scope.editTr = function(index){
        $scope.btnflag = false;
        $scope.uid = $scope.users[index].uid;
        $scope.sex = $scope.users[index].sex;
        $scope.tel = $scope.users[index].tel;
        $scope.uname = $scope.users[index].uname;
        $scope.index = index;
    };
    //保存修改
    $scope.save = function(){
        var newUser = {
            uid:$scope.uid,
            uname:$scope.uname,
            sex:$scope.sex,
            tel:$scope.tel
        };
        $scope.users.splice($scope.index,1,newUser)
    };

    //用数组记录单选状态
    var len = $scope.users.length;
    $scope.checkedArr = [];
    for(var i = 0;i < len;i++){
        $scope.checkedArr.push(false);
    }


    //批量删除
    $scope.selectDel = function(){
        selectDel();
    };
    var selectDel = function(){
        for(var i = 0;i < len;i++){
            console.log($scope.checkedArr[i],i);
            if($scope.checkedArr[i]){
                $scope.users.splice(i,1);
                $scope.checkedArr.splice(i,1);
                selectDel();
                break;
            }
        }
    };

    //点击搜索
    $scope.search = function(){
        $scope.keyWord = $scope.searchWord;
        console.log($scope.keyWord);
    };


    //设置全选
    $scope.checkAll=function(){
        if($scope.checked){
            for(var i in $scope.checkedArr){
                $scope.checkedArr[i] = true;
            }
        }else{
            for(var i in $scope.checkedArr){
                $scope.checkedArr[i] = false;
            }
        }
    };

    //判断单选是否全选
    $scope.checkSingle = function(index){
        if($scope.checkedArr.indexOf(false) == -1){
            $scope.checked = true;
        }else{
            $scope.checked = false;
        }
    }
});