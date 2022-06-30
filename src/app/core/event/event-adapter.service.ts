import { Injectable } from '@angular/core';
import { InfantryClass } from './event.model';
import { EventService } from './event.service';
import { CensusEvent, CensusMessage, CensusPayload, GainExperienceId } from './tracking/tracking.model';

@Injectable({
  providedIn: 'root'
})
export class EventAdapterService {

  constructor(
    private eventService: EventService
  ) { }

  adapt(message: CensusMessage) {
    const eventName = message.payload.event_name
    if(this.isKill(eventName)) {
      this.adaptDeathEvent(message.payload)
    } else if(this.isAssist(message)) {
      this.adaptAssistEvent(message.payload)
    } else if(this.isRevive(message)) {
      this.adaptReviveEvent(message.payload)
    } else if(this.isHealing(message)) {
      this.adaptHealingEvent(message.payload)
    } else if(this.isShieldRepair(message)) {
      this.adaptShieldRepair(message.payload)
    } else {
      console.log("Unknown event", message)
    }
  }

  isShieldRepair(message: CensusMessage): Boolean {
    return message.payload.event_name == CensusEvent.GAIN_EXPERIENCE
        && this.shieldRepairIds.some(id => id == message.payload.experience_id)
  }
  adaptShieldRepair(payload: CensusPayload) {
    this.eventService.shieldRepairData = {
      playerId: payload.character_id
    }
  }
  
  isHealing(message: CensusMessage): Boolean {
    return message.payload.event_name == CensusEvent.GAIN_EXPERIENCE 
        && this.healingIds.some(id => id == message.payload.experience_id)
  }
  
  adaptHealingEvent(payload: CensusPayload) {
    this.eventService.healEventData = {
      playerId: payload.character_id
    }
  }

  private isKill(eventName: String) {
    return eventName == CensusEvent.DEATH;
  }

  /**
   * Converts a Death event into a KillEvent
   * @param payload Census API event payload
   */
  private adaptDeathEvent(payload: CensusPayload) {
    this.eventService.killEventData = {
      attackerClass: this.resolveClass(payload.attacker_loadout_id),
      victimClass: this.resolveClass(payload.character_loadout_id),
      attackerId: payload.attacker_character_id,
      victimId: payload.character_id,
      wasHeadshot: payload.is_headshot == "0" ? false : true
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
    return message.payload.event_name == CensusEvent.GAIN_EXPERIENCE && this.isAssistExperienceId(message)
  }
  
  private isAssistExperienceId(message: CensusMessage) {
    return message.payload.experience_id == GainExperienceId.ASSIST 
        || message.payload.experience_id == GainExperienceId.HIGH_THREAT_KILL_ASSIS 
        || message.payload.experience_id == GainExperienceId.EXTREME_THREAT_KILL_ASSIST
  }

  /**
   * Convers a GainExperience event into an AssistEvent
   * @param payload Census API event payload
   */
  private adaptAssistEvent(payload: CensusPayload) {
    this.eventService.assistEventData = {
      playerId: payload.character_id
    }
  }

  private isRevive(message: CensusMessage) {
    return message.payload.event_name == CensusEvent.GAIN_EXPERIENCE && this.isReviveExperienceId(message)
  }

  private isReviveExperienceId(message: CensusMessage) {
    return message.payload.experience_id == GainExperienceId.REVIVE 
        || message.payload.experience_id == GainExperienceId.SQUAD_REVIVE 
  }

  private adaptReviveEvent(payload: CensusPayload) {
    this.eventService.reviveEventData = {
      playerId: payload.character_id
    }
  }

  private readonly healingIds = [GainExperienceId.HEAL, GainExperienceId.SQUAD_HEAL, GainExperienceId.HEAL_ASSIST]
  private readonly shieldRepairIds = [GainExperienceId.SHIELD_REPAIR, GainExperienceId.SQUAD_SHIELD_REPAIR]
}
