import React, {Component} from 'react';
import PropTypes from 'prop-types';

const isDOMReady = !!((typeof window !== 'undefined' && window.document && window.document.createElement));

const MethodList = ["identify", "goal", "updateUserData", "start", "stop", "refresh", "show", "hide", "on"];


/**
 * Shared vars
 *
 * */
const SignalayerAPI = {};
const BeforeLoadAPIRequests = [];

function waitForSignalayerAPI(method, args) {
    if (window.Signalayer && window.Signalayer.API) {
        window.Signalayer.API[method].apply(null, args);
    } else {
        setTimeout(function () {
            waitForSignalayerAPI(method, args);
        }, 250);
    }
}

/**
 * Temp API methods (until player API loaded)
 *
 * */
MethodList.forEach((methodName) => {
    SignalayerAPI[methodName] = function (method) {
        return function () {
            const args = Array.prototype.slice.call(arguments);

            if (!window.Signalayer) {
                BeforeLoadAPIRequests.push({method: method, args: args})
            } else if (window.Signalayer && window.Signalayer.API) {
                window.Signalayer.API[method].apply(null, args);
            } else {
                waitForSignalayerAPI(method, args);
            }
        }
    }(methodName)
});


export {SignalayerAPI};


/**
 * Signalayer Main Component player.js
 *
 * */

export default class SignalayerPlayer extends Component {
    static propTypes = {
        projectId: PropTypes.string.isRequired,
        userData: PropTypes.object,
        async: PropTypes.bool
    };

    static displayName = 'Signalayer';

    constructor(props) {
        super(props);

        const {
            projectId,
            userData,
            async,
            ...otherProps,
        } = props;

        if (!projectId || !isDOMReady) {
            return;
        }

        if (!window.Signalayer) {
            ((w, t, e) => {
                w.Signalayer = {
                    _apiKey: projectId,
                    cs: BeforeLoadAPIRequests
                };

                let n = t.createElement(e);
                let s = t.getElementsByTagName(e)[0];

                n.src = "https://cdn.signalayer.com/static/player.js";
                n.type = "text/javascript";
                n.async = (typeof async !== 'undefined') ? async : true;
                s.parentNode.insertBefore(n, s);
            })(window, document, "script");
        }

        if (userData) window.SignalayerUserData = userData;
    }

    componentWillReceiveProps(nextProps) {
        const {
            projectId,
            userData,
            ...otherProps,
        } = nextProps;

        if (!isDOMReady) return;

        if (!window.Signalayer) {
            if (userData) window.SignalayerUserData = userData;
        } else {

        }
    }

    shouldComponentUpdate() {
        return false;
    }

    componentWillUnmount() {
        if (!isDOMReady || !window.Signalayer) {
            return false;
        }

        try {
            window.Signalayer.API.stop();
        } catch (e) {
            console.error(e);
        }

        delete window.Signalayer;
        delete window.SignalayerUserData;
    }


    render() {
        return false;
    }
}