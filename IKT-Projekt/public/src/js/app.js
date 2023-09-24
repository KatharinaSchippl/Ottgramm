/* if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(function(registration) {
            console.log('service worker registriert', registration);
            console.log('Scope ist: ' + registration.scope);

        }).catch(function(error) {
            console.log('Service worker registration failed:', error);
        });
        //sercive worker in controll?
        if (navigator.serviceWorker.controller) {
            console.log('This page is currently controlled by:', navigator.serviceWorker.controller);
        }

        // Then, register a handler to detect when a new or
        // updated service worker takes control.
        navigator.serviceWorker.oncontrollerchange = function() {
            console.log('This page is now controlled by:', navigator.serviceWorker.controller);
        };
    } else {
        console.log('Service workers are not supported.');
    }

 */
let enableNotificationsButtons = document.querySelectorAll('.enable-notifications');


if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(function() {
            console.log('service worker registriert')
        });
}

function displayConfirmNotification() {
    if('serviceWorker' in navigator) {
        let options = { body: 'You successfully subscribed to our Notification service!',
        icon: '/src/images/icons/fiw96x96.png',
        image: '/src/images/htw-sm.jpg',
        lang: 'de-DE',
        vibrate: [100, 50, 200],
        badge: '/src/images/icons/fiw96x96.png',
        tag: 'confirm-notification',
        renotify: true,
        actions: [
            { action: 'confirm', title: 'Ok', icon: '/src/images/icons/fiw96x96.png' },
            { action: 'cancel', title: 'Cancel', icon: '/src/images/icons/fiw96x96.png' },
        ]};
        

        navigator.serviceWorker.ready
            .then( sw => {
                sw.showNotification('Successfully subscribed (from SW)!', options);
            });
    }

}

function askForNotificationPermission() {
    Notification.requestPermission( result => {
        console.log('User choice', result);
        if(result !== 'granted') {
            console.log('No notification permission granted');
        } else {
            // notifications granted
            displayConfirmNotification();
        }
    });
}

if('Notification' in window) {
    for(let button of enableNotificationsButtons) {
        button.style.display = 'inline-block';
        button.addEventListener('click', askForNotificationPermission);
    }
}