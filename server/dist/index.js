"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_router_1 = require("./routers/user.router");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
}));
app.use(body_parser_1.default.json());
app.use('/user', user_router_1.userRouter);
app.listen(4000, () => console.log("Listening on port 4000"));