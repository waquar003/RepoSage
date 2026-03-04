import { SetMetadata } from '@nestjs/common';

export const RESPONSE_MESSAGE = 'responseMessage-decorator';
export const ResponseMessage = (...args: string[]) => SetMetadata(RESPONSE_MESSAGE, args);
