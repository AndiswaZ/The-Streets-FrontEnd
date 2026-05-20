import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';

@Pipe({ name: 'timeAgo', standalone: true, pure: true })
export class TimeAgoPipe implements PipeTransform {
  transform(iso?: string | null): string {
    if (!iso) return '';
    return formatDistanceToNow(new Date(iso), { addSuffix: true });
  }
}
