module.exports = {};

const moment = require('moment');
require('moment-countdown');

// Define the Start & End Date
const eventStartDate = '2016-06-22 18:00:00 GMT-0400';
const eventEndDate = '2016-06-22 20:00:00 GMT-0400';

// Define when to switch content
const beforeEvent = moment().isBefore(eventStartDate);
const duringEvent = moment().isAfter(eventStartDate) && moment().isBefore(eventEndDate);
const afterEvent = moment().isAfter(eventEndDate);

// Set Clock Value
const setClockNumbers = (date) => {
    const countdown = moment().countdown(date);
    $('.countdown-text.days').text(`${countdown.days} Days`);
    $('.countdown-text.hours').text(`${countdown.hours} Hours`);
    $('.countdown-text.minutes').text(`${countdown.minutes} Minutes`);
    $('.countdown-text.seconds').text(`${countdown.seconds} Seconds`);
};

setInterval(function() {
    // Animate the Clock Hands
    if(!afterEvent) {
        const r = (el, deg) => {
            el.setAttribute('transform', `rotate(${deg} 50 50)`);
        };
        const d = new Date();
        r(hour, 30 * (d.getHours() % 12) + d.getMinutes() / 2);
        r(min, 6 * d.getMinutes());
        r(sec, 6 * d.getSeconds());
    }

    if(beforeEvent) {
        let clockVal = 'eventStartDate';
    } else if(duringEvent) {
        let clockVal = 'eventEndDate';
    } else {
        let clockVal = '88:88';
    }

    setClockNumbers(clockVal);

}, 1000);

// Content for before Event
if(beforeEvent) {
    $('.event-copy').append(
        `The next #crappyhour is June 22nd, 6-8pm at <a href="">One Mile House</a>.`
    );
}

// Content while event is happening
if(duringEvent) {
    $('.event-copy').append(
        `#crappyhour is happening right now until 8pm, at <a href="">One Mile House</a>! If you
        hurry, you might be able to make it. Sign up below for a reminder about next month's
        event.`
    );
}

// Content when the event is over
if(afterEvent) {
    $('.event-copy').append(
        `The next #crappyhour <a href="#">can't come soon enough</a>.`
    );
}
