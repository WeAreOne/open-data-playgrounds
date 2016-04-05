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
        }
        return image;
    }
}