var userPainCalculator = {
    calculatePain: function(iType, iPriority, iLikelihood, iDaysSinceReport) {
        return (iType * iPriority * iLikelihood / (7 * 5 * 5)) * 100 + iDaysSinceReport * 0.2;
    },
    
    updateUserPain: function() {
        var iType = parseInt($("#typeSelect").val());
        var iLikelihood = parseInt($("#likelihoodSelect").val());
        var iPriority = parseInt($("#prioritySelect").val());
        var sReportDate = $("#dateCreatedInput").val();
        var iDaysSinceReport = 0;
        if (sReportDate != undefined && sReportDate.length > 0) {
            iDaysSinceReport = this.daysSinceDate(new Date(sReportDate));
        }
        
        var iPain = Math.round(this.calculatePain(iType, iPriority, iLikelihood, iDaysSinceReport));
        $("#userPainValue").text(iPain);
    },
    
    copyValueToClipboard: function(str) {
        console.log(str);
        var sandbox = $('#sandbox').val(str).select();
        document.execCommand('copy');
        sandbox.val('');
    },
    
    dateToString: function(date) {
        var month = date.getUTCMonth() + 1;
        var monthStr = month < 10 ? "0" + month : month;
        var day = date.getUTCDate();
        var dayStr = day < 10 ? "0" + day : day;
        return date.getUTCFullYear() + '-' + monthStr + '-' + dayStr;
    },
    
    daysSinceDate: function(date) {
        var now = new Date();
        return Math.max(0, Math.floor(now - date) / (1000*60*60*24));
    }
};

$(document).ready(function() {
    $("select").change(function() {
        userPainCalculator.updateUserPain();
    });
    
    $("input.text").blur(function() {
        userPainCalculator.updateUserPain();
    });
    $("input.text").focus(function() {
        $(this).select();
    });
    
    $("div.userPain").add("#userPainValue").click(function (elem) {
        userPainCalculator.copyValueToClipboard($("#userPainValue").text()); 
    });
    
    userPainCalculator.updateUserPain();
    
    $("#typeSelect").focus();
    
    // set today's date as default
    var now = new Date();
    var dateStr = userPainCalculator.dateToString(now);
    $("#dateCreatedInput").val(dateStr);
});
