(function() {
    'use strict';

    var config = {
        iframeUrl : '/Arya/SocialArya/CandidateView?CandidateId={candidateId}&JobId={jobId}',
        iframeUrlAriyaSavedSearch : 'https://iarya.leoforce.com/Arya/SocialArya/SearchResult?JobId=',
        projectUrl : 'https://api.recruiterdesktop.kf4d.com/RD-WebApp',
        iframeAction : 'https://iarya.leoforce.com/Arya/',
        logOutUrl:'https://recruiterdesktop.kf4d.com',
        hayGroupUrl:'https://testactivate.haygroup.biz/autologin.html#/',
        hayGroupAction:'https://testactivate.haygroup.biz/v1/actions/login',
        production : 1
    };

    app.value('config', config);

})();
