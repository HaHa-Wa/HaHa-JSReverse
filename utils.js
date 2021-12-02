var window = {
    atob :
        function (strText){return new Buffer.from(strText, "base64").toString("binary")},
    btoa: function (strText){new Buffer.from(strText, "binary").toString("base64")}
}