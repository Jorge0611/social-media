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
exports.createUser = exports.getUserByColumn = exports.getUserById = exports.getUsers = void 0;
const db_1 = require("@/libs/db");
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, db_1.runQuery)("SELECT * FROM main.users");
    });
}
exports.getUsers = getUsers;
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, db_1.runQuery)("SELECT * FROM main.users WHERE id = $1", [id]);
    });
}
exports.getUserById = getUserById;
function getUserByColumn(column, value) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "SELECT * FROM main.users WHERE $1 = $2";
        return yield (0, db_1.runQuery)(query, [column, value]);
    });
}
exports.getUserByColumn = getUserByColumn;
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `
    INSERT INTO main.users (username, full_name, description, email, password)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
        const params = [
            user.username,
            user.full_name,
            user.description,
            user.email,
            user.password,
        ];
        if (params)
            return yield (0, db_1.runQuery)(query, params);
    });
}
exports.createUser = createUser;
