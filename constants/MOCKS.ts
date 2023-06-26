import CookstoveModal from "@/components/Modals/CookstoveModal";
import AssetDeviceCard from "@/pages/certificate/CertificateDashboard/ProofComponents/AssetDeviceCard";
import CollectionCard from "@/pages/certificate/CertificateDashboard/ProofComponents/CollectionCard";
import DAOCard from "@/pages/certificate/CertificateDashboard/ProofComponents/DAOCard";
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
    value: "SupaMoto #15",
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
        "https://ipfs.io/ipfs/bafkreideszg4fdha4tf7ldpecltxbyxbnapb663tkuksk2vcczkzkxppaa",
      properties: {
        denom: "SUPA1",
        icon: "https://ipfs.io/ipfs/bafkreifkl6w55nasgqid22d2cqyxccjktbciefzmiqvcudlq3eoer2mzhi",
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
    external: "Conversion Factor.pdf",
    category: "Impact Claim",
    component: JSONViewerCard,
    props: {
      json: `{"id":"web3:bafkreidougsptgelhhkpjz6lpqiogbwyw4tyuvqbktm5wdbuolcyiyuuui","type":"claim:EmissionReductionFactor","factor":11.48,"quantity":{"type":["claim:CookingFuel","claim:BiomassPellets"],"amount":30,"units":"kg"},"result":{"type":"claim:Carbon","amount":344.4,"units":"kg"}}`,
    },
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
      json: '{"@context":["https://www.w3.org/2018/credentials/v1",{"ixo":"https://w3id.org/ixo/context/v1","claim":"https://w3id.org/emerging/vocab/v1","protocol":"did:ixo:entity:8fcbc757e75c120dd4beae0e5696fd38#","web3":"https://ipfs.io/ipfs/","cellnode":"https://devnet-cellnode.ixo.earth","type":"@type","@protected":true,"@version":1.1}],"id":"urn:uuid:bd7413dc-003a-4b9f-bfdf-e4cf32dd7a66","type":["VerifiableCredential","ixo:credential","claim:VER"],"validFrom":"2023-06-26T08:58:56.841Z","status":"verified","credentialSubject":{"id":"did:ixo:entity:fe10ed6f17aa11f35068b126be43a1fc","type":["ixo:entity","claim:CleanCooking","claim:CER"],"impact":{"id":"protocol:VER","type":"claim:VER","claim":"GHG Emission Reduction","description":"Verified reduction in the emission of GHGs achieved by using a modern energy cooking device","project":{"id":"web3:bafybeihxer3dxr4zaagzntb7w7rrg3ck33rox6x42ersgb4p4z5ccnxkti","type":"claim:GasifyingBiomass","credential":{"id":"did:ixo:entity:eb98bb2c92a62557b6c88c6f80e8d258#projectCredential","type":["VerifiableCredential","claim:ProjectCredential"],"issuer":"did:ixo:entity:a1fcead81eab2f1158a726597d872413","proof":"bafybeihxer3dxr4zaagzntb7w7rrg3ck33rox6x42ersgb4p4z5ccnxkti"}},"location":{"country":"ZM","region":"Africa","setting":"Domestic"}},"evaluation":{"id":"protocol:Evaluation-VER","type":"claim:Evaluation","methodology":{"id":"https://globalgoals.goldstandard.org/431_ee_ics_methodology-for-metered-measured-energy-cooking-devices/","type":"claim:GoldStandard","description":"Methodology for Metered and Measured Cooking Devices"},"model":"ProbabilisticModel1","version":"0cece87f-1d09-42e4-a629-e460f8ebb7cd","date":"2023-06-26T08:58:56.841Z"},"evaluator":{"id":"did:ixo:entity:7889238a0a6a68554f65f5c7da96f13b","type":"ixo:oracle"}},"outcome":{"linkedClaim":{"id":"cellnode:/bafkreihtm6vohz6hm5deacngsw4hgtrqen4owd5zb3q6x3anevlx2bwife","type":"ixo:CER","description":"Carbon Emission Reduction","issuanceDate":"2023-06-26T06:49:43.831Z","issuer":"did:ixo:entity:a1fcead81eab2f1158a726597d872413","digestMultibase":"bafkreihtm6vohz6hm5deacngsw4hgtrqen4owd5zb3q6x3anevlx2bwife"},"period":{"startDate":"2022-08-18T12:23:00.000Z","endDate":"2022-09-03T10:34:00.000Z"},"calculation":{"id":"web3:bafkreidougsptgelhhkpjz6lpqiogbwyw4tyuvqbktm5wdbuolcyiyuuui","type":"claim:EmissionReductionFactor","factor":11.48,"quantity":{"type":["claim:CookingFuel","claim:BiomassPellets"],"amount":30,"units":"kg"},"result":{"type":"claim:Carbon","amount":344.4,"units":"kg"}},"confidence":[{"id":"web3:...","type":"claim:Statistical","score":"","threshold":"0.95","reason":[{"id":"https://library.emerging.eco/codes/A","type":"claim:Violation","description":"Claim is not signed","result":"rejected"}]}]},"evidence":[{"id":"cellnode:/bafkreie577cpd2ujdp5h2i4ulsxgjcdquedyztu3nkiewpuk6udxhbnzse","type":"linkedClaim","description":"Fuel Purchase","collectionId":"1","claimEvaluation":{"submitted":1,"pending":0,"approved":1,"rejected":0,"disputed":0},"proof":{"digestMultibase":"bafkreie577cpd2ujdp5h2i4ulsxgjcdquedyztu3nkiewpuk6udxhbnzse"}},{"id":"https://api.supamoto.app/api/v2/stoves/202200189/sessions/cooking?pageSize=500&startDate=2022-08-18&endDate=2022-09-03","type":"claim:Data","description":"Cooking sessions monitored by IoT sensor"}],"issuer":{"id":"did:ixo:entity:7889238a0a6a68554f65f5c7da96f13b"},"issuanceDate":"2023-06-26T08:58:57.995Z","proof":{"type":"Ed25519Signature2018","created":"2023-06-26T08:58:58Z","verificationMethod":"did:ixo:entity:7889238a0a6a68554f65f5c7da96f13b#HwjkTsEueSMoJXkkFSyH6zL8JhYjid8Sm1ZTydrTiT32","proofPurpose":"assertionMethod","jws":"eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..kLHJdrhi7SmuWIZO44_yjXE-C9JNkGwpB2xt_A7CpBGemQ9XW97RfGw4IDrdlxx-l2WqZ-LhnTWZ_t1LGfwGAA"}}',
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
