// utils/authUtils.js - Các tiện ích xử lý dữ liệu xác thực

import Cookies from 'js-cookie';

/**
 * Interface cho dữ liệu đăng nhập
 * @typedef {Object} AuthData
 * @property {Object} user - Thông tin người dùng
 * @property {string} [token] - Token xác thực
 * @property {string} [sessionId] - ID phiên
 */

/**
 * Lưu dữ liệu xác thực vào cache
 * @param {AuthData} data - Dữ liệu xác thực
 * @param {boolean} rememberMe - Tùy chọn ghi nhớ đăng nhập
 */
export const storeAuthData = (data, rememberMe = false) => {
    // Thời gian hết hạn cho cookies (ngày)
    const expiryDays = rememberMe ? 30 : 1;
    const sessionOnly = !rememberMe;

    // 1. Lưu token xác thực
    if (data.token) {
        // Lưu vào localStorage
        localStorage.setItem("authToken", data.token);

        // Lưu vào sessionStorage
        sessionStorage.setItem("authToken", data.token);

        // Lưu vào cookies với các tùy chọn phù hợp
        if (rememberMe) {
            // Cookie dài hạn nếu "ghi nhớ đăng nhập"
            Cookies.set("authToken", data.token, {
                expires: expiryDays,
                path: '/',
                secure: window.location.protocol === 'https:'
            });
        } else {
            // Cookie phiên nếu không "ghi nhớ đăng nhập"
            Cookies.set("authToken", data.token, {
                path: '/',
                secure: window.location.protocol === 'https:'
            });
        }
    }

    // 2. Lưu session ID
    if (data.sessionId) {
        // Lưu vào cookies
        Cookies.set("sessionId", data.sessionId, sessionOnly ? {} : { expires: expiryDays });

        // Lưu vào localStorage để dễ truy cập
        localStorage.setItem("sessionId", data.sessionId);
    }

    // 3. Lưu thông tin người dùng
    if (data.user) {
        // Lưu dưới nhiều định dạng để đảm bảo dễ truy cập

        // Lưu object đầy đủ
        localStorage.setItem("user", JSON.stringify(data.user));
        sessionStorage.setItem("user", JSON.stringify(data.user));

        // Lưu email riêng biệt để dễ truy cập
        if (data.user.email) {
            localStorage.setItem("userEmail", data.user.email);
            sessionStorage.setItem("userEmail", data.user.email);
        }

        // Lưu các trường riêng biệt để dễ truy cập
        if (data.user.id) localStorage.setItem("userId", data.user.id);
        if (data.user.name) localStorage.setItem("userName", data.user.name);
        if (data.user.isVerified !== undefined) {
            localStorage.setItem("userVerified", data.user.isVerified ? "true" : "false");
        }
    }

    // 4. Lưu thời gian đăng nhập
    const loginTimestamp = Date.now();
    localStorage.setItem("loginTime", loginTimestamp.toString());

    // 5. Lưu trạng thái đăng nhập
    localStorage.setItem("isLoggedIn", "true");

    // 6. Lưu dữ liệu phiên làm việc
    const sessionData = {
        loginTime: loginTimestamp,
        user: data.user,
        token: data.token,
        sessionId: data.sessionId,
        rememberMe: rememberMe
    };
    localStorage.setItem("sessionData", JSON.stringify(sessionData));

    console.log("Đã lưu dữ liệu đăng nhập vào cache:", {
        user: data.user ? `${data.user.name} (${data.user.email})` : 'Không có',
        token: data.token ? "Đã lưu" : "Không có",
        sessionId: data.sessionId ? "Đã lưu" : "Không có",
        rememberMe,
        loginTime: new Date(loginTimestamp).toLocaleString()
    });
};

/**
 * Kiểm tra xem người dùng đã đăng nhập hay chưa
 * @returns {boolean} - Trạng thái đăng nhập
 */
export const isLoggedIn = () => {
    // Kiểm tra từ localStorage và cookies
    const authToken = localStorage.getItem("authToken") || Cookies.get("authToken");
    const sessionId = Cookies.get("sessionId");
    const isLoggedInFlag = localStorage.getItem("isLoggedIn") === "true";
    const userString = localStorage.getItem("user");

    // Cần có ít nhất token/session và thông tin user
    if ((authToken || sessionId) && userString && isLoggedInFlag) {
        try {
            // Kiểm tra xem thông tin user có hợp lệ không
            const userData = JSON.parse(userString);
            if (userData && userData.email) {
                return true;
            }
        } catch (e) {
            console.error("Lỗi khi parse thông tin user:", e);
            return false;
        }
    }

    return false;
};

