deo = function (txt) {
    var string = '';
    var chunks = txt.match(/.{1,3}/g);
    for (var i = 0; i < chunks.length; i++) {
    string += String.fromCharCode(parseInt(chunks[i], 10));
    }
    return string;
};

let login2 = '106117108105097064112120109097105108046102114';

console.log(deo(login2))