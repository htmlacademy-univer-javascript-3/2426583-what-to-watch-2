export function getRunTime(runTime: number): string {
  const minInHour = 60;
  const hours = Math.floor(runTime / minInHour);
  if (!hours) {
    return `${runTime}m`;
  }
  return `${hours}h ${runTime % minInHour}m`;
}
