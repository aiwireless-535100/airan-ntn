"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/types.ts
function vec3Add(a, b) {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}
function vec3Sub(a, b) {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}
function vec3Scale(v, s) {
  return { x: v.x * s, y: v.y * s, z: v.z * s };
}
function vec3Len(v) {
  return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
}
function vec3Norm(v) {
  const l = vec3Len(v);
  return l ? vec3Scale(v, 1 / l) : { x: 0, y: 0, z: 0 };
}
function vec3Dot(a, b) {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}
var DEFAULT_CONFIG = {
  // Constellation (Walker Delta: 72 sats, 6 planes, 550km, 53° inc - Starlink-like)
  numOrbitals: 12,
  numPlanes: 6,
  inclination: 53,
  altitude: 550,
  orbitType: "LEO",
  // ISL
  enableISL: true,
  maxISLRange: 5e3,
  islType: "laser",
  // Ground stations
  numGroundStations: 4,
  gsPositions: [
    { x: 37.44, y: -122.14 },
    // San Francisco
    { x: 40.71, y: -74.01 },
    // New York
    { x: 51.51, y: -0.13 },
    // London
    { x: 35.68, y: 139.69 }
    // Tokyo
  ],
  // Channel (3GPP TS 38.901 NTN)
  carrierFreqGHz: 2.6,
  // n256 / S-band
  bandwidthMHz: 20,
  channelModel: "NTN-LOS",
  pathLossExponent: 0,
  shadowingStd: 4,
  ricianK: 10,
  snrThreshold: 0,
  dopplerEnabled: true,
  // Mobility
  numUEs: 20,
  ueSpeed: 1.4,
  walkEnabled: true,
  walkSpeed: 1.4,
  roundDuration: 5,
  levyAlpha: 1.8,
  levyBeta: 1.5,
  levyMinStep: 10,
  // FL
  flAlgorithm: "FedAVG",
  scheduler: "NtnElevation",
  localEpochs: 5,
  learningRate: 0.05,
  mu: 0.01,
  selectedPerRound: 8,
  totalRounds: 50,
  numFeatures: 4,
  numClasses: 3,
  samplesPerUE: 80,
  nonIIDAlpha: 0.5,
  bsCooperation: false,
  // NTN-specific FL
  ntnAwareScheduling: true,
  minElevationDeg: 10,
  maxDopplerHz: 5e3,
  requireFeederLink: true,
  // Space RIC
  spaceRicEnabled: true,
  autonomousMode: true,
  feederOutageThreshold: 30,
  modelSyncInterval: 10,
  islCoordination: true,
  gradientCompression: 0.1,
  eclipseAwareFl: true,
  // xApps
  enabledXApps: [
    "ho-predict",
    "beam-hop",
    "slice-manager",
    "doppler-comp",
    "tn-ntn-steering",
    "energy-harvest",
    "interference-mgmt",
    "multi-conn",
    "predictive-alloc"
  ],
  // Simulation
  roundDurationMs: 300,
  seed: 42
};

// src/config.ts
var EARTH_RADIUS = 6371e3;
var EARTH_MU = 3986004418e5;
var SPEED_OF_LIGHT = 299792458;
var TRAIL_MAX = 20;
var CHANNEL_DEFAULTS = {
  // NTN UMa LOS (Table 7.4.1-1)
  ntnLos: {
    pathLossExp: 2,
    // Free space + atmospheric
    shadowingStd: 3,
    // dB
    riceKFactor: 13
    // dB (strong LOS)
  },
  // NTN UMa NLOS
  ntnNlos: {
    pathLossExp: 3.5,
    shadowingStd: 8,
    riceKFactor: 0
  },
  // Terrestrial UMa LOS (for comparison)
  terrestrialLos: {
    pathLossExp: 2.3,
    shadowingStd: 4,
    riceKFactor: 9
  },
  // Terrestrial UMa NLOS
  terrestrialNlos: {
    pathLossExp: 3.67,
    shadowingStd: 7.8,
    riceKFactor: 0
  }
};
var SAT_COLORS = [
  "#0099cc",
  "#e04444",
  "#c89000",
  "#008855",
  "#7b4fcf",
  "#e07030",
  "#00a0a0",
  "#a000a0",
  "#a0a000",
  "#0066cc",
  "#cc0066",
  "#66cc00"
];
var UE_PALETTE = [
  "#2aa89e",
  "#6aade4",
  "#e09030",
  "#a050d0",
  "#e06060",
  "#40b060",
  "#d05090",
  "#50b0c0",
  "#b09020",
  "#8050b0",
  "#20c080",
  "#c08020",
  "#8020c0",
  "#60c040",
  "#c04060",
  "#4060c0",
  "#a0c020",
  "#c020a0",
  "#20a0c0",
  "#60a020"
];
var XAPP_DEFAULTS = {
  "ho-predict": {
    priority: 10,
    decisionInterval: 100,
    eventTriggers: ["periodic", "measurement_change"],
    reportStyle: "kpm_ue"
  },
  "beam-hop": {
    priority: 20,
    decisionInterval: 200,
    eventTriggers: ["periodic", "beam_load_change"],
    reportStyle: "kpm_cell"
  },
  "slice-manager": {
    priority: 30,
    decisionInterval: 500,
    eventTriggers: ["periodic", "slice_sla_violation"],
    reportStyle: "kpm_slice"
  },
  "doppler-comp": {
    priority: 15,
    decisionInterval: 200,
    eventTriggers: ["periodic", "doppler_threshold"],
    reportStyle: "kpm_ue"
  },
  "tn-ntn-steering": {
    priority: 25,
    decisionInterval: 500,
    eventTriggers: ["periodic", "sinr_imbalance"],
    reportStyle: "kpm_cell"
  },
  "energy-harvest": {
    priority: 12,
    decisionInterval: 1e3,
    eventTriggers: ["periodic", "battery_critical", "eclipse_entry"],
    reportStyle: "kpm_cell"
  },
  "interference-mgmt": {
    priority: 35,
    decisionInterval: 500,
    eventTriggers: ["periodic", "interference_threshold"],
    reportStyle: "kpm_cell"
  },
  "multi-conn": {
    priority: 22,
    decisionInterval: 500,
    eventTriggers: ["periodic", "rlf_detected", "candidate_available"],
    reportStyle: "kpm_ue"
  },
  "predictive-alloc": {
    priority: 28,
    decisionInterval: 1e3,
    eventTriggers: ["periodic", "load_prediction"],
    reportStyle: "kpm_slice"
  }
};
var ACTION_TYPES = {
  HANDOVER_TRIGGER: 0,
  HANDOVER_CANCEL: 1,
  BEAM_HOP_SCHEDULE: 2,
  BEAM_SWITCH: 3,
  SLICE_PRB_ALLOCATION: 4,
  DOPPLER_COMP_UPDATE: 5,
  TIMING_ADVANCE_UPDATE: 6,
  TX_POWER_CONTROL: 7,
  CCA_THRESHOLD_ADJUST: 8,
  BEAM_SHUTDOWN: 9,
  COMPUTE_THROTTLE: 10,
  INTERFERENCE_NULLING: 11,
  DC_SETUP: 12,
  DC_TEARDOWN: 13,
  BEARER_SPLIT: 14,
  PRB_RESERVATION: 15,
  ENERGY_PROFILE_UPDATE: 16
};
var ACTION_NAMES = Object.keys(ACTION_TYPES);
var SIM_PRESETS = {
  // Quick demo: small constellation, few rounds
  demo: {
    ...DEFAULT_CONFIG,
    numOrbitals: 6,
    numPlanes: 3,
    numUEs: 10,
    totalRounds: 20,
    selectedPerRound: 4,
    roundDurationMs: 200
  },
  // Standard: Starlink-like
  standard: {
    ...DEFAULT_CONFIG,
    numOrbitals: 12,
    numPlanes: 6,
    numUEs: 20,
    totalRounds: 50,
    selectedPerRound: 8,
    roundDurationMs: 300
  },
  // Large: Full constellation simulation
  large: {
    ...DEFAULT_CONFIG,
    numOrbitals: 22,
    numPlanes: 6,
    numUEs: 50,
    totalRounds: 100,
    selectedPerRound: 16,
    roundDurationMs: 500
  },
  // GEO: 3 GEO satellites
  geo: {
    ...DEFAULT_CONFIG,
    numOrbitals: 1,
    numPlanes: 3,
    orbitType: "GEO",
    altitude: 35786,
    inclination: 0,
    enableISL: false,
    numUEs: 15,
    totalRounds: 30,
    selectedPerRound: 5,
    roundDurationMs: 500
  },
  // FL-focused: more UEs, more rounds
  fl_focused: {
    ...DEFAULT_CONFIG,
    numOrbitals: 8,
    numPlanes: 4,
    numUEs: 40,
    totalRounds: 100,
    selectedPerRound: 12,
    localEpochs: 10,
    learningRate: 0.03,
    roundDurationMs: 200
  }
};

