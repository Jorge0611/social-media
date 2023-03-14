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
const user_controller_1 = require("@/controllers/user.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, user_controller_1.getUsers)();
    res.json(result.rows);
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, user_controller_1.getUserById)(req.params.id);
    res.json(result.rows[0]);
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, user_controller_1.createUser)(req.body);
    if (result)
        res.json(result.rows[0]);
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, user_controller_1.updateUser)(req.body);
    if (result)
        res.json(result.rows[0]);
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, user_controller_1.deleteUser)(req.params.id);
    if (result)
        res.json(result.rows[0]);
}));
exports.default = router;
