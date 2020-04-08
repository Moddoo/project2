$(document).ready(function() {
    const login = $(".login");
    const usernameInput = $("#username");
    const passwordInput = $("#password");

    const loginError = err => {
        //add in code to handle login errors
    }

    const loginUser = (username, password) => {
        $.post("/api/login", {
            username: username,
            password: password
        }).then(res => {
            console.log(res);
            window.location.replace("/food-log")
        });
    };

    login.on("submit", event => {
        event.preventDefault();

        const username = usernameInput.val().trim();
        const password = passwordInput.val().trim();

        if(!username || !password) {
            return;
            //put an error message later
        }

        loginUser(username, password);

        usernameInput.val("");
        passwordInput.val("");
    });
});
