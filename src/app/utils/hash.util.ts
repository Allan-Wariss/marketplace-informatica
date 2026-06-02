import { createHash } from 'crypto';

export function hashMd5(value: string): string {
  return createHash('md5').update(value).digest('hex');
}
