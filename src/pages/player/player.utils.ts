import {Time} from '../../const';

export const formatDuration = (duration: number): string => {
  if (!duration) {
    return '';
  }
  const hours = Math.floor(duration / Time.HourSeconds);
  const minutes = Math.floor((duration - hours * Time.HourSeconds) / Time.MinuteSeconds);
  const seconds = Math.floor(duration % Time.MinuteSeconds);

  return hours > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}` ;
};
