import { SetMetadata } from "@nestjs/common";

export const IS_PRIVATE_KEY = 'privateRoute';
export const Private = () => SetMetadata(IS_PRIVATE_KEY, true);