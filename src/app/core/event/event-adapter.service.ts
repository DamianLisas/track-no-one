import { Injectable } from '@angular/core';
import { InfantryClass } from './event.model';
import { EventService } from './event.service';
import { LogisticsEvents as LogisticsEvents } from './logistics.events';
import { ObjectiveEvents } from './objective-events.service';
import { CensusEvent, CensusMessage, CensusPayload, GainExperienceId } from './tracking/tracking.model';

@Injectable({
  providedIn: 'root'
})
export class EventAdapterService {

  constructor(
    private eventService: EventService,
    private objectiveEventsService: ObjectiveEvents,
    private logisticsEvents: LogisticsEvents
  ) { }

  adapt(message: CensusMessage) {
    const eventName = message.payload.event_name
    if(this.isKill(eventName)) { this.emmitKill(message.payload) }
    else if(this.isAssist(message)) { this.emmitAssit(message.payload) }
    else if(this.isRevive(message)) { this.emmitRevive(message.payload) }
    else if(this.isHealing(message)) { this.emmitHeal(message.payload) }
    else if(this.isShieldRepair(message)) { this.emmitShieldRepair(message.payload) }
    else if(this.isFacilityCapture(message)) { this.emmitFacilityCapture(message.payload) }
    else if(this.isFacilityDefense(message)) { this.emmitFacilityDefense(message.payload) }
    else if(this.isPointDefense(message)) { this.emmitPointDefense(message.payload) }
    else if(this.isPointCapture(message)) { this.emmitPointCapture(message.payload) }
    else if(this.isSpawn(message)) { this.emmitSpawn(message.payload) }
    else if(this.isSquadSpawn(message)) { this.emmitSquadSpawn(message.payload) }
    else if(this.isTransportAssist(message)) { this.emmitTransportAssist(message.payload) }
    else if(this.isBeaconKill(message)) { this.emmitBeaconKill(message.payload) }
    else if(this.isRouterKill(message)) { this.emmitRouterkill(message.payload) }
    else { console.log("Unknown event", message) }
  }

  private isRouterKill(message: CensusMessage): Boolean {
    return message.payload.experience_id == GainExperienceId.ROUTER_KILL
  }

  private emmitRouterkill(payload: CensusPayload) {
    this.logisticsEvents.routerKillData = {
      playerId: payload.character_id,
      type: "routerKill"
    }
  }

  private isBeaconKill(message: CensusMessage): Boolean {
    return message.payload.experience_id == GainExperienceId.BEACON_KILL
  }

  private emmitBeaconKill(payload: CensusPayload) {
    this.logisticsEvents.beaconKillData = {
      playerId: payload.character_id,
      type: "beaconKill"
    }
  }

  private isTransportAssist(message: CensusMessage): Boolean {
    return message.payload.experience_id == GainExperienceId.TRANSPORT_ASSIST
  }

  private emmitTransportAssist(payload: CensusPayload) {
    this.logisticsEvents.transportAssistData = {
      playerId: payload.character_id,
      type: "transportAssist"
    }
  }

  private isSquadSpawn(message: CensusMessage): Boolean {
    return this.squadSpawnIds.some(id => id == message.payload.character_id)
  }

  private emmitSquadSpawn(payload: CensusPayload) {
    this.logisticsEvents.squadSpawnData = {
      playerId: payload.character_id,
      type: "squadSpawn"
    }
  }

  private isSpawn(message: CensusMessage) {
    return this.spawnIds.some(id => id == message.payload.experience_id)
  }

  private emmitSpawn(payload: CensusPayload) {
    this.logisticsEvents.spawnData = {
      playerId: payload.character_id,
      type: "spawn"
    }
  }

  private isPointCapture(message: CensusMessage) {
    return message.payload.experience_id == GainExperienceId.POINT_CAPTURE
  }

  private emmitPointCapture(payload: CensusPayload) {
    this.objectiveEventsService.pointCaptureData = {
      playerId: payload.character_id,
      type: "pointCapture"
    }
  }

  private isPointDefense(message: CensusMessage) {
    return message.payload.experience_id == GainExperienceId.POINT_DEFENSE
  }

  private emmitPointDefense(payload: CensusPayload) {
    this.objectiveEventsService.pointDefenseData = {
      playerId: payload.character_id,
      type: "pointDefense"
    }
  }

  private isFacilityDefense(message: CensusMessage) {
    return message.payload.event_name == CensusEvent.FACILITY_DEFENSE
  }

  private emmitFacilityDefense(payload: CensusPayload) {
    this.objectiveEventsService.facilityDefenseData = {
      playerId: payload.character_id,
      facilityId: payload.facility_id,
      continentId: payload.world_id,
      hexId: payload.zone_id,
      type: "facilityDefense"
    }
  }

