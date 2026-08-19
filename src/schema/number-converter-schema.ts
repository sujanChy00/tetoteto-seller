import * as v from "valibot";

export const numericField = (label: string, min = 1) =>
  v.pipe(
    v.string(),
    v.nonEmpty(`${label} is required`),
    v.transform((val) => Number(val)),
    v.check((val) => !Number.isNaN(val), `${label} must be a valid number`),
    v.minValue(min, `${label} is required`),
  );

export const optionalNumericField = () =>
  v.optional(
    v.pipe(
      v.string(),
      v.transform((val) => (val === "" ? undefined : Number(val))),
    ),
  );
