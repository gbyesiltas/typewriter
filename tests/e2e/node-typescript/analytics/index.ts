/**
 * This client was automatically generated by Segment Typewriter. ** Do Not Edit **
 */

import * as Segment from './segment'

export interface CustomViolationHandler {
	'regex property': string
}
export interface DefaultViolationHandler {
	'regex property': string
}
export interface EveryNullableOptionalType {
	/**
	 * Optional any property
	 */
	'optional any'?: any | null
	/**
	 * Optional array property
	 */
	'optional array'?: any[] | null
	/**
	 * Optional boolean property
	 */
	'optional boolean'?: boolean | null
	/**
	 * Optional integer property
	 */
	'optional int'?: number | null
	/**
	 * Optional number property
	 */
	'optional number'?: number | null
	/**
	 * Optional object property
	 */
	'optional object'?: Record<string, any> | null
	/**
	 * Optional string property
	 */
	'optional string'?: string | null
	/**
	 * Optional string property with a regex conditional
	 */
	'optional string with regex'?: string | null
}
export interface EveryNullableRequiredType {
	/**
	 * Required any property
	 */
	'required any': any | null
	/**
	 * Required array property
	 */
	'required array': any[] | null
	/**
	 * Required boolean property
	 */
	'required boolean': boolean | null
	/**
	 * Required integer property
	 */
	'required int': number | null
	/**
	 * Required number property
	 */
	'required number': number | null
	/**
	 * Required object property
	 */
	'required object': Record<string, any> | null
	/**
	 * Required string property
	 */
	'required string': string | null
	/**
	 * Required string property with a regex conditional
	 */
	'required string with regex': string | null
}
export interface EveryOptionalType {
	/**
	 * Optional any property
	 */
	'optional any'?: any | null
	/**
	 * Optional array property
	 */
	'optional array'?: any[]
	/**
	 * Optional boolean property
	 */
	'optional boolean'?: boolean
	/**
	 * Optional integer property
	 */
	'optional int'?: number
	/**
	 * Optional number property
	 */
	'optional number'?: number
	/**
	 * Optional object property
	 */
	'optional object'?: Record<string, any>
	/**
	 * Optional string property
	 */
	'optional string'?: string
	/**
	 * Optional string property with a regex conditional
	 */
	'optional string with regex'?: string
}
export interface EveryRequiredType {
	/**
	 * Required any property
	 */
	'required any': any | null
	/**
	 * Required array property
	 */
	'required array': any[]
	/**
	 * Required boolean property
	 */
	'required boolean': boolean
	/**
	 * Required integer property
	 */
	'required int': number
	/**
	 * Required number property
	 */
	'required number': number
	/**
	 * Required object property
	 */
	'required object': Record<string, any>
	/**
	 * Required string property
	 */
	'required string': string
	/**
	 * Required string property with a regex conditional
	 */
	'required string with regex': string
}
export interface UniverseCharactersItemItem {
	/**
	 * The character's name.
	 */
	name: string
}
export interface NestedArrays {
	/**
	 * All known characters from each universe.
	 */
	universeCharacters: UniverseCharactersItemItem[][]
}
export interface SubterraneanLab {
	"jerry's memories"?: any[]
	"morty's memories"?: any[]
	"summer's contingency plan"?: string
}
export interface Tunnel {
	'subterranean lab': SubterraneanLab
}
export interface Garage {
	tunnel: Tunnel
}
export interface NestedObjects {
	garage: Garage
}
export interface PropertiesCollided {
	'Property Collided': string
	property_collided: string
}
export interface OccupantsItem {
	/**
	 * The name of this occupant.
	 */
	name: string
}
export interface Universe {
	/**
	 * The common name of this universe.
	 */
	name: string
	/**
	 * The most important occupants in this universe.
	 */
	occupants: OccupantsItem[]
}
export interface PropertyObjectNameCollision1 {
	universe?: Universe
}
export interface OccupantsItem1 {
	/**
	 * The name of this occupant.
	 */
	name: string
}
export interface Universe1 {
	/**
	 * The common name of this universe.
	 */
	name: string
	/**
	 * The most important occupants in this universe.
	 */
	occupants: OccupantsItem1[]
}
export interface PropertyObjectNameCollision2 {
	universe?: Universe1
}
export interface PropertySanitized {
	'0000---terrible-property-name~!3': string
}
export interface ObjectItem {
	name?: string
}
export interface SimpleArrayTypes {
	any?: any[]
	boolean?: boolean[]
	integer?: number[]
	nullable?: string[]
	number?: number[]
	object?: ObjectItem[]
	string?: string[]
}
export interface UnionType {
	universe_name: string | number | null
}