  private isFacilityCapture(message: CensusMessage): Boolean {
    return message.payload.event_name == CensusEvent.FACILITY_CAPTURE
  }

  private emmitFacilityCapture(payload: CensusPayload) {
    this.objectiveEventsService.facilityCaptureData = {
      playerId: payload.character_id,
      facilityId: payload.facility_id,
      continentId: payload.world_id,
      hexId: payload.zone_id,
      type: "facilityCapture"
    }
  }

  private isShieldRepair(message: CensusMessage): Boolean {
    return this.shieldRepairIds.some(id => id == message.payload.experience_id)
  }

  private emmitShieldRepair(payload: CensusPayload) {
    this.eventService.shieldRepairData = {
      playerId: payload.character_id,
      type: "shieldRepair"
    }
  }
  
  private isHealing(message: CensusMessage): Boolean {
    return this.healingIds.some(id => id == message.payload.experience_id)
  }
  
  private emmitHeal(payload: CensusPayload) {
    this.eventService.healEventData = {
      playerId: payload.character_id,
      type: "heal"
    }
  }

  private isKill(eventName: String) {
    return eventName == CensusEvent.DEATH;
  }

  private emmitKill(payload: CensusPayload) {
    this.eventService.killEventData = {
      attackerClass: this.resolveClass(payload.attacker_loadout_id),
      victimClass: this.resolveClass(payload.character_loadout_id),
      attackerId: payload.attacker_character_id,
      victimId: payload.character_id,
      wasHeadshot: payload.is_headshot == "0" ? false : true,
      type: "kill"
    }
  }

  private resolveClass(loadoutId: String): InfantryClass {
    switch (loadoutId) {
      case "1": return InfantryClass.INFILTRATOR;
      case "8": return InfantryClass.INFILTRATOR;
      case "15": return InfantryClass.INFILTRATOR;
      case "28": return InfantryClass.INFILTRATOR;
      case "3": return InfantryClass.LIGHT_ASSAULT;
      case "10": return InfantryClass.LIGHT_ASSAULT;
      case "17": return InfantryClass.LIGHT_ASSAULT;
      case "29": return InfantryClass.LIGHT_ASSAULT;
      case "4": return InfantryClass.MEDIC;
      case "11": return InfantryClass.MEDIC;
      case "18": return InfantryClass.MEDIC;
      case "30": return InfantryClass.MEDIC;
      case "5": return InfantryClass.ENGINEER;
      case "12": return InfantryClass.ENGINEER;
      case "19": return InfantryClass.ENGINEER;
      case "31": return InfantryClass.ENGINEER;
      case "6": return InfantryClass.HEAVY_ASSAULT;
      case "13": return InfantryClass.HEAVY_ASSAULT;
      case "20": return InfantryClass.HEAVY_ASSAULT;
      case "32": return InfantryClass.HEAVY_ASSAULT;
      case "7": return InfantryClass.MAX;
      case "14": return InfantryClass.MAX;
      case "21": return InfantryClass.MAX;
      case "45": return InfantryClass.MAX;
      default: return InfantryClass.UNKNOWN;
    }
  }

  private isAssist(message: CensusMessage) {
    return this.assistIds.some(assistId => assistId == message.payload.experience_id)
  }

  private emmitAssit(payload: CensusPayload) {
    this.eventService.assistEventData = {
      playerId: payload.character_id,
      type: "assist"
    }
  }

  private isRevive(message: CensusMessage) {
    return message.payload.experience_id == GainExperienceId.REVIVE || message.payload.experience_id == GainExperienceId.SQUAD_REVIVE 
  }

  private emmitRevive(payload: CensusPayload) {
    this.eventService.reviveEventData = {
      playerId: payload.character_id,
      type: "revive"
    }
  }

  private readonly assistIds = [GainExperienceId.ASSIST, GainExperienceId.HIGH_THREAT_KILL_ASSIS, GainExperienceId.EXTREME_THREAT_KILL_ASSIST]
  private readonly healingIds = [GainExperienceId.HEAL, GainExperienceId.SQUAD_HEAL, GainExperienceId.HEAL_ASSIST]
  private readonly shieldRepairIds = [GainExperienceId.SHIELD_REPAIR, GainExperienceId.SQUAD_SHIELD_REPAIR]
  private readonly spawnIds = [GainExperienceId.SUNDERER_SPAWN, GainExperienceId.LODESTAR_SPAWN]
  private readonly squadSpawnIds = [GainExperienceId.SQUAD_SPAWN, GainExperienceId.GALAXY_SPAWN, GainExperienceId.VALKYRIE_SPAWN]
}
