import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TrackingService } from '../event/tracking/tracking.service';
import { PlayerRepository } from '../player/player.repository';
import { OutfitRepository } from '../outfit/outfit.repository';
import { Player } from '../player/player.model';
import { PlayerCombatEffectiveness } from './combat-effectiveness.model';
import { UntypedFormControl } from '@angular/forms';
import { CombatEffectivenessService } from './combat-efectiveness.service';
import { PlayerEventsListenerService } from '../event/listener/player-events-listener.service';
import { AnalyticsService } from '../analytics/analytics.service';
import { DescriptionService } from '../event/description.service';

@Component({
  selector: 'app-combat-effectiveness',
  templateUrl: './combat-effectiveness.component.html',
  styleUrls: ['./combat-effectiveness.component.css']
})
export class CombatEffectivenessComponent implements OnInit {

  loadingData = false

  playerName = new UntypedFormControl()
  outfitTag = new UntypedFormControl()

  trackedPlayers: PlayerCombatEffectiveness[] = []
  lastEvents: String[] = []

  constructor(
    private outfitRepository: OutfitRepository,
    private playerRepository: PlayerRepository,
    public trackingService: TrackingService,
    private combatEffectivenessService: CombatEffectivenessService,
    private playerEventsListener: PlayerEventsListenerService,
    private descriptions: DescriptionService,
    private analytics: AnalyticsService,
  ) { }

  ngOnInit(): void {
    this.trackingService.connect();
    this.playerEventsListener.stratListening()
    this.combatEffectivenessService.playersCombatEffectivenessObservable.subscribe(
      playersComef => { this.trackedPlayers = playersComef }
    )
    this.descriptions.eventDescription.subscribe(
      description => { this.lastEvents.unshift(description) }
    )
  }

  addPlayer() {
    if(this.loadingData) { return }

    this.analytics.addPlayerClick(this.playerName.value)

    this.loadingData = true
    this.playerName.disable()

    this.playerRepository.findByName(this.playerName.value)
      .then(player => { this.startTracking(player) })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Couldn't find " + this.playerName.value
        })
      })
      .finally(() => {
        this.loadingData = false
        this.playerName.reset()
        this.playerName.enable()
      })

  }

  addOutfit() {
    if(this.loadingData) { return }
    this.analytics.addOutfitClick(this.outfitTag.value)
    this.loadingData = true
    this.outfitTag.disable()
    this.outfitRepository.findByTag(this.outfitTag.value)
      .then(outfit => {
        console.log("Outfit found", outfit);

        if(!outfit.members || outfit.members.length == 0) {
          Swal.fire({
            icon: "info",
            title: "No online members found in " + outfit.name,
            text: "Only online members are tracked"
          });
        } else {
          outfit.members.forEach(member =>{
            this.playerRepository
              .findById(member.id)
              .then(player => {
                this.startTracking(player);
              })
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Couldn't find outfit with tag " + this.outfitTag.value
        });
      })
      .finally(() => {
        this.loadingData = false
        this.outfitTag.reset()
        this.outfitTag.enable()
      })
  }

  removePlayer(playerComef: PlayerCombatEffectiveness) {
    this.analytics.playerSessionEnded(playerComef)
    this.trackingService.stopTracking(playerComef.id)
    this.trackedPlayers = this.trackedPlayers.filter(p => p.id != playerComef.id)
    this.combatEffectivenessService.playersCombatEffectivesData = this.trackedPlayers
  }

  showCombatEffectivenessDialog() {
    this.analytics.comefHelpShow()
    Swal.fire({
      icon: "info",
      title: "How is combat effectiveness calculated?",
      html: "Combat effectiveness is the sum of different stats.<br>" +
            "The current calculation uses: KILLER_STATS + OBJECTIVE_STATS + MEDIC_STATS + ENGI_STATS + SCOUT_STATS + LOGISTIC_STATS<br>" +
            "Each one being:<br>" +
            "KILLER_STATS = KDA * KPH<br>" +
            "OBJECTIVE_STATS = FC * (FD*0.20) * CP<br>" +
            "MEDIC_STATS = TR * ((TH + SH) * 0.1)<br>" +
            "ENGI_STATS = SUP * REP/2<br>" +
            "SCOUT_STATS = QS * MS<br>" +
            "LOGISTIC_STATS = (SS + SQ*2) + TA + (BK + RK*4) * 20<br>"
    })
  }

  private startTracking(player: Player) {
    if(!this.isBeingTracked(player)) {
      this.analytics.startTrackingPlayer(player)
      this.trackingService.startTracking(player)
      this.trackedPlayers.push(this.parseToPlayerCombatEffectiveness(player))
      this.combatEffectivenessService.playersCombatEffectivesData = this.trackedPlayers
    }
  }

  private isBeingTracked(player: Player) {
    return this.trackedPlayers.some(p => p.id == player.id);
  }

  private parseToPlayerCombatEffectiveness(player: Player): PlayerCombatEffectiveness {
    return {
      id: player.id,
      name: player.name,
      faction: player.faction,
      outfitTag: player?.outfit?.tag,
      currentClass: player.currentClass,
      combatEffectiveness: 0.0,
      sessionStart: Date.now(),
      sessionLenghtInSeconds: 1,
      killerStats: {
        score: 0,
        kills: 0,
        deaths: 0,
        assists: 0,
        teamKills: 0
      },
      medicStats: {
        score: 0,
        revives: 0,
        heals: 0,
        shielding: 0
      },
      objectiveStats: {
        score: 0,
        facilitiesCapture: 0,
        facilitiesDefense: 0,
        pointsCapture: 0,
        pointsDefense: 0
      },
      logisticsStats: {
        score: 0,
        spawns: 0,
        squadSpanws: 0,
        transportAssits: 0,
        beaconKills: 0,
        routerKills: 0
      },
      scoutStats: {
        score: 0,
        qspots: 0,
        motionSpots: 0,
        radarSpots: 0,
        generatorOverloads: 0,
        generatorStabilizations: 0,
        terminalHacks: 0,
        turretHacks: 0,
        motionSensorsDestroyed: 0,
        spitfiresDestroyed: 0
      },
      engiStats: {
        score: 0,
        terminalRepairs: 0,
        generatorReparirs: 0,
        infantryResupply: 0,
        vehicleResupply: 0,
        deployableRepairs: 0,
        vehicleRepairs: 0,
        maxRepairs: 0
      }
    }
  }

}
