import { getEnumMemberName } from "@zwave-js/shared";
import { IntegerLimits } from "./Primitive";

const isIntegerRegex = /^\d+$/;

/** Returns an array with the values of a numeric enum */
export function getNumericEnumValues<T extends Record<string, any>>(
	enumeration: T,
): readonly number[] {
	return Object.keys(enumeration)
		.filter((val) => isIntegerRegex.test(val))
		.map((val) => parseInt(val, 10));
}

/** Takes an enumeration and an array of values of this enumeration and returns a states record to be used as metadata */
export function enumValuesToMetadataStates<T extends Record<string, any>>(
	enumeration: T,
	values?: readonly number[],
): Record<number, string> {
	const ret: Record<number, string> = {};
	if (values == undefined) values = getNumericEnumValues(enumeration);
	for (const value of values) {
		ret[value] = getEnumMemberName(enumeration, value);
	}
	return ret;
}

export type ValueType =
	| "number"
	| "boolean"
	| "string"
	| "number[]"
	| "boolean[]"
	| "string[]"
	| "any";

export interface ValueMetadataBase {
	/** The type of the value */
	type: ValueType;
	/** Whether the value can be read. By default all values are assumed readable */
	readable: boolean;
	/** Whether the value can be written. By default all values are assumed writeable */
	writeable: boolean;
	/** A description of the value */
	description?: string;
	/** A human-readable name for the property */
	label?: string;
	/** CC-specific information to help identify this value */
	ccSpecific?: Record<string, any>;
}

export interface ValueMetadataAny extends ValueMetadataBase {
	/** The default value */
	default?: any;
}

export interface ValueMetadataNumeric extends ValueMetadataBase {
	type: "number";
	/** The minimum value that can be assigned to a CC value (optional) */
	min?: number;
	/** The maximum value that can be assigned to a CC value (optional) */
	max?: number;
	/** When only certain values between min and max are allowed, this determines the step size */
	steps?: number;
	/** The default value */
	default?: number;
	/** Speaking names for numeric values */
	states?: Record<number, string>;
	/** An optional unit for numeric values */
	unit?: string;
}

export interface ValueMetadataBoolean extends ValueMetadataBase {
	type: "boolean";
	/** The default value */
	default?: number;
}

export interface ValueMetadataString extends ValueMetadataBase {
	type: "string";
	/** The minimum length this string must have (optional) */
	minLength?: number;
	/** The maximum length this string may have (optional) */
	maxLength?: number;
	/** The default value */
	default?: string;
}

export type ValueMetadata =
	| ValueMetadataAny
	| ValueMetadataNumeric
	| ValueMetadataBoolean
	| ValueMetadataString;

// TODO: lists of allowed values, etc...

// Mixins for value metadata
const _default: ValueMetadataBase = {
	type: "any",
	readable: true,
	writeable: true,
};

const _readonly = {
	writeable: false,
};

const _writeonly = {
	readable: false,
};

/** The default value for metadata: readable and writeable */
const Any: ValueMetadataAny = {
	..._default,
};

/** The default value for readonly metadata */
const ReadOnly: ValueMetadataBase = {
	..._default,
	..._readonly,
};

/** The default value for writeonly metadata */
const WriteOnly: ValueMetadataBase = {
	..._default,
	..._writeonly,
};

/** A boolean value */
const Boolean: ValueMetadataBoolean = {
	..._default,
	type: "boolean",
};

/** A boolean value (readonly) */
const ReadOnlyBoolean: ValueMetadataBoolean = {
	...Boolean,
	..._readonly,
};

/** A boolean value (writeonly) */
const WriteOnlyBoolean: ValueMetadataBoolean = {
	...Boolean,
	..._writeonly,
};

/** Any number */
const Number: ValueMetadataNumeric = {
	..._default,
	type: "number",
};

/** Unsigned number (readonly) */
const ReadOnlyNumber: ValueMetadataNumeric = {
	...Number,
	..._readonly,
};

/** Unsigned number (writeonly) */
const WriteOnlyNumber: ValueMetadataNumeric = {
	...Number,
	..._writeonly,
};

/** Unsigned 8-bit integer */
const UInt8: ValueMetadataNumeric = {
	..._default,
	type: "number",
	...IntegerLimits.UInt8,
};

/** Unsigned 8-bit integer (readonly) */
const ReadOnlyUInt8: ValueMetadataNumeric = {
	...UInt8,
	..._readonly,
};

