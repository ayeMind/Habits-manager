export function getPermission() {
    
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.ts');
    }

    if (Notification.permission === "granted") {
        const notification = new Notification("ТЫ ПОЧЕМУ НЕ СДЕЛАЛ ВСЕ ПРИВЫЧКИ ЗА СЕГОДНЯ?");
        
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission(permission => {
            if (permission === "granted") {
                new Notification("Уведомления подключены.");
            }
        })
    }
}