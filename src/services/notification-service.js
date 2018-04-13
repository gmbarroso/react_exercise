// Criando constantes globais que pode ser acessado por qualquer um
export const NOTIF_WISHLIST_CHANGED = "notif_wishlist_changed";


// HTTP service singleton

// var observer = {
//     "wishListChanged": [{observer: someComponent, callBack: someFunction}, {observer: someComponent, callBack: someFunction}],
//     "userHasLoggedIn": {observer: someComponent, callBack: someFunction},
// };
var observers = {};
let instance = null;

class NotificationService {
    constructor() {
        if (!instance) {
            instance = this;
        }

        return instance;
    }

    postNotification = (notifName, data) => {
        let obs = observers[notifName];
        for (var i = 0; i < obs.length; i++) {
            var obj = obs[i];
            obj.callBack(data);
        }
    }

    // Observer
    // Vai registrar e o sitema enviará notificações
    removeObserver = (observer, notifName) => {
        var obs = observers[notifName];

        if (obs) {
            for (var i = 0; i < obs.length; i++) {
                if (observer === obs[i].observer) {
                    obs.splice(i, 1);
                    observers[notifName] = obs;
                    break;
                }
            }
        }
    }
    
    // Adicionando um Observer
    addObserver = (notifName, observer, callBack) => {
        let obs = observers[notifName];

        if (!obs) {
            observers[notifName] = [];
        }

        let obj = { observer: observer, callBack: callBack };
        observers[notifName].push(obj);
    }
}

export default NotificationService;