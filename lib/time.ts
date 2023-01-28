import { formatDistanceToNowStrict, format } from 'date-fns';

export function distanceToNow(dateTime: number | Date) {
  return formatDistanceToNowStrict(dateTime, {
    addSuffix: true,
  });
}

export function formatDate(dateTime: number | Date) {
  return format(dateTime, 'MMMM do, yyyy');
}
