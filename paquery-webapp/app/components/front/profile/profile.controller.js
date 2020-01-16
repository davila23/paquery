angular
    .module('PaQuery')
    .controller('FrontProfileController', FrontProfileController);

FrontProfileController.$inject = ['$scope','$state', '$stateParams', 'SessionService', '$timeout', 'UserService', 'AppTypesService', 'ProfileService', '$uibModal', 'ENDPOINT', '$rootScope', '$window', 'TwilioService'];

function FrontProfileController($scope, $state, $stateParams, SessionService, $timeout, UserService, AppTypesService, ProfileService, $uibModal, ENDPOINT, $rootScope, $window, TwilioService) {
    var vm = this;

    angular.extend(vm, {
        save: save,
        profile: { pwd: "" },
        photo: {},
        password: { oldPwd: "", newPwd: "", pwdConfirm: "" },
        setCities: setCities,
        showCountries: false,
        openChangePasswordModal: openChangePasswordModal,
        photoAsyncComes: {},
        getDepositLink:getDepositLink
    });

    init();

    function init() {
        vm.errorMessages = {mobileInvalid : false};
        AppTypesService.getUserTypes().then(function(response) {
            vm.userTypes = response.data
        });
        ProfileService.getUserProfile().then(function(response) {
            vm.profile = response.data;
            vm.profile.mobile = Number(vm.profile.mobile);
            vm.photoAsyncComes(vm.profile.avatar);
            AppTypesService.getCountries().then(function(response) {
                vm.userCountries = response.data;
                $.map(vm.userCountries, function(val, ind) {
                    if (vm.profile.countryID == val.id) {
                        vm.profile.country = val;
                        vm.setCities(vm.profile.country, vm.profile.cityID);
                    }
                });
            });
        });
        ProfileService.getMPAmount().then(function(response) {
          vm.ammount = response.data || 0;
        });
    }

    function setCities(country, id) {
        AppTypesService.getCities(country.id).then(function(response) {
            vm.userCitys = response.data;
            $.map(vm.userCitys, function(val, ind) {
                if (vm.profile.cityID == val.id) {
                    vm.profile.city = val
                }
            })
        });
    }

    function save(form) {
        if (form.$invalid) {
          vm.checkSubmit = true;
          $window.scrollTo(0, 0);
        }else {
            if(vm.profile.mobile){
                TwilioService.validateMobile(vm.profile.country.dialingCode + vm.profile.mobile)
                    .success(function (response) {
                        if(response.data && (response.data.carrier.type).toLowerCase() == 'mobile'){
                            form.$invalid = false;
                            form.inputMobile.$invalid  = false;
                            vm.errorMessages.mobileInvalid = false;
                            updateProfile();
                        }else{
                            form.$invalid = true;
                            form.inputMobile.$invalid  = true;
                            vm.errorMessages.mobileInvalid = true;
                            vm.checkSubmit = true;
                            $window.scrollTo(0, 0);
                        }
                    });
            }else{
                updateProfile();
            }
        }
    }

    function updateProfile(){
        var urlImage;
        vm.checkSubmit = false;
        if (vm.photo.avatar && vm.photo.avatar.indexOf(ENDPOINT) > -1) {
            urlImage = vm.photo.avatar;
            vm.photo.avatar = undefined;
            vm.photo.photoName = undefined;
        }
        UserService.update(vm.profile.id, vm.profile.name, vm.profile.lastName, vm.profile.email, vm.ammount, vm.userTypes.id, vm.profile.country.id, vm.profile.city.id , vm.profile.mobile, vm.profile.password, vm.photo.avatar, vm.photo.photoName)
            .then(function(response) {
                console.log(response);
                if (urlImage) {
                    vm.photoAsyncComes(urlImage);
                } else {
                    $rootScope.$broadcast('profile-picture-change', vm.photo.avatar);
                }
                if (response.data.statusID === 2) {
                    SessionService.logout();
                }
                $state.go("admin.dashboard");
            }, function (error) {
                vm.photoAsyncComes(vm.profile.avatar);
            });
    }

    function openChangePasswordModal() {
        modalInstances();
    }

    function modalInstances() {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'components/front/changePasswordModal/changePassword.html',
            controller: 'FrontChangePasswordController',
            controllerAs: 'vm',
            size: 'modal-sm',
            backdrop: 'static',
            keyboard: true
        });
    }

    function modalDeposit() {
        var modalDeposit = $uibModal.open({
            animation: true,
            templateUrl: 'components/front/profile/modalDeposit/modalDeposit.html',
            controller: 'FrontDepositController',
            controllerAs: 'vm',
            size: 'modal-sm',
            backdrop: 'static',
            keyboard: true
        });
    }

    function getDepositLink() {
      modalDeposit();
    }
    $scope.$on('message', function(event, data){
      if (data.status) {
        $state.reload();
        vm.successMessage = data.data;
      }else {
        vm.errorMessage = data.data;
      }
      ProfileService.getMPAmount().then(function(response) {
        vm.profile.ammount = response.data;
      });
    });

}
