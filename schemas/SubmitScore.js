/**
 * @type {import("jsonschema").Schema}
 */
const SubmitScoreSchema = {
	type: 'object',
	additionalProperties: false,
	properties: {
		userId: {
			type: ['integer', 'string'],
		},
		username: {
			type: ['string'],
			maxLength: 256,
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
			maxLength: 32,
		},
		modVersion: {
			type: ['string'],
			maxLength: 32,
		},
	},
	required: ['userId', 'username', 'startsFromEndless', 'gameVersion', 'modVersion'],
};

export default SubmitScoreSchema;
