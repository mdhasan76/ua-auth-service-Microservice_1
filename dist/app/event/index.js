"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const academicSemester_event_1 = __importDefault(require("../modules/academicSemester/academicSemester.event"));
const user_event_1 = __importDefault(require("../modules/user/user.event"));
const subscribeToEvents = () => {
    (0, academicSemester_event_1.default)();
    (0, user_event_1.default)();
};
exports.default = subscribeToEvents;
