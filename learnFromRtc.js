  devices.forEach((item)=>{
       const option = document.createElement('option')
        if(item.kind=="audiooutput"){
            console.log(item)

        }
    })


this option create from js to render in the dom



 
let notifyBtn  = document.getElementById("notifyBtn")

Notification.requestPermission().then((permission) => {
    if (permission !== "granted") {
        return; // Stop if the permission is not granted
    }

    // Create the notification only if permission is granted
    const notification = new Notification("To-Do List", {
        body: "You have an unread message!",
    });

    // Optionally, you can add event listeners to the notification
    notification.onclick = () => {
        console.log("Notification clicked!");
    };
});
