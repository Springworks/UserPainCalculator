var userPainCalculator = {
    calculatePain: function(iType, iPriority, iLikelihood) {
        return (iType * iPriority * iLikelihood / (7 * 5 * 5)) * 100;
    },
    
    updateUserPain: function() {
        var iType = parseInt($("#typeSelect").val());
        var iLikelihood = parseInt($("#likelihoodSelect").val());
        var iPriority = parseInt($("#prioritySelect").val());
        var iPain = Math.round(this.calculatePain(iType, iPriority, iLikelihood));
        $("#userPainValue").text(iPain);
    },
    
    copyValueToClipboard: function(str) {
        console.log(str);
        var sandbox = $('#sandbox').val(str).select();
        document.execCommand('copy');
        sandbox.val('');
    }
};

$(document).ready(function() {
    $("select").change(function() {
        userPainCalculator.updateUserPain();
    });
    
    $("div.userPain").add("#userPainValue").click(function (elem) {
        userPainCalculator.copyValueToClipboard($("#userPainValue").text()); 
    });
    
    userPainCalculator.updateUserPain();
    
    $("#typeSelect").focus();
});
