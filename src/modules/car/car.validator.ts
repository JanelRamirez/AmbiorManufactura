import { Injectable } from "@nestjs/common";
import { ValidatorBase } from "src/base/base.validator";
import { CarEntity } from "./entity/car.toEntity";


@Injectable()
export class CarValidator extends ValidatorBase<CarEntity> {
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

export const CarValidatorValidatorInstance = new CarValidator();
