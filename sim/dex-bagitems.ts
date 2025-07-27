import type { PokemonEventMethods, ConditionData } from './dex-conditions';
import { assignMissingFields, BasicEffect, toID } from './dex-data';
import { Utils } from '../lib/utils';

export class BagItem extends BasicEffect implements Readonly<BasicEffect> {
	declare readonly effectType: 'BagItem';

	/** just controls location on the item spritesheet */
	declare readonly num: number;

	/** Is this item a Pokeball? */
	readonly isPokeball: boolean;

	declare readonly condition?: ConditionData;
	declare readonly forcedForme?: string;
	declare readonly isChoice?: boolean;
	declare readonly naturalGift?: { basePower: number, type: string };
	declare readonly spritenum?: number;
	declare readonly boosts?: SparseBoostsTable | false;

	declare readonly onUse?: ((this: Battle, pokemon: Pokemon) => void) | false;
	declare readonly onStart?: (this: Battle, target: Pokemon) => void;
	declare readonly onEnd?: (this: Battle, target: Pokemon) => void;

	constructor(data: AnyObject) {
		super(data);

		this.fullname = `item: ${this.name}`;
		this.effectType = 'BagItem';
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
			// Due to difference in gen 2 item numbering, gen 2 items must be
			// specified manually
		}

		assignMissingFields(this, data);
	}
}

//export class DexBagItems {
//	readonly dex: ModdedDex;
//	readonly itemCache = new Map<ID, Item>();
//	allCache: readonly Item[] | null = null;
//
//	constructor(dex: ModdedDex) {
//		this.dex = dex;
//	}
//
//	get(name?: string | Item): Item {
//		if (name && typeof name !== 'string') return name;
//		const id = name ? toID(name.trim()) : '' as ID;
//		return this.getByID(id);
//	}
//
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
//
//	all(): readonly Item[] {
//		if (this.allCache) return this.allCache;
//		const items = [];
//		for (const id in this.dex.data.Items) {
//			items.push(this.getByID(id as ID));
//		}
//		this.allCache = Object.freeze(items);
//		return this.allCache;
//	}
//}
