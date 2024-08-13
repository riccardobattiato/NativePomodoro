import { useCallback, useEffect, useState } from 'react';
import {
  addNativeEventListener,
  removeNativeEventListener,
  sendNativeEvent,
} from '@/services/native-events/native-events.macos';
import { NativeEvent } from '@/services/native-events/types';
import { Platform } from 'react-native';

export const useNotifications = () => {
  const [hasNotificationPermission, setHasNotificationPermission] =
    useState(true);

  const sendNotification = useCallback((title: string, message: string) => {
    sendNativeEvent({
      name: NativeEvent.SEND_NOTIFICATION,
      data: { title, message },
    });
  }, []);

  useEffect(() => {
    if (Platform.OS === 'macos') {
      addNativeEventListener({
        name: NativeEvent.CHECK_NOTIFICATION_PERMISSION,
        callback: (data: string) =>
          setHasNotificationPermission(data === 'granted'),
      });
      sendNativeEvent({
        name: NativeEvent.REQUEST_NOTIFICATION_PERMISSION,
        data: null,
      });

      // Check frequently if the user has missing permissions
      if (!hasNotificationPermission) {
        const intervalId = setInterval(() => {
          sendNativeEvent({
            name: NativeEvent.REQUEST_NOTIFICATION_PERMISSION,
            data: null,
          });
        }, 3000);
        return () => {
          clearInterval(intervalId);
          removeNativeEventListener({
            name: NativeEvent.CHECK_NOTIFICATION_PERMISSION,
          });
        };
      }

      return () =>
        removeNativeEventListener({
          name: NativeEvent.CHECK_NOTIFICATION_PERMISSION,
        });
    }
  }, [hasNotificationPermission]);

  return { sendNotification };
};
