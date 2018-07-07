import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../app.store';
import { DNotification, DNotificationList } from '../../services/notification/notification.dto';
import { Observable, of } from 'rxjs/index';
import { filter, map, mergeMap, share } from 'rxjs/internal/operators';
import { SeenNotification } from '../../services/notification/notification.actions';
import * as moment from 'moment';
import { NOTIFICATION_TYPE } from '../../services/notification/notification.constant';

@Component({
  selector: 'app-navbar-notifications',
  templateUrl: './navbar-notifications.component.html',
  styleUrls: ['./navbar-notifications.component.scss'],
})
export class NavbarNotificationsComponent implements OnInit {

  notifications$: Observable<DNotificationList>;
  newNotifications$: Observable<DNotification[]> = of([]);
  otherNotifications$: Observable<DNotification[]> = of([]);

  notificationsHover: boolean = false;
  notificationsToggle: boolean = false;

  constructor(
    private store: Store<IAppState>,
    private router: Router,
  ) {
    this.notifications$ = this.store.pipe(select('notification', 'list'));
  }

  ngOnInit() {
    this.newNotifications$ = this.notifications$.pipe(
      map(notificationsData => notificationsData ? notificationsData.data : []),
      map(notifications => notifications.filter(notification => {
        return !notification.seenAt &&
          // Not older than 2 days
          moment(notification.createdAt).isAfter(moment().subtract(2, 'day'));
      })),
    );
    this.otherNotifications$ = this.notifications$.pipe(
      map(notificationsData => notificationsData ? notificationsData.data : []),
      map(notifications => notifications.filter(notification => {
        return notification.seenAt ||
          // Not younger than 2 days
          moment(notification.createdAt).isBefore(moment().subtract(2, 'day'));
      })),
    );
  }

  openNotification(notification: DNotification) {
    console.log('Opening notification', notification);
    if (!notification.seenAt) this.store.dispatch(new SeenNotification(notification.id));
  }

  leftNotifications() {
    this.notificationsHover = false;
  }

  enterNotifications() {
    this.notificationsHover = true;
  }

  toggleBlur() {
    this.notificationsToggle = false;
  }

  toggleFocus() {
    this.notificationsToggle = true;
  }

  getSenderImage(notification: DNotification): string {
    if (notification.senderCharacter) return notification.senderCharacter.portrait.px256x256;
    if (notification.senderCorporation) return notification.senderCorporation.icon.px256x256;
    if (notification.senderAlliance) return notification.senderAlliance.icon.px128x128;
  }

  getSenderName(notification: DNotification): string {
    if (notification.senderCharacter) return notification.senderCharacter.name;
    if (notification.senderCorporation) return notification.senderCorporation.name;
    if (notification.senderAlliance) return notification.senderAlliance.name;
  }

  getText(notification: DNotification): string {
    const name = this.getSenderName(notification);
    switch (notification.type) {
      case NOTIFICATION_TYPE.NEW_POST_ON_YOUR_WALL:
        return `<strong>${name}</strong> has posted on <strong>your wall</strong>.`;
      case NOTIFICATION_TYPE.NEW_POST_ON_YOUR_CORPORATION_WALL:
        return `<strong>${name}</strong> has posted on <strong>your corporation wall</strong>.`;
      case NOTIFICATION_TYPE.NEW_POST_ON_YOUR_ALLIANCE_WALL:
        return `<strong>${name}</strong> has posted on <strong>your alliance wall</strong>.`;
      case NOTIFICATION_TYPE.NEW_COMMENT_ON_YOUR_POST:
        return `<strong>${name}</strong> has commented on <strong>your post</strong>.`;
      case NOTIFICATION_TYPE.NEW_COMMENT_ON_A_POST_YOU_PARTICIPATE:
        return `<strong>${name}</strong> has commented on <strong>a post you participate</strong>.`;
      default:
        return `Unknown notification type: ${notification.type}`;
    }
  }

}
