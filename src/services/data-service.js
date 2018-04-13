
// Silngleton ES6
// singleton significa que eu vou ter sempre uma única instância alocada em memória 
import NotificationService, {NOTIF_WISHLIST_CHANGED} from './notification-service';

// Isso aqui só vai ser criado uma única vez = singleton
let ns = new NotificationService();

let instance = null;
var wishList = [];

class DataService {
    constructor() {
        if (!instance) {
            instance = this;
        }

        return instance;
    }

    itemOnWishList = item => {
        for (var i = 0; i < wishList.length; i++) {
            if (wishList[i]._id === item._id){
                return true;
            }
        }

        return false;
    }

    addWishListItem = item => {
        wishList.push(item);
        //Goofy Calling
        ns.postNotification(NOTIF_WISHLIST_CHANGED, wishList);
    }

    removeWishListItem = item => {
        for (var i = 0; i < wishList.length; i++) {
            if (wishList[i]._id === item._id) {
                wishList.splice(i, 1);
                ns.postNotification(NOTIF_WISHLIST_CHANGED, wishList);
                break;
            }
        }
    }
}

export default DataService;