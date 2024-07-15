/**
 * @type {import("jsonschema").Schema}
 */
const schema = {
	type: 'object',
	additionalProperties: false,
	properties: {
		userId: {
			type: ['integer', 'string'],
		},
		username: {
			type: ['string'],
		},
		nonEndlessScore: {
			type: ['integer'],
			minimum: -1,
		},
		endlessScore: {
			type: ['integer'],
			minimum: -1,
		},
		oneHourScore: {
			type: ['integer'],
			minimum: -1,
		},
		nonEndlessTime: {
			type: ['integer'],
			minimum: 0,
		},
		endlessTime: {
			type: ['integer'],
			minimum: 0,
		},
		startsFromEndless: {
			type: ['boolean'],
		},
		gameVersion: {
			type: ['string'],
		},
		modVersion: {
			type: ['string'],
		},
	},
	required: ['userId', 'username', 'startsFromEndless', 'gameVersion', 'modVersion'],
};

export default schema;
