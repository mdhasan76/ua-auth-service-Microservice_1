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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPLOADED_PROFILEIMAGE_IN_CLOUDINERY = void 0;
const redis_1 = require("../../../shared/redis");
exports.UPLOADED_PROFILEIMAGE_IN_CLOUDINERY = 'uploaded-profile-image-in-cloudinery';
const uploadedProfileImage = () => {
    redis_1.RedisClient.subscribe(exports.UPLOADED_PROFILEIMAGE_IN_CLOUDINERY, (e) => __awaiter(void 0, void 0, void 0, function* () {
        const parseData = JSON.parse(e);
        console.log('Uploaded image Subscribe', parseData);
    }));
};
exports.default = uploadedProfileImage;
