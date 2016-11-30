(function() {
    'use strict';

    var config = {
        iframeUrl : '/Arya/SocialArya/CandidateView?CandidateId={candidateId}&JobId={jobId}',
        iframeUrlAriyaSavedSearch : 'https://iarya.leoforce.com/Arya/SocialArya/SearchResult?JobId=',
        iframeAction : 'https://iarya.leoforce.com/Arya/',
        hayGroupUrl:'https://testactivate.haygroup.biz/autologin.html#/',
        hayGroupAction:'https://testactivate.haygroup.biz/v1/actions/login',
        foreSightGraph:'https://foresightstage.futurestep.com/ats/ats_dash.php?sso=true&ssoidprovider=recruiterdesktop',
        localUrl : 'http://172.25.148.147:8080/RD-WebApp',
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

 config.token ="cmRBdXRoVG9rZW46T1dOa056bGxNbUV0T1dFMVppMDBNV0ZsTFRrME1EUXRPR1kyWWpNelpUUXhORGt5T25Wa1lYbHVRRzF2WW1GamF5NWpiMjA9LGVtYWlsOnVkYXluQG1vYmFjay5jb20sZGVzaWduYXRpb246Q1RPLGlkcFVzZXJJZDplM2ZhMDAzNC1lODNhLTQ4NWQtYTM3Yi01M2RlMzcwOTRhOWYsYXJ5YVVzZXJJZDp1ZGF5bkBtb2JhY2suY29tLGFyeWFQYXNzd29yZDpXZWxjb21lQDEyMyxhY3RpdmF0ZVVzZXJJZDp1ZGF5bkBtb2JhY2suY29tLGFjdGl2YXRlUGFzc3dvcmQ6S29ybkYzcnJ5ISxuYW1lOlVkYXksZmlyc3ROYW1lOlVkYXksbGFzdE5hbWU6TmF5YWssZGlzcGxheU5hbWU6VWRheU4="
     //"cmRBdXRoVG9rZW46TTJNNVlqVXhOMk10Tm1ZMU5pMDBaVEZqTFRrNVlqa3RPVFE0TlRNNE5XSTJORGd5T2xkbGN5NUdjbVZrWlhKcFkydEFhMjl5Ym1abGNuSjVMbU52YlE9PSxlbWFpbDpXZXMuRnJlZGVyaWNrQGtvcm5mZXJyeS5jb20sZGVzaWduYXRpb246UHJvZHVjdCBNYW5hZ2VyLGlkcFVzZXJJZDo3YzhhYzBhNy02NmVkLTQ4ZGQtOWM5YS01ZTNlZDQ3MTFmODEsYXJ5YVVzZXJJZDp3ZXMuZnJlZGVyaWNrQGtvcm5mZXJyeS5jb20sYXJ5YVBhc3N3b3JkOldlbGNvbWVAMTIzLGFjdGl2YXRlVXNlcklkOndlcy5mcmVkZXJpY2tAa29ybmZlcnJ5LmNvbSxhY3RpdmF0ZVBhc3N3b3JkOktvcm5GM3JyeSEsbmFtZTpXZXMsZmlyc3ROYW1lOldlcyxsYXN0TmFtZTpGcmVkZXJpY2ssZGlzcGxheU5hbWU6V2VzRg==";


    app.value('config', config);

})();