/**
 * Lấy thông tin người dùng từ cache
 * @returns {Object|null} - Thông tin người dùng hoặc null nếu không có
 */
export const getCurrentUser = () => {
    try {
        const userString = localStorage.getItem("user");
        if (!userString) return null;

        return JSON.parse(userString);
    } catch (e) {
        console.error("Lỗi khi lấy thông tin người dùng:", e);
        return null;
    }
};

/**
 * Lấy token xác thực từ cache
 * @returns {string|null} - Token xác thực hoặc null nếu không có
 */
export const getAuthToken = () => {
    return localStorage.getItem("authToken") || Cookies.get("authToken") || null;
};

/**
 * Lấy ID phiên từ cache
 * @returns {string|null} - ID phiên hoặc null nếu không có
 */
export const getSessionId = () => {
    return Cookies.get("sessionId") || localStorage.getItem("sessionId") || null;
};

/**
 * Xóa tất cả dữ liệu xác thực khỏi cache
 */
export const clearAuthData = () => {
    // 1. Xóa dữ liệu từ localStorage
    const keysToRemove = [
        "user", "userEmail", "userId", "userName", "userVerified",
        "authToken", "sessionId", "isLoggedIn", "loginTime", "sessionData"
    ];

    keysToRemove.forEach(key => {
        localStorage.removeItem(key);
    });

    // 2. Xóa dữ liệu từ sessionStorage
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userEmail");

    // 3. Xóa cookies
    Cookies.remove("authToken");
    Cookies.remove("sessionId");

    // Xóa với đường dẫn cụ thể
    Cookies.remove("authToken", { path: '/' });
    Cookies.remove("sessionId", { path: '/' });

    console.log("Đã xóa tất cả dữ liệu xác thực khỏi cache");
};

/**
 * Làm mới dữ liệu phiên - cập nhật thời gian hoạt động gần nhất
 */
export const refreshSession = () => {
    const lastActivity = Date.now();
    localStorage.setItem("lastActivity", lastActivity.toString());

    // Cập nhật dữ liệu phiên nếu có
    try {
        const sessionDataStr = localStorage.getItem("sessionData");
        if (sessionDataStr) {
            const sessionData = JSON.parse(sessionDataStr);
            sessionData.lastActivity = lastActivity;
            localStorage.setItem("sessionData", JSON.stringify(sessionData));
        }
    } catch (e) {
        console.error("Lỗi khi làm mới phiên:", e);
    }
};

/**
 * Cập nhật thông tin người dùng trong cache
 * @param {Object} userData - Thông tin người dùng mới
 */
export const updateUserData = (userData) => {
    try {
        // Lấy dữ liệu người dùng hiện tại
        const currentUserStr = localStorage.getItem("user");
        const currentUser = currentUserStr ? JSON.parse(currentUserStr) : {};

        // Hợp nhất dữ liệu cũ và mới
        const updatedUser = { ...currentUser, ...userData };

        // Lưu lại
        localStorage.setItem("user", JSON.stringify(updatedUser));
        sessionStorage.setItem("user", JSON.stringify(updatedUser));

        // Cập nhật các trường riêng lẻ
        if (userData.email) {
            localStorage.setItem("userEmail", userData.email);
            sessionStorage.setItem("userEmail", userData.email);
        }

        if (userData.name) localStorage.setItem("userName", userData.name);
        if (userData.id) localStorage.setItem("userId", userData.id);
        if (userData.isVerified !== undefined) {
            localStorage.setItem("userVerified", userData.isVerified ? "true" : "false");
        }

        // Cập nhật dữ liệu phiên
        try {
            const sessionDataStr = localStorage.getItem("sessionData");
            if (sessionDataStr) {
                const sessionData = JSON.parse(sessionDataStr);
                sessionData.user = updatedUser;
                localStorage.setItem("sessionData", JSON.stringify(sessionData));
            }
        } catch (e) {
            console.error("Lỗi khi cập nhật phiên:", e);
        }

        console.log("Đã cập nhật thông tin người dùng trong cache:", updatedUser);
    } catch (e) {
        console.error("Lỗi khi cập nhật thông tin người dùng:", e);
    }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    storeAuthData,
    isLoggedIn,
    getCurrentUser,
    getAuthToken,
    getSessionId,
    clearAuthData,
    refreshSession,
    updateUserData
};