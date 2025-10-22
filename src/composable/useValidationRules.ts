export const useValidationRules = () => {
  const rules = {
    required: (v: any) => (v !== null && v !== "") || "This field is required",
    number: (v: any) => !isNaN(parseFloat(v)) || "Must be a number",
    positive: (v: any) => parseFloat(v) > 0 || "Must be greater than 0",
    email: (v: string) => {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return !v || pattern.test(v) || "Invalid email format"
    },
    minLength: (min: number) => (v: string) => 
      !v || v.length >= min || `Minimum ${min} characters required`,
    maxLength: (max: number) => (v: string) =>
      !v || v.length <= max || `Maximum ${max} characters allowed`,
    pattern: (pattern: RegExp, message: string) => (v: string) =>
      !v || pattern.test(v) || message,
  }

  return {
    rules
  }
}