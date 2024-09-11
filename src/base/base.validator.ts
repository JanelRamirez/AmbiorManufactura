import { AsyncValidator } from "fluentvalidation-ts";
import { EntityBase } from "./base.entity";

export class ValidatorBase<
  TEntity extends EntityBase,
> extends AsyncValidator<TEntity> {
  constructor() {
    super();
  }
}