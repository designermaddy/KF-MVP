(function () {
    'use strict';
    var config = {
        iframeUrl: '/Arya/SocialArya/CandidateView?CandidateId={candidateId}&JobId={jobId}'
        , iframeUrlAriyaSavedSearch: 'https://iarya.leoforce.com/Arya/SocialArya/SearchResult?JobId='
        , iframeAction: 'https://iarya.leoforce.com/Arya/'
        , hayGroupUrl: 'https://activate.haygroup.com/autologin/autologin.html#/'
        , hayGroupAction: 'https://activate.haygroup.com/v1/actions/login'
        , foreSightGraph: 'https://foresight.futurestep.com/ats/ats_dash.php?sso=true&ssoidprovider=recruiterdesktop'
        , localUrl: 'http://172.25.148.147:8080/RD-WebApp'
        , factivaURL: "http://insidekf/KFResources/Pages/FactivaSearch.aspx?PID=33&amp%3bSID=83"
        , onesourceURL: "https://app.avention.com/?firstTime"
        , production: 1 //0 -> dev, 1 -> qa, 9 -> prod
    };
    if (config.production === 0) {
        config.projectUrl = 'https://api.recruiterdesktop.kf4d-dev.com/RD-WebApp';
        config.logOutUrl = 'https://recruiterdesktop.kf4d-dev.com/';
    }
    else if (config.production === 1) {
        config.projectUrl = 'https://api.recruiterdesktop.kf4d-qa.com/RD-WebApp'
        config.logOutUrl = 'https://recruiterdesktop.kf4d-qa.com/'
    }
    else if (config.production === 9) {
        config.projectUrl = 'https://api.recruiterdesktop.kf4d.com/RD-WebApp'
        config.logOutUrl = 'https://recruiterdesktop.kf4d.com/'
    }
    else {
        config.projectUrl = 'https://api.recruiterdesktop.kf4d-qa.com/RD-WebApp'
        config.logOutUrl = 'https://recruiterdesktop.kf4d-qa.com/'
    }
    config.token = "cmRBdXRoVG9rZW46T0RneFlqZ3hPRGN0TldRMVpDMDBOVGd4TFRnek1XSXROVGRrTldFNE56RTNOekF4T2xkbGN5NUdjbVZrWlhKcFkydEFhMjl5Ym1abGNuSjVMbU52YlE9PSxlbWFpbDpXZXMuRnJlZGVyaWNrQGtvcm5mZXJyeS5jb20sZGVzaWduYXRpb246UHJvZHVjdCBNYW5hZ2VyLGlkcFVzZXJJZDo3YzhhYzBhNy02NmVkLTQ4ZGQtOWM5YS01ZTNlZDQ3MTFmODEsYXJ5YVVzZXJJZDp3ZXMuZnJlZGVyaWNrQGtvcm5mZXJyeS5jb20sYXJ5YVBhc3N3b3JkOldlbGNvbWVAMTIzLGFjdGl2YXRlVXNlcklkOndlcy5mcmVkZXJpY2tAa29ybmZlcnJ5LmNvbSxhY3RpdmF0ZVBhc3N3b3JkOktvcm5GM3JyeSEhLG5hbWU6V2VzLGZpcnN0TmFtZTpXZXMsbGFzdE5hbWU6RnJlZGVyaWNrLGRpc3BsYXlOYW1lOldlc0Y="
    app.value('config', config);
})();