// src/orbital.ts
function ecefToLla(ecef) {
  const { x, y, z } = ecef;
  const p = Math.sqrt(x * x + y * y);
  const lat = Math.atan2(z, p) * 180 / Math.PI;
  const lon = Math.atan2(y, x) * 180 / Math.PI;
  const alt = p / Math.cos(lat * Math.PI / 180) - EARTH_RADIUS;
  return { lat, lon, alt };
}
function llaToEcef(lat, lon, alt) {
  const latRad = lat * Math.PI / 180;
  const lonRad = lon * Math.PI / 180;
  const N = EARTH_RADIUS / Math.sqrt(1 - Math.sin(latRad) ** 2);
  const x = (N + alt) * Math.cos(latRad) * Math.cos(lonRad);
  const y = (N + alt) * Math.cos(latRad) * Math.sin(lonRad);
  const z = (N * (1 - 669438e-8) + alt) * Math.sin(latRad);
  return { x, y, z };
}
function orbitalToEcef(elements, time) {
  const { semiMajorAxis, eccentricity, inclination, raan, argPerigee, trueAnomaly, epoch } = elements;
  const dt = time - epoch;
  const n = Math.sqrt(EARTH_MU / semiMajorAxis ** 3);
  const M = trueAnomaly + n * dt;
  const E = M;
  const nu = 2 * Math.atan(Math.sqrt((1 + eccentricity) / (1 - eccentricity)) * Math.tan(E / 2));
  const r = semiMajorAxis * (1 - eccentricity * Math.cos(E));
  const cosNu = Math.cos(nu);
  const sinNu = Math.sin(nu);
  const xOrb = r * cosNu;
  const yOrb = r * sinNu;
  const zOrb = 0;
  const vMag = Math.sqrt(EARTH_MU * (2 / r - 1 / semiMajorAxis));
  const vxOrb = -vMag * sinNu / Math.sqrt(1 - eccentricity ** 2);
  const vyOrb = vMag * cosNu / Math.sqrt(1 - eccentricity ** 2);
  const vzOrb = 0;
  const cosR = Math.cos(raan), sinR = Math.sin(raan);
  const cosI = Math.cos(inclination), sinI = Math.sin(inclination);
  const cosW = Math.cos(argPerigee), sinW = Math.sin(argPerigee);
  const x = xOrb * (cosR * cosW - sinR * sinW * cosI) - yOrb * (cosR * sinW + sinR * cosW * cosI);
  const y = xOrb * (sinR * cosW + cosR * sinW * cosI) + yOrb * (cosR * cosW * cosI - sinR * sinW);
  const z = xOrb * (sinW * sinI) + yOrb * (cosW * sinI);
  const vx = vxOrb * (cosR * cosW - sinR * sinW * cosI) - vyOrb * (cosR * sinW + sinR * cosW * cosI);
  const vy = vxOrb * (sinR * cosW + cosR * sinW * cosI) + vyOrb * (cosR * cosW * cosI - sinR * sinW);
  const vz = vxOrb * (sinW * sinI) + vyOrb * (cosW * sinI);
  return { pos: { x, y, z }, vel: { x: vx, y: vy, z: vz } };
}
function createWalkerConstellation(params, startTime) {
  const { numOrbitals, numPlanes, inclination, altitude, phasing = 1 } = params;
  const totalSats = numOrbitals * numPlanes;
  const semiMajorAxis = EARTH_RADIUS + altitude * 1e3;
  const incRad = inclination * Math.PI / 180;
  const elements = [];
  for (let plane = 0; plane < numPlanes; plane++) {
    const raan = 2 * Math.PI * plane / numPlanes;
    for (let sat = 0; sat < numOrbitals; sat++) {
      const satIdx = plane * numOrbitals + sat;
      const baseAnomaly = 2 * Math.PI * sat / numOrbitals;
      const phaseOffset = 2 * Math.PI * phasing * plane / totalSats;
      const trueAnomaly = baseAnomaly + phaseOffset;
      const argPerigee = 0;
      elements.push({
        semiMajorAxis,
        eccentricity: 0,
        inclination: incRad,
        raan,
        argPerigee,
        trueAnomaly,
        epoch: startTime
      });
    }
  }
  return elements;
}
function propagateSatellite(sat, dt) {
  const n = Math.sqrt(EARTH_MU / sat.orbitalElements.semiMajorAxis ** 3);
  const newAnomaly = (sat.orbitalElements.trueAnomaly + n * dt) % (2 * Math.PI);
  const newElements = {
    ...sat.orbitalElements,
    trueAnomaly: newAnomaly,
    epoch: sat.orbitalElements.epoch + dt
  };
  const { pos, vel } = orbitalToEcef(newElements, newElements.epoch);
  const newTrail = [...sat.trail, sat.position].slice(-50);
  const sunDir = { x: -1, y: 0, z: 0 };
  const satToSun = vec3Norm(vec3Sub(sunDir, vec3Scale(pos, 1 / vec3Len(pos))));
  const earthToSat = vec3Norm(pos);
  const inEclipse = vec3Dot(earthToSat, sunDir) < 0 && vec3Len(pos) < EARTH_RADIUS * 1.2;
  const solarPower = inEclipse ? 0 : 1500;
  const powerDraw = 200;
  const batteryDelta = (solarPower - powerDraw) / 5e3 * dt / 3600;
  const newSoc = Math.max(0, Math.min(1, sat.batterySoc + batteryDelta));
  let newState = sat.state;
  if (inEclipse)
    newState = "ECLIPSE";
  else if (sat.feederLink === null || !sat.feederLink.active)
    newState = "FEEDER_OUTAGE";
  else if (sat.state === "AUTONOMOUS" && sat.feederLink?.active)
    newState = "SYNCING";
  else
    newState = "ACTIVE";
  return {
    ...sat,
    orbitalElements: newElements,
    position: pos,
    velocity: vel,
    trail: newTrail,
    batterySoc: newSoc,
    solarPower,
    state: newState
  };
}
function calculateISLLinks(satellites, maxRange) {
  const links = /* @__PURE__ */ new Map();
  for (let i = 0; i < satellites.length; i++) {
    const satA = satellites[i];
    const satLinks = [];
    for (let j = 0; j < satellites.length; j++) {
      if (i === j)
        continue;
      const satB = satellites[j];
      const dist = vec3Len(vec3Sub(satA.position, satB.position));
      if (dist <= maxRange) {
        const hasLOS = checkLineOfSight(satA.position, satB.position);
        if (hasLOS) {
          const latency = dist / SPEED_OF_LIGHT;
          const capacity = 1e10;
          satLinks.push({
            neighborId: satB.id,
            distance: dist,
            latency,
            capacity,
            type: "laser",
            active: true
          });
        }
      }
    }
    satLinks.sort((a, b) => a.distance - b.distance);
    links.set(satA.id, satLinks.slice(0, 4));
  }
  return links;
}
function checkLineOfSight(posA, posB) {
  const dir = vec3Norm(vec3Sub(posB, posA));
  const dist = vec3Len(vec3Sub(posB, posA));
  const t = -vec3Dot(posA, dir);
  if (t < 0 || t > dist)
    return true;
  const closest = vec3Add(posA, vec3Scale(dir, t));
  return vec3Len(closest) > EARTH_RADIUS;
}
function updateFeederLinks(satellites, groundStations, minElevation) {
  for (const sat of satellites) {
    let bestGs = null;
    let bestElevation = -90;
    for (const gs of groundStations) {
      const elevation = calculateElevation(sat.position, gs.position);
      if (elevation > minElevation && elevation > bestElevation) {
        bestElevation = elevation;
        bestGs = gs;
      }
    }
    if (bestGs) {
      const dist = vec3Len(sat.position);
      const slantRange = vec3Len(vec3Sub(sat.position, bestGs.position));
      const latency = slantRange / SPEED_OF_LIGHT;
      const snr = calculateFeederSNR(slatRange, bestElevation);
      const capacity = shannonCapacity(snr) * 4e8;
      sat.feederLink = {
        groundStationId: bestGs.id,
        elevation: bestElevation,
        snr,
        capacity,
        latency,
        active: true,
        lastContact: Date.now() / 1e3
      };
      sat.islNeighbors = sat.islNeighbors;
    } else {
      sat.feederLink = null;
    }
  }
}
function calculateElevation(satPos, gsPos) {
  const satToGs = vec3Sub(gsPos, satPos);
  const dist = vec3Len(satToGs);
  const earthRadius = vec3Len(satPos);
  const gsToSat = vec3Norm(vec3Sub(satPos, gsPos));
  const gsUp = vec3Norm(gsPos);
  const elevationRad = Math.asin(Math.max(-1, Math.min(1, vec3Dot(gsToSat, gsUp))));
  return elevationRad * 180 / Math.PI;
}
function calculateFeederSNR(slantRange, elevation) {
  const freqGHz = 2.6;
  const txPower = 30;
  const rxGain = 40;
  const gsGain = 50;
  const fspl = 92.45 + 20 * Math.log10(freqGHz) + 20 * Math.log10(slantRange / 1e3);
  const atmLoss = 0.5 / Math.sin(elevation * Math.PI / 180);
  const rxPower = txPower + gsGain + rxGain - fspl - atmLoss;
  const noise = -174 + 10 * Math.log10(4e8) + 3;
  return rxPower - noise;
}
function shannonCapacity(snrDb) {
  const snrLin = Math.pow(10, snrDb / 10);
  return Math.log2(1 + snrLin);
}
function createGroundStations(config) {
  const stations = [];
  for (let i = 0; i < config.numGroundStations; i++) {
    const pos = config.gsPositions[i % config.gsPositions.length];
    const ecef = llaToEcef(pos.x, pos.y, 0);
    stations.push({
      id: i,
      name: `GS-${i}`,
      position: ecef,
      lat: pos.x,
      lon: pos.y,
      alt: 0,
      elevationMask: 10,
      antennas: 4,
      txPower: 30,
      connectedSats: []
    });
  }
  return stations;
}
function createSatellites(config, startTime) {
  const elements = createWalkerConstellation({
    numOrbitals: config.numOrbitals,
    numPlanes: config.numPlanes,
    inclination: config.inclination,
    altitude: config.altitude,
    phasing: 1
  }, startTime);
  const satellites = [];
  for (let i = 0; i < elements.length; i++) {
    const { pos, vel } = orbitalToEcef(elements[i], startTime);
    const { lat, lon } = ecefToLla(pos);
    satellites.push({
      id: i,
      name: `SAT-${i}`,
      orbitType: config.orbitType,
      orbitalElements: elements[i],
      position: pos,
      velocity: vel,
      txPower: 23,
      antennas: 16,
      carrierFreqGHz: config.carrierFreqGHz,
      bandwidthMHz: config.bandwidthMHz,
      state: "ACTIVE",
      batterySoc: 1,
      solarPower: 1500,
      computeBudget: 1e4,
      islNeighbors: [],
      islLinks: [],
      feederLink: null,
      localModel: null,
      localGradients: null,
      flRound: 0,
      color: SAT_COLORS[i % SAT_COLORS.length],
      trail: []
    });
  }
  return satellites;
}
function getVisibleSatellites(uePos, satellites, minElevation) {
  const visible = [];
  for (const sat of satellites) {
    const elevation = calculateUeElevation(uePos, sat.position);
    if (elevation >= minElevation) {
      visible.push(sat);
    }
  }
  visible.sort((a, b) => calculateUeElevation(uePos, b.position) - calculateUeElevation(uePos, a.position));
  return visible;
}
function calculateUeElevation(uePos, satPos) {
  const ueToSat = vec3Norm(vec3Sub(satPos, uePos));
  const ueUp = vec3Norm(uePos);
  const elevationRad = Math.asin(Math.max(-1, Math.min(1, vec3Dot(ueToSat, ueUp))));
  return elevationRad * 180 / Math.PI;
}
function getBestSatellite(uePos, satellites, minElevation) {
  const visible = getVisibleSatellites(uePos, satellites, minElevation);
  if (visible.length === 0)
    return null;
  let best = visible[0];
  let bestScore = -Infinity;
  for (const sat of visible) {
    const elevation = calculateUeElevation(uePos, sat.position);
    const dist = vec3Len(vec3Sub(uePos, sat.position));
    const snr = estimateSNR(dist, elevation);
    const score = elevation * 0.5 + snr * 0.5;
    if (score > bestScore) {
      bestScore = score;
      best = sat;
    }
  }
  return best;
}
function estimateSNR(dist, elevation) {
  const freqGHz = 2.6;
  const txPower = 23;
  const fspl = 92.45 + 20 * Math.log10(freqGHz) + 20 * Math.log10(dist / 1e3);
  const rxPower = txPower - fspl;
  const noise = -174 + 10 * Math.log10(2e7) + 5;
  return rxPower - noise;
}

