export default class ContestService {
    static URL = "https://odp-0001.firebaseio.com/events";

    static countEvent() {
        return 0;
    }

    static createFake() {
        let ref = new Firebase(this.URL);
        ref.push({
            date: Date.now(),
            title: 'Contest Test',
            description: 'lorem ispum lorem ispum lorem ispum lorem ispum',
            playgroundId: 'AVRydhJLHbY8L1Q2Pbrx'
        });
    }

    static list() {
        let ref = new Firebase(this.URL);

        return new Promise(resolve => {
            ref.once("value", function(data) {
                resolve(data.val());
            })
        })
    }
}