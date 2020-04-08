$(document).ready(function() {
    const signUp = $(".signup");
    const usernameInput = $("#username");
    const passwordInput = $("#password");

    const signUpError = err => {
        //add in code to handle signup errors
    }

    const createUserAccount = (username, password) => {
        $.post("/api/signup", {
            username: username,
            password: password
        }).then(res => {
            window.location.replace("/food-log");
        });
    };

    signUp.on("submit", event => {
        event.preventDefault();

        const username = usernameInput.val().trim();
        const password = passwordInput.val().trim();

        if(!username || !password) {
            return;
            //put an error message later
        }

        createUserAccount(username, password);

        usernameInput.val("");
        passwordInput.val("");
    })
});