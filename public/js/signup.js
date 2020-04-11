$(document).ready(function() {
    const signUp = $(".signup");
    const usernameInput = $("#username");
    const passwordInput = $("#password");

    const signUpError = message => {
        $("#error").empty().append(message);
    }

    const createUserAccount = (username, password) => {
        $.ajax({
            type: "POST",
            url: "/api/signup",
            data: {
                username: username,
                password: password
            },
            statusCode: {
                200: res => {
                    window.location.replace("/food-log");
                },
                401: res => {
                    signUpError("That username is already taken.");
                }
            }
        })
    };

    signUp.on("submit", event => {
        event.preventDefault();

        const username = usernameInput.val().trim();
        const password = passwordInput.val().trim();

        if(!username || !password) {
            return signUpError("Please enter a username and password.");
        }
        else if(password.length <= 4) {
            return signUpError("Your password must be at least 5 characters long.");
        }

        createUserAccount(username, password);

        usernameInput.val("");
        passwordInput.val("");
    })
});