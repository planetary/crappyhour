module.exports = {};

const moment = require('moment');
require('moment-countdown');
require('waypoints/lib/jquery.waypoints.js');
require('waypoints/lib/shortcuts/sticky.js');

// Define the Start & End Date
const eventStartDate = '2016-07-27 18:00:00 GMT-0400';
const eventEndDate = '2016-07-27 20:00:00 GMT-0400';

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
        r(document.querySelectorAll('#day')[0], 12 * countdown.days);
        r(document.querySelectorAll('#hour')[0], 15 * (countdown.hours) + countdown.minutes / 2);
        r(document.querySelectorAll('#min')[0], 6 * countdown.minutes);
        r(document.querySelectorAll('#sec')[0], 6 * countdown.seconds);
    } else {

        // spin the hands
    }
};

const setCopy = (text) => {
    $('.event-copy').html(text);
};

const setClocks = () => {
    // Define when to switch content
    const beforeEvent = moment().isBefore(eventStartDate);
    const duringEvent = moment().isAfter(eventStartDate) && moment().isBefore(eventEndDate);

    let clockVal;
    let eventCopy;

    if(beforeEvent) {
        clockVal = eventStartDate;
        eventCopy = `The next #CrappyHourNYC is happening on July 27th, 6-8pm at` +
        ` <a href="https://www.google.com/maps/place/One+Mile+House+Bar/@40.7203719,-73.9932229,15z/data=!4m5!3m4!1s0x0:0x923da71b69d47fc1!8m2!3d40.7203719!4d-73.9932229" target="_blank">One Mile House</a> (10 Delancey St, NY, NY 10002).`;
    } else if(duringEvent) {
        clockVal = eventEndDate;
        eventCopy = `#CrappyHourNYC is happening right now until 8pm, at ` +
        `<a href="https://www.google.com/maps/place/One+Mile+House+Bar/@40.7203719,-73.9932229,15z/data=!4m5!3m4!1s0x0:0x923da71b69d47fc1!8m2!3d40.7203719!4d-73.9932229" target="_blank">One Mile House</a> (10 Delancey St, NY, NY 10002)! If you hurry, you might be ` +
        `able to make it.<br>Sign up below for a reminder about next month's event.`;
    } else {
        clockVal = '88:88';
        eventCopy = `#CrappyHourNYC can't come soon enough. Stay tuned.`;
    }

    setClockNumbers(clockVal);
    setClockHands(clockVal);
    setCopy(eventCopy);
};

setInterval(setClocks, 1000);

const updateContentHeight = () => {
    const contentHeight = $('.container-stick').outerHeight();
    const logoHeight = $('.header-above').outerHeight();
    $('.content').css({
        height: (contentHeight + logoHeight)
    });
};

const initializeWaypoint = () => {
    // Create media query
    const desktopQuery = window.matchMedia('(min-width: 1024)');

    const header = $('.header-above').html();
    const wrap = $('.content');

    const waypoint = new Waypoint({
        element: wrap,
        handler: (direction) => {
            if(direction === 'down') {
                $('.header-below').toggleClass('is-scrollable')
                    .toggleClass('is-collapsed').html(header);
                $('.header-above').toggleClass('is-scrollable').html('');
                wrap.addClass('is-scrollable');
                updateContentHeight();
            } else {
                $('.header-below').toggleClass('is-scrollable')
                    .toggleClass('is-collapsed').html('');
                $('.header-above').toggleClass('is-scrollable').html(header);
                wrap.removeClass('is-scrollable');
                updateContentHeight();
            }
        },
        enabled: false
    });

    waypoint.enable();
};

$(document).ready(function() {
    setClocks();
    updateContentHeight();
    initializeWaypoint();

    $(window).on('resize', function() {
        updateContentHeight();
    });
});
