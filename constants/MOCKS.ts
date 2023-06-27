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
    value: "11.69",
    component: JSONViewerCard,
    props: {
      json: `{"data":[{"Project_FuelConsumption":{"value":"1.000","units":"tonnes","id":"vocab:QuantitativeValue","type":"QuantitativeValue","description":"Ratio of fuel purchased that is used for cooking"}},{"Project_FuelEnergy":{"value":"0.0176","units":"Tj/t","id":"vocab:Energy","type":"Energy","description":"Energy generated per tonne of Fuel for the Modern Energy Device type and model used by the Project. Based on independent tests conducted by a certified lab. If not available, 0,017 is used for woody pellets and 0,014 for non-woody."}},{"Baseline_Wood":{"value":"","units":"t/a","id":"vocab:QuantitativeValue","type":"QuantitativeValue","description":"Baseline wood consumption"}},{"Baseline_Charcoal":{"value":"0.796","units":"t/a","id":"vocab:QuantitativeValue","type":"QuantitativeValue","description":"Baseline charcoal consumption"}},{"Baseline_LPG":{"value":"2.760","units":"kg/a","id":"vocab:QuantitativeValue","type":"QuantitativeValue","description":"Baseline LPG consumption"}},{"Baseline_Kerosine":{"value":"","units":"kg/a","id":"vocab:QuantitativeValue","type":"QuantitativeValue","description":"Baseline kerosine consumption"}},{"Baseline_Electricity":{"value":"713","units":"kWh/a","id":"vocab:QuantitativeValue","type":"QuantitativeValue","description":"Baseline electricity consumption"}},{"Fuel_NonRenewable_Biomass":{"value":"86.9","units":"%","id":"vocab:QuantitativeValue","type":"QuantitativeValue","description":"Fraction non-renewable biomass (fNRB)"}},{"Device_Efficiency":{"value":"54.7","units":"%","id":"vocab:QuantitativeValue","type":"QuantitativeValue","description":"Percentage of generated energy that goes into the cooking pot. Based on independent lab tests of the device."}},{"Fuel_NonWaste":{"value":"10","units":"%","id":"vocab:QuantitativeValue","type":"QuantitativeValue","description":"Relates to only burning of pellets under Project emissions."}},{"Fuel_AddedWood":{"value":"20","units":"%","id":"vocab:QuantitativeValue","type":"QuantitativeValue","description":"Percentage of additional dry-matter wood that is required to manufacture pellets"}},{"Fuel_ProductionEmissions":{"value":"0.33","units":"tCO2/a","id":"vocab:CO2Emission","type":"CO2Emission","description":"calcuated as 0.33tCO2/tPellets"}},{"Fuel_TransportEmissions":{"value":"0.05","units":"tCO2/a","id":"vocab:CO2Emission","type":"CO2Emission","description":"calcuated as 0.05tCO2/tPellets"}},{"Fuel_Wood_EmissionsFactor":{"value":"1.89","units":"tCO2e/t","id":"vocab:CO2Emission","type":"CO2Emission","description":"Emissions factor for Wood"}},{"Fuel_Charcoal_EmissionsFactor":{"value":"11.37","units":"tCO2e/t","id":"vocab:CO2Emission","type":"CO2Emission","description":"Emissions factor for Charcoal"}},{"Fuel_LPG_EmissionsFactor":{"value":"2.98","units":"tCO2e/t","id":"vocab:CO2Emission","type":"CO2Emission","description":"Emissions factor for LPG"}},{"Fuel_Kerosene_EmissionsFactor":{"value":"3.15","units":"tCO2e/t","id":"vocab:CO2Emission","type":"CO2Emission","description":"Emissions factor for Kerosene"}},{"Fuel_Electricity_EmissionsFactor":{"value":"0.87","units":"tCO2/MWh","id":"vocab:CO2Emission","type":"CO2Emission","description":"Emissions factor for Electricity"}},{"Fuel_Wood_Energy":{"value":"0.0156","units":"TJ/t","id":"vocab:Energy","type":"Energy","description":"Net calorific value of the Fuel"}},{"Fuel_Charcoal_Energy":{"value":"0.0295","units":"TJ/t","id":"vocab:Energy","type":"Energy","description":"Net calorific value of the Fuel"}},{"Fuel_LPG_Energy":{"value":"0.0473","units":"TJ/t","id":"vocab:Energy","type":"Energy","description":"Net calorific value of the Fuel"}},{"Fuel_Kerosine_Energy":{"value":"0.0438","units":"TJ/t","id":"vocab:Energy","type":"Energy","description":"Net calorific value of the Fuel"}},{"Fuel_Electricity_Energy":{"value":"0.0036","units":"GJ/kWh","id":"vocab:Energy","type":"Energy","description":"Net calorific value of the Fuel"}},{"Device_Wood_Efficiency":{"value":"10","units":"%","id":"vocab:QuantitativeValue","type":"QuantitativeValue","description":"Device Efficiency"}},{"Device_Charcoal_Efficiency":{"value":"20","units":"%","id":"vocab:QuantitativeValue","type":"QuantitativeValue","description":"Device Efficiency"}},{"Device_LPG_Efficiency":{"value":"51","units":"%","id":"vocab:QuantitativeValue","type":"QuantitativeValue","description":"Device Efficiency"}},{"Device_Kerosine_Efficiency":{"value":"43","units":"%","id":"vocab:QuantitativeValue","type":"QuantitativeValue","description":"Device Efficiency"}},{"Device_Electricity_Efficiency":{"value":"74","units":"%","id":"vocab:QuantitativeValue","type":"QuantitativeValue","description":"Device Efficiency"}},{"Fuel_Wood_Emissions_Baseline":{"value":"","units":"tCO2/a","id":"vocab:CO2Emission","type":"CO2Emission","description":"How much CO2 is emitted in the baseline scenario"}},{"Fuel_Charcoal_Emissions_Baseline":{"value":"7.86","units":"tCO2/a","id":"vocab:CO2Emission","type":"CO2Emission","description":"How much CO2 is emitted in the baseline scenario"}},{"Fuel_LPG_Emissions_Baseline":{"value":"0.01","units":"tCO2/a","id":"vocab:CO2Emission","type":"CO2Emission","description":"How much CO2 is emitted in the baseline scenario"}},{"Fuel_Kerosine_Emissions_Baseline":{"value":"","units":"tCO2/a","id":"vocab:CO2Emission","type":"CO2Emission","description":"How much CO2 is emitted in the baseline scenario"}},{"Fuel_Electricity_Emissions_Baseline":{"value":"0.62","units":"tCO2/a","id":"vocab:CO2Emission","type":"CO2Emission","description":"How much CO2 is emitted in the baseline scenario"}},{"Fuel_Total_Emissions_Baseline":{"value":"8.49","units":"tCO2/a","id":"vocab:CO2Emission","type":"CO2Emission","description":"How much CO2 is emitted in the baseline scenario"}},{"Device_Wood_UsefulEnergy":{"value":"","units":"GJ/a","id":"vocab:Energy","type":"Energy","description":"How much energy goes into the pot in the baseline scenario"}},{"Device_Charcoal_UsefulEnergy":{"value":"4.70","units":"GJ/a","id":"vocab:Energy","type":"Energy","description":"How much energy goes into the pot in the baseline scenario"}},{"Device_LPG_UsefulEnergy":{"value":"0.07","units":"GJ/a","id":"vocab:Energy","type":"Energy","description":"How much energy goes into the pot in the baseline scenario"}},{"Device_Kerosine_UsefulEnergy":{"value":"","units":"GJ/a","id":"vocab:Energy","type":"Energy","description":"How much energy goes into the pot in the baseline scenario"}},{"Device_Electricity_UsefulEnergy":{"value":"1.90","units":"GJ/a","id":"vocab:Energy","type":"Energy","description":"How much energy goes into the pot in the baseline scenario"}},{"Device_Total_UsefulEnergy":{"value":"6.66","units":"GJ/a","id":"vocab:Energy","type":"Energy","description":"How much energy goes into the pot in the baseline scenario"}},{"Project_Emissions_Baseline":{"value":"1.27","units":"tCO2/GJ","id":"vocab:CO2Emission","type":"CO2Emission","description":"Baseline Emission Factor"}},{"Project_UsefulEnergy":{"value":"9.63","units":"GJ/a","id":"vocab:Energy","type":"Energy","description":"How much Energy per Tonne of Fuel goes into the pot on average for the entire Project"}},{"Project_Emissions_GrossSavings":{"value":"12.27","units":"tCO2/a","id":"vocab:CO2Emission","type":"CO2Emission","description":"Total Gross amount of CO2 Emissions Reduced by the Project per Tonne of Fuel using the Modern Energy Cooking Device, before compensating for Emissions from Manufacturing and Transportation of Fuels."}},{"Project_Emissions_FuelProduction":{"value":"0.33","units":"tCO2/a","id":"vocab:CO2Emission","type":"CO2Emission","description":"Constant of 0.33tCO2/tpellets"}},{"Project_Emissions_FuelTransportation":{"value":"0.05","units":"tCO2/a","id":"vocab:CO2Emission","type":"CO2Emission","description":"Constant of 0.05tCO2/tpellets"}},{"Project_Emissions_FuelUsage":{"value":"0.20","units":"tCO2/a","id":"vocab:CO2Emission","type":"CO2Emission","description":"Emissions from burning Pellets. Value is 0 if pellets are made from 100% sustainable wood"}},{"Project_Emissions_Total":{"value":"0.58","units":"tCO2/a","id":"vocab:CO2Emission","type":"CO2Emission","description":"Total Project Emissions"}},{"Project_Emissions_Leakage":{"value":"0","units":"tCO2/a","id":"vocab:CO2Emission","type":"CO2Emission","description":"Unintended increase in emissions elsewhere attributable to the Project"}},{"Project_Emissions_Reduced":{"value":"11.69","units":"tCO2/a","id":"vocab:CO2Emission","type":"CO2Emission","description":"Total Net Amount of CO2 Emissions Reduced by the Project per Tonne of Fuel using the Modern Energy Cooking Device"}}]}`,
    },
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
        maxSupply: "468",
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
    value: "468",
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
    value: "ZM",
    category: "Impact Producer",
  },
  impact_producer_setting: {
    key: "impact_producer_setting",
    text: "usage",
    value: "Domestic",
    // external: "https://goo.gl/maps/dpedFSLcDZLbhK1T6?coh=178571&entry=tt",
    category: "Impact Producer",
  },
  impact_producer_household: {
    key: "impact_producer_household",
    text: "location",
    value: "-13.10882, 28.639104",
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
    value: "Gold Standard",
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
