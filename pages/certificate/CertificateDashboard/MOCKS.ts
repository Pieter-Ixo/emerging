import CookstoveModal from "@/components/Modals/CookstoveModal";
import AssetDeviceCard from "./ProofComponents/AssetDeviceCard";
import JSONViewerCard from "./ProofComponents/JSONViewerCard";
import CollectionCard from "./ProofComponents/CollectionCard";
import DAOCard from "./ProofComponents/DAOCard";
import OracleCard from "./ProofComponents/OracleCard";
import ProjectNameCard from "./ProofComponents/ProjectNameCard";
import { ICategoriesModel, IPropertiesModel } from "./types";

export const categoryIconMap: ICategoriesModel = {
  "Impact Asset": {
    category: "Impact Asset",
    icon: "/images/icon-assets.svg",
  },
  "Impact Claim": {
    category: "Impact Claim",
    icon: "/images/icon-leaf-solid.svg",
  },
  "Clean Energy Device": {
    category: "Clean Energy Device",
    icon: "/images/icon-cogs-solid.svg",
  },
  Project: {
    category: "Project",
    icon: "/images/icon-projects.svg",
  },
  "Impact Producer": {
    category: "Impact Producer",
    icon: "/images/icon-user.svg",
  },
  Evaluator: {
    category: "Evaluator",
    icon: "/images/icon-chart-bar-solid.svg",
  },
};

