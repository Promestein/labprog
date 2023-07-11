import Keycloak from "keycloak-js";
import axios from "axios";

const keycloak = new Keycloak({
  url: process.env.KEYCLOAK_URL,
  realm: process.env.KEYCLOAK_REALM,
  clientId: process.env.KEYCLOAK_CLIENTID,
});

function tokenInterceptor(keycloak) {
  axios.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${keycloak.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}

function createRefreshTokenTimer(keycloak) {
  setInterval(() => {
    keycloak
      .updateToken(70)
      .then((refreshed) => {
        if (refreshed) {
          console.log("Token refreshed" + refreshed);
        } else {
          console.log(
            "Token not refreshed, valid until " +
              new Date(keycloak.tokenParsed.exp * 1000)
          );
        }
      })
      .catch(() => {
        console.log("Failed to refresh token");
      });
  }, 70000);
}

export default ({ app }) => {
  return new Promise((resolve) => {
    if (window.location.href.includes("logout")) {
      window.location.href = process.env.HOME_PAGE;
    } else {
      window.location.href = window.location.href;
    }
    keycloak
      .init({
        onLoad: "login-required",
        checkLoginIframe: false,
        flow: "hybrid",
        pkceMethod: "S256",
        redirectUri: window.location.href,
      })
      .then(async (authenticated) => {
        if (authenticated) {
          console.log("Authenticated");
          await createRefreshTokenTimer(keycloak);
          window.location.href = window.location.href;
          resolve();
        } else {
          console.log("Not authenticated");
        }
      })
      .catch((error) => {
        console.log("Authentication failure", error);
      });

    keycloak.onReady = (authenticated) => {
      if (authenticated) {
        console.log("Authenticated");
        tokenInterceptor(keycloak);
      } else {
        console.log("Not authenticated");
      }
    };

    const appInstance = app;

    appInstance.config.globalProperties.$keycloak = keycloak;
    appInstance.use(keycloak);
  });
};
