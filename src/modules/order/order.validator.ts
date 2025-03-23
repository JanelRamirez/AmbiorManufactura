import { Injectable } from "@nestjs/common";
import { ValidatorBase } from "src/base/base.validator";
import { OrderEntity } from "./entity/order.toEntity";


@Injectable()
export class OrderValidator extends ValidatorBase<OrderEntity> {
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

export const OrderValidatorValidatorInstance = new OrderValidator();
