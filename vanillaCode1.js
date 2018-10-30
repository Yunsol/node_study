var name = 'window name';

function log () {
    console.log(this.name);
}

var obj = {
    name: 'ken',
    logName: log
}

log(); // undefined
obj.logName(); // ken