export type ViolationHandler = (
	message: Segment.TrackMessage<Record<string, any>>,
	violations: any[]
) => void

const missingAnalyticsNodeError = new Error(`You must set an analytics-node instance:

>	const SegmentAnalytics = require('analytics-node')
>	const { setTypewriterOptions } = require('./analytics')
>
>	const analytics = new SegmentAnalytics('SEGMENT_WRITE_KEY')
>	setTypewriterOptions({
>		analytics: analytics,
>	})

For more information on analytics-node, see: https://segment.com/docs/sources/server/node/quickstart/
`)

let analytics: () => Segment.AnalyticsNode | undefined = () => {
	throw missingAnalyticsNodeError
}

/** Options to customize the runtime behavior of a Typewriter client. */
export interface TypewriterOptions {
	/**
	 * Underlying analytics instance where analytics calls are forwarded on to.
	 */
	analytics: Segment.AnalyticsNode
	/**
	 * Handler fired when if an event does not match its spec. This handler
	 * does not fire in production mode, because it requires inlining the full
	 * JSON Schema spec for each event in your Tracking Plan.
	 *
	 * By default, it will throw errors if NODE_ENV = "test" so that tests will fail
	 * if a message does not match the spec. Otherwise, errors will be logged to stderr.
	 */
	onViolation?: ViolationHandler
}

/**
 * Updates the run-time configuration of this Typewriter client.
 * This function must be called with a configured analytics-node instance before firing
 * any analytics calls, or else a `missingAnalyticsNodeError` error will be thrown.
 *
 * @param {TypewriterOptions} options - the options to upsert
 *
 * @typedef {Object} TypewriterOptions
 * @property {Segment.AnalyticsNode} analytics - Underlying analytics instance where analytics
 * 		calls are forwarded on to.
 * @property {Function} [onViolation] - Handler fired when if an event does not match its spec. This handler does not fire in
 * 		production mode, because it requires inlining the full JSON Schema spec for each event in your Tracking Plan. By default,
 * 		it will throw errors if NODE_ENV="test" so that tests will fail if a message does not match the spec. Otherwise, errors
 * 		will be logged to stderr.
 */
export function setTypewriterOptions(options: TypewriterOptions) {
	analytics = options.analytics ? () => options.analytics : analytics
}

/**
 * Helper to attach metadata on Typewriter to outbound requests.
 * This is used for attribution and debugging by the Segment team.
 */
function withTypewriterContext<P, T extends Segment.TrackMessage<P>>(
	message: T
): T {
	return {
		...message,
		context: {
			...(message.context || {}),
			typewriter: {
				language: 'typescript',
				version: '7.0.0-42',
			},
		},
	}
}

/**
 * A message payload for an analytics-node `.track()` call.
 * See: https://segment.com/docs/spec/track/
 *
 * @typedef TrackMessage<PropertiesType>
 * @property {string | number} [userId] - The ID for this user in your database.
 * @property {string | number} [anonymousId] - An ID to associated with the user when you don’t know who they are.
 * @property {PropertiesType} [properties] - A dictionary of properties for the event.
 * @property {Date} [timestamp] - A Javascript date object representing when the track took place. If the track
 * 		just happened, leave it out and we’ll use the server’s time. If you’re importing data from the past make
 * 		sure you to send a timestamp.
 * @template PropertiesType
 */

/**
 * @typedef CustomViolationHandler
 * @property {string} regex property -
 */
/**
 * @typedef DefaultViolationHandler
 * @property {string} regex property -
 */
