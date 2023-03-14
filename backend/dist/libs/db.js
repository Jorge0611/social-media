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
exports.getClient = exports.runQuery = void 0;
const pg_1 = __importDefault(require("pg"));
function runQuery(query, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = getClient();
        client.connect();
        const result = (yield client.query(query, params));
        client.end();
        return result;
    });
}
exports.runQuery = runQuery;
function getClient() {
    const params = {
        host: process.env.PG_HOST,
        port: Number(process.env.PG_PORT) || 5432,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DATABASE,
    };
    return new pg_1.default.Client(params);
}
exports.getClient = getClient;
