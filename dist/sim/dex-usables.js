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
var dex_usables_exports = {};
__export(dex_usables_exports, {
  DexUsables: () => DexUsables,
  Usable: () => Usable
});
module.exports = __toCommonJS(dex_usables_exports);
var import_dex_data = require("./dex-data");
class Usable extends import_dex_data.BasicEffect {
  constructor(data) {
    super(data);
    this.fullname = `item: ${this.name}`;
    this.effectType = "Usable";
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
class DexUsables {
  constructor(dex) {
    this.itemCache = /* @__PURE__ */ new Map();
    this.allCache = null;
    this.dex = dex;
  }
  get(name) {
    if (name && typeof name !== "string") return name;
    const id = name ? (0, import_dex_data.toID)(name.trim()) : "";
    return this.getByID(id);
  }
  //	getByID(id: ID): Item {
  //		if (id === '') return EMPTY_ITEM;
  //		let item = this.itemCache.get(id);
  //		if (item) return item;
  //		if (this.dex.getAlias(id)) {
  //			item = this.get(this.dex.getAlias(id));
  //			if (item.exists) {
  //				this.itemCache.set(id, item);
  //			}
  //			return item;
  //		}
  //		if (id && !this.dex.data.Items[id] && this.dex.data.Items[id + 'berry']) {
  //			item = this.getByID(id + 'berry' as ID);
  //			this.itemCache.set(id, item);
  //			return item;
  //		}
  //		if (id && this.dex.data.Items.hasOwnProperty(id)) {
  //			const itemData = this.dex.data.Items[id] as any;
  //			const itemTextData = this.dex.getDescs('Items', id, itemData);
  //			item = new Item({
  //				name: id,
  //				...itemData,
  //				...itemTextData,
  //			});
  //			if (item.gen > this.dex.gen) {
  //				(item as any).isNonstandard = 'Future';
  //			}
  //			if (this.dex.parentMod) {
  //				// If this item is exactly identical to parentMod's item, reuse parentMod's copy
  //				const parent = this.dex.mod(this.dex.parentMod);
  //				if (itemData === parent.data.Items[id]) {
  //					const parentItem = parent.items.getByID(id);
  //					if (
  //						item.isNonstandard === parentItem.isNonstandard &&
  //						item.desc === parentItem.desc &&
  //						item.shortDesc === parentItem.shortDesc
  //					) {
  //						item = parentItem;
  //					}
  //				}
  //			}
  //		} else {
  //			item = new Item({ name: id, exists: false });
  //		}
  //
  //		if (item.exists) this.itemCache.set(id, this.dex.deepFreeze(item));
  //		return item;
  //	}
  //	all(): readonly BagItem[] {
  //		if (this.allCache) return this.allCache;
  //		const items = [];
  //		for (const id in this.dex.data.Items) {
  //			items.push(this.getByID(id as ID));
  //		}
  //		this.allCache = Object.freeze(items);
  //		return this.allCache;
  //	}
}
//# sourceMappingURL=dex-usables.js.map
