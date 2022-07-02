export interface CensusMessage {
    service: CensusService,
    event: CensusEvent,
    payload: CensusPayload,
    type: String
}

export interface CensusPayload {
    attacker_character_id: String
    character_id: String
    attacker_loadout_id: String
    character_loadout_id: String
    event_name: String
    is_headshot: String
    experience_id: String
    other_id: String
    facility_id: String
    world_id: String
    zone_id: String
}

export enum CensusEvent {
    DEATH = "Death",
    ASSIST = "GainExperience_experience_id_2",
    EXTREME_THREAT_KILL_ASSIST = "GainExperience_experience_id_372",
    HIGH_THREAT_KILL_ASSIS = "GainExperience_experience_id_371",
    REVIVE = "GainExperience_experience_id_7",
    SQUAD_REVIVE = "GainExperience_experience_id_53",
    HEAL = "GainExperience_experience_id_4",
    SQUAD_HEAL = "GainExperience_experience_id_51",
    HEAL_ASSIST = "GainExperience_experience_id_5",
    SHIELD_REPAIR = "GainExperience_experience_id_438",
    SQUAD_SHIELD_REPAIR = "GainExperience_experience_id_439",
    FACILITY_CAPTURE = "PlayerFacilityCapture",
    FACILITY_DEFENSE = "PlayerFacilityDefend",
    POINT_CAPTURE = "GainExperience_experience_id_557",
    POINT_DEFENSE = "GainExperience_experience_id_556",
    SUNDERER_SPAWN = "GainExperience_experience_id_233",
    LODESTAR_SPAWN = "GainExperience_experience_id_1543",
    SQUAD_SPAWN = "GainExperience_experience_id_56",
    VALKYRIE_SPAWN = "GainExperience_experience_id_355",
    GALAXY_SPAWN = "GainExperience_experience_id_201",
    TRANSPORT_ASSIST = "GainExperience_experience_id_30",
    BEACON_KILL = "GainExperience_experience_id_270",
    ROUTER_KILL = "GainExperience_experience_id_1409",
    Q_SPOT = "GainExperience_experience_id_36",
    SQUAD_Q_SPOT = "GainExperience_experience_id_54",
    MOTION_SPOTTER = "GainExperience_experience_id_293",
    SQUAD_MOTION_SPOTTER = "GainExperience_experience_id_294",
    SCOUT_RADAR = "GainExperience_experience_id_353",
    SQUAD_SCOUT_RADAR = "GainExperience_experience_id_354",
    GENERATOR_OVERLOADED = "GainExperience_experience_id_234",
    GENERATOR_SABILIZED = "GainExperience_experience_id_235",
    TERMINAL_HACK = "GainExperience_experience_id_236",
    TURRET_HACK = "GainExperience_experience_id_237",
    MOTION_SPOTTER_KILL = "GainExperience_experience_id_370",
    SPITFIRE_KILL = "GainExperience_experience_id_579"
}

export enum GainExperienceId {
    ASSIST = "2",
    HIGH_THREAT_KILL_ASSIS = "371",
    EXTREME_THREAT_KILL_ASSIST = "372",
    REVIVE = "7",
    SQUAD_REVIVE = "53",
    HEAL = "4",
    SQUAD_HEAL = "51",
    HEAL_ASSIST = "5",
    SHIELD_REPAIR = "438",
    SQUAD_SHIELD_REPAIR = "439",
    POINT_DEFENSE = "556",
    POINT_CAPTURE = "557",
    SUNDERER_SPAWN = "233",
    GALAXY_SPAWN = "201",
    VALKYRIE_SPAWN = "355",
    LODESTAR_SPAWN = "1543",
    SQUAD_SPAWN = "56",
    TRANSPORT_ASSIST = "30",
    BEACON_KILL = "270",
    ROUTER_KILL = "1409",
    Q_SPOT = "36",
    SQUAD_Q_SPOT = "54",
    MOTION_SPOTTER = "293",
    SQUAD_MOTION_SPOTTER = "294",
    SCOUT_RADAR = "353",
    SQUAD_SCOUT_RADAR = "354",
    GENERATOR_OVERLOADED = "234",
    GENERATOR_STABILIZED = "235",
    TERMINAL_HACK = "236",
    TURRET_HACK = "237",
    MOTION_SPOTTER_KILL = "370",
    SPITFIRE_KILL = "579"
}

export enum MessageType {
    SERVICE_STATE_CHANGED = "serviceStateChanged",
    CONNECTION_STATE_CHANGED = "connectionStateChanged",
    HEARTBEAT = "heartbeat",
    SERVICE_MESSAGE = "serviceMessage"
}

export enum CensusService {
    EVENT = "event"
}

export enum CensusAction {
    SUBSCRIBE = "subscribe",
    UNSUBSCRIBE = "clearSubscribe"
}