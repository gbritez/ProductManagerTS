async function getCartId() {
    try {
        const response = await fetch("/api/session/current");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.cart || null;
    } catch (error) {
        console.error("Error fetching cart ID:", error);
        return null;
    }
};

function setCookie(cookieName, value) {
    document.cookie = `${cookieName} = ${value};expires=30000; `
}

function getCookie(cookieName) {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}