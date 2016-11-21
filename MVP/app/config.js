(function() {
    'use strict';

    var config = {
        iframeUrl : '/Arya/SocialArya/CandidateView?CandidateId={candidateId}&JobId={jobId}',
        projectUrl : 'https://api.recruiterdesktop.kf4d-qa.com/RD-WebApp',
        iframeAction : 'https://iarya.leoforce.com/Arya/',
        logOutUrl:'https://recruiterdesktop.kf4d-qa.com',
        hayGroupUrl:'https://testactivate.haygroup.biz/autologin.html#/',
        hayGroupAction:'https://testactivate.haygroup.biz/v1/actions/login',
        production : 0
    };

    app.value('config', config);

})();
