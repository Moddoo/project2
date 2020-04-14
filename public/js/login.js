$(document).ready(function() {
    const signIn = $("#signin");
    const usernameInput = $("#signInUsername");
    const passwordInput = $("#signInPassword");
    const usernameEmailForm = $("#forgotUsernameForm");
    const passwordEmailForm = $("#forgotPasswordForm");
    const usernameEmail = $("#usernameEmail");
    const passwordEmail = $("#passwordEmail");

    const signInError = () => {
        $("#signInError").empty().append("<a href='#forgotUsername' class='modal-trigger'>Forgot username</a> | <a href='#forgotPassword' class='modal-trigger'>Forgot password</a>");
        $("#signInError").append("<br>Invalid username or password.");
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

    $("#signInError").append("<a href='#forgotUsername' class='modal-trigger'>Forgot username</a> | <a href='#forgotPassword' class='modal-trigger'>Forgot password</a>");

    usernameEmailForm.on("submit", event => {
        event.preventDefault();
        
        $.get(`/api/email/${usernameEmail.val().trim()}`, res => {
            usernameEmailForm.empty().append("<p class='center'>Your recovery email has been sent.</p>");
            $("#forgotUsernameFormBtn").remove();
        });
    });

    passwordEmailForm.on("submit", event => {
        event.preventDefault();
        
        $.get(`/api/password/${passwordEmail.val().trim()}`, res => {
            passwordEmailForm.empty().append("<p class='center'>Your recovery email has been sent.</p>");
            $("#forgotPasswordFormBtn").remove();
        });
    });
});