import { ElementType } from 'react';
import Pot from '@/assets/icons/pot.svg';
import SproutPill from '@/assets/icons/sprout-pill.svg';
import HumanClock from '@/assets/icons/human-clock.svg';
import Coins from '@/assets/icons/coins.svg';
import HumanHeart from '@/assets/icons/human-heart.svg';
import { hoursSaved, lifeYearsSaved } from '@/utils/supamoto';

export type STOVE = {
	id?: number;
	data?: STOVE_DATA;
	sessions?: STOVE_SESSIONS;
	pellets?: STOVE_PELLETS;
	loading?: boolean;
};

export type STOVE_DATA = {
	deviceId?: number;
	model?: string;
	status?: string;
	country?: string;
	registrationDateTime?: string;
};

export type STOVE_SESSIONS = {
	content?: STOVE_SESSIONS_CONTENT[];
	totalPages?: number;
	totalElements?: number;
	hasNextPage?: boolean;
	hasPreviousPage?: boolean;
	periodsFetched?: { [key in STOVE_PERIODS]: boolean };
	loading?: boolean;
};

export type STOVE_SESSIONS_CONTENT = {
	id?: number;
	duration?: number;
	startDateTime?: string;
	endDateTime?: string;
};

export type STOVE_PELLETS = {
	content?: STOVE_PELLETS_CONTENT[];
	totalPages?: number;
	totalElements?: number;
	totalPelletsAmount?: number;
	hasNextPage?: boolean;
	hasPreviousPage?: boolean;
	periodsFetched?: { [key in STOVE_PERIODS]: boolean };
	loading?: boolean;
};

export type STOVE_PELLETS_CONTENT = {
	id?: number;
	pelletsAmount?: number;
	pelletsAmountUnits?: string;
	dateTime?: string;
};

export enum STOVE_DATA_TYPES {
	cooking_sessions = 'cooking_sessions',
	pellets_purchased = 'pellets_purchased',
}

export enum STOVE_PERIODS {
	daily = '1D',
	weekly = '1W',
	monthly = '1M',
	yearly = '1Y',
	all = 'ALL',
}

export enum SECTIONS {
	sessions = 'sessions',
	fuel = 'fuel',
	time = 'time',
	costs = 'costs',
	health = 'health',
}

export type SECTION = {
	id: SECTIONS;
	description: string;
	Img: ElementType;
	dataType: STOVE_DATA_TYPES;
	dataFormatter?: (val: number) => number;
};

export const sections: { [key in SECTIONS]: SECTION } = {
	[SECTIONS.sessions]: { id: SECTIONS.sessions, Img: Pot, description: 'cooking sessions with renewable energy', dataType: STOVE_DATA_TYPES.cooking_sessions },
	[SECTIONS.fuel]: { id: SECTIONS.fuel, Img: SproutPill, description: 'kg pellets bought', dataType: STOVE_DATA_TYPES.pellets_purchased },
	[SECTIONS.time]: { id: SECTIONS.time, Img: HumanClock, description: 'hours saved on cooking time', dataType: STOVE_DATA_TYPES.pellets_purchased, dataFormatter: v => hoursSaved(v) },
	[SECTIONS.costs]: { id: SECTIONS.costs, Img: Coins, description: 'tbd', dataType: STOVE_DATA_TYPES.pellets_purchased },
	[SECTIONS.health]: { id: SECTIONS.health, Img: HumanHeart, description: 'healthy life-years saved', dataType: STOVE_DATA_TYPES.pellets_purchased, dataFormatter: v => lifeYearsSaved(v) },
};
