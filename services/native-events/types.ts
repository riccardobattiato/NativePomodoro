export enum NativeEvent {
  SEND_NOTIFICATION = 'sendNotification',
  REQUEST_NOTIFICATION_PERMISSION = 'requestNotificationPermission',
  CHECK_NOTIFICATION_PERMISSION = 'checkNotificationPermission',
  STATUS_BAR_TIME_CHANGE = 'statusBarTimeChange',
}

export type SendNativeEventParams =
  | SendNativeEventParams_DEFAULT
  | SendNativeEventParams_SEND_NOTIFICATION
  | SendNativeEventParams_STATUS_BAR_TIME_CHANGE;

export interface SendNativeEventParams_DEFAULT {
  name: NativeEvent.REQUEST_NOTIFICATION_PERMISSION;
  data: null;
}

export interface SendNativeEventParams_STATUS_BAR_TIME_CHANGE {
  name: NativeEvent.STATUS_BAR_TIME_CHANGE;
  data: string | null;
}

export type AddNativeEventListenerParams =
  AddNativeEventListenerParams_CHECK_NOTIFICATION_PERMISSION;

export interface RemoveNativeEventListenerParams {
  name: NativeEvent;
}

export interface SendNativeEventParams_SEND_NOTIFICATION {
  name: NativeEvent.SEND_NOTIFICATION;
  data: {
    title: string;
    message: string;
  };
}

export interface AddNativeEventListenerParams_CHECK_NOTIFICATION_PERMISSION {
  name: NativeEvent.CHECK_NOTIFICATION_PERMISSION;
  callback: (data: 'granted' | 'denied') => void;
}
