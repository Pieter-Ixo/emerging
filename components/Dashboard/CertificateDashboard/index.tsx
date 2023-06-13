import { palette } from "@/theme/palette";
import { Container, Grid, Text } from "@mantine/core";
import React from "react";
import CookstoveModal from "@/components/Modals/CookstoveModal";
import AggregateCard from "./AggregateCard";
import DetailCard from "./DetailCard";
import AssetDeviceCard from "./ProofComponents/AssetDeviceCard";
import JSONViewerCard from "./ProofComponents/JSONViewerCard";
import CollectionCard from "./ProofComponents/CollectionCard";
import DAOCard from "./ProofComponents/DAOCard";
import OracleCard from "./ProofComponents/OracleCard";
import ProjectNameCard from "./ProofComponents/ProjectNameCard";

export interface ICategoryModel {
  category: string;
  icon: string;
}
export interface ICategoriesModel {
  [key: string]: ICategoryModel;
}
export interface IPropertyModel {
  key: string;
  text?: string;
  value: string;
  component?: any;
  props?: Record<string, any>;
  external?: string;
  category?: string;
}
export interface IPropertiesModel {
  [key: string]: IPropertyModel;
}

const categories: ICategoriesModel = {
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

const properties: IPropertiesModel = {
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
    value: "SupaMoto Genesis",
    component: CollectionCard,
    props: {
      id: "{id}",
      type: "ImpactNFT",
      name: `SupaMoto\nZambia Collection`,
      tokenName: "SupaMoto",
      decimals: 0,
      description: "2023",
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
  denom: {
    key: "denom",
    value: "SUPA",
    category: "Impact Asset",
  },
  creation_date: {
    key: "creation date",
    value: "5 Apr 2023",
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
    value: "ixo12345...12345",
    external:
      "https://www.mintscan.io/ixo/account/ixo13myvkxke3k47gzr92xrdlfd24ay3yhwlelkfmn",
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
    value: "biomass",
    category: "Impact Claim",
  },
  fuel_amount: {
    key: "fuel_amount",
    text: "fuel amount",
    value: "32 kg",
    category: "Impact Claim",
  },
  cooking_time: {
    key: "cooking_time",
    text: "cooking time",
    value: "120 h 30 min",
    category: "Impact Claim",
  },
  conversion_factor: {
    key: "conversion_factor",
    text: "conversion factor",
    value: "11.1",
    external: "Conversion Factor.pdf",
    category: "Impact Claim",
  },
  period: {
    key: "period",
    text: "period",
    value: "Apr 10 - May 10 2023",
    category: "Impact Claim",
  },
  emissions_avoided: {
    key: "emissions_avoided",
    text: "emissions avoided",
    value: "1,000 kgCO₂",
    category: "Impact Claim",
  },
  claim_issuer: {
    key: "claim_issuer",
    text: "claim issuer",
    value: "EmergingDAO",
    component: DAOCard,
    props: {
      image:
        "https://ipfs.io/ipfs/bafkreihstux2zf7cobztq5acdqmihbmvkptml7tpvjrd6ecluqllb4iji4",
      icon: "https://ipfs.io/ipfs/bafkreiditx3ykwyfa2e4jk6yjp2vylhqgj45fq4zdxj32hwvp5k4dar7ju",
      name: "EmergingDAO",
      description: "2023",
      numOfMembers: 49,
    },
    category: "Impact Claim",
  },
  claim_id: {
    key: "claim_id",
    text: "claim id",
    value: "12345",
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
    value: "cookstove",
    category: "Clean Energy Device",
  },
  energy_device_model: {
    key: "energy_device_model",
    text: "model",
    value: "Mimimoto",
    component: JSONViewerCard,
    props: {
      json: '{"id":"https://registry.emerging.eco/device/?id=202200001","product":{"model":"MimiMoto","description":"Micro-gasification pellet stove with IoT sensor","color":"Red"},"manufacturer":{"name":"Mimi Moto BV","country":"CN","date":"2019-2022"},"certification":{"id":"https://ipfs.io/ipfs/bafkreiefafy2u5df4l52yb7vvz32hxrxhcceyaq3z7xww2qlz2fp3ppeum","type":"PerformanceTestingCertificate","issuer":"Aprovecho Research Center","date":"2017","code":"WBT 4.2.3, LEMS, Safety"}}',
    },
    category: "Clean Energy Device",
  },
  energy_device_fuel: {
    key: "energy_device_fuel",
    text: "fuel",
    value: "biomass",
    category: "Clean Energy Device",
  },
  manufacture_date: {
    key: "manufacture_date",
    text: "manufacture date",
    value: "Jan 12 2023",
    category: "Clean Energy Device",
  },
  manufacture_place: {
    key: "manufacture_place",
    text: "manufacture place",
    value: "South Africa",
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
        "https://bafybeifduopicws7pddcddmnm2hcna6wbr3y4bqg6wmo5yzgcbbnad23xm.ipfs.w3s.link/SupaMoto_DAO_02_hero_1920x1080%201.png",
      properties: {
        denom: "SUPAMOTO",
        icon: "https://ipfs.io/ipfs/bafkreigkajsskkswn5jwcmfxhn3rqc7gevzgroacq7ygfz6mzkgo72ej4i",
        maxSupply: "1600",
      },
    },
    category: "Project",
  },
  developer: {
    key: "developer",
    text: "developer",
    value: "Emerging Cooking Solutions",
    component: JSONViewerCard,
    props: {
      json: '{"id":"{id}","type":"ImpactNFT","name":"SupaMoto Genesis","tokenName":"SupaMoto","decimals":0,"description":"SupaMoto Genesis","image":"https://ipfs.io/ipfs/bafkreifkl6w55nasgqid22d2cqyxccjktbciefzmiqvcudlq3eoer2mzhi","properties":{"denom":"SUPAMOTO","icon":"https://ipfs.io/ipfs/bafkreigkajsskkswn5jwcmfxhn3rqc7gevzgroacq7ygfz6mzkgo72ej4i","maxSupply":"600"}}',
    },
    category: "Project",
  },
  country: {
    key: "country",
    text: "country",
    value: "Zambia",
    category: "Project",
  },
  impact_producers: {
    key: "impact_producers",
    text: "impact producers",
    value: "1,500",
    category: "Project",
  },
  project_emissions_avoided: {
    key: "project_emissions_avoided",
    text: "emissions avoided",
    value: "1,500,123 kgCO₂",
    category: "Project",
  },
  // Impact Producer
  impact_producer_identifier: {
    key: "impact_producer_identifier",
    text: "identifier",
    value: "abc1234",
    category: "Impact Producer",
  },
  impact_producer_country: {
    key: "impact_producer_country",
    text: "country",
    value: "Zambia",
    category: "Impact Producer",
  },
  impact_producer_setting: {
    key: "impact_producer_setting",
    text: "setting",
    value: "rural",
    external: "https://goo.gl/maps/dpedFSLcDZLbhK1T6?coh=178571&entry=tt",
    category: "Impact Producer",
  },
  impact_producer_household: {
    key: "impact_producer_household",
    text: "household",
    value: "4 members",
    category: "Impact Producer",
  },
  total_cooking_time: {
    key: "total_cooking_time",
    text: "total cooking time",
    value: "541h 31min",
    category: "Impact Producer",
  },
  // Evaluator
  oracle: {
    key: "oracle",
    text: "oracle",
    value: "Carbon Oracle",
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
    external: "https://globalgoals.goldstandard.org/documents/methodology/",
    category: "Evaluator",
  },
  model: {
    key: "model",
    text: "model",
    value: "Carbon AI Model",
    category: "Evaluator",
  },
  version: {
    key: "version",
    text: "version",
    value: "1.03",
    category: "Evaluator",
  },
  claims_processed: {
    key: "claims_processed",
    text: "claims processed",
    value: "1,200,412",
    category: "Evaluator",
  },
};

const CertificateDashboard: React.FC = () => (
    <Container
      fluid
      sx={{
        padding: "2rem",
        width: "100%",
        height: "100%",
      }}
    >
      <Text
        component="h1"
        size="40px"
        fw={300}
        color={palette.Neutral800}
        sx={{ marginBottom: "2rem" }}
      >
        CARBON Certificate
      </Text>

      <Grid gutter="xl">
        <Grid.Col span={8}>
          <AggregateCard categories={categories} properties={properties} />
        </Grid.Col>
        <Grid.Col span={4}>
          <DetailCard properties={properties} />
        </Grid.Col>
      </Grid>
    </Container>
  );

export default CertificateDashboard;