/** Unsigned 8-bit integer (writeonly) */
const WriteOnlyUInt8: ValueMetadataNumeric = {
	...UInt8,
	..._writeonly,
};

/** Unsigned 16-bit integer */
const UInt16: ValueMetadataNumeric = {
	..._default,
	type: "number",
	...IntegerLimits.UInt16,
};

/** Unsigned 16-bit integer (readonly) */
const ReadOnlyUInt16: ValueMetadataNumeric = {
	...UInt16,
	..._readonly,
};

/** Unsigned 16-bit integer (writeonly) */
const WriteOnlyUInt16: ValueMetadataNumeric = {
	...UInt16,
	..._writeonly,
};

/** Unsigned 24-bit integer */
const UInt24: ValueMetadataNumeric = {
	..._default,
	type: "number",
	...IntegerLimits.UInt24,
};

/** Unsigned 24-bit integer (readonly) */
const ReadOnlyUInt24: ValueMetadataNumeric = {
	...UInt24,
	..._readonly,
};

/** Unsigned 24-bit integer (writeonly) */
const WriteOnlyUInt24: ValueMetadataNumeric = {
	...UInt24,
	..._writeonly,
};

/** Unsigned 32-bit integer */
const UInt32: ValueMetadataNumeric = {
	..._default,
	type: "number",
	...IntegerLimits.UInt32,
};

/** Unsigned 32-bit integer (readonly) */
const ReadOnlyUInt32: ValueMetadataNumeric = {
	...UInt32,
	..._readonly,
};

/** Unsigned 32-bit integer (writeonly) */
const WriteOnlyUInt32: ValueMetadataNumeric = {
	...UInt32,
	..._writeonly,
};

/** Signed 8-bit integer */
const Int8: ValueMetadataNumeric = {
	..._default,
	type: "number",
	...IntegerLimits.Int8,
};

/** Signed 8-bit integer (readonly) */
const ReadOnlyInt8: ValueMetadataNumeric = {
	...Int8,
	..._readonly,
};

/** Signed 8-bit integer (writeonly) */
const WriteOnlyInt8: ValueMetadataNumeric = {
	...Int8,
	..._writeonly,
};

/** Signed 16-bit integer */
const Int16: ValueMetadataNumeric = {
	..._default,
	type: "number",
	...IntegerLimits.Int16,
};

/** Signed 16-bit integer (readonly) */
const ReadOnlyInt16: ValueMetadataNumeric = {
	...Int16,
	..._readonly,
};

/** Signed 16-bit integer (writeonly) */
const WriteOnlyInt16: ValueMetadataNumeric = {
	...Int16,
	..._writeonly,
};

/** Signed 24-bit integer */
const Int24: ValueMetadataNumeric = {
	..._default,
	type: "number",
	...IntegerLimits.Int24,
};

/** Signed 24-bit integer (readonly) */
const ReadOnlyInt24: ValueMetadataNumeric = {
	...Int24,
	..._readonly,
};

/** Signed 24-bit integer (writeonly) */
const WriteOnlyInt24: ValueMetadataNumeric = {
	...Int24,
	..._writeonly,
};

/** Signed 32-bit integer */
const Int32: ValueMetadataNumeric = {
	..._default,
	type: "number",
	...IntegerLimits.Int32,
};

/** Signed 32-bit integer (readonly) */
const ReadOnlyInt32: ValueMetadataNumeric = {
	...Int32,
	..._readonly,
};

/** Signed 32-bit integer (writeonly) */
const WriteOnlyInt32: ValueMetadataNumeric = {
	...Int32,
	..._writeonly,
};

/** Any string */
const String: ValueMetadataString = {
	..._default,
	type: "string",
};

/** Unsigned string (readonly) */
const ReadOnlyString: ValueMetadataString = {
	...String,
	..._readonly,
};

/** Unsigned string (writeonly) */
const WriteOnlyString: ValueMetadataString = {
	...String,
	..._writeonly,
};

// Some predefined CC-specific metadata

/** The level of a Switch */
const Level: ValueMetadataNumeric = {
	...UInt8,
	max: 99,
};

/** The level of a Switch (readonly) */
const ReadOnlyLevel: ValueMetadataNumeric = {
	...Level,
	..._readonly,
};

/** The level of a Switch (writeonly) */
const WriteOnlyLevel: ValueMetadataNumeric = {
	...Level,
	..._writeonly,
};

