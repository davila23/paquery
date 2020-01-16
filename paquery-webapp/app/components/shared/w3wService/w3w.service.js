(function() {
  'use strict';

  angular.module('PaQuery')
    .factory('W3wSerice', w3wSerice);

  w3wSerice.$inject = ['UrlHelper'];

  let storage = {};

  const cacheable = function(fn, nameCache) {

      // let storage = localStorage;

      if (!storage.cache)
          storage.cache = {};

      if (!storage.cache[nameCache])
          storage.cache[nameCache] = {};

      return function(key) {

          const cachedValue = storage.cache[nameCache][key];

          if (cachedValue) {
              // console.log("get cacheado :", value);
              return Promise.resolve(cachedValue);
          }

          return fn(key).then(function(resp) {
              storage.cache[nameCache][key] = resp;
              // console.log("set value cacheado :", value);
              return resp;
          });
      };
  };

  function w3wSerice(UrlHelper) {
    var factory = {
      getW3w: getW3w,
      getLatAndLong: cacheable(getLatAndLong,'wordsW3W'),
      getByAddress: cacheable(getByAddress, 'wordsByAddress'),
      isAValidWord: isAValidWord
    };
    return factory;

    function getW3w(lat, long) {
      var url = 'api/integration/getw3wbylatlong',
        config = {
          latitude: lat + '',
          longitude: long + ''
        };

      return UrlHelper.get(url, config);
    }

    function getLatAndLong(words) {
      var url = 'api/integration/getw3wbyword',
        config = {
          words: words
        };

      return UrlHelper.get(url, config);
    }

    function getByAddress(address) {
        var url = 'api/integration/getw3wbyaddress',
          config = {
              address: address
          };

        return UrlHelper.get(url, config);
    }

      function isAValidWord(word) {
          var repetitions = 0;
          if (word) {
              for (var i = 0; i < word.length; i++) {
                  if (word[i] === '.') {
                      repetitions++;
                  }
              }
          }

          return repetitions === 2;
      }
  }
})();
