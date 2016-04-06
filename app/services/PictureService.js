export default class PictureService {
    static getPicture(sport) {
        let image;
        switch(sport.name.toLowerCase()) {
            case 'basketball':
                image = require('../../assets/sports/basketball.jpg');
                break;
            case 'tennis':
                image = require('../../assets/sports/tennis.jpg');
                break;
            case 'football':
                image = require('../../assets/sports/football.jpg');
                break;
            case 'gymnastique':
                image = require('../../assets/sports/gym.jpg');
                break;
            case 'yoga':
                image = require('../../assets/sports/yoga.jpg');
                break;
            case 'volley-ball':
                image = require('../../assets/sports/volley-ball.jpg');
                break;
            case 'arts martiaux':
                image = require('../../assets/sports/arts-martiaux.jpg');
                break;
            case 'saut à la perche':
                image = require('../../assets/sports/saut-a-la-perche.jpg');
                break;
            case 'sambo':
                image = require('../../assets/sports/sambo.jpg');
                break;
            case 'promenade équestre':
                image = require('../../assets/sports/promenade-equestre.jpg');
                break;
            case 'hockey sur glace':
                image = require('../../assets/sports/hockey-sur-glace.jpeg');
                break;
            case 'waterpolo':
                image = require('../../assets/sports/water-polo.jpg');
                break;
            default:
                image = require('../../assets/sports/default.jpg');
                break;
        }
        return image;
    }
}