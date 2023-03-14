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
exports.getUserByEmail = exports.getUserById = void 0;
const pg_1 = __importDefault(require("pg"));
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new pg_1.default.Client();
        yield client.connect();
        const result = yield client.query("SELECT * FROM users WHERE id = $1", [id]);
        yield client.end();
        return result.rows[0];
    });
}
exports.getUserById = getUserById;
function getUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new pg_1.default.Client();
        yield client.connect();
        const result = yield client.query("SELECT * FROM users WHERE email = $1", [
            email,
        ]);
        yield client.end();
        return result.rows[0];
    });
}
exports.getUserByEmail = getUserByEmail;
