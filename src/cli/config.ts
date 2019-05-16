import * as fs from 'fs'
import { promisify } from 'util'
import { resolve } from 'path'
import * as yaml from 'js-yaml'
import { generateFromTemplate } from '../templates'
import * as Ajv from 'ajv'

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const exists = promisify(fs.exists)

// A config, stored in a typewriter.yml file.
// Note: `typewriter.yml.schema.json` must match with this interface.
export interface Config {
	path: string
	tokenCommand?: string
	language: Language
	trackingPlans: TrackingPlan[]
}

export interface Language {
	name: string
	// TODO: language-specific options
}

export interface TrackingPlan {
	name?: string
	id: string
	workspaceSlug: string
	events?: {
		// Note: when we support Event Versioning in the Config API,
		// then we will support numeric values here, which will map to versions.
		[key: string]: 'latest'
	}
}

// Want to learn TOML? See: https://learnxinyminutes.com/docs/toml/
const TYPEWRITER_CONFIG_NAME = 'typewriter.yml'

async function getPath(path: string): Promise<string> {
	// TODO: recursively move back folders until you find it, ala package.json
	return resolve(path, TYPEWRITER_CONFIG_NAME)
}

// getDefaultPath returns the default path for Typewriter to write
// clients and Tracking Plans to.
export async function getDefaultPath(
	path?: string | undefined
): Promise<string> {
	return resolve(path || './typewriter')
}

// getConfig looks for, and reads, a typewriter.yml configuration file.
// If it does not exist, it will return undefined. If the configuration
// if invalid, an Error will be thrown.
// Note: path is relative to the directory where the typewriter command
// was run.
export async function getConfig(path = './'): Promise<Config | undefined> {
	// Check if typewriter.yml exists
	const configPath = await getPath(path)
	if (!(await exists(configPath))) {
		return undefined
	}

	const file = await readFile(configPath, {
		encoding: 'utf-8',
	})
	const rawConfig = yaml.safeLoad(file)

	// Validate the provided configuration file using JSON Schema.
	const schema = JSON.parse(
		await readFile(resolve(__dirname, './typewriter.yml.schema.json'), {
			encoding: 'utf-8',
		})
	)
	const ajv = new Ajv({ schemaId: 'auto', allErrors: true, verbose: true })
	if (!ajv.validate(schema, rawConfig) && ajv.errors) {
		let error = 'Invalid `typewriter.yml`:\n'
		for (var ajvError of ajv.errors) {
			// Remove the "." prefix from the data path.
			const dataPath = ajvError.dataPath.replace(/^\./, '')
			error += `	- ${dataPath.length > 0 ? `${dataPath}: ` : ''}${
				ajvError.message
			}\n`
		}

		// TODO: think of a better way to throw an error, such that we can render it better
		// than the way yargs handles uncaught errors. Catch and render?
		throw new Error(error)
	}

	const rawConfigWithDefaults = {
		...(rawConfig as object),
		path: await getDefaultPath(rawConfig.path as string),
	}

	// We can safely type cast the config, now that is has been validated.
	return rawConfigWithDefaults as Config
}

// setConfig writes a config out to a typewriter.yml file.
// Note path is relative to the directory where the typewriter command
// was run.
export async function setConfig(config: Config, path = './') {
	const file = await generateFromTemplate<Config>(
		'cli/typewriter.yml.hbs',
		config
	)

	await writeFile(await getPath(path), file)
}
