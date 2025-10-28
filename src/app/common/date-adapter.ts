import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable()
export class RussianDateAdapter extends NativeDateAdapter {
    override deserialize(value: any): Date | null {
        if (value && typeof value === 'string') {
            value = this.toDate(value);
        }
        return value instanceof Date ? value : null;
    }

    override parse(value: string | null | undefined): Date | null {
        return !!value ? this.toDate(value) : null;
    }

    override format(date: Date): string {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }

    private toDate(dateStr: string): Date {
        const [day, month, year] = dateStr.split(/[-\/.]/);
        return new Date(+year, +month - 1, +day);
    }

    override getFirstDayOfWeek(): number {
        return 1;
    }
}
