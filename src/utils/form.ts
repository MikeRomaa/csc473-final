import z, { ZodError, ZodSchema } from "zod";
import { remapKeys } from "./remap";

type FormSuccess<T> = { data: T };
type FormError = { formError: string };
type FormFieldErrors = { fieldErrors: Record<string, string> };

export type FormStatus<T> = Partial<
  FormSuccess<T> & FormError & FormFieldErrors
>;

function zodErrorToFormStatus(error: ZodError): FormError | FormFieldErrors {
  const flattened = error.flatten();

  if (flattened.formErrors.length > 0) {
    return { formError: flattened.formErrors[0] };
  }

  return {
    fieldErrors: Object.fromEntries(
      Object.keys(flattened.fieldErrors)
        .filter((key) => flattened.fieldErrors[key] !== undefined)
        .map((key) => [key, (flattened.fieldErrors[key] as string[])[0]])
    ),
  };
}

type ValidFormData<T> = { data: T; errors: undefined };
type InvalidFormData = { data: undefined; errors: FormError | FormFieldErrors };

export function validateFormData<T>(
  schema: ZodSchema<T>,
  formData: FormData
): ValidFormData<z.infer<ZodSchema<T>>> | InvalidFormData {
  const rawValues = Object.fromEntries(formData);
  const remappedValues = remapKeys(rawValues);
  const result = schema.safeParse(remappedValues);

  if (!result.success) {
    return { data: undefined, errors: zodErrorToFormStatus(result.error) };
  }

  return { data: result.data, errors: undefined };
}
