/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2023/05/26/hexoConfigNote/index.html","2f6d244857b6556820026ebdece03ef0"],["/2023/05/26/hexoConfigNote/mybackground.jpg","20465a1ec36a4d65829558b62d194342"],["/2023/05/26/hexoConfigNote/mycover.png","edd59a6a7b50c20d380b75ce4cd5c0e4"],["/2023/05/26/hexoConfigNote/mytop_img.png","f1dbd2db27c6e25b160ff88fc3df89ca"],["/2023/05/28/CardSpending/index.html","26710856968d977664f590e7726b3cc3"],["/2023/05/28/CardSpending/mycover.png","d5e8cd42c072576b7beede293a7fdca4"],["/2023/05/28/GitNote/index.html","615a3c04b081ade789e1fb6a4f95996d"],["/2023/05/28/GitNote/mycover.jpg","ff14cf345dd627afd85e24c0c8efd10f"],["/2023/05/28/WeatherBroadcast/index.html","8451d3ab5249934342776bb079b98be8"],["/2023/05/28/WeatherBroadcast/mycover.png","61d4255f6e656b387eeadeaa6d9ab993"],["/2023/05/28/dumiNote/index.html","7a7dd438fb555d24faf10e4b892e99dc"],["/2023/05/28/dumiNote/mycover.png","8d69c1f45371c9db3b684d5b9dadcb42"],["/2023/05/28/myNFC/index.html","7aa0ed26a873229912b8e7888fb87908"],["/2023/05/28/myNFC/mycover.jpg","91e42079144f83868156e5c2178e54ce"],["/2023/05/30/vitepressNote/index.html","3c40b78421662b81273ec7d2c0993e8f"],["/2023/06/18/100things/index.html","c5b29ac830f434a8b2edb1b4a4e30df1"],["/2023/06/18/100things/mycover.jpg","755c98b02fd481213390d988a45b1501"],["/2023/06/18/TreasureinLife/index.html","7ccf05ad61e52483a8e0b1c182fc9b51"],["/2023/06/18/TreasureinLife/mycover.png","ff4357fe7b37858ef7ad0980ed3ef795"],["/404.html","2c0774cb13edeaacf8c73f952e541f95"],["/anzhiyu/random.js","ae31f3797a58c9e1a8c7782f5f940ac5"],["/archives/2023/05/index.html","6ba4592b7c65e6776a7ce278e3782127"],["/archives/2023/06/index.html","c004aaa5c0baa1660e8c8f7021cc9e31"],["/archives/2023/index.html","a93b5bd9ed93f429750d228287e7c045"],["/archives/index.html","a276d8df0257725120e40344f9c4cece"],["/categories/index.html","325971fd75aa35c5dff6e448290569ec"],["/categories/生活日常/index.html","93674e5213f14b05040168bf933699a4"],["/css/index.css","be8eb809e6043e6bf1d386d993edd661"],["/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["/images/CardSpending/Screenshot_20230114-134725-1685249167504-7.jpg","a0626cf4c254426636037360c3673ff7"],["/images/CardSpending/Screenshot_20230114-134731-1685249242012-9.jpg","16a6ef4232e3ef1df0f72a1772b62e5c"],["/images/CardSpending/Screenshot_20230114-141614-1685249291919-11.jpg","d5734764e4ed4caa0f346997f2f8fa97"],["/images/CardSpending/Untitled 1-1685249325027-13.png","d5e8cd42c072576b7beede293a7fdca4"],["/images/CardSpending/Untitled 15-1685252038490-19.png","557b6433e59d07665e69687d4877230f"],["/images/CardSpending/Untitled 16-1685252055780-21.png","ee31515e1a9abe33482b83543e01f74a"],["/images/CardSpending/Untitled 17-1685252073223-23.png","9f71a4e1b4e7045ed17b5fa2f762d247"],["/images/CardSpending/Untitled 2-1685249399313-17.png","4c14d2254a312676582672a16406832b"],["/images/CardSpending/Untitled-1685249374298-15.png","fde31ac59ef2e9882900da12d4649b58"],["/images/CardSpending/image-20230528133143833.png","06e5d49a45167322fc5ca4ed56c9098e"],["/images/CardSpending/image-20230528133216623.png","26cca4bfe2d4e30875a6fad99d8b94e1"],["/images/CardSpending/image-20230528133239391.png","40e2c9c26691ebd557c17fba4fd7ef67"],["/images/CardSpending/image-20230528133300931.png","4e34969c05de51678a75db4817c1e6a5"],["/images/GitNote/branches-delete.png","8af4887f870e2b321e5215b62bf84a77"],["/images/GitNote/image-20230528093749248.png","aca0a82bf54e9041de80384e4f4379f9"],["/images/GitNote/image-20230528094312668.png","4abff8280058de215a0347fe1630f9f7"],["/images/GitNote/image-20230528095326943.png","cf08fd82a7e6d16b66c650cd3bfbf0bc"],["/images/GitNote/image-20230528100012067.png","ea6407be718b9cec5417983b265b8782"],["/images/GitNote/image-20230528101552880.png","1286b0927f696c59a3d81a497dda866b"],["/images/OAuth/bg2015092302.jpg","7afc0700640e8baf1e114c241776e3ba"],["/images/OAuth/bg2019042101.jpg","3c3db3cfbb716ee65cd75c50f18f2b21"],["/images/WeatherBroadcast/Untitled 1.png","3c8114076ca830c2f2cd69ffb938d906"],["/images/WeatherBroadcast/Untitled 2.png","49c96869c0c5e89b7bdf86e5bf5b5e57"],["/images/WeatherBroadcast/Untitled 6.png","4a94d93a25ab68d29862d6df5ee6fca0"],["/images/WeatherBroadcast/Untitled 7.png","438babea613b660140ad2b2a0d1af4a5"],["/images/WeatherBroadcast/Untitled 8.png","c41c2f3548393d4762061d9cf356ea0a"],["/images/WeatherBroadcast/Untitled 9.png","8109e5d5f8e0e092477f059f1965e240"],["/images/WeatherBroadcast/image-20230528110917512.png","38f862529c74434b37e672da53e0ba19"],["/images/WeatherBroadcast/image-20230528111026749.png","ea3486a75ad885e6aa76afe60cb23a5d"],["/images/WeatherBroadcast/image-20230528111218099.png","baba831fede4f458f37522a55a918abe"],["/images/WeatherBroadcast/image-20230528112048700.png","b0e3ca938d1daf2ac47fc64e9e5c9d76"],["/images/WeatherBroadcast/image-20230528112110529.png","6caf6a6d6734f6e5960415bf8ecea581"],["/images/WeatherBroadcast/image-20230528112239798.png","699c504f39d21444f69dec00d037bd7c"],["/images/WeatherBroadcast/image-20230528112305880.png","94da283a1aa867e0f8004a8ece30f089"],["/images/WeatherBroadcast/image-20230528112329509.png","baba831fede4f458f37522a55a918abe"],["/images/WeatherBroadcast/image-20230528112345108.png","baba831fede4f458f37522a55a918abe"],["/images/WeatherBroadcast/image-20230528112408350.png","cbc029518e503dac22cc50c4e07ae48a"],["/images/WeatherBroadcast/image-20230528112458417.png","dba12ae9d4cb16a7f45a8bd287810ab7"],["/images/WeatherBroadcast/image-20230528112524704.png","7d5d8ce02d750ac4f7a3ddb036bbf5bc"],["/images/WeatherBroadcast/image-20230528112547986.png","6d90d9fee76aed4537c04108bfd0c9d2"],["/images/dumiNote/image-20230528191439024.png","7c500baaaadf83407ecbc9ec14a0f476"],["/images/dumiNote/image-20230528191442525.png","7c500baaaadf83407ecbc9ec14a0f476"],["/images/dumiNote/image-20230528203012828.png","0baa22a4e7a34dcf15ce34b3e0b4f0ff"],["/images/hexoConfigNote/2023-05-26_152705.png","4dd5c6aa7afb67c56b666aa682b19096"],["/images/hexoConfigNote/Snipaste_2023-05-27_17-56-31.png","3c53443caf7c499ec127a8670500aac1"],["/images/hexoConfigNote/image-20230526192310164.png","bba3047fdba12b2c86c60ea819e72d1e"],["/images/hexoConfigNote/image-20230526192457800.png","653f9adf85a417eeb18a31dee33dfcaa"],["/images/hexoConfigNote/image-20230526192517508.png","8f6b7a28324b8e3a2fdaa18d013d29fe"],["/images/hexoConfigNote/image-20230526192535335.png","4525eb5dc051ba587b0b28d95afe3ac6"],["/images/hexoConfigNote/image-20230526192611019.png","4cb326395ca315b5c1a7d62e69da63c5"],["/images/hexoConfigNote/image-20230526192715672.png","78287417f135d6e0c44b741861a7a0b6"],["/images/hexoConfigNote/image-20230526192735406.png","5431dfb0ce539231ba919669824ebeef"],["/images/hexoConfigNote/image-20230526192827373.png","08cbf2e6ffa511627864e5be188fed83"],["/images/hexoConfigNote/image-20230526193046611.png","4e8c295b86b84dd661590603765c089d"],["/images/hexoConfigNote/image-20230526214207511.png","f51d2c1be18dbbae89c76463000d3450"],["/images/hexoConfigNote/image-20230526214721316.png","8933c544901e4e791c9e80dd8fcc52e0"],["/images/hexoConfigNote/image-20230526214734538.png","74fe2f1553bd0d8f6aec5ab0bdf0eb76"],["/images/hexoConfigNote/image-20230526214745972.png","7e7c10a1ce5d1fc834e1ae730fec33fb"],["/images/hexoConfigNote/image-20230526214802166.png","64825653cad00d534b92619264bc2a0e"],["/images/hexoConfigNote/image-20230526214839842.png","cfccc63eed47118ecc12a0cc4c81de0d"],["/images/hexoConfigNote/image-20230526214857770.png","530ec3e23e50c656d3cb2646f016b86d"],["/images/hexoConfigNote/image-20230526214910920.png","cc717ba16b6a8970015a62741b3831dc"],["/images/hexoConfigNote/image-20230526214924274.png","3fb2325e9a43e1504b4bbc8d2f06add4"],["/images/hexoConfigNote/image-20230526214939187.png","6712c76a5d158a416056e868a270f525"],["/images/hexoConfigNote/image-20230526214948330.png","76153b968fe6b620b6a18d593f03f4e6"],["/images/hexoConfigNote/image-20230526215016301.png","46ea638318243ebdac85965af1889c4c"],["/images/hexoConfigNote/image-20230526215101219.png","d0ccc19bb451a3b9c7962dd2a844f5f0"],["/images/hexoConfigNote/image-20230526215415503.png","9288348ffdb64ac770b8614a4561b719"],["/images/hexoConfigNote/image-20230527173207803.png","d0eb8694d2d20119cfc391b8db185f64"],["/images/myNFC/88162883639770466-1685255179109-3.jpg","73cf8b23f92d904085647c4dee4113db"],["/images/myNFC/Untitled-1685255140308-1.png","f5e98474ef51befad7b099dee7867785"],["/images/myNFC/image-20230528141821319.png","58f89c5f93e75cf9ecf386bb5acc27f0"],["/images/myNFC/image-20230528141851384.png","9f818efe047b34069c4a3859693151b7"],["/images/vitepressNote/2023-05-30_093958.png","d3b92594d469a03d29477e91c40f1f6c"],["/images/vitepressNote/2023-05-30_094604.png","35c0066ef2cf5f7f36e0113251811ce6"],["/images/vitepressNote/2023-05-30_135506.png","a18f4ca0c75c892c809cd95654d8cfee"],["/images/vitepressNote/image-20230530084302643.png","5ae46960148244b4421cb59cd7ace049"],["/images/vitepressNote/image-20230530084634717.png","63436a1ed03353759c0ff0c1c255f05f"],["/images/vitepressNote/image-20230530084747612.png","0fbb6134941646dca1f61e16b9e8108e"],["/images/vitepressNote/image-20230530084853480.png","00ddf461e7f2e70135d00d4670a04362"],["/images/vitepressNote/image-20230530090814042.png","c833f85048d9975bd6a59d4d4ce6b1db"],["/images/vitepressNote/image-20230530105441661.png","51b459f48c080348ef848a2124353cb8"],["/images/vitepressNote/image-20230530135914934.png","a1f94d20193f13e2bcf415a1a5747647"],["/images/vitepressNote/image-20230530140144181.png","29459046d6bf74af3d33f44fda1bb3df"],["/images/vitepressNote/image-20230530140358622.png","615f400b91355be44bb597cc9952f4b9"],["/img/404.jpg","8190796a570d269ef04b777d93d44e6d"],["/img/512.png","701819a72025df4d8e2a111c1c8f2c72"],["/img/algolia.svg","88450dd56ea1a00ba772424b30b7d34d"],["/img/archive_img.jpg","3aa8e86c64f45bcc142fb13226d66b28"],["/img/avatar.jpg","89936b825df1629905efb9220faa08f7"],["/img/comment_bg.png","fe6bbe142eb7dc7b4f876ae4f5af97d0"],["/img/default_cover.jpg","7e500d86b5cda19bfe4d3eb13da7aacd"],["/img/default_top_img.jpg","13bacb768ee5e0ec66fdefa637f6209c"],["/img/friend_404.gif","d09ab53cb5bb15079ce8e3d90b157353"],["/img/green.svg","3d7351316f8d23e85443bfefeb4698e5"],["/img/index_img.jpg","0ead9aeaa5b17c5bd68a3409d03baa50"],["/img/loading.gif","05fb29f4e677ff6057ef55925f46e9b0"],["/img/paycode.png","3783c4764bf819c9e918d1fe5e09edd1"],["/img/red.svg","e3149ec564c29f5ad8df0eb64833c1a7"],["/img/siteicon/16.png","3de470acb5237bf16318d827443dd5f1"],["/img/siteicon/32.png","802aa4685b3652d5a1b6e5a6323cf3c0"],["/img/siteicon/apple-icon-180.png","ac045b7b6012d72ccbcffb07727c7b11"],["/img/siteicon/manifest-icon-192.maskable.png","87c1b5883834c2164e20e737bd5c2517"],["/img/siteicon/manifest-icon-512.maskable.png","85b846b5722c684339c8bb3e520bcc6a"],["/index.html","ad5aad763ab01eb89cf079315ea0a70a"],["/js/main.js","c9ff371f3c50f332a29f41f4c3483665"],["/js/search/algolia.js","dff0d830ab1d005f1eda1ea299c724cc"],["/js/search/local-search.js","0f5dddc0c88389610bae38a044ee7a8a"],["/js/tw_cn.js","bd9f7c3f385d1a9a448243c0bf966625"],["/js/utils.js","fd85cc5176f0290dc1ac0f6eba6e17d5"],["/sw-register.js","a23165da117c08306601f7cbc6e30cae"],["/tags/Android-APP/index.html","866541935c27301dffaad0ab080d5f83"],["/tags/Git/index.html","e3559c1c16da5a5db18975744e023e83"],["/tags/config/index.html","796f958ebd87f93003074fc8bf60113c"],["/tags/index.html","532a6ac99d5596a96569ad3b5c53c5a2"],["/tags/life/index.html","0c8473bc2f7668cb4a2fcc0f10062250"],["/tags/vitepress/index.html","d2f93da60e4bacce35d78d1240fe2045"],["/tags/前端工程化-react/index.html","e5ee55333116b09eecd943216e7e9460"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');
var firstRegister = 1; // 默认1是首次安装SW， 0是SW更新


var ignoreUrlParametersMatching = [/^utm_/];


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var cleanResponse = function (originalResponse) {
    // 如果没有重定向响应，不需干啥
    if (!originalResponse.redirected) {
        return Promise.resolve(originalResponse);
    }

    // Firefox 50 及以下不知处 Response.body 流, 所以我们需要读取整个body以blob形式返回。
    var bodyPromise = 'body' in originalResponse ?
        Promise.resolve(originalResponse.body) :
        originalResponse.blob();

    return bodyPromise.then(function (body) {
        // new Response() 可同时支持 stream or Blob.
        return new Response(body, {
            headers: originalResponse.headers,
            status: originalResponse.status,
            statusText: originalResponse.statusText
        });
    });
};

var createCacheKey = function (originalUrl, paramName, paramValue,
    dontCacheBustUrlsMatching) {

    // 创建一个新的URL对象，避免影响原始URL
    var url = new URL(originalUrl);

    // 如果 dontCacheBustUrlsMatching 值没有设置，或是没有匹配到，将值拼接到url.serach后
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
        url.search += (url.search ? '&' : '') +
            encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
};

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // 如果 whitelist 是空数组，则认为全部都在白名单内
    if (whitelist.length === 0) {
        return true;
    }

    // 否则逐个匹配正则匹配并返回
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function (whitelistedPathRegex) {
        return path.match(whitelistedPathRegex);
    });
};

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // 移除 hash; 查看 https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // 是否包含 '?'
        .split('&') // 分割成数组 'key=value' 的形式
        .map(function (kv) {
            return kv.split('='); // 分割每个 'key=value' 字符串成 [key, value] 形式
        })
        .filter(function (kv) {
            return ignoreUrlParametersMatching.every(function (ignoredRegex) {
                return !ignoredRegex.test(kv[0]); // 如果 key 没有匹配到任何忽略参数正则，就 Return true
            });
        })
        .map(function (kv) {
            return kv.join('='); // 重新把 [key, value] 格式转换为 'key=value' 字符串
        })
        .join('&'); // 将所有参数 'key=value' 以 '&' 拼接

    return url.toString();
};


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
    precacheConfig.map(function (item) {
        var relativeUrl = item[0];
        var hash = item[1];
        var absoluteUrl = new URL(relativeUrl, self.location);
        var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
        return [absoluteUrl.toString(), cacheKey];
    })
);

