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
const redis_1 = require("../../../shared/redis");
const academicSemester_constant_1 = require("./academicSemester.constant");
const academicSemester_service_1 = require("./academicSemester.service");
const initAcademicSemesterEvents = () => {
    redis_1.RedisClient.subscribe(academicSemester_constant_1.ACADEMIC_SEMESTER_CREATED, (e) => __awaiter(void 0, void 0, void 0, function* () {
        const parseData = JSON.parse(e);
        yield academicSemester_service_1.AcademicSemesterService.createSemester(parseData);
        console.log(parseData, 'This is auth server');
    }));
};
exports.default = initAcademicSemesterEvents;
