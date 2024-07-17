/**
 * @type {import("jsonschema").Schema}
 */
const UpdateScoreSchema = {
	type: 'object',
	additionalProperties: false,
	properties: {
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
	},
};

export default UpdateScoreSchema;
