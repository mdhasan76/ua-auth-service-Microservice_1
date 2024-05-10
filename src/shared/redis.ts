
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { SetOptions, createClient } from 'redis';
import config from '../config';
import { logger } from './logger';

const redisClient = createClient({
  url: config.redis_url,
});
const redisPubClient = createClient({
  url: config.redis_url,
});
const redisSubClient = createClient({
  url: config.redis_url,
});

redisClient.on('error', err => logger.error('Redis Error', err));
redisClient.on('connect', info => logger.info('Redis Connect successfully'));

const connect = async (): Promise<void> => {
  await redisClient.connect();
  await redisPubClient.connect();
  await redisSubClient.connect();
};

const set = async (
  key: string,
  value: string,
  options?: SetOptions
): Promise<void> => {
  await redisClient.set(key, value, options);
};

const get = async (key: string): Promise<string | null> => {
  return await redisClient.get(key);
};

const del = async (key: string): Promise<void> => {
  await redisClient.del(key);
};

const disconnect = async (): Promise<void> => {
  await redisClient.quit();
  await redisPubClient.quit();
  await redisSubClient.quit();
};

const setAccessToken = async (userId: string, token: string): Promise<void> => {
  const key = `access-token:${userId}`;
  await redisClient.set(key, token, { EX: Number(config.redis_expire_time) });
};

const getAccessToken = async (userId: string): Promise<string | null> => {
  const key = `access-token:${userId}`;
  return await redisClient.get(key);
};

const delAccessToken = async (userId: string): Promise<void> => {
  const key = `access-token:${userId}`;
  await redisClient.del(key);
};

export const RedisClient = {
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
