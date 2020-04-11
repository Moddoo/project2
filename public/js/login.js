$(document).ready(function() {
    const signIn = $("#signin");
    const usernameInput = $("#signInUsername");
    const passwordInput = $("#signInPassword");

    const signInError = () => {
        $("#signInError").empty().append("Invalid username or password.");
    }

    const signInUser = (username, password) => {
        $.ajax({
            type: "POST",
            url: "/api/login",
            data: {
                username: username,
                password: password
            },
            statusCode: {
                200: res => {
                    window.location.replace("/");
                },
                401: res => {
                    signInError();
                }
            }
        });
    };

    signIn.on("submit", event => {
        console.log("here");
        event.preventDefault();

        const username = usernameInput.val().trim();
        const password = passwordInput.val().trim();

        if(!username || !password) {
            signInError();
        }

        console.log(username, password);

        signInUser(username, password);

        usernameInput.val("");
        passwordInput.val("");
    });
});