"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsModule = void 0;
const common_1 = require("@nestjs/common");
const transactions_controller_1 = require("./transactions.controller");
const transactions_service_1 = require("./transactions.service");
const loans_controller_1 = require("./loans.controller");
const loans_service_1 = require("./loans.service");
let TransactionsModule = class TransactionsModule {
};
exports.TransactionsModule = TransactionsModule;
exports.TransactionsModule = TransactionsModule = __decorate([
    (0, common_1.Module)({
        controllers: [transactions_controller_1.TransactionsController, loans_controller_1.LoansController],
        providers: [transactions_service_1.TransactionsService, loans_service_1.LoansService],
        exports: [transactions_service_1.TransactionsService, loans_service_1.LoansService],
    })
], TransactionsModule);
//# sourceMappingURL=transactions.module.js.map