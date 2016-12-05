(function () {
    'use strict';
    var config = {
        iframeUrl: '/Arya/SocialArya/CandidateView?CandidateId={candidateId}&JobId={jobId}'
        , iframeUrlAriyaSavedSearch: 'https://iarya.leoforce.com/Arya/SocialArya/SearchResult?JobId='
        , iframeAction: 'https://iarya.leoforce.com/Arya/'
        , hayGroupUrl: 'https://activate.haygroup.com/autologin/autologin.html#/'
        , hayGroupAction: 'https://activate.haygroup.com/v1/actions/login'
        , foreSightGraph: 'https://foresight.futurestep.com/ats/ats_dash.php?sso=true&ssoidprovider=recruiterdesktop'
        , localUrl: 'https://api.recruiterdesktop.kf4d-qa.com/RD-WebApp'
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
        config.projectUrl = 'https://localhost:8080/RD-WebApp'
        config.logOutUrl = 'https://recruiterdesktop.kf4d-qa.com/'
    }


 config.token /*="cmRBdXRoVG9rZW46TmprellqUmxOamd0WW1OaE1pMDBabVV3TFRrME16Y3ROMk14WTJNM016TXpaVEE1T2xObFpYUm9ZV2xoYUUxQWFHVjRZWGRoY21VdVkyOXQsZW1haWw6c2VldGhhaWFobUBoZXhhd2FyZS5jb20sZGVzaWduYXRpb246U2VuaW9yIFRlc3RlcixpZHBVc2VySWQ6YTU0ZjRmYWItMGQyOC00NDc2LTg5ZmUtYzViOGQ3M2NhMzhmLGFyeWFVc2VySWQ6c2VldGhhaWFobUBoZXhhd2FyZS5jb20sYXJ5YVBhc3N3b3JkOldlbGNvbWVAMTIzLGFjdGl2YXRlVXNlcklkOnNlZXRoYWlhaG1AaGV4YXdhcmUuY29tLGFjdGl2YXRlUGFzc3dvcmQ6S29ybkYzcnJ5ISxuYW1lOlNlZXRoYWlhaCxmaXJzdE5hbWU6U2VldGhhaWFoLGxhc3ROYW1lOk0sZGlzcGxheU5hbWU6U2VldGhhaWFoTQ=="*/
="cmRBdXRoVG9rZW46T0dJNU5UY3pZV1F0Wm1FMk5TMDBNalE0TFRsaVl6SXRNRGczTVdReU5HWmpaVGMxT25Wa1lYbHVRRzF2WW1GamF5NWpiMjA9LGVtYWlsOnVkYXluQG1vYmFjay5jb20sZGVzaWduYXRpb246Q1RPLGlkcFVzZXJJZDplM2ZhMDAzNC1lODNhLTQ4NWQtYTM3Yi01M2RlMzcwOTRhOWYsYXJ5YVVzZXJJZDp1ZGF5bkBtb2JhY2suY29tLGFyeWFQYXNzd29yZDpXZWxjb21lQDEyMyxhY3RpdmF0ZVVzZXJJZDp1ZGF5bkBtb2JhY2suY29tLGFjdGl2YXRlUGFzc3dvcmQ6S29ybkYzcnJ5ISxuYW1lOlVkYXksZmlyc3ROYW1lOlVkYXksbGFzdE5hbWU6TmF5YWssZGlzcGxheU5hbWU6VWRheU4="

 //config.accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiJFQUFBQU5rU1N4RUQwNkxXVGVwUm9yR1FtY2RqYTdwWmxncHAyVzl2ZnVSKzNkVjZyc25yMjNHZWE4emF1S1gyZGhnZUxmVDBDb3JMSFppMzBxR2szLzdiQXk0PSIsImlzcyI6Imh0dHBzOi8vbmFhcGkuc2Uua29ybmZlcnJ5LmNvbSIsImF1ZCI6Imh0dHBzOi8vbmFhcGkuc2Uua29ybmZlcnJ5LmNvbSIsImV4cCI6MTQ4MDY3NzUxNSwibmJmIjoxNDgwNjc2MzE1fQ.kvB-6g_Pr4XXqOHpsIcCDuRna9HUSQP5vwA8u-YhKHA  ";

//config.cookie = "__kfseit=EAAAAFivnN90qpRZzgucZHyGrUQul2qtYU6ssqQnOZLD+M2PFLlZcUtITu956OFwJAObqXzo0vzIG4sSYuxT3GWPIKwEa1aQKfLL+nWxNg9VEOAxKNs5gSFZKLR2Xv9UWSSAY3D8tX/u3L98rbkoEBhuayMb0r/QVri5jGiGqkqroot8; __kfsest3bd329bc5ceb9f21e135b4af7a2cd359=EAAAAFcKDVIMfkyrYtOGmBBE/3mSmy1hFS/cX/y353Bj4BglDl6ds0RbgECSk9PN4jQoylwcMjzXuXdxYaFHoB5J0AqSj5vdkqYG6qV56ydv3/bqTWd9rYosscFSGpt1ifqB5dVT3ntxI1+ewvUVx/S21IH6MmlUDlRbL3ufClffJEbF1q+vAo5NpEQnfnuYFscAWgIa28JX0Fc5Jaf/u/jBqVp15hup1lBaJz3m8vWMIMXxMo6BVLpX+faMnoszPE76laNC2iC/jfKVWA34vYaUSec=";
     //"cmRBdXRoVG9rZW46T1dOa056bGxNbUV0T1dFMVppMDBNV0ZsTFRrME1EUXRPR1kyWWpNelpUUXhORGt5T25Wa1lYbHVRRzF2WW1GamF5NWpiMjA9LGVtYWlsOnVkYXluQG1vYmFjay5jb20sZGVzaWduYXRpb246Q1RPLGlkcFVzZXJJZDplM2ZhMDAzNC1lODNhLTQ4NWQtYTM3Yi01M2RlMzcwOTRhOWYsYXJ5YVVzZXJJZDp1ZGF5bkBtb2JhY2suY29tLGFyeWFQYXNzd29yZDpXZWxjb21lQDEyMyxhY3RpdmF0ZVVzZXJJZDp1ZGF5bkBtb2JhY2suY29tLGFjdGl2YXRlUGFzc3dvcmQ6S29ybkYzcnJ5ISxuYW1lOlVkYXksZmlyc3ROYW1lOlVkYXksbGFzdE5hbWU6TmF5YWssZGlzcGxheU5hbWU6VWRheU4="

app.value('config', config);
})();