export const properties: IPropertiesModel = {
  // Impact Asset
  device_identifier: {
    key: "device_identifier",
    text: "identifier",
    value: "SupaMoto #15",
    component: AssetDeviceCard,
    props: {
      id: "{id}",
      type: "ImpactNFT",
      name: "SupaMoto Clean Cooking",
      tokenName: "SupaMoto",
      decimals: 0,
      description: "Zambia Collection 2023",
      image:
        "https://ipfs.io/ipfs/bafkreideszg4fdha4tf7ldpecltxbyxbnapb663tkuksk2vcczkzkxppaa",
      properties: {
        denom: "SUPAMOTO",
        icon: "https://ipfs.io/ipfs/bafkreigkajsskkswn5jwcmfxhn3rqc7gevzgroacq7ygfz6mzkgo72ej4i",
        maxSupply: "1500",
      },
    },
    category: "Impact Asset",
  },
  collection: {
    key: "collection",
    value: "SupaMoto Genesis Collection",
    component: CollectionCard,
    props: {
      id: "{id}",
      type: "ImpactNFT",
      name: "SupaMoto Genesis Collection",
      tokenName: "SupaMoto",
      decimals: 0,
      description: "SupaMoto Genesis Collection",
      image:
        "https://ipfs.io/ipfs/bafkreifkl6w55nasgqid22d2cqyxccjktbciefzmiqvcudlq3eoer2mzhi",
      properties: {
        denom: "SUPA1",
        icon: "https://ipfs.io/ipfs/bafkreigkajsskkswn5jwcmfxhn3rqc7gevzgroacq7ygfz6mzkgo72ej4i",
        maxSupply: "1",
      },
    },
    category: "Impact Asset",
  },
  denom: {
    key: "denom",
    value: "SUPA1",
    category: "Impact Asset",
  },
  creation_date: {
    key: "creation date",
    value: "19 Jun 2023",
    category: "Impact Asset",
  },
  total_produced: {
    key: "total CARBON produced",
    value: "1,235 CARBON",
    category: "Impact Asset",
  },
  total_avoided: {
    key: "total emissions avoided",
    value: "1,235 kgCO₂",
    category: "Impact Asset",
  },
  owned_by: {
    key: "owned by",
    value: "ixo146su...ef0rm",
    external:
      "https://www.mintscan.io/ixo/account/ixo146sugu8ll73m2wk5aupd3pe3pw9tcuj84ef0rm",
    category: "Impact Asset",
  },
  performance: {
    key: "performance",
    value: "dashboard",
    component: CookstoveModal,
    props: {
      id: 202200001,
    },
    category: "Impact Asset",
  },
  // Impact Claim
  fuel_type: {
    key: "fuel_type",
    text: "fuel type",
    value: "BiomassPellets",
    category: "Impact Claim",
  },
  fuel_amount: {
    key: "fuel_amount",
    text: "fuel amount",
    value: "30 kg",
    category: "Impact Claim",
  },
  cooking_time: {
    key: "cooking_time",
    text: "cooking time",
    value: " ",
    category: "Impact Claim",
  },
  conversion_factor: {
    key: "conversion_factor",
    text: "conversion factor",
    value: "11.48",
    external: "Conversion Factor.pdf",
    category: "Impact Claim",
  },
  period: {
    key: "period",
    text: "period",
    value: "Aug 18 - Sep 3 2022",
    category: "Impact Claim",
  },
  emissions_avoided: {
    key: "emissions_avoided",
    text: "emissions avoided",
    value: "344.4 kgCO₂",
    category: "Impact Claim",
  },
  claim_issuer: {
    key: "claim_issuer",
    text: "claim issuer",
    value: "Emerging Cooking Solutions",
    component: DAOCard,
    props: {
      image:
        "https://ipfs.io/ipfs/bafkreiac7mlmlodnhy453xlmdfgnvkqtyx2mcehloxsyl2pig3yjrvkfza",
      icon: "https://ipfs.io/ipfs/bafkreifw7mvuwremuf3ffpdx3r2jgxjme4s2dbsld5y3oe75wavar6hwja",
      name: "Emerging Cooking Solutions",
      description:
        "Pioneering Smart, Clean, and Affordable Cooking and Household Energy Solutions in Emerging Economies.",
      // numOfMembers: undefined,
    },
    category: "Impact Claim",
  },
  claim_id: {
    key: "claim_id",
    text: "claim id",
    value: "urn:uuid...8f422",
    component: JSONViewerCard,
    props: {
      json: '{"id":"{id}","type":"ImpactNFT","name":"SupaMoto Genesis","tokenName":"SupaMoto","decimals":0,"description":"SupaMoto Genesis","image":"https://ipfs.io/ipfs/bafkreifkl6w55nasgqid22d2cqyxccjktbciefzmiqvcudlq3eoer2mzhi","properties":{"denom":"SUPAMOTO","icon":"https://ipfs.io/ipfs/bafkreigkajsskkswn5jwcmfxhn3rqc7gevzgroacq7ygfz6mzkgo72ej4i","maxSupply":"600"}}',
    },
    category: "Impact Claim",
  },
  // Clean Energy Device
  energy_device_type: {
    key: "energy_device_type",
    text: "type",
    value: "Micro-gasification pellet stove with IoT sensor",
    category: "Clean Energy Device",
  },
  energy_device_model: {
    key: "energy_device_model",
    text: "model",
    value: "MimiMoto",
    component: JSONViewerCard,
    props: {
      json: '{"id":"https://registry.emerging.eco/device/?id=202200001","product":{"model":"MimiMoto","description":"Micro-gasification pellet stove with IoT sensor","color":"Red"},"manufacturer":{"name":"Mimi Moto BV","country":"CN","date":"2019-2022"},"certification":{"id":"https://ipfs.io/ipfs/bafkreiefafy2u5df4l52yb7vvz32hxrxhcceyaq3z7xww2qlz2fp3ppeum","type":"PerformanceTestingCertificate","issuer":"Aprovecho Research Center","date":"2017","code":"WBT 4.2.3, LEMS, Safety"}}',
    },
    category: "Clean Energy Device",
  },
  energy_device_fuel: {
    key: "energy_device_fuel",
    text: "fuel",
    value: "Renewable Biomass Pellets",
    category: "Clean Energy Device",
  },
  manufacture_date: {
    key: "manufacture_date",
    text: "manufacture date",
    value: "2019-2022",
    category: "Clean Energy Device",
  },
  manufacture_place: {
    key: "manufacture_place",
    text: "manufacture place",
    value: "CN",
    category: "Clean Energy Device",
  },
  // Project
  name: {
    key: "name",
    text: "name",
    value: "SupaMoto Zambia",
    component: ProjectNameCard,
    props: {
      id: "{id}",
      type: "ImpactNFT",
      name: "SupaMoto Zambia",
      tokenName: "SupaMoto",
      decimals: 0,
      description: "Zambia Collection 2023",
      image:
        "https://ipfs.io/ipfs/bafkreideszg4fdha4tf7ldpecltxbyxbnapb663tkuksk2vcczkzkxppaa",
      properties: {
        denom: "SUPAMOTO",
        icon: "https://ipfs.io/ipfs/bafkreifkl6w55nasgqid22d2cqyxccjktbciefzmiqvcudlq3eoer2mzhi",
        maxSupply: "1600",
      },
    },
    category: "Project",
  },
  developer: {
    key: "developer",
    text: "developer",
    value: "SupaMoto",
    component: JSONViewerCard,
    props: {
      json: '{"id":"{id}","type":"ImpactNFT","name":"SupaMoto Genesis","tokenName":"SupaMoto","decimals":0,"description":"SupaMoto Genesis","image":"https://ipfs.io/ipfs/bafkreifkl6w55nasgqid22d2cqyxccjktbciefzmiqvcudlq3eoer2mzhi","properties":{"denom":"SUPAMOTO","icon":"https://ipfs.io/ipfs/bafkreigkajsskkswn5jwcmfxhn3rqc7gevzgroacq7ygfz6mzkgo72ej4i","maxSupply":"600"}}',
    },
    category: "Project",
  },
  country: {
    key: "country",
    text: "country",
    value: "ZM",
    category: "Project",
  },
  impact_producers: {
    key: "impact_producers",
    text: "impact producers",
    value: " ",
    category: "Project",
  },
  project_emissions_avoided: {
    key: "project_emissions_avoided",
    text: "emissions avoided",
    value: " ",
    category: "Project",
  },
  // Impact Producer
  impact_producer_identifier: {
    key: "impact_producer_identifier",
    text: "identifier",
    value: "202200189",
    category: "Impact Producer",
  },
  impact_producer_country: {
    key: "impact_producer_country",
    text: "country",
    value: " ",
    category: "Impact Producer",
  },
  impact_producer_setting: {
    key: "impact_producer_setting",
    text: "setting",
    value: " ",
    // external: "https://goo.gl/maps/dpedFSLcDZLbhK1T6?coh=178571&entry=tt",
    category: "Impact Producer",
  },
  impact_producer_household: {
    key: "impact_producer_household",
    text: "household",
    value: " ",
    category: "Impact Producer",
  },
  total_cooking_time: {
    key: "total_cooking_time",
    text: "total cooking time",
    value: " ",
    category: "Impact Producer",
  },
  // Evaluator
  oracle: {
    key: "oracle",
    text: "oracle",
    value: "did:ixo:...96f13b",
    component: OracleCard,
    props: {
      image:
        "https://bafybeigbfzbn2ap6th7l7agupjfusojteheb33ih3fe4hvi64xwslpepde.ipfs.w3s.link/carbonORACLE_02_profile_960x540%202.png",
      icon: "https://bafybeibkxdea27zfi6ibrh4yzdvx7m2no6m4aartsujok47c26eslpefga.ipfs.w3s.link/Group%20747.png",
      name: "CARBON Oracle",
      description: "Causal AI claim evaluation",
      numOfAssets: 5124,
    },
    category: "Evaluator",
  },
  methodology: {
    key: "methodology",
    text: "methodology",
    value: "431_ee_ics",
    external:
      "https://globalgoals.goldstandard.org/431_ee_ics_methodology-for-metered-measured-energy-cooking-devices/",
    category: "Evaluator",
  },
  model: {
    key: "model",
    text: "model",
    value: "ProbabilisticModel1",
    category: "Evaluator",
  },
  version: {
    key: "version",
    text: "version",
    value: "0cece87f-1d09-42e4-a629-e460f8ebb7cd",
    category: "Evaluator",
  },
  claims_processed: {
    key: "claims_processed",
    text: "claims processed",
    value: " ",
    category: "Evaluator",
  },
};
