module.exports = {};

const moment = require('moment');
require('moment-countdown');
require('waypoints/lib/jquery.waypoints.js');
require('waypoints/lib/shortcuts/sticky.js');

// Define the Start & End Date
const eventStartDate = '2016-06-22 18:00:00 GMT-0400';
const eventEndDate = '2016-06-22 20:00:00 GMT-0400';

// Define when to switch content
const beforeEvent = moment().isBefore(eventStartDate);
const duringEvent = moment().isAfter(eventStartDate) && moment().isBefore(eventEndDate);

// Set Clock Value
const setClockNumbers = (date) => {
    if (moment(date).isValid()) {
        const countdown = moment().countdown(date);
        $('.countdown-text.days').text(`${countdown.days} Days`);
        $('.countdown-text.hours').text(`${countdown.hours} Hours`);
        $('.countdown-text.minutes').text(`${countdown.minutes} Minutes`);
        $('.countdown-text.seconds').text(`${countdown.seconds} Seconds`);
    } else {
        $('.countdown-text').each(function() {
            $(this).text(date);
        });
    }
};

const setClockHands = (date) => {
    const r = (el, deg) => {
        el.setAttribute('transform', `rotate(${deg} 50 50)`);
    };
    if (moment(date).isValid()) {
        const countdown = moment().countdown(date);
        r(document.getElementById('day'), 12 * countdown.days);
        r(document.getElementById('hour'), 30 * (countdown.hours % 12) + countdown.minutes / 2);
        r(document.getElementById('min'), 6 * countdown.minutes);
        r(document.getElementById('sec'), 6 * countdown.seconds);
    } else {

        // spin the hands
    }
};

const setCopy = (text) => {
    if (!$('.event-copy').html())
        $('.event-copy').append(text);
};

setInterval(function() {
    let clockVal;
    let eventCopy;

    if(beforeEvent) {
        clockVal = eventStartDate;
        eventCopy = `The next #crappyhour is June 22nd, 6-8pm at <a href="">One Mile House</a>.`;
    } else if(duringEvent) {
        clockVal = eventEndDate;
        eventCopy = `#crappyhour is happening right now until 8pm, at ` +
        `<a href="">One Mile House</a>! If you hurry, you might be ` +
        `able to make it. Sign up below for a reminder about next month's event.`;
    } else {
        clockVal = '88:88';
        eventCopy = `The next #crappyhour <a href="#">can't come soon enough</a>.`;
    }

    setClockNumbers(clockVal);
    setClockHands(clockVal);
    setCopy(eventCopy);
}, 1000);

// Waypoints
const onScrollInit = () => {
    const header = $('.header');
    const wrap = $('.content');
    const content = $('.container-stick');

    const $notify = (message) => {
        console.log(message);
    };

    const contentStick = new Waypoint.Sticky({
        element: content,
        offset: 185,
        wrapper: false
    });

    // console.log(contentStick);

    const $headerScroll = new Waypoint({
        element: wrap,
        handler: (direction) => {
            if(direction === 'up')
                header.removeClass('scrollable');
            else
              header.addClass('scrollable');
        }
    });

}

onScrollInit();
