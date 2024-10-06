import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  animations: [

    trigger('slideUp', [

      state('hidden', style({
        transform: 'translateY(100%)',
        opacity: 0
      })),
      state('visible', style({
        transform: 'translateY(0)',
        opacity: 1
      })),

      transition('hidden => visible', animate('1s ease-out')),
    ])
  ]
})
export class CalendarPage implements OnInit {
  isOpen = false;

  toggleAccordion() {
    this.isOpen = !this.isOpen;
  }

  today: Date = new Date();
  selectedDay: Date = new Date();
  selectedMonth: number = this.today.getMonth();
  selectedYear: number = this.today.getFullYear(); // Aquí se ajusta automáticamente
  currentWeek: any[] = [];

  months = [
    { name: 'January', value: 0 },
    { name: 'February', value: 1 },
    { name: 'March', value: 2 },
    { name: 'April', value: 3 },
    { name: 'May', value: 4 },
    { name: 'June', value: 5 },
    { name: 'July', value: 6 },
    { name: 'August', value: 7 },
    { name: 'September', value: 8 },
    { name: 'October', value: 9 },
    { name: 'November', value: 10 },
    { name: 'December', value: 11 },
  ];

  isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  selectDay(day: Date) {
    this.selectedDay = day;
  }

  updateWeeks(date: Date) {
    const startOfWeek = this.getStartOfWeek(date);
    this.currentWeek = this.getWeekDays(startOfWeek);
    this.updateSelectedMonthAndYear();
  }

  getStartOfWeek(date: Date): Date {
    const dayOfWeek = date.getDay();
    const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Ajusta si es domingo (0)
    return new Date(date.setDate(diff));
  }

  getWeekDays(startDate: Date): any[] {
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      weekDays.push({ label: this.getDayLabel(date), date });
    }
    return weekDays;
  }

  getDayLabel(date: Date): string {
    const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    return days[date.getDay() - 1]; // Ajusta el índice para que comience en Lunes
  }

  prevWeek() {
    const prevWeekStart = new Date(this.currentWeek[0].date);
    prevWeekStart.setDate(prevWeekStart.getDate() - 7);
    this.updateWeeks(prevWeekStart);
  }

  nextWeek() {
    const nextWeekStart = new Date(this.currentWeek[0].date);
    nextWeekStart.setDate(nextWeekStart.getDate() + 7);
    this.updateWeeks(nextWeekStart);
  }

  onMonthChange() {
    const newDate = new Date(this.selectedYear, this.selectedMonth, this.selectedDay.getDate());
    this.updateWeeks(newDate);
  }

  updateSelectedMonthAndYear() {
    const firstDayOfWeek = this.currentWeek[0].date;
    const lastDayOfWeek = this.currentWeek[this.currentWeek.length - 1].date;

    if (firstDayOfWeek.getMonth() !== lastDayOfWeek.getMonth()) {
      this.selectedMonth = lastDayOfWeek.getMonth();
    } else {
      this.selectedMonth = firstDayOfWeek.getMonth();
    }

    if (firstDayOfWeek.getFullYear() !== lastDayOfWeek.getFullYear()) {
      this.selectedYear = lastDayOfWeek.getFullYear();
    } else {
      this.selectedYear = firstDayOfWeek.getFullYear();
    }
  }

  public slideState = 'hidden';

  ngOnInit() {
    this.updateWeeks(this.today);
    setTimeout(() => {
      this.slideState = 'visible';
    }, 500);
  }

}
