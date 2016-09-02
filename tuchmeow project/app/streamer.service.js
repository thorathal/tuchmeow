System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var StreamerService;
    return {
        setters:[],
        execute: function() {
            StreamerService = (function () {
                function StreamerService() {
                }
                StreamerService.prototype.getItems = function () {
                    return [
                        {
                            name: "Streamer1",
                            url: "test",
                            imageUrl: "http://lorempixel.com/180/140/people/?v=1"
                        },
                        {
                            name: "Streamer2",
                            url: "test",
                            imageUrl: "http://lorempixel.com/180/140/people/?v=2"
                        },
                        {
                            name: "Streamer3",
                            url: "test",
                            imageUrl: "http://lorempixel.com/180/140/people/?v=3"
                        },
                        {
                            name: "Streamer4",
                            url: "test",
                            imageUrl: "http://lorempixel.com/180/140/people/?v=4"
                        },
                        {
                            name: "Streamer5",
                            url: "test",
                            imageUrl: "http://lorempixel.com/180/140/people/?v=5"
                        },
                        {
                            name: "Streamer6",
                            url: "test",
                            imageUrl: "http://lorempixel.com/180/140/people/?v=6"
                        }
                    ];
                };
                return StreamerService;
            }());
            exports_1("StreamerService", StreamerService);
        }
    }
});
//# sourceMappingURL=streamer.service.js.map