angular
    .module('PaQuery')
    .directive('photoSelector', photoSelector);

photoSelector.$inject = ['$timeout', 'serverErrorsNotifier', '$interval', 'ENDPOINT'];

function photoSelector($timeout, serverErrorsNotifier, $interval, ENDPOINT) {
    return {
        scope: {
            idPhoto: '@?',
            photo: '=',
            photoName: '=',
            disableSelection: '=',
            photoAsyncComes: '='
        },
        restrict: 'A',
        templateUrl: 'components/shared/photoSelector/photoSelector.html',
        link: function(scope, element, attrs) {

            angular.extend(scope, {
                clickElement: clickElement,
                updatePhotoImage: updatePhotoImage,
                photoAsyncComes: photoAsyncComes
            });

            init();

            function photoAsyncComes(photo) {
                if (photo) {
                    if (photo.indexOf(ENDPOINT) > -1) {
                        scope.photo = photo;
                        //the front profile view case
                        var image = angular.element('#photo');
                        image.attr('src', photo);
                        element.find('.zmdi-camera-bw').hide();
                        scope.enteredByUrl = true;
                    }
                } else {
                    //appending the camera image to the photo container in no photo case
                    updatePhotoImage();
                }
            }

            function clickElement() {
                element.find('.fileinput-preview.photo-div').click();
            }

            element.find('.fileinput-preview.photo-div').bind("click", function() {
                var oldPhoto = scope.photo;
                scope.selected = false;
                if (scope.photo) {
                    var interval = $interval(function() {
                        var photoDiv = element.find('.fileinput-preview.thumbnail.photo-div')[0].childNodes[0];
                        if (photoDiv) {
                            var currentPhoto = photoDiv.src;
                            if (currentPhoto.indexOf('data:image/jpeg;base64,') > -1) {
                                currentPhoto = currentPhoto.replace('data:image/jpeg;base64,', '');
                            } else {
                                if (currentPhoto.indexOf('data:image/png;base64,') > -1) {
                                    currentPhoto = currentPhoto.replace('data:image/png;base64,', '');
                                }
                            }

                            if (scope.photo !== currentPhoto || scope.selected || scope.enteredByUrl) {
                                scope.enteredByUrl = false;
                                $interval.cancel(interval);
                            }
                        } else {
                            element.find('.fileinput-preview.thumbnail.no-photo').replaceWith('<div class="fileinput-preview thumbnail no-photo"  ng-click="clickElement()" data-trigger="fileinput"> <span class="zmdi zmdi-camera-bw" style="color:  #0db8b2;font-size: 30px;"></span></div>');
                            scope.photo = undefined;
                            scope.photoName = undefined;
                            $interval.cancel(interval);
                        }
                    }, 100);
                }
            });

            function updatePhotoImage() {
                $timeout(function() {
                    // element.find('.fileinput-preview.thumbnail').append('<span class="zmdi zmdi-camera-bw" style="color:  #0db8b2;font-size: 30px;"></span>');
                }, 0);
            }

            function init() {
                if (scope.photo) {
                    if (scope.photo.indexOf(ENDPOINT) > -1) {
                        //the src photo case, when the photo comes from the lists
                        setTimeout(()=> {
                            var image = angular.element('#photo' + (scope.idPhoto ? '-'+scope.idPhoto : ''));
                            image.attr('src', scope.photo);
                        }, 100);
                    }
                } else {
                    //appending the camera image to the photo container in no photo case
                    updatePhotoImage();
                }

                if (!scope.disableSelection) {
                    element.find('.fileinput').on("change.bs.fileinput", function(val, file) {
                        if (file) {
                            var correctFormat = hasCorrectFormat(file.type),
                                correctSize = hasCorrectSize(file.size);
                            if (correctFormat && correctSize) {
                                $timeout(function() {
                                    var photoSrc = element.find('.fileinput-preview.thumbnail')[0].childNodes[0].src;
                                    if (photoSrc.indexOf('data:image/jpeg;base64,') > -1) {
                                        scope.photo = photoSrc.replace('data:image/jpeg;base64,', '');
                                    } else {
                                        if (photoSrc.indexOf('data:image/png;base64,') > -1) {
                                            scope.photo = photoSrc.replace('data:image/png;base64,', '');
                                        }
                                    }
                                    scope.photoName = file.name;
                                    scope.selected = true;
                                });
                            } else {
                                scope.photo = undefined;
                                scope.photoName = undefined;
                                if (!correctFormat) {
                                    serverErrorsNotifier.notify('La imágen debe tener formato jpg o png.');
                                } else {
                                    if (!correctSize) {
                                        serverErrorsNotifier.notify('La imágen supera el tamaño permitido de 2 megabytes');
                                    }
                                }
                            }
                        } else {
                            element.find('.fileinput-preview.thumbnail.no-photo').replaceWith('<div class="fileinput-preview thumbnail no-photo"  ng-click="clickElement()" data-trigger="fileinput"> <span class="zmdi zmdi-camera-bw" style="color:  #0db8b2;font-size: 30px;"></span></div>');
                            $timeout(function() {
                                scope.photo = undefined;
                                scope.photoName = undefined;
                            });
                            serverErrorsNotifier.notify('La imágen debe tener formato jpg o png.');
                        }
                    });
                    element.find('.fileinput').on("clear.bs.fileinput", function(val) {
                        scope.photo = undefined;
                    });
                } else {
                    element.find('.fileinput-preview').on("click", function(event) {
                        event.stopPropagation();
                    });
                    $timeout(function() {
                        element.find('#mCSB_1_container .image-selector .fileinput-preview').addClass('default-cursor-on-hover');
                    });
                }
            }

            function hasCorrectFormat(format) {
                format = format.toLowerCase();
                return format.indexOf('jpg') !== -1 || format.indexOf('jpeg') !== -1 || format.indexOf('png') !== -1;
            }

            function hasCorrectSize(size) {
                return size < 2000000;
            }

        }
    }
}