/**
 * @typedef EveryNullableOptionalType
 * @property {any | null} [optional any] - Optional any property
 * @property {any[] | null} [optional array] - Optional array property
 * @property {boolean | null} [optional boolean] - Optional boolean property
 * @property {number | null} [optional int] - Optional integer property
 * @property {number | null} [optional number] - Optional number property
 * @property {Record<string, any> | null} [optional object] - Optional object property
 * @property {string | null} [optional string] - Optional string property
 * @property {string | null} [optional string with regex] - Optional string property with a regex conditional
 */
/**
 * @typedef EveryNullableRequiredType
 * @property {any | null} required any - Required any property
 * @property {any[] | null} required array - Required array property
 * @property {boolean | null} required boolean - Required boolean property
 * @property {number | null} required int - Required integer property
 * @property {number | null} required number - Required number property
 * @property {Record<string, any> | null} required object - Required object property
 * @property {string | null} required string - Required string property
 * @property {string | null} required string with regex - Required string property with a regex conditional
 */
/**
 * @typedef EveryOptionalType
 * @property {any | null} [optional any] - Optional any property
 * @property {any[]} [optional array] - Optional array property
 * @property {boolean} [optional boolean] - Optional boolean property
 * @property {number} [optional int] - Optional integer property
 * @property {number} [optional number] - Optional number property
 * @property {Record<string, any>} [optional object] - Optional object property
 * @property {string} [optional string] - Optional string property
 * @property {string} [optional string with regex] - Optional string property with a regex conditional
 */
/**
 * @typedef EveryRequiredType
 * @property {any | null} required any - Required any property
 * @property {any[]} required array - Required array property
 * @property {boolean} required boolean - Required boolean property
 * @property {number} required int - Required integer property
 * @property {number} required number - Required number property
 * @property {Record<string, any>} required object - Required object property
 * @property {string} required string - Required string property
 * @property {string} required string with regex - Required string property with a regex conditional
 */
/**
 * @typedef UniverseCharactersItemItem
 * @property {string} name - The character's name.
 */
/**
 * @typedef NestedArrays
 * @property {UniverseCharactersItemItem[][]} universeCharacters - All known characters from each universe.
 */
/**
 * @typedef SubterraneanLab
 * @property {any[]} [jerry\'s memories] -
 * @property {any[]} [morty\'s memories] -
 * @property {string} [summer\'s contingency plan] -
 */
/**
 * @typedef Tunnel
 * @property {SubterraneanLab} subterranean lab -
 */
/**
 * @typedef Garage
 * @property {Tunnel} tunnel -
 */
/**
 * @typedef NestedObjects
 * @property {Garage} garage -
 */
/**
 * @typedef PropertiesCollided
 * @property {string} Property Collided -
 * @property {string} property_collided -
 */
/**
 * @typedef OccupantsItem
 * @property {string} name - The name of this occupant.
 */
/**
 * @typedef Universe
 * @property {string} name - The common name of this universe.
 * @property {OccupantsItem[]} occupants - The most important occupants in this universe.
 */
/**
 * @typedef PropertyObjectNameCollision1
 * @property {Universe} [universe] -
 */
/**
 * @typedef OccupantsItem1
 * @property {string} name - The name of this occupant.
 */
/**
 * @typedef Universe1
 * @property {string} name - The common name of this universe.
 * @property {OccupantsItem1[]} occupants - The most important occupants in this universe.
 */
/**
 * @typedef PropertyObjectNameCollision2
 * @property {Universe1} [universe] -
 */
/**
 * @typedef PropertySanitized
 * @property {string} 0000---terrible-property-name~!3 -
 */
/**
 * @typedef ObjectItem
 * @property {string} [name] -
 */
/**
 * @typedef SimpleArrayTypes
 * @property {any[]} [any] -
 * @property {boolean[]} [boolean] -
 * @property {number[]} [integer] -
 * @property {string[]} [nullable] -
 * @property {number[]} [number] -
 * @property {ObjectItem[]} [object] -
 * @property {string[]} [string] -
 */
/**
 * @typedef UnionType
 * @property {string | number | null} universe_name -
 */