/** A collection of predefined CC value metadata */
export const ValueMetadata = {
	/** The default value for metadata: readable and writeable */
	Any: Object.freeze(Any),
	/** The default value for readonly metadata */
	ReadOnly: Object.freeze(ReadOnly),
	/** The default value for writeonly metadata */
	WriteOnly: Object.freeze(WriteOnly),

	/** A numeric value */
	Number: Object.freeze(Number),
	/** A numeric value (readonly) */
	ReadOnlyNumber: Object.freeze(ReadOnlyNumber),
	/** A numeric value (writeonly) */
	WriteOnlyNumber: Object.freeze(WriteOnlyNumber),

	/** Unsigned 8-bit integer */
	UInt8: Object.freeze(UInt8),
	/** Unsigned 16-bit integer */
	UInt16: Object.freeze(UInt16),
	/** Unsigned 24-bit integer */
	UInt24: Object.freeze(UInt24),
	/** Unsigned 32-bit integer */
	UInt32: Object.freeze(UInt32),
	/** Signed 8-bit integer */
	Int8: Object.freeze(Int8),
	/** Signed 16-bit integer */
	Int16: Object.freeze(Int16),
	/** Signed 24-bit integer */
	Int24: Object.freeze(Int24),
	/** Signed 32-bit integer */
	Int32: Object.freeze(Int32),

	/** Unsigned 8-bit integer (readonly) */
	ReadOnlyUInt8: Object.freeze(ReadOnlyUInt8),
	/** Unsigned 16-bit integer (readonly) */
	ReadOnlyUInt16: Object.freeze(ReadOnlyUInt16),
	/** Unsigned 24-bit integer (readonly) */
	ReadOnlyUInt24: Object.freeze(ReadOnlyUInt24),
	/** Unsigned 32-bit integer (readonly) */
	ReadOnlyUInt32: Object.freeze(ReadOnlyUInt32),
	/** Signed 8-bit integer (readonly) */
	ReadOnlyInt8: Object.freeze(ReadOnlyInt8),
	/** Signed 16-bit integer (readonly) */
	ReadOnlyInt16: Object.freeze(ReadOnlyInt16),
	/** Signed 24-bit integer (readonly) */
	ReadOnlyInt24: Object.freeze(ReadOnlyInt24),
	/** Signed 32-bit integer (readonly) */
	ReadOnlyInt32: Object.freeze(ReadOnlyInt32),

	/** Unsigned 8-bit integer (writeonly) */
	WriteOnlyUInt8: Object.freeze(WriteOnlyUInt8),
	/** Unsigned 16-bit integer (writeonly) */
	WriteOnlyUInt16: Object.freeze(WriteOnlyUInt16),
	/** Unsigned 24-bit integer (writeonly) */
	WriteOnlyUInt24: Object.freeze(WriteOnlyUInt24),
	/** Unsigned 32-bit integer (writeonly) */
	WriteOnlyUInt32: Object.freeze(WriteOnlyUInt32),
	/** Signed 8-bit integer (writeonly) */
	WriteOnlyInt8: Object.freeze(WriteOnlyInt8),
	/** Signed 16-bit integer (writeonly) */
	WriteOnlyInt16: Object.freeze(WriteOnlyInt16),
	/** Signed 24-bit integer (writeonly) */
	WriteOnlyInt24: Object.freeze(WriteOnlyInt24),
	/** Signed 32-bit integer (writeonly) */
	WriteOnlyInt32: Object.freeze(WriteOnlyInt32),

	/** The level of a Switch (0-99) */
	Level: Object.freeze(Level),
	/** The level of a Switch (0-99, readonly) */
	ReadOnlyLevel: Object.freeze(ReadOnlyLevel),
	/** The level of a Switch (0-99, writeonly) */
	WriteOnlyLevel: Object.freeze(WriteOnlyLevel),

	/** A boolean value */
	Boolean: Object.freeze(Boolean),
	/** A boolean value (readonly) */
	ReadOnlyBoolean: Object.freeze(ReadOnlyBoolean),
	/** A boolean value (writeonly) */
	WriteOnlyBoolean: Object.freeze(WriteOnlyBoolean),

	/** A string */
	String: Object.freeze(String),
	/** A string (readonly) */
	ReadOnlyString: Object.freeze(ReadOnlyString),
	/** A string (writeonly) */
	WriteOnlyString: Object.freeze(WriteOnlyString),
};
