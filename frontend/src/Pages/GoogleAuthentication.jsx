const { useEffect, useState } = require("react");

export const GoogleAuthentication = () => {
    const [accessTokenTemp, setAccessTokenTemp] = useState('');
    const gapi = window.gapi;
    const google = window.google;

    const CLIENT_ID = '643520224272-j46gqdpdct7599l8ss7p2bc0b48jjpa2.apps.googleusercontent.com';
    const API_KEY = 'AIzaSyCA_aNZjpV6CQNDmq4zVv46PldHsfF2Ji0';
    const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
    const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

    let accessToken = localStorage.getItem('access_token');
    let expiresIn = localStorage.getItem('expires_in');

    useEffect(() => {
        accessToken = localStorage.getItem('access_token');
        expiresIn = localStorage.getItem('expires_in');
    },[accessTokenTemp])

    let gapiInited = false, gisInited = false;
    let tokenClient;

    useEffect (() => {
        gapiLoaded();
        gisLoaded();
    },[])

    function gapiLoaded() {
        gapi.load('client', initializeGapiClient);
    }

    async function initializeGapiClient() {
        await gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: [DISCOVERY_DOC],
        });
        gapiInited = true;
        maybeEnableButtons();
    }

    function gisLoaded() {
        tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: SCOPES,
            callback: '', // defined later
        });
        gisInited = true;
        maybeEnableButtons();
    }

    function maybeEnableButtons() {
        if (gapiInited && gisInited) {
        document.getElementById('authorize_button').style.visibility = 'visible';
        }
    }

    function handleAuthClick() {
        tokenClient.callback = async (resp) => {
            if (resp.error !== undefined) {
                throw (resp);
            }
            await listUpcomingEvents();
            const {access_token, expires_in} = gapi.client.getToken();
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('expires_in', expires_in);
            setAccessTokenTemp(access_token);
        };

        if (!(accessToken && expiresIn)) {
        // Prompt the user to select a Google Account and ask for consent to share their data
        // when establishing a new session.
        tokenClient.requestAccessToken({prompt: 'consent'});
        } else {
        // Skip display of account chooser and consent dialog for an existing session.
        tokenClient.requestAccessToken({prompt: ''});
        }
    }

    function handleSignoutClick() {
        const token = gapi.client.getToken();
        console.log('tokem', token)
        if (token) {
            google.accounts.oauth2.revoke(token.access_token);
            gapi.client.setToken('');
            document.getElementById('content').innerText = '';
            document.getElementById('authorize_button').innerText = 'Authorize';
            document.getElementById('signout_button').style.visibility = 'hidden';
            localStorage.removeItem('access_token');
            localStorage.removeItem('expires_in');
            setAccessTokenTemp('');
        }
    }

    async function listUpcomingEvents() {
        let response;
        try {
        const request = {
            'calendarId': 'primary',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime',
        };
        response = await gapi.client.calendar.events.list(request);
        } catch (err) {
        document.getElementById('content').innerText = err.message;
        return;
        }

        const events = response.result.items;
        if (!events || events.length == 0) {
        document.getElementById('content').innerText = 'No events found.';
        return;
        }
        // Flatten to string to display
        const output = events.reduce(
            (str, event) => `${str}${event.summary} (${event.start.dateTime || event.start.date})\n`,
            'Events:\n');
        document.getElementById('content').innerText = output;
    }

    function addManualEvent () {
        const event = {
            kind: 'calendar#event',
            summary: 'Meeting with John Doe',
            description: 'Discuss project timeline',
            start: {
                dateTime: new Date('2024-07-25T10:00:00').toISOString(),
                timeZone: 'UTC',
            },
            end: {
                dateTime: new Date('2024-07-25T11:00:00').toISOString(),
                timeZone: 'UTC',
            },
            timeZone: 'UTC',
            attendees: [
                {'email':'yvaishnav90@gmail.com', responseStatus: 'needsAction'}
            ], //
            // guestsCanSeeOtherGuests: true,
            recurrence: ['RRULE:FREQ=DAILY;COUNT=1'],
            reminders: {'useDefault': true},
            accessToken: accessToken
          };

          var request =  gapi.client.calendar.events.insert({'calendarId': 'primary', 'resource': event, 'sendUpdates': 'all'});
          request.execute((event) => {
            // axios.post()
            console.log('event', event);
            // window.open(event.htmlLink)
          }, (error) => {
            console.error('error', error);
          })
    }

    return (
        <>
            <button id="authorize_button" hidden={accessToken && expiresIn} onClick={handleAuthClick}>Authorize</button>
            <button id="signout_button" hidden={!accessToken && !expiresIn} onClick={handleSignoutClick}>Sign Out</button>
            <button id="add_manual_event" hidden={!accessToken && !expiresIn} onClick={addManualEvent}>Add Event</button>
            <pre id="content" style={{whiteSpace: 'pre-wrap'}}></pre>
        </>
    )
}