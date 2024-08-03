import { describe, expect, it } from '@jest/globals';
import { DateTime } from 'luxon';
import { getElapsedTime } from '@/lib/timer';

describe('getElapsedTime', () => {
  it('treats minor variations as the same moment', () => {
    // 2024, August 03, 09:30, nearing 50 seconds from below
    const a = DateTime.local(2024, 8, 3, 9, 30, 49, 998);
    // 2024, August 03, 09:30, nearing 50 seconds from above
    const b = DateTime.local(2024, 8, 3, 9, 30, 50, 150);

    const diff = getElapsedTime(b, a);
    expect(diff.seconds).toBe(0);
  });
});
