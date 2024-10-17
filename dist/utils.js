"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paiseToRupees = exports.rupeesToPaise = void 0;
const rupeesToPaise = (rupees) => Math.round(rupees * 100);
exports.rupeesToPaise = rupeesToPaise;
const paiseToRupees = (paise) => paise / 100;
exports.paiseToRupees = paiseToRupees;