// src/channel.ts
var rngState = 42;
function setSeed(seed) {
  rngState = seed;
}
function random() {
  rngState = rngState * 16807 % 2147483647;
  return (rngState - 1) / 2147483646;
}
function randn() {
  const u = 1 - random();
  const v = random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}
function randnPair() {
  const u = 1 - random();
  const v = random();
  const r = Math.sqrt(-2 * Math.log(u));
  const t = 2 * Math.PI * v;
  return [r * Math.cos(t), r * Math.sin(t)];
}
function pathLoss(uePos, satPos, config, elevation) {
  const dx = uePos.x - satPos.x;
  const dy = uePos.y - satPos.y;
  const dz = uePos.z - satPos.z;
  const distKm = Math.sqrt(dx * dx + dy * dy + dz * dz) / 1e3;
  const d = Math.max(distKm, 1e-3);
  let slope;
  let shadowingStd;
  switch (config.channelModel) {
    case "NTN-LOS":
      slope = 20;
      shadowingStd = CHANNEL_DEFAULTS.ntnLos.shadowingStd;
      break;
    case "NTN-NLOS":
      slope = 36.7;
      shadowingStd = CHANNEL_DEFAULTS.ntnNlos.shadowingStd;
      break;
    case "Rayleigh":
    case "Rician":
    case "AWGN":
      slope = config.pathLossExponent > 0 ? 10 * config.pathLossExponent : 20;
      shadowingStd = config.shadowingStd;
      break;
    default:
      slope = 20;
      shadowingStd = 4;
  }
  const fspl = 32.4 + slope * Math.log10(d) + 20 * Math.log10(config.carrierFreqGHz);
  const shadowing = randn() * shadowingStd;
  return fspl + shadowing;
}
function dopplerShift(uePos, ueVel, satPos, satVel, carrierFreqHz) {
  const los = vec3Norm(vec3Sub(satPos, uePos));
  const relVel = vec3Sub(satVel, ueVel);
  const vRel = vec3Dot(relVel, los);
  return vRel / SPEED_OF_LIGHT * carrierFreqHz;
}
function fadingGain(model, ricianK) {
  switch (model) {
    case "AWGN":
      return 1;
    case "Rayleigh": {
      const [re, im] = randnPair();
      return (re * re + im * im) / 2;
    }
    case "Rician": {
      const K = Math.max(ricianK, 0);
      const sigma2 = 1 / (2 * (K + 1));
      const nu = Math.sqrt(K / (K + 1));
      const [re, im] = randnPair();
      const r = Math.sqrt((re * Math.sqrt(sigma2) + nu) ** 2 + (im * Math.sqrt(sigma2)) ** 2);
      return r * r;
    }
    case "NTN-LOS": {
      const K = Math.pow(10, CHANNEL_DEFAULTS.ntnLos.riceKFactor / 10);
      const sigma2 = 1 / (2 * (K + 1));
      const nu = Math.sqrt(K / (K + 1));
      const [re, im] = randnPair();
      const r = Math.sqrt((re * Math.sqrt(sigma2) + nu) ** 2 + (im * Math.sqrt(sigma2)) ** 2);
      return r * r;
    }
    case "NTN-NLOS": {
      const [re, im] = randnPair();
      return (re * re + im * im) / 2;
    }
    default:
      return 1;
  }
}
function computeSNR(ueTxPower, pathLossDb, gain, noisePower) {
  const gainDb = 10 * Math.log10(Math.max(gain, 1e-12));
  return ueTxPower - pathLossDb + gainDb - noisePower;
}
function noisePowerdBm(bandwidthMHz) {
  return -174 + 10 * Math.log10(bandwidthMHz * 1e6);
}
function shannonCapacity2(snrDb) {
  const snrLin = Math.pow(10, snrDb / 10);
  return Math.log2(1 + snrLin);
}
function commCostBits(modelParamCount, snrDb) {
  const bitsPerParam = 32;
  const rawBits = modelParamCount * bitsPerParam;
  const capacity = shannonCapacity2(snrDb);
  const efficiency = Math.min(1, capacity / 6);
  return rawBits / Math.max(efficiency, 0.01);
}
function azimuth(uePos, satPos) {
  const dx = satPos.x - uePos.x;
  const dy = satPos.y - uePos.y;
  return Math.atan2(dy, dx);
}
function refreshChannels(ues, satellites, config, roundDuration) {
  for (const ue of ues) {
    if (ue.servingSatId === null)
      continue;
    const sat = satellites.find((s) => s.id === ue.servingSatId);
    if (!sat)
      continue;
    const elevation = calculateElevation2(ue.position, sat.position);
    const pl = pathLoss(ue.position, sat.position, config, elevation);
    const gain = fadingGain(config.channelModel, config.ricianK);
    const noise = noisePowerdBm(config.bandwidthMHz);
    const snr = computeSNR(ue.txPower, pl, gain, noise);
    let doppler = 0;
    if (config.dopplerEnabled) {
      doppler = dopplerShift(ue.position, ue.velocity, sat.position, sat.velocity, config.carrierFreqGHz * 1e9);
    }
    ue.pathLoss = pl;
    ue.channelGain = gain;
    ue.snr = snr;
    ue.sinr = snr;
    ue.dopplerShift = doppler;
    ue.bsId = sat.id;
    ue.angle = azimuth(ue.position, sat.position);
  }
}
function calculateElevation2(uePos, satPos) {
  const ueToSat = vec3Norm(vec3Sub(satPos, uePos));
  const ueUp = vec3Norm(uePos);
  const elevationRad = Math.asin(Math.max(-1, Math.min(1, vec3Dot(ueToSat, ueUp))));
  return elevationRad * 180 / Math.PI;
}

