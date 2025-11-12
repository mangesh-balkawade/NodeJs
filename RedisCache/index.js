const common=require("./app");
common.redisSet();
common.redisGet("mykey")