(function() {
    'use strict';

    var config = {
        iframeUrl : '/Arya/SocialArya/CandidateView?CandidateId={candidateId}&JobId={jobId}',
        iframeUrlAriyaSavedSearch : 'https://iarya.leoforce.com/Arya/SocialArya/SearchResult?JobId=',
        projectUrl : 'https://api.recruiterdesktop.kf4d-dev.com/RD-WebApp',
        iframeAction : 'https://iarya.leoforce.com/Arya/',
        logOutUrl:'https://recruiterdesktop.kf4d-dev.com',
        hayGroupUrl:'https://testactivate.haygroup.biz/autologin.html#/',
        hayGroupAction:'https://testactivate.haygroup.biz/v1/actions/login',
        foreSightGraph:'https://foresightstage.futurestep.com/ats/ats_dash.php?sso=true&ssoidprovider=recruiterdesktop',
        production : 0
    };

    app.value('config', config);

})();
