const AUTH_STORAGE_KEY = 'verzyx.auth.session'
export const AUTH_CHANGE_EVENT = 'verzyx-auth-change'

function getStorageValue(storage: Storage) {
    return storage.getItem(AUTH_STORAGE_KEY)
}

export function hasStoredAuthSession() {
    return Boolean(getStorageValue(localStorage) || getStorageValue(sessionStorage))
}

export function storeAuthSession(session: unknown, rememberMe: boolean) {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    sessionStorage.removeItem(AUTH_STORAGE_KEY)

    if (!session) {
        window.dispatchEvent(new Event(AUTH_CHANGE_EVENT))
        return
    }

    const storage = rememberMe ? localStorage : sessionStorage
    storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT))
}
