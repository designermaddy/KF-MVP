(function() {
    'use strict';

    var config = {
        iframeUrl : '/Arya/SocialArya/CandidateView?CandidateId={candidateId}&JobId={jobId}',
        iframeUrlAriyaSavedSearch : 'https://iarya.leoforce.com/Arya/SocialArya/SearchResult?JobId=',
        iframeAction : 'https://iarya.leoforce.com/Arya/',
        hayGroupUrl:'https://testactivate.haygroup.biz/autologin.html#/',
        hayGroupAction:'https://testactivate.haygroup.biz/v1/actions/login',
        foreSightGraph:'https://foresightstage.futurestep.com/ats/ats_dash.php?sso=true&ssoidprovider=recruiterdesktop',
        production : 1 //0 -> dev, 1 -> qa, 9 -> prod
    };

    if (config.production === 0){
        config.projectUrl = 'https://api.recruiterdesktop.kf4d-dev.com/RD-WebApp' ;
        config.logOutUrl = 'https://recruiterdesktop.kf4d-dev.com/';
     }else  if ( config.production === 1){
        config.projectUrl = 'https://api.recruiterdesktop.kf4d-qa.com/RD-WebApp'
        config.logOutUrl = 'https://recruiterdesktop.kf4d-qa.com/'
    }else if (config.production === 9){
        config.projectUrl = 'https://api.recruiterdesktop.kf4d.com/RD-WebApp'
        config.logOutUrl = 'https://recruiterdesktop.kf4d.com/'
    }else {
        config.projectUrl = 'https://api.recruiterdesktop.kf4d-qa.com/RD-WebApp'
        config.logOutUrl = 'https://recruiterdesktop.kf4d-qa.com/'
    }


    app.value('config', config);

})();
