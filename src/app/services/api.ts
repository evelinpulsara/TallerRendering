import { REQUEST, inject } from '@angular/core';

export function resolveApiBase(): string {
  const request = inject(REQUEST, { optional: true });
  return request ? new URL(request.url).origin : '';
}
