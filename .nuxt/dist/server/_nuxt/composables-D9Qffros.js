import { computed, ref } from "vue";
import { a as api } from "./api-CdlzmCRK.js";
import { n as navigateTo, i as useState } from "../server.mjs";
const user = ref(null);
const token = ref(null);
const initialized = ref(false);
const useAuth = () => {
  const isAuthenticated = computed(() => !!token.value);
  const isAdmin = computed(() => user.value?.role === "admin");
  const isPenjual = computed(() => user.value?.role === "penjual");
  const checkAuth = async () => {
    return;
  };
  const login = async (email, password) => {
    const data = await api.post("/auth/login", { email, password });
    if (data.access_token) {
      token.value = data.access_token;
      user.value = data.user || null;
    }
    return data;
  };
  const fetchMe = async () => {
    const me = await api.get("/auth/me");
    return me;
  };
  const register = async (payload) => {
    const data = await api.post("/auth/register", payload);
    return data;
  };
  const verifyEmail = async (tokenStr) => {
    return api.post("/auth/verify", { token: tokenStr });
  };
  const logout = async () => {
    try {
      if (token.value) await api.post("/auth/logout");
    } catch {
    } finally {
      token.value = null;
      user.value = null;
      navigateTo("/login");
    }
  };
  const updateProfile = async (payload) => {
    const updated = await api.post("/auth/update-profile", payload);
    user.value = updated;
    return updated;
  };
  return {
    user,
    token,
    initialized,
    isAuthenticated,
    isAdmin,
    isPenjual,
    checkAuth,
    fetchMe,
    login,
    register,
    verifyEmail,
    logout,
    updateProfile
  };
};
const useColorMode = () => {
  return useState("color-mode").value;
};
export {
  useColorMode as a,
  useAuth as u
};
//# sourceMappingURL=composables-D9Qffros.js.map