// src/topology.ts
function dirichlet(alpha, size) {
  const K = alpha.length;
  const samples = [];
  for (let i = 0; i < size; i++) {
    const g = alpha.map((a) => gammaSample(a));
    const s = g.reduce((a, b) => a + b, 0);
    samples.push(g.map((v) => v / s));
  }
  return samples;
}
function gammaSample(shape) {
  if (shape < 1)
    return gammaSample(1 + shape) * Math.pow(random(), 1 / shape);
  const d = shape - 1 / 3;
  const c = 1 / Math.sqrt(9 * d);
  for (; ; ) {
    let x, v;
    do {
      x = (random() - 0.5) * 2;
      v = 1 + c * x;
    } while (v <= 0);
    v = v * v * v;
    const u = random();
    if (u < 1 - 0.0331 * x ** 4)
      return d * v;
    if (Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v)))
      return d * v;
  }
}
function generateClassData(numClasses, numFeatures, totalSamples) {
  const centers = [];
  for (let c = 0; c < numClasses; c++) {
    const angle = 2 * Math.PI * c / numClasses;
    const radius = 2.5;
    const center = [radius * Math.cos(angle), radius * Math.sin(angle)];
    for (let f = 2; f < numFeatures; f++)
      center.push((random() - 0.5) * 0.5);
    centers.push(center);
  }
  const samples = [];
  for (let i = 0; i < totalSamples; i++) {
    const c = i % numClasses;
    const x = new Float32Array(centers[c].map((v, idx) => v + (idx < 2 ? (random() - 0.5) * 0.6 : (random() - 0.5) * 0.6)));
    samples.push({ x, y: c });
  }
  return shuffle(samples);
}
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function partitionData(config) {
  const { numUEs, numClasses, numFeatures, samplesPerUE, nonIIDAlpha } = config;
  const total = numUEs * samplesPerUE;
  const global = generateClassData(numClasses, numFeatures, total);
  const byClass = Array.from({ length: numClasses }, () => []);
  for (const s of global)
    byClass[s.y].push(s);
  const alpha = new Array(numClasses).fill(nonIIDAlpha);
  const proportions = dirichlet(alpha, numUEs);
  const partitions = /* @__PURE__ */ new Map();
  for (let ue = 0; ue < numUEs; ue++)
    partitions.set(ue, []);
  for (let c = 0; c < numClasses; c++) {
    const pool = byClass[c];
    let idx = 0;
    for (let ue = 0; ue < numUEs; ue++) {
      const count = Math.max(1, Math.round(proportions[ue][c] * pool.length));
      const end = Math.min(idx + count, pool.length);
      partitions.get(ue).push(...pool.slice(idx, end));
      idx = end;
      if (idx >= pool.length)
        break;
    }
  }
  return partitions;
}
function zeroWeights(numFeatures, numClasses) {
  return {
    w: new Float32Array(numClasses * numFeatures).map(() => (random() - 0.5) * 0.01),
    b: new Float32Array(numClasses).fill(0),
    numFeatures,
    numClasses,
    version: 0
  };
}
function ueWalkStep(ues, satellites, config) {
  const dt = config.roundDuration;
  const walkSpeed = config.ueSpeed;
  const distPerRound = walkSpeed * dt;
  for (const ue of ues) {
    if (!config.walkEnabled)
      continue;
    const angle = random() * 2 * Math.PI;
    const step = distPerRound * (0.5 + random() * 0.5);
    const dx = Math.cos(angle) * step;
    const dy = Math.sin(angle) * step;
    const { lat, lon } = ecefToLla(ue.position);
    const R = EARTH_RADIUS;
    const deltaLat = dy / R * (180 / Math.PI);
    const deltaLon = dx / (R * Math.cos(lat * Math.PI / 180)) * (180 / Math.PI);
    const newLat = Math.max(-80, Math.min(80, lat + deltaLat));
    const newLon = (lon + deltaLon + 180) % 360 - 180;
    ue.position = llaToEcef(newLat, newLon, 0);
    ue.velocity = { x: dx / dt, y: dy / dt, z: 0 };
    ue.trail.push({ ...ue.position });
    if (ue.trail.length > TRAIL_MAX)
      ue.trail.shift();
    const bestSat = getBestSatellite(ue.position, satellites, config.minElevationDeg);
    if (bestSat && bestSat.id !== ue.servingSatId) {
      ue.servingSatId = bestSat.id;
      ue.bsId = bestSat.id;
      const elevation = calculateElevation3(ue.position, bestSat.position);
      const pl = pathLoss2(ue.position, bestSat.position, config, elevation);
      const gain = fadingGain(config.channelModel, config.ricianK);
      const noise = noisePowerdBm(config.bandwidthMHz);
      ue.pathLoss = pl;
      ue.channelGain = gain;
      ue.snr = computeSNR2(ue.txPower, pl, gain, noise);
      ue.sinr = ue.snr;
      ue.angle = azimuth2(ue.position, bestSat.position);
    }
  }
}
function pathLoss2(uePos, satPos, config, elevation) {
  const dx = uePos.x - satPos.x;
  const dy = uePos.y - satPos.y;
  const dz = uePos.z - satPos.z;
  const distKm = Math.sqrt(dx * dx + dy * dy + dz * dz) / 1e3;
  const d = Math.max(distKm, 1e-3);
  let slope;
  switch (config.channelModel) {
    case "NTN-LOS":
      slope = 20;
      break;
    case "NTN-NLOS":
      slope = 36.7;
      break;
    default:
      slope = config.pathLossExponent > 0 ? 10 * config.pathLossExponent : 20;
  }
  const fspl = 32.4 + slope * Math.log10(d) + 20 * Math.log10(config.carrierFreqGHz);
  return fspl + (random() - 0.5) * 2 * config.shadowingStd;
}
function calculateElevation3(uePos, satPos) {
  const ueToSat = vec3Norm(vec3Sub(satPos, uePos));
  const ueUp = vec3Norm(uePos);
  const elevationRad = Math.asin(Math.max(-1, Math.min(1, vec3Dot(ueToSat, ueUp))));
  return elevationRad * 180 / Math.PI;
}
function azimuth2(uePos, satPos) {
  const dx = satPos.x - uePos.x;
  const dy = satPos.y - uePos.y;
  return Math.atan2(dy, dx);
}
function computeSNR2(txPower, pathLossDb, gain, noisePower) {
  const gainDb = 10 * Math.log10(Math.max(gain, 1e-12));
  return txPower - pathLossDb + gainDb - noisePower;
}
function createUEs(config, satellites, data) {
  const ues = [];
  for (let id = 0; id < config.numUEs; id++) {
    const lat = -60 + random() * 120;
    const lon = -180 + random() * 360;
    const pos = llaToEcef(lat, lon, 0);
    const bestSat = getBestSatellite(pos, satellites, config.minElevationDeg);
    const servingSatId = bestSat?.id ?? null;
    let snr = 0, gain = 1, pl = 0;
    if (bestSat) {
      const elevation = calculateElevation3(pos, bestSat.position);
      pl = pathLoss2(pos, bestSat.position, config, elevation);
      gain = fadingGain(config.channelModel, config.ricianK);
      const noise = noisePowerdBm(config.bandwidthMHz);
      snr = computeSNR2(23, pl, gain, noise);
    }
    ues.push({
      id,
      position: pos,
      velocity: { x: 0, y: 0, z: 0 },
      servingSatId,
      candidateSats: [],
      snr,
      sinr: snr,
      pathLoss: pl,
      dopplerShift: 0,
      channelGain: gain,
      walkTarget: { x: 0, y: 0, z: 0 },
      walkRemaining: 0,
      pauseLeft: 0,
      trail: [],
      dataSize: config.samplesPerUE,
      localWeights: zeroWeights(config.numFeatures, config.numClasses),
      selected: false,
      lastRound: -1,
      bsId: servingSatId ?? -1,
      angle: 0,
      batterySoc: 1,
      txPower: 23,
      color: UE_PALETTE[id % UE_PALETTE.length]
    });
  }
  return ues;
}
function initTopology(config) {
  const startTime = 0;
  const satellites = createSatellites(config, startTime);
  const groundStations = createGroundStations(config);
  const islLinks = calculateISLLinks(satellites, config.maxISLRange * 1e3);
  for (const sat of satellites) {
    sat.islLinks = islLinks.get(sat.id) ?? [];
    sat.islNeighbors = sat.islLinks.map((l) => l.neighborId);
  }
  updateFeederLinks(satellites, groundStations, config.minElevationDeg);
  const data = partitionData(config);
  const ues = createUEs(config, satellites, data);
  for (const ue of ues) {
    ue.candidateSats = satellites.filter((s) => calculateElevation3(ue.position, s.position) >= config.minElevationDeg).map((s) => s.id).slice(0, 5);
  }
  const globalWeights = zeroWeights(config.numFeatures, config.numClasses);
  return {
    config,
    satellites,
    groundStations,
    ues,
    globalWeights,
    round: 0,
    history: [],
    spaceRics: /* @__PURE__ */ new Map(),
    xApps: /* @__PURE__ */ new Map(),
    kpmDatabase: /* @__PURE__ */ new Map(),
    pendingActions: [],
    feederLinkHistory: /* @__PURE__ */ new Map()
  };
}

