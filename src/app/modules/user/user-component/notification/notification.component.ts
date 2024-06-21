import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/auth/services/notification/notification.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notifications: any[];
  groupedNotifications: any[] = [];
  userEmail: string;

  constructor(
    private notificationService: NotificationService,
    private authService: AuthService 
  ) {}

  ngOnInit(): void {
    const userEmail = this.authService.getUserEmail();
    console.log('User Email:', this.authService.getUserEmail());
    if (userEmail) {
      this.fetchNotifications(userEmail);
    } else {
      console.error('User email not available.');
    }
  }

  fetchNotifications(userEmail: string) {
    this.notificationService.getNotificationsForUser(userEmail).subscribe(
        (data: any) => {
            this.groupedNotifications = this.groupNotificationsByDate(data);
           
            this.groupedNotifications = this.groupedNotifications.sort((a, b) => this.compareDates(a.date, b.date));
        },
        error => {
            console.error('Error fetching notifications:', error);
        }
    );
}
private compareDates(a: string, b: string): number {
 
  const dateA = new Date(a);
  const dateB = new Date(b);
  return dateB.getTime() - dateA.getTime();
}

  private groupNotificationsByDate(notifications: any[]): any[] {
    const grouped = new Map<string, any[]>();

    notifications.forEach(notification => {
      const date = notification.date;
      const time = notification.time;

      const dateTimeKey = `${date}_${time}`;
      console.log(time)

      if (grouped.has(dateTimeKey)) {
        grouped.get(dateTimeKey).push(notification);
      } else {
        grouped.set(dateTimeKey, [notification]);
      }
    });
  
    return Array.from(grouped, ([dateTimeKey, notifications]) => {
      const [date, time] = dateTimeKey.split('_');
      return { date, time, notifications };
    });
  }
}