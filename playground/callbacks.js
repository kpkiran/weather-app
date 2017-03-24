var getUser = (id, callback) => {
    var user = {
        id: id,
        name: 'Kiran'
    };
    setTimeout(() => {
        callback(user);
    }, 3000);

};

getUser(31, (userObj) => {
    console.log(userObj);
});

//https: //maps.googleapis.com/maps/api/geocode/json?address=81 4 riverpark driver liverpool nsw