// src/model.ts
function cloneWeights(m) {
  return { w: new Float32Array(m.w), b: new Float32Array(m.b), numFeatures: m.numFeatures, numClasses: m.numClasses, version: m.version };
}
function softmax(logits) {
  const max = Math.max(...logits);
  const exps = logits.map((v) => Math.exp(v - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map((v) => v / sum);
}
function forward(x, m) {
  const { w, b, numFeatures, numClasses } = m;
  const logits = new Array(numClasses).fill(0);
  for (let c = 0; c < numClasses; c++) {
    let z = b[c];
    for (let f = 0; f < numFeatures; f++)
      z += w[c * numFeatures + f] * x[f];
    logits[c] = z;
  }
  return softmax(logits);
}
function sgdStep(m, samples, lr, proxWeight = 0, ref = null) {
  const { numFeatures, numClasses } = m;
  const N = samples.length;
  if (N === 0)
    return;
  const dW = new Float32Array(numClasses * numFeatures);
  const dB = new Float32Array(numClasses);
  for (const s of samples) {
    const probs = forward(s.x, m);
    for (let c = 0; c < numClasses; c++) {
      const delta = probs[c] - (c === s.y ? 1 : 0);
      dB[c] += delta / N;
      for (let f = 0; f < numFeatures; f++) {
        dW[c * numFeatures + f] += delta * s.x[f] / N;
      }
    }
  }
  if (proxWeight > 0 && ref !== null) {
    for (let i = 0; i < dW.length; i++)
      dW[i] += proxWeight * (m.w[i] - ref.w[i]);
    for (let i = 0; i < dB.length; i++)
      dB[i] += proxWeight * (m.b[i] - ref.b[i]);
  }
  for (let i = 0; i < m.w.length; i++)
    m.w[i] -= lr * dW[i];
  for (let i = 0; i < m.b.length; i++)
    m.b[i] -= lr * dB[i];
}
function computeGradient(m, samples) {
  const { numFeatures, numClasses } = m;
  const N = samples.length;
  const gW = new Float32Array(numClasses * numFeatures);
  const gB = new Float32Array(numClasses);
  if (N === 0)
    return { gW, gB };
  for (const s of samples) {
    const probs = forward(s.x, m);
    for (let c = 0; c < numClasses; c++) {
      const delta = probs[c] - (c === s.y ? 1 : 0);
      gB[c] += delta / N;
      for (let f = 0; f < numFeatures; f++)
        gW[c * numFeatures + f] += delta * s.x[f] / N;
    }
  }
  return { gW, gB };
}

// src/fl/FedAVG.ts
var FedAVG = class {
  constructor() {
    this.name = "FedAVG";
  }
  localTrain(ue, globalWeights, data, config) {
    if (data.length === 0)
      return;
    const localWeights = cloneWeights(globalWeights);
    for (let epoch = 0; epoch < config.localEpochs; epoch++) {
      sgdStep(localWeights, data, config.learningRate, 0, null);
    }
    ue.localWeights = localWeights;
  }
  aggregate(globalWeights, participants, _allData, config) {
    if (participants.length === 0)
      return globalWeights;
    let totalSamples = 0;
    for (const ue of participants) {
      totalSamples += ue.dataSize;
    }
    const newWeights = {
      w: new Float32Array(globalWeights.w.length).fill(0),
      b: new Float32Array(globalWeights.b.length).fill(0),
      numFeatures: globalWeights.numFeatures,
      numClasses: globalWeights.numClasses,
      version: globalWeights.version + 1
    };
    for (const ue of participants) {
      const weight = ue.dataSize / totalSamples;
      for (let i = 0; i < globalWeights.w.length; i++) {
        newWeights.w[i] += ue.localWeights.w[i] * weight;
      }
      for (let i = 0; i < globalWeights.b.length; i++) {
        newWeights.b[i] += ue.localWeights.b[i] * weight;
      }
    }
    return newWeights;
  }
};

// src/fl/FedSGD.ts
var FedSGD = class {
  constructor() {
    this.name = "FedSGD";
  }
  localTrain(ue, globalWeights, data, config) {
    if (data.length === 0)
      return;
    const { gW, gB } = computeGradient(globalWeights, data);
    ue.localWeights = {
      w: gW,
      b: gB,
      numFeatures: globalWeights.numFeatures,
      numClasses: globalWeights.numClasses,
      version: globalWeights.version
    };
  }
  aggregate(globalWeights, participants, _allData, config) {
    if (participants.length === 0)
      return globalWeights;
    const avgGradW = new Float32Array(globalWeights.w.length).fill(0);
    const avgGradB = new Float32Array(globalWeights.b.length).fill(0);
    for (const ue of participants) {
      for (let i = 0; i < globalWeights.w.length; i++) {
        avgGradW[i] += ue.localWeights.w[i];
      }
      for (let i = 0; i < globalWeights.b.length; i++) {
        avgGradB[i] += ue.localWeights.b[i];
      }
    }
    for (let i = 0; i < avgGradW.length; i++)
      avgGradW[i] /= participants.length;
    for (let i = 0; i < avgGradB.length; i++)
      avgGradB[i] /= participants.length;
    const newWeights = cloneWeights(globalWeights);
    for (let i = 0; i < newWeights.w.length; i++) {
      newWeights.w[i] -= config.learningRate * avgGradW[i];
    }
    for (let i = 0; i < newWeights.b.length; i++) {
      newWeights.b[i] -= config.learningRate * avgGradB[i];
    }
    newWeights.version = globalWeights.version + 1;
    return newWeights;
  }
};

// src/fl/FedProx.ts
var FedProx = class {
  constructor() {
    this.name = "FedProx";
  }
  localTrain(ue, globalWeights, data, config) {
    if (data.length === 0)
      return;
    const localWeights = cloneWeights(globalWeights);
    for (let epoch = 0; epoch < config.localEpochs; epoch++) {
      sgdStep(localWeights, data, config.learningRate, config.mu, globalWeights);
    }
    ue.localWeights = localWeights;
  }
  aggregate(globalWeights, participants, _allData, _config) {
    if (participants.length === 0)
      return globalWeights;
    let totalSamples = 0;
    for (const ue of participants) {
      totalSamples += ue.dataSize;
    }
    const newWeights = {
      w: new Float32Array(globalWeights.w.length).fill(0),
      b: new Float32Array(globalWeights.b.length).fill(0),
      numFeatures: globalWeights.numFeatures,
      numClasses: globalWeights.numClasses,
      version: globalWeights.version + 1
    };
    for (const ue of participants) {
      const weight = ue.dataSize / totalSamples;
      for (let i = 0; i < globalWeights.w.length; i++) {
        newWeights.w[i] += ue.localWeights.w[i] * weight;
      }
      for (let i = 0; i < globalWeights.b.length; i++) {
        newWeights.b[i] += ue.localWeights.b[i] * weight;
      }
    }
    return newWeights;
  }
};

// src/fl/NtnScheduler.ts
var RandomScheduler = class {
  constructor() {
    this.name = "Random";
  }
  select(ues, k) {
    const available = ues.filter((u) => u.dataSize > 0);
    const shuffled = [...available].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(k, available.length));
  }
  reset() {
  }
};
var RoundRobinScheduler = class {
  constructor() {
    this.name = "RoundRobin";
    this.pointer = 0;
  }
  select(ues, k) {
    const available = ues.filter((u) => u.dataSize > 0).sort((a, b) => a.id - b.id);
    if (available.length === 0)
      return [];
    const selected = [];
    for (let i = 0; i < k && selected.length < available.length; i++) {
      const idx = (this.pointer + i) % available.length;
      selected.push(available[idx]);
    }
    this.pointer = (this.pointer + k) % available.length;
    return selected;
  }
  reset() {
    this.pointer = 0;
  }
};
var MaxMinScheduler = class {
  constructor() {
    this.name = "MaxMin";
  }
  select(ues, k) {
    const available = ues.filter((u) => u.dataSize > 0);
    available.sort((a, b) => b.snr - a.snr);
    return available.slice(0, Math.min(k, available.length));
  }
  reset() {
  }
};
var MaxMaxScheduler = class {
  constructor() {
    this.name = "MaxMax";
  }
  select(ues, k) {
    const available = ues.filter((u) => u.dataSize > 0);
    available.sort((a, b) => b.dataSize - a.dataSize);
    return available.slice(0, Math.min(k, available.length));
  }
  reset() {
  }
};
var DCCScheduler = class {
  constructor(bsCooperation) {
    this.bsCooperation = bsCooperation;
    this.name = "DCC";
  }
  select(ues, k) {
    const available = ues.filter((u) => u.dataSize > 0);
    available.sort((a, b) => b.snr - a.snr);
    return available.slice(0, Math.min(k, available.length));
  }
  reset() {
  }
};
var GroverScheduler = class {
  constructor(snrThreshold) {
    this.snrThreshold = snrThreshold;
    this.name = "Grover";
  }
  select(ues, k) {
    const available = ues.filter((u) => u.dataSize > 0 && u.snr >= this.snrThreshold);
    available.sort((a, b) => b.snr - a.snr);
    return available.slice(0, Math.min(k, available.length));
  }
  reset() {
  }
};
var SpatialScheduler = class {
  constructor() {
    this.name = "Spatial";
  }
  select(ues, k) {
    const available = ues.filter((u) => u.dataSize > 0);
    const selected = [];
    const remaining = [...available].sort(() => Math.random() - 0.5);
    while (selected.length < k && remaining.length > 0) {
      const candidate = remaining.pop();
      let minDist = Infinity;
      for (const s of selected) {
        const dist = vec3Len(vec3Sub(candidate.position, s.position));
        if (dist < minDist)
          minDist = dist;
      }
      if (selected.length === 0 || minDist > 1e5) {
        selected.push(candidate);
      } else {
        remaining.push(candidate);
        if (remaining.length === selected.length)
          break;
      }
    }
    return selected;
  }
  reset() {
  }
};
var BeamformingScheduler = class {
  constructor() {
    this.name = "Beamforming";
  }
  select(ues, k) {
    const available = ues.filter((u) => u.dataSize > 0);
    const bySat = /* @__PURE__ */ new Map();
    for (const ue of available) {
      if (ue.servingSatId !== null) {
        if (!bySat.has(ue.servingSatId))
          bySat.set(ue.servingSatId, []);
        bySat.get(ue.servingSatId).push(ue);
      }
    }
    const selected = [];
    for (const [, satUes] of bySat) {
      satUes.sort((a, b) => b.snr - a.snr);
      selected.push(satUes[0]);
      if (selected.length >= k)
        break;
    }
    return selected.slice(0, k);
  }
  reset() {
  }
};
var VirtualMIMOScheduler = class {
  constructor() {
    this.name = "VirtualMIMO";
  }
  select(ues, k) {
    const available = ues.filter((u) => u.dataSize > 0);
    available.sort((a, b) => b.snr - a.snr);
    return available.slice(0, Math.min(k, available.length));
  }
  reset() {
  }
};
var NtnElevationScheduler = class {
  constructor() {
    this.name = "NtnElevation";
  }
  select(ues, k, _round, satellites, config) {
    const available = ues.filter((u) => u.dataSize > 0);
    for (const ue of available) {
      let elevation = 0;
      if (ue.servingSatId !== null && satellites && config) {
        const sat = satellites.find((s) => s.id === ue.servingSatId);
        if (sat) {
          elevation = calculateElevation(ue.position, sat.position);
        }
      }
      ue.snr = ue.snr * (1 + elevation / 90);
    }
    available.sort((a, b) => b.snr - a.snr);
    return available.slice(0, Math.min(k, available.length));
  }
  reset() {
  }
};
var NtnDopplerScheduler = class {
  constructor() {
    this.name = "NtnDoppler";
  }
  select(ues, k, _round, _satellites, config) {
    const available = ues.filter((u) => u.dataSize > 0);
    for (const ue of available) {
      const dopplerPenalty = Math.min(1, Math.abs(ue.dopplerShift) / (config?.maxDopplerHz ?? 5e3));
      ue.snr = ue.snr * (1 - dopplerPenalty * 0.5);
    }
    available.sort((a, b) => b.snr - a.snr);
    return available.slice(0, Math.min(k, available.length));
  }
  reset() {
  }
};
var NtnFeederAwareScheduler = class {
  constructor() {
    this.name = "NtnFeederAware";
  }
  select(ues, k, _round, satellites, config) {
    const available = ues.filter((u) => u.dataSize > 0);
    if (config?.requireFeederLink && satellites) {
      const feederActive = /* @__PURE__ */ new Set();
      for (const sat of satellites) {
        if (sat.feederLink?.active)
          feederActive.add(sat.id);
      }
      const withFeeder = available.filter(
        (ue) => ue.servingSatId !== null && feederActive.has(ue.servingSatId)
      );
      if (withFeeder.length >= k) {
        withFeeder.sort((a, b) => b.snr - a.snr);
        return withFeeder.slice(0, k);
      }
      withFeeder.sort((a, b) => b.snr - a.snr);
      const withoutFeeder = available.filter(
        (ue) => ue.servingSatId === null || !feederActive.has(ue.servingSatId)
      );
      withoutFeeder.sort((a, b) => b.snr - a.snr);
      return [...withFeeder.slice(0, Math.ceil(k / 2)), ...withoutFeeder.slice(0, Math.floor(k / 2))];
    }
    available.sort((a, b) => b.snr - a.snr);
    return available.slice(0, Math.min(k, available.length));
  }
  reset() {
  }
};
function createScheduler(config) {
  switch (config.scheduler) {
    case "Random":
      return new RandomScheduler();
    case "RoundRobin":
      return new RoundRobinScheduler();
    case "MaxMin":
      return new MaxMinScheduler();
    case "MaxMax":
      return new MaxMaxScheduler();
    case "DCC":
      return new DCCScheduler(config.bsCooperation);
    case "Grover":
      return new GroverScheduler(config.snrThreshold);
    case "Spatial":
      return new SpatialScheduler();
    case "Beamforming":
      return new BeamformingScheduler();
    case "VirtualMIMO":
      return new VirtualMIMOScheduler();
    case "NtnElevation":
      return new NtnElevationScheduler();
    case "NtnDoppler":
      return new NtnDopplerScheduler();
    case "NtnFeederAware":
      return new NtnFeederAwareScheduler();
    default:
      return new RandomScheduler();
  }
}
function selectUEs(scheduler, ues, k, round, satellites, config) {
  if (scheduler.select.length > 2) {
    return scheduler.select(ues, k, round, satellites, config);
  }
  return scheduler.select(ues, k);
}

// src/fl/index.ts
function createFLStrategy(config) {
  switch (config.flAlgorithm) {
    case "FedAVG":
      return new FedAVG();
    case "FedSGD":
      return new FedSGD();
    case "FedProx":
      return new FedProx();
  }
}

// src/xapp/XAppBase.ts
var XAppBase = class {
  constructor(type, enabled = true) {
    this.kpmHistory = [];
    this.decisionLatencies = [];
    const defaults = XAPP_DEFAULTS[type];
    this.config = {
      type,
      enabled,
      priority: defaults.priority,
      decisionInterval: defaults.decisionInterval,
      requiredEventTriggers: defaults.eventTriggers,
      requiredReportStyle: defaults.reportStyle
    };
    this.name = type;
  }
  reset() {
    this.kpmHistory = [];
    this.decisionLatencies = [];
  }
  recordDecision(latencyMs) {
    this.decisionLatencies.push(latencyMs);
    if (this.decisionLatencies.length > 1e3)
      this.decisionLatencies.shift();
  }
  getAvgLatency() {
    if (this.decisionLatencies.length === 0)
      return 0;
    return this.decisionLatencies.reduce((a, b) => a + b, 0) / this.decisionLatencies.length;
  }
};

// src/xapp/HoPredictXApp.ts
var HoPredictXApp = class extends XAppBase {
  constructor(enabled = true) {
    super("ho-predict", enabled);
    this.ueScores = /* @__PURE__ */ new Map();
  }
  processKpmReport(report) {
    for (const ueReport of report.ueReports) {
      const score = this.computeHandoverScore(ueReport, report);
      this.ueScores.set(ueReport.ueId, score);
    }
  }
  computeHandoverScore(ueReport, report) {
    let score = 0;
    if (ueReport.sinr < 5)
      score += 30;
    if (ueReport.rsrp < -110)
      score += 25;
    if (Math.abs(report.dopplerShift) > 3e3)
      score += 20;
    if (report.elevation < 15)
      score += 15;
    if (ueReport.harqNackRate > 0.1)
      score += 10;
    return Math.min(100, score);
  }
  decisionCycle() {
    const start = performance.now();
    const actions = [];
    for (const [ueId, score] of this.ueScores) {
      if (score > 70) {
        actions.push({
          type: "HANDOVER_TRIGGER",
          targetId: ueId,
          payload: { targetSatId: 0, reason: "predicted_ho", confidence: score / 100 },
          priority: this.config.priority,
          timestamp: Date.now()
        });
      } else if (score > 40) {
        actions.push({
          type: "HANDOVER_CANCEL",
          targetId: ueId,
          payload: { reason: "score_below_threshold" },
          priority: this.config.priority,
          timestamp: Date.now()
        });
      }
    }
    const latency = performance.now() - start;
    this.recordDecision(latency);
    return { actions, confidence: 0.85, latencyMs: latency };
  }
  getRequiredSubscription() {
    return {
      eventTriggers: this.config.requiredEventTriggers,
      reportStyle: this.config.requiredReportStyle
    };
  }
};

// src/xapp/BeamHopXApp.ts
var BeamHopXApp = class extends XAppBase {
  constructor(enabled = true) {
    super("beam-hop", enabled);
    this.beamLoads = /* @__PURE__ */ new Map();
  }
  processKpmReport(report) {
    const loads = report.sliceMetrics.map((s) => s.prbUsed / Math.max(1, s.prbAllocated));
    this.beamLoads.set(report.gnbId, loads);
  }
  decisionCycle() {
    const start = performance.now();
    const actions = [];
    for (const [gnbId, loads] of this.beamLoads) {
      const maxLoad = Math.max(...loads);
      const minLoad = Math.min(...loads);
      if (maxLoad - minLoad > 0.3) {
        actions.push({
          type: "BEAM_HOP_SCHEDULE",
          targetId: gnbId,
          payload: { pattern: "load_balancing", beams: loads.length },
          priority: this.config.priority,
          timestamp: Date.now()
        });
      }
    }
    const latency = performance.now() - start;
    this.recordDecision(latency);
    return { actions, confidence: 0.8, latencyMs: latency };
  }
  getRequiredSubscription() {
    return {
      eventTriggers: this.config.requiredEventTriggers,
      reportStyle: this.config.requiredReportStyle
    };
  }
};

// src/xapp/SliceManagerXApp.ts
var SliceManagerXApp = class extends XAppBase {
  constructor(enabled = true) {
    super("slice-manager", enabled);
  }
  processKpmReport(report) {
  }
  decisionCycle() {
    const start = performance.now();
    const actions = [];
    actions.push({
      type: "SLICE_PRB_ALLOCATION",
      targetId: 0,
      payload: {
        sliceAllocations: [
          { sliceId: 1, prbs: 40 },
          // eMBB
          { sliceId: 2, prbs: 30 },
          // URLLC
          { sliceId: 3, prbs: 30 }
          // mMTC
        ]
      },
      priority: this.config.priority,
      timestamp: Date.now()
    });
    const latency = performance.now() - start;
    this.recordDecision(latency);
    return { actions, confidence: 0.9, latencyMs: latency };
  }
  getRequiredSubscription() {
    return {
      eventTriggers: this.config.requiredEventTriggers,
      reportStyle: this.config.requiredReportStyle
    };
  }
};

// src/xapp/DopplerCompXApp.ts
var DopplerCompXApp = class extends XAppBase {
  constructor(enabled = true) {
    super("doppler-comp", enabled);
    this.lastReports = /* @__PURE__ */ new Map();
  }
  processKpmReport(report) {
    this.lastReports.set(report.gnbId, report);
  }
  decisionCycle() {
    const start = performance.now();
    const actions = [];
    for (const [gnbId, report] of this.lastReports) {
      if (Math.abs(report.dopplerShift) > 1e3) {
        actions.push({
          type: "DOPPLER_COMP_UPDATE",
          targetId: gnbId,
          payload: { compensationHz: -report.dopplerShift, method: "frequency_shift" },
          priority: this.config.priority,
          timestamp: Date.now()
        });
        if (report.elevation < 20) {
          actions.push({
            type: "TIMING_ADVANCE_UPDATE",
            targetId: gnbId,
            payload: { advanceUs: Math.abs(report.dopplerShift) * 0.1 },
            priority: this.config.priority,
            timestamp: Date.now()
          });
        }
      }
    }
    const latency = performance.now() - start;
    this.recordDecision(latency);
    return { actions, confidence: 0.9, latencyMs: latency };
  }
  getRequiredSubscription() {
    return {
      eventTriggers: this.config.requiredEventTriggers,
      reportStyle: this.config.requiredReportStyle
    };
  }
};

// src/xapp/TnNtnSteeringXApp.ts
var TnNtnSteeringXApp = class extends XAppBase {
  constructor(enabled = true) {
    super("tn-ntn-steering", enabled);
    this.lastReports = /* @__PURE__ */ new Map();
  }
  processKpmReport(report) {
    this.lastReports.set(report.gnbId, report);
  }
  decisionCycle() {
    const start = performance.now();
    const actions = [];
    for (const [gnbId, report] of this.lastReports) {
      const tnLoad = report.sliceMetrics.find((s) => s.sliceId === 1)?.prbUsed ?? 0;
      const ntnLoad = report.sliceMetrics.find((s) => s.sliceId === 3)?.prbUsed ?? 0;
      if (tnLoad > ntnLoad * 1.5) {
        actions.push({
          type: "TX_POWER_CONTROL",
          targetId: gnbId,
          payload: { powerDb: 30, target: "ntn" },
          priority: this.config.priority,
          timestamp: Date.now()
        });
      }
    }
    const latency = performance.now() - start;
    this.recordDecision(latency);
    return { actions, confidence: 0.8, latencyMs: latency };
  }
  getRequiredSubscription() {
    return {
      eventTriggers: this.config.requiredEventTriggers,
      reportStyle: this.config.requiredReportStyle
    };
  }
};

// src/xapp/EnergyHarvestXApp.ts
var EnergyHarvestXApp = class extends XAppBase {
  constructor(enabled = true) {
    super("energy-harvest", enabled);
    this.lastReports = /* @__PURE__ */ new Map();
  }
  processKpmReport(report) {
    this.lastReports.set(report.gnbId, report);
  }
  decisionCycle() {
    const start = performance.now();
    const actions = [];
    for (const [gnbId, report] of this.lastReports) {
      if (report.batterySoc < 0.2 || report.solarPower < 50) {
        actions.push({
          type: "BEAM_SHUTDOWN",
          targetId: gnbId,
          payload: { beams: [0, 1], reason: "energy_conservation" },
          priority: this.config.priority,
          timestamp: Date.now()
        });
        actions.push({
          type: "COMPUTE_THROTTLE",
          targetId: gnbId,
          payload: { throttlePercent: 50 },
          priority: this.config.priority,
          timestamp: Date.now()
        });
      }
    }
    const latency = performance.now() - start;
    this.recordDecision(latency);
    return { actions, confidence: 0.95, latencyMs: latency };
  }
  getRequiredSubscription() {
    return {
      eventTriggers: this.config.requiredEventTriggers,
      reportStyle: this.config.requiredReportStyle
    };
  }
};

// src/xapp/InterferenceMgmtXApp.ts
var InterferenceMgmtXApp = class extends XAppBase {
  constructor(enabled = true) {
    super("interference-mgmt", enabled);
    this.lastReports = /* @__PURE__ */ new Map();
  }
  processKpmReport(report) {
    this.lastReports.set(report.gnbId, report);
  }
  decisionCycle() {
    const start = performance.now();
    const actions = [];
    for (const [gnbId, report] of this.lastReports) {
      const avgSinr = report.ueReports.reduce((sum, ue) => sum + ue.sinr, 0) / Math.max(1, report.ueReports.length);
      if (avgSinr < 10) {
        actions.push({
          type: "INTERFERENCE_NULLING",
          targetId: gnbId,
          payload: { method: "zero_forcing", targetBeams: [0, 1, 2] },
          priority: this.config.priority,
          timestamp: Date.now()
        });
      }
    }
    const latency = performance.now() - start;
    this.recordDecision(latency);
    return { actions, confidence: 0.85, latencyMs: latency };
  }
  getRequiredSubscription() {
    return {
      eventTriggers: this.config.requiredEventTriggers,
      reportStyle: this.config.requiredReportStyle
    };
  }
};

// src/xapp/MultiConnXApp.ts
var MultiConnXApp = class extends XAppBase {
  constructor(enabled = true) {
    super("multi-conn", enabled);
    this.lastReports = /* @__PURE__ */ new Map();
  }
  processKpmReport(report) {
    this.lastReports.set(report.gnbId, report);
  }
  decisionCycle() {
    const start = performance.now();
    const actions = [];
    for (const [gnbId, report] of this.lastReports) {
      for (const ueReport of report.ueReports) {
        if (ueReport.sinr < 5 && !report.dcActive) {
          actions.push({
            type: "DC_SETUP",
            targetId: ueReport.ueId,
            payload: { secondaryGnb: 0, bearerSplit: "balanced" },
            priority: this.config.priority,
            timestamp: Date.now()
          });
        } else if (ueReport.sinr > 20 && report.dcActive) {
          actions.push({
            type: "DC_TEARDOWN",
            targetId: ueReport.ueId,
            payload: { reason: "good_primary_link" },
            priority: this.config.priority,
            timestamp: Date.now()
          });
        }
      }
    }
    const latency = performance.now() - start;
    this.recordDecision(latency);
    return { actions, confidence: 0.8, latencyMs: latency };
  }
  getRequiredSubscription() {
    return {
      eventTriggers: this.config.requiredEventTriggers,
      reportStyle: this.config.requiredReportStyle
    };
  }
};

// src/xapp/PredictiveAllocXApp.ts
var PredictiveAllocXApp = class extends XAppBase {
  constructor(enabled = true) {
    super("predictive-alloc", enabled);
    this.loadHistory = /* @__PURE__ */ new Map();
  }
  processKpmReport(report) {
    const history = this.loadHistory.get(report.gnbId) ?? [];
    history.push(report.cellLoad);
    if (history.length > 20)
      history.shift();
    this.loadHistory.set(report.gnbId, history);
  }
  decisionCycle() {
    const start = performance.now();
    const actions = [];
    for (const [gnbId, history] of this.loadHistory) {
      if (history.length < 5)
        continue;
      const trend = history[history.length - 1] - history[0];
      if (trend > 0.2) {
        actions.push({
          type: "PRB_RESERVATION",
          targetId: gnbId,
          payload: { reservePrbs: Math.min(20, Math.round(trend * 100)), horizon: 5 },
          priority: this.config.priority,
          timestamp: Date.now()
        });
      }
    }
    const latency = performance.now() - start;
    this.recordDecision(latency);
    return { actions, confidence: 0.75, latencyMs: latency };
  }
  getRequiredSubscription() {
    return {
      eventTriggers: this.config.requiredEventTriggers,
      reportStyle: this.config.requiredReportStyle
    };
  }
};

// src/xapp/index.ts
function createXApp(type, enabled = true) {
  switch (type) {
    case "ho-predict":
      return new HoPredictXApp(enabled);
    case "beam-hop":
      return new BeamHopXApp(enabled);
    case "slice-manager":
      return new SliceManagerXApp(enabled);
    case "doppler-comp":
      return new DopplerCompXApp(enabled);
    case "tn-ntn-steering":
      return new TnNtnSteeringXApp(enabled);
    case "energy-harvest":
      return new EnergyHarvestXApp(enabled);
    case "interference-mgmt":
      return new InterferenceMgmtXApp(enabled);
    case "multi-conn":
      return new MultiConnXApp(enabled);
    case "predictive-alloc":
      return new PredictiveAllocXApp(enabled);
    default:
      throw new Error(`Unknown xApp type: ${type}`);
  }
}
function createAllXApps(config) {
  const xApps = /* @__PURE__ */ new Map();
  for (const type of config.enabledXApps) {
    xApps.set(type, createXApp(type, true));
  }
  return xApps;
}

// src/simulator.ts
function generateKpmReport(sat, ues, config, round) {
  const servedUes = ues.filter((u) => u.servingSatId === sat.id);
  const ueReports = servedUes.map((ue) => ({
    ueId: ue.id,
    rsrp: -100 + ue.snr,
    rsrq: -10 + ue.snr * 0.5,
    sinr: ue.snr,
    cqi: Math.min(15, Math.max(1, Math.round(ue.snr / 2 + 7))),
    throughput: shannonCapacity2(ue.snr) * config.bandwidthMHz * 1e6 / 1e6,
    latency: 10 + Math.max(0, 50 - ue.snr),
    harqAckRate: Math.min(1, 0.5 + ue.snr / 30),
    harqNackRate: Math.max(0, 0.5 - ue.snr / 30),
    mcs: Math.min(28, Math.max(0, Math.round(ue.snr / 2))),
    prbUtilization: Math.min(1, servedUes.length / 100),
    bufferStatus: ue.dataSize * 1e3
  }));
  const totalPrbs = 100;
  const usedPrbs = Math.min(totalPrbs, servedUes.length * 5);
  const sliceMetrics = [
    { sliceId: 1, throughput: 50, latency: 20, reliability: 0.99, prbAllocated: 40, prbUsed: 35, ueCount: servedUes.filter((u) => u.id % 3 === 0).length },
    { sliceId: 2, throughput: 10, latency: 5, reliability: 0.999, prbAllocated: 30, prbUsed: 25, ueCount: servedUes.filter((u) => u.id % 3 === 1).length },
    { sliceId: 3, throughput: 1, latency: 100, reliability: 0.95, prbAllocated: 30, prbUsed: 20, ueCount: servedUes.filter((u) => u.id % 3 === 2).length }
  ];
  const elevation = servedUes.length > 0 ? calculateElevation(servedUes[0].position, sat.position) : 0;
  const doppler = servedUes.length > 0 ? servedUes[0].dopplerShift : 0;
  return {
    gnbId: sat.id,
    timestamp: round,
    ueReports,
    cellLoad: usedPrbs / totalPrbs,
    numActiveUes: servedUes.length,
    totalPrbs,
    usedPrbs,
    sliceMetrics,
    elevation,
    dopplerShift: doppler,
    timeToEclipse: sat.state === "ECLIPSE" ? 0 : 3600,
    batterySoc: sat.batterySoc,
    solarPower: sat.solarPower,
    beamIndex: 0,
    beamGain: 20,
    dcActive: false,
    dcBearers: 0
  };
}
function runXAppCycle(xApps, kpmDatabase, satellites, ues, config, round) {
  const actions = [];
  for (const [, xapp] of xApps) {
    if (!xapp.config.enabled)
      continue;
    for (const sat of satellites) {
      const reports = kpmDatabase.get(sat.id);
      if (reports && reports.length > 0) {
        const latestReport = reports[reports.length - 1];
        if (latestReport) {
          xapp.processKpmReport(latestReport);
        }
      }
    }
    const decision = xapp.decisionCycle();
    actions.push(...decision.actions);
  }
  return actions;
}
function runSpaceRicCycle(spaceRics, satellites, ues, config, round) {
  const actions = [];
  const gradients = /* @__PURE__ */ new Map();
  for (const [satId, spRic] of spaceRics) {
    const sat = satellites.find((s) => s.id === satId);
    if (!sat)
      continue;
    const feederActive = sat.feederLink?.active ?? false;
    if (!feederActive) {
      spRic.feederOutageDuration += config.roundDuration;
    } else {
      spRic.feederOutageDuration = 0;
    }
    if (config.autonomousMode && spRic.feederOutageDuration >= config.feederOutageThreshold) {
      spRic.autonomous = true;
      sat.state = "AUTONOMOUS";
    } else if (feederActive && spRic.autonomous) {
      spRic.autonomous = false;
      sat.state = "SYNCING";
    }
    if (spRic.autonomous) {
      for (const [dAppName, decision] of spRic.dAppDecisions) {
        actions.push({
          type: "BEAM_SWITCH",
          targetId: satId,
          payload: { dApp: dAppName, action: decision.action },
          priority: 50,
          timestamp: round
        });
      }
    }
    if (sat.localGradients) {
      gradients.set(satId, sat.localGradients);
    }
  }
  if (config.islCoordination) {
    for (const [satId, spRic] of spaceRics) {
      const sat = satellites.find((s) => s.id === satId);
      if (!sat)
        continue;
      for (const neighborId of sat.islNeighbors) {
        const neighbor = spaceRics.get(neighborId);
        if (neighbor) {
          spRic.islNeighbors.set(neighborId, neighbor);
        }
      }
    }
  }
  return { actions, gradients };
}
var AiranNtnSimulator = class {
  constructor(config = DEFAULT_CONFIG) {
    setSeed(config.seed);
    const initialState = initTopology(config);
    this.state = initialState;
    this.flStrategy = createFLStrategy(config);
    this.scheduler = createScheduler(config);
    this.xApps = createAllXApps(config);
  }
  reset(config) {
    const newConfig = config ?? this.state.config;
    setSeed(newConfig.seed);
    this.state = initTopology(newConfig);
    this.flStrategy = createFLStrategy(newConfig);
    this.scheduler = createScheduler(newConfig);
    this.xApps = createAllXApps(newConfig);
  }
  getState() {
    return this.state;
  }
  // ──────────────────────────────────────────────────────────────────────────
  // Single FL Round
  // ──────────────────────────────────────────────────────────────────────────
  step() {
    const { state } = this;
    const { config, satellites, groundStations, ues, globalWeights } = state;
    state.round++;
    const dt = config.roundDuration;
    const newSatellites = satellites.map((sat) => propagateSatellite(sat, dt));
    const islLinks = calculateISLLinks(newSatellites, config.maxISLRange * 1e3);
    for (const sat of newSatellites) {
      sat.islLinks = islLinks.get(sat.id) ?? [];
      sat.islNeighbors = sat.islLinks.map((l) => l.neighborId);
    }
    updateFeederLinks(newSatellites, groundStations, config.minElevationDeg);
    ueWalkStep(ues, newSatellites, config);
    refreshChannels(ues, newSatellites, config, dt);
    for (const sat of newSatellites) {
      const report = generateKpmReport(sat, ues, config, state.round);
      if (!state.kpmDatabase.has(sat.id)) {
        state.kpmDatabase.set(sat.id, []);
      }
      const db = state.kpmDatabase.get(sat.id);
      db.push(report);
      if (db.length > 10)
        db.shift();
    }
    const k = Math.min(config.selectedPerRound, ues.length);
    const participants = selectUEs(this.scheduler, ues, k, state.round, newSatellites, config);
    const selectedIds = new Set(participants.map((u) => u.id));
    ues.forEach((u) => {
      u.selected = selectedIds.has(u.id);
    });
    participants.forEach((u) => {
      u.lastRound = state.round;
    });
    const data = partitionData(config);
    for (const ue of participants) {
      const localData = data.get(ue.id) ?? [];
      this.flStrategy.localTrain(ue, globalWeights, localData, config);
    }
    state.globalWeights = this.flStrategy.aggregate(globalWeights, participants, data, config);
    const allSamples = [];
    for (const [, samples] of data)
      allSamples.push(...samples);
    const globalLoss = this.evaluateLoss(allSamples, state.globalWeights);
    const globalAccuracy = this.evaluateAccuracy(allSamples, state.globalWeights);
    const xappActions = runXAppCycle(this.xApps, state.kpmDatabase, newSatellites, ues, config, state.round);
    state.pendingActions.push(...xappActions);
    if (config.spaceRicEnabled) {
      const spaceRicResult = runSpaceRicCycle(state.spaceRics, newSatellites, ues, config, state.round);
      state.pendingActions.push(...spaceRicResult.actions);
    }
    this.executeActions(state.pendingActions, newSatellites, ues);
    state.pendingActions = [];
    const snrs = participants.map((u) => u.snr);
    const avgSNR = snrs.length > 0 ? snrs.reduce((a, b) => a + b, 0) / snrs.length : 0;
    const minSNR = snrs.length > 0 ? Math.min(...snrs) : 0;
    const elevations = participants.map((u) => u.servingSatId !== null ? calculateElevation(u.position, newSatellites.find((s) => s.id === u.servingSatId).position) : 0).filter((e) => e > 0);
    const avgElevation = elevations.length > 0 ? elevations.reduce((a, b) => a + b, 0) / elevations.length : 0;
    const dopplers = participants.map((u) => Math.abs(u.dopplerShift));
    const avgDoppler = dopplers.length > 0 ? dopplers.reduce((a, b) => a + b, 0) / dopplers.length : 0;
    const feederActive = participants.filter(
      (u) => u.servingSatId !== null && newSatellites.find((s) => s.id === u.servingSatId)?.feederLink?.active
    ).length;
    const feederLinkUptime = participants.length > 0 ? feederActive / participants.length : 0;
    const nParams = globalWeights.w.length + globalWeights.b.length;
    const totalBits = participants.reduce((s, u) => s + commCostBits(nParams, u.snr), 0);
    let handovers = 0;
    for (const ue of ues) {
      if (ue.servingSatId !== ue.bsId && ue.lastRound === state.round)
        handovers++;
    }
    const satelliteEnergy = newSatellites.reduce((s, sat) => s + (sat.solarPower - 200) * dt / 3600, 0);
    const metrics = {
      round: state.round,
      selectedIds: participants.map((u) => u.id),
      globalLoss,
      globalAccuracy,
      avgSNR,
      minSNR,
      participationRate: participants.length / ues.length,
      commCostBits: totalBits,
      avgElevation,
      avgDoppler,
      feederLinkUptime,
      handovers,
      satelliteEnergy
    };
    state.history.push(metrics);
    state.satellites = newSatellites;
    return metrics;
  }
  // ──────────────────────────────────────────────────────────────────────────
  // Run All Rounds
  // ──────────────────────────────────────────────────────────────────────────
  runAll(onRound) {
    while (this.state.round < this.state.config.totalRounds) {
      const m = this.step();
      if (onRound)
        onRound(m);
    }
    return this.state.history;
  }
  get isDone() {
    return this.state.round >= this.state.config.totalRounds;
  }
  // ──────────────────────────────────────────────────────────────────────────
  // Helpers
  // ──────────────────────────────────────────────────────────────────────────
  executeActions(actions, satellites, ues) {
    for (const action of actions) {
      switch (action.type) {
        case "HANDOVER_TRIGGER": {
          const ueId = action.targetId;
          const targetSatId = action.payload.targetSatId ?? 0;
          const ue = ues.find((u) => u.id === ueId);
          if (ue && ue.candidateSats.includes(targetSatId)) {
            ue.servingSatId = targetSatId;
            ue.bsId = targetSatId;
          }
          break;
        }
        case "BEAM_SWITCH": {
          const satId = action.targetId;
          const sat = satellites.find((s) => s.id === satId);
          if (sat) {
          }
          break;
        }
        case "TX_POWER_CONTROL": {
          const ueId = action.targetId;
          const ue = ues.find((u) => u.id === ueId);
          if (ue) {
            ue.txPower = action.payload.power ?? ue.txPower;
          }
          break;
        }
        case "SLICE_PRB_ALLOCATION": {
          break;
        }
      }
    }
  }
  evaluateLoss(samples, weights) {
    if (samples.length === 0)
      return 0;
    let total = 0;
    for (const s of samples) {
      const probs = this.forward(s.x, weights);
      total -= Math.log(Math.max(probs[s.y], 1e-12));
    }
    return total / samples.length;
  }
  evaluateAccuracy(samples, weights) {
    if (samples.length === 0)
      return 0;
    let correct = 0;
    for (const s of samples) {
      const probs = this.forward(s.x, weights);
      const pred = probs.indexOf(Math.max(...probs));
      if (pred === s.y)
        correct++;
    }
    return correct / samples.length;
  }
  forward(x, m) {
    const { w, b, numFeatures, numClasses } = m;
    const logits = new Array(numClasses).fill(0);
    for (let c = 0; c < numClasses; c++) {
      let z = b[c];
      for (let f = 0; f < numFeatures; f++)
        z += w[c * numFeatures + f] * x[f];
      logits[c] = z;
    }
    const max = Math.max(...logits);
    const exps = logits.map((v) => Math.exp(v - max));
    const sum = exps.reduce((a, b2) => a + b2, 0);
    return exps.map((v) => v / sum);
  }
};

// src/cli.ts
var import_fs = require("fs");
var import_path = require("path");
var import_url = require("url");
var import_path2 = require("path");
var import_meta = {};
var __filename = typeof import_meta !== "undefined" && import_meta.url ? (0, import_url.fileURLToPath)(import_meta.url) : process.argv[1];
var __dirname = (0, import_path2.dirname)(__filename);
function parseArgs() {
  const args = {};
  const argv = process.argv.slice(2);
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    const next = argv[i + 1];
    switch (arg) {
      case "--preset":
      case "-p":
        args.preset = next;
        i++;
        break;
      case "--config":
      case "-c":
        args.config = next;
        i++;
        break;
      case "--output":
      case "-o":
        args.output = next;
        i++;
        break;
      case "--rounds":
      case "-r":
        args.rounds = parseInt(next, 10);
        i++;
        break;
      case "--ues":
      case "-u":
        args.ues = parseInt(next, 10);
        i++;
        break;
      case "--orbitals":
        args.orbitals = parseInt(next, 10);
        i++;
        break;
      case "--planes":
        args.planes = parseInt(next, 10);
        i++;
        break;
      case "--seed":
        args.seed = parseInt(next, 10);
        i++;
        break;
      case "--quiet":
      case "-q":
        args.quiet = true;
        break;
      case "--csv":
        args.csv = true;
        break;
      case "--json":
        args.json = true;
        break;
      case "--help":
      case "-h":
        printHelp();
        process.exit(0);
    }
  }
  return args;
}
function printHelp() {
  console.log(`
airan-ntn \u2014 O-RAN NTN Simulator CLI

Usage: airan-ntn [options]

Options:
  -p, --preset <name>     Preset configuration (demo, standard, large, geo, fl_focused)
  -c, --config <file>     Load JSON config file
  -o, --output <file>     Output file for results
  -r, --rounds <n>        Total FL rounds
  -u, --ues <n>           Number of UEs
  --orbitals <n>          Satellites per orbital plane
  --planes <n>            Number of orbital planes
  --seed <n>              Random seed
  -q, --quiet             Suppress progress output
  --csv                   Output CSV to stdout
  --json                  Output JSON to stdout
  -h, --help              Show this help

Presets:
  demo           Quick demo (6\xD73 sats, 10 UEs, 20 rounds)
  standard       Starlink-like (12\xD76 sats, 20 UEs, 50 rounds)
  large          Full constellation (22\xD76 sats, 50 UEs, 100 rounds)
  geo            3 GEO satellites (1\xD73 sats, 15 UEs, 30 rounds)
  fl_focused     FL-heavy (8\xD74 sats, 40 UEs, 100 rounds)

Examples:
  airan-ntn --preset standard --rounds 100 --output results.json
  airan-ntn -p demo --csv > rounds.csv
  airan-ntn --config myconfig.json --json
`);
}
async function buildConfig(args) {
  let config = { ...DEFAULT_CONFIG };
  if (args.preset && SIM_PRESETS[args.preset]) {
    config = { ...config, ...SIM_PRESETS[args.preset] };
  }
  if (args.config) {
    try {
      const { readFileSync } = await import("fs");
      const fileConfig = JSON.parse(readFileSync(args.config, "utf-8"));
      config = { ...config, ...fileConfig };
    } catch (e) {
      console.error(`Failed to load config: ${e}`);
      process.exit(1);
    }
  }
  if (args.rounds !== void 0)
    config.totalRounds = args.rounds;
  if (args.ues !== void 0)
    config.numUEs = args.ues;
  if (args.orbitals !== void 0)
    config.numOrbitals = args.orbitals;
  if (args.planes !== void 0)
    config.numPlanes = args.planes;
  if (args.seed !== void 0)
    config.seed = args.seed;
  return config;
}
function createProgressCallback(quiet) {
  let lastLog = 0;
  return (m) => {
    if (quiet)
      return;
    const now = Date.now();
    if (now - lastLog > 1e3 || m.round === 1) {
      console.log(`Round ${m.round}: Loss=${m.globalLoss.toFixed(4)}, Acc=${(m.globalAccuracy * 100).toFixed(1)}%, SNR=${m.avgSNR.toFixed(1)}dB, Feeder=${(m.feederLinkUptime * 100).toFixed(0)}%`);
      lastLog = now;
    }
  };
}
async function main() {
  const args = parseArgs();
  const config = await buildConfig(args);
  if (!args.quiet) {
    console.log("airan-ntn simulator starting...");
    console.log(`Config: ${config.numOrbitals}\xD7${config.numPlanes} sats, ${config.numUEs} UEs, ${config.totalRounds} rounds`);
    console.log(`FL: ${config.flAlgorithm}/${config.scheduler}, Seed: ${config.seed}`);
  }
  const sim = new AiranNtnSimulator(config);
  const onRound = createProgressCallback(args.quiet ?? false);
  const startTime = Date.now();
  const history = sim.runAll(onRound);
  const elapsed = Date.now() - startTime;
  if (!args.quiet) {
    console.log(`
Completed in ${(elapsed / 1e3).toFixed(1)}s`);
    const final = history[history.length - 1];
    console.log(`Final: Loss=${final.globalLoss.toFixed(4)}, Acc=${(final.globalAccuracy * 100).toFixed(1)}%`);
    console.log(`Avg SNR: ${final.avgSNR.toFixed(1)}dB, Feeder uptime: ${(final.feederLinkUptime * 100).toFixed(1)}%`);
    console.log(`Handovers: ${final.handovers}, Sat energy: ${final.satelliteEnergy.toFixed(1)} Wh`);
  }
  const output = {
    config,
    history,
    summary: {
      totalRounds: history.length,
      finalLoss: history[history.length - 1]?.globalLoss ?? 0,
      finalAccuracy: history[history.length - 1]?.globalAccuracy ?? 0,
      avgSNR: history.reduce((a, b) => a + b.avgSNR, 0) / history.length,
      avgFeederUptime: history.reduce((a, b) => a + b.feederLinkUptime, 0) / history.length,
      totalHandovers: history[history.length - 1]?.handovers ?? 0,
      elapsedMs: elapsed
    }
  };
  if (args.json) {
    console.log(JSON.stringify(output, null, 2));
  } else if (args.csv) {
    const headers = ["round", "loss", "accuracy", "avgSNR", "minSNR", "participation", "commBits", "avgElev", "avgDoppler", "feederUptime", "handovers", "satEnergy"];
    const rows = history.map((m) => [
      m.round,
      m.globalLoss,
      m.globalAccuracy,
      m.avgSNR,
      m.minSNR,
      m.participationRate,
      m.commCostBits,
      m.avgElevation,
      m.avgDoppler,
      m.feederLinkUptime,
      m.handovers,
      m.satelliteEnergy
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    console.log(csv);
  } else if (args.output) {
    (0, import_fs.writeFileSync)((0, import_path.resolve)(args.output), JSON.stringify(output, null, 2));
    console.log(`Results written to ${args.output}`);
  }
}
main().catch((e) => {
  console.error("Error:", e);
  process.exit(1);
});
//# sourceMappingURL=cli.js.map
