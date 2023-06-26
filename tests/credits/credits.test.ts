import { calculateCredits } from "../../src/utils/credits.util";

describe('Calculate credits', () => {
  it('Test if calculate credits working', async () => {
    const creditsAorB = calculateCredits(20);
    const creditsC = calculateCredits(30);

    expect(creditsAorB).toBeGreaterThanOrEqual(16);
    expect(creditsAorB).toBeLessThanOrEqual(20);
    expect(creditsC).toBeGreaterThanOrEqual(24);
    expect(creditsC).toBeLessThanOrEqual(30);
  });
});
