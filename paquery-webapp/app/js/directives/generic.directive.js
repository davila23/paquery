PaQuery
    .directive( 'isPassword', function() {
    return {
        restrict : 'A',
        scope: {
            isPassword: '=isPassword'
        },
        link: function (scope, element, attrs) {
            scope.$watch('isPassword', function(a, b){
                element.attr('type', a ? 'text' : 'password')
            })
        }
    }
}).directive('ngJsonExportCsv', function () {
    return {
        restrict: 'AE',
        scope: {
            add: '=',
            parse: '=',
            data : '=',
            filename: '=?',
            reportFields: '=',
            separator: '@'
        },
        link: function (scope, element) {
            scope.filename = !!scope.filename ? scope.filename : 'export-excel';

            var fields = [];
            var header = [];
            var separator = scope.separator || ';';

            angular.forEach(scope.reportFields, function(field, key) {
                if(!field || !key) {
                    throw new Error('error json report fields');
                }

                fields.push(key);
                header.push(field);
            });

            element.bind('click', function() {
                if(scope.data) {
                    _bodyData(scope.data);
                } else {
                    scope.add().then(function(response) {
                        _bodyData(response);
                    }).catch(function() {
                        console.error("ERROR: no se pudo descargar");
                    });
                }
            });

            function _bodyData(response) {

                var data = scope.parse(response.data);
                var body = "";
                angular.forEach(data, function(dataItem) {
                    var rowItems = [];

                    angular.forEach(fields, function(field) {
                        if(field.indexOf('.')) {
                            field = field.split(".");
                            var curItem = dataItem;

                            // deep access to obect property
                            angular.forEach(field, function(prop){
                                if (curItem !== null && curItem !== undefined) {
                                    curItem = curItem[prop];
                                }
                            });

                            data = curItem;
                        }
                        else {
                            data = dataItem[field];
                        }

                        var fieldValue = data !== null ? data : ' ';

                        if (fieldValue !== undefined && angular.isObject(fieldValue)) {
                            fieldValue = _objectToString(fieldValue);
                        }

                        if(typeof fieldValue == 'string') {
                            rowItems.push('"' + fieldValue.replace(/"/g, '""') + '"');
                        } else {
                            rowItems.push(fieldValue);
                        }
                    });

                    body += rowItems.join(separator) + '\n';
                });

                var strData = _convertToExcel(body);

                var blob = new Blob([strData], {type: "text/plain;charset=utf-8"});

                return saveAs(blob, [scope.filename + '.csv']);

            }

            function _convertToExcel(body) {
                return header.join(separator) + '\n' + body;
            }

            function _objectToString(object) {
                var output = '';
                angular.forEach(object, function(value, key) {
                    output += key + ':' + value + ' ';
                });

                return '"' + output + '"';
            }
        }
    };
});