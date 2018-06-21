import Channel, { ChannelData } from './Channel';
import User from '../User/User';
import { CommercialLength } from './ChannelAPI';

/** @private */
export interface PrivilegedChannelData extends ChannelData {
	stream_key: string;
	email: string;
}

/**
 * A channel you have extended privileges for, i.e. your own channel.
 */
export default class PrivilegedChannel extends Channel {
	/** @private */
	protected _data: PrivilegedChannelData;

	/**
	 * The channel's stream key.
	 */
	get streamKey() {
		return this._data.stream_key;
	}

	/**
	 * Retrieves the list of editors of the channel.
	 */
	async getEditors(): Promise<User[]> {
		return this._client.channels.getChannelEditors(this);
	}

	/**
	 * Starts a commercial in the channel.
	 *
	 * @param length The length of the commercial.
	 */
	async startCommercial(length: CommercialLength) {
		return this._client.channels.startChannelCommercial(this, length);
	}

	/**
	 * Resets the given channel's stream key.
	 */
	async resetStreamKey() {
		const channelData = await this._client.channels.resetChannelStreamKey(this);
		const streamKey = channelData.stream_key;
		this._data.stream_key = streamKey;

		return streamKey;
	}
}
