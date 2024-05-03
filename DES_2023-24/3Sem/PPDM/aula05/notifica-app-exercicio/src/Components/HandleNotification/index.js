import * as Notifications from 'expo-notifications';


export async function notifRecRef(resolve) {
    return Notifications.addNotificationReceivedListener(notification => {
        // console.log('notificação recebida2: ', notification);
        resolve(notification);
    })
};

export async function notifRecRes(resolve) {
    return Notifications.addNotificationResponseReceivedListener(notification => {
        //console.log('notificação recebida2: ', notification);
        resolve(notification);
    })
};
;