function setOfCachedUrls(cache) {
    return cache.keys().then(function (requests) {
        // 如果原cacheName中没有缓存任何收，就默认是首次安装，否则认为是SW更新
        if (requests && requests.length > 0) {
            firstRegister = 0; // SW更新
        }
        return requests.map(function (request) {
            return request.url;
        });
    }).then(function (urls) {
        return new Set(urls);
    });
}

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return setOfCachedUrls(cache).then(function (cachedUrls) {
                return Promise.all(
                    Array.from(urlsToCacheKeys.values()).map(function (cacheKey) {
                        // 如果缓存中没有匹配到cacheKey，添加进去
                        if (!cachedUrls.has(cacheKey)) {
                            var request = new Request(cacheKey, { credentials: 'same-origin' });
                            return fetch(request).then(function (response) {
                                // 只要返回200才能继续，否则直接抛错
                                if (!response.ok) {
                                    throw new Error('Request for ' + cacheKey + ' returned a ' +
                                        'response with status ' + response.status);
                                }

                                return cleanResponse(response).then(function (responseToCache) {
                                    return cache.put(cacheKey, responseToCache);
                                });
                            });
                        }
                    })
                );
            });
        })
            .then(function () {
            
            // 强制 SW 状态 installing -> activate
            return self.skipWaiting();
            
        })
    );
});

