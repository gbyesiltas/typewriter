'use strict'
/**
 * This client was automatically generated by Segment Typewriter. ** Do Not Edit **
 */
var __assign =
	(this && this.__assign) ||
	function() {
		__assign =
			Object.assign ||
			function(t) {
				for (var s, i = 1, n = arguments.length; i < n; i++) {
					s = arguments[i]
					for (var p in s)
						if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
				}
				return t
			}
		return __assign.apply(this, arguments)
	}
var __importDefault =
	(this && this.__importDefault) ||
	function(mod) {
		return mod && mod.__esModule ? mod : { default: mod }
	}
Object.defineProperty(exports, '__esModule', { value: true })
/**
 * Ajv is a peer dependency for development builds. It's used to apply run-time validation
 * to message payloads before passing them on to the underlying analytics instance.
 *
 * Note that the production bundle does not depend on Ajv.
 *
 * You can install it with: `npm install --save-dev ajv`.
 */
var ajv_1 = __importDefault(require('ajv'))
/**
 * The default handler that is fired if none is supplied with setTypewriterOptions.
 * If NODE_ENV="test", this handler will throw an error. Otherwise, it will log
 * a warning message to the console.
 */
exports.defaultValidationErrorHandler = function(message, violations) {
	var msg = JSON.stringify(
		{
			type: 'Typewriter JSON Schema Validation Error',
			description:
				'You made an analytics call (' +
				message.event +
				") using Typewriter that doesn't match the " +
				'Tracking Plan spec. Your analytics call will continue to fire in production.',
			errors: violations,
		},
		undefined,
		2
	)
	if (process.env.NODE_ENV === 'test') {
		throw new Error(msg)
	}
	console.warn(msg)
}
var onViolation = exports.defaultValidationErrorHandler
var missingAnalyticsNodeError = new Error(
	"You must set an analytics-node instance:\n\n>\tconst SegmentAnalytics = require('analytics-node')\n>\tconst { setTypewriterOptions } = require('./analytics')\n>\n>\tconst analytics = new SegmentAnalytics('SEGMENT_WRITE_KEY')\n>\tsetTypewriterOptions({\n>\t\tanalytics: analytics,\n>\t})\n\nFor more information on analytics-node, see: https://segment.com/docs/sources/server/node/quickstart/\n"
)
var analytics = function() {
	throw missingAnalyticsNodeError
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
 * @property {Function} [onViolation] - Handler fired when if an event does not match its spec. Returns a boolean indicating
 * 		if the message should still be sent to Segment. This handler does not fire in production mode, because it requires
 * 		inlining the full JSON Schema spec for each event in your Tracking Plan. By default, it will throw errors if NODE_ENV
 * 		= "test" so that tests will fail if a message does not match the spec. Otherwise, errors will be logged to stderr.
 */
function setTypewriterOptions(options) {
	analytics = options.analytics
		? function() {
				return options.analytics
		  }
		: analytics
	onViolation = options.onViolation || onViolation
}
exports.setTypewriterOptions = setTypewriterOptions
/**
 * Validates a message against a JSON Schema using Ajv. If the message
 * is invalid, the `onViolation` handler will be called.
 * Returns a boolean indicating if the message should be sent on to Segment.
 */
function matchesSchema(message, schema) {
	var ajv = new ajv_1.default({
		schemaId: 'auto',
		allErrors: true,
		verbose: true,
	})
	ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'))
	ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'))
	if (!ajv.validate(schema, message) && ajv.errors) {
		onViolation(message, ajv.errors)
		return false
	}
	return true
}
/**
 * Helper to attach metadata on Typewriter to outbound requests.
 * This is used for attribution and debugging by the Segment team.
 */
function withTypewriterContext(message) {
	return __assign({}, message, {
		context: __assign({}, message.context || {}, {
			typewriter: {
				language: 'javascript',
				version: '7.0.0',
			},
		}),
	})
}
/**
 * A message payload for an analytics-node `.track()` call.
 * See: https://segment.com/docs/spec/track/
 *
 * @typedef TrackMessage<PropertiesType>
 * @property {string | number} userId - The ID for this user in your database.
 * @property {string | number} [anonymousId] - An ID to associated with the user when you don’t know who they are.
 * @property {PropertiesType} [properties] - A dictionary of properties for the event.
 * @property {Date} [timestamp] - A Javascript date object representing when the track took place. If the track
 * 		just happened, leave it out and we’ll use the server’s time. If you’re importing data from the past make
 * 		sure you to send a timestamp.
 * @template PropertiesType
 */
/**
 * @typedef CustomViolationHandler
 * @property {string} `regex property` -
 */
/**
 * @typedef DefaultViolationHandler
 * @property {string} `regex property` -
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
 * @property {any | null} `required any` - Required any property
 * @property {any[] | null} `required array` - Required array property
 * @property {boolean | null} `required boolean` - Required boolean property
 * @property {number | null} `required int` - Required integer property
 * @property {number | null} `required number` - Required number property
 * @property {Record<string, any> | null} `required object` - Required object property
 * @property {string | null} `required string` - Required string property
 * @property {string | null} `required string with regex` - Required string property with a regex conditional
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
 * @property {any | null} `required any` - Required any property
 * @property {any[]} `required array` - Required array property
 * @property {boolean} `required boolean` - Required boolean property
 * @property {number} `required int` - Required integer property
 * @property {number} `required number` - Required number property
 * @property {Record<string, any>} `required object` - Required object property
 * @property {string} `required string` - Required string property
 * @property {string} `required string with regex` - Required string property with a regex conditional
 */
/**
 * @typedef UniverseCharacters
 * @property {string} `name` - The character's name.
 */
/**
 * @typedef NestedArrays
 * @property {UniverseCharacters[][]} `universeCharacters` - All known characters from each universe.
 */
/**
 * @typedef SubterraneanLab
 * @property {any[]} [jerry\'s memories] -
 * @property {any[]} [morty\'s memories] -
 * @property {string} [summer\'s contingency plan] -
 */
/**
 * @typedef Tunnel
 * @property {SubterraneanLab} `subterranean lab` -
 */
/**
 * @typedef Garage
 * @property {Tunnel} `tunnel` -
 */
/**
 * @typedef NestedObjects
 * @property {Garage} `garage` -
 */
/**
 * @typedef PropertiesCollided
 * @property {string} `Property Collided` -
 * @property {string} `property_collided` -
 */
/**
 * @typedef Occupants
 * @property {string} `name` - The name of this occupant.
 */
/**
 * @typedef Universe
 * @property {string} `name` - The common name of this universe.
 * @property {Occupants[]} `occupants` - The most important occupants in this universe.
 */
/**
 * @typedef PropertyObjectNameCollision1
 * @property {Universe} [universe] -
 */
/**
 * @typedef Occupants1
 * @property {string} `name` - The name of this occupant.
 */
/**
 * @typedef Universe1
 * @property {string} `name` - The common name of this universe.
 * @property {Occupants1[]} `occupants` - The most important occupants in this universe.
 */
/**
 * @typedef PropertyObjectNameCollision2
 * @property {Universe1} [universe] -
 */
/**
 * @typedef PropertySanitized
 * @property {string} `0000---terrible-property-name~!3` -
 */
/**
 * @typedef Object
 * @property {string} [name] -
 */
/**
 * @typedef SimpleArrayTypes
 * @property {any[]} [any] -
 * @property {boolean[]} [boolean] -
 * @property {number[]} [integer] -
 * @property {string[]} [nullable] -
 * @property {number[]} [number] -
 * @property {Object[]} [object] -
 * @property {string[]} [string] -
 */
/**
 * @typedef UnionType
 * @property {string | number | null} `universe_name` -
 */
/**
 * Fires a '42_--terrible==\\"event\'++name~!3' track call.
 *
 * @param {TrackMessage<Record<string, any>>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
function I42TerribleEventName3(message, callback) {
	var msg = withTypewriterContext(
		__assign({ properties: {} }, message, {
			event: '42_--terrible==\\"event\'++name~!3',
		})
	)
	var schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		labels: {},
		properties: {
			context: {},
			properties: {
				type: 'object',
			},
			traits: {
				type: 'object',
			},
		},
		type: 'object',
		title: '42_--terrible==\\"event\'++name~!3',
	}
	if (!matchesSchema(msg, schema)) {
		return
	}
	var a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
exports.I42TerribleEventName3 = I42TerribleEventName3
/**
 * Fires a 'Analytics Instance Missing' track call.
 *
 * @param {TrackMessage<Record<string, any>>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
function analyticsInstanceMissing(message, callback) {
	var msg = withTypewriterContext(
		__assign({ properties: {} }, message, {
			event: 'Analytics Instance Missing',
		})
	)
	var schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		labels: {},
		properties: {
			context: {},
			properties: {
				type: 'object',
			},
			traits: {
				type: 'object',
			},
		},
		type: 'object',
		title: 'Analytics Instance Missing',
	}
	if (!matchesSchema(msg, schema)) {
		return
	}
	var a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
exports.analyticsInstanceMissing = analyticsInstanceMissing
/**
 * Fires a 'Analytics Instance Missing Threw Error' track call.
 *
 * @param {TrackMessage<Record<string, any>>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
function analyticsInstanceMissingThrewError(message, callback) {
	var msg = withTypewriterContext(
		__assign({ properties: {} }, message, {
			event: 'Analytics Instance Missing Threw Error',
		})
	)
	var schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		labels: {},
		properties: {
			context: {},
			properties: {
				type: 'object',
			},
			traits: {
				type: 'object',
			},
		},
		type: 'object',
		title: 'Analytics Instance Missing Threw Error',
	}
	if (!matchesSchema(msg, schema)) {
		return
	}
	var a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
exports.analyticsInstanceMissingThrewError = analyticsInstanceMissingThrewError
/**
 * Fires a 'Custom Violation Handler' track call.
 *
 * @param {TrackMessage<CustomViolationHandler>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
function customViolationHandler(message, callback) {
	var msg = withTypewriterContext(
		__assign({ properties: {} }, message, { event: 'Custom Violation Handler' })
	)
	var schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		labels: {},
		properties: {
			context: {},
			properties: {
				properties: {
					'regex property': {
						description: '',
						pattern: 'Lawyer Morty|Evil Morty',
						type: 'string',
					},
				},
				required: ['regex property'],
				type: 'object',
			},
			traits: {
				type: 'object',
			},
		},
		required: ['properties'],
		type: 'object',
		title: 'Custom Violation Handler',
	}
	if (!matchesSchema(msg, schema)) {
		return
	}
	var a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
exports.customViolationHandler = customViolationHandler
/**
 * Fires a 'Custom Violation Handler Called' track call.
 *
 * @param {TrackMessage<Record<string, any>>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
function customViolationHandlerCalled(message, callback) {
	var msg = withTypewriterContext(
		__assign({ properties: {} }, message, {
			event: 'Custom Violation Handler Called',
		})
	)
	var schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		labels: {},
		properties: {
			context: {},
			properties: {
				type: 'object',
			},
			traits: {
				type: 'object',
			},
		},
		type: 'object',
		title: 'Custom Violation Handler Called',
	}
	if (!matchesSchema(msg, schema)) {
		return
	}
	var a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
exports.customViolationHandlerCalled = customViolationHandlerCalled
/**
 * Fires a 'Default Violation Handler' track call.
 *
 * @param {TrackMessage<DefaultViolationHandler>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
function defaultViolationHandler(message, callback) {
	var msg = withTypewriterContext(
		__assign({ properties: {} }, message, {
			event: 'Default Violation Handler',
		})
	)
	var schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		labels: {},
		properties: {
			context: {},
			properties: {
				properties: {
					'regex property': {
						description: '',
						pattern: 'Lawyer Morty|Evil Morty',
						type: 'string',
					},
				},
				required: ['regex property'],
				type: 'object',
			},
			traits: {
				type: 'object',
			},
		},
		required: ['properties'],
		type: 'object',
		title: 'Default Violation Handler',
	}
	if (!matchesSchema(msg, schema)) {
		return
	}
	var a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
exports.defaultViolationHandler = defaultViolationHandler
/**
 * Fires a 'Default Violation Handler Called' track call.
 *
 * @param {TrackMessage<Record<string, any>>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
function defaultViolationHandlerCalled(message, callback) {
	var msg = withTypewriterContext(
		__assign({ properties: {} }, message, {
			event: 'Default Violation Handler Called',
		})
	)
	var schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		labels: {},
		properties: {
			context: {},
			properties: {
				type: 'object',
			},
			traits: {
				type: 'object',
			},
		},
		type: 'object',
		title: 'Default Violation Handler Called',
	}
	if (!matchesSchema(msg, schema)) {
		return
	}
	var a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
exports.defaultViolationHandlerCalled = defaultViolationHandlerCalled
/**
 * Fires a 'Empty Event' track call.
 *
 * @param {TrackMessage<Record<string, any>>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
function emptyEvent(message, callback) {
	var msg = withTypewriterContext(
		__assign({ properties: {} }, message, { event: 'Empty Event' })
	)
	var schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		labels: {},
		properties: {
			context: {},
			properties: {
				type: 'object',
			},
			traits: {
				type: 'object',
			},
		},
		type: 'object',
		title: 'Empty Event',
	}
	if (!matchesSchema(msg, schema)) {
		return
	}
	var a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
exports.emptyEvent = emptyEvent
/**
 * Fires a 'Event Collided' track call.
 *
 * @param {TrackMessage<Record<string, any>>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
function eventCollided(message, callback) {
	var msg = withTypewriterContext(
		__assign({ properties: {} }, message, { event: 'Event Collided' })
	)
	var schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		labels: {},
		properties: {
			context: {},
			properties: {
				type: 'object',
			},
			traits: {
				type: 'object',
			},
		},
		type: 'object',
		title: 'Event Collided',
	}
	if (!matchesSchema(msg, schema)) {
		return
	}
	var a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
exports.eventCollided = eventCollided
/**
 * Fires a 'Every Nullable Optional Type' track call.
 *
 * @param {TrackMessage<EveryNullableOptionalType>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
function everyNullableOptionalType(message, callback) {
	var msg = withTypewriterContext(
		__assign({ properties: {} }, message, {
			event: 'Every Nullable Optional Type',
		})
	)
	var schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		properties: {
			context: {},
			properties: {
				properties: {
					'optional any': {
						description: 'Optional any property',
					},
					'optional array': {
						description: 'Optional array property',
						type: ['array', 'null'],
					},
					'optional boolean': {
						description: 'Optional boolean property',
						type: ['boolean', 'null'],
					},
					'optional int': {
						description: 'Optional integer property',
						type: ['integer', 'null'],
					},
					'optional number': {
						description: 'Optional number property',
						type: ['number', 'null'],
					},
					'optional object': {
						description: 'Optional object property',
						properties: {},
						required: [],
						type: ['object', 'null'],
					},
					'optional string': {
						description: 'Optional string property',
						type: ['string', 'null'],
					},
					'optional string with regex': {
						description: 'Optional string property with a regex conditional',
						pattern: 'Evil Morty|Lawyer Morty',
						type: ['string', 'null'],
					},
				},
				type: 'object',
			},
			traits: {},
		},
		type: 'object',
		title: 'Every Nullable Optional Type',
	}
	if (!matchesSchema(msg, schema)) {
		return
	}
	var a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
exports.everyNullableOptionalType = everyNullableOptionalType
/**
 * Fires a 'Every Nullable Required Type' track call.
 *
 * @param {TrackMessage<EveryNullableRequiredType>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
function everyNullableRequiredType(message, callback) {
	var msg = withTypewriterContext(
		__assign({ properties: {} }, message, {
			event: 'Every Nullable Required Type',
		})
	)
	var schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		properties: {
			context: {},
			properties: {
				properties: {
					'required any': {
						description: 'Required any property',
					},
					'required array': {
						description: 'Required array property',
						type: ['array', 'null'],
					},
					'required boolean': {
						description: 'Required boolean property',
						type: ['boolean', 'null'],
					},
					'required int': {
						description: 'Required integer property',
						type: ['integer', 'null'],
					},
					'required number': {
						description: 'Required number property',
						type: ['number', 'null'],
					},
					'required object': {
						description: 'Required object property',
						properties: {},
						required: [],
						type: ['object', 'null'],
					},
					'required string': {
						description: 'Required string property',
						type: ['string', 'null'],
					},
					'required string with regex': {
						description: 'Required string property with a regex conditional',
						pattern: 'Evil Morty|Lawyer Morty',
						type: ['string', 'null'],
					},
				},
				required: [
					'required any',
					'required array',
					'required boolean',
					'required int',
					'required number',
					'required object',
					'required string',
					'required string with regex',
				],
				type: 'object',
			},
			traits: {},
		},
		required: ['properties'],
		type: 'object',
		title: 'Every Nullable Required Type',
	}
	if (!matchesSchema(msg, schema)) {
		return
	}
	var a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
exports.everyNullableRequiredType = everyNullableRequiredType
/**
 * Fires a 'Every Optional Type' track call.
 *
 * @param {TrackMessage<EveryOptionalType>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
function everyOptionalType(message, callback) {
	var msg = withTypewriterContext(
		__assign({ properties: {} }, message, { event: 'Every Optional Type' })
	)
	var schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		properties: {
			context: {},
			properties: {
				properties: {
					'optional any': {
						description: 'Optional any property',
					},
					'optional array': {
						description: 'Optional array property',
						type: 'array',
					},
					'optional boolean': {
						description: 'Optional boolean property',
						type: 'boolean',
					},
					'optional int': {
						description: 'Optional integer property',
						type: 'integer',
					},
					'optional number': {
						description: 'Optional number property',
						type: 'number',
					},
					'optional object': {
						description: 'Optional object property',
						key: 'optional object',
						properties: {},
						required: [],
						type: 'object',
					},
					'optional string': {
						description: 'Optional string property',
						type: 'string',
					},
					'optional string with regex': {
						description: 'Optional string property with a regex conditional',
						pattern: 'Evil Morty|Lawyer Morty',
						type: 'string',
					},
				},
				type: 'object',
			},
			traits: {},
		},
		type: 'object',
		title: 'Every Optional Type',
	}
	if (!matchesSchema(msg, schema)) {
		return
	}
	var a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
exports.everyOptionalType = everyOptionalType
/**
 * Fires a 'Every Required Type' track call.
 *
 * @param {TrackMessage<EveryRequiredType>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
function everyRequiredType(message, callback) {
	var msg = withTypewriterContext(
		__assign({ properties: {} }, message, { event: 'Every Required Type' })
	)
	var schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		properties: {
			context: {},
			properties: {
				properties: {
					'required any': {
						description: 'Required any property',
					},
					'required array': {
						description: 'Required array property',
						type: 'array',
					},
					'required boolean': {
						description: 'Required boolean property',
						type: 'boolean',
					},
					'required int': {
						description: 'Required integer property',
						type: 'integer',
					},
					'required number': {
						description: 'Required number property',
						type: 'number',
					},
					'required object': {
						description: 'Required object property',
						key: 'required object',
						properties: {},
						required: [],
						type: 'object',
					},
					'required string': {
						description: 'Required string property',
						type: 'string',
					},
					'required string with regex': {
						description: 'Required string property with a regex conditional',
						pattern: 'Evil Morty|Lawyer Morty',
						type: 'string',
					},
				},
				required: [
					'required any',
					'required array',
					'required boolean',
					'required int',
					'required number',
					'required object',
					'required string',
					'required string with regex',
				],
				type: 'object',
			},
			traits: {},
		},
		required: ['properties'],
		type: 'object',
		title: 'Every Required Type',
	}
	if (!matchesSchema(msg, schema)) {
		return
	}
	var a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
exports.everyRequiredType = everyRequiredType
/**
 * Fires a 'Nested Arrays' track call.
 *
 * @param {TrackMessage<NestedArrays>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
function nestedArrays(message, callback) {
	var msg = withTypewriterContext(
		__assign({ properties: {} }, message, { event: 'Nested Arrays' })
	)
	var schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		labels: {},
		properties: {
			context: {},
			properties: {
				properties: {
					universeCharacters: {
						description: 'All known characters from each universe.',
						items: {
							description: '',
							items: {
								description: '',
								properties: {
									name: {
										description: "The character's name.",
										type: 'string',
									},
								},
								required: ['name'],
								type: 'object',
							},
							type: 'array',
						},
						type: 'array',
					},
				},
				required: ['universeCharacters'],
				type: 'object',
			},
			traits: {
				type: 'object',
			},
		},
		required: ['properties'],
		type: 'object',
		title: 'Nested Arrays',
	}
	if (!matchesSchema(msg, schema)) {
		return
	}
	var a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
exports.nestedArrays = nestedArrays
/**
 * Fires a 'Nested Objects' track call.
 *
 * @param {TrackMessage<NestedObjects>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
function nestedObjects(message, callback) {
	var msg = withTypewriterContext(
		__assign({ properties: {} }, message, { event: 'Nested Objects' })
	)
	var schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		labels: {},
		properties: {
			context: {},
			properties: {
				properties: {
					garage: {
						description: '',
						properties: {
							tunnel: {
								description: '',
								properties: {
									'subterranean lab': {
										description: '',
										properties: {
											"jerry's memories": {
												description: '',
												type: 'array',
											},
											"morty's memories": {
												description: '',
												type: 'array',
											},
											"summer's contingency plan": {
												description: '',
												type: 'string',
											},
										},
										required: [],
										type: 'object',
									},
								},
								required: ['subterranean lab'],
								type: 'object',
							},
						},
						required: ['tunnel'],
						type: 'object',
					},
				},
				required: ['garage'],
				type: 'object',
			},
			traits: {
				type: 'object',
			},
		},
		required: ['properties'],
		type: 'object',
		title: 'Nested Objects',
	}
	if (!matchesSchema(msg, schema)) {
		return
	}
	var a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
exports.nestedObjects = nestedObjects
/**
 * Fires a 'Properties Collided' track call.
 *
 * @param {TrackMessage<PropertiesCollided>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
function propertiesCollided(message, callback) {
	var msg = withTypewriterContext(
		__assign({ properties: {} }, message, { event: 'Properties Collided' })
	)
	var schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		labels: {},
		properties: {
			context: {},
			properties: {
				properties: {
					'Property Collided': {
						description: '',
						type: 'string',
					},
					property_collided: {
						description: '',
						type: 'string',
					},
				},
				required: ['property_collided', 'Property Collided'],
				type: 'object',
			},
			traits: {
				type: 'object',
			},
		},
		required: ['properties'],
		type: 'object',
		title: 'Properties Collided',
	}
	if (!matchesSchema(msg, schema)) {
		return
	}
	var a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
exports.propertiesCollided = propertiesCollided
/**
 * Fires a 'Property Object Name Collision #1' track call.
 *
 * @param {TrackMessage<PropertyObjectNameCollision1>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
function propertyObjectNameCollision1(message, callback) {
	var msg = withTypewriterContext(
		__assign({ properties: {} }, message, {
			event: 'Property Object Name Collision #1',
		})
	)
	var schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		labels: {},
		properties: {
			context: {},
			properties: {
				properties: {
					universe: {
						description: '',
						properties: {
							name: {
								description: 'The common name of this universe.',
								type: 'string',
							},
							occupants: {
								description: 'The most important occupants in this universe.',
								items: {
									description: '',
									properties: {
										name: {
											description: 'The name of this occupant.',
											type: 'string',
										},
									},
									required: ['name'],
									type: 'object',
								},
								type: 'array',
							},
						},
						required: ['name', 'occupants'],
						type: 'object',
					},
				},
				type: 'object',
			},
			traits: {
				type: 'object',
			},
		},
		type: 'object',
		title: 'Property Object Name Collision #1',
	}
	if (!matchesSchema(msg, schema)) {
		return
	}
	var a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
exports.propertyObjectNameCollision1 = propertyObjectNameCollision1
/**
 * Fires a 'Property Object Name Collision #2' track call.
 *
 * @param {TrackMessage<PropertyObjectNameCollision2>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
function propertyObjectNameCollision2(message, callback) {
	var msg = withTypewriterContext(
		__assign({ properties: {} }, message, {
			event: 'Property Object Name Collision #2',
		})
	)
	var schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		labels: {},
		properties: {
			context: {},
			properties: {
				properties: {
					universe: {
						description: '',
						properties: {
							name: {
								description: 'The common name of this universe.',
								type: 'string',
							},
							occupants: {
								description: 'The most important occupants in this universe.',
								items: {
									description: '',
									properties: {
										name: {
											description: 'The name of this occupant.',
											type: 'string',
										},
									},
									required: ['name'],
									type: 'object',
								},
								type: 'array',
							},
						},
						required: ['name', 'occupants'],
						type: 'object',
					},
				},
				type: 'object',
			},
			traits: {
				type: 'object',
			},
		},
		type: 'object',
		title: 'Property Object Name Collision #2',
	}
	if (!matchesSchema(msg, schema)) {
		return
	}
	var a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
exports.propertyObjectNameCollision2 = propertyObjectNameCollision2
/**
 * Fires a 'Property Sanitized' track call.
 *
 * @param {TrackMessage<PropertySanitized>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
function propertySanitized(message, callback) {
	var msg = withTypewriterContext(
		__assign({ properties: {} }, message, { event: 'Property Sanitized' })
	)
	var schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		labels: {},
		properties: {
			context: {},
			properties: {
				properties: {
					'0000---terrible-property-name~!3': {
						description: '',
						type: 'string',
					},
				},
				required: ['0000---terrible-property-name~!3'],
				type: 'object',
			},
			traits: {
				type: 'object',
			},
		},
		required: ['properties'],
		type: 'object',
		title: 'Property Sanitized',
	}
	if (!matchesSchema(msg, schema)) {
		return
	}
	var a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
exports.propertySanitized = propertySanitized
/**
 * Fires a 'Simple Array Types' track call.
 *
 * @param {TrackMessage<SimpleArrayTypes>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
function simpleArrayTypes(message, callback) {
	var msg = withTypewriterContext(
		__assign({ properties: {} }, message, { event: 'Simple Array Types' })
	)
	var schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		labels: {},
		properties: {
			context: {},
			properties: {
				properties: {
					any: {
						description: '',
						items: {
							description: '',
						},
						type: 'array',
					},
					boolean: {
						description: '',
						items: {
							description: '',
							type: 'boolean',
						},
						type: 'array',
					},
					integer: {
						description: '',
						items: {
							description: '',
							type: 'integer',
						},
						type: 'array',
					},
					nullable: {
						description: '',
						items: {
							description: '',
							type: ['string', 'null'],
						},
						type: 'array',
					},
					number: {
						description: '',
						items: {
							description: '',
							type: 'number',
						},
						type: 'array',
					},
					object: {
						description: '',
						items: {
							description: '',
							properties: {
								name: {
									description: '',
									type: 'string',
								},
							},
							required: [],
							type: 'object',
						},
						type: 'array',
					},
					string: {
						description: '',
						items: {
							description: '',
							type: 'string',
						},
						type: 'array',
					},
				},
				type: 'object',
			},
			traits: {
				type: 'object',
			},
		},
		type: 'object',
		title: 'Simple Array Types',
	}
	if (!matchesSchema(msg, schema)) {
		return
	}
	var a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
exports.simpleArrayTypes = simpleArrayTypes
/**
 * Fires a 'Union Type' track call.
 *
 * @param {TrackMessage<UnionType>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
function unionType(message, callback) {
	var msg = withTypewriterContext(
		__assign({ properties: {} }, message, { event: 'Union Type' })
	)
	var schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		labels: {},
		properties: {
			context: {},
			properties: {
				properties: {
					universe_name: {
						description: '',
						type: ['string', 'null', 'integer'],
					},
				},
				required: ['universe_name'],
				type: 'object',
			},
			traits: {
				type: 'object',
			},
		},
		required: ['properties'],
		type: 'object',
		title: 'Union Type',
	}
	if (!matchesSchema(msg, schema)) {
		return
	}
	var a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
exports.unionType = unionType
/**
 * Fires a 'event_collided' track call.
 *
 * @param {TrackMessage<Record<string, any>>} message - The analytics properties that will be sent to Segment.
 * @param {Function} [callback] - An optional callback called after a short timeout after the analytics
 * 		call is fired.
 */
function eventCollided1(message, callback) {
	var msg = withTypewriterContext(
		__assign({ properties: {} }, message, { event: 'event_collided' })
	)
	var schema = {
		$schema: 'http://json-schema.org/draft-07/schema#',
		labels: {},
		properties: {
			context: {},
			properties: {
				type: 'object',
			},
			traits: {
				type: 'object',
			},
		},
		type: 'object',
		title: 'event_collided',
	}
	if (!matchesSchema(msg, schema)) {
		return
	}
	var a = analytics()
	if (a) {
		a.track(msg, callback)
	} else {
		throw missingAnalyticsNodeError
	}
}
exports.eventCollided1 = eventCollided1
