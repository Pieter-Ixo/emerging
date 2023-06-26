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
