"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.create = exports.find = void 0;
const user_model_1 = require("../models/user.model");
const find = (opts) => (opts === null || opts === void 0 ? void 0 : opts.name) ? user_model_1.mem.filter(u => { var _a; return u.name.toLowerCase().includes(((_a = opts.name) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase()) || ""); }) : user_model_1.mem;
exports.find = find;
const create = (u) => (user_model_1.mem.push(u), user_model_1.mem);
exports.create = create;
const deleteUser = (id) => {
    const found = user_model_1.mem.findIndex(u => u.id === Number(id));
    if (found < 0) {
        return;
    }
    user_model_1.mem.splice(found, 1);
    return user_model_1.mem;
};
exports.deleteUser = deleteUser;
