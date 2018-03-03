/*const functions = require('firebase-functions');

exports.userCreate = functions.database.ref('/finalUsers/{$uid}').onCreate(event => {
    const user = event.data.val();
    // increase the number attend of section
    const newUser_SectionKey = user.sectionKey;
    event.data.adminRef.root.child('/sections/' + newUser_SectionKey + '/numberAttend').transaction(function (current_value) {
        console.log('update number attend successfully');
        return (parseInt(current_value) || 0) + 1;
    });
    //Write the id to the user
    event.data.adminRef.root.child('/saves/count').transaction(function(current){
        newId = (parseInt(current) || 0) + 1;
        user.id = newId;
        event.data.ref.set(user);
        console.log('Insert new id and status successfully');

        return newId;
    })

});

exports.userUpdate = functions.database.ref('/finalUsers/{$uid}').onUpdate(event => {

    const originalUser_SectionKey = event.data.previous.val().sectionKey;
    const newUser_SectionKey = event.data.val().sectionKey;
    if (originalUser_SectionKey !== newUser_SectionKey) {
        event.data.adminRef.root.child('/sections/' + newUser_SectionKey + '/numberAttend').transaction(function (current_value) {
            return (parseInt(current_value) || 0) + 1;
        });
        event.data.adminRef.root.child('/sections/' + originalUser_SectionKey + '/numberAttend').transaction(function (current_value) {
            return (parseInt(current_value) || 0) - 1;
        });
    }
});*/
