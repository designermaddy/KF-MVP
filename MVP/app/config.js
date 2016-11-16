(function() {
    'use strict';

    var config = {
        iframeUrl : '/Arya/SocialArya/CandidateView?CandidateId={candidateId}&JobId={jobId}',
        projectUrl : 'https://api.recruiterdesktop.kf4d-dev.com/RD-WebApp',
        iframeAction : 'https://iarya.leoforce.com/Arya/',
        logOutUrl:'https://recruiterdesktop.kf4d.com',
        production : 0
    };

    app.value('config', config);

})();
