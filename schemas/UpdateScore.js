/**
 * @type {import("jsonschema").Schema}
 */
const schema = {
	type: 'object',
	additionalProperties: false,
	properties: {
		nonEndlessScore: {
			type: ['number'],
		},
		endlessScore: {
			type: ['number'],
		},
		oneHourScore: {
			type: ['number'],
		},
		nonEndlessTime: {
			type: ['number'],
		},
		endlessTime: {
			type: ['number'],
		},
	},
};

export default schema;
