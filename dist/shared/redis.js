"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisClient = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const redis_1 = require("redis");
const config_1 = __importDefault(require("../config"));
const logger_1 = require("./logger");
const redisClient = (0, redis_1.createClient)({
    url: config_1.default.redis_url,
});
const redisPubClient = (0, redis_1.createClient)({
    url: config_1.default.redis_url,
});
const redisSubClient = (0, redis_1.createClient)({
    url: config_1.default.redis_url,
});
redisClient.on('error', err => logger_1.logger.error('Redis Error', err));
redisClient.on('connect', info => logger_1.logger.info('Redis Connect successfully'));
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    yield redisClient.connect();
    yield redisPubClient.connect();
    yield redisSubClient.connect();
});
const set = (key, value, options) => __awaiter(void 0, void 0, void 0, function* () {
    yield redisClient.set(key, value, options);
});
const get = (key) => __awaiter(void 0, void 0, void 0, function* () {
    return yield redisClient.get(key);
});
const del = (key) => __awaiter(void 0, void 0, void 0, function* () {
    yield redisClient.del(key);
});
const disconnect = () => __awaiter(void 0, void 0, void 0, function* () {
    yield redisClient.quit();
    yield redisPubClient.quit();
    yield redisSubClient.quit();
});
const setAccessToken = (userId, token) => __awaiter(void 0, void 0, void 0, function* () {
    const key = `access-token:${userId}`;
    yield redisClient.set(key, token, { EX: Number(config_1.default.redis_expire_time) });
});
const getAccessToken = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const key = `access-token:${userId}`;
    return yield redisClient.get(key);
});
const delAccessToken = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const key = `access-token:${userId}`;
    yield redisClient.del(key);
});
exports.RedisClient = {
    connect,
    get,
    set,
    del,
    disconnect,
    setAccessToken,
    getAccessToken,
    delAccessToken,
    publish: redisPubClient.publish.bind(redisPubClient),
    subscribe: redisSubClient.subscribe.bind(redisSubClient),
};
