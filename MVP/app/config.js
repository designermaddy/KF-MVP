(function () {
    'use strict';
    var config = {
        iframeUrl: '/Arya/SocialArya/CandidateView?CandidateId={candidateId}&JobId={jobId}'
        , iframeUrlAriyaSavedSearch: 'https://iarya.leoforce.com/Arya/SocialArya/SearchResult?JobId='
        , iframeUrlAriyaSourced: 'https://iarya.leoforce.com/Arya/arya/aryasentemails?jobid='
        , iframeAction: 'https://iarya.leoforce.com/Arya/'
        , hayGroupUrl: 'https://activate.haygroup.com/autologin/autologin.html#/'
        , hayGroupAction: 'https://activate.haygroup.com/v1/actions/login'
        , foreSightGraph: 'https://foresight.futurestep.com/ats/ats_dash.php?sso=true&ssoidprovider=recruiterdesktop'
        //, localUrl: 'https://api.recruiterdesktop.kf4d-qa.com/RD-WebApp'
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
        config.loginUrl = 'https://recruiterdesktop.kf4d-qa.com/saml/rd';
    }
    else if (config.production === 9) {
        config.projectUrl = 'https://api.recruiterdesktop.kf4d.com/RD-WebApp'
        config.logOutUrl = 'https://recruiterdesktop.kf4d.com/'
        config.loginUrl = 'https://recruiterdesktop.kf4d.com/saml/rd';
    }
    else {
        config.projectUrl = 'https://localhost:8080/RD-WebApp'
        config.logOutUrl = 'https://recruiterdesktop.kf4d-qa.com/'
    }





    config.token = "cmRBdXRoVG9rZW46WXpsaU5qZ3dabUV0TmpNMVpTMDBaakF3TFRreU9EVXRPVFJqTVdGaE9XSTJPR1UwT25ObFpYUm9ZV2xoYUcxQWFHVjRZWGRoY21VdVkyOXQsZW1haWw6c2VldGhhaWFobUBoZXhhd2FyZS5jb20sZGVzaWduYXRpb246U2VuaW9yIFRlc3RlcixpZHBVc2VySWQ6ZWM3ZmM0YjMtYzFmYy00ZTFmLTg3NDEtYWI5ZDc0YzgzYzc0LGFyeWFVc2VySWQ6c2VldGhhaWFobUBoZXhhd2FyZS5jb20sYXJ5YVBhc3N3b3JkOldlbGNvbWVAMTIzLGFjdGl2YXRlVXNlcklkOnNlZXRoYWlhaG1AaGV4YXdhcmUuY29tLGFjdGl2YXRlUGFzc3dvcmQ6S29ybkYzcnJ5ISxuYW1lOlNlZXRoYWlhaCxmaXJzdE5hbWU6U2VldGhhaWFoLGxhc3ROYW1lOk0sZGlzcGxheU5hbWU6U2VldGhhaWFoTQ=="



    config.accessTokenSearcher = "";
    config.searcherReq = {};
    config.searcherItemFromKornferry = {};
    config.getAllEngagments = {};
    //test for git public
    //"cmRBdXRoVG9rZW46T1dOa056bGxNbUV0T1dFMVppMDBNV0ZsTFRrME1EUXRPR1kyWWpNelpUUXhORGt5T25Wa1lYbHVRRzF2WW1GamF5NWpiMjA9LGVtYWlsOnVkYXluQG1vYmFjay5jb20sZGVzaWduYXRpb246Q1RPLGlkcFVzZXJJZDplM2ZhMDAzNC1lODNhLTQ4NWQtYTM3Yi01M2RlMzcwOTRhOWYsYXJ5YVVzZXJJZDp1ZGF5bkBtb2JhY2suY29tLGFyeWFQYXNzd29yZDpXZWxjb21lQDEyMyxhY3RpdmF0ZVVzZXJJZDp1ZGF5bkBtb2JhY2suY29tLGFjdGl2YXRlUGFzc3dvcmQ6S29ybkYzcnJ5ISxuYW1lOlVkYXksZmlyc3ROYW1lOlVkYXksbGFzdE5hbWU6TmF5YWssZGlzcGxheU5hbWU6VWRheU4="
    // search express which will be called in three places - agining, requisition tab, engagment tab
    app.value('config', config);

    app.config(function(IdleProvider, KeepaliveProvider) {
      IdleProvider.idle(780);
      IdleProvider.timeout(120);
      KeepaliveProvider.interval(10);
    });

})();
