export interface PlayerLogoutEvent {
    playerId: String
    type: "logout"
}

export interface PlayerLoginEvent {
    playerId: String
    type: "login"
}