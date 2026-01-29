
export const checkCookie = (cookieName:string): string | null => {
    const cookies = document.cookie.split("; ").find((row) => row.startsWith(`${cookieName}=`));
    return cookies ? cookies.split("=")[1] : null;
};
