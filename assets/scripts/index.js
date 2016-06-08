module.exports = {};

const moment = require('moment');
require('moment-countdown');

// Define the Start & End Date
const eventStartDate = '2016-06-22 18:00:00 GMT-0400';
const eventEndDate = '2016-06-22 20:00:00 GMT-0400';

setInterval(function() {

    // Animate the Clock Hands
    const r = (el, deg) => {
        el.setAttribute('transform', `rotate(${deg} 50 50)`)
    }
    const d = new Date();
    r(hour, 30 * (d.getHours() % 12) + d.getMinutes() / 2);
    r(min, 6 * d.getMinutes());
    r(sec, 6 * d.getSeconds());

    // Generate the Countdown Variables
    const days = moment().countdown(eventStartDate).days;
    const hours = moment().countdown(eventStartDate).hours;
    const minutes = moment().countdown(eventStartDate).minutes;
    const seconds = moment().countdown(eventStartDate).seconds;

    // Insert Countdown Text
    $('.countdown-text.days').text(`${days} Days`);
    $('.countdown-text.hours').text(`${hours} Hours`);
    $('.countdown-text.minutes').text(`${minutes} Minutes`);
    $('.countdown-text.seconds').text(`${seconds} Seconds`);

}, 1000);

// Event Details
const eventLocation = '<a href="">One Mile House</a>';
const dateAndTime = 'June 22nd, 6-8pm';

// If Event is Upcoming
if(moment().isBefore(eventStartDate)) {
    $('.event-copy').text(safehtml
        `The next #crappyhour is ${dateAndTime} at ${eventLocation}.`
    );
}

// If Event is Happening
if(moment().isSame(eventStartDate)) {
    $('.event-copy').text(safehtml
        `#crappyhour is happening right now until 8pm, at ${eventLocation}! If you hurry, you might be able to make it. Sign up below for a reminder about next month's event.`
    );
}

// If Event is Over
if(moment().isAfter(eventEndDate)) {
    $('.event-copy').text(safehtml
        `The next #crappyhour can't come soon enough.`
    );
}
