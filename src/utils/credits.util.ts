export function calculateCredits(maxValue: number): number {
  const percentage = Math.random() * 0.2 + 0.8;

  return Math.floor(maxValue * percentage);
}