self.addEventListener('activate', function (event) {
    var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.keys().then(function (existingRequests) {
                return Promise.all(
                    existingRequests.map(function (existingRequest) {
                        // 删除原缓存中相同键值内容
                        if (!setOfExpectedUrls.has(existingRequest.url)) {
                            return cache.delete(existingRequest);
                        }
                    })
                );
            });
        }).then(function () {
            
            return self.clients.claim();
            
        }).then(function () {
                // 如果是首次安装 SW 时, 不发送更新消息（是否是首次安装，通过指定cacheName 中是否有缓存信息判断）
                // 如果不是首次安装，则是内容有更新，需要通知页面重载更新
                if (!firstRegister) {
                    return self.clients.matchAll()
                        .then(function (clients) {
                            if (clients && clients.length) {
                                clients.forEach(function (client) {
                                    client.postMessage('sw.update');
                                })
                            }
                        })
                }
            })
    );
});



    self.addEventListener('fetch', function (event) {
        if (event.request.method === 'GET') {

            // 是否应该 event.respondWith()，需要我们逐步的判断
            // 而且也方便了后期做特殊的特殊
            var shouldRespond;


            // 首先去除已配置的忽略参数及hash
            // 查看缓存简直中是否包含该请求，包含就将shouldRespond 设为true
            var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
            shouldRespond = urlsToCacheKeys.has(url);

            // 如果 shouldRespond 是 false, 我们在url后默认增加 'index.html'
            // (或者是你在配置文件中自行配置的 directoryIndex 参数值)，继续查找缓存列表
            var directoryIndex = 'index.html';
            if (!shouldRespond && directoryIndex) {
                url = addDirectoryIndex(url, directoryIndex);
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 仍是 false，检查是否是navigation
            // request， 如果是的话，判断是否能与 navigateFallbackWhitelist 正则列表匹配
            var navigateFallback = '';
            if (!shouldRespond &&
                navigateFallback &&
                (event.request.mode === 'navigate') &&
                isPathWhitelisted([], event.request.url)
            ) {
                url = new URL(navigateFallback, self.location).toString();
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 被置为 true
            // 则 event.respondWith()匹配缓存返回结果，匹配不成就直接请求.
            if (shouldRespond) {
                event.respondWith(
                    caches.open(cacheName).then(function (cache) {
                        return cache.match(urlsToCacheKeys.get(url)).then(function (response) {
                            if (response) {
                                return response;
                            }
                            throw Error('The cached response that was expected is missing.');
                        });
                    }).catch(function (e) {
                        // 如果捕获到异常错误，直接返回 fetch() 请求资源
                        console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
                        return fetch(event.request);
                    })
                );
            }
        }
    });









/* eslint-enable */
