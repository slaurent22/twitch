import { Cacheable, Cached, CachedGetter } from '@d-fischer/cache-decorators';
import { Enumerable } from '@d-fischer/shared-utils';
import type { ApiClient } from '../../../ApiClient';
import type { ChatEmoteData } from './ChatEmote';
import { ChatEmote } from './ChatEmote';

/**
 * A list of emotes.
 */
@Cacheable
export class ChatEmoteList {
	/** @private */
	@Enumerable(false) protected readonly _client: ApiClient;

	/** @private */
	constructor(private readonly _data: ChatEmoteData[], client: ApiClient) {
		this._client = client;
	}

	/**
	 * A list of all emotes in the list.
	 */
	@CachedGetter()
	get emotes(): ChatEmote[] {
		return this._data.map(emote => new ChatEmote(emote, this._client));
	}

	/**
	 * Gets all emotes from the list that are from a given emote set.
	 *
	 * @param setId
	 */
	@Cached()
	getAllFromSet(setId: number): ChatEmote[] {
		return this._data
			.filter(emote => emote.emoticon_set === setId)
			.map(emote => new ChatEmote(emote, this._client));
	}

	/**
	 * Finds a single emote by its ID.
	 *
	 * @param id
	 */
	@Cached()
	getById(id: number): ChatEmote | null {
		const data = this._data.find(emote => emote.id === id);

		return data ? new ChatEmote(data, this._client) : null;
	}
}
