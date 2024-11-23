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
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const express_validator_1 = require("express-validator");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.get('/list', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield new Promise(r => setTimeout(r, 150));
    res.send((0, user_controller_1.find)());
}));
exports.userRouter.post('/find', (0, express_validator_1.body)("name").isString(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        res.send({ errors: result.array() });
        return;
    }
    yield new Promise(r => setTimeout(r, 150));
    const data = (0, express_validator_1.matchedData)(req);
    res.send((0, user_controller_1.find)(data));
}));
exports.userRouter.post('/create', (0, express_validator_1.body)('id').isInt(), (0, express_validator_1.body)('name').isString(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        res.send({ errors: result.array() });
        return;
    }
    yield new Promise(r => setTimeout(r, 150));
    const data = (0, express_validator_1.matchedData)(req);
    res.send((0, user_controller_1.create)(data));
}));
exports.userRouter.delete('/:id', (0, express_validator_1.param)('id').isInt(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        res.send({ errors: result.array() });
        return;
    }
    yield new Promise(r => setTimeout(r, 150));
    const data = (0, express_validator_1.matchedData)(req);
    res.send((0, user_controller_1.deleteUser)(data.id));
}));
