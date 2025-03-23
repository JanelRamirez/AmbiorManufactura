import { Injectable } from "@nestjs/common";
import { ValidatorBase } from "src/base/base.validator";
import { InvoiceEntity } from "./entity/invoice.toEntity";


@Injectable()
export class InvoiceValidator extends ValidatorBase<InvoiceEntity> {
  constructor() {
    super();
    this.validationRules();
  }

  /**
   * Defines validation rules for the current entity using FluentValidator-ts.
   * For detailed documentation on available validation rules, visit:
   * https://fluentvalidation-ts.alexpotter.dev/docs/overview
   *
   * @example
   * ```typescript
   * validationRules() {
   *   // Ensure the 'name' is not null, not empty, and has a maximum length of 100 characters.
   *   this.ruleFor('name').notNull().notEmpty().maxLength(100);
   * }
   * ```
   */

  validationRules(): void {}
}

export const InvoiceValidatorValidatorInstance = new InvoiceValidator();
