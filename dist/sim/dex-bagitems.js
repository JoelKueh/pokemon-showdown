"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var dex_bagitems_exports = {};
__export(dex_bagitems_exports, {
  BagItem: () => BagItem
});
module.exports = __toCommonJS(dex_bagitems_exports);
var import_dex_data = require("./dex-data");
class BagItem extends import_dex_data.BasicEffect {
  constructor(data) {
    super(data);
    this.fullname = `item: ${this.name}`;
    this.effectType = "BagItem";
    this.isPokeball = !!data.isPokeball;
    if (!this.gen) {
      if (this.num >= 1124) {
        this.gen = 9;
      } else if (this.num >= 927) {
        this.gen = 8;
      } else if (this.num >= 689) {
        this.gen = 7;
      } else if (this.num >= 577) {
        this.gen = 6;
      } else if (this.num >= 537) {
        this.gen = 5;
      } else if (this.num >= 377) {
        this.gen = 4;
      } else {
        this.gen = 3;
      }
    }
    (0, import_dex_data.assignMissingFields)(this, data);
  }
}
//# sourceMappingURL=dex-bagitems.js.map
