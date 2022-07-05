export interface CensusMessage {
    service: CensusService,
    event: CensusEvent,
    payload: CensusPayload,
    type: String
}

export enum CensusService {
    EVENT = "event"
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

export enum MessageType {
    SERVICE_STATE_CHANGED = "serviceStateChanged",
    CONNECTION_STATE_CHANGED = "connectionStateChanged",
    HEARTBEAT = "heartbeat",
    SERVICE_MESSAGE = "serviceMessage"
}

export enum CensusAction {
    SUBSCRIBE = "subscribe",
    UNSUBSCRIBE = "clearSubscribe"
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
    SPITFIRE_KILL = "GainExperience_experience_id_579",
    TERMINAL_RAPIAR = "GainExperience_experience_id_276",
    GENERATOR_REPAIR = "GainExperience_experience_id_87",
    INFANTRY_RESUPPLY = "GainExperience_experience_id_34",
    SQUAD_INFANTRY_RESUPPLY = "GainExperience_experience_id_55",
    VEHICLE_RESUPPLY = "GainExperience_experience_id_240",
    SQUAD_VEHICLE_RESUPPLY = "GainExperience_experience_id_241",
    MAX_REPAIR = "GainExperience_experience_id_6",
    SQUAD_MAX_REPAIR = "GainExperience_experience_id_142",
    MANA_TURRET_REPAIR = "GainExperience_experience_id_88",
    SQUAD_MANA_TURRET_REPAIR = "GainExperience_experience_id_257",
    HARLIGHT_BARRIER_REPAIR = "GainExperience_experience_id_1375",
    SPITFIRE_REPAIR = "GainExperience_experience_id_581",
    SQUAD_SPITFIRE_REPAIR = "GainExperience_experience_id_584",
    SQUAD_HARDLIGHT_BARRIER_REPAIR = "GainExperience_experience_id_1378",
    SUNDERER_REPAIR = "GainExperience_experience_id_99",
    SQUAD_SUNDERER_REPAIR = "GainExperience_experience_id_140",
    ANT_REPAIR = "GainExperience_experience_id_653",
    SQUAD_ANT_REPAIR = "GainExperience_experience_id_656",
    LIGHTING_REPAIR = "GainExperience_experience_id_93",
    SQUAD_LIGHTING_REPAIR = "GainExperience_experience_id_134",
    VANGUAR_REPAIR = "GainExperience_experience_id_100",
    SQUAD_VANGUAR_REPAIR = "GainExperience_experience_id_617",
    PROWLER_REPAIR = "GainExperience_experience_id_96",
    SQUAD_PROWLER_REPAIR = "GainExperience_experience_id_137",
    MAGRIDER_REPAIR = "GainExperience_experience_id_94",
    SQUAD_MAGRIDER_REPAIR = "GainExperience_experience_id_135",
    FLASH_REPAIR = "GainExperience_experience_id_31",
    SQUAD_FLASH_REPAIR = "GainExperience_experience_id_28",
    JAVELIN_REPAIR = "GainExperience_experience_id_1481",
    SQUAD_JAVELIN_REPAIR = "GainExperience_experience_id_1482",
    HARRASER_REPAIR = "GainExperience_experience_id_303",
    SQUAD_HARRASER_REPAIR = "GainExperience_experience_id_302",
    REAVER_REPAIR = "GainExperience_experience_id_97",
    SQUAD_REAVER_REPAIR = "GainExperience_experience_id_138",
    MOSQUITO_REPAIR = "GainExperience_experience_id_95",
    SQUAD_MOSQUITO_REPAIR = "GainExperience_experience_id_136",
    SCYTHE_REPAIR = "GainExperience_experience_id_98",
    SQUAD_SCYTHE_REPAIR = "GainExperience_experience_id_139",
    DERVISH_REPAIR = "GainExperience_experience_id_359",
    SQUAD_DERVISH_REPAIR = "GainExperience_experience_id_532",
    VALKYRIE_REPAIR = "GainExperience_experience_id_503",
    SQUAD_VALKYRIE_REPAIR = "GainExperience_experience_id_505",
    GALAXY_REPAIR = "GainExperience_experience_id_91",
    SQUAD_GALAXY_REPAIR = "GainExperience_experience_id_132",
    LIBERATOR_REPAIR = "GainExperience_experience_id_92",
    SQUAD_LIBERATOR_REPAIR = "GainExperience_experience_id_133",
    COLOSUS_REPAIR = "GainExperience_experience_id_1451",
    SQUAD_COLOSUS_REPAIR = "GainExperience_experience_id_1452",
    PLAYER_LOGOUT = "PlayerLogout"
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
    MOTION_SENSOR_DESTROY = "370",
    SPITFIRE_DESTROY = "579",
    TERMINAL_REPAIR = "276",
    GENERATOR_REPAIR = "87",
    INFANTRY_RESUPPLY = "34",
    SQUAD_INFANTRY_RESUPPLY = "55",
    VEHICLE_RESUPPLY = "240",
    SQUAD_VEHICLE_RESUPPLY = "241",
    MAX_REPAIR = "6",
    SQUAD_MAX_REPAIR = "142",
    MANA_TURRET_REPAIR = "88",
    SQUAD_MANA_TURRET_REPAIR = "257",
    HARDLIGHT_BARRIER_REPAIR = "1375",
    SQUAD_HARDLIGHT_BARRIER_REPAIR = "1378",
    SPITFIRE_REPAIR = "581",
    SQUAD_SPITFIRE_REPAIR = "584",
    SUNDERER_REPAIR = "99",
    SQUAD_SUNDERER_REPAIR = "140",
    ANT_REPAIR = "653",
    SQUAD_ANT_REPAIR = "656",
    LIGHTING_REPAIR = "93",
    SQUAD_LIGHTING_REPAIR = "134",
    VANGUARD_REPAIR = "100",
    SQUAD_VANGUARD_REPAIR = "617",
    PROWLER_REPAIR = "96",
    SQUAD_PROWLER_REPAIR = "137",
    MAGRIDER_REPAIR = "94",
    SQUAD_MAGRIDER_REPAIR = "135",
    FLASH_REPAIR = "31",
    SQUAD_FLASH_REPAIR = "28",
    JAVELIN_REPAIR = "1481",
    SQUAD_JAVELIN_REPAIR = "1482",
    HARRASER_REPAIR = "303",
    SQUAD_HARRASER_REPAIR = "302",
    REAVER_REPAIR = "97",
    SQUAD_REAVER_REPAIR = "138",
    MOSQUITO_REPAIR = "95",
    SQUAD_MOSQUITO_REPAIR = "136",
    SCYTHE_REPAIR = "98",
    SQUAD_SCYTHE_REPAIR = "139",
    DERVISH_REPAIR = "359",
    SQUAD_DERVISH_REPAIR = "532",
    VALKYRIE_REPAIR = "503",
    SQUAD_VALKYRIE_REPAIR = "505",
    GALAXY_REPAIR = "91",
    SQUAD_GALAXY_REPAIR = "132",
    LIBERATOR_REPAIR = "92",
    SQUAD_LIBERATOR_REPAIR = "133",
    COLOSUS_REPAIR = "1451",
    SQUAD_COLOSUS_REPAIR = "1452",
}