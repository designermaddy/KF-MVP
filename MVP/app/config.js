(function() {
    'use strict';

    var config = {
        iframeUrl : '/Arya/SocialArya/CandidateView?CandidateId={candidateId}&JobId={jobId}',
        iframeUrlAriyaSavedSearch : 'https://iarya.leoforce.com/Arya/SocialArya/SearchResult?JobId=',
        iframeAction : 'https://iarya.leoforce.com/Arya/',
        hayGroupUrl:'https://testactivate.haygroup.biz/autologin.html#/',
        hayGroupAction:'https://testactivate.haygroup.biz/v1/actions/login',
        foreSightGraph:'https://foresightstage.futurestep.com/ats/ats_dash.php?sso=true&ssoidprovider=recruiterdesktop',
        production : 0 //0 -> dev, 1 -> qa, 9 -> prod
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

 config.token = "cmRBdXRoVG9rZW46WkdVNE5qRm1aVGt0TXpjNFpTMDBNR00yTFdJeU1qTXRNMkUyWXpsallqaGxORFppT25Wa1lYbHVRRzF2WW1GamF5NWpiMjA9LGVtYWlsOnVkYXluQG1vYmFjay5jb20sZGVzaWduYXRpb246Q1RPLGlkcFVzZXJJZDphNGQ2M2NhNy04Y2Y5LTQxY2ItYWJiNS1kNGIyMGJmZTkxZTMsYXJ5YVVzZXJJZDp1ZGF5YW5AbW9iYWNrLmNvbSxhcnlhUGFzc3dvcmQ6V2VsY29tZUAxMjMsYWN0aXZhdGVVc2VySWQ6dWRheW5AbW9iYWNrLmNvbSxhY3RpdmF0ZVBhc3N3b3JkOktvcm5GM3JyeSEsbmFtZTpVZGF5LGZpcnN0TmFtZTpVZGF5LGxhc3ROYW1lOk5heWFrLGRpc3BsYXlOYW1lOlVkYXlO";
    app.value('config', config);

})();