/**
 * Validates that clients properly sanitize event names.
 *
 * @param {TrackMessage<Record<string, any>>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
export function I42TerribleEventName3(
	message: Segment.TrackMessage<Record<string, any>>,
	callback?: Segment.Callback
): void {
	const msg = withTypewriterContext({
		properties: {},
		...message,
		event: '42_--terrible==\\"event\'++name~!3',
	})

	const a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
/**
 * Fired before an analytics instance has been set, which should throw an error.
 *
 * @param {TrackMessage<Record<string, any>>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
export function analyticsInstanceMissing(
	message: Segment.TrackMessage<Record<string, any>>,
	callback?: Segment.Callback
): void {
	const msg = withTypewriterContext({
		properties: {},
		...message,
		event: 'Analytics Instance Missing',
	})

	const a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
/**
 * Fired after a client throws an "Analytics Instance Missing" error to mark the test as successful.
 *
 * @param {TrackMessage<Record<string, any>>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
export function analyticsInstanceMissingThrewError(
	message: Segment.TrackMessage<Record<string, any>>,
	callback?: Segment.Callback
): void {
	const msg = withTypewriterContext({
		properties: {},
		...message,
		event: 'Analytics Instance Missing Threw Error',
	})

	const a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
/**
 * Fires a 'Custom Violation Handler' track call.
 *
 * @param {TrackMessage<CustomViolationHandler>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
export function customViolationHandler(
	message: Segment.TrackMessage<CustomViolationHandler>,
	callback?: Segment.Callback
): void {
	const msg = withTypewriterContext({
		properties: {},
		...message,
		event: 'Custom Violation Handler',
	})

	const a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
/**
 * Fires a 'Custom Violation Handler Called' track call.
 *
 * @param {TrackMessage<Record<string, any>>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
export function customViolationHandlerCalled(
	message: Segment.TrackMessage<Record<string, any>>,
	callback?: Segment.Callback
): void {
	const msg = withTypewriterContext({
		properties: {},
		...message,
		event: 'Custom Violation Handler Called',
	})

	const a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
/**
 * Fires a 'Default Violation Handler' track call.
 *
 * @param {TrackMessage<DefaultViolationHandler>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
export function defaultViolationHandler(
	message: Segment.TrackMessage<DefaultViolationHandler>,
	callback?: Segment.Callback
): void {
	const msg = withTypewriterContext({
		properties: {},
		...message,
		event: 'Default Violation Handler',
	})

	const a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
/**
 * Fires a 'Default Violation Handler Called' track call.
 *
 * @param {TrackMessage<Record<string, any>>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
export function defaultViolationHandlerCalled(
	message: Segment.TrackMessage<Record<string, any>>,
	callback?: Segment.Callback
): void {
	const msg = withTypewriterContext({
		properties: {},
		...message,
		event: 'Default Violation Handler Called',
	})

	const a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
/**
 * Fires a 'Empty Event' track call.
 *
 * @param {TrackMessage<Record<string, any>>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
export function emptyEvent(
	message: Segment.TrackMessage<Record<string, any>>,
	callback?: Segment.Callback
): void {
	const msg = withTypewriterContext({
		properties: {},
		...message,
		event: 'Empty Event',
	})

	const a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
/**
 * Fires a 'Event Collided' track call.
 *
 * @param {TrackMessage<Record<string, any>>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
export function eventCollided(
	message: Segment.TrackMessage<Record<string, any>>,
	callback?: Segment.Callback
): void {
	const msg = withTypewriterContext({
		properties: {},
		...message,
		event: 'Event Collided',
	})

	const a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
/**
 * Fires a 'Every Nullable Optional Type' track call.
 *
 * @param {TrackMessage<EveryNullableOptionalType>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
export function everyNullableOptionalType(
	message: Segment.TrackMessage<EveryNullableOptionalType>,
	callback?: Segment.Callback
): void {
	const msg = withTypewriterContext({
		properties: {},
		...message,
		event: 'Every Nullable Optional Type',
	})

	const a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
/**
 * Fires a 'Every Nullable Required Type' track call.
 *
 * @param {TrackMessage<EveryNullableRequiredType>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
export function everyNullableRequiredType(
	message: Segment.TrackMessage<EveryNullableRequiredType>,
	callback?: Segment.Callback
): void {
	const msg = withTypewriterContext({
		properties: {},
		...message,
		event: 'Every Nullable Required Type',
	})

	const a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
/**
 * Fires a 'Every Optional Type' track call.
 *
 * @param {TrackMessage<EveryOptionalType>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
export function everyOptionalType(
	message: Segment.TrackMessage<EveryOptionalType>,
	callback?: Segment.Callback
): void {
	const msg = withTypewriterContext({
		properties: {},
		...message,
		event: 'Every Optional Type',
	})

	const a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
/**
 * Fires a 'Every Required Type' track call.
 *
 * @param {TrackMessage<EveryRequiredType>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
export function everyRequiredType(
	message: Segment.TrackMessage<EveryRequiredType>,
	callback?: Segment.Callback
): void {
	const msg = withTypewriterContext({
		properties: {},
		...message,
		event: 'Every Required Type',
	})

	const a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
/**
 * Fires a 'Nested Arrays' track call.
 *
 * @param {TrackMessage<NestedArrays>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
export function nestedArrays(
	message: Segment.TrackMessage<NestedArrays>,
	callback?: Segment.Callback
): void {
	const msg = withTypewriterContext({
		properties: {},
		...message,
		event: 'Nested Arrays',
	})

	const a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
/**
 * Fires a 'Nested Objects' track call.
 *
 * @param {TrackMessage<NestedObjects>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
export function nestedObjects(
	message: Segment.TrackMessage<NestedObjects>,
	callback?: Segment.Callback
): void {
	const msg = withTypewriterContext({
		properties: {},
		...message,
		event: 'Nested Objects',
	})

	const a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
/**
 * Fires a 'Properties Collided' track call.
 *
 * @param {TrackMessage<PropertiesCollided>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
export function propertiesCollided(
	message: Segment.TrackMessage<PropertiesCollided>,
	callback?: Segment.Callback
): void {
	const msg = withTypewriterContext({
		properties: {},
		...message,
		event: 'Properties Collided',
	})

	const a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
/**
 * Fires a 'Property Object Name Collision #1' track call.
 *
 * @param {TrackMessage<PropertyObjectNameCollision1>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
export function propertyObjectNameCollision1(
	message: Segment.TrackMessage<PropertyObjectNameCollision1>,
	callback?: Segment.Callback
): void {
	const msg = withTypewriterContext({
		properties: {},
		...message,
		event: 'Property Object Name Collision #1',
	})

	const a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
/**
 * Fires a 'Property Object Name Collision #2' track call.
 *
 * @param {TrackMessage<PropertyObjectNameCollision2>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
export function propertyObjectNameCollision2(
	message: Segment.TrackMessage<PropertyObjectNameCollision2>,
	callback?: Segment.Callback
): void {
	const msg = withTypewriterContext({
		properties: {},
		...message,
		event: 'Property Object Name Collision #2',
	})

	const a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
/**
 * Fires a 'Property Sanitized' track call.
 *
 * @param {TrackMessage<PropertySanitized>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
export function propertySanitized(
	message: Segment.TrackMessage<PropertySanitized>,
	callback?: Segment.Callback
): void {
	const msg = withTypewriterContext({
		properties: {},
		...message,
		event: 'Property Sanitized',
	})

	const a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
/**
 * Fires a 'Simple Array Types' track call.
 *
 * @param {TrackMessage<SimpleArrayTypes>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
export function simpleArrayTypes(
	message: Segment.TrackMessage<SimpleArrayTypes>,
	callback?: Segment.Callback
): void {
	const msg = withTypewriterContext({
		properties: {},
		...message,
		event: 'Simple Array Types',
	})

	const a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
/**
 * Fires a 'Union Type' track call.
 *
 * @param {TrackMessage<UnionType>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
export function unionType(
	message: Segment.TrackMessage<UnionType>,
	callback?: Segment.Callback
): void {
	const msg = withTypewriterContext({
		properties: {},
		...message,
		event: 'Union Type',
	})

	const a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
/**
 * Fired if a client correctly handled an unknown method call.
 *
 * @param {TrackMessage<Record<string, any>>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
export function unknownEventHandlerCalled(
	message: Segment.TrackMessage<Record<string, any>>,
	callback?: Segment.Callback
): void {
	const msg = withTypewriterContext({
		properties: {},
		...message,
		event: 'Unknown Event Handler Called',
	})

	const a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
/**
 * Fires a 'event_collided' track call.
 *
 * @param {TrackMessage<Record<string, any>>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
export function eventCollided1(
	message: Segment.TrackMessage<Record<string, any>>,
	callback?: Segment.Callback
): void {
	const msg = withTypewriterContext({
		properties: {},
		...message,
		event: 'event_collided',
	})

	const a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}

const clientAPI = {
	/**
	 * Updates the run-time configuration of this Typewriter client.
	 * This function must be called with a configured analytics-node instance before firing
	 * any analytics calls, or else a `missingAnalyticsNodeError` error will be thrown.
	 *
	 * @param {TypewriterOptions} options - the options to upsert
	 *
	 * @typedef {Object} TypewriterOptions
	 * @property {Segment.AnalyticsNode} analytics - Underlying analytics instance where analytics
	 * 		calls are forwarded on to.
	 * @property {Function} [onViolation] - Handler fired when if an event does not match its spec. This handler does not fire in
	 * 		production mode, because it requires inlining the full JSON Schema spec for each event in your Tracking Plan. By default,
	 * 		it will throw errors if NODE_ENV="test" so that tests will fail if a message does not match the spec. Otherwise, errors
	 * 		will be logged to stderr.
	 */
	setTypewriterOptions,
	/**
	 * Validates that clients properly sanitize event names.
	 *
	 * @param {TrackMessage<Record<string, any>>} message - The analytics properties that will be sent to Segment.
	 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
	 * 		call is fired.
	 */
	I42TerribleEventName3,
	/**
	 * Fired before an analytics instance has been set, which should throw an error.
	 *
	 * @param {TrackMessage<Record<string, any>>} message - The analytics properties that will be sent to Segment.
	 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
	 * 		call is fired.
	 */
	analyticsInstanceMissing,
	/**
	 * Fired after a client throws an "Analytics Instance Missing" error to mark the test as successful.
	 *
	 * @param {TrackMessage<Record<string, any>>} message - The analytics properties that will be sent to Segment.
	 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
	 * 		call is fired.
	 */
	analyticsInstanceMissingThrewError,
	/**
	 * Fires a 'Custom Violation Handler' track call.
	 *
	 * @param {TrackMessage<CustomViolationHandler>} message - The analytics properties that will be sent to Segment.
	 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
	 * 		call is fired.
	 */
	customViolationHandler,
	/**
	 * Fires a 'Custom Violation Handler Called' track call.
	 *
	 * @param {TrackMessage<Record<string, any>>} message - The analytics properties that will be sent to Segment.
	 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
	 * 		call is fired.
	 */
	customViolationHandlerCalled,
	/**
	 * Fires a 'Default Violation Handler' track call.
	 *
	 * @param {TrackMessage<DefaultViolationHandler>} message - The analytics properties that will be sent to Segment.
	 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
	 * 		call is fired.
	 */
	defaultViolationHandler,
	/**
	 * Fires a 'Default Violation Handler Called' track call.
	 *
	 * @param {TrackMessage<Record<string, any>>} message - The analytics properties that will be sent to Segment.
	 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
	 * 		call is fired.
	 */
	defaultViolationHandlerCalled,
	/**
	 * Fires a 'Empty Event' track call.
	 *
	 * @param {TrackMessage<Record<string, any>>} message - The analytics properties that will be sent to Segment.
	 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
	 * 		call is fired.
	 */
	emptyEvent,
	/**
	 * Fires a 'Event Collided' track call.
	 *
	 * @param {TrackMessage<Record<string, any>>} message - The analytics properties that will be sent to Segment.
	 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
	 * 		call is fired.
	 */
	eventCollided,
	/**
	 * Fires a 'Every Nullable Optional Type' track call.
	 *
	 * @param {TrackMessage<EveryNullableOptionalType>} message - The analytics properties that will be sent to Segment.
	 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
	 * 		call is fired.
	 */
	everyNullableOptionalType,
	/**
	 * Fires a 'Every Nullable Required Type' track call.
	 *
	 * @param {TrackMessage<EveryNullableRequiredType>} message - The analytics properties that will be sent to Segment.
	 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
	 * 		call is fired.
	 */
	everyNullableRequiredType,
	/**
	 * Fires a 'Every Optional Type' track call.
	 *
	 * @param {TrackMessage<EveryOptionalType>} message - The analytics properties that will be sent to Segment.
	 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
	 * 		call is fired.
	 */
	everyOptionalType,
	/**
	 * Fires a 'Every Required Type' track call.
	 *
	 * @param {TrackMessage<EveryRequiredType>} message - The analytics properties that will be sent to Segment.
	 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
	 * 		call is fired.
	 */
	everyRequiredType,
	/**
	 * Fires a 'Nested Arrays' track call.
	 *
	 * @param {TrackMessage<NestedArrays>} message - The analytics properties that will be sent to Segment.
	 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
	 * 		call is fired.
	 */
	nestedArrays,
	/**
	 * Fires a 'Nested Objects' track call.
	 *
	 * @param {TrackMessage<NestedObjects>} message - The analytics properties that will be sent to Segment.
	 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
	 * 		call is fired.
	 */
	nestedObjects,
	/**
	 * Fires a 'Properties Collided' track call.
	 *
	 * @param {TrackMessage<PropertiesCollided>} message - The analytics properties that will be sent to Segment.
	 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
	 * 		call is fired.
	 */
	propertiesCollided,
	/**
	 * Fires a 'Property Object Name Collision #1' track call.
	 *
	 * @param {TrackMessage<PropertyObjectNameCollision1>} message - The analytics properties that will be sent to Segment.
	 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
	 * 		call is fired.
	 */
	propertyObjectNameCollision1,
	/**
	 * Fires a 'Property Object Name Collision #2' track call.
	 *
	 * @param {TrackMessage<PropertyObjectNameCollision2>} message - The analytics properties that will be sent to Segment.
	 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
	 * 		call is fired.
	 */
	propertyObjectNameCollision2,
	/**
	 * Fires a 'Property Sanitized' track call.
	 *
	 * @param {TrackMessage<PropertySanitized>} message - The analytics properties that will be sent to Segment.
	 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
	 * 		call is fired.
	 */
	propertySanitized,
	/**
	 * Fires a 'Simple Array Types' track call.
	 *
	 * @param {TrackMessage<SimpleArrayTypes>} message - The analytics properties that will be sent to Segment.
	 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
	 * 		call is fired.
	 */
	simpleArrayTypes,
	/**
	 * Fires a 'Union Type' track call.
	 *
	 * @param {TrackMessage<UnionType>} message - The analytics properties that will be sent to Segment.
	 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
	 * 		call is fired.
	 */
	unionType,
	/**
	 * Fired if a client correctly handled an unknown method call.
	 *
	 * @param {TrackMessage<Record<string, any>>} message - The analytics properties that will be sent to Segment.
	 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
	 * 		call is fired.
	 */
	unknownEventHandlerCalled,
	/**
	 * Fires a 'event_collided' track call.
	 *
	 * @param {TrackMessage<Record<string, any>>} message - The analytics properties that will be sent to Segment.
	 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
	 * 		call is fired.
	 */
	eventCollided1,
}

export default new Proxy<typeof clientAPI>(clientAPI, {
	get(target, method) {
		if (typeof method === 'string' && target.hasOwnProperty(method)) {
			return target[method as keyof typeof clientAPI]
		}

		return () => {
			console.warn(`⚠️  You made an analytics call (${String(
				method
			)}) that can't be found. Either:
    a) Re-generate your typewriter client: \`npm run typewriter\`
    b) Add it to your Tracking Plan: https://app.segment.com/TODO/tracking-plans/TODO`)
			const a = analytics()
			if (a) {
				a.track(
					withTypewriterContext({
						event: 'Unknown Analytics Call Fired',
						properties: {
							method,
						},
						userId: 'typewriter',
					})
				)
			}
		}
	},
})
