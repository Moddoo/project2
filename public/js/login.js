$(document).ready(function() {
    const login = $(".login");
    const usernameInput = $("#username");
    const passwordInput = $("#password");

    const loginError = () => {
        $("#error").empty().append("Invalid username or password.");
    }

    const loginUser = (username, password) => {
        $.ajax({
            type: "POST",
            url: "/api/login",
            data: {
                username: username,
                password: password
            },
            statusCode: {
                200: res => {
                    window.location.replace("/food-log");
                },
                401: res => {
                    loginError();
                }
            }
        });
    };

    login.on("submit", event => {
        event.preventDefault();

        const username = usernameInput.val().trim();
        const password = passwordInput.val().trim();

        if(!username || !password) {
            loginError();
        }

        loginUser(username, password);

        usernameInput.val("");
        passwordInput.val("");
    });
});