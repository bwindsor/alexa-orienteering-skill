/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');
const languageStrings = require('./strings').default
const bofApi = require('./bof_api')
const slotMapping = require('./slot_mapping')

const APP_ID = process.env['APP_ID'];  // TODO replace with your app ID (OPTIONAL).

const handlers = {
    'LaunchRequest': function () {
        this.emit(':tell', this.t('INTRO_PHRASE'), this.t('INTRO_PHRASE'))
    },
    'GetRaces': function () {

        var didYouMeanRace = DidYouMeanRace(this.event.request.intent.slots);
        if (didYouMeanRace == null) {
            this.emit(':tell', this.t('ERROR_BAD_QUESTION'))
            return
        }
        if (didYouMeanRace == true) {
            this.emit(':tell', this.t['DID_YOU_MEAN_RACE'])
        }

        // Query BOF API for races
        var query = SlotsToQuery(this.event.request.intent.slots);
        if (query == null) {
            this.emit(':tell', this.t('ERROR_BAD_QUESTION'))
            return
        }
        bofApi.GetRaces(query).then(data => {
            // Create speech output
            const speechOutput = this.t('RACE_DESCRIPTION_GENERATOR')(data, query);
            this.emit(':tell', speechOutput);
        }).catch(err => {
            console.log(err)
            this.emit(':tell', this.t('ERROR_BOF'))
        })
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};


function SlotsToQuery(slots) {
    var query = {};
    if (slots.hasOwnProperty('StartDate') && slots.StartDate.value) {
        query.start_date = slots.StartDate.value;
    }
    if (slots.hasOwnProperty('EndDate') && slots.EndDate.value) {
        query.end_date = slots.EndDate.value;
    }
    if (slots.hasOwnProperty('RaceDate') && slots.RaceDate.value) {
        query.search_date = slots.RaceDate.value;
    }
    if (slots.hasOwnProperty('Region') && slots.Region.value) {
        var lowerVal = slots.Region.value.toLowerCase();
        if (slotMapping.region.hasOwnProperty(lowerVal)) {
            query.assoc = slotMapping.region[lowerVal];
        } else {
            return null
        }
    }
    if (slots.hasOwnProperty('Level') && slots.Level.value) {
        var lowerVal = slots.Level.value.toLowerCase();
        if (slotMapping.raceLevel.hasOwnProperty(lowerVal)) {
            query.level = slotMapping.raceLevel[lowerVal];
        } else {
            return null
        }
    }
    return query;
}

function DidYouMeanRace(slots) {
    // Check if they said event
    if (slots.hasOwnProperty('RacesWord') && slots.RacesWord.value) {
        var lowerVal = slots.RacesWord.value.toLowerCase();
        if (slotMapping.racesWord.indexOf(lowerVal) < 0) {
            // Don't understand
            return null
        } else if (lowerVal.includes('event')) {
            // Did you mean race
            return true
        } else {
            // OK, carry on
            return false
        }
    }
}