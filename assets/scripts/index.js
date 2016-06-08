module.exports = {};

const moment = require('moment');
require('moment-countdown');

// Define the Start & End Date
const eventStartDate = '2016-06-04 18:00:00 GMT-0400';
const eventEndDate = '2016-06-04 20:00:00 GMT-0400';

const setClockNumbers = (date) => {
    const days = moment().countdown(date).days;
    const hours = moment().countdown(date).hours;
    const minutes = moment().countdown(date).minutes;
    const seconds = moment().countdown(date).seconds;
    $('.countdown-text.days').text(`${days} Days`);
    $('.countdown-text.hours').text(`${hours} Hours`);
    $('.countdown-text.minutes').text(`${minutes} Minutes`);
    $('.countdown-text.seconds').text(`${seconds} Seconds`);
};

setInterval(function() {
    // Animate the Clock Hands
    if(!moment().isAfter(eventEndDate)) {
        const r = (el, deg) => {
            el.setAttribute('transform', `rotate(${deg} 50 50)`);
        };
        const d = new Date();
        r(hour, 30 * (d.getHours() % 12) + d.getMinutes() / 2);
        r(min, 6 * d.getMinutes());
        r(sec, 6 * d.getSeconds());
    }

    // Count down to event start date
    if(moment().isBefore(eventStartDate))
        setClockNumbers(eventStartDate);

    // Countdown to event end date
    if(moment().isSameOrAfter(eventStartDate) && moment().isSameOrBefore(eventEndDate))
        setClockNumbers(eventEndDate);

    if(moment().isAfter(eventEndDate)) {
        $('.countdown-text.days').text(`88:88`);
        $('.countdown-text.hours').text(`88:88`);
        $('.countdown-text.minutes').text(`88:88`);
        $('.countdown-text.seconds').text(`88:88`);
    }
}, 1000);

// Event Details
const eventLocation = '<a href="">One Mile House</a>';
const dateAndTime = 'June 22nd, 6-8pm';

// If Event is Upcoming
if(moment().isBefore(eventStartDate)) {
    $('.event-copy').append(
        `The next #crappyhour is ${dateAndTime} at ${eventLocation}.`
    );
}

// If Event is Happening
if(moment().isSameOrAfter(eventStartDate) && moment().isSameOrBefore(eventEndDate)) {
    $('.event-copy').append(
        `#crappyhour is happening right now until 8pm, at ${eventLocation}! If you hurry,
        you might be able to make it. Sign up below for a reminder about next month's event.`
    );
}

// If Event is Over
if(moment().isAfter(eventEndDate)) {
    $('.event-copy').append(
        `The next #crappyhour <a href="#">can't come soon enough</a>.`
    );
}
