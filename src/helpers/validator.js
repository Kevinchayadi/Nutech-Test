class Validator {
  constructor(fieldName, value) {
    this.fieldName = fieldName;
    this.value = value;
    this.errors = [];
  }

  required() {
    if (
      this.value === undefined ||
      this.value === null ||
      (typeof this.value === "string" && this.value.trim() === "")
    ) {
      this.errors.push(`${this.fieldName} tidak boleh kosong!`);
    }
    return this;
  }

  email() {
    if (this.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.value)) {
        this.errors.push(`${this.fieldName} harus berupa email!`);
      }
    }
    return this;
  }

  min(length) {
    if (this.value) {
      if (typeof this.value === "string" || Array.isArray(this.value)) {
        if (this.value.length < length) {
          this.errors.push(
            `${this.fieldName} setidaknya panjang huruf sebayak ${length}`
          );
        }
      } else if (typeof this.value === "number") {
        if (this.value < length) {
          this.errors.push(`${this.fieldName} harus setidaknya ${length}`);
        }
      }
    }
    return this;
  }

  string() {
    if (this.value !== undefined && typeof this.value !== "string") {
      this.errors.push(`${this.fieldName} harus berupa string!`);
    }
    return this;
  }

  numeric() {
    if (this.value !== undefined) {
      const decimalRegex = /^-?\d+(\.\d+)?$/;
      if (typeof this.value !== 'string' || !decimalRegex.test(this.value)) {
        this.errors.push(`${this.fieldName} harus berupa numerik angka!`);
      }
    }
    return this;
  }

  number() {
    if (this.value !== undefined && typeof this.value !== "number") {
      this.errors.push(`${this.fieldName} harus berupa angka!`);
    }
    return this;
  }

  run() {
    if (this.errors.length > 0) {
      return this.errors;
    }
    return this.errors;
  }
}

// Helper function
export function validate(fieldName, value) {
  return new Validator(fieldName, value);
}
