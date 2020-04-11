$(document).ready(function() {
    const signUp = $("#signup");
    const usernameInput = $("#username");
    const emailInput = $("#email");
    const passwordInput1 = $("#password1");
    const passwordInput2 = $("#password2");

    const signUpError = message => {
        $("#signUpError").empty().append(message);
    }

    const createUserAccount = (username, email, password) => {
        $.post("/api/signup", {
            username: username,
            email: email,
            password: password
        }, res => {
            console.log(res);

            if(res === "OK") {
                window.location.replace("/");
            }
            else if(res.errors[0].message === "users.username must be unique") {
                signUpError("That username is already taken.");
            }
            else if(res.errors[0].message === "users.email must be unique") {
                signUpError("That email has already been registered.");
            }
        });
    };

    signUp.on("submit", event => {
        event.preventDefault();

        const username = usernameInput.val().trim();
        const email = emailInput.val().trim();
        const password1 = passwordInput1.val().trim();
        const password2 = passwordInput2.val().trim();

        if(password1 !== password2) {
            return signUpError("Passwords do not match.");
        }
        else if(password1.length <= 4 || password2.length <= 4) {
            return signUpError("Your password must be at least 5 characters long.");
        }

        createUserAccount(username, email, password1);

        usernameInput.val("");
        emailInput.val("");
        passwordInput1.val("");
        passwordInput2.val("");
    })
});