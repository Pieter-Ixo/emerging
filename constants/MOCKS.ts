import CookstoveModal from "@/components/Modals/CookstoveModal";
import AssetDeviceCard from "@/pages/certificate/CertificateDashboard/ProofComponents/AssetDeviceCard";
import CollectionCard from "@/pages/certificate/CertificateDashboard/ProofComponents/CollectionCard";
import DAOCard from "@/pages/certificate/CertificateDashboard/ProofComponents/DAOCard";
import JSONViewerAlternative from "@/pages/certificate/CertificateDashboard/ProofComponents/JSONViewerAlternative";
import JSONViewerCard from "@/pages/certificate/CertificateDashboard/ProofComponents/JSONViewerCard";
import OracleCard from "@/pages/certificate/CertificateDashboard/ProofComponents/OracleCard";
import ProjectNameCard from "@/pages/certificate/CertificateDashboard/ProofComponents/ProjectNameCard";
import {
  ICategoriesModel,
  IPropertiesModel,
} from "@/types/certificates/certificatePageTypes";

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
    value: "SupaMoto #19",
    component: AssetDeviceCard,
    props: {
      name: "SupaMoto Zambia",
      date: "",
      carbonClaimable: "5,160",
      carbonProduced: "5,160",
      creadedDate: "2023-06-26",
      price: "189.00",
      description:
        "The SupaMoto clean cookstove is a smart, IoT-connected device that helps households cut carbon emissions while cooking with affordable and renewable biomass fuel. This convenient solution offers a more cost-effective, healthy, and time-saving alternative to traditional cooking methods.",
      image:
        "https://ipfs.io/ipfs/bafkreideszg4fdha4tf7ldpecltxbyxbnapb663tkuksk2vcczkzkxppaa",
      properties: {
        denom: "SUPAMOTO",
        icon: "https://ipfs.io/ipfs/bafkreifkl6w55nasgqid22d2cqyxccjktbciefzmiqvcudlq3eoer2mzhi",
        maxSupply: "",
      },
    },
    category: "Impact Asset",
  },
  collection: {
    key: "collection",
    value: "SupaMoto Genesis Collection",
    component: CollectionCard,
    props: {
      assets: 468,
      name: "SupaMoto Genesis Collection",
      description:
        "The SupaMoto clean cookstove is a smart, IoT-connected device that helps households cut carbon emissions while cooking with affordable and renewable biomass fuel. This convenient solution offers a more cost-effective, healthy, and time-saving alternative to traditional cooking methods.",
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
    value: "SUPAMOTO",
    category: "Impact Asset",
  },
  creation_date: {
    key: "creation date",
    value: "26 Jun 2023",
    category: "Impact Asset",
  },
  total_produced: {
    key: "total CARBON produced",
    value: "5,160 CARBON",
    category: "Impact Asset",
  },
  total_avoided: {
    key: "total emissions avoided",
    value: "5,160 kgCO₂",
    category: "Impact Asset",
  },
  owned_by: {
    key: "owned by",
    value: "ixo1vk3d90k...neaghprhu",
    external:
      "https://devnet-blockscan.ixo.earth/account/ixo1vk3d90kpe6wpal2n6usucx5xpu066neaghprhu",
    category: "Impact Asset",
  },
  performance: {
    key: "performance",
    value: "dashboard",
    component: CookstoveModal,
    props: {
      id: 202200189,
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
  conversion_factor: {
    key: "conversion_factor",
    text: "conversion factor",
    value: "11.48",
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
    value: "344 kgCO₂",
    category: "Impact Claim",
  },
  claim_issuer: {
    key: "claim_issuer",
    text: "claim issuer",
    value: "did:ixo:entity:a1fce...72413",
    component: DAOCard,
    props: {
      image:
        "https://ipfs.io/ipfs/bafkreiac7mlmlodnhy453xlmdfgnvkqtyx2mcehloxsyl2pig3yjrvkfza",
      icon: "https://ipfs.io/ipfs/bafkreifw7mvuwremuf3ffpdx3r2jgxjme4s2dbsld5y3oe75wavar6hwja",
      name: "Emerging Cooking Solutions",
      description:
        "Pioneering Smart, Clean, and Affordable Cooking and Household Energy Solutions in Emerging Economies.",
    },
    category: "Impact Claim",
  },
  claim_id: {
    key: "claim_id",
    text: "claim id",
    value: "urn:uuid:bd741...d7a66",
    component: JSONViewerCard,
    props: {
      json: `{"outcome":{"linkedClaim":{"id":"cellnode:/bafkreihtm6vohz6hm5deacngsw4hgtrqen4owd5zb3q6x3anevlx2bwife","type":"ixo:CER","description":"Carbon Emission Reduction","issuanceDate":"2023-06-26T06:49:43.831Z","issuer":"did:ixo:entity:a1fcead81eab2f1158a726597d872413","digestMultibase":"bafkreihtm6vohz6hm5deacngsw4hgtrqen4owd5zb3q6x3anevlx2bwife"},"period":{"startDate":"2022-08-18T12:23:00.000Z","endDate":"2022-09-03T10:34:00.000Z"},"calculation":{"id":"web3:bafkreidougsptgelhhkpjz6lpqiogbwyw4tyuvqbktm5wdbuolcyiyuuui","type":"claim:EmissionReductionFactor","factor":11.48,"quantity":{"type":["claim:CookingFuel","claim:BiomassPellets"],"amount":30,"units":"kg"},"result":{"type":"claim:Carbon","amount":344.4,"units":"kg"}}}}`,
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
      json: '{"product":{"model":"MimiMoto","description":"Micro-gasification pellet stove with IoT sensor","color":"Red"},"manufacturer":{"name":"Mimi Moto BV","country":"CN","date":"2019-2022"},"certification":{"id":"https://ipfs.io/ipfs/bafkreiefafy2u5df4l52yb7vvz32hxrxhcceyaq3z7xww2qlz2fp3ppeum","type":"PerformanceTestingCertificate","issuer":"Aprovecho Research Center","date":"2017","code":"WBT 4.2.3, LEMS, Safety"}}',
    },
    category: "Clean Energy Device",
  },
  energy_device_fuel: {
    key: "energy_device_fuel",
    text: "manufacturer",
    value: "Mimi Moto BV",
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
  // total_cooking_time: {
  //   key: "total_cooking_time",
  //   text: "total cooking time",
  //   value: " ",
  //   category: "Impact Producer",
  // },
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
